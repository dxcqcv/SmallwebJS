(function($){
	var comm = {
		baseUrl:function(){
			var loca = document.location.href;
	 		var _url = loca.substring(0,loca.lastIndexOf('/'));
	 		return _url;
		},
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
		CreateCanvasCurrentKM:function(data){
			//console.log(data);
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
		}
	}
	var _isCanvas = false;
	var _url = comm.baseUrl();
	var index = [];
	var getLoadKmNav = function(id,data){
		var data = data;
		var id = id;
		//console.log(id);
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
	}
	var KmInitsNav = function(callbacks){
		var doms = '';
		comm.getSrv({
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
				DialogLoad();
				CanvasPreview();
				CanvasClearMove();
				addDropList();
				KmVisit();
				CheckboxListEvent();
				CanvasEventList();
				if($('#MoneyContent').length == 0){
					$('#canvasmouse').append('<div id="MoneyContent" class="_money" style="display:none;"></div>')
				}
			}
		});
	}
	var CanvasEList = {};
	var CanvasEventList = function(){
		var canvas = $('#canvas');
		var MoneyContent = $('#MoneyContent');
		canvas.bind('click',function(e){
			var data = CanvasEList;
			var isTure = JSON.stringify(data);
			if(isTure.length > 2){
				var x = e.pageX;
				var y = e.pageY;
			}
		});	
	}
	var CheckboxListEvent = function(){
		for(var i = 0,len = index.length;i<len;i++){
			(function(_i){
				var _id = 'check_'+ index[i];
				var _dropNavs = document.getElementById(_id);
				//console.log(_dropNavs);
				_dropNavs.focus();
				_dropNavs.addEventListener('click',function(){
					if(this.checked){
						//this.setAttribute('disabled','true');
						var id = this.getAttribute('id');
						var _index = id.split('_')[1];
						var dropID = 'drop_'+_index;
						var _currs = $('#'+dropID);
						_currs.attr('draggable','false');
			 			_currs.attr('class','cur');
						var _url = comm.baseUrl();
					    comm.getSrv({
						  	url:_url + '/data/Km'+_index+'.js',
						  	callback:function(data){
					  			var data = data;
					  			CanvasViewList(data);
					  			_isCanvas = true;
						  	}
						});
					}else{
						for(var j = 0,len = index.length;j<len;j++){
							(function(_j){
								var id = 'drop_'+ index[_j];
								var checkID = 'check_'+index[_j];
								var checks = document.getElementById(checkID);
								checks.checked = false;
								//checks.setAttribute('disabled','false');
								$('#'+id).attr('draggable','true');
						 		$('#'+id).attr('class','drops');
					 		 	var objectCanvas = document.getElementById('canvas');
								var canvas = objectCanvas.getContext('2d');
								canvas.clearRect(0,0,800,600);
								_isCanvas = false;
							})(j);
						}
					}
				});
			})(i);
		}
	}
	var KmVisit = function(){
		var _kms = $('#kms');
		var _kmconts = $('#kmconts');
		_kms.bind('click',function(e){
			var s = $(this).attr('s');
			var _self = $(this);
			if(s === 'n'){
				setTimeout(function(){
					_self.attr('s','b');
					_kmconts.fadeIn('slow');
				},300)
			}else{
				setTimeout(function(){
					_self.attr('s','n');
					_kmconts.fadeOut('slow');
				},300);
			}
		});
	}
	var DialogLoad = function(){
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
	}
	var CanvasViewList = function(data){
		var data = data;
		var type = data.type;
		if(type === 'current'){
			CanvasEList = data;
			comm.CreateCanvasCurrentKM(data);
		}
	}
	var CanvasINITS = function(index){
		var checkID = 'check_'+index;
		var checks = document.getElementById(checkID);
		checks.checked = true;
		var _curr = $('#drop_'+ index);
		_curr.attr('draggable','false');
	 	_curr.attr('class','cur');
		var _url = comm.baseUrl();
	    comm.getSrv({
		  	url:_url + '/data/Km'+index+'.js',
		  	callback:function(data){
	  			var data = data;
	  			CanvasViewList(data);
	  			_isCanvas = true;
		  	}
		});
	}
	var addDropList = function(){
		for(var i = 0,len = index.length;i<len;i++){
			(function(_i){
				var _id = 'drop_'+ index[i];
				var _dropNavs = document.getElementById(_id);
				//console.log(_dropNavs);
				_dropNavs.addEventListener('dragstart',function(ev){
					var e = ev;
					var dt = e.dataTransfer;
					dt.effectAllowed = 'copyMove';
					dt.setData('text/plain',this.id);
				});
			})(i);
		}
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
				var _url = comm.baseUrl();
			    comm.getSrv({
				  	url:_url + '/data/Km'+index+'.js',
				  	callback:function(data){
			  			var data = data;
			  			CanvasViewList(data);
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
	var CanvasPreview = function(){
		var _dropSave = $('#dropSave');
		var _dialog = $('#dialog')
		_dropSave.bind('click',function(){
			var objectCanvas = document.getElementById('canvas');
			var canvas = objectCanvas.getContext('2d');
			var save = document.getElementById('save');
			save.src = "";
			if(_isCanvas == true){
				var url = objectCanvas.toDataURL('image/jpeg');
				save.src = url;
				_dialog.dialog('open');
			}
		});
	}
	var CanvasClearMove = function(){
		var _dropsmove = $('#dropsmove');
		_dropsmove.bind('click',function(e){
			for(var i = 0,len = index.length;i<len;i++){
				(function(_i){
					var id = 'drop_'+ index[_i];
					var checkID = 'check_'+index[_i];
					var checks = document.getElementById(checkID);
					checks.checked = false;
					//checks.setAttribute('disabled','false');
					$('#'+id).attr('draggable','true');
			 		$('#'+id).attr('class','drops');
		 		 	var objectCanvas = document.getElementById('canvas');
					var canvas = objectCanvas.getContext('2d');
					canvas.clearRect(0,0,800,600);
					_isCanvas = false;
				})(i);
			}
		});
	}
	$(function(){
		KmInitsNav(function(parms){
			CanvasINITS(1);
			$('#centerContent').fadeIn('slow');
		});
	});
})(jQuery);