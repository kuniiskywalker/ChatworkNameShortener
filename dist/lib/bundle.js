!function(e){var t={};function n(r){if(t[r])return t[r].exports;var u=t[r]={i:r,l:!1,exports:{}};return e[r].call(u.exports,u,u.exports,n),u.l=!0,u.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var u in e)n.d(r,u,function(t){return e[t]}.bind(null,u));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";!function(){var e=n(1).default;!function e(){setTimeout(function(){document.getElementById("_chatText")?t():e()},0)}();var t=function(){var t=document.querySelector("#_chatText"),n=function(){var n=t.value;if(!n||e.isDeleted(n))return!1;t.value=e.deleteName(n)};t.addEventListener("blur",n),t.addEventListener("click",n)}}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return r(e,null,[{key:"deleteName",value:function(e){var t=e.match(/^(\[To:\d+\]).*\r?\n/gm);return!t||t.length<=1?e:e.replace(/^(\[To:\d+\]).*\r?\n/gm,"$1").replace(/(\[.*\])/,"$1\n")}},{key:"isDeleted",value:function(e){var t=e.split(/\r\n|\r|\n/).filter(function(e){if(e)return e});if(t.filter(function(e){var t=e.match(/(\[To:\d+\])/g);if(t&&t.length>1)return t}).length>=1)return!0;if(t.filter(function(e){var t=e.match(/^\[To:\d+\]$/);if(t)return t}).length>=1)return!0;var n=e.match(/^(\[To:\d+\]).*\r?\n/gm);return!n||n.length<=1}}]),e}();t.default=u}]);