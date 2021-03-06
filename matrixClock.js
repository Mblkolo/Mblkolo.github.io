(function(){

    var size = 15;

    var example = document.getElementById("matrixCanvas");
    var ctx = example.getContext('2d');

    var sample = document.createElement('canvas');
    var sampleCtx = sample.getContext('2d');

    var symbol = document.createElement('canvas');
    var symbolCtx = symbol.getContext('2d');

    var timeSymbol = document.createElement('canvas');
    var timeSymbolCtx = timeSymbol.getContext('2d');

    var showTime = true;
    example.addEventListener('click', function() {
        showTime = !showTime;
        }, false);

    (function () {
        symbol.width = 30 * size;
        symbol.height = 30 * size;
        symbolCtx.fillStyle = "green";
        symbolCtx.font = size + "px Arail";
        for(var x=0; x<30; x++)
            for(var y=0; y<30; y++)
            {
                var s = Math.floor(Math.random() * (0x4DB5 - 0x3400)) + 0x3400;
                symbolCtx.fillText(String.fromCharCode(s), x * size, y * size + size);
            }
    }());

    (function () {
        timeSymbol.width = 30 * size;
        timeSymbol.height = 30 * size;
        timeSymbolCtx.fillStyle = '#19ff19';
        timeSymbolCtx.font = size + "px Arail";
        for(var x=0; x<30; x++)
            for(var y=0; y<30; y++)
            {
                var s = Math.floor(Math.random() * (0x4DB5 - 0x3400)) + 0x3400;
                timeSymbolCtx.fillText(String.fromCharCode(s), x * size, y * size + size);
            }
    }());


    function getTime() {
        var currentdate = new Date();
        var hours = (currentdate.getHours()).toString();
        var minutes = (currentdate.getMinutes()).toString();
        if (hours.length === 1) hours = "0" + hours;
        if (minutes.length === 1) minutes = "0" + minutes;

        return hours + ":" + minutes;
    }

    var latestTime = "";

    function refreshSample(forse) {
        var currentTime = getTime();
        if (!forse && latestTime === currentTime) return;

        latestTime = currentTime;
        sample.width = Math.ceil(example.width / size);
        sample.height = Math.ceil(example.height / size);

        sampleCtx.fillStyle = "black";
        sampleCtx.fillRect(0, 0, sample.width, sample.height);
        sampleCtx.font = Math.floor(sample.height / 2) + "px Tahoma";
        sampleCtx.fillStyle = "white";
        sampleCtx.textAlign = "center";
        sampleCtx.textBaseline = 'middle';
        sampleCtx.fillText(currentTime, sample.width / 2, sample.height / 2);
    }

    var items = {};

    function animationStep() {
        var startTime = new Date().getTime();

        if (example.width != window.innerWidth || example.height != window.innerHeight) {
            example.width = window.innerWidth;
            example.height = window.innerHeight;

            ctx.fillStyle = "green";
            ctx.fillRect(0, 0, example.width, example.height);

            refreshSample(true);
        } else refreshSample();

        ctx.fillStyle = 'rgba(0,0,0, 0.05)';
        ctx.fillRect(0, 0, example.width, example.height);

        var sampleData = sampleCtx.getImageData(0, 0, sample.width, sample.height);
        for (var i = 0; i < Math.ceil(example.width / size); i++) {
            if (typeof items[i] === 'undefined') items[i] = Math.floor(Math.random() * example.height / size);

            var d = sampleData.data;
            var base = (items[i] * sampleData.width + i) * 4;
            var isTime = 0.3 * d[base + 0] + 0.59 * d[base + 1] + 0.11 * d[base + 2] >= 128;
            
            var x = Math.floor(Math.random() * 30) * size;
            var y = Math.floor(Math.random() * 30) * size;      
            if (isTime) 
            {
                if(showTime)
                    ctx.drawImage( timeSymbol, x, y, size, size, i * size, items[i] * size, size, size);
            }
            else 
                ctx.drawImage( symbol, x, y, size, size, i * size, items[i] * size, size, size);

            items[i]++;

            if (items[i] > Math.ceil(example.height / size - Math.random() * 6 + 3)) items[i] = 0;
        }

        var nowTime = new Date().getTime();
        var timeout = Math.max(0, 30 - (nowTime - startTime));
        setTimeout(function () {
            animationStep(nowTime);
        }, timeout);
    }

    animationStep();

})();