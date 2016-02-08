/**
 * Created by kunii on 2015/06/01.
 */

// check converted
var isConverted = function (msg) {

    var messages = msg.split(/\r\n|\r|\n/)
        .filter(function (b) {
            if (b) return b;
        });

    // check more than 2 match code
    var a = messages.filter(function (b) {
            var c = b.match(/(\[To:\d+\])/g);
            if (c && c.length > 1) {
                return c;
            }
        });
    if (a.length >= 1) {
        return true;
    }

    // check only code
    var b = messages.filter(function (b) {
            var c = b.match(/^\[To:\d+\]$/);
            if (c) {
                return c;
            }
        });
    if (b.length >= 1) {
        return true;
    }

    // check more than 2 messages
    var matches = msg.match(/^(\[To:\d+\]).*\r?\n/gm);
    if (!matches || matches.length <= 1) {
        return true;
    }

    return false;
};

// empty name
var getEmptyName = function (msg) {

    return msg.replace(/^(\[To:\d+\]).*\r?\n/gm, '$1').replace(/(\[.*\])/, '$1\n');
};

(function () {
    var chatText = document.querySelector('#_chatText');
    var update = function () {
        var msg = chatText.value;
        if (!msg || isConverted(msg)) {
            return false;
        }

        chatText.value = getEmptyName(msg);
    };
    chatText.addEventListener('blur', update);
    chatText.addEventListener('click', update);
}());