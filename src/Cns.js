export default class Cns {
    static deleteName(msg) {
        let matches = msg.match(/^(\[To:\d+\]).*\r?\n/gm);
        if (!matches || matches.length <= 1) {
            return msg;
        }
        return msg.replace(/^(\[To:\d+\]).*\r?\n/gm, '$1').replace(/(\[.*\])/, '$1\n');
    }

    static isDeleted(msg) {

        var messages = msg.split(/\r\n|\r|\n/)
            .filter(function (b) {
                if (b) return b;
            });

        // check more than 2 match code
        let a = messages.filter(function (b) {
            let c = b.match(/(\[To:\d+\])/g);
            if (c && c.length > 1) {
                return c;
            }
        });
        if (a.length >= 1) {
            return true;
        }

        // check only code
        let b = messages.filter(function (b) {
            let c = b.match(/^\[To:\d+\]$/);
            if (c) {
                return c;
            }
        });
        if (b.length >= 1) {
            return true;
        }

        // check more than 2 messages
        let matches = msg.match(/^(\[To:\d+\]).*\r?\n/gm);
        if (!matches || matches.length <= 1) {
            return true;
        }

        return false;
    };
}