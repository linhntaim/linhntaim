(self["webpackChunk_linhntaim_linhntaim"]=self["webpackChunk_linhntaim_linhntaim"]||[]).push([[517],{9068:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return h}});var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"home"},[e("div",{staticClass:"background",staticStyle:{"background-image":"url('/assets/img/cover.jpg')"}}),e("div",{staticClass:"content"},[e("h1",[t._v("LINHNTAIM")]),e("blockquote"),t._m(0),e("canvas"),e("div",{staticClass:"player"},[e("img",{staticClass:"vinyl-turntable",attrs:{src:t.appUrl+"/assets/img/vinyl_player.png"}}),e("img",{staticClass:"vinyl",class:{playing:t.playing,paused:t.paused},attrs:{src:t.appUrl+"/assets/img/vinyl.png"},on:{click:t.onVinylClicked}}),e("img",{staticClass:"vinyl-handler",class:{playing:t.playing,paused:t.paused},attrs:{src:t.appUrl+"/assets/img/vinyl_handler.png"},on:{click:t.onVinylHandlerClicked}}),e("img",{staticClass:"vinyl-led grey",class:{playing:t.playing,paused:t.paused},attrs:{src:t.appUrl+"/assets/img/vinyl_led_grey.png"}}),t.stopped?e("img",{staticClass:"vinyl-led red",class:{playing:t.playing,paused:t.paused},attrs:{src:t.appUrl+"/assets/img/vinyl_led_red.png"}}):t._e(),t.paused?e("img",{staticClass:"vinyl-led yellow",class:{playing:t.playing,paused:t.paused},attrs:{src:t.appUrl+"/assets/img/vinyl_led_yellow.png"}}):t._e(),t.playing?e("img",{staticClass:"vinyl-led green",class:{playing:t.playing,paused:t.paused},attrs:{src:t.appUrl+"/assets/img/vinyl_led_green.png"}}):t._e(),e("button",{staticClass:"vinyl-power",on:{click:t.onVinylPowerClicked}})])])])},i=[function(){var t=this,e=t._self._c;return e("nav",[e("div",{staticClass:"nav-item"},[e("a",{attrs:{href:"https://hey.linhntaim.com",target:"_blank"}},[e("span",[t._v("hey")])])]),e("div",{staticClass:"nav-item-divider"}),e("div",{staticClass:"nav-item"},[e("a",{attrs:{href:"https://resume.linhntaim.com",target:"_blank"}},[e("span",[t._v("my resume")])])]),e("div",{staticClass:"nav-item"},[e("a",{attrs:{href:"https://pinkspirit.linhntaim.com",target:"_blank"}},[e("span",[t._v("pinkspirit")])])]),e("div",{staticClass:"nav-item"},[e("a",{attrs:{href:"https://dev.linhntaim.com",target:"_blank"}},[e("span",[t._v("dev")])])]),e("div",{staticClass:"nav-item-divider"})])}],o=(r(1439),r(7585),r(5315),r(2343));r(7658);class s{constructor(){this.audio=new Audio,this.audio.crossOrigin="anonymous",this.audio.addEventListener("ended",this.next.bind(this)),this.playlist=[],this.playlistIndex=-1,this.playing=!1,this.stopped=!0}enableAutoplay(){return this.audio.autoplay=!0,this}enableLoop(){return this.audio.loop=!0,this}add(...t){return this.playlist.push(...t),this}shuffle(){return this.playlist.sort((()=>Math.random()-.5)),this}startOver(){return this.audio.currentTime=0,this}start(){return this.play()}next(){const t=this.playlistIndex+1;return this.play(t>=this.playlist.length?0:t)}prev(){const t=this.playlistIndex-1;return this.play(t<0?this.playlist.length-1:t)}async play(t=0){if(t<0||t>=this.playlist.length)return!1;this.playlistIndex=t;const e=this.playlist[this.playlistIndex];return this.audio.src!==e?(this.audio.src=e,await new Promise((t=>{const e=async()=>{this.audio.removeEventListener("canplaythrough",e),t(await this.startOver().playCurrent())};this.audio.addEventListener("canplaythrough",e)}))):await this.playCurrent()}async playCurrent(){try{return await this.audio.play(),(0,o.qn)(!this.audio.paused,(t=>{this.playing=t,this.stopped=!t}))}catch(t){return console.log(t),!1}}pause(){this.audio.pause(),this.playing=!1}stop(){this.pause(),this.audio.currentTime=0,this.stopped=!0}createContext(){return"undefined"===typeof this.audioContext?this.audioContext=new(window.AudioContext||window.webkitAudioContext):this.audioContext}createAnalyser(){return"undefined"===typeof this.audioAnalyser?this.audioAnalyser=(0,o.qn)(this.createContext().createAnalyser(),(t=>{t.fftSize=128,t.maxDecibels=0,t.minDecibels=-100,this.audioContext.createMediaElementSource(this.audio).connect(t),t.connect(this.audioContext.destination)})):this.audioAnalyser}}var a=r(819),u=r(6265),c=r.n(u),f={name:"Welcome",head:{meta:[]},data(){return{appUrl:this.$config.app.url,frameCaller:new a.d,audioPlayer:(new s).enableAutoplay()}},computed:{playing(){return this.audioPlayer.playing},paused(){return!this.audioPlayer.playing&&!this.audioPlayer.stopped},stopped(){return!this.audioPlayer.playing&&this.audioPlayer.stopped}},mounted(){this.load()},methods:{load(){c().get(`${this.appUrl}/assets/sounds/manifest.json`).then((t=>{this.audioPlayer.add(...t.data.sounds.map((t=>`${this.appUrl}/assets/sounds/${t}`))).shuffle(),this.play()})).catch((()=>this.offCanvas()))},async play(){await this.audioPlayer.start()?this.playSucceed():this.playFailed()},playSucceed(){if((()=>{if(o.Xh.matched("ie"))return!1;if("ios"===o.Xh.getOs().toLowerCase()){const t=navigator.userAgent.match(/iphone os (\d+)_(\d+)/i);if(t){const e={major:parseInt(t[1]),minor:parseInt(t[2])};if(e.major>=13)return!1}}return!0})()){const t=this.audioPlayer.createAnalyser(),e=t.frequencyBinCount,r=new Uint8Array(e),n=document.getElementsByTagName("canvas")[0],i=n.getContext("2d"),o=n.width,s=n.height,a=Math.floor(o/e),u=()=>{t.getByteFrequencyData(r),i.clearRect(0,0,o,s);for(let t=0;t<e;t++){const e=r[t];i.fillStyle="#ffffff",i.fillRect(t*a,s-e,a-1,e)}},c=()=>this.frameCaller.register((()=>{u(),this.frameCaller.stopAll(),c()}));c()}else this.offCanvas()},playFailed(){this.offCanvas();const t=()=>{document.removeEventListener("click",t),this.play()};document.addEventListener("click",t)},offCanvas(){const t=document.getElementsByTagName("canvas")[0],e=t.getContext("2d"),r=t.width,n=t.height;e.clearRect(0,0,r,n);for(let i=0;i<60;i++)e.fillStyle="#ffffff",e.fillRect(4*i,0,3,n)},async onVinylClicked(){this.playing?(this.frameCaller.stopAll(),this.audioPlayer.pause()):(await this.audioPlayer.playCurrent(),this.playSucceed())},onVinylHandlerClicked(t){this.playing&&(t.target.classList.add("next"),o.S5.register((()=>{t.target.classList.remove("next"),this.audioPlayer.next()}),1e3))},onVinylPowerClicked(){this.stopped?this.play():(this.frameCaller.stopAll(),this.audioPlayer.stop(),this.offCanvas())}}},l=f,p=r(1001),d=(0,p.Z)(l,n,i,!1,null,"3d4728e2",null),h=d.exports},3013:function(t){t.exports="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView},3403:function(t,e,r){"use strict";var n,i,o,s=r(3013),a=r(9781),u=r(7854),c=r(614),f=r(111),l=r(2597),p=r(648),d=r(6330),h=r(8880),y=r(8052),m=r(7045),v=r(7976),g=r(9518),w=r(7674),E=r(5112),A=r(9711),b=r(9909),x=b.enforce,C=b.get,O=u.Int8Array,R=O&&O.prototype,_=u.Uint8ClampedArray,T=_&&_.prototype,S=O&&g(O),P=R&&g(R),U=Object.prototype,j=u.TypeError,N=E("toStringTag"),B=A("TYPED_ARRAY_TAG"),k="TypedArrayConstructor",D=s&&!!w&&"Opera"!==p(u.opera),L=!1,I={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8},F={BigInt64Array:8,BigUint64Array:8},q=function(t){if(!f(t))return!1;var e=p(t);return"DataView"===e||l(I,e)||l(F,e)},M=function(t){var e=g(t);if(f(e)){var r=C(e);return r&&l(r,k)?r[k]:M(e)}},V=function(t){if(!f(t))return!1;var e=p(t);return l(I,e)||l(F,e)},H=function(t){if(V(t))return t;throw j("Target is not a typed array")},J=function(t){if(c(t)&&(!w||v(S,t)))return t;throw j(d(t)+" is not a typed array constructor")},W=function(t,e,r,n){if(a){if(r)for(var i in I){var o=u[i];if(o&&l(o.prototype,t))try{delete o.prototype[t]}catch(s){try{o.prototype[t]=e}catch(c){}}}P[t]&&!r||y(P,t,r?e:D&&R[t]||e,n)}},z=function(t,e,r){var n,i;if(a){if(w){if(r)for(n in I)if(i=u[n],i&&l(i,t))try{delete i[t]}catch(o){}if(S[t]&&!r)return;try{return y(S,t,r?e:D&&S[t]||e)}catch(o){}}for(n in I)i=u[n],!i||i[t]&&!r||y(i,t,e)}};for(n in I)i=u[n],o=i&&i.prototype,o?x(o)[k]=i:D=!1;for(n in F)i=u[n],o=i&&i.prototype,o&&(x(o)[k]=i);if((!D||!c(S)||S===Function.prototype)&&(S=function(){throw j("Incorrect invocation")},D))for(n in I)u[n]&&w(u[n],S);if((!D||!P||P===U)&&(P=S.prototype,D))for(n in I)u[n]&&w(u[n].prototype,P);if(D&&g(T)!==P&&w(T,P),a&&!l(P,N))for(n in L=!0,m(P,N,{configurable:!0,get:function(){return f(this)?this[B]:void 0}}),I)u[n]&&h(u[n],B,n);t.exports={NATIVE_ARRAY_BUFFER_VIEWS:D,TYPED_ARRAY_TAG:L&&B,aTypedArray:H,aTypedArrayConstructor:J,exportTypedArrayMethod:W,exportTypedArrayStaticMethod:z,getTypedArrayConstructor:M,isView:q,isTypedArray:V,TypedArray:S,TypedArrayPrototype:P}},7745:function(t,e,r){var n=r(6244);t.exports=function(t,e){var r=0,i=n(e),o=new t(i);while(i>r)o[r]=e[r++];return o}},1843:function(t,e,r){var n=r(6244);t.exports=function(t,e){for(var r=n(t),i=new e(r),o=0;o<r;o++)i[o]=t[r-o-1];return i}},1572:function(t,e,r){var n=r(6244),i=r(9303),o=RangeError;t.exports=function(t,e,r,s){var a=n(t),u=i(r),c=u<0?a+u:u;if(c>=a||c<0)throw o("Incorrect index");for(var f=new e(a),l=0;l<a;l++)f[l]=l===c?s:t[l];return f}},8544:function(t,e,r){var n=r(7293);t.exports=!n((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},7045:function(t,e,r){var n=r(6339),i=r(3070);t.exports=function(t,e,r){return r.get&&n(r.get,e,{getter:!0}),r.set&&n(r.set,e,{setter:!0}),i.f(t,e,r)}},4067:function(t,e,r){var n=r(648);t.exports=function(t){var e=n(t);return"BigInt64Array"==e||"BigUint64Array"==e}},9518:function(t,e,r){var n=r(2597),i=r(614),o=r(7908),s=r(6200),a=r(8544),u=s("IE_PROTO"),c=Object,f=c.prototype;t.exports=a?c.getPrototypeOf:function(t){var e=o(t);if(n(e,u))return e[u];var r=e.constructor;return i(r)&&e instanceof r?r.prototype:e instanceof c?f:null}},4599:function(t,e,r){var n=r(7593),i=TypeError;t.exports=function(t){var e=n(t,"number");if("number"==typeof e)throw i("Can't convert number to bigint");return BigInt(e)}},1439:function(t,e,r){"use strict";var n=r(1843),i=r(3403),o=i.aTypedArray,s=i.exportTypedArrayMethod,a=i.getTypedArrayConstructor;s("toReversed",(function(){return n(o(this),a(this))}))},7585:function(t,e,r){"use strict";var n=r(3403),i=r(1702),o=r(9662),s=r(7745),a=n.aTypedArray,u=n.getTypedArrayConstructor,c=n.exportTypedArrayMethod,f=i(n.TypedArrayPrototype.sort);c("toSorted",(function(t){void 0!==t&&o(t);var e=a(this),r=s(u(e),e);return f(r,t)}))},5315:function(t,e,r){"use strict";var n=r(1572),i=r(3403),o=r(4067),s=r(9303),a=r(4599),u=i.aTypedArray,c=i.getTypedArrayConstructor,f=i.exportTypedArrayMethod,l=!!function(){try{new Int8Array(1)["with"](2,{valueOf:function(){throw 8}})}catch(t){return 8===t}}();f("with",{with:function(t,e){var r=u(this),i=s(t),f=o(r)?a(e):+e;return n(r,c(r),i,f)}}["with"],!l)},6265:function(t,e,r){t.exports=r(9435)},4951:function(t,e,r){"use strict";r(2801);var n=r(6642),i=r(6806),o=r(3833),s=r(4360),a=r(5047),u=r(5976),c=r(9896),f=r(8507),l=r(3303),p=r(6090),d=r(1874);t.exports=function(t){return new Promise((function(e,r){var h,y=t.data,m=t.headers,v=t.responseType;function g(){t.cancelToken&&t.cancelToken.unsubscribe(h),t.signal&&t.signal.removeEventListener("abort",h)}n.isFormData(y)&&n.isStandardBrowserEnv()&&delete m["Content-Type"];var w=new XMLHttpRequest;if(t.auth){var E=t.auth.username||"",A=t.auth.password?unescape(encodeURIComponent(t.auth.password)):"";m.Authorization="Basic "+btoa(E+":"+A)}var b=a(t.baseURL,t.url);function x(){if(w){var n="getAllResponseHeaders"in w?u(w.getAllResponseHeaders()):null,o=v&&"text"!==v&&"json"!==v?w.response:w.responseText,s={data:o,status:w.status,statusText:w.statusText,headers:n,config:t,request:w};i((function(t){e(t),g()}),(function(t){r(t),g()}),s),w=null}}if(w.open(t.method.toUpperCase(),s(b,t.params,t.paramsSerializer),!0),w.timeout=t.timeout,"onloadend"in w?w.onloadend=x:w.onreadystatechange=function(){w&&4===w.readyState&&(0!==w.status||w.responseURL&&0===w.responseURL.indexOf("file:"))&&setTimeout(x)},w.onabort=function(){w&&(r(new l("Request aborted",l.ECONNABORTED,t,w)),w=null)},w.onerror=function(){r(new l("Network Error",l.ERR_NETWORK,t,w,w)),w=null},w.ontimeout=function(){var e=t.timeout?"timeout of "+t.timeout+"ms exceeded":"timeout exceeded",n=t.transitional||f;t.timeoutErrorMessage&&(e=t.timeoutErrorMessage),r(new l(e,n.clarifyTimeoutError?l.ETIMEDOUT:l.ECONNABORTED,t,w)),w=null},n.isStandardBrowserEnv()){var C=(t.withCredentials||c(b))&&t.xsrfCookieName?o.read(t.xsrfCookieName):void 0;C&&(m[t.xsrfHeaderName]=C)}"setRequestHeader"in w&&n.forEach(m,(function(t,e){"undefined"===typeof y&&"content-type"===e.toLowerCase()?delete m[e]:w.setRequestHeader(e,t)})),n.isUndefined(t.withCredentials)||(w.withCredentials=!!t.withCredentials),v&&"json"!==v&&(w.responseType=t.responseType),"function"===typeof t.onDownloadProgress&&w.addEventListener("progress",t.onDownloadProgress),"function"===typeof t.onUploadProgress&&w.upload&&w.upload.addEventListener("progress",t.onUploadProgress),(t.cancelToken||t.signal)&&(h=function(t){w&&(r(!t||t&&t.type?new p:t),w.abort(),w=null)},t.cancelToken&&t.cancelToken.subscribe(h),t.signal&&(t.signal.aborted?h():t.signal.addEventListener("abort",h))),y||(y=null);var O=d(b);O&&-1===["http","https","file"].indexOf(O)?r(new l("Unsupported protocol "+O+":",l.ERR_BAD_REQUEST,t)):w.send(y)}))}},9435:function(t,e,r){"use strict";var n=r(6642),i=r(5955),o=r(7104),s=r(8186),a=r(7);function u(t){var e=new o(t),r=i(o.prototype.request,e);return n.extend(r,o.prototype,e),n.extend(r,e),r.create=function(e){return u(s(t,e))},r}var c=u(a);c.Axios=o,c.CanceledError=r(6090),c.CancelToken=r(6016),c.isCancel=r(5936),c.VERSION=r(4679).version,c.toFormData=r(8994),c.AxiosError=r(3303),c.Cancel=c.CanceledError,c.all=function(t){return Promise.all(t)},c.spread=r(5431),c.isAxiosError=r(786),t.exports=c,t.exports["default"]=c},6016:function(t,e,r){"use strict";r(7658);var n=r(6090);function i(t){if("function"!==typeof t)throw new TypeError("executor must be a function.");var e;this.promise=new Promise((function(t){e=t}));var r=this;this.promise.then((function(t){if(r._listeners){var e,n=r._listeners.length;for(e=0;e<n;e++)r._listeners[e](t);r._listeners=null}})),this.promise.then=function(t){var e,n=new Promise((function(t){r.subscribe(t),e=t})).then(t);return n.cancel=function(){r.unsubscribe(e)},n},t((function(t){r.reason||(r.reason=new n(t),e(r.reason))}))}i.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},i.prototype.subscribe=function(t){this.reason?t(this.reason):this._listeners?this._listeners.push(t):this._listeners=[t]},i.prototype.unsubscribe=function(t){if(this._listeners){var e=this._listeners.indexOf(t);-1!==e&&this._listeners.splice(e,1)}},i.source=function(){var t,e=new i((function(e){t=e}));return{token:e,cancel:t}},t.exports=i},6090:function(t,e,r){"use strict";var n=r(3303),i=r(6642);function o(t){n.call(this,null==t?"canceled":t,n.ERR_CANCELED),this.name="CanceledError"}i.inherits(o,n,{__CANCEL__:!0}),t.exports=o},5936:function(t){"use strict";t.exports=function(t){return!(!t||!t.__CANCEL__)}},7104:function(t,e,r){"use strict";r(7658);var n=r(6642),i=r(4360),o=r(999),s=r(6559),a=r(8186),u=r(5047),c=r(6298),f=c.validators;function l(t){this.defaults=t,this.interceptors={request:new o,response:new o}}l.prototype.request=function(t,e){"string"===typeof t?(e=e||{},e.url=t):e=t||{},e=a(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var r=e.transitional;void 0!==r&&c.assertOptions(r,{silentJSONParsing:f.transitional(f.boolean),forcedJSONParsing:f.transitional(f.boolean),clarifyTimeoutError:f.transitional(f.boolean)},!1);var n=[],i=!0;this.interceptors.request.forEach((function(t){"function"===typeof t.runWhen&&!1===t.runWhen(e)||(i=i&&t.synchronous,n.unshift(t.fulfilled,t.rejected))}));var o,u=[];if(this.interceptors.response.forEach((function(t){u.push(t.fulfilled,t.rejected)})),!i){var l=[s,void 0];Array.prototype.unshift.apply(l,n),l=l.concat(u),o=Promise.resolve(e);while(l.length)o=o.then(l.shift(),l.shift());return o}var p=e;while(n.length){var d=n.shift(),h=n.shift();try{p=d(p)}catch(y){h(y);break}}try{o=s(p)}catch(y){return Promise.reject(y)}while(u.length)o=o.then(u.shift(),u.shift());return o},l.prototype.getUri=function(t){t=a(this.defaults,t);var e=u(t.baseURL,t.url);return i(e,t.params,t.paramsSerializer)},n.forEach(["delete","get","head","options"],(function(t){l.prototype[t]=function(e,r){return this.request(a(r||{},{method:t,url:e,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function(t){function e(e){return function(r,n,i){return this.request(a(i||{},{method:t,headers:e?{"Content-Type":"multipart/form-data"}:{},url:r,data:n}))}}l.prototype[t]=e(),l.prototype[t+"Form"]=e(!0)})),t.exports=l},3303:function(t,e,r){"use strict";var n=r(6642);function i(t,e,r,n,i){Error.call(this),this.message=t,this.name="AxiosError",e&&(this.code=e),r&&(this.config=r),n&&(this.request=n),i&&(this.response=i)}n.inherits(i,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var o=i.prototype,s={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach((function(t){s[t]={value:t}})),Object.defineProperties(i,s),Object.defineProperty(o,"isAxiosError",{value:!0}),i.from=function(t,e,r,s,a,u){var c=Object.create(o);return n.toFlatObject(t,c,(function(t){return t!==Error.prototype})),i.call(c,t.message,e,r,s,a),c.name=t.name,u&&Object.assign(c,u),c},t.exports=i},999:function(t,e,r){"use strict";r(7658);var n=r(6642);function i(){this.handlers=[]}i.prototype.use=function(t,e,r){return this.handlers.push({fulfilled:t,rejected:e,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1},i.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},i.prototype.forEach=function(t){n.forEach(this.handlers,(function(e){null!==e&&t(e)}))},t.exports=i},5047:function(t,e,r){"use strict";var n=r(4777),i=r(2381);t.exports=function(t,e){return t&&!n(e)?i(t,e):e}},6559:function(t,e,r){"use strict";var n=r(6642),i=r(3756),o=r(5936),s=r(7),a=r(6090);function u(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new a}t.exports=function(t){u(t),t.headers=t.headers||{},t.data=i.call(t,t.data,t.headers,t.transformRequest),t.headers=n.merge(t.headers.common||{},t.headers[t.method]||{},t.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(e){delete t.headers[e]}));var e=t.adapter||s.adapter;return e(t).then((function(e){return u(t),e.data=i.call(t,e.data,e.headers,t.transformResponse),e}),(function(e){return o(e)||(u(t),e&&e.response&&(e.response.data=i.call(t,e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)}))}},8186:function(t,e,r){"use strict";var n=r(6642);t.exports=function(t,e){e=e||{};var r={};function i(t,e){return n.isPlainObject(t)&&n.isPlainObject(e)?n.merge(t,e):n.isPlainObject(e)?n.merge({},e):n.isArray(e)?e.slice():e}function o(r){return n.isUndefined(e[r])?n.isUndefined(t[r])?void 0:i(void 0,t[r]):i(t[r],e[r])}function s(t){if(!n.isUndefined(e[t]))return i(void 0,e[t])}function a(r){return n.isUndefined(e[r])?n.isUndefined(t[r])?void 0:i(void 0,t[r]):i(void 0,e[r])}function u(r){return r in e?i(t[r],e[r]):r in t?i(void 0,t[r]):void 0}var c={url:s,method:s,data:s,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:u};return n.forEach(Object.keys(t).concat(Object.keys(e)),(function(t){var e=c[t]||o,i=e(t);n.isUndefined(i)&&e!==u||(r[t]=i)})),r}},6806:function(t,e,r){"use strict";var n=r(3303);t.exports=function(t,e,r){var i=r.config.validateStatus;r.status&&i&&!i(r.status)?e(new n("Request failed with status code "+r.status,[n.ERR_BAD_REQUEST,n.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r)):t(r)}},3756:function(t,e,r){"use strict";var n=r(6642),i=r(7);t.exports=function(t,e,r){var o=this||i;return n.forEach(r,(function(r){t=r.call(o,t,e)})),t}},7:function(t,e,r){"use strict";var n=r(6642),i=r(1446),o=r(3303),s=r(8507),a=r(8994),u={"Content-Type":"application/x-www-form-urlencoded"};function c(t,e){!n.isUndefined(t)&&n.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}function f(){var t;return("undefined"!==typeof XMLHttpRequest||"undefined"!==typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(t=r(4951)),t}function l(t,e,r){if(n.isString(t))try{return(e||JSON.parse)(t),n.trim(t)}catch(i){if("SyntaxError"!==i.name)throw i}return(r||JSON.stringify)(t)}var p={transitional:s,adapter:f(),transformRequest:[function(t,e){if(i(e,"Accept"),i(e,"Content-Type"),n.isFormData(t)||n.isArrayBuffer(t)||n.isBuffer(t)||n.isStream(t)||n.isFile(t)||n.isBlob(t))return t;if(n.isArrayBufferView(t))return t.buffer;if(n.isURLSearchParams(t))return c(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString();var r,o=n.isObject(t),s=e&&e["Content-Type"];if((r=n.isFileList(t))||o&&"multipart/form-data"===s){var u=this.env&&this.env.FormData;return a(r?{"files[]":t}:t,u&&new u)}return o||"application/json"===s?(c(e,"application/json"),l(t)):t}],transformResponse:[function(t){var e=this.transitional||p.transitional,r=e&&e.silentJSONParsing,i=e&&e.forcedJSONParsing,s=!r&&"json"===this.responseType;if(s||i&&n.isString(t)&&t.length)try{return JSON.parse(t)}catch(a){if(s){if("SyntaxError"===a.name)throw o.from(a,o.ERR_BAD_RESPONSE,this,null,this.response);throw a}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:r(1051)},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(t){p.headers[t]={}})),n.forEach(["post","put","patch"],(function(t){p.headers[t]=n.merge(u)})),t.exports=p},8507:function(t){"use strict";t.exports={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1}},4679:function(t){t.exports={version:"0.27.2"}},5955:function(t){"use strict";t.exports=function(t,e){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return t.apply(e,r)}}},4360:function(t,e,r){"use strict";r(7658);var n=r(6642);function i(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}t.exports=function(t,e,r){if(!e)return t;var o;if(r)o=r(e);else if(n.isURLSearchParams(e))o=e.toString();else{var s=[];n.forEach(e,(function(t,e){null!==t&&"undefined"!==typeof t&&(n.isArray(t)?e+="[]":t=[t],n.forEach(t,(function(t){n.isDate(t)?t=t.toISOString():n.isObject(t)&&(t=JSON.stringify(t)),s.push(i(e)+"="+i(t))})))})),o=s.join("&")}if(o){var a=t.indexOf("#");-1!==a&&(t=t.slice(0,a)),t+=(-1===t.indexOf("?")?"?":"&")+o}return t}},2381:function(t){"use strict";t.exports=function(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}},3833:function(t,e,r){"use strict";r(7658);var n=r(6642);t.exports=n.isStandardBrowserEnv()?function(){return{write:function(t,e,r,i,o,s){var a=[];a.push(t+"="+encodeURIComponent(e)),n.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),n.isString(i)&&a.push("path="+i),n.isString(o)&&a.push("domain="+o),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},4777:function(t){"use strict";t.exports=function(t){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}},786:function(t,e,r){"use strict";var n=r(6642);t.exports=function(t){return n.isObject(t)&&!0===t.isAxiosError}},9896:function(t,e,r){"use strict";var n=r(6642);t.exports=n.isStandardBrowserEnv()?function(){var t,e=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function i(t){var n=t;return e&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return t=i(window.location.href),function(e){var r=n.isString(e)?i(e):e;return r.protocol===t.protocol&&r.host===t.host}}():function(){return function(){return!0}}()},1446:function(t,e,r){"use strict";var n=r(6642);t.exports=function(t,e){n.forEach(t,(function(r,n){n!==e&&n.toUpperCase()===e.toUpperCase()&&(t[e]=r,delete t[n])}))}},1051:function(t){t.exports=null},5976:function(t,e,r){"use strict";var n=r(6642),i=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];t.exports=function(t){var e,r,o,s={};return t?(n.forEach(t.split("\n"),(function(t){if(o=t.indexOf(":"),e=n.trim(t.substr(0,o)).toLowerCase(),r=n.trim(t.substr(o+1)),e){if(s[e]&&i.indexOf(e)>=0)return;s[e]="set-cookie"===e?(s[e]?s[e]:[]).concat([r]):s[e]?s[e]+", "+r:r}})),s):s}},1874:function(t){"use strict";t.exports=function(t){var e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(t);return e&&e[1]||""}},5431:function(t){"use strict";t.exports=function(t){return function(e){return t.apply(null,e)}}},8994:function(t,e,r){"use strict";r(7658);var n=r(6642);function i(t,e){e=e||new FormData;var r=[];function i(t){return null===t?"":n.isDate(t)?t.toISOString():n.isArrayBuffer(t)||n.isTypedArray(t)?"function"===typeof Blob?new Blob([t]):Buffer.from(t):t}function o(t,s){if(n.isPlainObject(t)||n.isArray(t)){if(-1!==r.indexOf(t))throw Error("Circular reference detected in "+s);r.push(t),n.forEach(t,(function(t,r){if(!n.isUndefined(t)){var a,u=s?s+"."+r:r;if(t&&!s&&"object"===typeof t)if(n.endsWith(r,"{}"))t=JSON.stringify(t);else if(n.endsWith(r,"[]")&&(a=n.toArray(t)))return void a.forEach((function(t){!n.isUndefined(t)&&e.append(u,i(t))}));o(t,u)}})),r.pop()}else e.append(s,i(t))}return o(t),e}t.exports=i},6298:function(t,e,r){"use strict";var n=r(4679).version,i=r(3303),o={};["object","boolean","number","function","string","symbol"].forEach((function(t,e){o[t]=function(r){return typeof r===t||"a"+(e<1?"n ":" ")+t}}));var s={};function a(t,e,r){if("object"!==typeof t)throw new i("options must be an object",i.ERR_BAD_OPTION_VALUE);var n=Object.keys(t),o=n.length;while(o-- >0){var s=n[o],a=e[s];if(a){var u=t[s],c=void 0===u||a(u,s,t);if(!0!==c)throw new i("option "+s+" must be "+c,i.ERR_BAD_OPTION_VALUE)}else if(!0!==r)throw new i("Unknown option "+s,i.ERR_BAD_OPTION)}}o.transitional=function(t,e,r){function o(t,e){return"[Axios v"+n+"] Transitional option '"+t+"'"+e+(r?". "+r:"")}return function(r,n,a){if(!1===t)throw new i(o(n," has been removed"+(e?" in "+e:"")),i.ERR_DEPRECATED);return e&&!s[n]&&(s[n]=!0,console.warn(o(n," has been deprecated since v"+e+" and will be removed in the near future"))),!t||t(r,n,a)}},t.exports={assertOptions:a,validators:o}},6642:function(t,e,r){"use strict";r(1439),r(7585),r(5315);var n=r(5955),i=Object.prototype.toString,o=function(t){return function(e){var r=i.call(e);return t[r]||(t[r]=r.slice(8,-1).toLowerCase())}}(Object.create(null));function s(t){return t=t.toLowerCase(),function(e){return o(e)===t}}function a(t){return Array.isArray(t)}function u(t){return"undefined"===typeof t}function c(t){return null!==t&&!u(t)&&null!==t.constructor&&!u(t.constructor)&&"function"===typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}var f=s("ArrayBuffer");function l(t){var e;return e="undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&f(t.buffer),e}function p(t){return"string"===typeof t}function d(t){return"number"===typeof t}function h(t){return null!==t&&"object"===typeof t}function y(t){if("object"!==o(t))return!1;var e=Object.getPrototypeOf(t);return null===e||e===Object.prototype}var m=s("Date"),v=s("File"),g=s("Blob"),w=s("FileList");function E(t){return"[object Function]"===i.call(t)}function A(t){return h(t)&&E(t.pipe)}function b(t){var e="[object FormData]";return t&&("function"===typeof FormData&&t instanceof FormData||i.call(t)===e||E(t.toString)&&t.toString()===e)}var x=s("URLSearchParams");function C(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function O(){return("undefined"===typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!==typeof window&&"undefined"!==typeof document)}function R(t,e){if(null!==t&&"undefined"!==typeof t)if("object"!==typeof t&&(t=[t]),a(t))for(var r=0,n=t.length;r<n;r++)e.call(null,t[r],r,t);else for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.call(null,t[i],i,t)}function _(){var t={};function e(e,r){y(t[r])&&y(e)?t[r]=_(t[r],e):y(e)?t[r]=_({},e):a(e)?t[r]=e.slice():t[r]=e}for(var r=0,n=arguments.length;r<n;r++)R(arguments[r],e);return t}function T(t,e,r){return R(e,(function(e,i){t[i]=r&&"function"===typeof e?n(e,r):e})),t}function S(t){return 65279===t.charCodeAt(0)&&(t=t.slice(1)),t}function P(t,e,r,n){t.prototype=Object.create(e.prototype,n),t.prototype.constructor=t,r&&Object.assign(t.prototype,r)}function U(t,e,r){var n,i,o,s={};e=e||{};do{n=Object.getOwnPropertyNames(t),i=n.length;while(i-- >0)o=n[i],s[o]||(e[o]=t[o],s[o]=!0);t=Object.getPrototypeOf(t)}while(t&&(!r||r(t,e))&&t!==Object.prototype);return e}function j(t,e,r){t=String(t),(void 0===r||r>t.length)&&(r=t.length),r-=e.length;var n=t.indexOf(e,r);return-1!==n&&n===r}function N(t){if(!t)return null;var e=t.length;if(u(e))return null;var r=new Array(e);while(e-- >0)r[e]=t[e];return r}var B=function(t){return function(e){return t&&e instanceof t}}("undefined"!==typeof Uint8Array&&Object.getPrototypeOf(Uint8Array));t.exports={isArray:a,isArrayBuffer:f,isBuffer:c,isFormData:b,isArrayBufferView:l,isString:p,isNumber:d,isObject:h,isPlainObject:y,isUndefined:u,isDate:m,isFile:v,isBlob:g,isFunction:E,isStream:A,isURLSearchParams:x,isStandardBrowserEnv:O,forEach:R,merge:_,extend:T,trim:C,stripBOM:S,inherits:P,toFlatObject:U,kindOf:o,kindOfTest:s,endsWith:j,toArray:N,isTypedArray:B,isFileList:w}}}]);
//# sourceMappingURL=view-welcome.2f7a4fad.js.map