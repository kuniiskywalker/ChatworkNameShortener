/**
 * Created by kunii on 2015/06/01.
 */

var observer = new window.MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        handleMutatedNode(mutation.target);
    });
});

observer.observe(document.querySelector("#_timeLine"), {attributes: false, childList: true, characterData: false, subtree: true});

function getUniqueStr(myStrong){
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}

function handleMutatedNode(node) {

    var searchResultNodes = node.querySelectorAll('._message');

    var ids = [];
    Array.prototype.slice.call(searchResultNodes).forEach(function (node){
        var id = node.getAttribute('data-mid');
        if (!id) {
            return false;
        }
        ids.push(id);
    });

    var source = function (ids, script_tag_id) {
        ids.forEach(function (id) {
            _CNS.updateTimeline(id);
        });
        document.body.removeChild(document.querySelector("script[data-id='" + script_tag_id + "']"));
    };

    document.body.appendChild(function () {
            var sc = document.createElement("script");
            var script_tag_id = getUniqueStr();
            sc.setAttribute("data-id", script_tag_id);
            sc.type = "text/javascript";
            sc.text = "("+source.toString()+") (["+ ids.toString() +"], '"+ script_tag_id +"')";
            return sc
        } ()
    );
}

document.body.appendChild(function () {

        // check exists message
        var getMsgById = function (id) {
            var chat = RM.timeline.chat_id2chat_dat[id];
            if (!chat || !chat.msg) {
                return false;
            }
            return chat.msg;
        };

        // empty name
        var getEmptyName = function (msg) {
            
            // check converted
            var a = msg.split(/\r\n|\r|\n/)
                .filter(function (b) {
                    if (b) return b;
                })
                .filter(function (b) {
                    var c = b.match(/(\[To:\d+\])/g);
                    if (c && c.length > 1) {
                        return a;
                    }
                });
            if (a.length > 1) {
                return false;
            }
            
            // check more than 2 messages
            var matches = msg.match(/^(\[To:\d+\]).*\r?\n?/gm);
            if (!matches || matches.length <= 1) {
                return false;
            }

            return msg.replace(/^(\[To:\d+\]).*\r?\n?/gm, '$1').replace(/(\[.*\])/, '$1\n');
        };

        // update timeline message
        var updateTimeline = function (id) {

            var msg = _CNS.getMsgById(id);
            if (!msg) {
                return false;
            }
            
            var empty_name = _CNS.getEmptyName(msg);
            if (!empty_name) {
                return false;
            }

            var timelineElement = document.querySelector("[data-mid='" + id + "'] pre");
            if (timelineElement) {
                timelineElement.innerHTML = CW.renderMessage(empty_name, {mid: id});
            }
        };
        
        var chatTextConvertEvent = function () {
            var chatText = document.querySelector('#_chatText');
            chatText.addEventListener('blur', function () {
                var msg = _CNS.getEmptyName(chatText.value);
                if (!msg) {
                    return false;
                }
                chatText.value = msg;
            });
            chatText.addEventListener('click', function () {
                var msg = _CNS.getEmptyName(chatText.value);
                if (!msg) {
                    return false;
                }
                chatText.value = msg;
            });
        };
        
        var src = "var _CNS = {};\n";
        src +="_CNS.getMsgById = " + getMsgById.toString() + ";\n";
        src +="_CNS.getEmptyName = " + getEmptyName.toString() + ";\n";
        src +="_CNS.updateTimeline = " + updateTimeline.toString() + ";\n";

        src += "(" + chatTextConvertEvent.toString() + ") ()";
        
        var sc = document.createElement("script");
        sc.type = "text/javascript";
        sc.text = src;
        return sc
    } ()
);
