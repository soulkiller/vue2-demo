(function(win, undefined) {

    var domainCode = "A64";
    var versionServer = "192.168.1.136";
    var versionPort = "7270";

    var _baseUrl = function() {
        return "http://" + versionServer + ":" + versionPort + "/publisher/";
    };

    var OCX_CONF = {
        player: {
            name: "HYPlayer",
            type: "cab",
            url: _baseUrl() + "product/getProduct.action",
            attrs: {
                id: "sic_playocx",
                width: 1280,
                height: 720,
                classid: "clsid:A48CA6A2-D901-4E82-BF51-CDAFDAD78045",
                style: "z-index:3;position:absolute;",
                type: "application/x-oleobject"
            },
            params: {
                ShowPlayBar: "1",
                ShowProgressBar: "1",
                ShowAudioBar: "1",
                ShowPlayPauseBtn: "1",
                ShowStretchBtn: "1",
                wmode: "opaque"
            }
        }
    };

    var addOcx = function(conf) {
        var params = {
            name: conf.name,
            domainCode: domainCode
        };

        if (conf.type) {
            params.type = conf.type;
        }

        $.getJSON(conf.url, params).done(function(data) {
            writeOcx(data, conf);
        }).fail(function(xhr) {
            if (conf.onError) {
                conf.onError(xhr);
            } else {
                getError(xhr);
            }
        });
    };

    var writeOcx = function(data, conf) {
        if (data && data.code == 0) {
            var ocxVer = data.result;
            var ocxDomStr = '<object ';

            var attrs = conf.attrs;
            if (attrs) {
                for (var name in attrs) {
                    ocxDomStr += name + '="' + attrs[name] + '" ';
                }
            }

            ocxDomStr += 'codebase="' + _baseUrl() + ocxVer.url + '#version=' + ocxVer.version + '">';
            var params = conf.params;
            if (params) {
                for (var name in params) {
                    ocxDomStr += '<param name="' + name + '" value="' + params[name] + '" />';
                }
            }
            ocxDomStr += '</object>';

            $("body").append(ocxDomStr);
        }
    };

    var getError = function(xhr) {
        console.log("获取OCX控件失败：" + xhr.status);
    };

    for (var key in OCX_CONF) {
        addOcx(OCX_CONF[key]);
    }

})(window);