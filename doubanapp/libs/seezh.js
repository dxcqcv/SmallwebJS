(function(window,undefined){
	var document = window.document,
		navigator = window.navigator;
	if(window.smobile){
	  return;
	}
	if(!window.smobile){
		window.smobile = (function () {
	        var BaseFrameSrc = null;
	        var BaseInfo = {
	            version: 'seezh.0',
	            status: 'unloaded',
	            LibsLoad: [],
	            curload: null,
	            LibsPATH: "libs",
	            //获取seezh类库路径
	            basePath: (function () {
	                var BasePATH = window.SEEKER_BASEPATH || '';
	                if (!BasePATH) {
	                  var jstag = document.getElementsByTagName('script');
	                  for (var snum = 0; snum < jstag.length; snum++) {
	                    var srcMatch = jstag[snum].src.match(/(^|.*[\\\/])seezh(?:_basic)?.js(?:\?.*)?$/i); //?(?:_source)
	                    if (srcMatch) {
	                      BaseFrameSrc = srcMatch[0];
	                      BasePATH = srcMatch[1];
	                      break;
	                    }
	                  }
	                }
	                if (BasePATH.indexOf(':/') == -1) if (BasePATH.indexOf('/') === 0) BasePATH = location.href.match(/^.*?:\/\/[^\/]*/)[0] + BasePATH;
	                else BasePATH = location.href.match(/^[^\?]*\/(?:)/)[0] + BasePATH;
	                if (!BasePATH) throw 'seezh 框架路径检测失败.';

	                return BasePATH;
	            })(),
	            //获取seezh.js参数
	            getFramePars: function (url) {
	                var UrlParam = url !== undefined ? url : decodeURI(BaseFrameSrc.split('seezh.js?')[1]);
	                var args = {};
	                var query = UrlParam;
	                var pairs = query.split("&");
	                for (var i = 0; i < pairs.length; i++) {
	                    var pos = pairs[i].indexOf('=');
	                    if (pos == -1) continue;
	                    var argname = pairs[i].substring(0, pos);
	                    var value = pairs[i].substring(pos + 1);
	                    value = decodeURIComponent(value);
	                    args[argname] = value;
	                }
	                return args;
	            },
	            //返回框架主目录
	            getAppUrl: function (d) {
	                var au = document.location;
		            	var u = au.protocol;
		            	var weburl = smobile.config.WebURL;
		            	if( weburl === undefined ){
		            		weburl = BaseFrameSrc.substring(0,BaseFrameSrc.indexOf('/'+this.LibsPATH));
		            	}
		            	var rurl = weburl;
		            	if( u !== "http:" ){
		            		rurl = au.href.substring(0,au.href.lastIndexOf(rurl)) + rurl;
		            	}
		            	
		            	rurl += "/" + d;
	                return rurl;
	            },
	            //获取HTML 页面参数
	            getSingleQueryString: function (val) {
	                var uri = window.location.search;
	                var re = new RegExp("" + val + "=([^&?]*)", "ig");
	                return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
	            },
	            //返回页面所有参数
	            getQueryString: function () {
	                var uri = window.location.search.replace("?", "");
	                return this.getFramePars(uri);
	            },
	            //返回指定文件完整路径
	            getUrl: function (d) {
	                if (d.indexOf(':/') == -1 && d.indexOf('/') !== 0) d = this.basePath + d;
	                if (this.timestamp && d.charAt(d.length - 1) != '/' && !/[&?]t=/.test(d)) d += (d.indexOf('?') >= 0 ? '&' : '?') + 't=' + this.timestamp;
	                return d;
	            },
	            getUrlLuch:function(){
	                var loc = document.location.href;
	                var _url = loc.substring(0,loc.lastIndexOf('/'));
	                return _url;
	            }
	        }
	        delete BaseFrameSrc;
	        return BaseInfo;
	    })();
	}
	smobile.comm = {
		//判断是否为数组
        isArray: function (f) {
            return !!f && Object.prototype.toString.apply(f) === '[object Array]';
        },
        //判断对象是否为函数 
        isFunction: function (f) {
            return !!f && f instanceof Function;
        },
        //得到窗口高度
        getWindowHeight: function () {
            var de = document.documentElement;
            var bd = document.body;

            return self.innerHeight || (de && de.clientHeight || de.offsetHeight) || (bd != null ? bd.clientHeight : 0);
        },
        // 得到窗口宽度
        getWindowWidth: function () {
            var de = document.documentElement;
            var bd = document.body;

            return self.innerWidth || (de && de.clientWidth || de.offsetWidth) || (bd != null ? bd.clientWidth : 0);
        },
        //验证是否为移动版客户端
        isiPhone: function () {
            return (
            //Detect iPhone
			        (navigator.platform.indexOf("iPhone") != -1) ||
            //Detect iPod
			        (navigator.platform.indexOf("iPod") != -1) ||
            //Detect iPad
			        (navigator.platform.indexOf("iPad") != -1) ||
			        _sker.browser.MobileSafari || _sker.browser.android
			);
        },
        //判断ie游览器
        getIEverison: function () {
            if (_isIE) {
                var agent = navigator.userAgent.toLowerCase();
                var version = parseFloat(agent.match(/msie (\d+)/)[1]);
                return version;
            }
            return null;
        }
    };

	smobile.browser = {
        IE: !!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1),
        Opera: navigator.userAgent.indexOf('Opera') > -1,
        //检测浏览器是否为WebKit内核
        WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
        //检测浏览器是否为Gecko内核，如Firefox
        Gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') === -1,
        MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/),
        android: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1
    };
    var configFile = smobile.getUrl("config.js");
    smobile.config = {
        //需要加载类库，不带后缀
        libraries: "bootstrap"//seeker.controller,seeker.view,seeker.model,
    };
    var cfig = smobile.config;
    //console.log(cfig)
    var _skinPATH = "css/" + cfig.UseSkin;
    smobile.skinPATH = _skinPATH;
    var _isIE = smobile.browser.IE;
	smobile.getHead = function(){
        var h = document.getElementsByTagName('head')[0];
        if (!h) h = document.getDocumentElement().append('head');
        return h
	}
	//动态脚本加载
    smobile.scriptLoader = (function () {
        var j = {},
        k = {};
        return {
            LABJSReady: false,
            load: function (url, callback, n, o) {
                var purl = typeof url == 'string';
                if (purl) url = [url];
                if (!n) n = smobile;

                var q = url.length,
            r = [],
            s = [],
            t = function (y) {
                if (callback) if (purl) callback.call(n, y);
                else callback.call(n, r, s);
            };
                if (q === 0) { t(true); return; }
                var u = function (y, z) {
                    (z ? r : s).push(y);
                    if (--q <= 0) {
                        //o && _sker.document.getDocumentElement().removeStyle('cursor');
                        t(z);
                    }
                },
        v = function (y, z) {
            j[y] = 1;
            var A = k[y];
            delete k[y];
            for (var B = 0; B < A.length; B++) A[B](y, z);
        },
        w = function (y) {
            if (j[y]) {
                u(y, true);
                return;
            }
            var z = k[y] || (k[y] = []);
            z.push(u);
            if (z.length > 1) return;
            var Head = smobile.getHead();
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = y

            if (callback) if (_isIE) script.onreadystatechange = function () {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null;
                    v(y, true);
                }
            }
            else {
                script.onload = function () {
                    //console.log(y+" LOAD");
                    setTimeout(function () { v(y, true); }, 0);
                };
                script.onerror = function () {
                    v(y, false);
                };
            }
            Head.appendChild(script);
        };
                //o && _sker.document.getDocumentElement().setStyle('cursor', 'wait');
                for (var x = 0; x < q; x++) w(url[x]);
            },
            loadByLAB: function (p, callback) {
                this.LABJSReady = true;
                if (p === undefined) return;
                var _jsfiles = [];
                if (typeof p === "string") {
                    var _ps = p.split(',');
                    for (var j = 0; j < _ps.length; j++) {
                        _jsfiles.push(_ps[j]);
                    }
                } else
                    _jsfiles = p;

                if (_jsfiles.length > 0) {
                    $LAB.script(_jsfiles).wait(function () {
                        callback();
                    });
                }
            }
        };
    })();
    //风格样式
    smobile.skins = (function () {
        return {
            loadcss: function (filename) {
                var Head = smobile.getHead();
                var fileref = document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("href", filename);
                Head.appendChild(fileref);
            }
        };
    })();
    smobile.waitctrl = (function () {
        return {
            List: [],
            add: function (ctrlname) {
                this.List.push(ctrlname);
            }
        }
    })();
    (function () {
      var JSFiles = {},
	  	  PagePars = smobile.getFramePars(),
	  	  hctrl = [],
	  	  haction = [],
	  	  LoadDivIsShow = false,
	  	  UILoadCount = 1,
	  	  LoadConfigFile = function (psk) {
	  	    var _f = configFile;
	  	    var _configf = JSFiles[_f] || (JSFiles[_f] = {});
	  	    if (_configf.fn) {
	  	        _configf.fn.call(psk, psk.config);
				smobile.skinPATH = _skinPATH = cfig.WebURL +"/css/";		
				//console.log(cfig.WebURL);			
		        smobile.skins.loadcss(_skinPATH + "bootstrap.css");
		        smobile.skins.loadcss(_skinPATH + "bootstrap-responsive.css");
		        smobile.skins.loadcss(_skinPATH + smobile.pageCSS + ".css");
		        LibsLoad(psk); 	        
	  	    }
	  	    else smobile.scriptLoader.load(_f, function () {
	  	        if (smobile.configuration) _configf.fn = smobile.configuration;
	  	        else _configf.fn = function () { };
	  	        LoadConfigFile(psk);
	  	    });
	  	    return true;
		  },
		  LBJSFrameLoad = function () {
	        var hasui = smobile.ui !== undefined;
	        if (hasui) {
	            if (smobile.ui.status == "unloaded" && UILoadCount < 6) {
	                setTimeout(arguments.callee, 25);
	                UILoadCount++;
	                return;
	            }
	            BuildMsgDialog();
	        }
	        smobile.status = "loaded";
	        if (hctrl.length > 0){
	        	//console.log(hctrl[0]);
	        	smobile.Actionctrl(hctrl, haction);
	        }else{
	        	smobile.RemoveWaitTip();  
	        }    
	        console.log(readyfun);
	        for (var i = 0; i < readyfun.length; i++) {
	            readyfun[i].call();
	        }
	    },
	    LibsLoad = function (psk) {
	      smobile.scriptLoader.load([smobile.getUrl("LAB.min.js"), smobile.getUrl("jquery.js")], function () {
		        var onlyload = PagePars.onlyload;
		        var load = PagePars.load;
		        var p = cfig.libraries;
		        if (cfig.UseDebug) {
		            p += ",seeker.debug";
		        }
		        var _ps = p.split(',');
		        var _jsfiles = [];
		        //只加载给出的Libs
		        if (onlyload !== undefined && onlyload.length > 0) {
		            var onlyloads = onlyload.split('|');
		            for (var k = 0; k < onlyloads.length; k++) {
		                  var f = GetLibsName(onlyloads[k]);
		                  this.LibsLoad.push(f);
		                  _jsfiles.push(smobile.getUrl(f + ".js"));
		            }
		        }else{
		            for(var j = 0; j < _ps.length; j++) {
		                this.LibsLoad.push(_ps[j]);
		                _jsfiles.push(smobile.getUrl(_ps[j] + ".js"));
		            }
		        }
		        if (_jsfiles.length > 0) {					
		              $LAB.script(_jsfiles).wait(LBJSFrameLoad);;
		        }
	      });
	    };
        smobile.init = function () {
	        for (var k in PagePars) {
		        var v = PagePars[k];
		        //console.log(k)
		        switch (k) {
		            case "ctrl":
		                hctrl = v.split("|");
		            break;
		            case "css":
		                var hcss = v.split("|");
		                for (var c in hcss) {
		                    var cssname = hcss[c];
		                    smobile.pageCSS = cssname;
		                }
		            break;
		        };
	        }
        	LoadConfigFile(this);
      	};
    })();
    smobile.init();
    window.$$ = smobile;
})(window);
/*
*	@加载当前指定的js文件
*/
(function (_sm, undefined) {
    _sm.SController = function () {
        //用来存CTRL中的类
        this.CTRL_CLASS = {};
        this.add = function (ctrlname, fn) {
            if (_COM.isFunction(fn)) {
                var f = new fn();
                this.CTRL_CLASS[ctrlname] = f;
            }
        };
    };
    var _COM = smobile.comm;
    var _self = smobile.ctrl = new smobile.SController();
    smobile.Actionctrl = function (ctrl, action) {
    	//console.log(ctrl);
        for (var c = 0; c < ctrl.length; c++) {
            var ctrlname = ctrl[c];
            var ctrlfile = smobile.getAppUrl("ctrl/" + ctrlname + ".js"); 
            //加载指定的js文件
            smobile.scriptLoader.load(ctrlfile);
        }
    };
})(smobile);