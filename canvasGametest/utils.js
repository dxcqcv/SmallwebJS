    //画虚线扩充方法
	var CP = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;  
	if (CP && CP.lineTo) { 
		CP.dashedLine = function (x, y, x2, y2, dashArray) {  
        if (!dashArray) dashArray = [10, 5];  
        var dashCount = dashArray.length;  
        this.moveTo(x, y);  
        var dx = (x2 - x), dy = (y2 - y);  
        var slope = dy / dx;  
        var distRemaining = Math.sqrt(dx * dx + dy * dy);  
        var dashIndex = 0, draw = true;  
        while (distRemaining >= 0.1) {  
            var dashLength = dashArray[dashIndex++ % dashCount];  
            if (dashLength > distRemaining) dashLength = distRemaining;  
            var xStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));  
   
            var signal = (x2 > x ? 1 : -1);  
   
            x += xStep * signal;  
            y += slope * xStep * signal;  
            this[draw ? 'lineTo' : 'moveTo'](x, y);  
            distRemaining -= dashLength;  
            draw = !draw;  
       	 }  
		}  
	} 

	function getCursorPosition(e, canvas) {
	    var x;
	    var y;
	    if (e.pageX || e.pageY) {
			x = e.pageX;
			y = e.pageY;
	    }
	    else {
			x = e.clientX + document.body.scrollLeft +
		            document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop +
		            document.documentElement.scrollTop;
	    }
	    x -= canvas.offsetLeft;
	    y -= canvas.offsetTop;

	    return [x,y];
	}