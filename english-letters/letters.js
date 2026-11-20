/* Английский алфавит: буква, название (как слышится), звук, слово-пример, эмодзи, подсказка для родителей. */
const LETTERS = [
  { l: "A", name: "эй",    sound: "а как в «кот»",   word: "apple",   emoji: "🍎", ru: "🍎 apple — эй" },
  { l: "B", name: "би",    sound: "б",              word: "ball",    emoji: "⚽", ru: "⚽ ball — би" },
  { l: "C", name: "си",    sound: "к",              word: "cat",     emoji: "🐱", ru: "🐱 cat — си" },
  { l: "D", name: "ди",    sound: "д",              word: "dog",     emoji: "🐶", ru: "🐶 dog — ди" },
  { l: "E", name: "и",     sound: "э как в «нет»",  word: "egg",     emoji: "🥚", ru: "🥚 egg — и" },
  { l: "F", name: "эф",    sound: "ф",              word: "fish",    emoji: "🐟", ru: "🐟 fish — эф" },
  { l: "G", name: "джи",   sound: "г",              word: "girl",    emoji: "👧", ru: "👧 girl — джи" },
  { l: "H", name: "эйч",   sound: "х",              word: "house",   emoji: "🏠", ru: "🏠 house — эйч" },
  { l: "I", name: "ай",    sound: "и",              word: "ice",     emoji: "🧊", ru: "🧊 ice — ай" },
  { l: "J", name: "джей",  sound: "дж",             word: "jump",    emoji: "🤸", ru: "🤸 jump — джей" },
  { l: "K", name: "кей",   sound: "к",              word: "kite",    emoji: "🪁", ru: "🪁 kite — кей" },
  { l: "L", name: "эл",    sound: "л",              word: "lion",    emoji: "🦁", ru: "🦁 lion — эл" },
  { l: "M", name: "эм",    sound: "м",              word: "moon",    emoji: "🌙", ru: "🌙 moon — эм" },
  { l: "N", name: "эн",    sound: "н",              word: "nest",    emoji: "🪺", ru: "🪺 nest — эн" },
  { l: "O", name: "оу",    sound: "о",              word: "orange",  emoji: "🍊", ru: "🍊 orange — оу" },
  { l: "P", name: "пи",    sound: "п",              word: "pen",     emoji: "🖊️", ru: "🖊️ pen — пи" },
  { l: "Q", name: "кью",   sound: "кв",             word: "queen",   emoji: "👑", ru: "👑 queen — кью" },
  { l: "R", name: "ар",    sound: "р",              word: "rain",    emoji: "🌧️", ru: "🌧️ rain — ар" },
  { l: "S", name: "эс",    sound: "с",              word: "sun",     emoji: "☀️", ru: "☀️ sun — эс" },
  { l: "T", name: "ти",    sound: "т",              word: "tree",    emoji: "🌳", ru: "🌳 tree — ти" },
  { l: "U", name: "ю",     sound: "а как в «угол»", word: "umbrella",emoji: "☂️", ru: "☂️ umbrella — ю" },
  { l: "V", name: "ви",    sound: "в",              word: "van",     emoji: "🚐", ru: "🚐 van — ви" },
  { l: "W", name: "дабл ю",sound: "у",              word: "water",   emoji: "💧", ru: "💧 water — дабл ю" },
  { l: "X", name: "экс",   sound: "кс",             word: "box",     emoji: "📦", ru: "📦 box — экс" },
  { l: "Y", name: "уай",   sound: "й",              word: "yes",     emoji: "👍", ru: "👍 yes — уай" },
  { l: "Z", name: "зи",    sound: "з",              word: "zebra",   emoji: "🦓", ru: "🦓 zebra — зи" }
];

/* Текст для озвучки (SpeechSynthesis). Английское произношение. */
const LETTER_AUDIO = {
  A: "A", B: "B", C: "C", D: "D", E: "E", F: "F", G: "gee", H: "Aitch",
  I: "I", J: "J", K: "K", L: "El", M: "M", N: "N", O: "O", P: "P",
  Q: "Q", R: "Are", S: "S", T: "T", U: "U", V: "V", W: "Double you",
  X: "Ex", Y: "Why", Z: "Zed"
};

/* Порядок введения новых букв. */
const INTRO_ORDER = [
  "S", "A", "T", "I", "P", "N",   // самые частые первые буквы
  "E", "M", "D", "O", "R", "C",
  "G", "B", "H", "F", "L", "U",
  "Y", "Q", "W", "X", "Z", "K", "V", "J"
];
