define(function() {
    var send = function(type) {
        // use vmodel to send broadcast event
        if (avalon.vmodels && avalon.vmodels.root) {
            avalon.vmodels.root.$fire("all!" + type, "broadcast");
        }
    };

    return {
        send: send
    };
});