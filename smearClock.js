(function(){

    var size = 15;

    var example = document.getElementById("matrixCanvas");
    var exampleCtx = example.getContext('2d');
	
	var sample = document.createElement('canvas');
    var sampleCtx = sample.getContext('2d');

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
        sample.width = example.width;
        sample.height = example.height;

        sampleCtx.fillStyle = "black";
        sampleCtx.fillRect(0, 0, sample.width, sample.height);
        sampleCtx.font = Math.floor(sample.height / 2) + "px Tahoma";
        sampleCtx.fillStyle = "white";
        sampleCtx.textAlign = "center";
        sampleCtx.textBaseline = 'middle';
		
		sampleCtx.fillStyle = 'green';
		//sampleCtx.fillText(currentTime, sample.width / 2, sample.height / 2);
		 
		sampleCtx.shadowColor = 'green';
		sampleCtx.shadowOffsetX = 0;
		sampleCtx.shadowOffsetY = 0;
		sampleCtx.shadowBlur = sample.width / 4;	
		sampleCtx.fillText(currentTime, sample.width / 2, sample.height / 2);
		sampleCtx.shadowBlur = sample.width / 8;
		sampleCtx.fillText(currentTime, sample.width / 2, sample.height / 2);
		sampleCtx.shadowBlur = sample.width / 16;
		sampleCtx.fillText(currentTime, sample.width / 2, sample.height / 2);
		sampleCtx.shadowBlur = sample.width / 32;
		sampleCtx.fillText(currentTime, sample.width / 2, sample.height / 2);
		sampleCtx.shadowBlur = sample.width / 64;
		sampleCtx.fillText(currentTime, sample.width / 2, sample.height / 2);
		sampleCtx.shadowBlur = 0;
		sampleCtx.fillStyle = 'white';
		sampleCtx.fillText(currentTime, sample.width / 2, sample.height / 2);
		
		// sampleCtx.fillStyle = 'red'
		// sampleCtx.fillText(currentTime, sample.width / 2, sample.height / 2);
		// sampleCtx.fillStyle = 'cyan'
		// sampleCtx.fillText(currentTime, sample.width / 2+7, sample.height / 2);
        //sampleCtx.fillText(currentTime, sample.width / 2, sample.height / 2);
		
		// var text = 'Hello world!'
		// var blur = 10;
		// var width = sampleCtx.measureText(text).width + blur * 2;
		// sampleCtx.textBaseline = 'top';
		// sampleCtx.shadowColor = '#000';
		// sampleCtx.shadowOffsetX = width;
		// sampleCtx.shadowOffsetY = 0;
		// sampleCtx.shadowBlur = blur;	
		// sampleCtx.fillText(text, -width, 0);
    }

    var items = {};

    function animationStep() {
        var startTime = new Date().getTime();

        if (example.width != window.innerWidth || example.height != window.innerHeight) {
            example.width = window.innerWidth;
            example.height = window.innerHeight;

            exampleCtx.fillStyle = "green";
            exampleCtx.fillRect(0, 0, example.width, example.height);

            refreshSample(true);
        } 
		else 
			refreshSample();

        exampleCtx.drawImage(sample, 0, 0);

        var nowTime = new Date().getTime();
        var timeout = Math.max(0, 30 - (nowTime - startTime));
        setTimeout(function () {
            animationStep(nowTime);
        }, timeout);
    }

    animationStep();

})();