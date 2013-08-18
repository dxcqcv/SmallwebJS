(function($){
	var index = [];
	var _isCanvas = false;
	var x = {};
	var KmURL = function(){
		var loc = document.location.href;
		var _url = loc.substring(0,loc.lastIndexOf('/'));
		return _url;
	};
	var KmSrc = function(parms){
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
	};
	var getLoadKmNav = function(id,data){
		var data = data;
		var id = id;
		var doms = '';
		var saveDoms = '';
		for(var i = 0,len = data.length;i<len;i++){
			var _id = data[i].id;
			var _pid = data[i].pid;
			var _name = data[i].name;
			var _kmdm = data[i].kmdm;
			if(id == _pid){
				index.push(_id);
				doms += '<div id="drop_'+_id+'" draggable = "true" class="drops">'+_name+' {'+_kmdm+'}'+'</div>';
				doms += '<div class="chek">'+'<input type="checkbox" id ="check_'+_id+'"/></div>';
			}
		}
		if(doms !== undefined){
			saveDoms = doms;
		}
		return saveDoms;
	}; 
	var Savework = function(){
		var _dialog = $('#dialog');
			_dialog.dialog({
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

			var url = objectCanvas.toDataURL('image/jpeg');
			save.src = url;
			_dialog.dialog('open');
	}
	var Clearwork = function(){
		for(var i = 0,len = index.length;i<len;i++){
			(function(_i){
				var id = 'drop_'+ index[_i];
				var checkID = 'check_'+index[_i];
				var checks = document.getElementById(checkID);
				checks.checked = false;
				$('#'+id).attr('draggable','true');
		 		$('#'+id).attr('class','drops');
	 		 	var objectCanvas = document.getElementById('canvas');
				var canvas = objectCanvas.getContext('2d');
				canvas.clearRect(0,0,800,600);
			})(i);
		}
	}
	var _url = KmURL();
	function KmCanvasListBlock(index){
		this.index = index;
		this.data = {};
		this.addDrop = function(){
			var self = this;
			var _id = 'drop_' + this.index;
			var _dropNavs = document.getElementById(_id);
			_dropNavs.addEventListener('dragstart',function(ev){
				var e = ev;
				var dt = e.dataTransfer;
				dt.effectAllowed = 'copyMove';
				dt.setData('text/plain',this.id);
			});
			x = self;
		};
		this.Sbrushwork = function(){
			var data = this.data;
			var txtX = data.txtX;
			var txtY = data.txtY;
			var objectCanvas = document.getElementById('canvas');
			var canvas = objectCanvas.getContext('2d');
			var canvasWidth = objectCanvas.width;
			var canvasHeight = objectCanvas.height;
			//清除一次
			canvas.clearRect(0,0,canvasWidth,canvasHeight);
			//设置背景色
			canvas.fillStyle = '#fff';
			canvas.fillRect(0,0,objectCanvas.width,objectCanvas.height);
			//箭头Y轴
			canvas.beginPath();
			canvas.lineTo(100,120);
			canvas.moveTo(100,120);
			canvas.lineTo(95,130);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			canvas.beginPath();
			canvas.lineTo(100,120);
			canvas.moveTo(100,120);
			canvas.lineTo(105,130);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			//箭头X轴
			canvas.beginPath();
			canvas.lineTo(750,460);
			canvas.moveTo(750,460);
			canvas.lineTo(745,465);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			canvas.beginPath();
			canvas.lineTo(750,460);
			canvas.moveTo(750,460);
			canvas.lineTo(745,455);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			//坐标直线Y轴
			canvas.beginPath();
			canvas.lineTo(100,120);
			canvas.lineTo(100,460);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			//坐标直线X轴
			canvas.beginPath();
			canvas.lineTo(100,460);
			canvas.lineTo(750,460);
			canvas.strokeStyle = '#000';
			canvas.closePath();
			canvas.fill();
			canvas.stroke();
			//坐标Y轴文字
			canvas.fillStyle = '#000';
			canvas.textAlign = 'middle';
			canvas.font = '12px';
			canvas.fillText(txtY,25,130,70);
			//坐标X轴文字
			canvas.fillStyle = '#000';
			canvas.textAlign = 'middle';
			canvas.font = '12px';
			canvas.fillText(txtX,680,500,180);
			//X轴时间文字
			var day = data.day;
			var dayX = 110;
			var LineX = 113;
			for(var i = 0,len = day.length;i<len;i++){
				canvas.fillStyle = '#000';
				canvas.textAlign = 'middle';
				canvas.font = '12px';
				canvas.fillText(day[i],dayX,480,180);
				canvas.beginPath();
				canvas.lineTo(LineX,460);
				canvas.lineTo(LineX,455);
				canvas.strokeStyle = '#000';
				canvas.closePath();
				canvas.stroke();
				dayX = dayX + 20;
				LineX = LineX + 20;
			}
			var lendColor = data.lendColor;
			var loanColor = data.loanColor;
			//Y轴文字
			var kmlend = data.kmlend;
			var kmloan = data.kmloan;
			//借方
			canvas.fillStyle = lendColor;
			canvas.textAlign = 'middle';
			canvas.font = '12px';
			canvas.fillText(kmlend,70,28,180);
			canvas.fillRect(20,20,40,10);
			canvas.fillStyle = lendColor;
			//贷方	
			canvas.fillStyle = loanColor;
			canvas.textAlign = 'middle';
			canvas.font = '12px';
			canvas.fillText(kmloan,70,68,180);
			canvas.fillRect(20,60,40,10);
			canvas.fillStyle = lendColor;
			//余额
			var allbalance = data.allbalance;
			canvas.fillStyle = '#ccc';
			canvas.fillRect(530,60,40,10);
			canvas.fillStyle = '#000';
			canvas.textAlign = 'middle';
			canvas.font = '12px';
			canvas.fillText('余额总数：'+allbalance+'元（￥）',580,68,180);
			//标注
			var loaclName = data.loaclName;
			canvas.fillStyle = '#000';
			canvas.textAlign = 'middle';
			canvas.font = '18px';
			canvas.fillText(loaclName,480,68,180);
			//借方趋势
			var LendDay = data.LendDay;
			var _LdayX = 100;
			var _LdayY = 410;
			var _osX = 115;
			var _oxY = 410;
			for(var j = 0,lens = LendDay.length;j<lens;j++){
				var _day = LendDay[j].day;
				var _kmMoney = LendDay[j].kmMoney;
				var _kMoney = _kmMoney.replace(/,/g,"");
				var _Money = parseInt(_kMoney)/1000;
				var _y = _oxY - _Money/5;
				canvas.beginPath();
				canvas.lineTo(_LdayX,_LdayY);
				canvas.moveTo(_LdayX,_LdayY);
				canvas.lineTo(_osX,_y);
				canvas.strokeStyle = lendColor;
				canvas.lineWidth = '1'
				canvas.closePath();
				canvas.stroke();
				_LdayX = _osX ;
				_osX = _osX + 20;
				_LdayY = _y;
			}
			//贷方趋势
			var loanDay = data.loanDay;
			var _LoX = 100;
			var _LoY = 410;
			var _LosX = 115;
			var _LoxY = 410;
			for(var o = 0,le = loanDay.length;o<le;o++){
				var _loday = loanDay[o].day;
				var _loKmMoney = loanDay[o].kmMoney;
				var _lokMoney = _loKmMoney.replace(/,/g,"");
				var _loMoney = parseInt(_lokMoney)/1000;
				///console.log(_loMoney);
				var y = _LoxY - _loMoney/5;
				///console.log(y);
				canvas.beginPath();
				canvas.lineTo(_LoX,_LoY);
				canvas.moveTo(_LoX,_LoY);
				canvas.lineTo(_LosX,y);
				canvas.strokeStyle = loanColor;
				canvas.lineWidth = '1'
				canvas.closePath();
				canvas.stroke();
				_LoX = _LosX ;
				_LosX = _LosX + 20;
				_LoY = y;
			}
		};
	}
	function Kminit(){
		var doms = '';
		var addDropEventList = function(){
			$('#dropSave').click(function(){
				Savework();
			});
			for(var i = 0,len = index.length;i<len;i++){
				(function(_i){
					var myCanvas = new KmCanvasListBlock(index[_i]);
					myCanvas.addDrop();
				})(i);
			}
		};
		KmSrc({
			url:_url + '/data/KmNav.js',
			callback:function(data){
				var value = data.Value;
				var time = data.time;
				var bills = '';
				doms +='<header><nav class="dropfer" id="dropFather"><h3>'+time+'</h3>';
			  	for(var x in value){
	  	 			var id = value[x].id;
	  	 			var pid = value[x].pid;
	  	 			var name = value[x].name;
	  	 			if(pid == -1){
	  	 				doms +='<div id="kms" class="km" s="n">'+name+'</div>';
	  	 			}
	  	 			bills += getLoadKmNav(id,value);
			  	}
			  	if(bills !== undefined){
			  		doms += '<div class="kmcont" id="kmconts" style="position: relative;">'+ bills +'</div>'+ '</nav></header>';
			  	}else{
			  		doms += '</nav></header>';
			  	}
			  	var centerContent = $('#centerContent');
				centerContent.prepend(doms);
				if(typeof callbacks === 'function'){
					callbacks({});
				}
				if($('#dialog').length == 0){
					$('body').append('<div id="dialog" title="图表保存"><div style="float:left;" id="core"><img src="" id="save" /></div></div>');
				}
				addDropEventList();
			}
		});
		var canvasmouse = document.getElementById('canvasmouse');
		var $canvasmouse = $(canvasmouse);
		var canvas = document.getElementById('canvas');
		canvas.addEventListener('dragover',function(e){
				var e = e;
				var dt = e.dataTransfer;
				dt.effectAllowed = 'copyMove';
				//console.log(dt.getData('text/plain'));
				e.preventDefault();
		},false);
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
				var checkID = 'check_'+index;
				var checks = document.getElementById(checkID);
				checks.checked = true;
			    KmSrc({
				  	url:_url + '/data/Km'+index+'.js',
				  	callback:function(data){
			  			x.data = data;
			  			x.Sbrushwork();
			  			_isCanvas = true;
				  	}
				});
			    e.preventDefault();
			    e.stopPropagation();
		},false);
		canvas.addEventListener('dragenter',function(e){
				var e = e;
				e.preventDefault();
		},false);
		canvas.addEventListener('dragend',function(e){
				var e = e;
				e.preventDefault();
		});
		document.ondragover = function(e){
				e.preventDefault();
		}
		document.ondrop = function(e){
			    e.preventDefault();
		}
	}
	$(function(){
		Kminit();
	});
})(jQuery);