(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ad1fa19e"],{"0608":function(t,n,e){"use strict";e("bb57")},"0829":function(t,n,e){"use strict";e("9085");var i=e("813e"),o=e("6b3e"),r=e("7c66"),c=e("bc63"),s=e("a38b");n["a"]=Object(s["a"])(i["a"],o["a"],r["a"]).extend({name:"v-avatar",props:{left:Boolean,right:Boolean,size:{type:[Number,String],default:48}},computed:{classes(){return{"v-avatar--left":this.left,"v-avatar--right":this.right,...this.roundedClasses}},styles(){return{height:Object(c["g"])(this.size),minWidth:Object(c["g"])(this.size),width:Object(c["g"])(this.size),...this.measurableStyles}}},render(t){const n={staticClass:"v-avatar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,n),this.$slots.default)}})},"0dfb":function(t,n,e){"use strict";var i=e("6b3e"),o=e("4254"),r=e("7d4b"),c=e("a38b"),s=e("bc63");n["a"]=Object(c["a"])(i["a"],o["a"]).extend({name:"VLazy",directives:{intersect:r["a"]},props:{options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},tag:{type:String,default:"div"},transition:{type:String,default:"fade-transition"}},computed:{styles(){return{...this.measurableStyles}}},methods:{genContent(){const t=Object(s["r"])(this);if(!this.transition)return t;const n=[];return this.isActive&&n.push(t),this.$createElement("transition",{props:{name:this.transition}},n)},onObserve(t,n,e){this.isActive||(this.isActive=e)}},render(t){return t(this.tag,{staticClass:"v-lazy",attrs:this.$attrs,directives:[{name:"intersect",value:{handler:this.onObserve,options:this.options}}],on:this.$listeners,style:this.styles},[this.genContent()])}})},"22ce":function(t,n,e){t.exports=e.p+"img/notification_trash.b24d544c.svg"},"26f1":function(t,n,e){var i={"./notification_block.svg":"4cd4","./notification_channels.svg":"cd4e","./notification_receive.svg":"cbd5","./notification_settle.svg":"7909","./notification_state_backup.svg":"f964","./notification_trash.svg":"22ce","./notification_withdrawn.svg":"6fe8","./notifications.svg":"db7b"};function o(t){var n=r(t);return e(n)}function r(t){if(!e.o(i,t)){var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}return i[t]}o.keys=function(){return Object.keys(i)},o.resolve=r,t.exports=o,o.id="26f1"},"32e3":function(t,n,e){"use strict";e("fa60")},"3f21":function(t,n,e){},"61ac":function(t,n,e){"use strict";e("f0bf");var i=e("bc63");n["a"]=Object(i["h"])("spacer","div","v-spacer")},"655c":function(t,n,e){},"6fe8":function(t,n,e){t.exports=e.p+"img/notification_withdrawn.28685e5e.svg"},7909:function(t,n,e){t.exports=e.p+"img/notification_settle.d0da77d6.svg"},9085:function(t,n,e){},add5:function(t,n,e){"use strict";e("655c");var i=e("db2c");n["a"]=i["a"].extend().extend({name:"v-list",provide(){return{isInList:!0,list:this}},inject:{isInMenu:{default:!1},isInNav:{default:!1}},props:{dense:Boolean,disabled:Boolean,expand:Boolean,flat:Boolean,nav:Boolean,rounded:Boolean,subheader:Boolean,threeLine:Boolean,twoLine:Boolean},data:()=>({groups:[]}),computed:{classes(){return{...i["a"].options.computed.classes.call(this),"v-list--dense":this.dense,"v-list--disabled":this.disabled,"v-list--flat":this.flat,"v-list--nav":this.nav,"v-list--rounded":this.rounded,"v-list--subheader":this.subheader,"v-list--two-line":this.twoLine,"v-list--three-line":this.threeLine}}},methods:{register(t){this.groups.push(t)},unregister(t){const n=this.groups.findIndex(n=>n._uid===t._uid);n>-1&&this.groups.splice(n,1)},listClick(t){if(!this.expand)for(const n of this.groups)n.toggle(t)}},render(t){const n={staticClass:"v-list",class:this.classes,style:this.styles,attrs:{role:this.isInNav||this.isInMenu?void 0:"list",...this.attrs$}};return t(this.tag,this.setBackgroundColor(this.color,n),[this.$slots.default])}})},bb57:function(t,n,e){},c284:function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"notification-panel","data-cy":"notification_panel"}},[e("div",{staticClass:"notification-panel-content"},[e("div",{staticClass:"notification-panel-content__close"},[e("v-btn",{attrs:{text:""},on:{click:function(n){return t.clear()}}},[t._v(" "+t._s(t.$t("notifications.clear"))+" ")]),e("v-spacer"),e("v-icon",{staticClass:"notification-panel-content__close__button",attrs:{"data-cy":"notification_panel_content_close_button",icon:""},on:{click:function(n){return t.onModalBackClicked()}}},[t._v(" mdi-close ")])],1),0===t.notifications.length?e("v-row",{staticClass:"notification-panel-content__no-notifications full-height",attrs:{"no-gutters":"",justify:"center",align:"center"}},[t._v(" "+t._s(t.$t("notifications.no-notifications"))+" ")]):e("v-container",{staticClass:"notification-panel-content__notifications",attrs:{fluid:""}},[e("div",{staticClass:"notification-panel-content__notifications__notification-wrapper"},[e("v-list",{attrs:{color:"transparent"}},t._l(t.notifications,(function(t){return e("div",{key:t.id},[e("v-lazy",{attrs:{transition:"fade-transition",options:{threshold:.7},"min-height":"110"}},[e("notification-card",{staticClass:"notification-panel-content__notifications__notification-wrapper__notification",attrs:{notification:t}})],1)],1)})),0)],1)])],1)])},o=[],r=e("9ab4"),c=e("5cf9"),s=e("94ea"),a=e("152b"),f=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-card",{staticClass:"notification-card",attrs:{"data-cy":"notification_card",flat:""}},[i("v-row",{staticClass:"notification-card__content",attrs:{"no-gutters":""}},[i("v-avatar",{staticClass:"notification-card__content__icon",attrs:{size:"44",rounded:""}},[i("img",{attrs:{src:e("26f1")("./"+t.notification.icon+".svg")}})]),i("div",{staticClass:"notification-card__content__details"},[i("span",{staticClass:"notification-card__content__details__title"},[t._v(" "+t._s(t.notification.title)+" ")]),i("notification-description-display",{staticClass:"notification-card__content__details__description",attrs:{description:t.notification.description}}),t.showConfirmationCounter?i("div",{staticClass:"notification-card__content__details__block-count"},[i("span",[t._v(" "+t._s(t.$t("notifications.block-count-progress"))+" "+t._s(t.blocksUntilTxConfirmation)+" ")])]):t._e(),t.notification.link?i("span",{staticClass:"notification-card__content__details__link",on:{click:t.linkRoute}},[t._v(" "+t._s(t.notification.link)+" ")]):t._e(),i("span",{staticClass:"notification-card__content__details__received"},[t._v(" "+t._s(t._f("formatDate")(t.notification.received))+" ")])],1),i("v-btn",{staticClass:"notification-card__delete-button",attrs:{"x-small":"",icon:"","data-cy":"notification_card_delete_button"},on:{click:function(n){return t.notificationDelete(t.notification.id)}}},[i("img",{attrs:{src:e("22ce")}})])],1)],1)},u=[],l=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"notification-description"},t._l(t.splitDescription,(function(n,i){return e("p",{key:i},[t.isAddress(n)?[e("address-display",{staticClass:"notification-description__address",attrs:{address:n}})]:[t._v(" "+t._s(n)+" ")]],2)})),0)},p=[],d=e("9302");function b(t){return b="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b(t)}function y(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function h(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function v(t,n,e){return n&&h(t.prototype,n),e&&h(t,e),t}function _(t,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&O(t,n)}function O(t,n){return O=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t},O(t,n)}function g(t){var n=w();return function(){var e,i=C(t);if(n){var o=C(this).constructor;e=Reflect.construct(i,arguments,o)}else e=i.apply(this,arguments);return m(this,e)}}function m(t,n){return!n||"object"!==b(n)&&"function"!==typeof n?j(t):n}function j(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function w(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function C(t){return C=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},C(t)}var k=function(t){_(e,t);var n=g(e);function e(){var t;return y(this,e),t=n.apply(this,arguments),t.addressRegEx=/(0x.[a-fA-F0-9]{1,40})/g,t.splitDescription=[],t}return v(e,[{key:"updateSplitDescription",value:function(t){this.splitDescription=t.split(this.addressRegEx)}},{key:"isAddress",value:function(t){return this.addressRegEx.test(t)}}]),e}(c["e"]);Object(r["a"])([Object(c["d"])({required:!0})],k.prototype,"description",void 0),Object(r["a"])([Object(c["f"])("description",{immediate:!0})],k.prototype,"updateSplitDescription",null),k=Object(r["a"])([Object(c["a"])({components:{AddressDisplay:d["a"]}})],k);var P=k,x=P,S=(e("32e3"),e("a6c2")),D=Object(S["a"])(x,l,p,!1,null,"7d5bb522",null),R=D.exports;function E(t){return E="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},E(t)}function B(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,i)}return e}function $(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?B(Object(e),!0).forEach((function(n){V(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):B(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function V(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function T(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function z(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function L(t,n,e){return n&&z(t.prototype,n),e&&z(t,e),t}function N(t,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&A(t,n)}function A(t,n){return A=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t},A(t,n)}function I(t){var n=q();return function(){var e,i=F(t);if(n){var o=F(this).constructor;e=Reflect.construct(i,arguments,o)}else e=i.apply(this,arguments);return M(this,e)}}function M(t,n){return!n||"object"!==E(n)&&"function"!==typeof n?U(t):n}function U(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function q(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function F(t){return F=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},F(t)}var J=Object(s["a"])("notifications"),W=J.mapMutations,G=function(t){N(e,t);var n=I(e);function e(){return T(this,e),n.apply(this,arguments)}return L(e,[{key:"linkRoute",value:function(){this.$router.push({name:this.notification.dappRoute})}},{key:"blocksUntilTxConfirmation",get:function(){var t=this.notification.txConfirmationBlock;if(t)return t-this.blockNumber}},{key:"showConfirmationCounter",get:function(){return void 0!==this.blocksUntilTxConfirmation&&this.blocksUntilTxConfirmation>0}}]),e}(c["e"]);Object(r["a"])([Object(c["d"])({required:!0})],G.prototype,"notification",void 0),G=Object(r["a"])([Object(c["a"])({components:{NotificationDescriptionDisplay:R},computed:Object(s["e"])(["blockNumber"]),methods:$({},W(["notificationDelete"]))})],G);var H=G,K=H,Q=(e("ffaf"),e("411c")),X=e.n(Q),Y=e("0829"),Z=e("9c46"),tt=e("d58c"),nt=e("e614"),et=Object(S["a"])(K,f,u,!1,null,"3b12bb7c",null),it=et.exports;function ot(t){return ot="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ot(t)}function rt(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,i)}return e}function ct(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?rt(Object(e),!0).forEach((function(n){st(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):rt(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function st(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function at(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function ft(t,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&ut(t,n)}function ut(t,n){return ut=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t},ut(t,n)}function lt(t){var n=bt();return function(){var e,i=yt(t);if(n){var o=yt(this).constructor;e=Reflect.construct(i,arguments,o)}else e=i.apply(this,arguments);return pt(this,e)}}function pt(t,n){return!n||"object"!==ot(n)&&"function"!==typeof n?dt(t):n}function dt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function bt(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function yt(t){return yt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},yt(t)}X()(et,{VAvatar:Y["a"],VBtn:Z["a"],VCard:tt["a"],VRow:nt["a"]});var ht=function(t){ft(e,t);var n=lt(e);function e(){return at(this,e),n.apply(this,arguments)}return e}(Object(c["c"])(a["a"]));ht=Object(r["a"])([Object(c["a"])({components:{NotificationCard:it},computed:ct({},Object(s["c"])("notifications",["notifications"])),methods:ct({},Object(s["d"])("notifications",["clear"]))})],ht);var vt=ht,_t=vt,Ot=(e("0608"),e("f56c")),gt=e("b503"),mt=e("0dfb"),jt=e("add5"),wt=e("61ac"),Ct=Object(S["a"])(_t,i,o,!1,null,"6355384e",null);n["default"]=Ct.exports;X()(Ct,{VBtn:Z["a"],VContainer:Ot["a"],VIcon:gt["a"],VLazy:mt["a"],VList:jt["a"],VRow:nt["a"],VSpacer:wt["a"]})},cbd5:function(t,n,e){t.exports=e.p+"img/notification_receive.c033167d.svg"},cd4e:function(t,n,e){t.exports=e.p+"img/notification_channels.e8a0318a.svg"},f964:function(t,n,e){t.exports=e.p+"img/notification_state_backup.d9881512.svg"},fa60:function(t,n,e){},ffaf:function(t,n,e){"use strict";e("3f21")}}]);