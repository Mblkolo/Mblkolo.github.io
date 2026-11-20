"use strict";

/* ================================================================
   Хранилище (localStorage)
   ================================================================ */
const LS_KEY = "engLtr.v1";
const MAX_PER_DAY = 5;   // максимум букв в одном упражнении

const todayStr = () => {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") +
         "-" + String(d.getDate()).padStart(2, "0");
};
const dayDiff = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
const dayLabel = (d) => d.split("-").reverse().join(".");
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const infoOf = (ch) => LETTERS.find(x => x.l === ch);
const plural = (n, one, few, many) => {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
  return many;
};

let store = load();
function load() {
  let d = {};
  try { d = JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch (e) { d = {}; }
  d.letters  = d.letters  || {};
  d.daily    = d.daily    || {};
  d.order    = d.order    || {};                       // буква -> номер введения
  d.streak   = d.streak   || { count: 0, last: null };
  d.settings = Object.assign({ sound: true, voiceURI: null, rate: 0.9 }, d.settings || {});
  return d;
}
function save() { localStorage.setItem(LS_KEY, JSON.stringify(store)); }

function stat(ch) {
  if (!store.letters[ch]) store.letters[ch] = { c: 0, w: 0, lastWrong: null, lastSeen: null };
  return store.letters[ch];
}
const introducedCount = () => Object.keys(store.order).length;
const isIntroduced    = (ch) => !!store.order[ch];
const allIntroduced   = () => introducedCount() >= LETTERS.length;
const todaySessions   = () => (store.daily[todayStr()] && store.daily[todayStr()].sessions) || 0;
const todayLetters    = () => (store.daily[todayStr()] && store.daily[todayStr()].used) || [];

/* ----------------------------------------------------------------
   Какие буквы пойдут в следующее упражнение
   - одна новая буква в день (первым номером);
   - остальные места (до 5) — старые буквы, «слабые» в приоритете;
   - успешные тоже попадают в очередь повторения.
   ---------------------------------------------------------------- */
function plannedLetters() {
  const today = todayStr();
  const used  = new Set(todayLetters());
  const notUsed = LETTERS.map(x => x.l).filter(c => !used.has(c));

  const chosen = [];

  // 1) новая буква дня
  if (todaySessions() === 0 && !allIntroduced()) {
    const fresh = INTRO_ORDER.filter(c => !isIntroduced(c));
    if (fresh.length) chosen.push(fresh[0]);
  }
  const isNewLetter = chosen[0] || null;

  // 2) повторение старых букв (сегодняшние второй раз не берём)
  const scored = notUsed
    .filter(c => c !== isNewLetter && isIntroduced(c))
    .map(c => {
      const s = stat(c);
      const recentWrong = s.lastWrong ? Math.max(0, 7 - dayDiff(s.lastWrong, today)) : 0;
      const sinceSeen   = s.lastSeen ? Math.max(0, 7 - dayDiff(s.lastSeen, today)) : 7;
      const score = s.w * 3 + recentWrong * 2 + sinceSeen + (s.c + s.w) * 0.2;
      return { c, score };
    })
    .sort((a, b) => b.score - a.score);

  const need = Math.min(MAX_PER_DAY, scored.length + 1) - chosen.length;
  for (let i = 0; i < need && i < scored.length; i++) chosen.push(scored[i].c);

  // 3) если повторять нечего (все буквы уже были сегодня) — повторяем сегодняшние
  if (chosen.length === 0) {
    const pool = used.size ? [...used] : LETTERS.map(x => x.l);
    chosen.push(...shuffle(pool.slice()).slice(0, Math.min(MAX_PER_DAY, pool.length)));
  }
  return chosen;
}

/* ================================================================
   Экраны
   ================================================================ */
const EL = id => document.getElementById(id);
const screens = [...document.querySelectorAll(".screen")];
function show(id) {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo(0, 0);
}

/* ================================================================
   Озвучка (SpeechSynthesis)
   ================================================================ */
let voices = [];
function fillVoiceList() {
  if (!window.speechSynthesis) return;
  voices = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang));
  const sel = EL("set-voice");
  if (!sel) return;
  const prev = sel.value;
  sel.innerHTML = "";
  const def = document.createElement("option");
  def.value = ""; def.textContent = "Авто (лучший английский)";
  sel.appendChild(def);
  voices.forEach(v => {
    const o = document.createElement("option");
    o.value = v.voiceURI; o.textContent = v.name + " (" + v.lang + ")";
    sel.appendChild(o);
  });
  const wanted = store.settings.voiceURI || prev;
  if (wanted && [...sel.options].some(o => o.value === wanted)) sel.value = wanted;
}
if (window.speechSynthesis) {
  fillVoiceList();
  speechSynthesis.onvoiceschanged = fillVoiceList;
}

