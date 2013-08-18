/*
*	基于HTML5 API jQuery基础库的文件上传组件
*/
(function(window,undefined){
	if(!window.fileUpHtml){
		window.fileUpHtml = {};
	}
	var _f = fileUpHtml;
	/*
	*	@多文件控制与初始化类
	*/
	_f.Up = function(d,o){
		var $d = $('#'+d);
		var Svr = true;
		$d.css({position:'relative'});
		/*
		*	@配置参数 {object}
		*	@dialog 是否配置有对话框窗口 {bool}
		*	@autoOpen 是否配置对话框窗口初始化时打开 {bool}
		*	@title 是否配置对话框窗口的标题信息	{string}
		*	@onSubmit  触发了提交上传的事件 {function}
		*/
		var config = {
			dialog:true,
			autoOpen:false,
			title:'多文件上传预览',
			onSubmit:function(){}
		};
		/*
		*	@储存可用DOM {object}
		*	@cont  相对上传控件的根节点{DOM object}
		*	@but 上传控件的初始化按钮 {DOM object}
		*	@dialog 上传控件的对话框对象 {DOM object}
		*	@dialog - parent 上传控件对话框根节点 {DOM object}
		*	@dialog - title  上传控件标题节点 {DOM object}
		*	@dialog - content  上传控件中间内容区域 {DOM object}
		*	@dialog - buts  上传控件底部按钮 {Array DOM object}
		*	@dialog - ul 上传控件文件信息放置区域 {DOM object}
		*	@input  上传控件input {DOM object}
		*	@guage  上传控件动画进度条 {DOM object}
		*	@succee 上传控件成功信息返回 {DOM object}
		*/
		var module = {
			cont:null,
			but:null,
			dialog:{
				parent:null,
				title:null,
				content:null,
				buts:[],
				ul:null
			},
			input:null,
			guage:null,
			succee:null
		};
		/*
		*	@参数信息 {object}
		*	@d_width 根节点上的宽
		*	@d_height  根节点上的高
		*	@upload 用于控制是否提交POST请求
		*/
		var position = {
			d_width:0,
			d_height:0,
			upload:false
		}
		/*
		*	@fileInfo 文件属性信息 {object}
		*	@_fileInfo 文件属性信息 {string}
		*/
		var fileInfo = [];
		var _fileInfo = '';
		var _diaFile = [];
		var diaFileInfo = [];

		var _config = $.extend(config,o);
		/*
		*	@标签字符串
		*/
		var diaStr = '';
		var sliStr = '';
		var diaConStr = '';
		var diaConAccountStr = '';
		//用于检测对话框是否在关闭或打开的状态
		var diaOpen = true;
		//用于区分，是传统方式的组件，还是有对话框方式的组件。
		var diaSlieOpen = true;
		//用于检测是否达到POST请求的要求，检索完一些机制之后的设置。
		var diaSrvAjax = false;
		/*
		*	@内部方法
		*	@_create  用于渲染节点
		*	@_bindInput  传统方式的文件上传
		*	@_inputUpLoad  POST请求
		*	@_bindDialog  对话框内部渲染与基本事件绑定
		*	@_dropDialog  对话框拖动状态
		*	@_dropFile  拖拽文件上传
		*	@_createAnimate  POST请求成功之后的信息返回与进度条动画
		*/
		var _init = {
			_create:function(){
				var that = this;
				module.cont = $d;
				position.d_width = $d.width();
				position.d_height = $d.height();
				var _w = (position.d_width - 140)/2,
					_h = (position.d_height - 30)/2;
				module.cont.append('<div class="file" id="filebut_'+d+'" style="position:absolute;top:'+_h+'px;left:'+_w+'px;z-index:20;"><a href="#">多文件上传</a></div><div id="file_succeed_'+d+'" class="file_succeed" style="top:'+_h+'px;left:'+_w+'px;">上传成功</div>');
				module.but = $('#filebut_'+d);
				module.succee = $('#file_succeed_'+d);
				sliStr += '<div class="file_slide_call" style="width:'+position.d_width+'px; display:none;">',
				sliStr += '<div id="file_slide_'+d+'" class="file_sliS"></div>',
				sliStr += '</div>'
				module.cont.append(sliStr);
				module.guage = $('#file_slide_'+d);
				if(_config.dialog){
					module.cont.append('<div id="file_dialog_'+d+'" class="file_dialog" style="display:none;"></div>');
					module.dialog.parent = $('#file_dialog_'+d);
					diaStr += '<div id="file_title_'+d+'" class="file_dia_title">'+_config.title+'</div>',
					diaStr += '<div id="file_cont_'+d+'" class="file_dia_cont"></div>',
					diaStr += '<div id="file_submit_'+d+'" class="file_dia_sbumint"><a href="#" id="file_dia_close_'+d+'">取消</a><a href="#" id="file_dia_submit_'+d+'">提交</a></div>';
					module.dialog.parent.append(diaStr);
					module.dialog.title = $('#file_title_'+d);
					module.dialog.content = $('#file_cont_'+d);
					module.dialog.buts.push($('#file_dia_close_'+d),$('#file_dia_submit_'+d));
					if(_config.autoOpen){
						module.dialog.parent[0].style.display = 'block';
					}
					diaSlieOpen = false;
					that._bindDialog();
				}else{
					module.but.append('<input id="file_input_'+d+'" class="file_input" type="file" multiple/>');
					module.input = $('#file_input_'+d);
					diaSlieOpen = true;
					that._bindInput();
				}
			},
			_bindInput:function(){
				var that = this;
				module.input.bind('change',function(){
					fileInfo = [];
					var file = this.files;
					$.each(file,function(i){
						var name = file[i].name;
						var type = file[i].type;
						var size = file[i].size;
						fileInfo.push({
							name:name,
							size:size,
							type:type
						});
					});
					//console.log(fileInfo);
					position.upload =  _config.onSubmit.call(this,fileInfo);
					if(!position.upload){
						diaSrvAjax = false;
						return false;
					}
					if(position.upload && diaSlieOpen){
						that._inputUpLoad(this);
					}
					if(!diaSlieOpen){
						diaSrvAjax = true;
						diaConAccountStr = '';
						var diaSize = '';
						$.each(fileInfo,function(j){
							diaFileInfo.push(fileInfo[j]);
							var _name = fileInfo[j].name;
							var _type = fileInfo[j].type;
							var _size = fileInfo[j].size;
							if(((_size/1024)/1024)<1){
								diaSize = Math.floor((_size/1024))+'KB'
							}else{
								diaSize = Math.floor((_size/1024)/1024) + 'MB'
							}
							diaConAccountStr += '<li title="'+diaSize+'">文件名：'+_name+'</li>';
						});
						module.dialog.ul.append(diaConAccountStr);
					}
				});
			},
			_inputUpLoad:function(d){
				_fileInfo = '';
				if(diaSrvAjax){
					$.each(diaFileInfo,function(i){
						if(diaFileInfo.length - 1 == 0 || i == (diaFileInfo.length - 1)){
							_fileInfo += JSON.stringify(diaFileInfo[i]);
						}else{
							_fileInfo += JSON.stringify(diaFileInfo[i])+',';
						}
					});
				}else{
					$.each(fileInfo,function(i){
						if(fileInfo.length - 1 == 0 || i == (fileInfo.length - 1)){
							_fileInfo += JSON.stringify(fileInfo[i]);
						}else{
							_fileInfo += JSON.stringify(fileInfo[i])+',';
						}
					});
				}
				console.log(_config.account);

				var postPHP = "value="+escape(1);
				//原生
				console.log(JSON.parse(_fileInfo));
				var xhr = new XMLHttpRequest();
				xhr.upload.onprogress = function(e){
					var ratio = e.loaded / e.total;
					console.log('上传时间'+ratio);
				}
				xhr.onprogress = function(e){
					console.log(e.loaded);
					console.log(e.position);
					console.log(e.total);
					console.log(e.totalSize);
					console.log(xhr.responseText);
					_init._createAnimate(e.position,e.total);
				}
				xhr.onload = function(){
					console.log(xhr.readState);
					console.log(xhr.status)
					if(xhr.readState == 4){
						if(xhr.status == 200){
							console.log('a');
							
						}
					}
				}
				xhr.open('POST',_config.account,true);
				xhr.send(postPHP);

				//jquery ajax
				// $.ajax({
				// 	url:_config.account,
				// 	type:'POST',
				// 	success:function(data){
				// 		//console.log(data);
				// 	},
				// 	processData:false,
				// 	contentType:'multipart/form-data',
				// 	beforeSend:function(xhr,settings){
				// 		xhr.setRequestHeader('Cache-Control','no-cache');
				// 		// $.each(fileInfo,function(i){
				// 		// 	xhr.setRequestHeader('X-File-Name',fileInfo[i].name);
				// 		// 	xhr.setRequestHeader('X-File-Size',fileInfo[i].size);
				// 		// 	xhr.setRequestHeader('X-File-Type',fileInfo[i].type);
				// 		// });
				// 		_init._createAnimate();
				// 	},
				// 	data:_fileInfo
				// });
			},
			_bindDialog:function(){
				var that = this;
				diaConStr += '<h1>提示信息：基于HTML5 API的上传控件,支持多文件上传，直接从桌面拖拽上传.{此窗口全部区域为拖拽放置区域}</h1>',
				diaConStr += '<div class="file_trad"><h1 >提示信息：传统方式文件上传{支持多文件上传，请按Ctrl或Shift来确定选择文件}</h1>',
				diaConStr += '<div class="file" style="position: relative;"><a href="#">文件上传</a><input id="file_input_'+d+'" class="file_input" type="file" multiple/></div></div>',
				diaConStr += '<ul id="file_contAccount_'+d+'" class="file_contAccount_ul"></ul>'
				module.dialog.content.append(diaConStr);
				//console.log(module);
				module.dialog.ul = $('#file_contAccount_'+d);
				module.input = $('#file_input_'+d);
				module.but.bind('click',function(){
					if(diaOpen){
						module.dialog.parent[0].style.display = 'block';
						diaOpen = false;
					}
				});
				module.dialog.buts[0].bind('click',function(e){
					if(!diaOpen){
						module.dialog.parent[0].style.display = 'none';
						diaOpen = true;
					}
					diaFileInfo = [];
					module.dialog.ul.empty();
				});
				module.dialog.buts[1].bind('click',function(e){
					if(diaFileInfo.length !== 0){
						that._inputUpLoad();
					}
					if(!diaOpen){
						module.dialog.parent[0].style.display = 'none';
						diaOpen = true;
					}
					diaFileInfo = [];
					module.dialog.ul.empty();
				});
				this._dropDialog();
				this._dropFile();
				this._bindInput();
			},
			_dropDialog:function(){
				var dropX = 0;
				var dropY = 0;
				var move = false;
				module.dialog.parent.attr('draggable','true');
				$(document).bind('mouseup',function(e){
					move = false;
				});
				$(document).bind('mousemove',function(e){
					if(move){
						var _x = e.clientX - dropX;
						var _y = e.clientY - dropY;
						module.dialog.parent.css({top:_y,left:_x});
					}
				});
				module.dialog.title.bind('mousedown',function(e){
					move = true;
					dropX = e.clientX - parseInt(module.dialog.parent.css('left'));
					dropY = e.clientY - parseInt(module.dialog.parent.css('top'));
				});
			},
			_dropFile:function(){
				module.dialog.content.attr('draggable','true');
				module.dialog.content.bind('dragenter',function(e){
					e.stopPropagation();
					e.preventDefault();
				});
				module.dialog.content.bind('dragover',function(e){
					e.stopPropagation();
					e.preventDefault();
				});
				module.dialog.content.bind('drop',function(e){
					e.stopPropagation();
					e.preventDefault();
					e = e.originalEvent;
					_diaFile = [];
					var files = e.dataTransfer.files;	
					$.each(files,function(i){
						var name = files[i].name;
						var type = files[i].type;
						var size = files[i].size;
						_diaFile.push({
							name:name,
							type:type,
							size:size
						});
					});
					position.upload =  _config.onSubmit.call(this,_diaFile);
					if(!position.upload){
						diaSrvAjax = false;
						return false;
					}
					if(position.upload && diaSlieOpen){
						that._inputUpLoad(this);
					}
					if(!diaSlieOpen){
						diaSrvAjax = true;
						diaConAccountStr = '';
						var diaSize = '';
						$.each(_diaFile,function(j){
							diaFileInfo.push(_diaFile[j]);
							var _name = _diaFile[j].name;
							var _type = _diaFile[j].type;
							var _size = _diaFile[j].size;
							if(((_size/1024)/1024)<1){
								diaSize = Math.floor((_size/1024))+'KB'
							}else{
								diaSize = Math.floor((_size/1024)/1024) + 'MB'
							}

							diaConAccountStr += '<li title="'+diaSize+'">文件名：'+_name+'</li>';
						});
						module.dialog.ul.append(diaConAccountStr);
					}
				});
			},
			_createAnimate:function(progress,eta){
				//console.log(fileInfo);
				module.guage.parent().show();
				module.guage.animate({width:'+'+position.d_width},'slow',function(){
					setTimeout(function(){
						module.guage.parent().fadeOut('slow');
						setTimeout(function(){
							module.guage.css({width:'0px'});
							module.succee.fadeIn('slow');
							setTimeout(function(){
								module.succee.fadeOut('slow');
							},1500)
						},400)
					},200)
				});
			}
		}
		_init._create();
	}
})(window);