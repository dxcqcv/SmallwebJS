(function($){
        var SaveM = {
            data:null,
            _canvasIndex:0
        };
        var browser = {
            IE: !!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1),
            Opera: navigator.userAgent.indexOf('Opera') > -1,
            //检测浏览器是否为WebKit内核
            WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
            //检测浏览器是否为Gecko内核，如Firefox
            Gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') === -1,
            MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/),
            android: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1
        }
        var comm = {
            //返回目录地址
            baseUrl:function(){
                var loca = document.location.href;
                var _url = loca.substring(0,loca.lastIndexOf('/'));
                return _url;
            },
            //服务封装
            getSrv:function(parms){
                if(parms !== undefined){
                        var callback = parms.callback;
                 }
                 var ParAjax = {
                        type:'GET',
                        dataType:'json',
                        success: function (data) {
                                var data = data;
                            if (typeof callback === 'function') {
                                 callback(data);
                            } 
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                                alert('加载出错');      
                        }
                 }
                 $.ajax($.extend(ParAjax,parms));
            },
            CanvasRectangleLoad:function(data){
                var data = data;
                var Yletter = data.Yletter;
                var Xletter = data.Xletter;
                var value = data.Value;
                var objectCanvas = document.getElementById('canvas');
                var canvas = objectCanvas.getContext('2d');
                var canvasWidth = objectCanvas.width;
                var canvasHeight = objectCanvas.height;
                //清除一次
                canvas.clearRect(0,0,canvasWidth,canvasHeight);
                //设置背景色
                canvas.fillStyle = '#fff';
                canvas.lineWidth = '1';
                canvas.fillRect(0,0,objectCanvas.width,objectCanvas.height);
                //坐标直线Y轴
                canvas.beginPath();
                canvas.lineTo(20,120);
                canvas.lineTo(20,350);
                canvas.strokeStyle = '#000';
                canvas.closePath();
                canvas.fill();
                canvas.stroke();
                //坐标直线X轴
                canvas.beginPath();
                canvas.lineTo(20,350);
                canvas.lineTo(280,350);
                canvas.strokeStyle = '#000';
                canvas.closePath();
                canvas.fill();
                canvas.stroke();
                //箭头Y轴
                canvas.beginPath();
                canvas.lineTo(20,120);
                canvas.moveTo(20,120);
                canvas.lineTo(25,130);
                canvas.strokeStyle = '#000';
                canvas.closePath();
                canvas.fill();
                canvas.stroke();
                canvas.beginPath();
                canvas.lineTo(20,120);
                canvas.moveTo(20,120);
                canvas.lineTo(15,130);
                canvas.strokeStyle = '#000';
                canvas.closePath();
                canvas.fill();
                canvas.stroke();
                //箭头X轴
                canvas.beginPath();
                canvas.lineTo(280,350);
                canvas.moveTo(280,350);
                canvas.lineTo(275,355);
                canvas.strokeStyle = '#000';
                canvas.closePath();
                canvas.fill();
                canvas.stroke();
                canvas.beginPath();
                canvas.lineTo(280,350);
                canvas.moveTo(280,350);
                canvas.lineTo(275,345);
                canvas.strokeStyle = '#000';
                canvas.closePath();
                canvas.fill();
                canvas.stroke();
                //坐标Y轴文字
                canvas.fillStyle = '#000';
                canvas.textAlign = 'middle';
                canvas.font = '10px';
                canvas.fillText(Yletter,25,130,70);
                //坐标X轴文字
                canvas.fillStyle = '#000';
                canvas.textAlign = 'middle';
                canvas.font = '10px';
                canvas.fillText(Xletter,155,390,180);
                var pathX = 20;
                var pathY = 350;
                var max = 140;
                var boxX = 5;
                var boxY = 5;
                var box2X = 5;
                var box2Y = 30;
                var box3X = 5;
                var box3Y = 55;
                var NumIndex = 1;
                //开始画图
                for(var j = 0,len = value.length;j<len;j++){
                        var name = value[j].name;
                        var color = value[j].color;
                        var moveData = value[j].moveData;
                        //10W为单位
                        var MOVE = parseInt (moveData / 100000);
                        //1W为单位
                        var MYRIAD = parseInt (moveData / 10000);
                        var y = pathY - MOVE;
                        var fontY = y - 5;
                        var ressY = pathY + 15;
                        if(NumIndex > 4 && NumIndex <= 8){
                            canvas.fillStyle = '#000';
                            canvas.textAlign = 'middle';
                            canvas.font = '8px';
                            canvas.fillText(name,box2X+15,box2Y+10,40);
                        }else if(NumIndex > 8 && NumIndex<=12){
                            canvas.fillStyle = '#000';
                            canvas.textAlign = 'middle';
                            canvas.font = '8px';
                            canvas.fillText(name,box3X+15,box3Y+10,40);
                        }else{
                            canvas.fillStyle = '#000';
                            canvas.textAlign = 'middle';
                            canvas.font = '8px';
                            canvas.fillText(name,boxX+15,boxY+10,40);
                        }
                        canvas.fillStyle = '#000';
                        canvas.textAlign = 'middle';
                        canvas.font = '8px';
                        canvas.fillText(MYRIAD +'万元',pathX,fontY,20);
                        canvas.fillStyle = color;
                        if(NumIndex > 4 && NumIndex <= 8){
                            canvas.fillRect(box2X,box2Y,10,10);
                            box2X = box2X + 75;
                        }else if(NumIndex > 8 && NumIndex<=12){
                            canvas.fillRect(box3X,box3Y,10,10);
                            box3X = box3X + 75;
                        }else{
                            canvas.fillRect(boxX,boxY,10,10);
                        }
                        canvas.fillRect(pathX,y,20,MOVE);
                        canvas.strokeRect(pathX,y,20,MOVE);
                        pathX = pathX + 21;
                        boxX = boxX + 75;
                        NumIndex = NumIndex + 1;
                }
            },
            CanvasRotundityLoad:function(data){
                var data = data;
                var value = data.Value;
                var objectCanvas = document.getElementById('canvas');
                var canvas = objectCanvas.getContext('2d');
                var canvasWidth = objectCanvas.width;
                var canvasHeight = objectCanvas.height;
                //console.log(canvas);
                //清除一次
                canvas.clearRect(0,0,canvasWidth,canvasHeight);
                //设置背景色
                canvas.fillStyle = '#fff';
                canvas.fillRect(0,0,objectCanvas.width,objectCanvas.height);

                canvas.beginPath();
                canvas.arc(150,200,100,0,Math.PI,false);
                canvas.closePath();
                canvas.fillStyle = '#d7cf48';
                canvas.fill();
                
                canvas.beginPath();
                canvas.arc(150,200,100,Math.PI,Math.PI*2,false);
                canvas.closePath();
                canvas.fillStyle = '#7c99b5';
                canvas.fill();
                
                canvas.fillStyle = '#7c99b5';
                canvas.fillRect(20,10,10,10);
                canvas.fillStyle = '#000';
                canvas.textAlign = 'middle';
                canvas.font = '12px';
                canvas.fillText('央行资产：一亿二千万（百分比50%）',35,19,120);
                
                canvas.fillStyle = '#d7cf48';
                canvas.fillRect(20,30,10,10);
                canvas.fillStyle = '#000';
                canvas.textAlign = 'middle';
                canvas.font = '12px';
                canvas.fillText('工行资产：一亿二千万（百分比50%）',35,39,120);

                canvas.fillStyle = '#000';
                canvas.textAlign = 'middle';
                canvas.font = '12px';
                canvas.fillText('工行资产：（百分比50%）',75,180,120);

                canvas.fillStyle = '#000';
                canvas.textAlign = 'middle';
                canvas.font = '12px';
                canvas.fillText('央行资产：（百分比50%）',75,230,120);

            },
            CanvasBeelineLoad:function(data){
                var data = data;
                var Yletter = data.Yletter;
                var Xletter = data.Xletter;
                var value = data.Value;
                var objectCanvas = document.getElementById('canvas');
                var canvas = objectCanvas.getContext('2d');
                var canvasWidth = objectCanvas.width;
                var canvasHeight = objectCanvas.height;
                //清除一次
                canvas.clearRect(0,0,canvasWidth,canvasHeight);
                //设置背景色
                canvas.fillStyle = '#fff';
                canvas.lineWidth = '1';
                canvas.fillRect(0,0,objectCanvas.width,objectCanvas.height);
                //坐标直线Y轴
                canvas.beginPath();
                canvas.lineTo(20,120);
                canvas.lineTo(20,350);
                canvas.strokeStyle = '#000';
                canvas.closePath();
                canvas.fill();
                canvas.stroke();
                //坐标直线X轴
                canvas.beginPath();
                canvas.lineTo(20,350);
                canvas.lineTo(280,350);
                canvas.strokeStyle = '#000';
                canvas.closePath();
                canvas.fill();
                canvas.stroke();
                //箭头Y轴
                canvas.beginPath();
                canvas.lineTo(20,120);
                canvas.moveTo(20,120);
                canvas.lineTo(25,130);
                canvas.strokeStyle = '#000';
                canvas.closePath();
                canvas.fill();
                canvas.stroke();
                canvas.beginPath();
                canvas.lineTo(20,120);
                canvas.moveTo(20,120);
                canvas.lineTo(15,130);
                canvas.strokeStyle = '#000';
                canvas.closePath();
                canvas.fill();
                canvas.stroke();
                //箭头X轴
                canvas.beginPath();
                canvas.lineTo(280,350);
                canvas.moveTo(280,350);
                canvas.lineTo(275,355);
                canvas.strokeStyle = '#000';
                canvas.closePath();
                canvas.fill();
                canvas.stroke();
                canvas.beginPath();
                canvas.lineTo(280,350);
                canvas.moveTo(280,350);
                canvas.lineTo(275,345);
                canvas.strokeStyle = '#000';
                canvas.closePath();
                canvas.fill();
                canvas.stroke();
                //坐标Y轴文字
                canvas.fillStyle = '#000';
                canvas.textAlign = 'middle';
                canvas.font = '10px';
                canvas.fillText(Yletter,25,130,70);
                //坐标X轴文字
                canvas.fillStyle = '#000';
                canvas.textAlign = 'middle';
                canvas.font = '10px';
                canvas.fillText(Xletter,225,370,180);
                var textX = 30;
                var pathX = 20;
                var pathY = 350;
                var initX = 20;
                var initY = 350;
                var max = 140;
                var boxX = 5;
                var boxY = 5;
                var box2X = 5;
                var box2Y = 30;
                var box3X = 5;
                var box3Y = 55;
                var NumIndex = 1;
                for(var j = 0,len = value.length;j<len;j++){
                    var name = value[j].name;
                    var moveData = value[j].moveData;
                    var color = value[j].color;
                    //10W为单位
                    var MOVE = parseInt (moveData / 100000);
                    //1W为单位
                    var MYRIAD = parseInt (moveData / 10000);
                    var y = pathY - MOVE;
                    var fontY = y - 5;
                    var ressY = pathY + 15;
                    if(NumIndex > 4 && NumIndex <= 8){
                        canvas.fillStyle = '#000';
                        canvas.textAlign = 'middle';
                        canvas.font = '8px';
                        canvas.fillText(name,box2X+15,box2Y+10,40);
                    }else if(NumIndex > 8 && NumIndex<=12){
                        canvas.fillStyle = '#000';
                        canvas.textAlign = 'middle';
                        canvas.font = '8px';
                        canvas.fillText(name,box3X+15,box3Y+10,40);
                    }else{
                        canvas.fillStyle = '#000';
                        canvas.textAlign = 'middle';
                        canvas.font = '8px';
                        canvas.fillText(name,boxX+15,boxY+10,40);
                    }
                    canvas.fillStyle = color;
                    canvas.textAlign = 'middle';
                    canvas.font = '8px';
                    canvas.fillText(MYRIAD +'万元',textX,fontY-10,30);
                    if(NumIndex > 4 && NumIndex <= 8){
                        canvas.fillRect(box2X,box2Y,10,10);
                        box2X = box2X + 75;
                    }else if(NumIndex > 8 && NumIndex<=12){
                        canvas.fillRect(box3X,box3Y,10,10);
                        box3X = box3X + 75;
                    }else{
                        canvas.fillRect(boxX,boxY,10,10);
                    }
                    canvas.beginPath();
                    canvas.lineTo(initX,initY);
                    canvas.moveTo(initX,initY)
                    canvas.lineTo(pathX + 21,fontY);
                    canvas.strokeStyle = color;
                    canvas.lineWidth = '3'
                    canvas.stroke();
                    canvas.closePath();
                    canvas.beginPath();
                    canvas.arc(pathX + 21,fontY,6,0,Math.PI*2,false);
                    canvas.closePath();
                    canvas.fillStyle = color;
                    canvas.fill();
                    //console.log(color);
                    initX = 0;
                    initY = 0;
                    textX = textX + 21;
                    pathX = pathX + 21;
                    initX = pathX;
                    initY = fontY;
                    boxX = boxX + 75;
                    NumIndex = NumIndex + 1;
                }
            }
        };
        var CanvasUI = {
            indexPage:[]
        };
        var _url= comm.baseUrl();
        //是否打开预览
        var _isOpen = true;
        //初始化 Canvas
        var CanvasINITS = function(callbacks){
            comm.getSrv({
                url:_url + '/data/drop.js',
                callback:function(data){
                    var data = data;
                    var value = data.Value;
                    var doms = '';
                    doms += '<nav data-role="navbar"><ul>';
                    for(var i = 0,len = value.length;i<len;i++){
                        var id = value[i].id;
                        var name = value[i].name;
                        CanvasUI.indexPage.push(id);
                        if(id == 1){
                            doms += '<li><a href="#" id="ON_'+id+'" class="ui-btn-active" title=" '+name+'">'+name+'</a></li>';
                            continue;
                        }
                        doms += '<li><a href="#" id="ON_'+id+'" title="'+name+'">'+name+'</a></li>';
                    }
                    doms += '</ul></nav>';
                    $('#exbtn').append(doms);
                    ClearCanvasBar();
                    CanvasNavEvents();
                    if(typeof callbacks === 'function'){
                        callbacks();
                    }
                }
            });
        }
        //mobile load
        var JQMobileLoad = function(){
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.setAttribute('type','text/javascript');
            script.setAttribute('src','libs/jquery.mobile-1.2.0.js');
            head.appendChild(script);
        }
        var CanvasEventListTypes = '';
        //按type类型，来画图
        var CanvasTypes = function(data){
            var data = data;
            var type = data.type;
            var value = data.Value;
            var SaveViewsCanvas = $('#saveCanvas');
            //矩形
            if(type === 'rectangle'){
                comm.CanvasRectangleLoad(data);
                CanvasEventRectangleTouchs(data);
                _isOpen = true;
                CanvasEventListTypes = 'rectangle';
                SaveViewsCanvas.attr('href','#Sview');
            }
            //圆
            if(type === 'rotundity'){
                comm.CanvasRotundityLoad(data);
                CanvasEventListTypes = 'rotundity';
                //CanvasEventTouchs(data);
                _isOpen = true;
                SaveViewsCanvas.attr('href','#Sview');
            }
            //波纹趋势
            if(type === 'beeline'){
                comm.CanvasBeelineLoad(data);
                CanvasEventListTypes = 'beeline';
                //CanvasEventTouchs(data);
                _isOpen = true;
                SaveViewsCanvas.attr('href','#Sview');
            }
        }
        //数据分析，数据请求
        var CanvasIndexLoad = function(index){
            var index = index;
            var _touchCon = $('#touchCon');
            _touchCon.hide();
            SaveM._canvasIndex = 0;
            SaveM._canvasIndex = index;
            if(typeof index === 'number'){
                comm.getSrv({
                    url:_url + '/data/drop'+index+'.js',
                    callback:function(data){
                        var data = data;
                        CanvasTypes(data);
                    }
                });
            }
        }
        //数据分析触摸，与鼠标事件绑定
        var CanvasNavEvents = function(){
            var index = CanvasUI.indexPage;
            for(var i = 0,len = index.length;i<len;i++){
                (function(_i){
                    var $id = $('#ON_'+index[_i]);
                    $id.bind('click',function(){
                        var _index = parseInt($(this).attr('id').split('_')[1]);
                        CanvasIndexLoad(_index);
                    });
                    $id.bind('tap',function(){
                        var _index = parseInt($(this).attr('id').split('_')[1]);
                        $(this).removeClass('ui-btn-active');
                        CanvasIndexLoad(_index);
                    });
                })(i);
            }
        }
        //清除画布
        var ClearCanvasBar = function(){
            var SaveViewsCanvas = $('#saveCanvas');
            var _touchCon = $('#touchCon');
            var _clearCanvas = $('#clearCanvas');
            var _clearFloat = $('#clearFloat');
            _clearCanvas.bind('click',function(){
                var objectCanvas = document.getElementById('canvas');
                var canvas = objectCanvas.getContext('2d');
                canvas.clearRect(0,0,300,400);
                var _touchCon = $('#touchCon');
                _touchCon.hide();
                var IndexViewDOM = $('#ON_'+ SaveM._canvasIndex);
                IndexViewDOM.removeClass('ui-btn-active');
                _isOpen = false;
                SaveViewsCanvas.attr('href','#');
            });
            _clearCanvas.bind('tap',function(){
                var objectCanvas = document.getElementById('canvas');
                var canvas = objectCanvas.getContext('2d');
                canvas.clearRect(0,0,300,400);
                var _touchCon = $('#touchCon');
                _touchCon.hide();
                var IndexViewDOM = $('#ON_'+ SaveM._canvasIndex);
                IndexViewDOM.removeClass('ui-btn-active');
                _isOpen = false;
                SaveViewsCanvas.attr('href','#');
            });
            _clearFloat.bind('click',function(){
                    _touchCon.fadeOut('slow');
            });
            _clearFloat.bind('tap',function(){
                    _touchCon.fadeOut('slow');
            });
        }
        //预览事件绑定
        var CreatePageLive = function(){
            $('#saveCanvas').bind('click',function(e){
                    var _touchCon = $('#touchCon');
                     _touchCon.hide();
                    if(_isOpen == true){
                        var objectCanvas = document.getElementById('canvas');
                        var canvas = objectCanvas.getContext('2d');
                        var save = document.getElementById('save');
                        save.style.display = 'block';
                        save.src = "";
                        var url = objectCanvas.toDataURL('image/jpeg');
                        save.src = url;
                    }
            });
            $('#saveCanvas').bind('tap',function(){
                    var _touchCon = $('#touchCon');
                    _touchCon.hide();
                    if(_isOpen == true){
                        var objectCanvas = document.getElementById('canvas');
                        var canvas = objectCanvas.getContext('2d');
                        var save = document.getElementById('save');
                        save.style.display = 'block';
                        save.src = "";
                        var url = objectCanvas.toDataURL('image/jpeg');
                        save.src = url;
                    }
            });
            //当视图通过动画效果显示在屏幕之后触发此事件
            $('#Sview').live('pageshow',function(event){

            });
        }
        var isOnEvent = true;
        var CanvasEventRectangleTouchs = function(data){
            var data = data;
            var value = data.Value;
            var _canvas = $('#canvas');
            var _touchCon = $('#touchCon');
            var _indexPage = $('#indexPage');
            _canvas.bind('vmousedown',function(e){
                var e = e;
                var touchX = e.pageX;
                var touchY = e.pageY;
                if( CanvasEventListTypes === 'rectangle'){
                    if(touchY < 465 && touchY > 230 && touchX > 25 && touchX < 275){
                        _touchCon.css({
                                top:touchY,
                                left:touchX-30
                        });
                        _touchCon.fadeIn('slow');
                       if(touchX < 45){
                           var _ones = value[0];
                           var _color_o = _ones.color;
                           var _moveData_o = _ones.moveData;
                           _touchCon.css({
                                background:_color_o
                           });
                            _touchCon.text('').text(_moveData_o+' 元（￥）');
                       }
                       if(touchX > 45 && touchX < 65){
                            var _twos = value[1];
                            var _color_a = _twos.color;
                            var _moveData_a = _twos.moveData;
                            _touchCon.css({
                                background:_color_a
                            });
                            _touchCon.text('').text(_moveData_a+' 元（￥）');
                       }
                       if(touchX > 65 && touchX < 85){
                            var _three = value[2];
                            var _color_b = _three.color;
                            var _moveData_b = _three.moveData;
                            _touchCon.css({
                                background:_color_b
                            });
                            _touchCon.text('').text(_moveData_b+' 元（￥）');
                       }
                       if(touchX > 85 && touchX < 105){
                            var _four = value[3];
                            var _color_c = _four.color;
                            var _moveData_c = _four.moveData;
                            _touchCon.css({
                                background:_color_c
                            });
                            _touchCon.text('').text(_moveData_c+' 元（￥）');
                       }
                       if(touchX > 105 && touchX < 125){
                            var _five = value[4];
                            var _color_d = _five.color;
                            var _moveData_d = _five.moveData;
                            _touchCon.css({
                                background:_color_d
                            });
                            _touchCon.text('').text(_moveData_d+' 元（￥）');
                       }
                       if(touchX > 125 && touchX < 145){
                            var _six = value[5];
                            var _color_e = _six.color;
                            var _moveData_e = _six.moveData;
                            _touchCon.css({
                                background:_color_e
                            });
                            _touchCon.text('').text(_moveData_e+' 元（￥）');
                       }
                       if(touchX > 145 && touchX < 165){
                            var _seven = value[6];
                            var _color_f = _seven.color;
                            var _moveData_f = _seven.moveData;
                            _touchCon.css({
                                background:_color_f
                            });
                            _touchCon.text('').text(_moveData_f+' 元（￥）');
                       }
                       if(touchX > 165 && touchX < 185){
                            var _eight = value[7];
                            var _color_g = _eight.color;
                            var _moveData_g = _eight.moveData;
                            _touchCon.css({
                                background:_color_g
                            });
                            _touchCon.text('').text(_moveData_g+' 元（￥）');
                       }
                       if(touchX > 185 && touchX < 210){
                            var _nine = value[8];
                            var _color_h = _nine.color;
                            var _moveData_h = _nine.moveData;
                            _touchCon.css({
                                background:_color_h
                            });
                            _touchCon.text('').text(_moveData_h+' 元（￥）');
                       }
                       if(touchX > 210 && touchX < 235){
                            var _ten = value[9];
                            var _color_j = _ten.color;
                            var _moveData_j = _ten.moveData;
                            _touchCon.css({
                                background:_color_j
                            });
                            _touchCon.text('').text(_moveData_j+' 元（￥）');
                       }
                       if(touchX > 235 && touchX < 255){
                            var _eleven = value[10];
                            var _color_k = _eleven.color;
                            var _moveData_k = _eleven.moveData;
                            _touchCon.css({
                                background:_color_k
                            });
                            _touchCon.text('').text(_moveData_k+' 元（￥）');
                       }
                       if(touchX > 255 && touchX < 275){
                            var _twelve = value[11];
                            var _color_l = _twelve.color;
                            var _moveData_l = _twelve.moveData;
                            _touchCon.css({
                                background:_color_l
                            });
                            _touchCon.text('').text(_moveData_l+' 元（￥）');
                       }
                    }else{
                        _touchCon.fadeOut('slow');
                    }
                }
                if(CanvasEventListTypes === 'rotundity'){
                    //console.log(touchX);
                    //console.log(touchY);
                    _touchCon.css({
                        top:touchY,
                        left:touchX-30
                    });
                    _touchCon.fadeIn('slow');
                    if(touchX > 55 && touchX < 255 && touchY > 215 && touchY<315){
                        var _twelve = value[11];
                        var _color_r = '#7c99b5';
                        var _moveData_r = '142345600';
                        _touchCon.css({
                                background:_color_r
                        });
                        _touchCon.text('').text(_moveData_r+' 元（￥）');
                    }else if(touchX > 55 && touchX < 255 && touchY > 315&&touchY<415){
                        var _twelve = value[11];
                        var _color_w = '#d7cf48';
                        var _moveData_w = '142345600';
                        _touchCon.css({
                                background:_color_w
                        });
                        _touchCon.text('').text(_moveData_w+' 元（￥）');
                    }else{
                        _touchCon.fadeOut('slow');
                    }
                }
                if( CanvasEventListTypes === 'beeline'){
                    _touchCon.css({
                        top:touchY,
                        left:touchX-30
                    });
                    _touchCon.fadeIn('slow');
                }
            });
            _canvas.bind('vmouseup',function(e){
                //_touchCon.empty().fadeOut('slow');
            });
        }
        $(function(){
            //初始化视图结构
            CanvasINITS(function(){
                //加载JQMobile
                JQMobileLoad();
                //初始化第一次数据分析图表
                CanvasIndexLoad(1);
                //预览
                CreatePageLive();
                //$('#exbtn').fadeIn('slow');
                $('#contents').fadeIn('slow');
                //$('#footer').fadeIn('slow');
            });
            //在JQMobile运行之前所触发的事件
            $(document).bind('mobileinit',function(){
                $.extend($.mobile,{
                    loadingMessage:'加载中....',
                    pageLoadErrorMessage:'页面资源加载失败....'
                });
            });
        });
})(jQuery);