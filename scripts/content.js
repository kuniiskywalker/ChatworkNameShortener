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

/**
 *
 * @param node
 */
function handleMutatedNode(node) {

    var searchResultNodes = node.querySelectorAll('._message');

    Array.prototype.slice.call(searchResultNodes).forEach(function (node){

        var id = node.getAttribute('data-mid');

        var source = function (id, script_tag_id) {
            _chatworkExtConvert(id);
            document.body.removeChild(document.querySelector("script[data-id='" + script_tag_id + "']"));
        };

        document.body.appendChild(function () {
                var sc = document.createElement("script");
                var script_tag_id = getUniqueStr();
                sc.setAttribute("data-id", script_tag_id);
                sc.type = "text/javascript";
                sc.text = "("+source.toString()+") ("+ id +", '"+ script_tag_id +"')";
                return sc
            } ()
        );
    });
}

//
var _chatworkExtConvert = function (id) {
    var chat = RM.timeline.chat_id2chat_dat[id];

    var msg = '';
    var isPrevMessageMemberNameOnly;
    chat.msg.split(/\r\n|\r|\n/).forEach(function (v, k) {

        var isMessageMemberNameOnly = false;

        var match = v.match(/^\[To:([0-9]+)\] (.+)$/);
        if (!match) {
            msg += v + "\n";
        } else {
            var member_id = match[1];
            var member_name = CW.is_business && ST.data.private_nickname && !RM.isInternal() ?
                AC.getDefaultNickName(member_id) : AC.getNickName(member_id);

            if (match[2].match(new RegExp('^' + member_name + '$'))) {
                isMessageMemberNameOnly = true;
                msg += '[To:' + member_id + '] ';
            } else {
                if (isPrevMessageMemberNameOnly) {
                    msg += "\n";
                }
                msg += v + "\n";
            }
        }

        isPrevMessageMemberNameOnly = isMessageMemberNameOnly;
    });

    var message = document.querySelector("[data-mid='" + id + "'] pre");
    if (message) {
        message.innerHTML = CW.renderMessage(msg, {mid: id});
    }
};

document.body.appendChild(function () {
        var sc = document.createElement("script");
        sc.type = "text/javascript";
        sc.text = "var _chatworkExtConvert = "+_chatworkExtConvert.toString();
        return sc
    } ()
);
