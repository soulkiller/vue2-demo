define(['config/sysconf', "cookie"], function(conf, Cookie) {

    var COOKIE_NAME = "cookiestr";
    var TOKEN_NAME = "tokenstr";
    var _cookie = null;
    var _token = null;

    var httpCallBack = null;

    if (Cookie.get(COOKIE_NAME)) {
        _cookie = Cookie.get(COOKIE_NAME);
    }

    if (Cookie.get(TOKEN_NAME)) {
        _token = Cookie.get(TOKEN_NAME);
    }

    var serialize = function(jsonObj) {
        if (! jsonObj) {
            return "";
        }

        var keyArr = [];
        for (var key in jsonObj) {
            keyArr.push(key + "=" + jsonObj[key]);
        }

        return keyArr.join("&");
    };

    var _request = function(type, url, params, headers) {
        log("send request: " + url + ", params: " + JSON.stringify(params) + " [" + type + "], " + JSON.stringify(headers));

        if (! url) {
            log("request url is invalid ");
            return;
        }

        var dfd = $.Deferred();

        var sendHeader = $.extend({
            "Cache-Control": "no-cache"
        }, headers);

        var targetUrl = url;
        if(!params){
            params = {};
        }
        _convertNull(params);

        if (_isTestData(url)) {
            type = "GET";
        } else if (conf.useProxy) {
            var proxy = conf.proxy;
            targetUrl = proxy.getUrl();
            // $.extend(sendHeader, proxy.getHeader(url));
        }

        if (type == "POST") {
            params = JSON.stringify(params);
        }

        $.ajax({
            url: targetUrl,
            type: type,
            dataType: "json", // set all response data as json type
            data: params,
            headers: sendHeader,
            beforeSend: function(xhr) {
                if (conf.useProxy) {
                    xhr.setRequestHeader("target-url", url);
                }
            }
        })
        .done(function(response, status, xhr) {
            log("ajax request [" + url + "] success, result:");
            log(response);
            dfd.resolve(response);
        })
        .fail(function() {
            log("ajax request [" + url + "] failed");
            dfd.reject();
        });

        return dfd;
    };

    var _requestSync = function(type, url, params, headers) {

        if (! url) {
            log("request url is invalid ");
            return;
        }

        var sendHeader = $.extend({
            "Cache-Control": "no-cache"
        }, headers);

        var result = {
            success: false,
            response: null
        };

        var targetUrl = url;

        _convertNull(params);

        if (_isTestData(url)) {
            type = "GET";
        } else if (conf.useProxy) {
            var proxy = conf.proxy;
            targetUrl = proxy.getUrl();
            // $.extend(sendHeader, proxy.getHeader(url));
        }

        if (type == "POST") {
            params = JSON.stringify(params);
        }

        $.ajax({
            url: targetUrl,
            type: type,
            async: false,
            dataType: "json", // set all response data as json type
            data: params,
            headers: sendHeader,
            // crossDomain: true,
            // xhrFields: {withCredentials: true},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
                if (_token) {
                    xhr.setRequestHeader("token_id", _token);
                }
                if (conf.useProxy) {
                    xhr.setRequestHeader("target-url", url);
                }
            }
        })
        .done(function(response, status, xhr) {
            // var sessionstatus = xhr.getResponseHeader("sessionstatus");
            /*var cookies = xhr.getResponseHeader("cookies");
            if (cookies && (cookies.length > 0)) {
                _cookie = cookies;
                Cookie.set(COOKIE_NAME, cookies);
            }*/
            if(xhr.status != "200") {
                httpCallBack && httpCallBack(xhr.status);
            }
            var t_id = xhr.getResponseHeader("token_id");
            if (t_id && (t_id.length > 0)) {
                _token = t_id;
                Cookie.set(TOKEN_NAME, t_id);
            }
            result.success = true;
            result.response = response;
            log("ajax request [" + url + "] success, result:");
            log(response);
        })
        .fail(function(xhr) {
            if(xhr.status != "200") {
                httpCallBack && httpCallBack(xhr.status);
            }
            log("ajax request[" + type + "] failed: " + url + ", " + JSON.stringify(params));
            log("headers:" + JSON.stringify(headers));
        });

        return result;
    };

    var _isTestData = function(url) {
        return url.indexOf("testdata") > -1;
    };

    var _convertNull = function(params) {
        if (! params) {
            return;
        }

        for (var key in params) {
            if (params[key] === null || params[key] === undefined) {
                params[key] = "";
            }
        }
    };

    var get = function(url, params, headers) {
        return _request("GET", url, params, headers);
    };

    var post = function(url, params, headers) {
        return _request("POST", url, params, headers);
    };

    var getSync = function(url, params, headers) {
        return _requestSync("GET", url, params, headers);
    };

    var postSync = function(url, params, headers) {
        return _requestSync("POST", url, params, headers);
    };

    var setHttpCallBack = function(callBack) {
        httpCallBack = callBack;
    };

    return {
        get: get,
        post: post,
        getSync: getSync,
        postSync: postSync,
        setHttpCallBack : setHttpCallBack
    };
});