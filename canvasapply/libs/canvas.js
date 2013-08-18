(function($){
	var commPrefix = {
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
		//矩形
		rectangle:function(data){
				var value = data.Value;
				var Yletter = data.Yletter;
				var Xletter = data.Xletter;
				var objectCanvas = document.getElementById('canvas');
				var canvas = objectCanvas.getContext('2d');
				var canvasWidth = objectCanvas.width;
				var canvasHeight = objectCanvas.height;
				console.log(canvas);
				//清除一次
				canvas.clearRect(0,0,canvasWidth,canvasHeight);
				//设置背景色
				canvas.fillStyle = '#fff';
				canvas.fillRect(0,0,objectCanvas.width,objectCanvas.height);
				//箭头Y轴
				canvas.beginPath();
				canvas.lineTo(100,50);
				canvas.moveTo(100,50);
				canvas.lineTo(95,60);
				canvas.strokeStyle = '#000';
				canvas.closePath();
				canvas.fill();
				canvas.stroke();
				canvas.beginPath();
				canvas.lineTo(100,50);
				canvas.moveTo(100,50);
				canvas.lineTo(105,60);
				canvas.strokeStyle = '#000';
				canvas.closePath();
				canvas.fill();
				canvas.stroke();
				//箭头X轴
				canvas.beginPath();
				canvas.lineTo(750,400);
				canvas.moveTo(750,400);
				canvas.lineTo(745,405);
				canvas.strokeStyle = '#000';
				canvas.closePath();
				canvas.fill();
				canvas.stroke();
				canvas.beginPath();
				canvas.lineTo(750,400);
				canvas.moveTo(750,400);
				canvas.lineTo(745,395);
				canvas.strokeStyle = '#000';
				canvas.closePath();
				canvas.fill();
				canvas.stroke();
				//坐标直线Y轴
				canvas.beginPath();
				canvas.lineTo(100,50);
				canvas.lineTo(100,400);
				canvas.strokeStyle = '#000';
				canvas.closePath();
				canvas.fill();
				canvas.stroke();
				//坐标直线X轴
				canvas.beginPath();
				canvas.lineTo(100,400);
				canvas.lineTo(750,400);
				canvas.strokeStyle = '#000';
				canvas.closePath();
				canvas.fill();
				canvas.stroke();
				//坐标Y轴文字
				canvas.fillStyle = '#000';
				canvas.textAlign = 'middle';
				canvas.font = '12px';
				canvas.fillText(Yletter,25,50,70);
				//坐标X轴文字
				canvas.fillStyle = '#000';
				canvas.textAlign = 'middle';
				canvas.font = '12px';
				canvas.fillText(Xletter,680,440,180);
				var pathX = 80 + 50;
				var pathY = 400;
				var max = 140;
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
							canvas.fillStyle = '#000';
							canvas.textAlign = 'middle';
							canvas.font = '8px';
							canvas.fillText(name,pathX,ressY,40);
							canvas.strokeStyle = '#4eb661';
							canvas.textAlign = 'middle';
							canvas.font = '8px';
							canvas.fillText('约'+MYRIAD+'万元',pathX,fontY,40);
							canvas.fillStyle = color;
							canvas.fillRect(pathX,y,40,MOVE);
							canvas.strokeRect(pathX,y,40,MOVE);
							pathX = pathX + 50;
				}
		},
		//圆形
		rotundity:function(data){
				var value = data.Value;
				var objectCanvas = document.getElementById('canvas');
				var canvas = objectCanvas.getContext('2d');
				var canvasWidth = objectCanvas.width;
				var canvasHeight = objectCanvas.height;
				console.log(canvas);
				//清除一次
				canvas.clearRect(0,0,canvasWidth,canvasHeight);
				//设置背景色
				canvas.fillStyle = '#fff';
				canvas.fillRect(0,0,objectCanvas.width,objectCanvas.height);

				canvas.beginPath();
				canvas.arc(400,250,200,0,Math.PI,false);
				canvas.closePath();
				canvas.fillStyle = '#d7cf48';
				canvas.fill();
				
				canvas.beginPath();
				canvas.arc(400,250,200,Math.PI,Math.PI*2,false);
				canvas.closePath();
				canvas.fillStyle = '#7c99b5';
				canvas.fill();

				canvas.fillStyle = '#7c99b5';
				canvas.fillRect(650,230,10,10);
				canvas.fillStyle = '#000';
				canvas.textAlign = 'middle';
				canvas.font = '12px';
				canvas.fillText('央行资产：一亿二千万',665,238,120);
				
				canvas.fillStyle = '#d7cf48';
				canvas.fillRect(650,260,10,10);
				canvas.fillStyle = '#000';
				canvas.textAlign = 'middle';
				canvas.font = '12px';
				canvas.fillText('工行资产：一亿二千万',665,268,120);
		},
		//直线
		beeline:function(data){
			var value = data.Value;
			var Yletter = data.Yletter;
			var Xletter = data.Xletter;
			var objectCanvas = document.getElementById('canvas');
			var canvas = objectCanvas.getContext('2d');
			var canvasWidth = objectCanvas.width;
			var canvasHeight = objectCanvas.height;
			console.log(canvas);
			//清除一次
			canvas.clearRect(0,0,canvasWidth,canvasHeight);
			//设置背景色
			canvas.fillStyle = '#fff';
			canvas.fillRect(0,0,objectCanvas.width,objectCanvas.height);
			//箭头Y轴
			canvas.beginPath();
			canvas.lineTo(100,50);
			canvas.moveTo(100,50);
			canvas.lineTo(95,60);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			canvas.beginPath();
			canvas.lineTo(100,50);
			canvas.moveTo(100,50);
			canvas.lineTo(105,60);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			//箭头X轴
			canvas.beginPath();
			canvas.lineTo(750,400);
			canvas.moveTo(750,400);
			canvas.lineTo(745,405);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			canvas.beginPath();
			canvas.lineTo(750,400);
			canvas.moveTo(750,400);
			canvas.lineTo(745,395);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			//坐标直线Y轴
			canvas.beginPath();
			canvas.lineTo(100,50);
			canvas.lineTo(100,400);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			//坐标直线X轴
			canvas.beginPath();
			canvas.lineTo(100,400);
			canvas.lineTo(750,400);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			//坐标Y轴文字
			canvas.fillStyle = '#000';
			canvas.textAlign = 'middle';
			canvas.font = '12px';
			canvas.fillText(Yletter,25,50,70);
			//坐标X轴文字
			canvas.fillStyle = '#000';
			canvas.textAlign = 'middle';
			canvas.font = '12px';
			canvas.fillText(Xletter,680,440,180);
			var pathX = 80 + 50;
			var pathY = 400;
			var CurveX = 100;
			var CurveY = 400;
			var SendX = 100;
			var SendY = 400;
			var _MOVE = 0;
			var FileY = 0;
			var _FileY = 0;
			for(var j = 0,len = value.length;j<len;j++){
					var name = value[j].name;
					var moveData = value[j].moveData;
					//10W为单位
					var MOVE = parseInt (moveData / 100000);
					//1W为单位
					var MYRIAD = parseInt (moveData / 10000);
					var y = pathY - MOVE;
					var fontY = y - 5;
					var ressY = pathY + 15;
					SendX = SendX + 50;
					if( _MOVE < MOVE ){
						FileY = Math.abs(MOVE - SendY);
						_MOVE = MOVE;
						SendY = FileY;
					}else{
						_FileY = Math.abs(SendY + (_MOVE-MOVE));
						_MOVE = MOVE;
						SendY = _FileY;
					}
					canvas.fillStyle = '#000';
					canvas.textAlign = 'middle';
					canvas.font = '8px';
					canvas.fillText(name,pathX,ressY,40);
					canvas.strokeStyle = '#4eb661';
					canvas.textAlign = 'middle';
					canvas.font = '8px';
					canvas.fillText('约'+MYRIAD+'万元',pathX,y,40);
					canvas.beginPath();
					canvas.lineTo(CurveX,CurveY);
					canvas.lineTo(SendX,SendY);
					canvas.strokeStyle = '#568';
					canvas.lineWidth = '1'
					canvas.stroke();
					canvas.closePath();
					pathX = pathX + 50;
					CurveX = SendX;
					CurveY = SendY;
			}	
		},
		//曲线
		curves:function(data){
			var value = data.Value;
			var Yletter = data.Yletter;
			var Xletter = data.Xletter;
			var objectCanvas = document.getElementById('canvas');
			var canvas = objectCanvas.getContext('2d');
			var canvasWidth = objectCanvas.width;
			var canvasHeight = objectCanvas.height;
			console.log(canvas);
			//清除一次
			canvas.clearRect(0,0,canvasWidth,canvasHeight);
			//设置背景色
			canvas.fillStyle = '#fff';
			canvas.fillRect(0,0,objectCanvas.width,objectCanvas.height);
			//箭头Y轴
			canvas.beginPath();
			canvas.lineTo(100,50);
			canvas.moveTo(100,50);
			canvas.lineTo(95,60);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			canvas.beginPath();
			canvas.lineTo(100,50);
			canvas.moveTo(100,50);
			canvas.lineTo(105,60);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			//箭头X轴
			canvas.beginPath();
			canvas.lineTo(750,400);
			canvas.moveTo(750,400);
			canvas.lineTo(745,405);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			canvas.beginPath();
			canvas.lineTo(750,400);
			canvas.moveTo(750,400);
			canvas.lineTo(745,395);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			//坐标直线Y轴
			canvas.beginPath();
			canvas.lineTo(100,50);
			canvas.lineTo(100,400);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			//坐标直线X轴
			canvas.beginPath();
			canvas.lineTo(100,400);
			canvas.lineTo(750,400);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			//坐标Y轴文字
			canvas.fillStyle = '#000';
			canvas.textAlign = 'middle';
			canvas.font = '12px';
			canvas.fillText(Yletter,25,50,70);
			//坐标X轴文字
			canvas.fillStyle = '#000';
			canvas.textAlign = 'middle';
			canvas.font = '12px';
			canvas.fillText(Xletter,680,440,180);	
		}
	};
	var _isCanvas = false;
	//结构初始化
	function dropinits(callbacks){
			var doms = "";
 			var top = 0;
 			var left = 0;
 			var index = [];
 			var _url = commPrefix.baseUrl();
 			commPrefix.getSrv({
 				  url:_url + '/data/drop.js',
 				  callback:function(data){
	 				  	 var data = data.Value;
	 				  	 doms +='<header><nav class="dropfer" id="dropFather">';
	 				  	 top = 10;
	 				  	 left = 12;
	 				  	 for(var x in data){
	 				  	 			var id = data[x].id;
	 				  	 			index.push(id);
	 				  	 			var name = data[x].name;
	 				  	 			doms +='<div id="drop_'+id+'" draggable = "true" class="drops" style="top:'+top+'px;left:'+left+'px;">'+name+'</div>';
	 				  	 			top = top + 90;
	 				  	 }
	 				  	 doms += '</nav></header>';
	 				  	 var centerContent = $('#centerContent');
	 					 centerContent.prepend(doms);
 						 drop(index);
 						 dropstater(index);
 				  }
 			});
 			if($('#dialog').length == 0){
				$('body').append('<div id="dialog" title="图表保存"><div style="float:left;" id="core"><img src="" id="save" /></div></div>');
			}
			if(typeof callbacks === 'function'){
				callbacks();
			}
	};
	var diffX = 0;
	var diffY = 0;
	var _indexOf = false;
	//添加拖拽事件
	function drop(index){
			if(index !== undefined){
				for(var i = 0, len = index.length;i<len;i++){
					 (function(_i){
						 var id = 'drop_'+ index[_i];
						 var drops = document.getElementById(id);
						 		//拖放开始
						 drops.addEventListener('dragstart',function(ev){
									var e = ev;
									var dt = e.dataTransfer;
									dt.effectAllowed = 'copyMove';
									dt.setData('text/plain',this.id);
									//var target = e.target;
									//var _tar = $(target);
									//var offset = _tar.offset();
									//var offsetLeft = offset.left;
					 		 		//var offsetTop = offset.top;
									//diffX = e.clientX - offsetLeft;
					 		 		//diffY = e.clientY - offsetTop;
						 },false);
						//拖放过程中
						/*
						drops.addEventListener('drag',function(ev){
								var e = ev;
								var target = e.target;
								var _tar = $(target);
								var left = (e.clientX - diffX);
								var top = (e.clientY - diffY);
								_tar.css({
										left:left,
										top:top	
								});
								 e.preventDefault();
			 					 e.stopPropagation();
						},false);
						*/
					 })(i);
			  }
			}
			var canvasmouse = document.getElementById('canvasmouse');
			var $canvasmouse = $(canvasmouse);
			var canvas = document.getElementById('canvas');
			//鼠标经过的目标位置元素
			canvas.addEventListener('dragover',function(e){
					var e = e;
					var dt = e.dataTransfer;
					dt.effectAllowed = 'copyMove';
					//console.log(dt.getData('text/plain'));
					e.preventDefault();
			},false);
			//鼠标拖放的目标位置
			canvas.addEventListener('drop',function(e){
					_isCanvas = true;
					var e = e;
				  	var dt = e.dataTransfer;
					dt.effectAllowed = 'copyMove';
				  	var id = dt.getData('text/plain');
				  	var _curr = $('#'+id);
				 	_curr.attr('draggable','false');
				 	_curr.attr('class','cur');
				  	if(typeof id === 'string'){
				  	 	var index = id.split('_')[1];
					}
					var _url = commPrefix.baseUrl();
				    commPrefix.getSrv({
					  	url:_url + '/data/drop'+index+'.js',
					  	callback:function(data){
					  			var data = data;
					  			canvasList(data);
					  	}
					});
				    e.preventDefault();
				    e.stopPropagation();
			},false);
			//开始进入目标位置
			canvas.addEventListener('dragenter',function(e){
					var e = e;
					e.preventDefault();
			},false);
			//在目标位置上结束拖放操作
			canvas.addEventListener('dragend',function(e){
					var e = e;
					e.preventDefault();
			});
			//取消页面默认事件
			document.ondragover = function(e){
					e.preventDefault();
			}
			document.ondrop = function(e){
				  e.preventDefault();
			}
	}
	//预览的对话框
	function SaveDialog(){
			var $dialog = $('#dialog');
			$dialog.dialog({
					modal: true,
					autoOpen: _isCanvas, 
					resizable: false, 
					width: 850,
					height:600,
					buttons:[
							
							{
								text:'取消',
								click:function(){
									$(this).dialog('close');	
									_isCanvas = true;
								}	
							},
							{
								text:'保存',
								click:function(){	
									$(this).dialog('close');	
									_isCanvas = true;
								}
							}
					]	
			});
			var objectCanvas = document.getElementById('canvas');
			var canvas = objectCanvas.getContext('2d');
			var save = document.getElementById('save');
			save.src = "";
			if(_isCanvas == true){
				var url = objectCanvas.toDataURL('image/jpeg');
				save.src = url;
				
			}
	}
	//预览，恢复拖放，清除画图
	function dropstater(index){
		//恢复与清除
		if(index !== undefined){
				for(var i = 0,len = index.length;i<len;i++){
					(function(_i){
							var id = 'drop_'+ index[_i];
							$('#dropsmove').bind('click',function(e){
								 $('#'+id).attr('draggable','true');
						 		 $('#'+id).attr('class','drops');
					 		 	 var objectCanvas = document.getElementById('canvas');
								 var canvas = objectCanvas.getContext('2d');
								 canvas.clearRect(0,0,800,600);
								 _isCanvas = false;
							});
					})(i);
				}
		}
		//预览
		$('#dropSave').bind('click',function(e){
				SaveDialog();
		});
	}
	//画图类型
	function canvasList(data){
				var data = data;
				var type = data.type;
				var value = data.Value;
				var objectCanvas = document.getElementById('canvas');
				var canvas = objectCanvas.getContext('2d');
				//第一种类型，矩形数据图表
				if(type === 'rectangle'){
					commPrefix.rectangle(data);
				}
				//第二种类型，圆形数据图表
				if(type === 'rotundity'){
					commPrefix.rotundity(data);
				}
				//第三种类型，直线数据图表
				if(type==='beeline'){
					commPrefix.beeline(data);
				}
				//第四种类型，曲线数据图表
				if (type==='curve') {
					commPrefix.curves(data);
				}
	}
	//dom加载完成之后，执行初始化函数
	$(function(){
		dropinits(function(){
			$('#centerContent').fadeIn('slow');
		});
	});
})(jQuery);