function speak(text, rate) {
  if (!store.settings.sound || !window.speechSynthesis) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB";
    const list = voices.length ? voices : speechSynthesis.getVoices();
    let v = store.settings.voiceURI ? list.find(x => x.voiceURI === store.settings.voiceURI) : null;
    if (!v) v = list.find(x => /en[-_]GB/i.test(x.lang)) || list.find(x => /^en/i.test(x.lang)) || null;
    if (v) u.voice = v;
    u.rate  = rate != null ? rate : store.settings.rate;
    u.pitch = 1.05;
    speechSynthesis.speak(u);
  } catch (e) { /* тишина не беда */ }
}

/* ================================================================
   Главный экран
   ================================================================ */
function renderHome() {
  EL("st-intro").textContent  = introducedCount();
  EL("st-streak").textContent = store.streak.count;
  EL("st-today").textContent  = todaySessions();

  const planned = plannedLetters();
  const hasNew = planned.some(c => !isIntroduced(c));
  EL("next-line").innerHTML = "Следующее упражнение (" + planned.length + " " +
    plural(planned.length, "буква", "буквы", "букв") + "): <b>" + planned.join(", ") + "</b>" +
    (hasNew ? " ✨ новая!" : "");

  const strip = EL("home-strip");
  strip.innerHTML = "";
  const plannedSet = new Set(planned);
  LETTERS.forEach(({ l }) => {
    const d = document.createElement("div");
    d.className = "letter-chip";
    d.textContent = l;
    const s = store.letters[l];
    if (!isIntroduced(l)) {
      if (plannedSet.has(l)) d.classList.add("new");
    } else if (s && s.w > 0 && (!s.lastSeen || dayDiff(s.lastSeen, todayStr()) >= 2)) {
      d.classList.add("weak");
    } else if (s && s.c > 0 && s.w === 0) {
      d.classList.add("done");
    } else if (plannedSet.has(l)) {
      d.classList.add("active");
    }
    d.title = s ? `верно: ${s.c}, ошибок: ${s.w}` : "ещё не учили";
    strip.appendChild(d);
  });

  EL("btn-mute").textContent = store.settings.sound ? "🔊" : "🔇";
}

EL("btn-mute").addEventListener("click", () => {
  store.settings.sound = !store.settings.sound;
  save(); renderHome();
});

document.querySelectorAll(".mode-btn").forEach(b => b.addEventListener("click", () => {
  const letters = plannedLetters();
  pending = { mode: b.dataset.mode, letters };
  renderStart();
  show("scr-start");
}));

let pending = null;

function renderStart() {
  EL("start-title").textContent = { mixed: "Смешанное занятие", read: "Читаю букву", write: "Пишу букву по звуку" }[pending.mode];
  EL("start-date").textContent  = "Сегодня " + dayLabel(todayStr()) + " • занятий сегодня: " + todaySessions();
  const box = EL("start-letters");
  box.innerHTML = "";
  pending.letters.forEach(c => {
    const d = document.createElement("div");
    const fresh = !isIntroduced(c);
    d.className = "chip" + (fresh ? " new" : "");
    // название по-русски не показываем: иначе ответ виден ещё до упражнения
    d.innerHTML = c + (fresh ? "<small style='font-size:.75rem;font-weight:normal'>✨</small>" : "");
    box.appendChild(d);
  });
  EL("start-hint").textContent = pending.letters.some(c => !isIntroduced(c))
    ? "✨ — новая буква дня. Пройди карточки до конца, чтобы она закрепилась."
    : "Отлично, что возвращаешься! Повторение — лучший способ запомнить.";
}

EL("btn-go").addEventListener("click", () => {
  if (!pending) { show("scr-home"); return; }
  startExercise(pending.letters, pending.mode);
});

/* ================================================================
   Упражнение: карточка из двух половин
   слева/сверху — задание, справа/снизу — ответ, пока скрытый.
   Ответ открывается отдельным нажатием, затем «правильно / неправильно».
   ================================================================ */
let ex = null;

