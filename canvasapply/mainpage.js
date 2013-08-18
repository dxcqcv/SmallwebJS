/*!
* @http://ygsoft.com/
* @Author:向文文
* @Date: 2013-1-10
*/
$$.ctrl.add('mainpage',function(){
    var _s = $$;
    var _url = _s.getAppUrl('');
    var _createMenu = $('#contMenu');
    var _head = $('#header')
    var _setMenu = null;
    var _tools = null;
    var saveJSON = null;
    var _navTools = [];
    var _linkHTML = '';
    var _lockMenu = null;
    var lockMenu = null;
    var _dt = [];
    var _eventdt = [];
    var _menus = null;
    this.UseView = 'none';
    //this.ActionList = 'header';
    this.init = function(){
        var _PATH = _s.skinPATH;
        //_s.skins.loadcss(_PATH+'/layout.css');
        var _loadJs = 'libs/layout.js';
        var _loaded = function(){
            _head.append('<h1 class="key_short">Shortcut Key：</h1><ul id="km_nav"></ul><div id="nav_gnsz" class="nav_gnsz">个人选项设置</div><div id="nav_tc" class="getback">退出</div>');
            if($('#setMenu').length == 0){
                $('body').append('<div id="setMenu"></div>');
            }
            _setMenu = $('#setMenu');
            _setMenu.dialog({
                width:400,
                height:300,
                modal: true, 
                autoOpen: false, 
                resizable: false
            });
            if($('#nav_tools').length == 0){
                $('body').append('<div id="nav_tools"></div>');
            }
            _tools = $('#nav_tools');
            _tools.dialog({
                width:350,
                modal: true, 
                autoOpen: false, 
                resizable: false
            });
            if($('#onMenus').length == 0){
                $('body').append('<div id="onMenus"></div>');
            }
            _menus = $('#onMenus');
            _menus.dialog({
                width:400,
                height:300,
                modal: true, 
                autoOpen: false, 
                resizable: false
            });
            outerLayout = $('body').layout({
                scrollToBookmarkOnLoad: false,
                closable:false
                , defaults: {}
                , north: {
                    size: 42
                    , spacing_open: 0
                    , closable: false
                    , resizable: false
                }
                , west: {
                    size: 250
                    ,resizable: false
                }
                ,south:{
                    closable:false,
                    resizable: false
                }
            });

            var heads = document.getElementsByTagName('head')[0];
            var links = document.createElement('link');
            links.setAttribute('rel','stylesheet');
            links.setAttribute('type','text/css');
            links.setAttribute('id','links');
            heads.appendChild(links);
            //执行检索保存的皮肤
            localStorageLinksLoad();
            //工具栏保存
            localStorageToolsNavsLoad();
            $('body').removeClass('vis');
            GetMenuJson(function(){
                var _initmainpage = new CreateMenu();
                _initmainpage.create();
                CreateMenu();
                $('#nav_gnsz').bind('click',function(){
                    var $derma = $('#derma');
                    if($derma.attr('s') === 'n'){
                        $derma.animate({right:'0px'},'slow').show();
                        $derma.attr('s','b');
                    }else{
                        $derma.animate({right:'-72px'},'slow',function(){
                            $derma.hide();
                        });
                        $derma.attr('s','n');
                    }
                });
                adjSet();
                keySet();
                SyebackAction();
            });
        }
         _s.scriptLoader.loadByLAB(_loadJs,_loaded);
    }
    var redirect = function(url){
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            var referLink = document.createElement('a');
            referLink.href = url;
            document.body.appendChild(referLink);
            referLink.click();
        } else {
            location.href = url;
        }
    };
    //装扮设置
    var adjSet = function(){
        var filecss = ['hs_1.css','hs_2.css','hs_3.css','hs_4.css','hs_5.css','hs_6.css','hs_7.css','hs_8.css','hs_9.css','hs_10.css'];
        _linkHTML += '<ul id="Stors">';
        $.each(filecss,function(i){
            var _i = i +1;
            _linkHTML +='<li class="hs_'+_i+'" data-bg="'+filecss[i]+'"></li>'; 
        });
        _linkHTML += '</ul>';
        $('#hs_zbsz').bind('click',function(){
            _setMenu.dialog({
                height:170,
                buttons:[
                    {
                        text:'Close',
                        click:function(){
                            $(this).dialog('close');
                        }
                    }
                ]
            });
            _setMenu.empty().append(_linkHTML);
            _setMenu.dialog('open');
            if($('#Stors')[0] !== undefined){
                var _Stors = $('#Stors');
                _Stors.delegate('li','click',function(){
                    var link = $(this).attr('data-bg');
                    var _link = $('#links');
                    var _css = 'css/hs/derma/'+link;
                    _link.attr('href',_css);
                    localStorageLinks(link);
                });
            }
        });
    }
    //快捷键设置
    var keySet = function(){
        //<li id="nav_hide_" s="b"><a href="javascript:void(0);">隐藏</a></li>
        _navTools = [];
        var _i = 0;
        var keyJson = [
            {"id":"nav_hide","txt":"隐藏"},
            {"id":"nav_xztz","txt":"选择套帐"},
            {"id":"nav_pzzd","txt":"凭证制单"},
            {"id":"nav_shqz","txt":"审核签字"},
            {"id":"nav_pzcx","txt":"凭证查询"},
            {"id":"nav_zz","txt":"总账"},
            {"id":"nav_mxz","txt":"明细账"},
            {"id":"nav_rjz","txt":"日记账"},
            {"id":"nav_fzz","txt":"辅助账"},
            {"id":"nav_zxhsmxz","txt":"专项核算明细账"},
            {"id":"nav_kmhzb","txt":"科目汇总表"}
        ]
        var keyHTML = '';
            keyHTML += '<ul class="hs_check" id="hs_nav_check">';
            $.each(keyJson,function(i){
                keyHTML += '<li><input type="checkbox" value="'+keyJson[i].txt+'" data-id="'+keyJson[i].id+'" data-row="'+(i+1)+'">'+keyJson[i].txt+'</li>'
            });
            keyHTML += '</ul>';
        $('#hs_kjjsz').bind('click',function(){
            _setMenu.dialog({
                height:250,
                buttons:[
                    {
                        text:'Close',
                        click:function(){
                            $(this).dialog('close');
                        }
                    },
                    {
                        text:'OK',
                        click:function(){
                            var _lock = '['+_navTools.toString()+']';
                            if(window.localStorage){
                                if(localStorage.getItem('navToolsBar') == null){
                                    localStorage.setItem('navToolsBar',JSON.stringify(_lock));
                                }else{
                                    var _value = localStorage.getItem('navToolsBar');
                                    if(JSON.stringify(_lock)!== _value){
                                        localStorage.setItem('navToolsBar',JSON.stringify(_lock));
                                        //console.log(JSON.parse(localStorage.getItem('value')));
                                    }
                                } 
                            }
                            var _attr = JSON.parse(_lock);
                            var km_nav = $('#km_nav');
                            km_nav.empty();
                            var km_doms = '';
                            $.each(_attr,function(i){
                                var _id = _attr[i].id;
                                var _row = _attr[i].row;
                                var _val = _attr[i].val;
                                km_doms += '<li id="'+_id+'" data-row="'+_row+'"><a href="#">'+_val+'</a></li>'
                            });
                            km_nav.append(km_doms);
                            km_doms = '';
                            $(this).dialog('close');
                        }
                    }
                ]
            });
            _setMenu.empty().append(keyHTML);
            _setMenu.dialog('open');
            $('#hs_nav_check').delegate('input','click',function(){
                if($(this)[0].checked){
                    var _id = $(this).attr('data-id');
                    var _row = $(this).attr('data-row');
                    var _val = $(this).attr('value');
                    var _object = {
                        id:_id,
                        row:_row,
                        val:_val
                    }
                    var _str = JSON.stringify(_object);
                    if($.inArray(_str,_navTools) == -1){
                        _navTools.push(_str);
                    }
                    console.log(_navTools);
                }else{
                    var _data_id = $(this).attr('data-id');
                    var _data_row = $(this).attr('data-row');
                    var _data_val = $(this).attr('value');
                    var _object = {
                        id:_data_id,
                        row:_data_row,
                        val:_data_val
                    }
                    var _strOb = JSON.stringify(_object);
                    $.each(_navTools,function(i){
                        if(_navTools[i] == _strOb){
                            _navTools.splice(i,1);
                        }
                    });
                    console.log(_navTools);
                }
            });
        });
    }
    //系统退出
    var SyebackAction = function(){
        // //隐藏
        // $('#nav_hide').bind('click',function(){
        //     if($(this).attr('s') === 'b'){
        //         outerLayout.hide('west');
        //         $(this).attr('s','n');
        //     }else{
        //         outerLayout.show('west');
        //         $(this).attr('s','b');
        //     }
        // });
        $('#nav_tc').bind('click',function(){
            _tools.addClass('nav_back');
            _tools.dialog({
                width:300,
                height:100,
                buttons:[
                    {
                        text:'Close',
                        click:function(){
                            _tools.removeClass('nav_back');
                            $(this).dialog('close');
                        }
                    },
                    {
                        text:'OK',
                        click:function(){
                            redirect('login.html');
                        }
                    }
                ]
            });
            _tools.empty().append('是否退出系统？');
            _tools.dialog('open');
        });
    }
    //把样式存入localStorage中
    var localStorageLinks = function(css){
        if(window.localStorage){
            window.localStorage.setItem('HSCSS',css);
        }
    }
    //把设置的按钮从本地的localStorage中取出
    var localStorageToolsNavsLoad = function(){
        var km_nav = $('#km_nav');
        var km_doms = '';
        if(window.localStorage){
            if(window.localStorage.getItem !== ''){
                var navtools = window.localStorage.getItem('navToolsBar');
                if(navtools === null){
                    return;
                }
                console.log(navtools);
                km_nav.empty();
                var _attr = JSON.parse(JSON.parse(navtools)); 
                console.log(_attr);       
                $.each(_attr,function(i){
                    var _id = _attr[i].id;
                    var _row = _attr[i].row;
                    var _val = _attr[i].val;
                    km_doms += '<li id="'+_id+'" data-row="'+_row+'"><a href="#">'+_val+'</a></li>'
                });
                km_nav.append(km_doms);
                km_doms = '';
            }
        }
        return;
    }
    //把样式从本地的localStorage中取出
    var localStorageLinksLoad = function(){
        var _links = $('#links');
        if(window.localStorage){
            if(window.localStorage.getItem !== ''){
                var myCss = window.localStorage.getItem('HSCSS');
                //console.log(myCss);
                if(myCss === null){
                    _links.attr('href','css/hs/derma/hs_8.css');
                    return;
                }
                _links.attr('href','css/hs/derma/'+myCss);
            }
        }
        return;
    }
    //分解子节点
    var getChildrens = function(id){
        var _id = id;
        var index = [];
        if(!window.localStorage){
            return;
        }
        if(window.localStorage){
            var value = JSON.parse(localStorage.getItem('hsValue'));
            for(var i = 0,len = value.length;i<len;i++){
                var _pid = value[i].pid;
                if(id == _pid){
                    index.push(value[i]);
                }
            }
            return index;
        }
    }
    //存储菜单渲染数据
    var GetMenuJson = function(callback){
        _s.getSrv({
            url:_url+'/data/hs.js',
            callback:function(data){
                _createMenu.append('<div class="proinfo"></div><div class="con_top"><div class="full">全屏</div><div class="hs_grszgh">功能菜单栏</div></div>');
                var value = data.value;
                saveJSON = value;
                if(window.localStorage){
                    if(localStorage.getItem('hsValue') == null){
                        localStorage.setItem('hsValue',JSON.stringify(value));
                    }else{
                        var _value = localStorage.getItem('hsValue');
                        if(JSON.stringify(value)!== _value){
                            localStorage.setItem('hsValue',JSON.stringify(value));
                            //console.log(JSON.parse(localStorage.getItem('value')));
                        }
                    } 
                }
                if(typeof callback === 'function'){
                    callback();
                }
            }
        });
    }
    var OnMenu = function(id,index,txt){
        _menus.empty();
        //console.log(id);
        //console.log(index);
        //console.log(txt);
        _menus.dialog('open');
    }
    function CreateMenu(){
        var newid = 0;
        var _block = null;
        var value = null;
        var chilID = 0;
        var bindFunEvent = function(index){
            var _id = index;
            $('#menu_'+_id).bind('click',function(){
                var lx = $(this).attr('id');
                var inx = $(this).attr('data-row');
                var pro = $(this).attr('data-property');
                var txt = $(this).text();
                if( pro == 'false'){
                    OnMenu(lx,inx,txt);
                }
            });
        }
        var bindChildEvent = function(index){
            OnMenu();
        }
        var bindNodesEvent = function(index){
            var _id = index;
            $('#menu_'+_id).bind('click',function(){
                var id = $(this).attr('data-row');
                var pucker = $(this).attr('data-pucker');
                var property = $(this).attr('data-property');
                var that = $(this);
                var hypo = $(this).parent().attr('data-hypo');
                createNodes(id,pucker,property,that,hypo);
            });
        }
        var childObject = [];
        var createNodes = function(id,pucker,property,doc,hypo){
            childObject = [];
            if(pucker == 'true'){
                var _chi = doc.parent().children();
                var _padding = 10;
                if(_chi.length == 1){
                    if(hypo == '0'){
                        var FristHTML = '';
                        FristHTML +='<ul style="position: relative;z-index:20;padding-top:10px;display:block;padding-left:'+_padding+'px;" class="chil_block">'
                        $.each(value,function(i){
                            var _i = i+1;
                            var _id = value[i].id;
                            var pid = value[i].pid;
                            var txt = value[i].txt;
                            var _pucker = value[i].pucker;
                            var _property = value[i].property;
                            if(id == pid){
                                childObject.push(_id);
                                FristHTML += '<li style="margin: 0 0 10px 0;" data-hypo="'+pid+'"><span style="cursor: pointer;"id="menu_'+_id+'" data-row="'+_id+'" data-property="'+_property+'" data-pucker="'+_pucker+'">'+txt+'</span></li>';
                            }
                        });
                        FristHTML +='</ul>';
                        doc.parent().append(FristHTML);
                        _padding = _padding + 5;
                        $('.chil_block').hide();
                        doc.siblings().show();
                    }else{
                        var ChildHTML = '';
                        ChildHTML +='<ul style="position: relative;z-index:20;padding-top:10px;display:block;padding-left:'+_padding+'px;" class="chil_block_'+id+'">'
                        $.each(value,function(i){
                            var _i = i+1;
                            var _id = value[i].id;
                            var pid = value[i].pid;
                            var txt = value[i].txt;
                            var _pucker = value[i].pucker;
                            var _property = value[i].property;
                            if(id == pid){
                                childObject.push(_id);
                                ChildHTML += '<li style="margin: 0 0 10px 0;" data-hypo="'+pid+'"><span style="cursor: pointer;"id="menu_'+_id+'" data-row="'+_id+'" data-property="'+_property+'" data-pucker="'+_pucker+'">'+txt+'</span></li>';
                            }
                        });
                        ChildHTML +='</ul>';
                        doc.parent().append(ChildHTML);
                        _padding = _padding + 5;
                    }
                    $.each(childObject,function(j){
                        return function(_j){
                            $('#menu_'+childObject[_j]).bind('click',function(){
                                var id = $(this).attr('data-row');
                                var pucker = $(this).attr('data-pucker');
                                var property = $(this).attr('data-property');
                                var that = $(this);
                                if(pucker == 'true'){
                                        $(this).attr('data-pucker','false');
                                    
                                         that.attr('data-vist','b');
                                    
                                    if(that.siblings()[0] === undefined){
                                        createNodes(id,pucker,property,that);
                                    }
                                    
                                }else{
                                    if(that.attr('data-vist') !== undefined){
                                        if(that.attr('data-vist') == 'b'){
                                            console.log(that.siblings());
                                            that.siblings().hide();
                                            that.attr('data-vist','n');
                                        }else{
                                            that.siblings().show();
                                            that.attr('data-vist','b');
                                        }
                                    }
                                }
                                
                                if(property == 'false'){
                                    bindChildEvent(that);
                                }
                            });
                        }(j);
                    });
                }else{
                    if(hypo == '0'){
                        $('.chil_block').hide();
                        doc.siblings().show();
                    }
                }
            }
        }
        this.create = function(){
            var that = this;
            if(window.localStorage){
                if(window.localStorage.getItem !== ''){
                    value = JSON.parse(localStorage.getItem('hsValue'));
                }
            }
            var dlHTML = '';
            dlHTML += '<ul id="lockMenu" class="lockMenu">';
            $.each(value,function(i){
                var id = value[i].id;
                var pid = value[i].pid;
                var txt = value[i].txt;
                var col = value[i].color;
                var _i = i+1;
                var pucker = value[i].pucker;
                var property = value[i].property;
                if(pid == '0'){
                    dlHTML += '<li style="width: 220px;margin: 0 0 10px 0;" data-hypo="'+pid+'"><span style="cursor: pointer;background:#444;color: #fff;line-height: 30px;font-size: 14px;padding-left: 10px;display:block;"id="menu_'+id+'" data-row="'+_i+'" data-property="'+property+'" data-pucker="'+pucker+'">'+txt+'</span></li>';
                    if(pucker == 'true'){
                        var _id = value[i].id
                        _dt.push(_id);
                    }
                    if(property == 'false'){
                        var _lsid = value[i].id;
                        _eventdt.push(_lsid);
                    }
                }
            });
            dlHTML += '</ul>';
            _createMenu.append(dlHTML);
            lockMenu = $('#lockMenu');
            if(_dt.length !== 0){
                $.each(_dt,function(j){
                    return function(_j){
                        bindNodesEvent(_dt[_j]);
                    }(j);
                });
            }
            if(_eventdt.length !== 0){
                $.each(_eventdt,function(k){
                    return function(_k){
                        bindFunEvent(_eventdt[_k]);
                    }(k);
                });
            }
        }
    }
});