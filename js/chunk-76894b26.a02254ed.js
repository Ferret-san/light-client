(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76894b26"],{"03af":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:{"amount-display--inline":t.inline},on:{mouseover:function(e){t.exactAmount&&(t.displayExactAmount=!0)},mouseleave:function(e){t.exactAmount&&(t.displayExactAmount=!1)}}},[t.displayExactAmount?n("span",[t._v(" "+t._s(t._f("toUnits")(t.amount,t.token.decimals))+" "+t._s(t.token.symbol||"")+" ")]):n("span",[t._v(" "+t._s(t._f("displayFormat")(t.amount,t.token.decimals))+" "+t._s(t.token.symbol||"")+" ")])])},o=[],i=n("9ab4"),c=n("5cf9");function a(t){return a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}function l(t,e){return l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},l(t,e)}function f(t){var e=d();return function(){var n,r=b(t);if(e){var o=b(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return p(this,n)}}function p(t,e){return!e||"object"!==a(e)&&"function"!==typeof e?y(t):e}function y(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function d(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function b(t){return b=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},b(t)}var h=function(t){u(n,t);var e=f(n);function n(){var t;return s(this,n),t=e.apply(this,arguments),t.displayExactAmount=!1,t}return n}(c["e"]);Object(i["a"])([Object(c["d"])({required:!1,default:!1,type:Boolean})],h.prototype,"exactAmount",void 0),Object(i["a"])([Object(c["d"])({required:!0})],h.prototype,"amount",void 0),Object(i["a"])([Object(c["d"])({required:!0})],h.prototype,"token",void 0),Object(i["a"])([Object(c["d"])({required:!1,default:!1,type:Boolean})],h.prototype,"inline",void 0),h=Object(i["a"])([Object(c["a"])({})],h);var m=h,v=m,_=(n("e428"),n("a6c2")),O=Object(_["a"])(v,r,o,!1,null,"47ea2649",null);e["a"]=O.exports},"390a":function(t,e,n){"use strict";n("4043")},4043:function(t,e,n){},"786f":function(t,e,n){"use strict";n("cfc7")},"8a04":function(t,e,n){},b8a1:function(t,e,n){},bbb6:function(t,e,n){"use strict";n("f044")},bd45:function(t,e,n){"use strict";n("b8a1")},cfc7:function(t,e,n){},d0aa:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",{staticClass:"list-header",attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"12"}},[n("div",{staticClass:"list-header__header"},[t._v(t._s(t.header))]),n("div",{staticClass:"list-header__divider"})])],1)},o=[],i=n("9ab4"),c=n("5cf9");function a(t){return a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}function l(t,e){return l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},l(t,e)}function f(t){var e=d();return function(){var n,r=b(t);if(e){var o=b(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return p(this,n)}}function p(t,e){return!e||"object"!==a(e)&&"function"!==typeof e?y(t):e}function y(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function d(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function b(t){return b=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},b(t)}var h=function(t){u(n,t);var e=f(n);function n(){return s(this,n),e.apply(this,arguments)}return n}(c["e"]);Object(i["a"])([Object(c["d"])({required:!0})],h.prototype,"header",void 0),h=Object(i["a"])([Object(c["a"])({})],h);var m=h,v=m,_=(n("786f"),n("a6c2")),O=n("411c"),j=n.n(O),g=n("1fb1"),k=n("e614"),w=Object(_["a"])(v,r,o,!1,null,"3e3c99e4",null);e["a"]=w.exports;j()(w,{VCol:g["a"],VRow:k["a"]})},d292:function(t,e,n){},e428:function(t,e,n){"use strict";n("d292")},e6df:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"token-list d-flex flex-column",attrs:{"data-cy":"token_list"}},[t.header?n("list-header",{staticClass:"flex-grow-0",attrs:{header:t.header}}):t._e(),n("div",{staticClass:"token-list__wrapper flex-grow-1"},[n("v-virtual-scroll",{attrs:{items:t.tokens,"item-height":"105",bench:"400"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.item;return[n("token-list-item",{attrs:{token:r},on:{select:t.forwardTokenSelection}})]}}])})],1)],1)},o=[],i=n("36d8"),c=n.n(i),a=n("9ab4"),s=n("5cf9"),u=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-list-item",{key:t.detailedToken.address,staticClass:"token-list-item",attrs:{"data-cy":"token_list_item"},on:{click:t.emitSelectToken}},[r("v-list-item-avatar",[r("img",{attrs:{src:t.avatarSource,"src-lazy":n("ec79"),alt:t.$t("token-list.item.blockie-alt")}})]),r("v-list-item-content",{staticClass:"mr-4"},[r("v-list-item-title",{staticClass:"font-weight-bold"},[t._v(" "+t._s(t.$t("token-list.item.information-template",{symbol:t.detailedToken.symbol,name:t.detailedToken.name}))+" ")]),r("v-list-item-subtitle",[r("address-display",{staticClass:"token-list-item__address",attrs:{address:t.detailedToken.address}})],1)],1),r("v-list-item-action-text",{staticClass:"mt-n5 mr-5"},[t.detailedToken.balance?r("amount-display",{staticClass:"token-list-item__balance white--text font-weight-bold",attrs:{amount:t.detailedToken.balance,token:t.detailedToken,"exact-amount":""}}):t._e()],1)],1)},l=[],f=n("77fd"),p=n("9302"),y=n("03af");function d(t){return d="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function b(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function m(t,e,n){return e&&h(t.prototype,e),n&&h(t,n),t}function v(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_(t,e)}function _(t,e){return _=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},_(t,e)}function O(t){var e=k();return function(){var n,r=w(t);if(e){var o=w(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return j(this,n)}}function j(t,e){return!e||"object"!==d(e)&&"function"!==typeof e?g(t):e}function g(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function k(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function w(t){return w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},w(t)}var S=function(t){v(n,t);var e=O(n);function n(){return b(this,n),e.apply(this,arguments)}return m(n,[{key:"emitSelectToken",value:function(){return this.token}},{key:"detailedToken",get:function(){var t;return null!==(t=this.$store.getters.token(this.token.address))&&void 0!==t?t:this.token}},{key:"avatarSource",get:function(){return this.$blockie(this.token.address)}}]),n}(Object(s["c"])(f["a"]));Object(a["a"])([Object(s["d"])({required:!0})],S.prototype,"token",void 0),Object(a["a"])([Object(s["b"])("select")],S.prototype,"emitSelectToken",null),S=Object(a["a"])([Object(s["a"])({components:{AddressDisplay:p["a"],AmountDisplay:y["a"]}})],S);var T=S,x=T,R=(n("bd45"),n("a6c2")),P=n("411c"),E=n.n(P),C=n("d751"),$=n("27a3"),L=n("c772"),A=Object(R["a"])(x,u,l,!1,null,"4b9b133d",null),D=A.exports;E()(A,{VListItem:C["a"],VListItemActionText:$["a"],VListItemAvatar:L["a"],VListItemContent:$["b"],VListItemSubtitle:$["c"],VListItemTitle:$["d"]});var H=n("d0aa");function I(t){return I="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I(t)}function V(t,e,n,r,o,i,c){try{var a=t[i](c),s=a.value}catch(u){return void n(u)}a.done?e(s):Promise.resolve(s).then(r,o)}function q(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function c(t){V(i,r,o,c,a,"next",t)}function a(t){V(i,r,o,c,a,"throw",t)}c(void 0)}))}}function M(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function F(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function B(t,e,n){return e&&F(t.prototype,e),n&&F(t,n),t}function J(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&N(t,e)}function N(t,e){return N=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},N(t,e)}function U(t){var e=K();return function(){var n,r=Q(t);if(e){var o=Q(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return z(this,n)}}function z(t,e){return!e||"object"!==I(e)&&"function"!==typeof e?G(t):e}function G(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function K(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function Q(t){return Q=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Q(t)}var W=function(t){J(n,t);var e=U(n);function n(){return M(this,n),e.apply(this,arguments)}return B(n,[{key:"forwardTokenSelection",value:function(t){return t}},{key:"mounted",value:function(){var t=q(c.a.mark((function t(){return c.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$raiden.fetchAndUpdateTokenData();case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}]),n}(s["e"]);Object(a["a"])([Object(s["d"])({type:String})],W.prototype,"header",void 0),Object(a["a"])([Object(s["d"])({required:!0})],W.prototype,"tokens",void 0),Object(a["a"])([Object(s["b"])("select")],W.prototype,"forwardTokenSelection",null),W=Object(a["a"])([Object(s["a"])({components:{ListHeader:H["a"],TokenListItem:D}})],W);var X=W,Y=X,Z=(n("bbb6"),n("8a04"),n("6b3e"));function tt(t,e){const{self:n=!1}=e.modifiers||{},r=e.value,o="object"===typeof r&&r.options||{passive:!0},i="function"===typeof r||"handleEvent"in r?r:r.handler,c=n?t:e.arg?document.querySelector(e.arg):window;c&&(c.addEventListener("scroll",i,o),t._onScroll={handler:i,options:o,target:n?void 0:c})}function et(t){if(!t._onScroll)return;const{handler:e,options:n,target:r=t}=t._onScroll;r.removeEventListener("scroll",e,n),delete t._onScroll}const nt={inserted:tt,unbind:et};var rt=nt,ot=n("bc63"),it=Z["a"].extend({name:"v-virtual-scroll",directives:{Scroll:rt},props:{bench:{type:[Number,String],default:0},itemHeight:{type:[Number,String],required:!0},items:{type:Array,default:()=>[]}},data:()=>({first:0,last:0,scrollTop:0}),computed:{__bench(){return parseInt(this.bench,10)},__itemHeight(){return parseInt(this.itemHeight,10)},firstToRender(){return Math.max(0,this.first-this.__bench)},lastToRender(){return Math.min(this.items.length,this.last+this.__bench)}},watch:{height:"onScroll",itemHeight:"onScroll"},mounted(){this.last=this.getLast(0)},methods:{getChildren(){return this.items.slice(this.firstToRender,this.lastToRender).map(this.genChild)},genChild(t,e){e+=this.firstToRender;const n=Object(ot["g"])(e*this.__itemHeight);return this.$createElement("div",{staticClass:"v-virtual-scroll__item",style:{top:n},key:e},Object(ot["r"])(this,"default",{index:e,item:t}))},getFirst(){return Math.floor(this.scrollTop/this.__itemHeight)},getLast(t){const e=parseInt(this.height||0,10)||this.$el.clientHeight;return t+Math.ceil(e/this.__itemHeight)},onScroll(){this.scrollTop=this.$el.scrollTop,this.first=this.getFirst(),this.last=this.getLast(this.first)}},render(t){const e=t("div",{staticClass:"v-virtual-scroll__container",style:{height:Object(ot["g"])(this.items.length*this.__itemHeight)}},this.getChildren());return t("div",{staticClass:"v-virtual-scroll",style:this.measurableStyles,directives:[{name:"scroll",modifiers:{self:!0},value:this.onScroll}],on:this.$listeners},[e])}}),ct=Object(R["a"])(Y,r,o,!1,null,"2fa8e98a",null);e["a"]=ct.exports;E()(ct,{VVirtualScroll:it})},eb67:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"select-token flex-grow-1 pt-8"},[n("token-list",{attrs:{header:t.$t("select-token.header"),tokens:t.allTokens},on:{select:t.selectToken}})],1)},o=[],i=n("36d8"),c=n.n(i),a=n("9ab4"),s=n("5cf9"),u=n("94ea"),l=n("152b"),f=n("77fd"),p=n("e6df");function y(t){return y="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function d(t,e,n,r,o,i,c){try{var a=t[i](c),s=a.value}catch(u){return void n(u)}a.done?e(s):Promise.resolve(s).then(r,o)}function b(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function c(t){d(i,r,o,c,a,"next",t)}function a(t){d(i,r,o,c,a,"throw",t)}c(void 0)}))}}function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function v(t,e,n){return e&&m(t.prototype,e),n&&m(t,n),t}function _(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&O(t,e)}function O(t,e){return O=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},O(t,e)}function j(t){var e=w();return function(){var n,r=S(t);if(e){var o=S(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return g(this,n)}}function g(t,e){return!e||"object"!==y(e)&&"function"!==typeof e?k(t):e}function k(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function w(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function S(t){return S=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},S(t)}var T=function(t){_(n,t);var e=j(n);function n(){return h(this,n),e.apply(this,arguments)}return v(n,[{key:"mounted",value:function(){var t=b(c.a.mark((function t(){return c.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$raiden.fetchTokenList();case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"selectToken",value:function(t){this.navigateToSelectHub(t.address)}}]),n}(Object(s["c"])(f["a"],l["a"]));T=Object(a["a"])([Object(s["a"])({components:{TokenList:p["a"]},computed:Object(u["c"])(["allTokens"])})],T);var x=T,R=x,P=(n("390a"),n("a6c2")),E=Object(P["a"])(R,r,o,!1,null,"f060238a",null);e["default"]=E.exports},ec79:function(t,e,n){t.exports=n.p+"img/generic.55c56a33.svg"},f044:function(t,e,n){}}]);