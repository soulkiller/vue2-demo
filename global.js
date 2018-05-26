/**
 * global helper functions
 * @module utils/global
 * @author qintx
 */
define(['component/Notification', 'component/ImageViewer', 'config/sysconf'], function(compNoti, imgViewer, conf) {

    var debug = true;

    var weeks = ["周日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

    var global = {};

    /**
     * get version number of IE browser
     * @function module:utils/global.getIEVersion
     * @return {int} version no.
     */
    var getIEVersion = function() {
        var version = -1;
        var agent = navigator.userAgent.match(/MSIE ([\d.]+)?/);
        if (agent && agent.length > 1) {
            version = +agent[1];
        }
        return version;
    };

    var ieVer = getIEVersion();

    /**
     * user agent is IE8 or not
     * @const module:utils/global.isIE8
     * @type {boolean}
     * @example
     * if (window.isIE8 {
     *     //...
     * }
     */
    window.isIE8 = global.isIE8 = ieVer === 8;

    /**
     * just add empty console.log method in old IE to prevent error
     * @function module:utils/global.console
     * @param  {void}
     * @return {void}
     */
    if (! window.console) {
        window.console = {
            log: function() {}
        };
    }

    /**
     * print message 
     * @function module:utils/global.log
     * @param {string} msg text message to print
     * @return {void}
     */
    window.log = global.log = function(msg) {
        debug && console.log(msg);
    };

    /**
     * check whether an object is a function 
     * @function module:utils/global.isFunction
     * @param {Object} fn object to check
     * @return {boolean}
     */
    var isFunction = typeof alert === "object" ? function (fn) {
        try {
            return /^\s*\bfunction\b/.test(fn + "");
        } catch (e) {
            return false;
        }
    } : function (fn) {
        return Object.prototype.toString.call(fn) === "[object Function]";
    };

    window.isFunction = global.isFunction = isFunction;

    if (! Array.isArray) {
        Array.isArray = function (a) {
            return Object.prototype.toString.call(a) === "[object Array]"
        }
    }

    if (! Date.now) { //获取时间戳
        Date.now = function() { return new Date().getTime(); }
    }

    window.getWeekName = global.getWeekName = function() {
        var now = new Date();
        return weeks[now.getDay()];
    };

    // 日期加减天数
    window.addDate = global.addDate = function(oldDate, days) {
        var newDate = new Date(oldDate);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    };

    window.getFormatDate = global.getFormatDate = function(fmt, d) {
        var now = new Date();
        if (!! d) {
            now = d;
        }

        var o = {
            "M+" : now.getMonth()+1,                 //月份
            "d+" : now.getDate(),                    //日
            "h+" : now.getHours(),                   //小时
            "m+" : now.getMinutes(),                 //分
            "s+" : now.getSeconds(),                 //秒
            "q+" : Math.floor((now.getMonth()+3)/3), //季度
            "S"  : now.getMilliseconds()             //毫秒
        };

        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (now.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }

        return fmt;
    };

    window.getDayNum = global.getDayNum = function(nowDate) {
        return new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate();
    };

    window.checkQueryDate = global.checkQueryDate = function(curYM, min, max) {
        var startStr = curYM + "-01";
        var endStr = curYM + "-" + getDayNum(new Date(curYM));

        var ret = {
            start: startStr,
            end: endStr
        };

        if (min) {
            ret.start = startStr > min ? startStr : min;
        }

        if (max) {
            ret.end = endStr > max ? max : endStr;
        }

        return ret;
    };

    window.hideConfirm = global.hideConfirm = function() {
        if (avalon.vmodels.root) {
            avalon.vmodels.root.hideConfirm();
        }
    };

    var forbidOperate = function (e) {
        var ev = e || window.event;
        var obj = ev.target || ev.srcElement;
        var t = obj.type || obj.getAttribute('type');
        var vReadOnly = obj.getAttribute('readonly');
        var vEnabled = obj.getAttribute('enabled');
        vReadOnly = (vReadOnly == null) ? false : vReadOnly;
        vEnabled = (vEnabled == null) ? true : vEnabled;
        var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly || vEnabled != true))  ? true : false;
        if(flag1) {
            return false;
        }
        var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true : false;
        if(flag2) {
            return false;
        }
    };

    window.forbidBackSpace = global.forbidBackSpace = function() {
        document.onkeypress = forbidOperate;
        //IE禁止使用回退键
        document.onkeydown = forbidOperate;
    };

    window.clearObj = global.clearObj = function(obj) {
        var newObj = {};
        for (var key in obj) {
            newObj[key] = "";
        }

        return newObj;
    };

    window.clearVModel = global.clearVModel = function(obj) {
        if (! obj.$model) {
            return obj;
        }

        var m = obj.$model;
        var newObj = {};
        for (var key in m) {
            newObj[key] = "";
        }

        return newObj;
    };

    window.resetVModel = global.resetVModel = function(obj, data) {
        if (! data) {
            return;
        }

        if (! obj.$model) {
            return obj;
        }

        var m = obj.$model;
        var newObj = {};
        for (var key in m) {
            newObj[key] = (data[key] !== undefined ? data[key] : "");
        }
        return newObj;
    };

    window.commonValidation = global.commonValidation = {
        onReset: function(e, data) {
            removeValidateError(this)
        },
        onError: function(reasons) {
            addValidateError(this, reasons);
        },
        onSuccess: function() {
            removeValidateError(this);
        },
        validateInKeyup: false
    };

    window.addValidateError = global.addValidateError = function(elem, reasons) {
        if (! elem || ! reasons) {
            return;
        }

        var errorDiv = $("<div class='hy-valid-error-tip'>");
        $(elem).parent().append(errorDiv);

        var jqElem = $(elem);
        var width = jqElem.outerWidth();
        var height = jqElem.outerHeight();
        var offsetLeft = jqElem.offset().left - jqElem.parent().offset().left;

        var msgs = [];
        for (var i = 0, len = reasons.length; i < len; i++) {
            msgs.push(reasons[i].message);
        }

        errorDiv.html(msgs.join("<br/>"));
        var errHeight = errorDiv.outerHeight();

        if (jqElem.hasClass("validate-right")) {
            errorDiv.css({"width": width + "px", "top": (height - errHeight + 4) + "px", "left": (offsetLeft + width + 10) + "px"});
        } else {
            errorDiv.append($("<div class='arrow-top'>"));
            errorDiv.css({"width": width + "px", "top": (- errHeight + 10) + "px", "left": (offsetLeft + 10) + "px"});
        }
    };

    window.removeAllValidateError = global.removeAllValidateError = function(formSelector) {
        if (! formSelector) {
            formSelector = "body";
        }

        $(formSelector).find(".hy-valid-error-tip").remove();
    };

    window.removeValidateError = global.removeValidateError = function(elem) {
        var parent = $(elem).parent();
        parent.find(".hy-valid-error-tip").remove();
    }

    window.showConfirm = global.showConfirm = function(message, onConfirm) {
        if (avalon.vmodels.root) {
            avalon.vmodels.root.showConfirm(message, onConfirm);
        }
    };

    window.showAlert = global.showAlert = function(message) {
        if (avalon.vmodels.root) {
            avalon.vmodels.root.showAlert(message);
        }
    };

    window.showNotification = global.showNotification = function(options) { // {content: "xx"}
        compNoti.show(options);
    };

    window.hideNotification = global.hideNotification = function() {
        compNoti.hide();
    };

    window.previewImage = global.previewImage = function(url) {
        imgViewer.view(url);
    };

    window.showPlayer = global.showPlayer = function(elem) {
        if (!elem) {
            return;
        }

        var defaultOpts = {
            w: "100%",
            h: "590",
            l: 0,
            t: 0
        };

        var jqElem = $(elem);

        $.extend(defaultOpts, {
            w: jqElem.outerWidth(),
            h: jqElem.outerHeight(),
            l: jqElem.offset().left,
            t: jqElem.offset().top
        });

        console.log(defaultOpts);

        var player = document.getElementById("sic_playocx");
        player.width = defaultOpts.w;
        player.height = defaultOpts.h;
        // player.style.left = defaultOpts.l + "px";
        // player.style.top = defaultOpts.t + "px";
        player.style.left = 0;
        player.style.top = 0;
        player.style.display = "block";
        $(player).appendTo(jqElem);
        return player;
    };

    window.hidePlayer = global.hidePlayer = function(player) {
        player && (player.style.display = "none");
        $(player).appendTo($("body"));
    };

    window.initRecordParams = global.initRecordParams = function(data, layouts) {
        var list = [];
        var layout = 1;
        var rtype = conf.player.record_type;
        var gqList = $.grep(data, function(n) {
            return 0 == n.synthesisFlag;
        });
        var hcList = $.grep(data, function(n) {
            return 1 == n.synthesisFlag;
        });

        if (rtype == 0) {
            if (gqList.length > 0) {
                layout = layouts;
                list = gqList;
                if(layout == 0)
                {
                  layout = list.length;
                }
            } else {
                list = hcList;
            }
        } else {
            if (hcList.length > 0) {
                list = hcList;
            } else if (gqList.length > 0) {
                layout = layouts;
                list = gqList;
                if(layout == 0)
                {
                  layout = list.length;
                }
            }
        }

        var params = {
            layout: layout,
            list: list
        };

        return params;
    };

    window.JsonToParam = global.JsonToParam = function(jsonObj) {
        var temp = [];
        for (var key in jsonObj) {
            temp.push(key + "=" + jsonObj[key]);
        }

        return temp.join("&");
    };

    window.releaseVMEvents = global.releaseVMEvents = function(vm) {
        if (!vm || !vm.$events) {
            return;
        }

        var events = vm.$events;
        for (var prop in events) {
            if (Array.isArray(events[prop])) {
                events[prop].length = 0;
            }
            delete events[prop];
        }
    };

    return global;
});