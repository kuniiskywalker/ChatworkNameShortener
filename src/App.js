// @file App.js
(function(){
    let Cns = require('./Cns').default;

    let chatText = document.querySelector('#_chatText');
    let update = function () {
        let msg = chatText.value;
        if (!msg || Cns.isDeleted(msg)) {
            return false;
        }

        chatText.value = Cns.deleteName(msg);
    };
    chatText.addEventListener('blur', update);
    chatText.addEventListener('click', update);
})();