function makeSteps(letters, mode) {
  const arr = [];
  letters.forEach(c => {
    const modes = mode === "mixed" ? ["read", "write"] : [mode];
    modes.forEach(m => arr.push({ c, mode: m }));
  });
  shuffle(arr);
  // чтобы одинаковые буквы не шли подряд
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].c === arr[i - 1].c) {
      const j = arr.findIndex((x, k) => k > i && x.c !== arr[i].c);
      if (j > 0) [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  return arr;
}

function startExercise(letters, mode) {
  if (!store.daily[todayStr()]) store.daily[todayStr()] = { sessions: 0, used: [] };
  const day = store.daily[todayStr()];

  // состав упражнения фиксируется сразу: новая буква становится «введённой»,
  // буквы дня — использованными (то есть новую букву ребёнок получит только завтра)
  letters.forEach(c => { if (!isIntroduced(c)) store.order[c] = introducedCount() + 1; });
  day.used = Array.from(new Set([...(day.used || []), ...letters]));
  save();

  ex = { letters, mode, steps: makeSteps(letters, mode), i: 0, correct: 0, mistakes: [] };
  show("scr-card");
  renderCard();
}

function renderCard() {
  const step = ex.steps[ex.i];
  const info = infoOf(step.c);
  const total = ex.steps.length;

  EL("ex-progress").style.width = (ex.i / total * 100) + "%";
  EL("ex-counter").textContent  = (ex.i + 1) + " / " + total;

  const left = EL("card-quest"), right = EL("card-answer"), card = EL("card");
  card.classList.add("closed");
  card.classList.remove("ok", "no");
  left.classList.remove("lit");

  if (step.mode === "read") {
    left.innerHTML  = "<div class='tag'>задание • буква</div><div class='big'>" + info.l + " " + info.l.toLowerCase() +
                      "</div><div class='desc'>Как она называется и какой у неё звук?</div>" +
                      "<div class='wait'>половина с 🎁 — это ответ<br>открой её, когда вспомнишь</div>";
    right.innerHTML = "<div class='tag'>ответ</div><div class='cover'>🎁<br><span>показать ответ</span></div>" +
                      "<div class='ans'><div class='big'>" + info.l + " " + info.l.toLowerCase() + "</div>" +
                      "<div class='mid'>«" + info.name + "»</div>" +
                      "<div class='desc'>звук: " + info.sound + "<br>" + info.emoji + " " + info.word + "</div></div>";
  } else {
    left.innerHTML  = "<div class='tag'>задание • звук</div><div class='big'>🔊</div>" +
                      "<div class='desc'>Как звучит буква? Нажми на динамик, чтобы послушать.</div>" +
                      "<button class='btn round' id='btn-replay'>🔊</button>" +
                      "<div class='wait'>половина с 🎁 — это ответ<br>открой её, когда вспомнишь</div>";
    right.innerHTML = "<div class='tag'>ответ</div><div class='cover'>🎁<br><span>показать ответ</span></div>" +
                      "<div class='ans'><div class='big'>" + info.l + " " + info.l.toLowerCase() + "</div>" +
                      "<div class='mid'>«" + info.name + "»</div>" +
                      "<div class='desc'>звук: " + info.sound + "<br>" + info.emoji + " " + info.word + "</div></div>";
    EL("btn-replay").addEventListener("click", (e) => { e.stopPropagation(); speak(LETTER_AUDIO[step.c]); });
    setTimeout(() => speak(LETTER_AUDIO[step.c]), 300);
  }

  EL("card-actions").hidden = true;
  EL("btn-show").hidden = false;
  EL("btn-correct").disabled = true;
  EL("btn-wrong").disabled = true;
  EL("btn-next-card").hidden = true;
  EL("btn-correct").textContent = "✔ Правильно";
  EL("btn-wrong").textContent = "✖ Неправильно";
}

function openAnswer() {
  const card = EL("card");
  if (!card.classList.contains("closed")) return;
  card.classList.remove("closed");
  EL("card-quest").classList.add("lit");
  EL("card-actions").hidden = false;
  EL("btn-show").hidden = true;
  EL("btn-correct").disabled = false;
  EL("btn-wrong").disabled = false;

  const step = ex.steps[ex.i];
  if (step.mode === "read") speak(infoOf(step.c).l);
  else speak(LETTER_AUDIO[step.c]);
}
EL("card").addEventListener("click", openAnswer);
EL("btn-show").addEventListener("click", openAnswer);

function markCard(isCorrect) {
  const step = ex.steps[ex.i];
  const card = EL("card");
  card.classList.remove("closed");
  card.classList.add(isCorrect ? "ok" : "no");

  if (isCorrect) {
    ex.correct++;
  } else {
    ex.mistakes.push(step.c);
    setTimeout(() => speak(LETTER_AUDIO[step.c]), 300);
  }

  const s = stat(step.c);
  if (isCorrect) s.c++; else { s.w++; s.lastWrong = todayStr(); }
  s.lastSeen = todayStr();
  save();

  EL("btn-correct").disabled = true;
  EL("btn-wrong").disabled = true;
  EL("btn-next-card").hidden = false;
  EL("btn-next-card").textContent = (ex.i + 1 >= ex.steps.length) ? "Готово 🏁" : "Следующая карточка →";
}
EL("btn-correct").addEventListener("click", () => markCard(true));
EL("btn-wrong").addEventListener("click", () => markCard(false));

EL("btn-next-card").addEventListener("click", () => {
  ex.i++;
  if (ex.i >= ex.steps.length) finishExercise();
  else renderCard();
});

EL("btn-exit").addEventListener("click", () => {
  if (confirm("Выйти? Отмеченные карточки сохранятся, но занятие не засчитается как завершённое.")) {
    if (window.speechSynthesis) speechSynthesis.cancel();
    renderHome();
    show("scr-home");
  }
});

function finishExercise() {
  if (window.speechSynthesis) speechSynthesis.cancel();

  const day = store.daily[todayStr()];
  day.sessions = (day.sessions || 0) + 1;
  const last = store.streak.last;
  if (last !== todayStr()) {
    store.streak.count = (last && dayDiff(last, todayStr()) === 1) ? store.streak.count + 1 : 1;
    store.streak.last = todayStr();
  }
  save();

  const total = ex.steps.length;
  const acc = total ? ex.correct / total : 0;
  EL("ex-progress").style.width = "100%";
  EL("res-emoji").textContent = acc >= 0.95 ? "🏆" : acc >= 0.75 ? "🎉" : acc >= 0.5 ? "👍" : "💪";
  EL("res-title").textContent = ex.correct + " из " + total;
  EL("res-sub").textContent = acc >= 0.9 ? "Почти без ошибок! Так держать."
    : acc >= 0.6 ? "Хороший результат! Буквы с ошибками повторим в следующий раз."
    : "Ничего страшного — повторение делает своё дело!";

  const uniq = Array.from(new Set(ex.mistakes));
  const box = EL("res-mistakes");
  box.innerHTML = uniq.length ? "" : "Ошибок нет! 🙌";
  uniq.forEach(c => {
    const i = infoOf(c);
    const d = document.createElement("div");
    d.className = "chip bad";
    d.textContent = c + " «" + i.name + "»";
    box.appendChild(d);
  });

  show("scr-result");
  if (uniq.length) {
    setTimeout(() => uniq.forEach((c, k) => setTimeout(() => speak(LETTER_AUDIO[c], Math.max(0.5, store.settings.rate - 0.2)), k * 1500)), 800);
  }
}

EL("btn-again").addEventListener("click", () => startExercise(ex.letters, ex.mode));
EL("btn-new").addEventListener("click", () => { renderHome(); show("scr-home"); });
EL("btn-home1").addEventListener("click", () => { renderHome(); show("scr-home"); });

/* ================================================================
   Просмотр всех букв (тоже карточка с открытием по клику,
   но без кнопок «правильно / неправильно» — статистика не меняется)
   ================================================================ */
let ss = { list: LETTERS.map(x => x.l), i: 0 };

EL("btn-browse").addEventListener("click", () => {
  ss.i = 0;
  renderBrowse();
  show("scr-browse");
});

function renderBrowse() {
  const c = ss.list[ss.i];
  const info = infoOf(c);
  const left = EL("b-quest"), right = EL("b-answer"), card = EL("b-card");
  card.classList.remove("closed", "ok", "no");
  left.classList.remove("lit");
  left.innerHTML  = "<div class='tag'>буква</div><div class='big'>" + info.l + " " + info.l.toLowerCase() + "</div>" +
                    "<div class='desc'>Нажми на вторую половину карточки</div>";
  right.innerHTML = "<div class='tag'>ответ</div><div class='cover'>🎁<br><span>показать ответ</span></div>" +
                    "<div class='ans'><div class='big'>" + info.l + " " + info.l.toLowerCase() + "</div>" +
                    "<div class='mid'>«" + info.name + "»</div>" +
                    "<div class='desc'>звук: " + info.sound + "<br>" + info.emoji + " " + info.word + "</div></div>";
  card.classList.add("closed");
  EL("b-counter").textContent = (ss.i + 1) + " / " + ss.list.length;
  setTimeout(() => speak(LETTER_AUDIO[c]), 250);
}
function openBrowse() {
  const card = EL("b-card");
  if (!card.classList.contains("closed")) {
    // уже открыта — слушаем название буквы ещё раз
    speak(LETTER_AUDIO[ss.list[ss.i]]);
    return;
  }
  card.classList.remove("closed");
  EL("b-quest").classList.add("lit");
  speak(LETTER_AUDIO[ss.list[ss.i]]);
}
EL("b-card").addEventListener("click", openBrowse);
EL("btn-show2").addEventListener("click", openBrowse);
EL("btn-b-prev").addEventListener("click", () => { ss.i = (ss.i - 1 + ss.list.length) % ss.list.length; renderBrowse(); });
EL("btn-b-next").addEventListener("click", () => { ss.i = (ss.i + 1) % ss.list.length; renderBrowse(); });
EL("btn-b-exit").addEventListener("click", () => {
  if (window.speechSynthesis) speechSynthesis.cancel();
  renderHome(); show("scr-home");
});

/* ================================================================
   Настройки
   ================================================================ */
EL("btn-settings").addEventListener("click", () => {
  EL("set-sound").value = store.settings.sound ? "1" : "0";
  EL("set-rate").value  = String(store.settings.rate);
  fillVoiceList();
  show("scr-settings");
});
EL("btn-back-settings").addEventListener("click", () => show("scr-home"));
EL("set-sound").addEventListener("change", e => { store.settings.sound = e.target.value === "1"; save(); renderHome(); });
EL("set-rate").addEventListener("change", e => { store.settings.rate = parseFloat(e.target.value); save(); speak("Hello! My name is Sam."); });
EL("set-voice").addEventListener("change", e => { store.settings.voiceURI = e.target.value || null; save(); speak("Hello! My name is Sam."); });

EL("btn-reset").addEventListener("click", () => {
  if (!confirm("Точно удалить весь прогресс? Восстановить можно только из сохранённого файла.")) return;
  localStorage.removeItem(LS_KEY);
  store = load();
  renderHome();
  show("scr-home");
});

EL("btn-export").addEventListener("click", () => {
  const a = document.createElement("a");
  a.href = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store, null, 2));
  a.download = "english-letters-" + todayStr() + ".json";
  a.click();
});
EL("import-file").addEventListener("change", e => {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const data = JSON.parse(r.result);
      if (!data || typeof data !== "object" || !data.letters) throw new Error("bad file");
      store = load();
      ["letters", "daily", "order", "streak"].forEach(k => { if (data[k]) store[k] = data[k]; });
      if (data.settings) store.settings = Object.assign(store.settings, data.settings);
      save();
      renderHome();
      show("scr-home");
      alert("Данные загружены! 📂");
    } catch (err) { alert("Файл не подошёл 😕"); }
  };
  r.readAsText(f);
  e.target.value = "";
});

/* ================================================================
   Клавиатура (на компьютере): 1 — правильно, 0 — неправильно,
   Enter/Пробел — открыть ответ и идти дальше, ←/→ — листать просмотр
   ================================================================ */
document.addEventListener("keydown", e => {
  if (EL("scr-card").classList.contains("active")) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (!EL("card").classList.contains("closed")) EL("btn-next-card").click();
      else openAnswer();
    } else if (e.key === "1" && !EL("btn-correct").disabled) EL("btn-correct").click();
    else if (e.key === "0" && !EL("btn-wrong").disabled) EL("btn-wrong").click();
    return;
  }
  if (EL("scr-browse").classList.contains("active")) {
    if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); EL("btn-b-next").click(); }
    else if (e.key === "ArrowLeft") EL("btn-b-prev").click();
    else if (e.key === "Enter") { e.preventDefault(); openBrowse(); }
    return;
  }
  if (EL("scr-home").classList.contains("active") && e.key === " ") {
    e.preventDefault();
    document.querySelector('.mode-btn[data-mode="mixed"]').click();
  }
});

/* ================================================================
   Старт
   ================================================================ */
renderHome();
show("scr-home");
