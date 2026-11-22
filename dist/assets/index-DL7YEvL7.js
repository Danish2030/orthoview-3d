(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function av(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var qm={exports:{}},Wl={},Zm={exports:{}},Ke={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qo=Symbol.for("react.element"),lv=Symbol.for("react.portal"),cv=Symbol.for("react.fragment"),uv=Symbol.for("react.strict_mode"),dv=Symbol.for("react.profiler"),hv=Symbol.for("react.provider"),fv=Symbol.for("react.context"),pv=Symbol.for("react.forward_ref"),mv=Symbol.for("react.suspense"),gv=Symbol.for("react.memo"),xv=Symbol.for("react.lazy"),ef=Symbol.iterator;function vv(t){return t===null||typeof t!="object"?null:(t=ef&&t[ef]||t["@@iterator"],typeof t=="function"?t:null)}var Km={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Jm=Object.assign,Qm={};function Bs(t,e,n){this.props=t,this.context=e,this.refs=Qm,this.updater=n||Km}Bs.prototype.isReactComponent={};Bs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Bs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function e0(){}e0.prototype=Bs.prototype;function zd(t,e,n){this.props=t,this.context=e,this.refs=Qm,this.updater=n||Km}var Bd=zd.prototype=new e0;Bd.constructor=zd;Jm(Bd,Bs.prototype);Bd.isPureReactComponent=!0;var tf=Array.isArray,t0=Object.prototype.hasOwnProperty,Hd={current:null},n0={key:!0,ref:!0,__self:!0,__source:!0};function i0(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)t0.call(e,i)&&!n0.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Qo,type:t,key:s,ref:o,props:r,_owner:Hd.current}}function _v(t,e){return{$$typeof:Qo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Vd(t){return typeof t=="object"&&t!==null&&t.$$typeof===Qo}function yv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var nf=/\/+/g;function vc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?yv(""+t.key):e.toString(36)}function nl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Qo:case lv:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+vc(o,0):i,tf(r)?(n="",t!=null&&(n=t.replace(nf,"$&/")+"/"),nl(r,e,n,"",function(c){return c})):r!=null&&(Vd(r)&&(r=_v(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(nf,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",tf(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+vc(s,a);o+=nl(s,e,n,l,r)}else if(l=vv(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+vc(s,a++),o+=nl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function aa(t,e,n){if(t==null)return t;var i=[],r=0;return nl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function Sv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var tn={current:null},il={transition:null},Mv={ReactCurrentDispatcher:tn,ReactCurrentBatchConfig:il,ReactCurrentOwner:Hd};function r0(){throw Error("act(...) is not supported in production builds of React.")}Ke.Children={map:aa,forEach:function(t,e,n){aa(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return aa(t,function(){e++}),e},toArray:function(t){return aa(t,function(e){return e})||[]},only:function(t){if(!Vd(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ke.Component=Bs;Ke.Fragment=cv;Ke.Profiler=dv;Ke.PureComponent=zd;Ke.StrictMode=uv;Ke.Suspense=mv;Ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Mv;Ke.act=r0;Ke.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Jm({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Hd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)t0.call(e,l)&&!n0.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Qo,type:t.type,key:r,ref:s,props:i,_owner:o}};Ke.createContext=function(t){return t={$$typeof:fv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:hv,_context:t},t.Consumer=t};Ke.createElement=i0;Ke.createFactory=function(t){var e=i0.bind(null,t);return e.type=t,e};Ke.createRef=function(){return{current:null}};Ke.forwardRef=function(t){return{$$typeof:pv,render:t}};Ke.isValidElement=Vd;Ke.lazy=function(t){return{$$typeof:xv,_payload:{_status:-1,_result:t},_init:Sv}};Ke.memo=function(t,e){return{$$typeof:gv,type:t,compare:e===void 0?null:e}};Ke.startTransition=function(t){var e=il.transition;il.transition={};try{t()}finally{il.transition=e}};Ke.unstable_act=r0;Ke.useCallback=function(t,e){return tn.current.useCallback(t,e)};Ke.useContext=function(t){return tn.current.useContext(t)};Ke.useDebugValue=function(){};Ke.useDeferredValue=function(t){return tn.current.useDeferredValue(t)};Ke.useEffect=function(t,e){return tn.current.useEffect(t,e)};Ke.useId=function(){return tn.current.useId()};Ke.useImperativeHandle=function(t,e,n){return tn.current.useImperativeHandle(t,e,n)};Ke.useInsertionEffect=function(t,e){return tn.current.useInsertionEffect(t,e)};Ke.useLayoutEffect=function(t,e){return tn.current.useLayoutEffect(t,e)};Ke.useMemo=function(t,e){return tn.current.useMemo(t,e)};Ke.useReducer=function(t,e,n){return tn.current.useReducer(t,e,n)};Ke.useRef=function(t){return tn.current.useRef(t)};Ke.useState=function(t){return tn.current.useState(t)};Ke.useSyncExternalStore=function(t,e,n){return tn.current.useSyncExternalStore(t,e,n)};Ke.useTransition=function(){return tn.current.useTransition()};Ke.version="18.3.1";Zm.exports=Ke;var Ze=Zm.exports;const Ev=av(Ze);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wv=Ze,bv=Symbol.for("react.element"),Tv=Symbol.for("react.fragment"),Av=Object.prototype.hasOwnProperty,Cv=wv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Rv={key:!0,ref:!0,__self:!0,__source:!0};function s0(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)Av.call(e,i)&&!Rv.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:bv,type:t,key:s,ref:o,props:r,_owner:Cv.current}}Wl.Fragment=Tv;Wl.jsx=s0;Wl.jsxs=s0;qm.exports=Wl;var g=qm.exports,Pu={},o0={exports:{}},vn={},a0={exports:{}},l0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(F,G){var C=F.length;F.push(G);e:for(;0<C;){var R=C-1>>>1,j=F[R];if(0<r(j,G))F[R]=G,F[C]=j,C=R;else break e}}function n(F){return F.length===0?null:F[0]}function i(F){if(F.length===0)return null;var G=F[0],C=F.pop();if(C!==G){F[0]=C;e:for(var R=0,j=F.length,z=j>>>1;R<z;){var Y=2*(R+1)-1,Q=F[Y],ie=Y+1,J=F[ie];if(0>r(Q,C))ie<j&&0>r(J,Q)?(F[R]=J,F[ie]=C,R=ie):(F[R]=Q,F[Y]=C,R=Y);else if(ie<j&&0>r(J,C))F[R]=J,F[ie]=C,R=ie;else break e}}return G}function r(F,G){var C=F.sortIndex-G.sortIndex;return C!==0?C:F.id-G.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],u=1,f=null,h=3,p=!1,v=!1,y=!1,m=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(F){for(var G=n(c);G!==null;){if(G.callback===null)i(c);else if(G.startTime<=F)i(c),G.sortIndex=G.expirationTime,e(l,G);else break;G=n(c)}}function S(F){if(y=!1,x(F),!v)if(n(l)!==null)v=!0,$(P);else{var G=n(c);G!==null&&ne(S,G.startTime-F)}}function P(F,G){v=!1,y&&(y=!1,d(O),O=-1),p=!0;var C=h;try{for(x(G),f=n(l);f!==null&&(!(f.expirationTime>G)||F&&!B());){var R=f.callback;if(typeof R=="function"){f.callback=null,h=f.priorityLevel;var j=R(f.expirationTime<=G);G=t.unstable_now(),typeof j=="function"?f.callback=j:f===n(l)&&i(l),x(G)}else i(l);f=n(l)}if(f!==null)var z=!0;else{var Y=n(c);Y!==null&&ne(S,Y.startTime-G),z=!1}return z}finally{f=null,h=C,p=!1}}var w=!1,T=null,O=-1,E=5,b=-1;function B(){return!(t.unstable_now()-b<E)}function q(){if(T!==null){var F=t.unstable_now();b=F;var G=!0;try{G=T(!0,F)}finally{G?re():(w=!1,T=null)}}else w=!1}var re;if(typeof _=="function")re=function(){_(q)};else if(typeof MessageChannel<"u"){var U=new MessageChannel,V=U.port2;U.port1.onmessage=q,re=function(){V.postMessage(null)}}else re=function(){m(q,0)};function $(F){T=F,w||(w=!0,re())}function ne(F,G){O=m(function(){F(t.unstable_now())},G)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(F){F.callback=null},t.unstable_continueExecution=function(){v||p||(v=!0,$(P))},t.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<F?Math.floor(1e3/F):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(F){switch(h){case 1:case 2:case 3:var G=3;break;default:G=h}var C=h;h=G;try{return F()}finally{h=C}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(F,G){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var C=h;h=F;try{return G()}finally{h=C}},t.unstable_scheduleCallback=function(F,G,C){var R=t.unstable_now();switch(typeof C=="object"&&C!==null?(C=C.delay,C=typeof C=="number"&&0<C?R+C:R):C=R,F){case 1:var j=-1;break;case 2:j=250;break;case 5:j=1073741823;break;case 4:j=1e4;break;default:j=5e3}return j=C+j,F={id:u++,callback:G,priorityLevel:F,startTime:C,expirationTime:j,sortIndex:-1},C>R?(F.sortIndex=C,e(c,F),n(l)===null&&F===n(c)&&(y?(d(O),O=-1):y=!0,ne(S,C-R))):(F.sortIndex=j,e(l,F),v||p||(v=!0,$(P))),F},t.unstable_shouldYield=B,t.unstable_wrapCallback=function(F){var G=h;return function(){var C=h;h=G;try{return F.apply(this,arguments)}finally{h=C}}}})(l0);a0.exports=l0;var Pv=a0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lv=Ze,xn=Pv;function pe(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var c0=new Set,Ro={};function Nr(t,e){Cs(t,e),Cs(t+"Capture",e)}function Cs(t,e){for(Ro[t]=e,t=0;t<e.length;t++)c0.add(e[t])}var xi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Lu=Object.prototype.hasOwnProperty,Nv=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,rf={},sf={};function Dv(t){return Lu.call(sf,t)?!0:Lu.call(rf,t)?!1:Nv.test(t)?sf[t]=!0:(rf[t]=!0,!1)}function Iv(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Uv(t,e,n,i){if(e===null||typeof e>"u"||Iv(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function nn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Bt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Bt[t]=new nn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Bt[e]=new nn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Bt[t]=new nn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Bt[t]=new nn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Bt[t]=new nn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Bt[t]=new nn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Bt[t]=new nn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Bt[t]=new nn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Bt[t]=new nn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Gd=/[\-:]([a-z])/g;function jd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Gd,jd);Bt[e]=new nn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Gd,jd);Bt[e]=new nn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Gd,jd);Bt[e]=new nn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Bt[t]=new nn(t,1,!1,t.toLowerCase(),null,!1,!1)});Bt.xlinkHref=new nn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Bt[t]=new nn(t,1,!1,t.toLowerCase(),null,!0,!0)});function Wd(t,e,n,i){var r=Bt.hasOwnProperty(e)?Bt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Uv(e,n,r,i)&&(n=null),i||r===null?Dv(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Mi=Lv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,la=Symbol.for("react.element"),is=Symbol.for("react.portal"),rs=Symbol.for("react.fragment"),Xd=Symbol.for("react.strict_mode"),Nu=Symbol.for("react.profiler"),u0=Symbol.for("react.provider"),d0=Symbol.for("react.context"),Yd=Symbol.for("react.forward_ref"),Du=Symbol.for("react.suspense"),Iu=Symbol.for("react.suspense_list"),$d=Symbol.for("react.memo"),Ri=Symbol.for("react.lazy"),h0=Symbol.for("react.offscreen"),of=Symbol.iterator;function Ys(t){return t===null||typeof t!="object"?null:(t=of&&t[of]||t["@@iterator"],typeof t=="function"?t:null)}var mt=Object.assign,_c;function so(t){if(_c===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);_c=e&&e[1]||""}return`
`+_c+t}var yc=!1;function Sc(t,e){if(!t||yc)return"";yc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{yc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?so(t):""}function kv(t){switch(t.tag){case 5:return so(t.type);case 16:return so("Lazy");case 13:return so("Suspense");case 19:return so("SuspenseList");case 0:case 2:case 15:return t=Sc(t.type,!1),t;case 11:return t=Sc(t.type.render,!1),t;case 1:return t=Sc(t.type,!0),t;default:return""}}function Uu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case rs:return"Fragment";case is:return"Portal";case Nu:return"Profiler";case Xd:return"StrictMode";case Du:return"Suspense";case Iu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case d0:return(t.displayName||"Context")+".Consumer";case u0:return(t._context.displayName||"Context")+".Provider";case Yd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case $d:return e=t.displayName||null,e!==null?e:Uu(t.type)||"Memo";case Ri:e=t._payload,t=t._init;try{return Uu(t(e))}catch{}}return null}function Ov(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Uu(e);case 8:return e===Xd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function qi(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function f0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Fv(t){var e=f0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ca(t){t._valueTracker||(t._valueTracker=Fv(t))}function p0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=f0(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function ml(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function ku(t,e){var n=e.checked;return mt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function af(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=qi(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function m0(t,e){e=e.checked,e!=null&&Wd(t,"checked",e,!1)}function Ou(t,e){m0(t,e);var n=qi(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Fu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Fu(t,e.type,qi(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function lf(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Fu(t,e,n){(e!=="number"||ml(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var oo=Array.isArray;function _s(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+qi(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function zu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(pe(91));return mt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function cf(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(pe(92));if(oo(n)){if(1<n.length)throw Error(pe(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:qi(n)}}function g0(t,e){var n=qi(e.value),i=qi(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function uf(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function x0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Bu(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?x0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ua,v0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(ua=ua||document.createElement("div"),ua.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ua.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Po(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var ho={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},zv=["Webkit","ms","Moz","O"];Object.keys(ho).forEach(function(t){zv.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),ho[e]=ho[t]})});function _0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||ho.hasOwnProperty(t)&&ho[t]?(""+e).trim():e+"px"}function y0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=_0(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var Bv=mt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Hu(t,e){if(e){if(Bv[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(pe(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(pe(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(pe(61))}if(e.style!=null&&typeof e.style!="object")throw Error(pe(62))}}function Vu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Gu=null;function qd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ju=null,ys=null,Ss=null;function df(t){if(t=na(t)){if(typeof ju!="function")throw Error(pe(280));var e=t.stateNode;e&&(e=Zl(e),ju(t.stateNode,t.type,e))}}function S0(t){ys?Ss?Ss.push(t):Ss=[t]:ys=t}function M0(){if(ys){var t=ys,e=Ss;if(Ss=ys=null,df(t),e)for(t=0;t<e.length;t++)df(e[t])}}function E0(t,e){return t(e)}function w0(){}var Mc=!1;function b0(t,e,n){if(Mc)return t(e,n);Mc=!0;try{return E0(t,e,n)}finally{Mc=!1,(ys!==null||Ss!==null)&&(w0(),M0())}}function Lo(t,e){var n=t.stateNode;if(n===null)return null;var i=Zl(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(pe(231,e,typeof n));return n}var Wu=!1;if(xi)try{var $s={};Object.defineProperty($s,"passive",{get:function(){Wu=!0}}),window.addEventListener("test",$s,$s),window.removeEventListener("test",$s,$s)}catch{Wu=!1}function Hv(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var fo=!1,gl=null,xl=!1,Xu=null,Vv={onError:function(t){fo=!0,gl=t}};function Gv(t,e,n,i,r,s,o,a,l){fo=!1,gl=null,Hv.apply(Vv,arguments)}function jv(t,e,n,i,r,s,o,a,l){if(Gv.apply(this,arguments),fo){if(fo){var c=gl;fo=!1,gl=null}else throw Error(pe(198));xl||(xl=!0,Xu=c)}}function Dr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function T0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function hf(t){if(Dr(t)!==t)throw Error(pe(188))}function Wv(t){var e=t.alternate;if(!e){if(e=Dr(t),e===null)throw Error(pe(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return hf(r),t;if(s===i)return hf(r),e;s=s.sibling}throw Error(pe(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(pe(189))}}if(n.alternate!==i)throw Error(pe(190))}if(n.tag!==3)throw Error(pe(188));return n.stateNode.current===n?t:e}function A0(t){return t=Wv(t),t!==null?C0(t):null}function C0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=C0(t);if(e!==null)return e;t=t.sibling}return null}var R0=xn.unstable_scheduleCallback,ff=xn.unstable_cancelCallback,Xv=xn.unstable_shouldYield,Yv=xn.unstable_requestPaint,St=xn.unstable_now,$v=xn.unstable_getCurrentPriorityLevel,Zd=xn.unstable_ImmediatePriority,P0=xn.unstable_UserBlockingPriority,vl=xn.unstable_NormalPriority,qv=xn.unstable_LowPriority,L0=xn.unstable_IdlePriority,Xl=null,ei=null;function Zv(t){if(ei&&typeof ei.onCommitFiberRoot=="function")try{ei.onCommitFiberRoot(Xl,t,void 0,(t.current.flags&128)===128)}catch{}}var Gn=Math.clz32?Math.clz32:Qv,Kv=Math.log,Jv=Math.LN2;function Qv(t){return t>>>=0,t===0?32:31-(Kv(t)/Jv|0)|0}var da=64,ha=4194304;function ao(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function _l(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=ao(a):(s&=o,s!==0&&(i=ao(s)))}else o=n&~r,o!==0?i=ao(o):s!==0&&(i=ao(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Gn(e),r=1<<n,i|=t[n],e&=~r;return i}function e_(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function t_(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Gn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=e_(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Yu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function N0(){var t=da;return da<<=1,!(da&4194240)&&(da=64),t}function Ec(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ea(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Gn(e),t[e]=n}function n_(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Gn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Kd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Gn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var it=0;function D0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var I0,Jd,U0,k0,O0,$u=!1,fa=[],Fi=null,zi=null,Bi=null,No=new Map,Do=new Map,Ni=[],i_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function pf(t,e){switch(t){case"focusin":case"focusout":Fi=null;break;case"dragenter":case"dragleave":zi=null;break;case"mouseover":case"mouseout":Bi=null;break;case"pointerover":case"pointerout":No.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Do.delete(e.pointerId)}}function qs(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=na(e),e!==null&&Jd(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function r_(t,e,n,i,r){switch(e){case"focusin":return Fi=qs(Fi,t,e,n,i,r),!0;case"dragenter":return zi=qs(zi,t,e,n,i,r),!0;case"mouseover":return Bi=qs(Bi,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return No.set(s,qs(No.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Do.set(s,qs(Do.get(s)||null,t,e,n,i,r)),!0}return!1}function F0(t){var e=fr(t.target);if(e!==null){var n=Dr(e);if(n!==null){if(e=n.tag,e===13){if(e=T0(n),e!==null){t.blockedOn=e,O0(t.priority,function(){U0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function rl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=qu(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Gu=i,n.target.dispatchEvent(i),Gu=null}else return e=na(n),e!==null&&Jd(e),t.blockedOn=n,!1;e.shift()}return!0}function mf(t,e,n){rl(t)&&n.delete(e)}function s_(){$u=!1,Fi!==null&&rl(Fi)&&(Fi=null),zi!==null&&rl(zi)&&(zi=null),Bi!==null&&rl(Bi)&&(Bi=null),No.forEach(mf),Do.forEach(mf)}function Zs(t,e){t.blockedOn===e&&(t.blockedOn=null,$u||($u=!0,xn.unstable_scheduleCallback(xn.unstable_NormalPriority,s_)))}function Io(t){function e(r){return Zs(r,t)}if(0<fa.length){Zs(fa[0],t);for(var n=1;n<fa.length;n++){var i=fa[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Fi!==null&&Zs(Fi,t),zi!==null&&Zs(zi,t),Bi!==null&&Zs(Bi,t),No.forEach(e),Do.forEach(e),n=0;n<Ni.length;n++)i=Ni[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Ni.length&&(n=Ni[0],n.blockedOn===null);)F0(n),n.blockedOn===null&&Ni.shift()}var Ms=Mi.ReactCurrentBatchConfig,yl=!0;function o_(t,e,n,i){var r=it,s=Ms.transition;Ms.transition=null;try{it=1,Qd(t,e,n,i)}finally{it=r,Ms.transition=s}}function a_(t,e,n,i){var r=it,s=Ms.transition;Ms.transition=null;try{it=4,Qd(t,e,n,i)}finally{it=r,Ms.transition=s}}function Qd(t,e,n,i){if(yl){var r=qu(t,e,n,i);if(r===null)Dc(t,e,i,Sl,n),pf(t,i);else if(r_(r,t,e,n,i))i.stopPropagation();else if(pf(t,i),e&4&&-1<i_.indexOf(t)){for(;r!==null;){var s=na(r);if(s!==null&&I0(s),s=qu(t,e,n,i),s===null&&Dc(t,e,i,Sl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Dc(t,e,i,null,n)}}var Sl=null;function qu(t,e,n,i){if(Sl=null,t=qd(i),t=fr(t),t!==null)if(e=Dr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=T0(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Sl=t,null}function z0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch($v()){case Zd:return 1;case P0:return 4;case vl:case qv:return 16;case L0:return 536870912;default:return 16}default:return 16}}var Ii=null,eh=null,sl=null;function B0(){if(sl)return sl;var t,e=eh,n=e.length,i,r="value"in Ii?Ii.value:Ii.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return sl=r.slice(t,1<i?1-i:void 0)}function ol(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function pa(){return!0}function gf(){return!1}function _n(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?pa:gf,this.isPropagationStopped=gf,this}return mt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=pa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=pa)},persist:function(){},isPersistent:pa}),e}var Hs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},th=_n(Hs),ta=mt({},Hs,{view:0,detail:0}),l_=_n(ta),wc,bc,Ks,Yl=mt({},ta,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ks&&(Ks&&t.type==="mousemove"?(wc=t.screenX-Ks.screenX,bc=t.screenY-Ks.screenY):bc=wc=0,Ks=t),wc)},movementY:function(t){return"movementY"in t?t.movementY:bc}}),xf=_n(Yl),c_=mt({},Yl,{dataTransfer:0}),u_=_n(c_),d_=mt({},ta,{relatedTarget:0}),Tc=_n(d_),h_=mt({},Hs,{animationName:0,elapsedTime:0,pseudoElement:0}),f_=_n(h_),p_=mt({},Hs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),m_=_n(p_),g_=mt({},Hs,{data:0}),vf=_n(g_),x_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},v_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},__={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function y_(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=__[t])?!!e[t]:!1}function nh(){return y_}var S_=mt({},ta,{key:function(t){if(t.key){var e=x_[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ol(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?v_[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nh,charCode:function(t){return t.type==="keypress"?ol(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ol(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),M_=_n(S_),E_=mt({},Yl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),_f=_n(E_),w_=mt({},ta,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nh}),b_=_n(w_),T_=mt({},Hs,{propertyName:0,elapsedTime:0,pseudoElement:0}),A_=_n(T_),C_=mt({},Yl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),R_=_n(C_),P_=[9,13,27,32],ih=xi&&"CompositionEvent"in window,po=null;xi&&"documentMode"in document&&(po=document.documentMode);var L_=xi&&"TextEvent"in window&&!po,H0=xi&&(!ih||po&&8<po&&11>=po),yf=" ",Sf=!1;function V0(t,e){switch(t){case"keyup":return P_.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function G0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ss=!1;function N_(t,e){switch(t){case"compositionend":return G0(e);case"keypress":return e.which!==32?null:(Sf=!0,yf);case"textInput":return t=e.data,t===yf&&Sf?null:t;default:return null}}function D_(t,e){if(ss)return t==="compositionend"||!ih&&V0(t,e)?(t=B0(),sl=eh=Ii=null,ss=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return H0&&e.locale!=="ko"?null:e.data;default:return null}}var I_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Mf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!I_[t.type]:e==="textarea"}function j0(t,e,n,i){S0(i),e=Ml(e,"onChange"),0<e.length&&(n=new th("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var mo=null,Uo=null;function U_(t){tg(t,0)}function $l(t){var e=ls(t);if(p0(e))return t}function k_(t,e){if(t==="change")return e}var W0=!1;if(xi){var Ac;if(xi){var Cc="oninput"in document;if(!Cc){var Ef=document.createElement("div");Ef.setAttribute("oninput","return;"),Cc=typeof Ef.oninput=="function"}Ac=Cc}else Ac=!1;W0=Ac&&(!document.documentMode||9<document.documentMode)}function wf(){mo&&(mo.detachEvent("onpropertychange",X0),Uo=mo=null)}function X0(t){if(t.propertyName==="value"&&$l(Uo)){var e=[];j0(e,Uo,t,qd(t)),b0(U_,e)}}function O_(t,e,n){t==="focusin"?(wf(),mo=e,Uo=n,mo.attachEvent("onpropertychange",X0)):t==="focusout"&&wf()}function F_(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return $l(Uo)}function z_(t,e){if(t==="click")return $l(e)}function B_(t,e){if(t==="input"||t==="change")return $l(e)}function H_(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Wn=typeof Object.is=="function"?Object.is:H_;function ko(t,e){if(Wn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Lu.call(e,r)||!Wn(t[r],e[r]))return!1}return!0}function bf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Tf(t,e){var n=bf(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=bf(n)}}function Y0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Y0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function $0(){for(var t=window,e=ml();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=ml(t.document)}return e}function rh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function V_(t){var e=$0(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Y0(n.ownerDocument.documentElement,n)){if(i!==null&&rh(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=Tf(n,s);var o=Tf(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var G_=xi&&"documentMode"in document&&11>=document.documentMode,os=null,Zu=null,go=null,Ku=!1;function Af(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ku||os==null||os!==ml(i)||(i=os,"selectionStart"in i&&rh(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),go&&ko(go,i)||(go=i,i=Ml(Zu,"onSelect"),0<i.length&&(e=new th("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=os)))}function ma(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var as={animationend:ma("Animation","AnimationEnd"),animationiteration:ma("Animation","AnimationIteration"),animationstart:ma("Animation","AnimationStart"),transitionend:ma("Transition","TransitionEnd")},Rc={},q0={};xi&&(q0=document.createElement("div").style,"AnimationEvent"in window||(delete as.animationend.animation,delete as.animationiteration.animation,delete as.animationstart.animation),"TransitionEvent"in window||delete as.transitionend.transition);function ql(t){if(Rc[t])return Rc[t];if(!as[t])return t;var e=as[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in q0)return Rc[t]=e[n];return t}var Z0=ql("animationend"),K0=ql("animationiteration"),J0=ql("animationstart"),Q0=ql("transitionend"),eg=new Map,Cf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ji(t,e){eg.set(t,e),Nr(e,[t])}for(var Pc=0;Pc<Cf.length;Pc++){var Lc=Cf[Pc],j_=Lc.toLowerCase(),W_=Lc[0].toUpperCase()+Lc.slice(1);Ji(j_,"on"+W_)}Ji(Z0,"onAnimationEnd");Ji(K0,"onAnimationIteration");Ji(J0,"onAnimationStart");Ji("dblclick","onDoubleClick");Ji("focusin","onFocus");Ji("focusout","onBlur");Ji(Q0,"onTransitionEnd");Cs("onMouseEnter",["mouseout","mouseover"]);Cs("onMouseLeave",["mouseout","mouseover"]);Cs("onPointerEnter",["pointerout","pointerover"]);Cs("onPointerLeave",["pointerout","pointerover"]);Nr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Nr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Nr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Nr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Nr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Nr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),X_=new Set("cancel close invalid load scroll toggle".split(" ").concat(lo));function Rf(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,jv(i,e,void 0,t),t.currentTarget=null}function tg(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;Rf(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;Rf(r,a,c),s=l}}}if(xl)throw t=Xu,xl=!1,Xu=null,t}function ot(t,e){var n=e[nd];n===void 0&&(n=e[nd]=new Set);var i=t+"__bubble";n.has(i)||(ng(e,t,2,!1),n.add(i))}function Nc(t,e,n){var i=0;e&&(i|=4),ng(n,t,i,e)}var ga="_reactListening"+Math.random().toString(36).slice(2);function Oo(t){if(!t[ga]){t[ga]=!0,c0.forEach(function(n){n!=="selectionchange"&&(X_.has(n)||Nc(n,!1,t),Nc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ga]||(e[ga]=!0,Nc("selectionchange",!1,e))}}function ng(t,e,n,i){switch(z0(e)){case 1:var r=o_;break;case 4:r=a_;break;default:r=Qd}n=r.bind(null,e,n,t),r=void 0,!Wu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Dc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=fr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}b0(function(){var c=s,u=qd(n),f=[];e:{var h=eg.get(t);if(h!==void 0){var p=th,v=t;switch(t){case"keypress":if(ol(n)===0)break e;case"keydown":case"keyup":p=M_;break;case"focusin":v="focus",p=Tc;break;case"focusout":v="blur",p=Tc;break;case"beforeblur":case"afterblur":p=Tc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=xf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=u_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=b_;break;case Z0:case K0:case J0:p=f_;break;case Q0:p=A_;break;case"scroll":p=l_;break;case"wheel":p=R_;break;case"copy":case"cut":case"paste":p=m_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=_f}var y=(e&4)!==0,m=!y&&t==="scroll",d=y?h!==null?h+"Capture":null:h;y=[];for(var _=c,x;_!==null;){x=_;var S=x.stateNode;if(x.tag===5&&S!==null&&(x=S,d!==null&&(S=Lo(_,d),S!=null&&y.push(Fo(_,S,x)))),m)break;_=_.return}0<y.length&&(h=new p(h,v,null,n,u),f.push({event:h,listeners:y}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",h&&n!==Gu&&(v=n.relatedTarget||n.fromElement)&&(fr(v)||v[vi]))break e;if((p||h)&&(h=u.window===u?u:(h=u.ownerDocument)?h.defaultView||h.parentWindow:window,p?(v=n.relatedTarget||n.toElement,p=c,v=v?fr(v):null,v!==null&&(m=Dr(v),v!==m||v.tag!==5&&v.tag!==6)&&(v=null)):(p=null,v=c),p!==v)){if(y=xf,S="onMouseLeave",d="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(y=_f,S="onPointerLeave",d="onPointerEnter",_="pointer"),m=p==null?h:ls(p),x=v==null?h:ls(v),h=new y(S,_+"leave",p,n,u),h.target=m,h.relatedTarget=x,S=null,fr(u)===c&&(y=new y(d,_+"enter",v,n,u),y.target=x,y.relatedTarget=m,S=y),m=S,p&&v)t:{for(y=p,d=v,_=0,x=y;x;x=kr(x))_++;for(x=0,S=d;S;S=kr(S))x++;for(;0<_-x;)y=kr(y),_--;for(;0<x-_;)d=kr(d),x--;for(;_--;){if(y===d||d!==null&&y===d.alternate)break t;y=kr(y),d=kr(d)}y=null}else y=null;p!==null&&Pf(f,h,p,y,!1),v!==null&&m!==null&&Pf(f,m,v,y,!0)}}e:{if(h=c?ls(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var P=k_;else if(Mf(h))if(W0)P=B_;else{P=F_;var w=O_}else(p=h.nodeName)&&p.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(P=z_);if(P&&(P=P(t,c))){j0(f,P,n,u);break e}w&&w(t,h,c),t==="focusout"&&(w=h._wrapperState)&&w.controlled&&h.type==="number"&&Fu(h,"number",h.value)}switch(w=c?ls(c):window,t){case"focusin":(Mf(w)||w.contentEditable==="true")&&(os=w,Zu=c,go=null);break;case"focusout":go=Zu=os=null;break;case"mousedown":Ku=!0;break;case"contextmenu":case"mouseup":case"dragend":Ku=!1,Af(f,n,u);break;case"selectionchange":if(G_)break;case"keydown":case"keyup":Af(f,n,u)}var T;if(ih)e:{switch(t){case"compositionstart":var O="onCompositionStart";break e;case"compositionend":O="onCompositionEnd";break e;case"compositionupdate":O="onCompositionUpdate";break e}O=void 0}else ss?V0(t,n)&&(O="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(O="onCompositionStart");O&&(H0&&n.locale!=="ko"&&(ss||O!=="onCompositionStart"?O==="onCompositionEnd"&&ss&&(T=B0()):(Ii=u,eh="value"in Ii?Ii.value:Ii.textContent,ss=!0)),w=Ml(c,O),0<w.length&&(O=new vf(O,t,null,n,u),f.push({event:O,listeners:w}),T?O.data=T:(T=G0(n),T!==null&&(O.data=T)))),(T=L_?N_(t,n):D_(t,n))&&(c=Ml(c,"onBeforeInput"),0<c.length&&(u=new vf("onBeforeInput","beforeinput",null,n,u),f.push({event:u,listeners:c}),u.data=T))}tg(f,e)})}function Fo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Ml(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Lo(t,n),s!=null&&i.unshift(Fo(t,s,r)),s=Lo(t,e),s!=null&&i.push(Fo(t,s,r))),t=t.return}return i}function kr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Pf(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Lo(n,s),l!=null&&o.unshift(Fo(n,l,a))):r||(l=Lo(n,s),l!=null&&o.push(Fo(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Y_=/\r\n?/g,$_=/\u0000|\uFFFD/g;function Lf(t){return(typeof t=="string"?t:""+t).replace(Y_,`
`).replace($_,"")}function xa(t,e,n){if(e=Lf(e),Lf(t)!==e&&n)throw Error(pe(425))}function El(){}var Ju=null,Qu=null;function ed(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var td=typeof setTimeout=="function"?setTimeout:void 0,q_=typeof clearTimeout=="function"?clearTimeout:void 0,Nf=typeof Promise=="function"?Promise:void 0,Z_=typeof queueMicrotask=="function"?queueMicrotask:typeof Nf<"u"?function(t){return Nf.resolve(null).then(t).catch(K_)}:td;function K_(t){setTimeout(function(){throw t})}function Ic(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Io(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Io(e)}function Hi(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Df(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Vs=Math.random().toString(36).slice(2),Zn="__reactFiber$"+Vs,zo="__reactProps$"+Vs,vi="__reactContainer$"+Vs,nd="__reactEvents$"+Vs,J_="__reactListeners$"+Vs,Q_="__reactHandles$"+Vs;function fr(t){var e=t[Zn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[vi]||n[Zn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Df(t);t!==null;){if(n=t[Zn])return n;t=Df(t)}return e}t=n,n=t.parentNode}return null}function na(t){return t=t[Zn]||t[vi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ls(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(pe(33))}function Zl(t){return t[zo]||null}var id=[],cs=-1;function Qi(t){return{current:t}}function lt(t){0>cs||(t.current=id[cs],id[cs]=null,cs--)}function st(t,e){cs++,id[cs]=t.current,t.current=e}var Zi={},Yt=Qi(Zi),on=Qi(!1),Er=Zi;function Rs(t,e){var n=t.type.contextTypes;if(!n)return Zi;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function an(t){return t=t.childContextTypes,t!=null}function wl(){lt(on),lt(Yt)}function If(t,e,n){if(Yt.current!==Zi)throw Error(pe(168));st(Yt,e),st(on,n)}function ig(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(pe(108,Ov(t)||"Unknown",r));return mt({},n,i)}function bl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Zi,Er=Yt.current,st(Yt,t),st(on,on.current),!0}function Uf(t,e,n){var i=t.stateNode;if(!i)throw Error(pe(169));n?(t=ig(t,e,Er),i.__reactInternalMemoizedMergedChildContext=t,lt(on),lt(Yt),st(Yt,t)):lt(on),st(on,n)}var hi=null,Kl=!1,Uc=!1;function rg(t){hi===null?hi=[t]:hi.push(t)}function ey(t){Kl=!0,rg(t)}function er(){if(!Uc&&hi!==null){Uc=!0;var t=0,e=it;try{var n=hi;for(it=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}hi=null,Kl=!1}catch(r){throw hi!==null&&(hi=hi.slice(t+1)),R0(Zd,er),r}finally{it=e,Uc=!1}}return null}var us=[],ds=0,Tl=null,Al=0,Mn=[],En=0,wr=null,fi=1,pi="";function ar(t,e){us[ds++]=Al,us[ds++]=Tl,Tl=t,Al=e}function sg(t,e,n){Mn[En++]=fi,Mn[En++]=pi,Mn[En++]=wr,wr=t;var i=fi;t=pi;var r=32-Gn(i)-1;i&=~(1<<r),n+=1;var s=32-Gn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,fi=1<<32-Gn(e)+r|n<<r|i,pi=s+t}else fi=1<<s|n<<r|i,pi=t}function sh(t){t.return!==null&&(ar(t,1),sg(t,1,0))}function oh(t){for(;t===Tl;)Tl=us[--ds],us[ds]=null,Al=us[--ds],us[ds]=null;for(;t===wr;)wr=Mn[--En],Mn[En]=null,pi=Mn[--En],Mn[En]=null,fi=Mn[--En],Mn[En]=null}var gn=null,mn=null,ct=!1,Bn=null;function og(t,e){var n=Rn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function kf(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,gn=t,mn=Hi(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,gn=t,mn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=wr!==null?{id:fi,overflow:pi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Rn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,gn=t,mn=null,!0):!1;default:return!1}}function rd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function sd(t){if(ct){var e=mn;if(e){var n=e;if(!kf(t,e)){if(rd(t))throw Error(pe(418));e=Hi(n.nextSibling);var i=gn;e&&kf(t,e)?og(i,n):(t.flags=t.flags&-4097|2,ct=!1,gn=t)}}else{if(rd(t))throw Error(pe(418));t.flags=t.flags&-4097|2,ct=!1,gn=t}}}function Of(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;gn=t}function va(t){if(t!==gn)return!1;if(!ct)return Of(t),ct=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!ed(t.type,t.memoizedProps)),e&&(e=mn)){if(rd(t))throw ag(),Error(pe(418));for(;e;)og(t,e),e=Hi(e.nextSibling)}if(Of(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(pe(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){mn=Hi(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}mn=null}}else mn=gn?Hi(t.stateNode.nextSibling):null;return!0}function ag(){for(var t=mn;t;)t=Hi(t.nextSibling)}function Ps(){mn=gn=null,ct=!1}function ah(t){Bn===null?Bn=[t]:Bn.push(t)}var ty=Mi.ReactCurrentBatchConfig;function Js(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(pe(309));var i=n.stateNode}if(!i)throw Error(pe(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(pe(284));if(!n._owner)throw Error(pe(290,t))}return t}function _a(t,e){throw t=Object.prototype.toString.call(e),Error(pe(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Ff(t){var e=t._init;return e(t._payload)}function lg(t){function e(d,_){if(t){var x=d.deletions;x===null?(d.deletions=[_],d.flags|=16):x.push(_)}}function n(d,_){if(!t)return null;for(;_!==null;)e(d,_),_=_.sibling;return null}function i(d,_){for(d=new Map;_!==null;)_.key!==null?d.set(_.key,_):d.set(_.index,_),_=_.sibling;return d}function r(d,_){return d=Wi(d,_),d.index=0,d.sibling=null,d}function s(d,_,x){return d.index=x,t?(x=d.alternate,x!==null?(x=x.index,x<_?(d.flags|=2,_):x):(d.flags|=2,_)):(d.flags|=1048576,_)}function o(d){return t&&d.alternate===null&&(d.flags|=2),d}function a(d,_,x,S){return _===null||_.tag!==6?(_=Vc(x,d.mode,S),_.return=d,_):(_=r(_,x),_.return=d,_)}function l(d,_,x,S){var P=x.type;return P===rs?u(d,_,x.props.children,S,x.key):_!==null&&(_.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===Ri&&Ff(P)===_.type)?(S=r(_,x.props),S.ref=Js(d,_,x),S.return=d,S):(S=fl(x.type,x.key,x.props,null,d.mode,S),S.ref=Js(d,_,x),S.return=d,S)}function c(d,_,x,S){return _===null||_.tag!==4||_.stateNode.containerInfo!==x.containerInfo||_.stateNode.implementation!==x.implementation?(_=Gc(x,d.mode,S),_.return=d,_):(_=r(_,x.children||[]),_.return=d,_)}function u(d,_,x,S,P){return _===null||_.tag!==7?(_=vr(x,d.mode,S,P),_.return=d,_):(_=r(_,x),_.return=d,_)}function f(d,_,x){if(typeof _=="string"&&_!==""||typeof _=="number")return _=Vc(""+_,d.mode,x),_.return=d,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case la:return x=fl(_.type,_.key,_.props,null,d.mode,x),x.ref=Js(d,null,_),x.return=d,x;case is:return _=Gc(_,d.mode,x),_.return=d,_;case Ri:var S=_._init;return f(d,S(_._payload),x)}if(oo(_)||Ys(_))return _=vr(_,d.mode,x,null),_.return=d,_;_a(d,_)}return null}function h(d,_,x,S){var P=_!==null?_.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return P!==null?null:a(d,_,""+x,S);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case la:return x.key===P?l(d,_,x,S):null;case is:return x.key===P?c(d,_,x,S):null;case Ri:return P=x._init,h(d,_,P(x._payload),S)}if(oo(x)||Ys(x))return P!==null?null:u(d,_,x,S,null);_a(d,x)}return null}function p(d,_,x,S,P){if(typeof S=="string"&&S!==""||typeof S=="number")return d=d.get(x)||null,a(_,d,""+S,P);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case la:return d=d.get(S.key===null?x:S.key)||null,l(_,d,S,P);case is:return d=d.get(S.key===null?x:S.key)||null,c(_,d,S,P);case Ri:var w=S._init;return p(d,_,x,w(S._payload),P)}if(oo(S)||Ys(S))return d=d.get(x)||null,u(_,d,S,P,null);_a(_,S)}return null}function v(d,_,x,S){for(var P=null,w=null,T=_,O=_=0,E=null;T!==null&&O<x.length;O++){T.index>O?(E=T,T=null):E=T.sibling;var b=h(d,T,x[O],S);if(b===null){T===null&&(T=E);break}t&&T&&b.alternate===null&&e(d,T),_=s(b,_,O),w===null?P=b:w.sibling=b,w=b,T=E}if(O===x.length)return n(d,T),ct&&ar(d,O),P;if(T===null){for(;O<x.length;O++)T=f(d,x[O],S),T!==null&&(_=s(T,_,O),w===null?P=T:w.sibling=T,w=T);return ct&&ar(d,O),P}for(T=i(d,T);O<x.length;O++)E=p(T,d,O,x[O],S),E!==null&&(t&&E.alternate!==null&&T.delete(E.key===null?O:E.key),_=s(E,_,O),w===null?P=E:w.sibling=E,w=E);return t&&T.forEach(function(B){return e(d,B)}),ct&&ar(d,O),P}function y(d,_,x,S){var P=Ys(x);if(typeof P!="function")throw Error(pe(150));if(x=P.call(x),x==null)throw Error(pe(151));for(var w=P=null,T=_,O=_=0,E=null,b=x.next();T!==null&&!b.done;O++,b=x.next()){T.index>O?(E=T,T=null):E=T.sibling;var B=h(d,T,b.value,S);if(B===null){T===null&&(T=E);break}t&&T&&B.alternate===null&&e(d,T),_=s(B,_,O),w===null?P=B:w.sibling=B,w=B,T=E}if(b.done)return n(d,T),ct&&ar(d,O),P;if(T===null){for(;!b.done;O++,b=x.next())b=f(d,b.value,S),b!==null&&(_=s(b,_,O),w===null?P=b:w.sibling=b,w=b);return ct&&ar(d,O),P}for(T=i(d,T);!b.done;O++,b=x.next())b=p(T,d,O,b.value,S),b!==null&&(t&&b.alternate!==null&&T.delete(b.key===null?O:b.key),_=s(b,_,O),w===null?P=b:w.sibling=b,w=b);return t&&T.forEach(function(q){return e(d,q)}),ct&&ar(d,O),P}function m(d,_,x,S){if(typeof x=="object"&&x!==null&&x.type===rs&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case la:e:{for(var P=x.key,w=_;w!==null;){if(w.key===P){if(P=x.type,P===rs){if(w.tag===7){n(d,w.sibling),_=r(w,x.props.children),_.return=d,d=_;break e}}else if(w.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===Ri&&Ff(P)===w.type){n(d,w.sibling),_=r(w,x.props),_.ref=Js(d,w,x),_.return=d,d=_;break e}n(d,w);break}else e(d,w);w=w.sibling}x.type===rs?(_=vr(x.props.children,d.mode,S,x.key),_.return=d,d=_):(S=fl(x.type,x.key,x.props,null,d.mode,S),S.ref=Js(d,_,x),S.return=d,d=S)}return o(d);case is:e:{for(w=x.key;_!==null;){if(_.key===w)if(_.tag===4&&_.stateNode.containerInfo===x.containerInfo&&_.stateNode.implementation===x.implementation){n(d,_.sibling),_=r(_,x.children||[]),_.return=d,d=_;break e}else{n(d,_);break}else e(d,_);_=_.sibling}_=Gc(x,d.mode,S),_.return=d,d=_}return o(d);case Ri:return w=x._init,m(d,_,w(x._payload),S)}if(oo(x))return v(d,_,x,S);if(Ys(x))return y(d,_,x,S);_a(d,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,_!==null&&_.tag===6?(n(d,_.sibling),_=r(_,x),_.return=d,d=_):(n(d,_),_=Vc(x,d.mode,S),_.return=d,d=_),o(d)):n(d,_)}return m}var Ls=lg(!0),cg=lg(!1),Cl=Qi(null),Rl=null,hs=null,lh=null;function ch(){lh=hs=Rl=null}function uh(t){var e=Cl.current;lt(Cl),t._currentValue=e}function od(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Es(t,e){Rl=t,lh=hs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(sn=!0),t.firstContext=null)}function Ln(t){var e=t._currentValue;if(lh!==t)if(t={context:t,memoizedValue:e,next:null},hs===null){if(Rl===null)throw Error(pe(308));hs=t,Rl.dependencies={lanes:0,firstContext:t}}else hs=hs.next=t;return e}var pr=null;function dh(t){pr===null?pr=[t]:pr.push(t)}function ug(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,dh(e)):(n.next=r.next,r.next=n),e.interleaved=n,_i(t,i)}function _i(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Pi=!1;function hh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function dg(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function gi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Vi(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,et&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,_i(t,n)}return r=i.interleaved,r===null?(e.next=e,dh(i)):(e.next=r.next,r.next=e),i.interleaved=e,_i(t,n)}function al(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Kd(t,n)}}function zf(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Pl(t,e,n,i){var r=t.updateQueue;Pi=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var u=t.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==o&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(s!==null){var f=r.baseState;o=0,u=c=l=null,a=s;do{var h=a.lane,p=a.eventTime;if((i&h)===h){u!==null&&(u=u.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var v=t,y=a;switch(h=e,p=n,y.tag){case 1:if(v=y.payload,typeof v=="function"){f=v.call(p,f,h);break e}f=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=y.payload,h=typeof v=="function"?v.call(p,f,h):v,h==null)break e;f=mt({},f,h);break e;case 2:Pi=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else p={eventTime:p,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=p,l=f):u=u.next=p,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(u===null&&(l=f),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Tr|=o,t.lanes=o,t.memoizedState=f}}function Bf(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(pe(191,r));r.call(i)}}}var ia={},ti=Qi(ia),Bo=Qi(ia),Ho=Qi(ia);function mr(t){if(t===ia)throw Error(pe(174));return t}function fh(t,e){switch(st(Ho,e),st(Bo,t),st(ti,ia),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Bu(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Bu(e,t)}lt(ti),st(ti,e)}function Ns(){lt(ti),lt(Bo),lt(Ho)}function hg(t){mr(Ho.current);var e=mr(ti.current),n=Bu(e,t.type);e!==n&&(st(Bo,t),st(ti,n))}function ph(t){Bo.current===t&&(lt(ti),lt(Bo))}var dt=Qi(0);function Ll(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var kc=[];function mh(){for(var t=0;t<kc.length;t++)kc[t]._workInProgressVersionPrimary=null;kc.length=0}var ll=Mi.ReactCurrentDispatcher,Oc=Mi.ReactCurrentBatchConfig,br=0,ft=null,At=null,Dt=null,Nl=!1,xo=!1,Vo=0,ny=0;function Vt(){throw Error(pe(321))}function gh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Wn(t[n],e[n]))return!1;return!0}function xh(t,e,n,i,r,s){if(br=s,ft=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,ll.current=t===null||t.memoizedState===null?oy:ay,t=n(i,r),xo){s=0;do{if(xo=!1,Vo=0,25<=s)throw Error(pe(301));s+=1,Dt=At=null,e.updateQueue=null,ll.current=ly,t=n(i,r)}while(xo)}if(ll.current=Dl,e=At!==null&&At.next!==null,br=0,Dt=At=ft=null,Nl=!1,e)throw Error(pe(300));return t}function vh(){var t=Vo!==0;return Vo=0,t}function $n(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Dt===null?ft.memoizedState=Dt=t:Dt=Dt.next=t,Dt}function Nn(){if(At===null){var t=ft.alternate;t=t!==null?t.memoizedState:null}else t=At.next;var e=Dt===null?ft.memoizedState:Dt.next;if(e!==null)Dt=e,At=t;else{if(t===null)throw Error(pe(310));At=t,t={memoizedState:At.memoizedState,baseState:At.baseState,baseQueue:At.baseQueue,queue:At.queue,next:null},Dt===null?ft.memoizedState=Dt=t:Dt=Dt.next=t}return Dt}function Go(t,e){return typeof e=="function"?e(t):e}function Fc(t){var e=Nn(),n=e.queue;if(n===null)throw Error(pe(311));n.lastRenderedReducer=t;var i=At,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var u=c.lane;if((br&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var f={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=f,o=i):l=l.next=f,ft.lanes|=u,Tr|=u}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,Wn(i,e.memoizedState)||(sn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,ft.lanes|=s,Tr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function zc(t){var e=Nn(),n=e.queue;if(n===null)throw Error(pe(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);Wn(s,e.memoizedState)||(sn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function fg(){}function pg(t,e){var n=ft,i=Nn(),r=e(),s=!Wn(i.memoizedState,r);if(s&&(i.memoizedState=r,sn=!0),i=i.queue,_h(xg.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Dt!==null&&Dt.memoizedState.tag&1){if(n.flags|=2048,jo(9,gg.bind(null,n,i,r,e),void 0,null),Ut===null)throw Error(pe(349));br&30||mg(n,e,r)}return r}function mg(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ft.updateQueue,e===null?(e={lastEffect:null,stores:null},ft.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function gg(t,e,n,i){e.value=n,e.getSnapshot=i,vg(e)&&_g(t)}function xg(t,e,n){return n(function(){vg(e)&&_g(t)})}function vg(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Wn(t,n)}catch{return!0}}function _g(t){var e=_i(t,1);e!==null&&jn(e,t,1,-1)}function Hf(t){var e=$n();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Go,lastRenderedState:t},e.queue=t,t=t.dispatch=sy.bind(null,ft,t),[e.memoizedState,t]}function jo(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=ft.updateQueue,e===null?(e={lastEffect:null,stores:null},ft.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function yg(){return Nn().memoizedState}function cl(t,e,n,i){var r=$n();ft.flags|=t,r.memoizedState=jo(1|e,n,void 0,i===void 0?null:i)}function Jl(t,e,n,i){var r=Nn();i=i===void 0?null:i;var s=void 0;if(At!==null){var o=At.memoizedState;if(s=o.destroy,i!==null&&gh(i,o.deps)){r.memoizedState=jo(e,n,s,i);return}}ft.flags|=t,r.memoizedState=jo(1|e,n,s,i)}function Vf(t,e){return cl(8390656,8,t,e)}function _h(t,e){return Jl(2048,8,t,e)}function Sg(t,e){return Jl(4,2,t,e)}function Mg(t,e){return Jl(4,4,t,e)}function Eg(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function wg(t,e,n){return n=n!=null?n.concat([t]):null,Jl(4,4,Eg.bind(null,e,t),n)}function yh(){}function bg(t,e){var n=Nn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&gh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Tg(t,e){var n=Nn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&gh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Ag(t,e,n){return br&21?(Wn(n,e)||(n=N0(),ft.lanes|=n,Tr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,sn=!0),t.memoizedState=n)}function iy(t,e){var n=it;it=n!==0&&4>n?n:4,t(!0);var i=Oc.transition;Oc.transition={};try{t(!1),e()}finally{it=n,Oc.transition=i}}function Cg(){return Nn().memoizedState}function ry(t,e,n){var i=ji(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Rg(t))Pg(e,n);else if(n=ug(t,e,n,i),n!==null){var r=en();jn(n,t,i,r),Lg(n,e,i)}}function sy(t,e,n){var i=ji(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Rg(t))Pg(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,Wn(a,o)){var l=e.interleaved;l===null?(r.next=r,dh(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=ug(t,e,r,i),n!==null&&(r=en(),jn(n,t,i,r),Lg(n,e,i))}}function Rg(t){var e=t.alternate;return t===ft||e!==null&&e===ft}function Pg(t,e){xo=Nl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Lg(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Kd(t,n)}}var Dl={readContext:Ln,useCallback:Vt,useContext:Vt,useEffect:Vt,useImperativeHandle:Vt,useInsertionEffect:Vt,useLayoutEffect:Vt,useMemo:Vt,useReducer:Vt,useRef:Vt,useState:Vt,useDebugValue:Vt,useDeferredValue:Vt,useTransition:Vt,useMutableSource:Vt,useSyncExternalStore:Vt,useId:Vt,unstable_isNewReconciler:!1},oy={readContext:Ln,useCallback:function(t,e){return $n().memoizedState=[t,e===void 0?null:e],t},useContext:Ln,useEffect:Vf,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,cl(4194308,4,Eg.bind(null,e,t),n)},useLayoutEffect:function(t,e){return cl(4194308,4,t,e)},useInsertionEffect:function(t,e){return cl(4,2,t,e)},useMemo:function(t,e){var n=$n();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=$n();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=ry.bind(null,ft,t),[i.memoizedState,t]},useRef:function(t){var e=$n();return t={current:t},e.memoizedState=t},useState:Hf,useDebugValue:yh,useDeferredValue:function(t){return $n().memoizedState=t},useTransition:function(){var t=Hf(!1),e=t[0];return t=iy.bind(null,t[1]),$n().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=ft,r=$n();if(ct){if(n===void 0)throw Error(pe(407));n=n()}else{if(n=e(),Ut===null)throw Error(pe(349));br&30||mg(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Vf(xg.bind(null,i,s,t),[t]),i.flags|=2048,jo(9,gg.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=$n(),e=Ut.identifierPrefix;if(ct){var n=pi,i=fi;n=(i&~(1<<32-Gn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Vo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=ny++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},ay={readContext:Ln,useCallback:bg,useContext:Ln,useEffect:_h,useImperativeHandle:wg,useInsertionEffect:Sg,useLayoutEffect:Mg,useMemo:Tg,useReducer:Fc,useRef:yg,useState:function(){return Fc(Go)},useDebugValue:yh,useDeferredValue:function(t){var e=Nn();return Ag(e,At.memoizedState,t)},useTransition:function(){var t=Fc(Go)[0],e=Nn().memoizedState;return[t,e]},useMutableSource:fg,useSyncExternalStore:pg,useId:Cg,unstable_isNewReconciler:!1},ly={readContext:Ln,useCallback:bg,useContext:Ln,useEffect:_h,useImperativeHandle:wg,useInsertionEffect:Sg,useLayoutEffect:Mg,useMemo:Tg,useReducer:zc,useRef:yg,useState:function(){return zc(Go)},useDebugValue:yh,useDeferredValue:function(t){var e=Nn();return At===null?e.memoizedState=t:Ag(e,At.memoizedState,t)},useTransition:function(){var t=zc(Go)[0],e=Nn().memoizedState;return[t,e]},useMutableSource:fg,useSyncExternalStore:pg,useId:Cg,unstable_isNewReconciler:!1};function Fn(t,e){if(t&&t.defaultProps){e=mt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function ad(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:mt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ql={isMounted:function(t){return(t=t._reactInternals)?Dr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=en(),r=ji(t),s=gi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Vi(t,s,r),e!==null&&(jn(e,t,r,i),al(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=en(),r=ji(t),s=gi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Vi(t,s,r),e!==null&&(jn(e,t,r,i),al(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=en(),i=ji(t),r=gi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Vi(t,r,i),e!==null&&(jn(e,t,i,n),al(e,t,i))}};function Gf(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!ko(n,i)||!ko(r,s):!0}function Ng(t,e,n){var i=!1,r=Zi,s=e.contextType;return typeof s=="object"&&s!==null?s=Ln(s):(r=an(e)?Er:Yt.current,i=e.contextTypes,s=(i=i!=null)?Rs(t,r):Zi),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Ql,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function jf(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Ql.enqueueReplaceState(e,e.state,null)}function ld(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},hh(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Ln(s):(s=an(e)?Er:Yt.current,r.context=Rs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(ad(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Ql.enqueueReplaceState(r,r.state,null),Pl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Ds(t,e){try{var n="",i=e;do n+=kv(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Bc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function cd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var cy=typeof WeakMap=="function"?WeakMap:Map;function Dg(t,e,n){n=gi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Ul||(Ul=!0,_d=i),cd(t,e)},n}function Ig(t,e,n){n=gi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){cd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){cd(t,e),typeof i!="function"&&(Gi===null?Gi=new Set([this]):Gi.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Wf(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new cy;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=Ey.bind(null,t,e,n),e.then(t,t))}function Xf(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Yf(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=gi(-1,1),e.tag=2,Vi(n,e,1))),n.lanes|=1),t)}var uy=Mi.ReactCurrentOwner,sn=!1;function Kt(t,e,n,i){e.child=t===null?cg(e,null,n,i):Ls(e,t.child,n,i)}function $f(t,e,n,i,r){n=n.render;var s=e.ref;return Es(e,r),i=xh(t,e,n,i,s,r),n=vh(),t!==null&&!sn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,yi(t,e,r)):(ct&&n&&sh(e),e.flags|=1,Kt(t,e,i,r),e.child)}function qf(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Ch(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,Ug(t,e,s,i,r)):(t=fl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:ko,n(o,i)&&t.ref===e.ref)return yi(t,e,r)}return e.flags|=1,t=Wi(s,i),t.ref=e.ref,t.return=e,e.child=t}function Ug(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(ko(s,i)&&t.ref===e.ref)if(sn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(sn=!0);else return e.lanes=t.lanes,yi(t,e,r)}return ud(t,e,n,i,r)}function kg(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},st(ps,pn),pn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,st(ps,pn),pn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,st(ps,pn),pn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,st(ps,pn),pn|=i;return Kt(t,e,r,n),e.child}function Og(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function ud(t,e,n,i,r){var s=an(n)?Er:Yt.current;return s=Rs(e,s),Es(e,r),n=xh(t,e,n,i,s,r),i=vh(),t!==null&&!sn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,yi(t,e,r)):(ct&&i&&sh(e),e.flags|=1,Kt(t,e,n,r),e.child)}function Zf(t,e,n,i,r){if(an(n)){var s=!0;bl(e)}else s=!1;if(Es(e,r),e.stateNode===null)ul(t,e),Ng(e,n,i),ld(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Ln(c):(c=an(n)?Er:Yt.current,c=Rs(e,c));var u=n.getDerivedStateFromProps,f=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&jf(e,o,i,c),Pi=!1;var h=e.memoizedState;o.state=h,Pl(e,i,o,r),l=e.memoizedState,a!==i||h!==l||on.current||Pi?(typeof u=="function"&&(ad(e,n,u,i),l=e.memoizedState),(a=Pi||Gf(e,n,a,i,h,l,c))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,dg(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:Fn(e.type,a),o.props=c,f=e.pendingProps,h=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Ln(l):(l=an(n)?Er:Yt.current,l=Rs(e,l));var p=n.getDerivedStateFromProps;(u=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==f||h!==l)&&jf(e,o,i,l),Pi=!1,h=e.memoizedState,o.state=h,Pl(e,i,o,r);var v=e.memoizedState;a!==f||h!==v||on.current||Pi?(typeof p=="function"&&(ad(e,n,p,i),v=e.memoizedState),(c=Pi||Gf(e,n,c,i,h,v,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,v,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,v,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),o.props=i,o.state=v,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return dd(t,e,n,i,s,r)}function dd(t,e,n,i,r,s){Og(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&Uf(e,n,!1),yi(t,e,s);i=e.stateNode,uy.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Ls(e,t.child,null,s),e.child=Ls(e,null,a,s)):Kt(t,e,a,s),e.memoizedState=i.state,r&&Uf(e,n,!0),e.child}function Fg(t){var e=t.stateNode;e.pendingContext?If(t,e.pendingContext,e.pendingContext!==e.context):e.context&&If(t,e.context,!1),fh(t,e.containerInfo)}function Kf(t,e,n,i,r){return Ps(),ah(r),e.flags|=256,Kt(t,e,n,i),e.child}var hd={dehydrated:null,treeContext:null,retryLane:0};function fd(t){return{baseLanes:t,cachePool:null,transitions:null}}function zg(t,e,n){var i=e.pendingProps,r=dt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),st(dt,r&1),t===null)return sd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=nc(o,i,0,null),t=vr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=fd(n),e.memoizedState=hd,t):Sh(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return dy(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Wi(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=Wi(a,s):(s=vr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?fd(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=hd,i}return s=t.child,t=s.sibling,i=Wi(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Sh(t,e){return e=nc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function ya(t,e,n,i){return i!==null&&ah(i),Ls(e,t.child,null,n),t=Sh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function dy(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Bc(Error(pe(422))),ya(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=nc({mode:"visible",children:i.children},r,0,null),s=vr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Ls(e,t.child,null,o),e.child.memoizedState=fd(o),e.memoizedState=hd,s);if(!(e.mode&1))return ya(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(pe(419)),i=Bc(s,i,void 0),ya(t,e,o,i)}if(a=(o&t.childLanes)!==0,sn||a){if(i=Ut,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,_i(t,r),jn(i,t,r,-1))}return Ah(),i=Bc(Error(pe(421))),ya(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=wy.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,mn=Hi(r.nextSibling),gn=e,ct=!0,Bn=null,t!==null&&(Mn[En++]=fi,Mn[En++]=pi,Mn[En++]=wr,fi=t.id,pi=t.overflow,wr=e),e=Sh(e,i.children),e.flags|=4096,e)}function Jf(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),od(t.return,e,n)}function Hc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Bg(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Kt(t,e,i.children,n),i=dt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Jf(t,n,e);else if(t.tag===19)Jf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(st(dt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Ll(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Hc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Ll(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Hc(e,!0,n,null,s);break;case"together":Hc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function ul(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function yi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Tr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(pe(153));if(e.child!==null){for(t=e.child,n=Wi(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Wi(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function hy(t,e,n){switch(e.tag){case 3:Fg(e),Ps();break;case 5:hg(e);break;case 1:an(e.type)&&bl(e);break;case 4:fh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;st(Cl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(st(dt,dt.current&1),e.flags|=128,null):n&e.child.childLanes?zg(t,e,n):(st(dt,dt.current&1),t=yi(t,e,n),t!==null?t.sibling:null);st(dt,dt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Bg(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),st(dt,dt.current),i)break;return null;case 22:case 23:return e.lanes=0,kg(t,e,n)}return yi(t,e,n)}var Hg,pd,Vg,Gg;Hg=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};pd=function(){};Vg=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,mr(ti.current);var s=null;switch(n){case"input":r=ku(t,r),i=ku(t,i),s=[];break;case"select":r=mt({},r,{value:void 0}),i=mt({},i,{value:void 0}),s=[];break;case"textarea":r=zu(t,r),i=zu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=El)}Hu(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ro.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ro.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ot("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};Gg=function(t,e,n,i){n!==i&&(e.flags|=4)};function Qs(t,e){if(!ct)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Gt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function fy(t,e,n){var i=e.pendingProps;switch(oh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Gt(e),null;case 1:return an(e.type)&&wl(),Gt(e),null;case 3:return i=e.stateNode,Ns(),lt(on),lt(Yt),mh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(va(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Bn!==null&&(Md(Bn),Bn=null))),pd(t,e),Gt(e),null;case 5:ph(e);var r=mr(Ho.current);if(n=e.type,t!==null&&e.stateNode!=null)Vg(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(pe(166));return Gt(e),null}if(t=mr(ti.current),va(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Zn]=e,i[zo]=s,t=(e.mode&1)!==0,n){case"dialog":ot("cancel",i),ot("close",i);break;case"iframe":case"object":case"embed":ot("load",i);break;case"video":case"audio":for(r=0;r<lo.length;r++)ot(lo[r],i);break;case"source":ot("error",i);break;case"img":case"image":case"link":ot("error",i),ot("load",i);break;case"details":ot("toggle",i);break;case"input":af(i,s),ot("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ot("invalid",i);break;case"textarea":cf(i,s),ot("invalid",i)}Hu(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&xa(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&xa(i.textContent,a,t),r=["children",""+a]):Ro.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ot("scroll",i)}switch(n){case"input":ca(i),lf(i,s,!0);break;case"textarea":ca(i),uf(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=El)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=x0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[Zn]=e,t[zo]=i,Hg(t,e,!1,!1),e.stateNode=t;e:{switch(o=Vu(n,i),n){case"dialog":ot("cancel",t),ot("close",t),r=i;break;case"iframe":case"object":case"embed":ot("load",t),r=i;break;case"video":case"audio":for(r=0;r<lo.length;r++)ot(lo[r],t);r=i;break;case"source":ot("error",t),r=i;break;case"img":case"image":case"link":ot("error",t),ot("load",t),r=i;break;case"details":ot("toggle",t),r=i;break;case"input":af(t,i),r=ku(t,i),ot("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=mt({},i,{value:void 0}),ot("invalid",t);break;case"textarea":cf(t,i),r=zu(t,i),ot("invalid",t);break;default:r=i}Hu(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?y0(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&v0(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Po(t,l):typeof l=="number"&&Po(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ro.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ot("scroll",t):l!=null&&Wd(t,s,l,o))}switch(n){case"input":ca(t),lf(t,i,!1);break;case"textarea":ca(t),uf(t);break;case"option":i.value!=null&&t.setAttribute("value",""+qi(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?_s(t,!!i.multiple,s,!1):i.defaultValue!=null&&_s(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=El)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Gt(e),null;case 6:if(t&&e.stateNode!=null)Gg(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(pe(166));if(n=mr(Ho.current),mr(ti.current),va(e)){if(i=e.stateNode,n=e.memoizedProps,i[Zn]=e,(s=i.nodeValue!==n)&&(t=gn,t!==null))switch(t.tag){case 3:xa(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&xa(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Zn]=e,e.stateNode=i}return Gt(e),null;case 13:if(lt(dt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ct&&mn!==null&&e.mode&1&&!(e.flags&128))ag(),Ps(),e.flags|=98560,s=!1;else if(s=va(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(pe(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(pe(317));s[Zn]=e}else Ps(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Gt(e),s=!1}else Bn!==null&&(Md(Bn),Bn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||dt.current&1?Ct===0&&(Ct=3):Ah())),e.updateQueue!==null&&(e.flags|=4),Gt(e),null);case 4:return Ns(),pd(t,e),t===null&&Oo(e.stateNode.containerInfo),Gt(e),null;case 10:return uh(e.type._context),Gt(e),null;case 17:return an(e.type)&&wl(),Gt(e),null;case 19:if(lt(dt),s=e.memoizedState,s===null)return Gt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Qs(s,!1);else{if(Ct!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Ll(t),o!==null){for(e.flags|=128,Qs(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return st(dt,dt.current&1|2),e.child}t=t.sibling}s.tail!==null&&St()>Is&&(e.flags|=128,i=!0,Qs(s,!1),e.lanes=4194304)}else{if(!i)if(t=Ll(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Qs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ct)return Gt(e),null}else 2*St()-s.renderingStartTime>Is&&n!==1073741824&&(e.flags|=128,i=!0,Qs(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=St(),e.sibling=null,n=dt.current,st(dt,i?n&1|2:n&1),e):(Gt(e),null);case 22:case 23:return Th(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?pn&1073741824&&(Gt(e),e.subtreeFlags&6&&(e.flags|=8192)):Gt(e),null;case 24:return null;case 25:return null}throw Error(pe(156,e.tag))}function py(t,e){switch(oh(e),e.tag){case 1:return an(e.type)&&wl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ns(),lt(on),lt(Yt),mh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return ph(e),null;case 13:if(lt(dt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(pe(340));Ps()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return lt(dt),null;case 4:return Ns(),null;case 10:return uh(e.type._context),null;case 22:case 23:return Th(),null;case 24:return null;default:return null}}var Sa=!1,Xt=!1,my=typeof WeakSet=="function"?WeakSet:Set,Re=null;function fs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){vt(t,e,i)}else n.current=null}function md(t,e,n){try{n()}catch(i){vt(t,e,i)}}var Qf=!1;function gy(t,e){if(Ju=yl,t=$0(),rh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,u=0,f=t,h=null;t:for(;;){for(var p;f!==n||r!==0&&f.nodeType!==3||(a=o+r),f!==s||i!==0&&f.nodeType!==3||(l=o+i),f.nodeType===3&&(o+=f.nodeValue.length),(p=f.firstChild)!==null;)h=f,f=p;for(;;){if(f===t)break t;if(h===n&&++c===r&&(a=o),h===s&&++u===i&&(l=o),(p=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Qu={focusedElem:t,selectionRange:n},yl=!1,Re=e;Re!==null;)if(e=Re,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Re=t;else for(;Re!==null;){e=Re;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var y=v.memoizedProps,m=v.memoizedState,d=e.stateNode,_=d.getSnapshotBeforeUpdate(e.elementType===e.type?y:Fn(e.type,y),m);d.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var x=e.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(pe(163))}}catch(S){vt(e,e.return,S)}if(t=e.sibling,t!==null){t.return=e.return,Re=t;break}Re=e.return}return v=Qf,Qf=!1,v}function vo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&md(e,n,s)}r=r.next}while(r!==i)}}function ec(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function gd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function jg(t){var e=t.alternate;e!==null&&(t.alternate=null,jg(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Zn],delete e[zo],delete e[nd],delete e[J_],delete e[Q_])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Wg(t){return t.tag===5||t.tag===3||t.tag===4}function ep(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Wg(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function xd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=El));else if(i!==4&&(t=t.child,t!==null))for(xd(t,e,n),t=t.sibling;t!==null;)xd(t,e,n),t=t.sibling}function vd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(vd(t,e,n),t=t.sibling;t!==null;)vd(t,e,n),t=t.sibling}var Ot=null,zn=!1;function Ei(t,e,n){for(n=n.child;n!==null;)Xg(t,e,n),n=n.sibling}function Xg(t,e,n){if(ei&&typeof ei.onCommitFiberUnmount=="function")try{ei.onCommitFiberUnmount(Xl,n)}catch{}switch(n.tag){case 5:Xt||fs(n,e);case 6:var i=Ot,r=zn;Ot=null,Ei(t,e,n),Ot=i,zn=r,Ot!==null&&(zn?(t=Ot,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ot.removeChild(n.stateNode));break;case 18:Ot!==null&&(zn?(t=Ot,n=n.stateNode,t.nodeType===8?Ic(t.parentNode,n):t.nodeType===1&&Ic(t,n),Io(t)):Ic(Ot,n.stateNode));break;case 4:i=Ot,r=zn,Ot=n.stateNode.containerInfo,zn=!0,Ei(t,e,n),Ot=i,zn=r;break;case 0:case 11:case 14:case 15:if(!Xt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&md(n,e,o),r=r.next}while(r!==i)}Ei(t,e,n);break;case 1:if(!Xt&&(fs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){vt(n,e,a)}Ei(t,e,n);break;case 21:Ei(t,e,n);break;case 22:n.mode&1?(Xt=(i=Xt)||n.memoizedState!==null,Ei(t,e,n),Xt=i):Ei(t,e,n);break;default:Ei(t,e,n)}}function tp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new my),e.forEach(function(i){var r=by.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Dn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Ot=a.stateNode,zn=!1;break e;case 3:Ot=a.stateNode.containerInfo,zn=!0;break e;case 4:Ot=a.stateNode.containerInfo,zn=!0;break e}a=a.return}if(Ot===null)throw Error(pe(160));Xg(s,o,r),Ot=null,zn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){vt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Yg(e,t),e=e.sibling}function Yg(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Dn(e,t),Yn(t),i&4){try{vo(3,t,t.return),ec(3,t)}catch(y){vt(t,t.return,y)}try{vo(5,t,t.return)}catch(y){vt(t,t.return,y)}}break;case 1:Dn(e,t),Yn(t),i&512&&n!==null&&fs(n,n.return);break;case 5:if(Dn(e,t),Yn(t),i&512&&n!==null&&fs(n,n.return),t.flags&32){var r=t.stateNode;try{Po(r,"")}catch(y){vt(t,t.return,y)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&m0(r,s),Vu(a,o);var c=Vu(a,s);for(o=0;o<l.length;o+=2){var u=l[o],f=l[o+1];u==="style"?y0(r,f):u==="dangerouslySetInnerHTML"?v0(r,f):u==="children"?Po(r,f):Wd(r,u,f,c)}switch(a){case"input":Ou(r,s);break;case"textarea":g0(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?_s(r,!!s.multiple,p,!1):h!==!!s.multiple&&(s.defaultValue!=null?_s(r,!!s.multiple,s.defaultValue,!0):_s(r,!!s.multiple,s.multiple?[]:"",!1))}r[zo]=s}catch(y){vt(t,t.return,y)}}break;case 6:if(Dn(e,t),Yn(t),i&4){if(t.stateNode===null)throw Error(pe(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(y){vt(t,t.return,y)}}break;case 3:if(Dn(e,t),Yn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Io(e.containerInfo)}catch(y){vt(t,t.return,y)}break;case 4:Dn(e,t),Yn(t);break;case 13:Dn(e,t),Yn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(wh=St())),i&4&&tp(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(Xt=(c=Xt)||u,Dn(e,t),Xt=c):Dn(e,t),Yn(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(Re=t,u=t.child;u!==null;){for(f=Re=u;Re!==null;){switch(h=Re,p=h.child,h.tag){case 0:case 11:case 14:case 15:vo(4,h,h.return);break;case 1:fs(h,h.return);var v=h.stateNode;if(typeof v.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(y){vt(i,n,y)}}break;case 5:fs(h,h.return);break;case 22:if(h.memoizedState!==null){ip(f);continue}}p!==null?(p.return=h,Re=p):ip(f)}u=u.sibling}e:for(u=null,f=t;;){if(f.tag===5){if(u===null){u=f;try{r=f.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=f.stateNode,l=f.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=_0("display",o))}catch(y){vt(t,t.return,y)}}}else if(f.tag===6){if(u===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(y){vt(t,t.return,y)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;u===f&&(u=null),f=f.return}u===f&&(u=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Dn(e,t),Yn(t),i&4&&tp(t);break;case 21:break;default:Dn(e,t),Yn(t)}}function Yn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Wg(n)){var i=n;break e}n=n.return}throw Error(pe(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Po(r,""),i.flags&=-33);var s=ep(t);vd(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=ep(t);xd(t,a,o);break;default:throw Error(pe(161))}}catch(l){vt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function xy(t,e,n){Re=t,$g(t)}function $g(t,e,n){for(var i=(t.mode&1)!==0;Re!==null;){var r=Re,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Sa;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Xt;a=Sa;var c=Xt;if(Sa=o,(Xt=l)&&!c)for(Re=r;Re!==null;)o=Re,l=o.child,o.tag===22&&o.memoizedState!==null?rp(r):l!==null?(l.return=o,Re=l):rp(r);for(;s!==null;)Re=s,$g(s),s=s.sibling;Re=r,Sa=a,Xt=c}np(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Re=s):np(t)}}function np(t){for(;Re!==null;){var e=Re;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Xt||ec(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Xt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Fn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Bf(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Bf(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var f=u.dehydrated;f!==null&&Io(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(pe(163))}Xt||e.flags&512&&gd(e)}catch(h){vt(e,e.return,h)}}if(e===t){Re=null;break}if(n=e.sibling,n!==null){n.return=e.return,Re=n;break}Re=e.return}}function ip(t){for(;Re!==null;){var e=Re;if(e===t){Re=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Re=n;break}Re=e.return}}function rp(t){for(;Re!==null;){var e=Re;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{ec(4,e)}catch(l){vt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){vt(e,r,l)}}var s=e.return;try{gd(e)}catch(l){vt(e,s,l)}break;case 5:var o=e.return;try{gd(e)}catch(l){vt(e,o,l)}}}catch(l){vt(e,e.return,l)}if(e===t){Re=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Re=a;break}Re=e.return}}var vy=Math.ceil,Il=Mi.ReactCurrentDispatcher,Mh=Mi.ReactCurrentOwner,Pn=Mi.ReactCurrentBatchConfig,et=0,Ut=null,Tt=null,zt=0,pn=0,ps=Qi(0),Ct=0,Wo=null,Tr=0,tc=0,Eh=0,_o=null,rn=null,wh=0,Is=1/0,di=null,Ul=!1,_d=null,Gi=null,Ma=!1,Ui=null,kl=0,yo=0,yd=null,dl=-1,hl=0;function en(){return et&6?St():dl!==-1?dl:dl=St()}function ji(t){return t.mode&1?et&2&&zt!==0?zt&-zt:ty.transition!==null?(hl===0&&(hl=N0()),hl):(t=it,t!==0||(t=window.event,t=t===void 0?16:z0(t.type)),t):1}function jn(t,e,n,i){if(50<yo)throw yo=0,yd=null,Error(pe(185));ea(t,n,i),(!(et&2)||t!==Ut)&&(t===Ut&&(!(et&2)&&(tc|=n),Ct===4&&Di(t,zt)),ln(t,i),n===1&&et===0&&!(e.mode&1)&&(Is=St()+500,Kl&&er()))}function ln(t,e){var n=t.callbackNode;t_(t,e);var i=_l(t,t===Ut?zt:0);if(i===0)n!==null&&ff(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&ff(n),e===1)t.tag===0?ey(sp.bind(null,t)):rg(sp.bind(null,t)),Z_(function(){!(et&6)&&er()}),n=null;else{switch(D0(i)){case 1:n=Zd;break;case 4:n=P0;break;case 16:n=vl;break;case 536870912:n=L0;break;default:n=vl}n=nx(n,qg.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function qg(t,e){if(dl=-1,hl=0,et&6)throw Error(pe(327));var n=t.callbackNode;if(ws()&&t.callbackNode!==n)return null;var i=_l(t,t===Ut?zt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Ol(t,i);else{e=i;var r=et;et|=2;var s=Kg();(Ut!==t||zt!==e)&&(di=null,Is=St()+500,xr(t,e));do try{Sy();break}catch(a){Zg(t,a)}while(!0);ch(),Il.current=s,et=r,Tt!==null?e=0:(Ut=null,zt=0,e=Ct)}if(e!==0){if(e===2&&(r=Yu(t),r!==0&&(i=r,e=Sd(t,r))),e===1)throw n=Wo,xr(t,0),Di(t,i),ln(t,St()),n;if(e===6)Di(t,i);else{if(r=t.current.alternate,!(i&30)&&!_y(r)&&(e=Ol(t,i),e===2&&(s=Yu(t),s!==0&&(i=s,e=Sd(t,s))),e===1))throw n=Wo,xr(t,0),Di(t,i),ln(t,St()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(pe(345));case 2:lr(t,rn,di);break;case 3:if(Di(t,i),(i&130023424)===i&&(e=wh+500-St(),10<e)){if(_l(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){en(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=td(lr.bind(null,t,rn,di),e);break}lr(t,rn,di);break;case 4:if(Di(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Gn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=St()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*vy(i/1960))-i,10<i){t.timeoutHandle=td(lr.bind(null,t,rn,di),i);break}lr(t,rn,di);break;case 5:lr(t,rn,di);break;default:throw Error(pe(329))}}}return ln(t,St()),t.callbackNode===n?qg.bind(null,t):null}function Sd(t,e){var n=_o;return t.current.memoizedState.isDehydrated&&(xr(t,e).flags|=256),t=Ol(t,e),t!==2&&(e=rn,rn=n,e!==null&&Md(e)),t}function Md(t){rn===null?rn=t:rn.push.apply(rn,t)}function _y(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Wn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Di(t,e){for(e&=~Eh,e&=~tc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Gn(e),i=1<<n;t[n]=-1,e&=~i}}function sp(t){if(et&6)throw Error(pe(327));ws();var e=_l(t,0);if(!(e&1))return ln(t,St()),null;var n=Ol(t,e);if(t.tag!==0&&n===2){var i=Yu(t);i!==0&&(e=i,n=Sd(t,i))}if(n===1)throw n=Wo,xr(t,0),Di(t,e),ln(t,St()),n;if(n===6)throw Error(pe(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,lr(t,rn,di),ln(t,St()),null}function bh(t,e){var n=et;et|=1;try{return t(e)}finally{et=n,et===0&&(Is=St()+500,Kl&&er())}}function Ar(t){Ui!==null&&Ui.tag===0&&!(et&6)&&ws();var e=et;et|=1;var n=Pn.transition,i=it;try{if(Pn.transition=null,it=1,t)return t()}finally{it=i,Pn.transition=n,et=e,!(et&6)&&er()}}function Th(){pn=ps.current,lt(ps)}function xr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,q_(n)),Tt!==null)for(n=Tt.return;n!==null;){var i=n;switch(oh(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&wl();break;case 3:Ns(),lt(on),lt(Yt),mh();break;case 5:ph(i);break;case 4:Ns();break;case 13:lt(dt);break;case 19:lt(dt);break;case 10:uh(i.type._context);break;case 22:case 23:Th()}n=n.return}if(Ut=t,Tt=t=Wi(t.current,null),zt=pn=e,Ct=0,Wo=null,Eh=tc=Tr=0,rn=_o=null,pr!==null){for(e=0;e<pr.length;e++)if(n=pr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}pr=null}return t}function Zg(t,e){do{var n=Tt;try{if(ch(),ll.current=Dl,Nl){for(var i=ft.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Nl=!1}if(br=0,Dt=At=ft=null,xo=!1,Vo=0,Mh.current=null,n===null||n.return===null){Ct=1,Wo=e,Tt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=zt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,f=u.tag;if(!(u.mode&1)&&(f===0||f===11||f===15)){var h=u.alternate;h?(u.updateQueue=h.updateQueue,u.memoizedState=h.memoizedState,u.lanes=h.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=Xf(o);if(p!==null){p.flags&=-257,Yf(p,o,a,s,e),p.mode&1&&Wf(s,c,e),e=p,l=c;var v=e.updateQueue;if(v===null){var y=new Set;y.add(l),e.updateQueue=y}else v.add(l);break e}else{if(!(e&1)){Wf(s,c,e),Ah();break e}l=Error(pe(426))}}else if(ct&&a.mode&1){var m=Xf(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Yf(m,o,a,s,e),ah(Ds(l,a));break e}}s=l=Ds(l,a),Ct!==4&&(Ct=2),_o===null?_o=[s]:_o.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=Dg(s,l,e);zf(s,d);break e;case 1:a=l;var _=s.type,x=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(Gi===null||!Gi.has(x)))){s.flags|=65536,e&=-e,s.lanes|=e;var S=Ig(s,a,e);zf(s,S);break e}}s=s.return}while(s!==null)}Qg(n)}catch(P){e=P,Tt===n&&n!==null&&(Tt=n=n.return);continue}break}while(!0)}function Kg(){var t=Il.current;return Il.current=Dl,t===null?Dl:t}function Ah(){(Ct===0||Ct===3||Ct===2)&&(Ct=4),Ut===null||!(Tr&268435455)&&!(tc&268435455)||Di(Ut,zt)}function Ol(t,e){var n=et;et|=2;var i=Kg();(Ut!==t||zt!==e)&&(di=null,xr(t,e));do try{yy();break}catch(r){Zg(t,r)}while(!0);if(ch(),et=n,Il.current=i,Tt!==null)throw Error(pe(261));return Ut=null,zt=0,Ct}function yy(){for(;Tt!==null;)Jg(Tt)}function Sy(){for(;Tt!==null&&!Xv();)Jg(Tt)}function Jg(t){var e=tx(t.alternate,t,pn);t.memoizedProps=t.pendingProps,e===null?Qg(t):Tt=e,Mh.current=null}function Qg(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=py(n,e),n!==null){n.flags&=32767,Tt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ct=6,Tt=null;return}}else if(n=fy(n,e,pn),n!==null){Tt=n;return}if(e=e.sibling,e!==null){Tt=e;return}Tt=e=t}while(e!==null);Ct===0&&(Ct=5)}function lr(t,e,n){var i=it,r=Pn.transition;try{Pn.transition=null,it=1,My(t,e,n,i)}finally{Pn.transition=r,it=i}return null}function My(t,e,n,i){do ws();while(Ui!==null);if(et&6)throw Error(pe(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(pe(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(n_(t,s),t===Ut&&(Tt=Ut=null,zt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ma||(Ma=!0,nx(vl,function(){return ws(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Pn.transition,Pn.transition=null;var o=it;it=1;var a=et;et|=4,Mh.current=null,gy(t,n),Yg(n,t),V_(Qu),yl=!!Ju,Qu=Ju=null,t.current=n,xy(n),Yv(),et=a,it=o,Pn.transition=s}else t.current=n;if(Ma&&(Ma=!1,Ui=t,kl=r),s=t.pendingLanes,s===0&&(Gi=null),Zv(n.stateNode),ln(t,St()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Ul)throw Ul=!1,t=_d,_d=null,t;return kl&1&&t.tag!==0&&ws(),s=t.pendingLanes,s&1?t===yd?yo++:(yo=0,yd=t):yo=0,er(),null}function ws(){if(Ui!==null){var t=D0(kl),e=Pn.transition,n=it;try{if(Pn.transition=null,it=16>t?16:t,Ui===null)var i=!1;else{if(t=Ui,Ui=null,kl=0,et&6)throw Error(pe(331));var r=et;for(et|=4,Re=t.current;Re!==null;){var s=Re,o=s.child;if(Re.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(Re=c;Re!==null;){var u=Re;switch(u.tag){case 0:case 11:case 15:vo(8,u,s)}var f=u.child;if(f!==null)f.return=u,Re=f;else for(;Re!==null;){u=Re;var h=u.sibling,p=u.return;if(jg(u),u===c){Re=null;break}if(h!==null){h.return=p,Re=h;break}Re=p}}}var v=s.alternate;if(v!==null){var y=v.child;if(y!==null){v.child=null;do{var m=y.sibling;y.sibling=null,y=m}while(y!==null)}}Re=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Re=o;else e:for(;Re!==null;){if(s=Re,s.flags&2048)switch(s.tag){case 0:case 11:case 15:vo(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,Re=d;break e}Re=s.return}}var _=t.current;for(Re=_;Re!==null;){o=Re;var x=o.child;if(o.subtreeFlags&2064&&x!==null)x.return=o,Re=x;else e:for(o=_;Re!==null;){if(a=Re,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:ec(9,a)}}catch(P){vt(a,a.return,P)}if(a===o){Re=null;break e}var S=a.sibling;if(S!==null){S.return=a.return,Re=S;break e}Re=a.return}}if(et=r,er(),ei&&typeof ei.onPostCommitFiberRoot=="function")try{ei.onPostCommitFiberRoot(Xl,t)}catch{}i=!0}return i}finally{it=n,Pn.transition=e}}return!1}function op(t,e,n){e=Ds(n,e),e=Dg(t,e,1),t=Vi(t,e,1),e=en(),t!==null&&(ea(t,1,e),ln(t,e))}function vt(t,e,n){if(t.tag===3)op(t,t,n);else for(;e!==null;){if(e.tag===3){op(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Gi===null||!Gi.has(i))){t=Ds(n,t),t=Ig(e,t,1),e=Vi(e,t,1),t=en(),e!==null&&(ea(e,1,t),ln(e,t));break}}e=e.return}}function Ey(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=en(),t.pingedLanes|=t.suspendedLanes&n,Ut===t&&(zt&n)===n&&(Ct===4||Ct===3&&(zt&130023424)===zt&&500>St()-wh?xr(t,0):Eh|=n),ln(t,e)}function ex(t,e){e===0&&(t.mode&1?(e=ha,ha<<=1,!(ha&130023424)&&(ha=4194304)):e=1);var n=en();t=_i(t,e),t!==null&&(ea(t,e,n),ln(t,n))}function wy(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),ex(t,n)}function by(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(pe(314))}i!==null&&i.delete(e),ex(t,n)}var tx;tx=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||on.current)sn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return sn=!1,hy(t,e,n);sn=!!(t.flags&131072)}else sn=!1,ct&&e.flags&1048576&&sg(e,Al,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;ul(t,e),t=e.pendingProps;var r=Rs(e,Yt.current);Es(e,n),r=xh(null,e,i,t,r,n);var s=vh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,an(i)?(s=!0,bl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,hh(e),r.updater=Ql,e.stateNode=r,r._reactInternals=e,ld(e,i,t,n),e=dd(null,e,i,!0,s,n)):(e.tag=0,ct&&s&&sh(e),Kt(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(ul(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=Ay(i),t=Fn(i,t),r){case 0:e=ud(null,e,i,t,n);break e;case 1:e=Zf(null,e,i,t,n);break e;case 11:e=$f(null,e,i,t,n);break e;case 14:e=qf(null,e,i,Fn(i.type,t),n);break e}throw Error(pe(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Fn(i,r),ud(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Fn(i,r),Zf(t,e,i,r,n);case 3:e:{if(Fg(e),t===null)throw Error(pe(387));i=e.pendingProps,s=e.memoizedState,r=s.element,dg(t,e),Pl(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Ds(Error(pe(423)),e),e=Kf(t,e,i,n,r);break e}else if(i!==r){r=Ds(Error(pe(424)),e),e=Kf(t,e,i,n,r);break e}else for(mn=Hi(e.stateNode.containerInfo.firstChild),gn=e,ct=!0,Bn=null,n=cg(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ps(),i===r){e=yi(t,e,n);break e}Kt(t,e,i,n)}e=e.child}return e;case 5:return hg(e),t===null&&sd(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,ed(i,r)?o=null:s!==null&&ed(i,s)&&(e.flags|=32),Og(t,e),Kt(t,e,o,n),e.child;case 6:return t===null&&sd(e),null;case 13:return zg(t,e,n);case 4:return fh(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Ls(e,null,i,n):Kt(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Fn(i,r),$f(t,e,i,r,n);case 7:return Kt(t,e,e.pendingProps,n),e.child;case 8:return Kt(t,e,e.pendingProps.children,n),e.child;case 12:return Kt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,st(Cl,i._currentValue),i._currentValue=o,s!==null)if(Wn(s.value,o)){if(s.children===r.children&&!on.current){e=yi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=gi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),od(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(pe(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),od(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Kt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Es(e,n),r=Ln(r),i=i(r),e.flags|=1,Kt(t,e,i,n),e.child;case 14:return i=e.type,r=Fn(i,e.pendingProps),r=Fn(i.type,r),qf(t,e,i,r,n);case 15:return Ug(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Fn(i,r),ul(t,e),e.tag=1,an(i)?(t=!0,bl(e)):t=!1,Es(e,n),Ng(e,i,r),ld(e,i,r,n),dd(null,e,i,!0,t,n);case 19:return Bg(t,e,n);case 22:return kg(t,e,n)}throw Error(pe(156,e.tag))};function nx(t,e){return R0(t,e)}function Ty(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Rn(t,e,n,i){return new Ty(t,e,n,i)}function Ch(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Ay(t){if(typeof t=="function")return Ch(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Yd)return 11;if(t===$d)return 14}return 2}function Wi(t,e){var n=t.alternate;return n===null?(n=Rn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function fl(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Ch(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case rs:return vr(n.children,r,s,e);case Xd:o=8,r|=8;break;case Nu:return t=Rn(12,n,e,r|2),t.elementType=Nu,t.lanes=s,t;case Du:return t=Rn(13,n,e,r),t.elementType=Du,t.lanes=s,t;case Iu:return t=Rn(19,n,e,r),t.elementType=Iu,t.lanes=s,t;case h0:return nc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case u0:o=10;break e;case d0:o=9;break e;case Yd:o=11;break e;case $d:o=14;break e;case Ri:o=16,i=null;break e}throw Error(pe(130,t==null?t:typeof t,""))}return e=Rn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function vr(t,e,n,i){return t=Rn(7,t,i,e),t.lanes=n,t}function nc(t,e,n,i){return t=Rn(22,t,i,e),t.elementType=h0,t.lanes=n,t.stateNode={isHidden:!1},t}function Vc(t,e,n){return t=Rn(6,t,null,e),t.lanes=n,t}function Gc(t,e,n){return e=Rn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Cy(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ec(0),this.expirationTimes=Ec(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ec(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Rh(t,e,n,i,r,s,o,a,l){return t=new Cy(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Rn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},hh(s),t}function Ry(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:is,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function ix(t){if(!t)return Zi;t=t._reactInternals;e:{if(Dr(t)!==t||t.tag!==1)throw Error(pe(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(an(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(pe(171))}if(t.tag===1){var n=t.type;if(an(n))return ig(t,n,e)}return e}function rx(t,e,n,i,r,s,o,a,l){return t=Rh(n,i,!0,t,r,s,o,a,l),t.context=ix(null),n=t.current,i=en(),r=ji(n),s=gi(i,r),s.callback=e??null,Vi(n,s,r),t.current.lanes=r,ea(t,r,i),ln(t,i),t}function ic(t,e,n,i){var r=e.current,s=en(),o=ji(r);return n=ix(n),e.context===null?e.context=n:e.pendingContext=n,e=gi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Vi(r,e,o),t!==null&&(jn(t,r,o,s),al(t,r,o)),o}function Fl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function ap(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Ph(t,e){ap(t,e),(t=t.alternate)&&ap(t,e)}function Py(){return null}var sx=typeof reportError=="function"?reportError:function(t){console.error(t)};function Lh(t){this._internalRoot=t}rc.prototype.render=Lh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(pe(409));ic(t,e,null,null)};rc.prototype.unmount=Lh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Ar(function(){ic(null,t,null,null)}),e[vi]=null}};function rc(t){this._internalRoot=t}rc.prototype.unstable_scheduleHydration=function(t){if(t){var e=k0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Ni.length&&e!==0&&e<Ni[n].priority;n++);Ni.splice(n,0,t),n===0&&F0(t)}};function Nh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function sc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function lp(){}function Ly(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Fl(o);s.call(c)}}var o=rx(e,i,t,0,null,!1,!1,"",lp);return t._reactRootContainer=o,t[vi]=o.current,Oo(t.nodeType===8?t.parentNode:t),Ar(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Fl(l);a.call(c)}}var l=Rh(t,0,!1,null,null,!1,!1,"",lp);return t._reactRootContainer=l,t[vi]=l.current,Oo(t.nodeType===8?t.parentNode:t),Ar(function(){ic(e,l,n,i)}),l}function oc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Fl(o);a.call(l)}}ic(e,o,t,r)}else o=Ly(n,e,t,r,i);return Fl(o)}I0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=ao(e.pendingLanes);n!==0&&(Kd(e,n|1),ln(e,St()),!(et&6)&&(Is=St()+500,er()))}break;case 13:Ar(function(){var i=_i(t,1);if(i!==null){var r=en();jn(i,t,1,r)}}),Ph(t,1)}};Jd=function(t){if(t.tag===13){var e=_i(t,134217728);if(e!==null){var n=en();jn(e,t,134217728,n)}Ph(t,134217728)}};U0=function(t){if(t.tag===13){var e=ji(t),n=_i(t,e);if(n!==null){var i=en();jn(n,t,e,i)}Ph(t,e)}};k0=function(){return it};O0=function(t,e){var n=it;try{return it=t,e()}finally{it=n}};ju=function(t,e,n){switch(e){case"input":if(Ou(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Zl(i);if(!r)throw Error(pe(90));p0(i),Ou(i,r)}}}break;case"textarea":g0(t,n);break;case"select":e=n.value,e!=null&&_s(t,!!n.multiple,e,!1)}};E0=bh;w0=Ar;var Ny={usingClientEntryPoint:!1,Events:[na,ls,Zl,S0,M0,bh]},eo={findFiberByHostInstance:fr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Dy={bundleType:eo.bundleType,version:eo.version,rendererPackageName:eo.rendererPackageName,rendererConfig:eo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Mi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=A0(t),t===null?null:t.stateNode},findFiberByHostInstance:eo.findFiberByHostInstance||Py,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ea=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ea.isDisabled&&Ea.supportsFiber)try{Xl=Ea.inject(Dy),ei=Ea}catch{}}vn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ny;vn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Nh(e))throw Error(pe(200));return Ry(t,e,null,n)};vn.createRoot=function(t,e){if(!Nh(t))throw Error(pe(299));var n=!1,i="",r=sx;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Rh(t,1,!1,null,null,n,!1,i,r),t[vi]=e.current,Oo(t.nodeType===8?t.parentNode:t),new Lh(e)};vn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(pe(188)):(t=Object.keys(t).join(","),Error(pe(268,t)));return t=A0(e),t=t===null?null:t.stateNode,t};vn.flushSync=function(t){return Ar(t)};vn.hydrate=function(t,e,n){if(!sc(e))throw Error(pe(200));return oc(null,t,e,!0,n)};vn.hydrateRoot=function(t,e,n){if(!Nh(t))throw Error(pe(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=sx;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=rx(e,null,t,1,n??null,r,!1,s,o),t[vi]=e.current,Oo(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new rc(e)};vn.render=function(t,e,n){if(!sc(e))throw Error(pe(200));return oc(null,t,e,!1,n)};vn.unmountComponentAtNode=function(t){if(!sc(t))throw Error(pe(40));return t._reactRootContainer?(Ar(function(){oc(null,null,t,!1,function(){t._reactRootContainer=null,t[vi]=null})}),!0):!1};vn.unstable_batchedUpdates=bh;vn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!sc(n))throw Error(pe(200));if(t==null||t._reactInternals===void 0)throw Error(pe(38));return oc(t,e,n,!1,i)};vn.version="18.3.1-next-f1338f8080-20240426";function ox(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ox)}catch(t){console.error(t)}}ox(),o0.exports=vn;var Iy=o0.exports,cp=Iy;Pu.createRoot=cp.createRoot,Pu.hydrateRoot=cp.hydrateRoot;/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Uy={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ky=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),tt=(t,e)=>{const n=Ze.forwardRef(({color:i="currentColor",size:r=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:a="",children:l,...c},u)=>Ze.createElement("svg",{ref:u,...Uy,width:r,height:r,stroke:i,strokeWidth:o?Number(s)*24/Number(r):s,className:["lucide",`lucide-${ky(t)}`,a].join(" "),...c},[...e.map(([f,h])=>Ze.createElement(f,h)),...Array.isArray(l)?l:[l]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oy=tt("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fy=tt("Archive",[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1",key:"1wp1u1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",key:"1s80jp"}],["path",{d:"M10 12h4",key:"a56b0p"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zy=tt("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ax=tt("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const So=tt("Box",[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lx=tt("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const By=tt("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hy=tt("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vy=tt("CircleDot",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cx=tt("Compass",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76",key:"m9r19z"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gy=tt("Cone",[["path",{d:"m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98",key:"53pte7"}],["ellipse",{cx:"12",cy:"19",rx:"9",ry:"3",key:"1ji25f"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jy=tt("CornerDownRight",[["polyline",{points:"15 10 20 15 15 20",key:"1q7qjw"}],["path",{d:"M4 4v7a4 4 0 0 0 4 4h12",key:"z08zvw"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wy=tt("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xy=tt("Hexagon",[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",key:"yt0hxn"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yy=tt("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $y=tt("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const up=tt("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ed=tt("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qy=tt("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zy=tt("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ky=tt("Pyramid",[["path",{d:"M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z",key:"aenxs0"}],["path",{d:"M12 2v20",key:"t6zp3m"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dp=tt("Rotate3d",[["path",{d:"M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2",key:"10n0gc"}],["path",{d:"m15.194 13.707 3.814 1.86-1.86 3.814",key:"16shm9"}],["path",{d:"M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4",key:"1lxi77"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dh=tt("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jy=tt("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hp=tt("Sliders",[["line",{x1:"4",x2:"4",y1:"21",y2:"14",key:"1p332r"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3",key:"gb41h5"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12",key:"hf2csr"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3",key:"1kfi7u"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16",key:"1lhrwl"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3",key:"16vvfq"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14",key:"1uebub"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8",key:"1yglbp"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16",key:"1jxqpz"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ux=tt("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qy=tt("Spline",[["circle",{cx:"19",cy:"5",r:"2",key:"mhkx31"}],["circle",{cx:"5",cy:"19",r:"2",key:"v8kfzx"}],["path",{d:"M5 17A12 12 0 0 1 17 5",key:"1okkup"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eS=tt("SplitSquareVertical",[["path",{d:"M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3",key:"1pi83i"}],["path",{d:"M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3",key:"ido5k7"}],["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wd=tt("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tS=tt("Triangle",[["path",{d:"M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"14u9p9"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jc=tt("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nS=tt("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dx=tt("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),iS=({solidName:t,dimensions:e,theme:n,onToggleTheme:i,onOpenTheory:r,onOpenQuiz:s,onExportSheet:o,isExporting:a})=>{const l=n==="blueprint",c=()=>{const u=document.createElement("a");u.href="./orthoview3d-source-code.zip",u.download="orthoview3d-source-code.zip",document.body.appendChild(u),u.click(),document.body.removeChild(u)};return g.jsxs("header",{className:`h-14 px-4 border-b flex items-center justify-between select-none transition-colors duration-200 z-40 ${l?"bg-[#0b0f19] border-slate-800 text-slate-100":"bg-white border-slate-200 text-slate-800"}`,children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("div",{className:"w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-sky-500/20",children:g.jsx(So,{className:"w-5 h-5 text-white"})}),g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsxs("span",{className:"font-bold text-base tracking-tight font-mono",children:["Ortho",g.jsx("span",{className:"text-sky-400",children:"View"}),"3D"]}),g.jsx("span",{className:`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase font-semibold ${l?"bg-sky-950/80 text-sky-400 border-sky-800/80":"bg-blue-50 text-blue-700 border-blue-200"}`,children:"1st Angle Proj"})]}),g.jsx("div",{className:"text-[10px] text-slate-400 font-mono -mt-0.5 hidden sm:block",children:"Engineering Graphics & Design • ISO 128 / BIS SP:46:2003"})]})]}),g.jsxs("div",{className:"hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-slate-700/60",children:[g.jsx("span",{className:"text-xs font-mono text-slate-400",children:"Solid:"}),g.jsx("span",{className:"text-xs font-mono font-bold text-sky-400",children:t}),g.jsxs("span",{className:"text-[11px] font-mono text-slate-500",children:["(",e.length,"×",e.width,"×",e.height,"mm)"]})]})]}),g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsxs("button",{onClick:r,className:`px-3 py-1.5 text-xs font-mono rounded-lg border flex items-center gap-1.5 transition-all ${l?"bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-sky-500/50":"bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"}`,children:[g.jsx(ax,{className:"w-3.5 h-3.5 text-sky-400"}),g.jsx("span",{className:"hidden sm:inline",children:"1st Angle"})," Theory"]}),g.jsxs("button",{onClick:s,className:`px-3 py-1.5 text-xs font-mono rounded-lg border flex items-center gap-1.5 transition-all ${l?"bg-amber-950/30 hover:bg-amber-950/60 text-amber-300 border-amber-800/50":"bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200"}`,children:[g.jsx(ux,{className:"w-3.5 h-3.5 text-amber-400"}),g.jsx("span",{className:"hidden sm:inline",children:"Practice"})," Quiz"]}),g.jsx("button",{onClick:i,title:l?"Switch to Drawing Sheet Theme (Light)":"Switch to CAD Blueprint Theme (Dark)",className:`p-2 rounded-lg border transition-all ${l?"bg-slate-900 hover:bg-slate-800 text-amber-400 border-slate-700":"bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"}`,children:l?g.jsx(wd,{className:"w-4 h-4"}):g.jsx(Ed,{className:"w-4 h-4"})}),g.jsxs("button",{onClick:c,title:"Download Complete Source Code as ZIP",className:`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border flex items-center gap-1.5 transition-all ${l?"bg-emerald-950/40 hover:bg-emerald-950/70 text-emerald-300 border-emerald-700/60 shadow-sm":"bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300"}`,children:[g.jsx(Fy,{className:"w-3.5 h-3.5 text-emerald-400"}),g.jsx("span",{className:"hidden md:inline",children:"Download"})," ZIP"]}),g.jsxs("button",{onClick:o,disabled:a,className:"px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 shadow-md shadow-sky-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer",children:[g.jsx(Wy,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:a?"Exporting...":"Export Sheet (PNG)"})]})]})]})};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ih="160",Or={ROTATE:0,DOLLY:1,PAN:2},Fr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},rS=0,fp=1,sS=2,hx=1,fx=2,ui=3,Ki=0,cn=1,An=2,Xi=0,bs=1,pp=2,mp=3,gp=4,oS=5,ur=100,aS=101,lS=102,xp=103,vp=104,cS=200,uS=201,dS=202,hS=203,bd=204,Td=205,fS=206,pS=207,mS=208,gS=209,xS=210,vS=211,_S=212,yS=213,SS=214,MS=0,ES=1,wS=2,Xo=3,bS=4,TS=5,Uh=6,AS=7,px=0,CS=1,RS=2,Yi=0,PS=1,LS=2,NS=3,mx=4,DS=5,IS=6,gx=300,Us=301,ks=302,Ad=303,Cd=304,ac=306,Rd=1e3,Hn=1001,Pd=1002,Jt=1003,_p=1004,Wc=1005,wn=1006,US=1007,Yo=1008,$i=1009,kS=1010,OS=1011,kh=1012,xx=1013,ki=1014,Oi=1015,$o=1016,vx=1017,_x=1018,_r=1020,FS=1021,Vn=1023,zS=1024,BS=1025,yr=1026,Os=1027,HS=1028,yx=1029,VS=1030,Sx=1031,Mx=1033,Xc=33776,Yc=33777,$c=33778,qc=33779,yp=35840,Sp=35841,Mp=35842,Ep=35843,Ex=36196,wp=37492,bp=37496,Tp=37808,Ap=37809,Cp=37810,Rp=37811,Pp=37812,Lp=37813,Np=37814,Dp=37815,Ip=37816,Up=37817,kp=37818,Op=37819,Fp=37820,zp=37821,Zc=36492,Bp=36494,Hp=36495,GS=36283,Vp=36284,Gp=36285,jp=36286,wx=3e3,Sr=3001,jS=3200,WS=3201,bx=0,XS=1,Cn="",Ft="srgb",Si="srgb-linear",Oh="display-p3",lc="display-p3-linear",zl="linear",at="srgb",Bl="rec709",Hl="p3",zr=7680,Wp=519,YS=512,$S=513,qS=514,Tx=515,ZS=516,KS=517,JS=518,QS=519,Xp=35044,Yp="300 es",Ld=1035,mi=2e3,Vl=2001;class Ir{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let $p=1234567;const Ts=Math.PI/180,qo=180/Math.PI;function Ur(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(jt[t&255]+jt[t>>8&255]+jt[t>>16&255]+jt[t>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[n&63|128]+jt[n>>8&255]+"-"+jt[n>>16&255]+jt[n>>24&255]+jt[i&255]+jt[i>>8&255]+jt[i>>16&255]+jt[i>>24&255]).toLowerCase()}function bt(t,e,n){return Math.max(e,Math.min(n,t))}function Fh(t,e){return(t%e+e)%e}function e1(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function t1(t,e,n){return t!==e?(n-t)/(e-t):0}function Mo(t,e,n){return(1-n)*t+n*e}function n1(t,e,n,i){return Mo(t,e,1-Math.exp(-n*i))}function i1(t,e=1){return e-Math.abs(Fh(t,e*2)-e)}function r1(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function s1(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function o1(t,e){return t+Math.floor(Math.random()*(e-t+1))}function a1(t,e){return t+Math.random()*(e-t)}function l1(t){return t*(.5-Math.random())}function c1(t){t!==void 0&&($p=t);let e=$p+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function u1(t){return t*Ts}function d1(t){return t*qo}function Nd(t){return(t&t-1)===0&&t!==0}function h1(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function Gl(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function f1(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),c=s((e+i)/2),u=o((e+i)/2),f=s((e-i)/2),h=o((e-i)/2),p=s((i-e)/2),v=o((i-e)/2);switch(r){case"XYX":t.set(a*u,l*f,l*h,a*c);break;case"YZY":t.set(l*h,a*u,l*f,a*c);break;case"ZXZ":t.set(l*f,l*h,a*u,a*c);break;case"XZX":t.set(a*u,l*v,l*p,a*c);break;case"YXY":t.set(l*p,a*u,l*v,a*c);break;case"ZYZ":t.set(l*v,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ts(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function qt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const Mr={DEG2RAD:Ts,RAD2DEG:qo,generateUUID:Ur,clamp:bt,euclideanModulo:Fh,mapLinear:e1,inverseLerp:t1,lerp:Mo,damp:n1,pingpong:i1,smoothstep:r1,smootherstep:s1,randInt:o1,randFloat:a1,randFloatSpread:l1,seededRandom:c1,degToRad:u1,radToDeg:d1,isPowerOfTwo:Nd,ceilPowerOfTwo:h1,floorPowerOfTwo:Gl,setQuaternionFromProperEuler:f1,normalize:qt,denormalize:ts};class de{constructor(e=0,n=0){de.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qe{constructor(e,n,i,r,s,o,a,l,c){qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],p=i[5],v=i[8],y=r[0],m=r[3],d=r[6],_=r[1],x=r[4],S=r[7],P=r[2],w=r[5],T=r[8];return s[0]=o*y+a*_+l*P,s[3]=o*m+a*x+l*w,s[6]=o*d+a*S+l*T,s[1]=c*y+u*_+f*P,s[4]=c*m+u*x+f*w,s[7]=c*d+u*S+f*T,s[2]=h*y+p*_+v*P,s[5]=h*m+p*x+v*w,s[8]=h*d+p*S+v*T,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*o*u-n*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,h=a*l-u*s,p=c*s-o*l,v=n*f+i*h+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/v;return e[0]=f*y,e[1]=(r*c-u*i)*y,e[2]=(a*i-r*o)*y,e[3]=h*y,e[4]=(u*n-r*l)*y,e[5]=(r*s-a*n)*y,e[6]=p*y,e[7]=(i*l-c*n)*y,e[8]=(o*n-i*s)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Kc.makeScale(e,n)),this}rotate(e){return this.premultiply(Kc.makeRotation(-e)),this}translate(e,n){return this.premultiply(Kc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Kc=new qe;function Ax(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function jl(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function p1(){const t=jl("canvas");return t.style.display="block",t}const qp={};function Eo(t){t in qp||(qp[t]=!0,console.warn(t))}const Zp=new qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Kp=new qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),wa={[Si]:{transfer:zl,primaries:Bl,toReference:t=>t,fromReference:t=>t},[Ft]:{transfer:at,primaries:Bl,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[lc]:{transfer:zl,primaries:Hl,toReference:t=>t.applyMatrix3(Kp),fromReference:t=>t.applyMatrix3(Zp)},[Oh]:{transfer:at,primaries:Hl,toReference:t=>t.convertSRGBToLinear().applyMatrix3(Kp),fromReference:t=>t.applyMatrix3(Zp).convertLinearToSRGB()}},m1=new Set([Si,lc]),rt={enabled:!0,_workingColorSpace:Si,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!m1.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=wa[e].toReference,r=wa[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return wa[t].primaries},getTransfer:function(t){return t===Cn?zl:wa[t].transfer}};function As(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Jc(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Br;class Cx{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Br===void 0&&(Br=jl("canvas")),Br.width=e.width,Br.height=e.height;const i=Br.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Br}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=jl("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=As(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(As(n[i]/255)*255):n[i]=As(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let g1=0;class Rx{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:g1++}),this.uuid=Ur(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Qc(r[o].image)):s.push(Qc(r[o]))}else s=Qc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Qc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?Cx.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let x1=0;class un extends Ir{constructor(e=un.DEFAULT_IMAGE,n=un.DEFAULT_MAPPING,i=Hn,r=Hn,s=wn,o=Yo,a=Vn,l=$i,c=un.DEFAULT_ANISOTROPY,u=Cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:x1++}),this.uuid=Ur(),this.name="",this.source=new Rx(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Eo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Sr?Ft:Cn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gx)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rd:e.x=e.x-Math.floor(e.x);break;case Hn:e.x=e.x<0?0:1;break;case Pd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rd:e.y=e.y-Math.floor(e.y);break;case Hn:e.y=e.y<0?0:1;break;case Pd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Eo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ft?Sr:wx}set encoding(e){Eo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Sr?Ft:Cn}}un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=gx;un.DEFAULT_ANISOTROPY=1;class It{constructor(e=0,n=0,i=0,r=1){It.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],v=l[9],y=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-y)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+y)<.1&&Math.abs(v+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const x=(c+1)/2,S=(p+1)/2,P=(d+1)/2,w=(u+h)/4,T=(f+y)/4,O=(v+m)/4;return x>S&&x>P?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=w/i,s=T/i):S>P?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=w/r,s=O/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=T/s,r=O/s),this.set(i,r,s,n),this}let _=Math.sqrt((m-v)*(m-v)+(f-y)*(f-y)+(h-u)*(h-u));return Math.abs(_)<.001&&(_=1),this.x=(m-v)/_,this.y=(f-y)/_,this.z=(h-u)/_,this.w=Math.acos((c+p+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class v1 extends Ir{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new It(0,0,e,n),this.scissorTest=!1,this.viewport=new It(0,0,e,n);const r={width:e,height:n,depth:1};i.encoding!==void 0&&(Eo("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Sr?Ft:Cn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new un(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,n,i=1){(this.width!==e||this.height!==n||this.depth!==i)&&(this.width=e,this.height=n,this.depth=i,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Rx(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Cr extends v1{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Px extends un{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _1 extends un{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rr{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const h=s[o+0],p=s[o+1],v=s[o+2],y=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=f;return}if(a===1){e[n+0]=h,e[n+1]=p,e[n+2]=v,e[n+3]=y;return}if(f!==y||l!==h||c!==p||u!==v){let m=1-a;const d=l*h+c*p+u*v+f*y,_=d>=0?1:-1,x=1-d*d;if(x>Number.EPSILON){const P=Math.sqrt(x),w=Math.atan2(P,d*_);m=Math.sin(m*w)/P,a=Math.sin(a*w)/P}const S=a*_;if(l=l*m+h*S,c=c*m+p*S,u=u*m+v*S,f=f*m+y*S,m===1-a){const P=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=P,c*=P,u*=P,f*=P}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],h=s[o+1],p=s[o+2],v=s[o+3];return e[n]=a*v+u*f+l*p-c*h,e[n+1]=l*v+u*h+c*f-a*p,e[n+2]=c*v+u*p+a*h-l*f,e[n+3]=u*v-a*f-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),h=l(i/2),p=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*p*v,this._y=c*p*f-h*u*v,this._z=c*u*v+h*p*f,this._w=c*u*f-h*p*v;break;case"YXZ":this._x=h*u*f+c*p*v,this._y=c*p*f-h*u*v,this._z=c*u*v-h*p*f,this._w=c*u*f+h*p*v;break;case"ZXY":this._x=h*u*f-c*p*v,this._y=c*p*f+h*u*v,this._z=c*u*v+h*p*f,this._w=c*u*f-h*p*v;break;case"ZYX":this._x=h*u*f-c*p*v,this._y=c*p*f+h*u*v,this._z=c*u*v-h*p*f,this._w=c*u*f+h*p*v;break;case"YZX":this._x=h*u*f+c*p*v,this._y=c*p*f+h*u*v,this._z=c*u*v-h*p*f,this._w=c*u*f-h*p*v;break;case"XZY":this._x=h*u*f-c*p*v,this._y=c*p*f-h*u*v,this._z=c*u*v+h*p*f,this._w=c*u*f+h*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],u=n[6],f=n[10],h=i+a+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(bt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-n)*u)/c,h=Math.sin(n*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=Math.random(),n=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(n*Math.cos(r),i*Math.sin(s),i*Math.cos(s),n*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,n=0,i=0){I.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Jp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Jp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*n-s*r),f=2*(s*i-o*n);return this.x=n+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return eu.copy(this).projectOnVector(e),this.sub(eu)}reflect(e){return this.sub(eu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(n),this.y=i*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const eu=new I,Jp=new Rr;class ra{constructor(e=new I(1/0,1/0,1/0),n=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(In.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(In.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=In.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,In):In.fromBufferAttribute(s,o),In.applyMatrix4(e.matrixWorld),this.expandByPoint(In);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ba.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ba.copy(i.boundingBox)),ba.applyMatrix4(e.matrixWorld),this.union(ba)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,In),In.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(to),Ta.subVectors(this.max,to),Hr.subVectors(e.a,to),Vr.subVectors(e.b,to),Gr.subVectors(e.c,to),wi.subVectors(Vr,Hr),bi.subVectors(Gr,Vr),ir.subVectors(Hr,Gr);let n=[0,-wi.z,wi.y,0,-bi.z,bi.y,0,-ir.z,ir.y,wi.z,0,-wi.x,bi.z,0,-bi.x,ir.z,0,-ir.x,-wi.y,wi.x,0,-bi.y,bi.x,0,-ir.y,ir.x,0];return!tu(n,Hr,Vr,Gr,Ta)||(n=[1,0,0,0,1,0,0,0,1],!tu(n,Hr,Vr,Gr,Ta))?!1:(Aa.crossVectors(wi,bi),n=[Aa.x,Aa.y,Aa.z],tu(n,Hr,Vr,Gr,Ta))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,In).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(In).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const si=[new I,new I,new I,new I,new I,new I,new I,new I],In=new I,ba=new ra,Hr=new I,Vr=new I,Gr=new I,wi=new I,bi=new I,ir=new I,to=new I,Ta=new I,Aa=new I,rr=new I;function tu(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){rr.fromArray(t,s);const a=r.x*Math.abs(rr.x)+r.y*Math.abs(rr.y)+r.z*Math.abs(rr.z),l=e.dot(rr),c=n.dot(rr),u=i.dot(rr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const y1=new ra,no=new I,nu=new I;class cc{constructor(e=new I,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):y1.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;no.subVectors(e,this.center);const n=no.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(no,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(nu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(no.copy(e.center).add(nu)),this.expandByPoint(no.copy(e.center).sub(nu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const oi=new I,iu=new I,Ca=new I,Ti=new I,ru=new I,Ra=new I,su=new I;class zh{constructor(e=new I,n=new I(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,oi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=oi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(oi.copy(this.origin).addScaledVector(this.direction,n),oi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){iu.copy(e).add(n).multiplyScalar(.5),Ca.copy(n).sub(e).normalize(),Ti.copy(this.origin).sub(iu);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Ca),a=Ti.dot(this.direction),l=-Ti.dot(Ca),c=Ti.lengthSq(),u=Math.abs(1-o*o);let f,h,p,v;if(u>0)if(f=o*l-a,h=o*a-l,v=s*u,f>=0)if(h>=-v)if(h<=v){const y=1/u;f*=y,h*=y,p=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h<=-v?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c):h<=v?(f=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(iu).addScaledVector(Ca,h),p}intersectSphere(e,n){oi.subVectors(e.center,this.origin);const i=oi.dot(this.direction),r=oi.dot(oi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,oi)!==null}intersectTriangle(e,n,i,r,s){ru.subVectors(n,e),Ra.subVectors(i,e),su.crossVectors(ru,Ra);let o=this.direction.dot(su),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ti.subVectors(this.origin,e);const l=a*this.direction.dot(Ra.crossVectors(Ti,Ra));if(l<0)return null;const c=a*this.direction.dot(ru.cross(Ti));if(c<0||l+c>o)return null;const u=-a*Ti.dot(su);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Mt{constructor(e,n,i,r,s,o,a,l,c,u,f,h,p,v,y,m){Mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,u,f,h,p,v,y,m)}set(e,n,i,r,s,o,a,l,c,u,f,h,p,v,y,m){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=v,d[11]=y,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Mt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/jr.setFromMatrixColumn(e,0).length(),s=1/jr.setFromMatrixColumn(e,1).length(),o=1/jr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,p=o*f,v=a*u,y=a*f;n[0]=l*u,n[4]=-l*f,n[8]=c,n[1]=p+v*c,n[5]=h-y*c,n[9]=-a*l,n[2]=y-h*c,n[6]=v+p*c,n[10]=o*l}else if(e.order==="YXZ"){const h=l*u,p=l*f,v=c*u,y=c*f;n[0]=h+y*a,n[4]=v*a-p,n[8]=o*c,n[1]=o*f,n[5]=o*u,n[9]=-a,n[2]=p*a-v,n[6]=y+h*a,n[10]=o*l}else if(e.order==="ZXY"){const h=l*u,p=l*f,v=c*u,y=c*f;n[0]=h-y*a,n[4]=-o*f,n[8]=v+p*a,n[1]=p+v*a,n[5]=o*u,n[9]=y-h*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const h=o*u,p=o*f,v=a*u,y=a*f;n[0]=l*u,n[4]=v*c-p,n[8]=h*c+y,n[1]=l*f,n[5]=y*c+h,n[9]=p*c-v,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*c,v=a*l,y=a*c;n[0]=l*u,n[4]=y-h*f,n[8]=v*f+p,n[1]=f,n[5]=o*u,n[9]=-a*u,n[2]=-c*u,n[6]=p*f+v,n[10]=h-y*f}else if(e.order==="XZY"){const h=o*l,p=o*c,v=a*l,y=a*c;n[0]=l*u,n[4]=-f,n[8]=c*u,n[1]=h*f+y,n[5]=o*u,n[9]=p*f-v,n[2]=v*f-p,n[6]=a*u,n[10]=y*f+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(S1,e,M1)}lookAt(e,n,i){const r=this.elements;return hn.subVectors(e,n),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),Ai.crossVectors(i,hn),Ai.lengthSq()===0&&(Math.abs(i.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),Ai.crossVectors(i,hn)),Ai.normalize(),Pa.crossVectors(hn,Ai),r[0]=Ai.x,r[4]=Pa.x,r[8]=hn.x,r[1]=Ai.y,r[5]=Pa.y,r[9]=hn.y,r[2]=Ai.z,r[6]=Pa.z,r[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],p=i[13],v=i[2],y=i[6],m=i[10],d=i[14],_=i[3],x=i[7],S=i[11],P=i[15],w=r[0],T=r[4],O=r[8],E=r[12],b=r[1],B=r[5],q=r[9],re=r[13],U=r[2],V=r[6],$=r[10],ne=r[14],F=r[3],G=r[7],C=r[11],R=r[15];return s[0]=o*w+a*b+l*U+c*F,s[4]=o*T+a*B+l*V+c*G,s[8]=o*O+a*q+l*$+c*C,s[12]=o*E+a*re+l*ne+c*R,s[1]=u*w+f*b+h*U+p*F,s[5]=u*T+f*B+h*V+p*G,s[9]=u*O+f*q+h*$+p*C,s[13]=u*E+f*re+h*ne+p*R,s[2]=v*w+y*b+m*U+d*F,s[6]=v*T+y*B+m*V+d*G,s[10]=v*O+y*q+m*$+d*C,s[14]=v*E+y*re+m*ne+d*R,s[3]=_*w+x*b+S*U+P*F,s[7]=_*T+x*B+S*V+P*G,s[11]=_*O+x*q+S*$+P*C,s[15]=_*E+x*re+S*ne+P*R,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],p=e[14],v=e[3],y=e[7],m=e[11],d=e[15];return v*(+s*l*f-r*c*f-s*a*h+i*c*h+r*a*p-i*l*p)+y*(+n*l*p-n*c*h+s*o*h-r*o*p+r*c*u-s*l*u)+m*(+n*c*f-n*a*p-s*o*f+i*o*p+s*a*u-i*c*u)+d*(-r*a*u-n*l*f+n*a*h+r*o*f-i*o*h+i*l*u)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],p=e[11],v=e[12],y=e[13],m=e[14],d=e[15],_=f*m*c-y*h*c+y*l*p-a*m*p-f*l*d+a*h*d,x=v*h*c-u*m*c-v*l*p+o*m*p+u*l*d-o*h*d,S=u*y*c-v*f*c+v*a*p-o*y*p-u*a*d+o*f*d,P=v*f*l-u*y*l-v*a*h+o*y*h+u*a*m-o*f*m,w=n*_+i*x+r*S+s*P;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/w;return e[0]=_*T,e[1]=(y*h*s-f*m*s-y*r*p+i*m*p+f*r*d-i*h*d)*T,e[2]=(a*m*s-y*l*s+y*r*c-i*m*c-a*r*d+i*l*d)*T,e[3]=(f*l*s-a*h*s-f*r*c+i*h*c+a*r*p-i*l*p)*T,e[4]=x*T,e[5]=(u*m*s-v*h*s+v*r*p-n*m*p-u*r*d+n*h*d)*T,e[6]=(v*l*s-o*m*s-v*r*c+n*m*c+o*r*d-n*l*d)*T,e[7]=(o*h*s-u*l*s+u*r*c-n*h*c-o*r*p+n*l*p)*T,e[8]=S*T,e[9]=(v*f*s-u*y*s-v*i*p+n*y*p+u*i*d-n*f*d)*T,e[10]=(o*y*s-v*a*s+v*i*c-n*y*c-o*i*d+n*a*d)*T,e[11]=(u*a*s-o*f*s-u*i*c+n*f*c+o*i*p-n*a*p)*T,e[12]=P*T,e[13]=(u*y*r-v*f*r+v*i*h-n*y*h-u*i*m+n*f*m)*T,e[14]=(v*a*r-o*y*r-v*i*l+n*y*l+o*i*m-n*a*m)*T,e[15]=(o*f*r-u*a*r+u*i*l-n*f*l-o*i*h+n*a*h)*T,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,u=o+o,f=a+a,h=s*c,p=s*u,v=s*f,y=o*u,m=o*f,d=a*f,_=l*c,x=l*u,S=l*f,P=i.x,w=i.y,T=i.z;return r[0]=(1-(y+d))*P,r[1]=(p+S)*P,r[2]=(v-x)*P,r[3]=0,r[4]=(p-S)*w,r[5]=(1-(h+d))*w,r[6]=(m+_)*w,r[7]=0,r[8]=(v+x)*T,r[9]=(m-_)*T,r[10]=(1-(h+y))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=jr.set(r[0],r[1],r[2]).length();const o=jr.set(r[4],r[5],r[6]).length(),a=jr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Un.copy(this);const c=1/s,u=1/o,f=1/a;return Un.elements[0]*=c,Un.elements[1]*=c,Un.elements[2]*=c,Un.elements[4]*=u,Un.elements[5]*=u,Un.elements[6]*=u,Un.elements[8]*=f,Un.elements[9]*=f,Un.elements[10]*=f,n.setFromRotationMatrix(Un),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=mi){const l=this.elements,c=2*s/(n-e),u=2*s/(i-r),f=(n+e)/(n-e),h=(i+r)/(i-r);let p,v;if(a===mi)p=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===Vl)p=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=mi){const l=this.elements,c=1/(n-e),u=1/(i-r),f=1/(o-s),h=(n+e)*c,p=(i+r)*u;let v,y;if(a===mi)v=(o+s)*f,y=-2*f;else if(a===Vl)v=s*f,y=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const jr=new I,Un=new Mt,S1=new I(0,0,0),M1=new I(1,1,1),Ai=new I,Pa=new I,hn=new I,Qp=new Mt,em=new Rr;class uc{constructor(e=0,n=0,i=0,r=uc.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-bt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(bt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-bt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(bt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Qp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qp,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return em.setFromEuler(this),this.setFromQuaternion(em,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}uc.DEFAULT_ORDER="XYZ";class Lx{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let E1=0;const tm=new I,Wr=new Rr,ai=new Mt,La=new I,io=new I,w1=new I,b1=new Rr,nm=new I(1,0,0),im=new I(0,1,0),rm=new I(0,0,1),T1={type:"added"},A1={type:"removed"};class kt extends Ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:E1++}),this.uuid=Ur(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kt.DEFAULT_UP.clone();const e=new I,n=new uc,i=new Rr,r=new I(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Mt},normalMatrix:{value:new qe}}),this.matrix=new Mt,this.matrixWorld=new Mt,this.matrixAutoUpdate=kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Wr.setFromAxisAngle(e,n),this.quaternion.multiply(Wr),this}rotateOnWorldAxis(e,n){return Wr.setFromAxisAngle(e,n),this.quaternion.premultiply(Wr),this}rotateX(e){return this.rotateOnAxis(nm,e)}rotateY(e){return this.rotateOnAxis(im,e)}rotateZ(e){return this.rotateOnAxis(rm,e)}translateOnAxis(e,n){return tm.copy(e).applyQuaternion(this.quaternion),this.position.add(tm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(nm,e)}translateY(e){return this.translateOnAxis(im,e)}translateZ(e){return this.translateOnAxis(rm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ai.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?La.copy(e):La.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),io.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ai.lookAt(io,La,this.up):ai.lookAt(La,io,this.up),this.quaternion.setFromRotationMatrix(ai),r&&(ai.extractRotation(r.matrixWorld),Wr.setFromRotationMatrix(ai),this.quaternion.premultiply(Wr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(T1)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(A1)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(ai),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,e,w1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,b1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),p=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}kt.DEFAULT_UP=new I(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const kn=new I,li=new I,ou=new I,ci=new I,Xr=new I,Yr=new I,sm=new I,au=new I,lu=new I,cu=new I;let Na=!1;class bn{constructor(e=new I,n=new I,i=new I){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),kn.subVectors(e,n),r.cross(kn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){kn.subVectors(r,n),li.subVectors(i,n),ou.subVectors(e,n);const o=kn.dot(kn),a=kn.dot(li),l=kn.dot(ou),c=li.dot(li),u=li.dot(ou),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,p=(c*l-a*u)*h,v=(o*u-a*l)*h;return s.set(1-p-v,v,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,ci)===null?!1:ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getUV(e,n,i,r,s,o,a,l){return Na===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Na=!0),this.getInterpolation(e,n,i,r,s,o,a,l)}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,ci)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ci.x),l.addScaledVector(o,ci.y),l.addScaledVector(a,ci.z),l)}static isFrontFacing(e,n,i,r){return kn.subVectors(i,n),li.subVectors(e,n),kn.cross(li).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kn.subVectors(this.c,this.b),li.subVectors(this.a,this.b),kn.cross(li).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return bn.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,i,r,s){return Na===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Na=!0),bn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}getInterpolation(e,n,i,r,s){return bn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Xr.subVectors(r,i),Yr.subVectors(s,i),au.subVectors(e,i);const l=Xr.dot(au),c=Yr.dot(au);if(l<=0&&c<=0)return n.copy(i);lu.subVectors(e,r);const u=Xr.dot(lu),f=Yr.dot(lu);if(u>=0&&f<=u)return n.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),n.copy(i).addScaledVector(Xr,o);cu.subVectors(e,s);const p=Xr.dot(cu),v=Yr.dot(cu);if(v>=0&&p<=v)return n.copy(s);const y=p*c-l*v;if(y<=0&&c>=0&&v<=0)return a=c/(c-v),n.copy(i).addScaledVector(Yr,a);const m=u*v-p*f;if(m<=0&&f-u>=0&&p-v>=0)return sm.subVectors(s,r),a=(f-u)/(f-u+(p-v)),n.copy(r).addScaledVector(sm,a);const d=1/(m+y+h);return o=y*d,a=h*d,n.copy(i).addScaledVector(Xr,o).addScaledVector(Yr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Nx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ci={h:0,s:0,l:0},Da={h:0,s:0,l:0};function uu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ye{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=rt.workingColorSpace){return this.r=e,this.g=n,this.b=i,rt.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=rt.workingColorSpace){if(e=Fh(e,1),n=bt(n,0,1),i=bt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=uu(o,s,e+1/3),this.g=uu(o,s,e),this.b=uu(o,s,e-1/3)}return rt.toWorkingColorSpace(this,r),this}setStyle(e,n=Ft){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Ft){const i=Nx[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=As(e.r),this.g=As(e.g),this.b=As(e.b),this}copyLinearToSRGB(e){return this.r=Jc(e.r),this.g=Jc(e.g),this.b=Jc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ft){return rt.fromWorkingColorSpace(Wt.copy(this),e),Math.round(bt(Wt.r*255,0,255))*65536+Math.round(bt(Wt.g*255,0,255))*256+Math.round(bt(Wt.b*255,0,255))}getHexString(e=Ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=rt.workingColorSpace){rt.fromWorkingColorSpace(Wt.copy(this),n);const i=Wt.r,r=Wt.g,s=Wt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=rt.workingColorSpace){return rt.fromWorkingColorSpace(Wt.copy(this),n),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=Ft){rt.fromWorkingColorSpace(Wt.copy(this),e);const n=Wt.r,i=Wt.g,r=Wt.b;return e!==Ft?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ci),this.setHSL(Ci.h+e,Ci.s+n,Ci.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ci),e.getHSL(Da);const i=Mo(Ci.h,Da.h,n),r=Mo(Ci.s,Da.s,n),s=Mo(Ci.l,Da.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new Ye;Ye.NAMES=Nx;let C1=0;class Gs extends Ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:C1++}),this.uuid=Ur(),this.name="",this.type="Material",this.blending=bs,this.side=Ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bd,this.blendDst=Td,this.blendEquation=ur,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=Xo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zr,this.stencilZFail=zr,this.stencilZPass=zr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==bs&&(i.blending=this.blending),this.side!==Ki&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==bd&&(i.blendSrc=this.blendSrc),this.blendDst!==Td&&(i.blendDst=this.blendDst),this.blendEquation!==ur&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Xo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==zr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==zr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class dc extends Gs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=px,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wt=new I,Ia=new de;class ni{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Xp,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ia.fromBufferAttribute(this,n),Ia.applyMatrix3(e),this.setXY(n,Ia.x,Ia.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyMatrix3(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyMatrix4(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyNormalMatrix(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.transformDirection(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ts(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=qt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ts(n,this.array)),n}setX(e,n){return this.normalized&&(n=qt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ts(n,this.array)),n}setY(e,n){return this.normalized&&(n=qt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ts(n,this.array)),n}setZ(e,n){return this.normalized&&(n=qt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ts(n,this.array)),n}setW(e,n){return this.normalized&&(n=qt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=qt(n,this.array),i=qt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=qt(n,this.array),i=qt(i,this.array),r=qt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=qt(n,this.array),i=qt(i,this.array),r=qt(r,this.array),s=qt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xp&&(e.usage=this.usage),e}}class Dx extends ni{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Ix extends ni{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class pt extends ni{constructor(e,n,i){super(new Float32Array(e),n,i)}}let R1=0;const Sn=new Mt,du=new kt,$r=new I,fn=new ra,ro=new ra,Nt=new I;class $t extends Ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:R1++}),this.uuid=Ur(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ax(e)?Ix:Dx)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new qe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,n,i){return Sn.makeTranslation(e,n,i),this.applyMatrix4(Sn),this}scale(e,n,i){return Sn.makeScale(e,n,i),this.applyMatrix4(Sn),this}lookAt(e){return du.lookAt(e),du.updateMatrix(),this.applyMatrix4(du.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($r).negate(),this.translate($r.x,$r.y,$r.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new pt(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ra);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];fn.setFromBufferAttribute(s),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new I,1/0);return}if(e){const i=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];ro.setFromBufferAttribute(a),this.morphTargetsRelative?(Nt.addVectors(fn.min,ro.min),fn.expandByPoint(Nt),Nt.addVectors(fn.max,ro.max),fn.expandByPoint(Nt)):(fn.expandByPoint(ro.min),fn.expandByPoint(ro.max))}fn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Nt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Nt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Nt.fromBufferAttribute(a,c),l&&($r.fromBufferAttribute(e,c),Nt.add($r)),r=Math.max(r,i.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=n.position.array,s=n.normal.array,o=n.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ni(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let b=0;b<a;b++)c[b]=new I,u[b]=new I;const f=new I,h=new I,p=new I,v=new de,y=new de,m=new de,d=new I,_=new I;function x(b,B,q){f.fromArray(r,b*3),h.fromArray(r,B*3),p.fromArray(r,q*3),v.fromArray(o,b*2),y.fromArray(o,B*2),m.fromArray(o,q*2),h.sub(f),p.sub(f),y.sub(v),m.sub(v);const re=1/(y.x*m.y-m.x*y.y);isFinite(re)&&(d.copy(h).multiplyScalar(m.y).addScaledVector(p,-y.y).multiplyScalar(re),_.copy(p).multiplyScalar(y.x).addScaledVector(h,-m.x).multiplyScalar(re),c[b].add(d),c[B].add(d),c[q].add(d),u[b].add(_),u[B].add(_),u[q].add(_))}let S=this.groups;S.length===0&&(S=[{start:0,count:i.length}]);for(let b=0,B=S.length;b<B;++b){const q=S[b],re=q.start,U=q.count;for(let V=re,$=re+U;V<$;V+=3)x(i[V+0],i[V+1],i[V+2])}const P=new I,w=new I,T=new I,O=new I;function E(b){T.fromArray(s,b*3),O.copy(T);const B=c[b];P.copy(B),P.sub(T.multiplyScalar(T.dot(B))).normalize(),w.crossVectors(O,B);const re=w.dot(u[b])<0?-1:1;l[b*4]=P.x,l[b*4+1]=P.y,l[b*4+2]=P.z,l[b*4+3]=re}for(let b=0,B=S.length;b<B;++b){const q=S[b],re=q.start,U=q.count;for(let V=re,$=re+U;V<$;V+=3)E(i[V+0]),E(i[V+1]),E(i[V+2])}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ni(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new I,s=new I,o=new I,a=new I,l=new I,c=new I,u=new I,f=new I;if(e)for(let h=0,p=e.count;h<p;h+=3){const v=e.getX(h+0),y=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(n,v),s.fromBufferAttribute(n,y),o.fromBufferAttribute(n,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=n.count;h<p;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Nt.fromBufferAttribute(e,n),Nt.normalize(),e.setXYZ(n,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let p=0,v=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?p=l[y]*a.data.stride+a.offset:p=l[y]*u;for(let d=0;d<u;d++)h[v++]=c[p++]}return new ni(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new $t,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],p=e(h,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const om=new Mt,sr=new zh,Ua=new cc,am=new I,qr=new I,Zr=new I,Kr=new I,hu=new I,ka=new I,Oa=new de,Fa=new de,za=new de,lm=new I,cm=new I,um=new I,Ba=new I,Ha=new I;class Qt extends kt{constructor(e=new $t,n=new dc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){ka.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(hu.fromBufferAttribute(f,e),o?ka.addScaledVector(hu,u):ka.addScaledVector(hu.sub(n),u))}n.add(ka)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ua.copy(i.boundingSphere),Ua.applyMatrix4(s),sr.copy(e.ray).recast(e.near),!(Ua.containsPoint(sr.origin)===!1&&(sr.intersectSphere(Ua,am)===null||sr.origin.distanceToSquared(am)>(e.far-e.near)**2))&&(om.copy(s).invert(),sr.copy(e.ray).applyMatrix4(om),!(i.boundingBox!==null&&sr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,sr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,y=h.length;v<y;v++){const m=h[v],d=o[m.materialIndex],_=Math.max(m.start,p.start),x=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let S=_,P=x;S<P;S+=3){const w=a.getX(S),T=a.getX(S+1),O=a.getX(S+2);r=Va(this,d,e,i,c,u,f,w,T,O),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let m=v,d=y;m<d;m+=3){const _=a.getX(m),x=a.getX(m+1),S=a.getX(m+2);r=Va(this,o,e,i,c,u,f,_,x,S),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,y=h.length;v<y;v++){const m=h[v],d=o[m.materialIndex],_=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=_,P=x;S<P;S+=3){const w=S,T=S+1,O=S+2;r=Va(this,d,e,i,c,u,f,w,T,O),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=v,d=y;m<d;m+=3){const _=m,x=m+1,S=m+2;r=Va(this,o,e,i,c,u,f,_,x,S),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function P1(t,e,n,i,r,s,o,a){let l;if(e.side===cn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Ki,a),l===null)return null;Ha.copy(a),Ha.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Ha);return c<n.near||c>n.far?null:{distance:c,point:Ha.clone(),object:t}}function Va(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,qr),t.getVertexPosition(l,Zr),t.getVertexPosition(c,Kr);const u=P1(t,e,n,i,qr,Zr,Kr,Ba);if(u){r&&(Oa.fromBufferAttribute(r,a),Fa.fromBufferAttribute(r,l),za.fromBufferAttribute(r,c),u.uv=bn.getInterpolation(Ba,qr,Zr,Kr,Oa,Fa,za,new de)),s&&(Oa.fromBufferAttribute(s,a),Fa.fromBufferAttribute(s,l),za.fromBufferAttribute(s,c),u.uv1=bn.getInterpolation(Ba,qr,Zr,Kr,Oa,Fa,za,new de),u.uv2=u.uv1),o&&(lm.fromBufferAttribute(o,a),cm.fromBufferAttribute(o,l),um.fromBufferAttribute(o,c),u.normal=bn.getInterpolation(Ba,qr,Zr,Kr,lm,cm,um,new I),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new I,materialIndex:0};bn.getNormal(qr,Zr,Kr,f.normal),u.face=f}return u}class js extends $t{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,p=0;v("z","y","x",-1,-1,i,n,e,o,s,0),v("z","y","x",1,-1,i,n,-e,o,s,1),v("x","z","y",1,1,e,i,n,r,o,2),v("x","z","y",1,-1,e,i,-n,r,o,3),v("x","y","z",1,-1,e,n,i,r,s,4),v("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(u,3)),this.setAttribute("uv",new pt(f,2));function v(y,m,d,_,x,S,P,w,T,O,E){const b=S/T,B=P/O,q=S/2,re=P/2,U=w/2,V=T+1,$=O+1;let ne=0,F=0;const G=new I;for(let C=0;C<$;C++){const R=C*B-re;for(let j=0;j<V;j++){const z=j*b-q;G[y]=z*_,G[m]=R*x,G[d]=U,c.push(G.x,G.y,G.z),G[y]=0,G[m]=0,G[d]=w>0?1:-1,u.push(G.x,G.y,G.z),f.push(j/T),f.push(1-C/O),ne+=1}}for(let C=0;C<O;C++)for(let R=0;R<T;R++){const j=h+R+V*C,z=h+R+V*(C+1),Y=h+(R+1)+V*(C+1),Q=h+(R+1)+V*C;l.push(j,z,Q),l.push(z,Y,Q),F+=6}a.addGroup(p,F,E),p+=F,h+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new js(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Fs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Zt(t){const e={};for(let n=0;n<t.length;n++){const i=Fs(t[n]);for(const r in i)e[r]=i[r]}return e}function L1(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Ux(t){return t.getRenderTarget()===null?t.outputColorSpace:rt.workingColorSpace}const N1={clone:Fs,merge:Zt};var D1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,I1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pr extends Gs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=D1,this.fragmentShader=I1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fs(e.uniforms),this.uniformsGroups=L1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class kx extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Mt,this.projectionMatrix=new Mt,this.projectionMatrixInverse=new Mt,this.coordinateSystem=mi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Tn extends kx{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=qo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ts*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qo*2*Math.atan(Math.tan(Ts*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Ts*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Jr=-90,Qr=1;class U1 extends kt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Tn(Jr,Qr,e,n);r.layers=this.layers,this.add(r);const s=new Tn(Jr,Qr,e,n);s.layers=this.layers,this.add(s);const o=new Tn(Jr,Qr,e,n);o.layers=this.layers,this.add(o);const a=new Tn(Jr,Qr,e,n);a.layers=this.layers,this.add(a);const l=new Tn(Jr,Qr,e,n);l.layers=this.layers,this.add(l);const c=new Tn(Jr,Qr,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===mi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Vl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(n,u),e.setRenderTarget(f,h,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Ox extends un{constructor(e,n,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],n=n!==void 0?n:Us,super(e,n,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class k1 extends Cr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];n.encoding!==void 0&&(Eo("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Sr?Ft:Cn),this.texture=new Ox(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:wn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new js(5,5,5),s=new Pr({name:"CubemapFromEquirect",uniforms:Fs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:Xi});s.uniforms.tEquirect.value=n;const o=new Qt(r,s),a=n.minFilter;return n.minFilter===Yo&&(n.minFilter=wn),new U1(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const fu=new I,O1=new I,F1=new qe;class Li{constructor(e=new I(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=fu.subVectors(i,n).cross(O1.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(fu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||F1.getNormalMatrix(e),r=this.coplanarPoint(fu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const or=new cc,Ga=new I;class Bh{constructor(e=new Li,n=new Li,i=new Li,r=new Li,s=new Li,o=new Li){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=mi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],f=r[6],h=r[7],p=r[8],v=r[9],y=r[10],m=r[11],d=r[12],_=r[13],x=r[14],S=r[15];if(i[0].setComponents(l-s,h-c,m-p,S-d).normalize(),i[1].setComponents(l+s,h+c,m+p,S+d).normalize(),i[2].setComponents(l+o,h+u,m+v,S+_).normalize(),i[3].setComponents(l-o,h-u,m-v,S-_).normalize(),i[4].setComponents(l-a,h-f,m-y,S-x).normalize(),n===mi)i[5].setComponents(l+a,h+f,m+y,S+x).normalize();else if(n===Vl)i[5].setComponents(a,f,y,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),or.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),or.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(or)}intersectsSprite(e){return or.center.set(0,0,0),or.radius=.7071067811865476,or.applyMatrix4(e.matrixWorld),this.intersectsSphere(or)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Ga.x=r.normal.x>0?e.max.x:e.min.x,Ga.y=r.normal.y>0?e.max.y:e.min.y,Ga.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ga)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Fx(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function z1(t,e){const n=e.isWebGL2,i=new WeakMap;function r(c,u){const f=c.array,h=c.usage,p=f.byteLength,v=t.createBuffer();t.bindBuffer(u,v),t.bufferData(u,f,h),c.onUploadCallback();let y;if(f instanceof Float32Array)y=t.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(n)y=t.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=t.UNSIGNED_SHORT;else if(f instanceof Int16Array)y=t.SHORT;else if(f instanceof Uint32Array)y=t.UNSIGNED_INT;else if(f instanceof Int32Array)y=t.INT;else if(f instanceof Int8Array)y=t.BYTE;else if(f instanceof Uint8Array)y=t.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)y=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:v,type:y,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,u,f){const h=u.array,p=u._updateRange,v=u.updateRanges;if(t.bindBuffer(f,c),p.count===-1&&v.length===0&&t.bufferSubData(f,0,h),v.length!==0){for(let y=0,m=v.length;y<m;y++){const d=v[y];n?t.bufferSubData(f,d.start*h.BYTES_PER_ELEMENT,h,d.start,d.count):t.bufferSubData(f,d.start*h.BYTES_PER_ELEMENT,h.subarray(d.start,d.start+d.count))}u.clearUpdateRanges()}p.count!==-1&&(n?t.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):t.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(t.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=i.get(c);(!h||h.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);if(f===void 0)i.set(c,r(c,u));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,c,u),f.version=c.version}}return{get:o,remove:a,update:l}}class gr extends $t{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=e/a,h=n/l,p=[],v=[],y=[],m=[];for(let d=0;d<u;d++){const _=d*h-o;for(let x=0;x<c;x++){const S=x*f-s;v.push(S,-_,0),y.push(0,0,1),m.push(x/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let _=0;_<a;_++){const x=_+c*d,S=_+c*(d+1),P=_+1+c*(d+1),w=_+1+c*d;p.push(x,S,w),p.push(S,P,w)}this.setIndex(p),this.setAttribute("position",new pt(v,3)),this.setAttribute("normal",new pt(y,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gr(e.width,e.height,e.widthSegments,e.heightSegments)}}var B1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,H1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,V1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,G1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,j1=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,W1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,X1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Y1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$1=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,q1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Z1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,K1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,J1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Q1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,eM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,tM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,nM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,iM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,oM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,aM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,lM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,cM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,uM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,dM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,hM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gM="gl_FragColor = linearToOutputTexel( gl_FragColor );",xM=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,vM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,_M=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,SM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,MM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,EM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,TM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,AM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,CM=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,RM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,PM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,LM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,NM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,DM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,IM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,UM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,OM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,FM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,BM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,HM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,VM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,GM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,WM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,XM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,YM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$M=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ZM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,KM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,JM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,QM=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,eE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,tE=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,nE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,iE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,rE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,aE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,mE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_E=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,SE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,ME=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,EE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,wE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,TE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,AE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,CE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,RE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,PE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,LE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,NE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,DE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,IE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,UE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,OE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,FE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,BE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,HE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,VE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,XE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,YE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,$E=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,qE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ZE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,JE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,QE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ew=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,rw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ow=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,aw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,uw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,pw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,xw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:B1,alphahash_pars_fragment:H1,alphamap_fragment:V1,alphamap_pars_fragment:G1,alphatest_fragment:j1,alphatest_pars_fragment:W1,aomap_fragment:X1,aomap_pars_fragment:Y1,batching_pars_vertex:$1,batching_vertex:q1,begin_vertex:Z1,beginnormal_vertex:K1,bsdfs:J1,iridescence_fragment:Q1,bumpmap_pars_fragment:eM,clipping_planes_fragment:tM,clipping_planes_pars_fragment:nM,clipping_planes_pars_vertex:iM,clipping_planes_vertex:rM,color_fragment:sM,color_pars_fragment:oM,color_pars_vertex:aM,color_vertex:lM,common:cM,cube_uv_reflection_fragment:uM,defaultnormal_vertex:dM,displacementmap_pars_vertex:hM,displacementmap_vertex:fM,emissivemap_fragment:pM,emissivemap_pars_fragment:mM,colorspace_fragment:gM,colorspace_pars_fragment:xM,envmap_fragment:vM,envmap_common_pars_fragment:_M,envmap_pars_fragment:yM,envmap_pars_vertex:SM,envmap_physical_pars_fragment:DM,envmap_vertex:MM,fog_vertex:EM,fog_pars_vertex:wM,fog_fragment:bM,fog_pars_fragment:TM,gradientmap_pars_fragment:AM,lightmap_fragment:CM,lightmap_pars_fragment:RM,lights_lambert_fragment:PM,lights_lambert_pars_fragment:LM,lights_pars_begin:NM,lights_toon_fragment:IM,lights_toon_pars_fragment:UM,lights_phong_fragment:kM,lights_phong_pars_fragment:OM,lights_physical_fragment:FM,lights_physical_pars_fragment:zM,lights_fragment_begin:BM,lights_fragment_maps:HM,lights_fragment_end:VM,logdepthbuf_fragment:GM,logdepthbuf_pars_fragment:jM,logdepthbuf_pars_vertex:WM,logdepthbuf_vertex:XM,map_fragment:YM,map_pars_fragment:$M,map_particle_fragment:qM,map_particle_pars_fragment:ZM,metalnessmap_fragment:KM,metalnessmap_pars_fragment:JM,morphcolor_vertex:QM,morphnormal_vertex:eE,morphtarget_pars_vertex:tE,morphtarget_vertex:nE,normal_fragment_begin:iE,normal_fragment_maps:rE,normal_pars_fragment:sE,normal_pars_vertex:oE,normal_vertex:aE,normalmap_pars_fragment:lE,clearcoat_normal_fragment_begin:cE,clearcoat_normal_fragment_maps:uE,clearcoat_pars_fragment:dE,iridescence_pars_fragment:hE,opaque_fragment:fE,packing:pE,premultiplied_alpha_fragment:mE,project_vertex:gE,dithering_fragment:xE,dithering_pars_fragment:vE,roughnessmap_fragment:_E,roughnessmap_pars_fragment:yE,shadowmap_pars_fragment:SE,shadowmap_pars_vertex:ME,shadowmap_vertex:EE,shadowmask_pars_fragment:wE,skinbase_vertex:bE,skinning_pars_vertex:TE,skinning_vertex:AE,skinnormal_vertex:CE,specularmap_fragment:RE,specularmap_pars_fragment:PE,tonemapping_fragment:LE,tonemapping_pars_fragment:NE,transmission_fragment:DE,transmission_pars_fragment:IE,uv_pars_fragment:UE,uv_pars_vertex:kE,uv_vertex:OE,worldpos_vertex:FE,background_vert:zE,background_frag:BE,backgroundCube_vert:HE,backgroundCube_frag:VE,cube_vert:GE,cube_frag:jE,depth_vert:WE,depth_frag:XE,distanceRGBA_vert:YE,distanceRGBA_frag:$E,equirect_vert:qE,equirect_frag:ZE,linedashed_vert:KE,linedashed_frag:JE,meshbasic_vert:QE,meshbasic_frag:ew,meshlambert_vert:tw,meshlambert_frag:nw,meshmatcap_vert:iw,meshmatcap_frag:rw,meshnormal_vert:sw,meshnormal_frag:ow,meshphong_vert:aw,meshphong_frag:lw,meshphysical_vert:cw,meshphysical_frag:uw,meshtoon_vert:dw,meshtoon_frag:hw,points_vert:fw,points_frag:pw,shadow_vert:mw,shadow_frag:gw,sprite_vert:xw,sprite_frag:vw},Se={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},qn={basic:{uniforms:Zt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Zt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ye(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Zt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Zt([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Zt([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new Ye(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Zt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Zt([Se.points,Se.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Zt([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Zt([Se.common,Se.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Zt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Zt([Se.sprite,Se.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Zt([Se.common,Se.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Zt([Se.lights,Se.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};qn.physical={uniforms:Zt([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const ja={r:0,b:0,g:0};function _w(t,e,n,i,r,s,o){const a=new Ye(0);let l=s===!0?0:1,c,u,f=null,h=0,p=null;function v(m,d){let _=!1,x=d.isScene===!0?d.background:null;x&&x.isTexture&&(x=(d.backgroundBlurriness>0?n:e).get(x)),x===null?y(a,l):x&&x.isColor&&(y(x,1),_=!0);const S=t.xr.getEnvironmentBlendMode();S==="additive"?i.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||_)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),x&&(x.isCubeTexture||x.mapping===ac)?(u===void 0&&(u=new Qt(new js(1,1,1),new Pr({name:"BackgroundCubeMaterial",uniforms:Fs(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=rt.getTransfer(x.colorSpace)!==at,(f!==x||h!==x.version||p!==t.toneMapping)&&(u.material.needsUpdate=!0,f=x,h=x.version,p=t.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Qt(new gr(2,2),new Pr({name:"BackgroundMaterial",uniforms:Fs(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:Ki,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=rt.getTransfer(x.colorSpace)!==at,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||h!==x.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,f=x,h=x.version,p=t.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function y(m,d){m.getRGB(ja,Ux(t)),i.buffers.color.setClear(ja.r,ja.g,ja.b,d,o)}return{getClearColor:function(){return a},setClearColor:function(m,d=1){a.set(m),l=d,y(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,y(a,l)},render:v}}function yw(t,e,n,i){const r=t.getParameter(t.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=m(null);let c=l,u=!1;function f(U,V,$,ne,F){let G=!1;if(o){const C=y(ne,$,V);c!==C&&(c=C,p(c.object)),G=d(U,ne,$,F),G&&_(U,ne,$,F)}else{const C=V.wireframe===!0;(c.geometry!==ne.id||c.program!==$.id||c.wireframe!==C)&&(c.geometry=ne.id,c.program=$.id,c.wireframe=C,G=!0)}F!==null&&n.update(F,t.ELEMENT_ARRAY_BUFFER),(G||u)&&(u=!1,O(U,V,$,ne),F!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get(F).buffer))}function h(){return i.isWebGL2?t.createVertexArray():s.createVertexArrayOES()}function p(U){return i.isWebGL2?t.bindVertexArray(U):s.bindVertexArrayOES(U)}function v(U){return i.isWebGL2?t.deleteVertexArray(U):s.deleteVertexArrayOES(U)}function y(U,V,$){const ne=$.wireframe===!0;let F=a[U.id];F===void 0&&(F={},a[U.id]=F);let G=F[V.id];G===void 0&&(G={},F[V.id]=G);let C=G[ne];return C===void 0&&(C=m(h()),G[ne]=C),C}function m(U){const V=[],$=[],ne=[];for(let F=0;F<r;F++)V[F]=0,$[F]=0,ne[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:$,attributeDivisors:ne,object:U,attributes:{},index:null}}function d(U,V,$,ne){const F=c.attributes,G=V.attributes;let C=0;const R=$.getAttributes();for(const j in R)if(R[j].location>=0){const Y=F[j];let Q=G[j];if(Q===void 0&&(j==="instanceMatrix"&&U.instanceMatrix&&(Q=U.instanceMatrix),j==="instanceColor"&&U.instanceColor&&(Q=U.instanceColor)),Y===void 0||Y.attribute!==Q||Q&&Y.data!==Q.data)return!0;C++}return c.attributesNum!==C||c.index!==ne}function _(U,V,$,ne){const F={},G=V.attributes;let C=0;const R=$.getAttributes();for(const j in R)if(R[j].location>=0){let Y=G[j];Y===void 0&&(j==="instanceMatrix"&&U.instanceMatrix&&(Y=U.instanceMatrix),j==="instanceColor"&&U.instanceColor&&(Y=U.instanceColor));const Q={};Q.attribute=Y,Y&&Y.data&&(Q.data=Y.data),F[j]=Q,C++}c.attributes=F,c.attributesNum=C,c.index=ne}function x(){const U=c.newAttributes;for(let V=0,$=U.length;V<$;V++)U[V]=0}function S(U){P(U,0)}function P(U,V){const $=c.newAttributes,ne=c.enabledAttributes,F=c.attributeDivisors;$[U]=1,ne[U]===0&&(t.enableVertexAttribArray(U),ne[U]=1),F[U]!==V&&((i.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](U,V),F[U]=V)}function w(){const U=c.newAttributes,V=c.enabledAttributes;for(let $=0,ne=V.length;$<ne;$++)V[$]!==U[$]&&(t.disableVertexAttribArray($),V[$]=0)}function T(U,V,$,ne,F,G,C){C===!0?t.vertexAttribIPointer(U,V,$,F,G):t.vertexAttribPointer(U,V,$,ne,F,G)}function O(U,V,$,ne){if(i.isWebGL2===!1&&(U.isInstancedMesh||ne.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const F=ne.attributes,G=$.getAttributes(),C=V.defaultAttributeValues;for(const R in G){const j=G[R];if(j.location>=0){let z=F[R];if(z===void 0&&(R==="instanceMatrix"&&U.instanceMatrix&&(z=U.instanceMatrix),R==="instanceColor"&&U.instanceColor&&(z=U.instanceColor)),z!==void 0){const Y=z.normalized,Q=z.itemSize,ie=n.get(z);if(ie===void 0)continue;const J=ie.buffer,me=ie.type,Me=ie.bytesPerElement,ge=i.isWebGL2===!0&&(me===t.INT||me===t.UNSIGNED_INT||z.gpuType===xx);if(z.isInterleavedBufferAttribute){const Ee=z.data,D=Ee.stride,ue=z.offset;if(Ee.isInstancedInterleavedBuffer){for(let X=0;X<j.locationSize;X++)P(j.location+X,Ee.meshPerAttribute);U.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let X=0;X<j.locationSize;X++)S(j.location+X);t.bindBuffer(t.ARRAY_BUFFER,J);for(let X=0;X<j.locationSize;X++)T(j.location+X,Q/j.locationSize,me,Y,D*Me,(ue+Q/j.locationSize*X)*Me,ge)}else{if(z.isInstancedBufferAttribute){for(let Ee=0;Ee<j.locationSize;Ee++)P(j.location+Ee,z.meshPerAttribute);U.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let Ee=0;Ee<j.locationSize;Ee++)S(j.location+Ee);t.bindBuffer(t.ARRAY_BUFFER,J);for(let Ee=0;Ee<j.locationSize;Ee++)T(j.location+Ee,Q/j.locationSize,me,Y,Q*Me,Q/j.locationSize*Ee*Me,ge)}}else if(C!==void 0){const Y=C[R];if(Y!==void 0)switch(Y.length){case 2:t.vertexAttrib2fv(j.location,Y);break;case 3:t.vertexAttrib3fv(j.location,Y);break;case 4:t.vertexAttrib4fv(j.location,Y);break;default:t.vertexAttrib1fv(j.location,Y)}}}}w()}function E(){q();for(const U in a){const V=a[U];for(const $ in V){const ne=V[$];for(const F in ne)v(ne[F].object),delete ne[F];delete V[$]}delete a[U]}}function b(U){if(a[U.id]===void 0)return;const V=a[U.id];for(const $ in V){const ne=V[$];for(const F in ne)v(ne[F].object),delete ne[F];delete V[$]}delete a[U.id]}function B(U){for(const V in a){const $=a[V];if($[U.id]===void 0)continue;const ne=$[U.id];for(const F in ne)v(ne[F].object),delete ne[F];delete $[U.id]}}function q(){re(),u=!0,c!==l&&(c=l,p(c.object))}function re(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:q,resetDefaultState:re,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfProgram:B,initAttributes:x,enableAttribute:S,disableUnusedAttributes:w}}function Sw(t,e,n,i){const r=i.isWebGL2;let s;function o(u){s=u}function a(u,f){t.drawArrays(s,u,f),n.update(f,s,1)}function l(u,f,h){if(h===0)return;let p,v;if(r)p=t,v="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[v](s,u,f,h),n.update(f,s,h)}function c(u,f,h){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<h;v++)this.render(u[v],f[v]);else{p.multiDrawArraysWEBGL(s,u,0,f,0,h);let v=0;for(let y=0;y<h;y++)v+=f[y];n.update(v,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Mw(t,e,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&t.constructor.name==="WebGL2RenderingContext";let a=n.precision!==void 0?n.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=n.logarithmicDepthBuffer===!0,f=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),h=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=t.getParameter(t.MAX_TEXTURE_SIZE),v=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),y=t.getParameter(t.MAX_VERTEX_ATTRIBS),m=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),d=t.getParameter(t.MAX_VARYING_VECTORS),_=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),x=h>0,S=o||e.has("OES_texture_float"),P=x&&S,w=o?t.getParameter(t.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:v,maxAttributes:y,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:_,vertexTextures:x,floatFragmentTextures:S,floatVertexTextures:P,maxSamples:w}}function Ew(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Li,a=new qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||r;return r=h,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){n=u(f,h,0)},this.setState=function(f,h,p){const v=f.clippingPlanes,y=f.clipIntersection,m=f.clipShadows,d=t.get(f);if(!r||v===null||v.length===0||s&&!m)s?u(null):c();else{const _=s?0:i,x=_*4;let S=d.clippingState||null;l.value=S,S=u(v,h,x,p);for(let P=0;P!==x;++P)S[P]=n[P];d.clippingState=S,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,p,v){const y=f!==null?f.length:0;let m=null;if(y!==0){if(m=l.value,v!==!0||m===null){const d=p+y*4,_=h.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<d)&&(m=new Float32Array(d));for(let x=0,S=p;x!==y;++x,S+=4)o.copy(f[x]).applyMatrix4(_,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function ww(t){let e=new WeakMap;function n(o,a){return a===Ad?o.mapping=Us:a===Cd&&(o.mapping=ks),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ad||a===Cd)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new k1(l.height/2);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class wo extends kx{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const ms=4,dm=[.125,.215,.35,.446,.526,.582],dr=20,pu=new wo,hm=new Ye;let mu=null,gu=0,xu=0;const cr=(1+Math.sqrt(5))/2,es=1/cr,fm=[new I(1,1,1),new I(-1,1,1),new I(1,1,-1),new I(-1,1,-1),new I(0,cr,es),new I(0,cr,-es),new I(es,0,cr),new I(-es,0,cr),new I(cr,es,0),new I(-cr,es,0)];class pm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){mu=this._renderer.getRenderTarget(),gu=this._renderer.getActiveCubeFace(),xu=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(mu,gu,xu),e.scissorTest=!1,Wa(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Us||e.mapping===ks?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),mu=this._renderer.getRenderTarget(),gu=this._renderer.getActiveCubeFace(),xu=this._renderer.getActiveMipmapLevel();const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:$o,format:Vn,colorSpace:Si,depthBuffer:!1},r=mm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mm(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=bw(s)),this._blurMaterial=Tw(s,e,n)}return r}_compileMaterial(e){const n=new Qt(this._lodPlanes[0],e);this._renderer.compile(n,pu)}_sceneToCubeUV(e,n,i,r){const a=new Tn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(hm),u.toneMapping=Yi,u.autoClear=!1;const p=new dc({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),v=new Qt(new js,p);let y=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,y=!0):(p.color.copy(hm),y=!0);for(let d=0;d<6;d++){const _=d%3;_===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):_===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const x=this._cubeSize;Wa(r,_*x,d>2?x:0,x,x),u.setRenderTarget(r),y&&u.render(v,a),u.render(e,a)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Us||e.mapping===ks;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=xm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gm());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Qt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Wa(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,pu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=fm[(r-1)%fm.length];this._blur(e,r-1,r,s,o)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Qt(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*dr-1),y=s/v,m=isFinite(s)?1+Math.floor(u*y):dr;m>dr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${dr}`);const d=[];let _=0;for(let T=0;T<dr;++T){const O=T/y,E=Math.exp(-O*O/2);d.push(E),T===0?_+=E:T<m&&(_+=2*E)}for(let T=0;T<d.length;T++)d[T]=d[T]/_;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:x}=this;h.dTheta.value=v,h.mipInt.value=x-i;const S=this._sizeLods[r],P=3*S*(r>x-ms?r-x+ms:0),w=4*(this._cubeSize-S);Wa(n,P,w,3*S,2*S),l.setRenderTarget(n),l.render(f,pu)}}function bw(t){const e=[],n=[],i=[];let r=t;const s=t-ms+1+dm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-ms?l=dm[o-t+ms-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,v=6,y=3,m=2,d=1,_=new Float32Array(y*v*p),x=new Float32Array(m*v*p),S=new Float32Array(d*v*p);for(let w=0;w<p;w++){const T=w%3*2/3-1,O=w>2?0:-1,E=[T,O,0,T+2/3,O,0,T+2/3,O+1,0,T,O,0,T+2/3,O+1,0,T,O+1,0];_.set(E,y*v*w),x.set(h,m*v*w);const b=[w,w,w,w,w,w];S.set(b,d*v*w)}const P=new $t;P.setAttribute("position",new ni(_,y)),P.setAttribute("uv",new ni(x,m)),P.setAttribute("faceIndex",new ni(S,d)),e.push(P),r>ms&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function mm(t,e,n){const i=new Cr(t,e,n);return i.texture.mapping=ac,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Wa(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function Tw(t,e,n){const i=new Float32Array(dr),r=new I(0,1,0);return new Pr({name:"SphericalGaussianBlur",defines:{n:dr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function gm(){return new Pr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function xm(){return new Pr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function Hh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Aw(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ad||l===Cd,u=l===Us||l===ks;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return n===null&&(n=new pm(t)),f=c?n.fromEquirectangular(a,f):n.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(c&&f&&f.height>0||u&&f&&r(f)){n===null&&(n=new pm(t));const h=c?n.fromEquirectangular(a):n.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function Cw(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(i){const r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Rw(t,e,n,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const v in h.attributes)e.remove(h.attributes[v]);for(const v in h.morphAttributes){const y=h.morphAttributes[v];for(let m=0,d=y.length;m<d;m++)e.remove(y[m])}h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function l(f){const h=f.attributes;for(const v in h)e.update(h[v],t.ARRAY_BUFFER);const p=f.morphAttributes;for(const v in p){const y=p[v];for(let m=0,d=y.length;m<d;m++)e.update(y[m],t.ARRAY_BUFFER)}}function c(f){const h=[],p=f.index,v=f.attributes.position;let y=0;if(p!==null){const _=p.array;y=p.version;for(let x=0,S=_.length;x<S;x+=3){const P=_[x+0],w=_[x+1],T=_[x+2];h.push(P,w,w,T,T,P)}}else if(v!==void 0){const _=v.array;y=v.version;for(let x=0,S=_.length/3-1;x<S;x+=3){const P=x+0,w=x+1,T=x+2;h.push(P,w,w,T,T,P)}}else return;const m=new(Ax(h)?Ix:Dx)(h,1);m.version=y;const d=s.get(f);d&&e.remove(d),s.set(f,m)}function u(f){const h=s.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function Pw(t,e,n,i){const r=i.isWebGL2;let s;function o(p){s=p}let a,l;function c(p){a=p.type,l=p.bytesPerElement}function u(p,v){t.drawElements(s,v,a,p*l),n.update(v,s,1)}function f(p,v,y){if(y===0)return;let m,d;if(r)m=t,d="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](s,v,a,p*l,y),n.update(v,s,y)}function h(p,v,y){if(y===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<y;d++)this.render(p[d]/l,v[d]);else{m.multiDrawElementsWEBGL(s,v,0,a,p,0,y);let d=0;for(let _=0;_<y;_++)d+=v[_];n.update(d,s,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=f,this.renderMultiDraw=h}function Lw(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Nw(t,e){return t[0]-e[0]}function Dw(t,e){return Math.abs(e[1])-Math.abs(t[1])}function Iw(t,e,n){const i={},r=new Float32Array(8),s=new WeakMap,o=new It,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,f){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const v=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,y=v!==void 0?v.length:0;let m=s.get(u);if(m===void 0||m.count!==y){let V=function(){re.dispose(),s.delete(u),u.removeEventListener("dispose",V)};var p=V;m!==void 0&&m.texture.dispose();const x=u.morphAttributes.position!==void 0,S=u.morphAttributes.normal!==void 0,P=u.morphAttributes.color!==void 0,w=u.morphAttributes.position||[],T=u.morphAttributes.normal||[],O=u.morphAttributes.color||[];let E=0;x===!0&&(E=1),S===!0&&(E=2),P===!0&&(E=3);let b=u.attributes.position.count*E,B=1;b>e.maxTextureSize&&(B=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const q=new Float32Array(b*B*4*y),re=new Px(q,b,B,y);re.type=Oi,re.needsUpdate=!0;const U=E*4;for(let $=0;$<y;$++){const ne=w[$],F=T[$],G=O[$],C=b*B*4*$;for(let R=0;R<ne.count;R++){const j=R*U;x===!0&&(o.fromBufferAttribute(ne,R),q[C+j+0]=o.x,q[C+j+1]=o.y,q[C+j+2]=o.z,q[C+j+3]=0),S===!0&&(o.fromBufferAttribute(F,R),q[C+j+4]=o.x,q[C+j+5]=o.y,q[C+j+6]=o.z,q[C+j+7]=0),P===!0&&(o.fromBufferAttribute(G,R),q[C+j+8]=o.x,q[C+j+9]=o.y,q[C+j+10]=o.z,q[C+j+11]=G.itemSize===4?o.w:1)}}m={count:y,texture:re,size:new de(b,B)},s.set(u,m),u.addEventListener("dispose",V)}let d=0;for(let x=0;x<h.length;x++)d+=h[x];const _=u.morphTargetsRelative?1:1-d;f.getUniforms().setValue(t,"morphTargetBaseInfluence",_),f.getUniforms().setValue(t,"morphTargetInfluences",h),f.getUniforms().setValue(t,"morphTargetsTexture",m.texture,n),f.getUniforms().setValue(t,"morphTargetsTextureSize",m.size)}else{const v=h===void 0?0:h.length;let y=i[u.id];if(y===void 0||y.length!==v){y=[];for(let S=0;S<v;S++)y[S]=[S,0];i[u.id]=y}for(let S=0;S<v;S++){const P=y[S];P[0]=S,P[1]=h[S]}y.sort(Dw);for(let S=0;S<8;S++)S<v&&y[S][1]?(a[S][0]=y[S][0],a[S][1]=y[S][1]):(a[S][0]=Number.MAX_SAFE_INTEGER,a[S][1]=0);a.sort(Nw);const m=u.morphAttributes.position,d=u.morphAttributes.normal;let _=0;for(let S=0;S<8;S++){const P=a[S],w=P[0],T=P[1];w!==Number.MAX_SAFE_INTEGER&&T?(m&&u.getAttribute("morphTarget"+S)!==m[w]&&u.setAttribute("morphTarget"+S,m[w]),d&&u.getAttribute("morphNormal"+S)!==d[w]&&u.setAttribute("morphNormal"+S,d[w]),r[S]=T,_+=T):(m&&u.hasAttribute("morphTarget"+S)===!0&&u.deleteAttribute("morphTarget"+S),d&&u.hasAttribute("morphNormal"+S)===!0&&u.deleteAttribute("morphNormal"+S),r[S]=0)}const x=u.morphTargetsRelative?1:1-_;f.getUniforms().setValue(t,"morphTargetBaseInfluence",x),f.getUniforms().setValue(t,"morphTargetInfluences",r)}}return{update:l}}function Uw(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class zx extends un{constructor(e,n,i,r,s,o,a,l,c,u){if(u=u!==void 0?u:yr,u!==yr&&u!==Os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===yr&&(i=ki),i===void 0&&u===Os&&(i=_r),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:Jt,this.minFilter=l!==void 0?l:Jt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const Bx=new un,Hx=new zx(1,1);Hx.compareFunction=Tx;const Vx=new Px,Gx=new _1,jx=new Ox,vm=[],_m=[],ym=new Float32Array(16),Sm=new Float32Array(9),Mm=new Float32Array(4);function Ws(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=vm[r];if(s===void 0&&(s=new Float32Array(r),vm[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Rt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Pt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function hc(t,e){let n=_m[e];n===void 0&&(n=new Int32Array(e),_m[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function kw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Ow(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Rt(n,e))return;t.uniform2fv(this.addr,e),Pt(n,e)}}function Fw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Rt(n,e))return;t.uniform3fv(this.addr,e),Pt(n,e)}}function zw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Rt(n,e))return;t.uniform4fv(this.addr,e),Pt(n,e)}}function Bw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Rt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Pt(n,e)}else{if(Rt(n,i))return;Mm.set(i),t.uniformMatrix2fv(this.addr,!1,Mm),Pt(n,i)}}function Hw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Rt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Pt(n,e)}else{if(Rt(n,i))return;Sm.set(i),t.uniformMatrix3fv(this.addr,!1,Sm),Pt(n,i)}}function Vw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Rt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Pt(n,e)}else{if(Rt(n,i))return;ym.set(i),t.uniformMatrix4fv(this.addr,!1,ym),Pt(n,i)}}function Gw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function jw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Rt(n,e))return;t.uniform2iv(this.addr,e),Pt(n,e)}}function Ww(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Rt(n,e))return;t.uniform3iv(this.addr,e),Pt(n,e)}}function Xw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Rt(n,e))return;t.uniform4iv(this.addr,e),Pt(n,e)}}function Yw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function $w(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Rt(n,e))return;t.uniform2uiv(this.addr,e),Pt(n,e)}}function qw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Rt(n,e))return;t.uniform3uiv(this.addr,e),Pt(n,e)}}function Zw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Rt(n,e))return;t.uniform4uiv(this.addr,e),Pt(n,e)}}function Kw(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?Hx:Bx;n.setTexture2D(e||s,r)}function Jw(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Gx,r)}function Qw(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||jx,r)}function eb(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Vx,r)}function tb(t){switch(t){case 5126:return kw;case 35664:return Ow;case 35665:return Fw;case 35666:return zw;case 35674:return Bw;case 35675:return Hw;case 35676:return Vw;case 5124:case 35670:return Gw;case 35667:case 35671:return jw;case 35668:case 35672:return Ww;case 35669:case 35673:return Xw;case 5125:return Yw;case 36294:return $w;case 36295:return qw;case 36296:return Zw;case 35678:case 36198:case 36298:case 36306:case 35682:return Kw;case 35679:case 36299:case 36307:return Jw;case 35680:case 36300:case 36308:case 36293:return Qw;case 36289:case 36303:case 36311:case 36292:return eb}}function nb(t,e){t.uniform1fv(this.addr,e)}function ib(t,e){const n=Ws(e,this.size,2);t.uniform2fv(this.addr,n)}function rb(t,e){const n=Ws(e,this.size,3);t.uniform3fv(this.addr,n)}function sb(t,e){const n=Ws(e,this.size,4);t.uniform4fv(this.addr,n)}function ob(t,e){const n=Ws(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function ab(t,e){const n=Ws(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function lb(t,e){const n=Ws(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function cb(t,e){t.uniform1iv(this.addr,e)}function ub(t,e){t.uniform2iv(this.addr,e)}function db(t,e){t.uniform3iv(this.addr,e)}function hb(t,e){t.uniform4iv(this.addr,e)}function fb(t,e){t.uniform1uiv(this.addr,e)}function pb(t,e){t.uniform2uiv(this.addr,e)}function mb(t,e){t.uniform3uiv(this.addr,e)}function gb(t,e){t.uniform4uiv(this.addr,e)}function xb(t,e,n){const i=this.cache,r=e.length,s=hc(n,r);Rt(i,s)||(t.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||Bx,s[o])}function vb(t,e,n){const i=this.cache,r=e.length,s=hc(n,r);Rt(i,s)||(t.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Gx,s[o])}function _b(t,e,n){const i=this.cache,r=e.length,s=hc(n,r);Rt(i,s)||(t.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||jx,s[o])}function yb(t,e,n){const i=this.cache,r=e.length,s=hc(n,r);Rt(i,s)||(t.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||Vx,s[o])}function Sb(t){switch(t){case 5126:return nb;case 35664:return ib;case 35665:return rb;case 35666:return sb;case 35674:return ob;case 35675:return ab;case 35676:return lb;case 5124:case 35670:return cb;case 35667:case 35671:return ub;case 35668:case 35672:return db;case 35669:case 35673:return hb;case 5125:return fb;case 36294:return pb;case 36295:return mb;case 36296:return gb;case 35678:case 36198:case 36298:case 36306:case 35682:return xb;case 35679:case 36299:case 36307:return vb;case 35680:case 36300:case 36308:case 36293:return _b;case 36289:case 36303:case 36311:case 36292:return yb}}class Mb{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=tb(n.type)}}class Eb{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Sb(n.type)}}class wb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const vu=/(\w+)(\])?(\[|\.)?/g;function Em(t,e){t.seq.push(e),t.map[e.id]=e}function bb(t,e,n){const i=t.name,r=i.length;for(vu.lastIndex=0;;){const s=vu.exec(i),o=vu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Em(n,c===void 0?new Mb(a,t,e):new Eb(a,t,e));break}else{let f=n.map[a];f===void 0&&(f=new wb(a),Em(n,f)),n=f}}}class pl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);bb(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function wm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const Tb=37297;let Ab=0;function Cb(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function Rb(t){const e=rt.getPrimaries(rt.workingColorSpace),n=rt.getPrimaries(t);let i;switch(e===n?i="":e===Hl&&n===Bl?i="LinearDisplayP3ToLinearSRGB":e===Bl&&n===Hl&&(i="LinearSRGBToLinearDisplayP3"),t){case Si:case lc:return[i,"LinearTransferOETF"];case Ft:case Oh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function bm(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+Cb(t.getShaderSource(e),o)}else return r}function Pb(t,e){const n=Rb(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function Lb(t,e){let n;switch(e){case PS:n="Linear";break;case LS:n="Reinhard";break;case NS:n="OptimizedCineon";break;case mx:n="ACESFilmic";break;case IS:n="AgX";break;case DS:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function Nb(t){return[t.extensionDerivatives||t.envMapCubeUVHeight||t.bumpMap||t.normalMapTangentSpace||t.clearcoatNormalMap||t.flatShading||t.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(t.extensionFragDepth||t.logarithmicDepthBuffer)&&t.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",t.extensionDrawBuffers&&t.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(t.extensionShaderTextureLOD||t.envMap||t.transmission)&&t.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(gs).join(`
`)}function Db(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(gs).join(`
`)}function Ib(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function Ub(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function gs(t){return t!==""}function Tm(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Am(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const kb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dd(t){return t.replace(kb,Fb)}const Ob=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Fb(t,e){let n=We[e];if(n===void 0){const i=Ob.get(e);if(i!==void 0)n=We[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Dd(n)}const zb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cm(t){return t.replace(zb,Bb)}function Bb(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Rm(t){let e="precision "+t.precision+` float;
precision `+t.precision+" int;";return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Hb(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===hx?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===fx?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===ui&&(e="SHADOWMAP_TYPE_VSM"),e}function Vb(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Us:case ks:e="ENVMAP_TYPE_CUBE";break;case ac:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Gb(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case ks:e="ENVMAP_MODE_REFRACTION";break}return e}function jb(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case px:e="ENVMAP_BLENDING_MULTIPLY";break;case CS:e="ENVMAP_BLENDING_MIX";break;case RS:e="ENVMAP_BLENDING_ADD";break}return e}function Wb(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function Xb(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=Hb(n),c=Vb(n),u=Gb(n),f=jb(n),h=Wb(n),p=n.isWebGL2?"":Nb(n),v=Db(n),y=Ib(s),m=r.createProgram();let d,_,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(gs).join(`
`),d.length>0&&(d+=`
`),_=[p,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(gs).join(`
`),_.length>0&&(_+=`
`)):(d=[Rm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gs).join(`
`),_=[p,Rm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Yi?"#define TONE_MAPPING":"",n.toneMapping!==Yi?We.tonemapping_pars_fragment:"",n.toneMapping!==Yi?Lb("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,Pb("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(gs).join(`
`)),o=Dd(o),o=Tm(o,n),o=Am(o,n),a=Dd(a),a=Tm(a,n),a=Am(a,n),o=Cm(o),a=Cm(a),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,d=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,_=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===Yp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Yp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const S=x+d+o,P=x+_+a,w=wm(r,r.VERTEX_SHADER,S),T=wm(r,r.FRAGMENT_SHADER,P);r.attachShader(m,w),r.attachShader(m,T),n.index0AttributeName!==void 0?r.bindAttribLocation(m,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function O(q){if(t.debug.checkShaderErrors){const re=r.getProgramInfoLog(m).trim(),U=r.getShaderInfoLog(w).trim(),V=r.getShaderInfoLog(T).trim();let $=!0,ne=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if($=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,m,w,T);else{const F=bm(r,w,"vertex"),G=bm(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+re+`
`+F+`
`+G)}else re!==""?console.warn("THREE.WebGLProgram: Program Info Log:",re):(U===""||V==="")&&(ne=!1);ne&&(q.diagnostics={runnable:$,programLog:re,vertexShader:{log:U,prefix:d},fragmentShader:{log:V,prefix:_}})}r.deleteShader(w),r.deleteShader(T),E=new pl(r,m),b=Ub(r,m)}let E;this.getUniforms=function(){return E===void 0&&O(this),E};let b;this.getAttributes=function(){return b===void 0&&O(this),b};let B=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=r.getProgramParameter(m,Tb)),B},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Ab++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=T,this}let Yb=0;class $b{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new qb(e),n.set(e,i)),i}}class qb{constructor(e){this.id=Yb++,this.code=e,this.usedTimes=0}}function Zb(t,e,n,i,r,s,o){const a=new Lx,l=new $b,c=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(E){return E===0?"uv":`uv${E}`}function m(E,b,B,q,re){const U=q.fog,V=re.geometry,$=E.isMeshStandardMaterial?q.environment:null,ne=(E.isMeshStandardMaterial?n:e).get(E.envMap||$),F=ne&&ne.mapping===ac?ne.image.height:null,G=v[E.type];E.precision!==null&&(p=r.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const C=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,R=C!==void 0?C.length:0;let j=0;V.morphAttributes.position!==void 0&&(j=1),V.morphAttributes.normal!==void 0&&(j=2),V.morphAttributes.color!==void 0&&(j=3);let z,Y,Q,ie;if(G){const _t=qn[G];z=_t.vertexShader,Y=_t.fragmentShader}else z=E.vertexShader,Y=E.fragmentShader,l.update(E),Q=l.getVertexShaderID(E),ie=l.getFragmentShaderID(E);const J=t.getRenderTarget(),me=re.isInstancedMesh===!0,Me=re.isBatchedMesh===!0,ge=!!E.map,Ee=!!E.matcap,D=!!ne,ue=!!E.aoMap,X=!!E.lightMap,se=!!E.bumpMap,te=!!E.normalMap,Te=!!E.displacementMap,ve=!!E.emissiveMap,A=!!E.metalnessMap,M=!!E.roughnessMap,H=E.anisotropy>0,ce=E.clearcoat>0,ae=E.iridescence>0,oe=E.sheen>0,Ae=E.transmission>0,ye=H&&!!E.anisotropyMap,be=ce&&!!E.clearcoatMap,Le=ce&&!!E.clearcoatNormalMap,Oe=ce&&!!E.clearcoatRoughnessMap,le=ae&&!!E.iridescenceMap,Ge=ae&&!!E.iridescenceThicknessMap,He=oe&&!!E.sheenColorMap,ke=oe&&!!E.sheenRoughnessMap,De=!!E.specularMap,_e=!!E.specularColorMap,N=!!E.specularIntensityMap,fe=Ae&&!!E.transmissionMap,Ne=Ae&&!!E.thicknessMap,Pe=!!E.gradientMap,he=!!E.alphaMap,k=E.alphaTest>0,xe=!!E.alphaHash,we=!!E.extensions,Fe=!!V.attributes.uv1,Ue=!!V.attributes.uv2,Je=!!V.attributes.uv3;let Qe=Yi;return E.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Qe=t.toneMapping),{isWebGL2:u,shaderID:G,shaderType:E.type,shaderName:E.name,vertexShader:z,fragmentShader:Y,defines:E.defines,customVertexShaderID:Q,customFragmentShaderID:ie,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Me,instancing:me,instancingColor:me&&re.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:J===null?t.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Si,map:ge,matcap:Ee,envMap:D,envMapMode:D&&ne.mapping,envMapCubeUVHeight:F,aoMap:ue,lightMap:X,bumpMap:se,normalMap:te,displacementMap:h&&Te,emissiveMap:ve,normalMapObjectSpace:te&&E.normalMapType===XS,normalMapTangentSpace:te&&E.normalMapType===bx,metalnessMap:A,roughnessMap:M,anisotropy:H,anisotropyMap:ye,clearcoat:ce,clearcoatMap:be,clearcoatNormalMap:Le,clearcoatRoughnessMap:Oe,iridescence:ae,iridescenceMap:le,iridescenceThicknessMap:Ge,sheen:oe,sheenColorMap:He,sheenRoughnessMap:ke,specularMap:De,specularColorMap:_e,specularIntensityMap:N,transmission:Ae,transmissionMap:fe,thicknessMap:Ne,gradientMap:Pe,opaque:E.transparent===!1&&E.blending===bs,alphaMap:he,alphaTest:k,alphaHash:xe,combine:E.combine,mapUv:ge&&y(E.map.channel),aoMapUv:ue&&y(E.aoMap.channel),lightMapUv:X&&y(E.lightMap.channel),bumpMapUv:se&&y(E.bumpMap.channel),normalMapUv:te&&y(E.normalMap.channel),displacementMapUv:Te&&y(E.displacementMap.channel),emissiveMapUv:ve&&y(E.emissiveMap.channel),metalnessMapUv:A&&y(E.metalnessMap.channel),roughnessMapUv:M&&y(E.roughnessMap.channel),anisotropyMapUv:ye&&y(E.anisotropyMap.channel),clearcoatMapUv:be&&y(E.clearcoatMap.channel),clearcoatNormalMapUv:Le&&y(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&y(E.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&y(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ge&&y(E.iridescenceThicknessMap.channel),sheenColorMapUv:He&&y(E.sheenColorMap.channel),sheenRoughnessMapUv:ke&&y(E.sheenRoughnessMap.channel),specularMapUv:De&&y(E.specularMap.channel),specularColorMapUv:_e&&y(E.specularColorMap.channel),specularIntensityMapUv:N&&y(E.specularIntensityMap.channel),transmissionMapUv:fe&&y(E.transmissionMap.channel),thicknessMapUv:Ne&&y(E.thicknessMap.channel),alphaMapUv:he&&y(E.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(te||H),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,vertexUv1s:Fe,vertexUv2s:Ue,vertexUv3s:Je,pointsUvs:re.isPoints===!0&&!!V.attributes.uv&&(ge||he),fog:!!U,useFog:E.fog===!0,fogExp2:U&&U.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:re.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:R,morphTextureStride:j,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:t.shadowMap.enabled&&B.length>0,shadowMapType:t.shadowMap.type,toneMapping:Qe,useLegacyLights:t._useLegacyLights,decodeVideoTexture:ge&&E.map.isVideoTexture===!0&&rt.getTransfer(E.map.colorSpace)===at,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===An,flipSided:E.side===cn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:we&&E.extensions.derivatives===!0,extensionFragDepth:we&&E.extensions.fragDepth===!0,extensionDrawBuffers:we&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:we&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:we&&E.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function d(E){const b=[];if(E.shaderID?b.push(E.shaderID):(b.push(E.customVertexShaderID),b.push(E.customFragmentShaderID)),E.defines!==void 0)for(const B in E.defines)b.push(B),b.push(E.defines[B]);return E.isRawShaderMaterial===!1&&(_(b,E),x(b,E),b.push(t.outputColorSpace)),b.push(E.customProgramCacheKey),b.join()}function _(E,b){E.push(b.precision),E.push(b.outputColorSpace),E.push(b.envMapMode),E.push(b.envMapCubeUVHeight),E.push(b.mapUv),E.push(b.alphaMapUv),E.push(b.lightMapUv),E.push(b.aoMapUv),E.push(b.bumpMapUv),E.push(b.normalMapUv),E.push(b.displacementMapUv),E.push(b.emissiveMapUv),E.push(b.metalnessMapUv),E.push(b.roughnessMapUv),E.push(b.anisotropyMapUv),E.push(b.clearcoatMapUv),E.push(b.clearcoatNormalMapUv),E.push(b.clearcoatRoughnessMapUv),E.push(b.iridescenceMapUv),E.push(b.iridescenceThicknessMapUv),E.push(b.sheenColorMapUv),E.push(b.sheenRoughnessMapUv),E.push(b.specularMapUv),E.push(b.specularColorMapUv),E.push(b.specularIntensityMapUv),E.push(b.transmissionMapUv),E.push(b.thicknessMapUv),E.push(b.combine),E.push(b.fogExp2),E.push(b.sizeAttenuation),E.push(b.morphTargetsCount),E.push(b.morphAttributeCount),E.push(b.numDirLights),E.push(b.numPointLights),E.push(b.numSpotLights),E.push(b.numSpotLightMaps),E.push(b.numHemiLights),E.push(b.numRectAreaLights),E.push(b.numDirLightShadows),E.push(b.numPointLightShadows),E.push(b.numSpotLightShadows),E.push(b.numSpotLightShadowsWithMaps),E.push(b.numLightProbes),E.push(b.shadowMapType),E.push(b.toneMapping),E.push(b.numClippingPlanes),E.push(b.numClipIntersection),E.push(b.depthPacking)}function x(E,b){a.disableAll(),b.isWebGL2&&a.enable(0),b.supportsVertexTextures&&a.enable(1),b.instancing&&a.enable(2),b.instancingColor&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),E.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.skinning&&a.enable(4),b.morphTargets&&a.enable(5),b.morphNormals&&a.enable(6),b.morphColors&&a.enable(7),b.premultipliedAlpha&&a.enable(8),b.shadowMapEnabled&&a.enable(9),b.useLegacyLights&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),E.push(a.mask)}function S(E){const b=v[E.type];let B;if(b){const q=qn[b];B=N1.clone(q.uniforms)}else B=E.uniforms;return B}function P(E,b){let B;for(let q=0,re=c.length;q<re;q++){const U=c[q];if(U.cacheKey===b){B=U,++B.usedTimes;break}}return B===void 0&&(B=new Xb(t,b,E,s),c.push(B)),B}function w(E){if(--E.usedTimes===0){const b=c.indexOf(E);c[b]=c[c.length-1],c.pop(),E.destroy()}}function T(E){l.remove(E)}function O(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:S,acquireProgram:P,releaseProgram:w,releaseShaderCache:T,programs:c,dispose:O}}function Kb(){let t=new WeakMap;function e(s){let o=t.get(s);return o===void 0&&(o={},t.set(s,o)),o}function n(s){t.delete(s)}function i(s,o,a){t.get(s)[o]=a}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function Jb(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Pm(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Lm(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(f,h,p,v,y,m){let d=t[e];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:v,renderOrder:f.renderOrder,z:y,group:m},t[e]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=v,d.renderOrder=f.renderOrder,d.z=y,d.group=m),e++,d}function a(f,h,p,v,y,m){const d=o(f,h,p,v,y,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):n.push(d)}function l(f,h,p,v,y,m){const d=o(f,h,p,v,y,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):n.unshift(d)}function c(f,h){n.length>1&&n.sort(f||Jb),i.length>1&&i.sort(h||Pm),r.length>1&&r.sort(h||Pm)}function u(){for(let f=e,h=t.length;f<h;f++){const p=t[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function Qb(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new Lm,t.set(i,[o])):r>=s.length?(o=new Lm,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function eT(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new I,color:new Ye};break;case"SpotLight":n={position:new I,direction:new I,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new I,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":n={direction:new I,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":n={color:new Ye,position:new I,halfWidth:new I,halfHeight:new I};break}return t[e.id]=n,n}}}function tT(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let nT=0;function iT(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function rT(t,e){const n=new eT,i=tT(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new I);const s=new I,o=new Mt,a=new Mt;function l(u,f){let h=0,p=0,v=0;for(let q=0;q<9;q++)r.probe[q].set(0,0,0);let y=0,m=0,d=0,_=0,x=0,S=0,P=0,w=0,T=0,O=0,E=0;u.sort(iT);const b=f===!0?Math.PI:1;for(let q=0,re=u.length;q<re;q++){const U=u[q],V=U.color,$=U.intensity,ne=U.distance,F=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=V.r*$*b,p+=V.g*$*b,v+=V.b*$*b;else if(U.isLightProbe){for(let G=0;G<9;G++)r.probe[G].addScaledVector(U.sh.coefficients[G],$);E++}else if(U.isDirectionalLight){const G=n.get(U);if(G.color.copy(U.color).multiplyScalar(U.intensity*b),U.castShadow){const C=U.shadow,R=i.get(U);R.shadowBias=C.bias,R.shadowNormalBias=C.normalBias,R.shadowRadius=C.radius,R.shadowMapSize=C.mapSize,r.directionalShadow[y]=R,r.directionalShadowMap[y]=F,r.directionalShadowMatrix[y]=U.shadow.matrix,S++}r.directional[y]=G,y++}else if(U.isSpotLight){const G=n.get(U);G.position.setFromMatrixPosition(U.matrixWorld),G.color.copy(V).multiplyScalar($*b),G.distance=ne,G.coneCos=Math.cos(U.angle),G.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),G.decay=U.decay,r.spot[d]=G;const C=U.shadow;if(U.map&&(r.spotLightMap[T]=U.map,T++,C.updateMatrices(U),U.castShadow&&O++),r.spotLightMatrix[d]=C.matrix,U.castShadow){const R=i.get(U);R.shadowBias=C.bias,R.shadowNormalBias=C.normalBias,R.shadowRadius=C.radius,R.shadowMapSize=C.mapSize,r.spotShadow[d]=R,r.spotShadowMap[d]=F,w++}d++}else if(U.isRectAreaLight){const G=n.get(U);G.color.copy(V).multiplyScalar($),G.halfWidth.set(U.width*.5,0,0),G.halfHeight.set(0,U.height*.5,0),r.rectArea[_]=G,_++}else if(U.isPointLight){const G=n.get(U);if(G.color.copy(U.color).multiplyScalar(U.intensity*b),G.distance=U.distance,G.decay=U.decay,U.castShadow){const C=U.shadow,R=i.get(U);R.shadowBias=C.bias,R.shadowNormalBias=C.normalBias,R.shadowRadius=C.radius,R.shadowMapSize=C.mapSize,R.shadowCameraNear=C.camera.near,R.shadowCameraFar=C.camera.far,r.pointShadow[m]=R,r.pointShadowMap[m]=F,r.pointShadowMatrix[m]=U.shadow.matrix,P++}r.point[m]=G,m++}else if(U.isHemisphereLight){const G=n.get(U);G.skyColor.copy(U.color).multiplyScalar($*b),G.groundColor.copy(U.groundColor).multiplyScalar($*b),r.hemi[x]=G,x++}}_>0&&(e.isWebGL2?t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Se.LTC_FLOAT_1,r.rectAreaLTC2=Se.LTC_FLOAT_2):(r.rectAreaLTC1=Se.LTC_HALF_1,r.rectAreaLTC2=Se.LTC_HALF_2):t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Se.LTC_FLOAT_1,r.rectAreaLTC2=Se.LTC_FLOAT_2):t.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=Se.LTC_HALF_1,r.rectAreaLTC2=Se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=p,r.ambient[2]=v;const B=r.hash;(B.directionalLength!==y||B.pointLength!==m||B.spotLength!==d||B.rectAreaLength!==_||B.hemiLength!==x||B.numDirectionalShadows!==S||B.numPointShadows!==P||B.numSpotShadows!==w||B.numSpotMaps!==T||B.numLightProbes!==E)&&(r.directional.length=y,r.spot.length=d,r.rectArea.length=_,r.point.length=m,r.hemi.length=x,r.directionalShadow.length=S,r.directionalShadowMap.length=S,r.pointShadow.length=P,r.pointShadowMap.length=P,r.spotShadow.length=w,r.spotShadowMap.length=w,r.directionalShadowMatrix.length=S,r.pointShadowMatrix.length=P,r.spotLightMatrix.length=w+T-O,r.spotLightMap.length=T,r.numSpotLightShadowsWithMaps=O,r.numLightProbes=E,B.directionalLength=y,B.pointLength=m,B.spotLength=d,B.rectAreaLength=_,B.hemiLength=x,B.numDirectionalShadows=S,B.numPointShadows=P,B.numSpotShadows=w,B.numSpotMaps=T,B.numLightProbes=E,r.version=nT++)}function c(u,f){let h=0,p=0,v=0,y=0,m=0;const d=f.matrixWorldInverse;for(let _=0,x=u.length;_<x;_++){const S=u[_];if(S.isDirectionalLight){const P=r.directional[h];P.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(d),h++}else if(S.isSpotLight){const P=r.spot[v];P.position.setFromMatrixPosition(S.matrixWorld),P.position.applyMatrix4(d),P.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(d),v++}else if(S.isRectAreaLight){const P=r.rectArea[y];P.position.setFromMatrixPosition(S.matrixWorld),P.position.applyMatrix4(d),a.identity(),o.copy(S.matrixWorld),o.premultiply(d),a.extractRotation(o),P.halfWidth.set(S.width*.5,0,0),P.halfHeight.set(0,S.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),y++}else if(S.isPointLight){const P=r.point[p];P.position.setFromMatrixPosition(S.matrixWorld),P.position.applyMatrix4(d),p++}else if(S.isHemisphereLight){const P=r.hemi[m];P.direction.setFromMatrixPosition(S.matrixWorld),P.direction.transformDirection(d),m++}}}return{setup:l,setupView:c,state:r}}function Nm(t,e){const n=new rT(t,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(f){i.push(f)}function a(f){r.push(f)}function l(f){n.setup(i,f)}function c(f){n.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function sT(t,e){let n=new WeakMap;function i(s,o=0){const a=n.get(s);let l;return a===void 0?(l=new Nm(t,e),n.set(s,[l])):o>=a.length?(l=new Nm(t,e),a.push(l)):l=a[o],l}function r(){n=new WeakMap}return{get:i,dispose:r}}class oT extends Gs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class aT extends Gs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const lT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function uT(t,e,n){let i=new Bh;const r=new de,s=new de,o=new It,a=new oT({depthPacking:WS}),l=new aT,c={},u=n.maxTextureSize,f={[Ki]:cn,[cn]:Ki,[An]:An},h=new Pr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:lT,fragmentShader:cT}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const v=new $t;v.setAttribute("position",new ni(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Qt(v,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hx;let d=this.type;this.render=function(w,T,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const E=t.getRenderTarget(),b=t.getActiveCubeFace(),B=t.getActiveMipmapLevel(),q=t.state;q.setBlending(Xi),q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const re=d!==ui&&this.type===ui,U=d===ui&&this.type!==ui;for(let V=0,$=w.length;V<$;V++){const ne=w[V],F=ne.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;r.copy(F.mapSize);const G=F.getFrameExtents();if(r.multiply(G),s.copy(F.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/G.x),r.x=s.x*G.x,F.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/G.y),r.y=s.y*G.y,F.mapSize.y=s.y)),F.map===null||re===!0||U===!0){const R=this.type!==ui?{minFilter:Jt,magFilter:Jt}:{};F.map!==null&&F.map.dispose(),F.map=new Cr(r.x,r.y,R),F.map.texture.name=ne.name+".shadowMap",F.camera.updateProjectionMatrix()}t.setRenderTarget(F.map),t.clear();const C=F.getViewportCount();for(let R=0;R<C;R++){const j=F.getViewport(R);o.set(s.x*j.x,s.y*j.y,s.x*j.z,s.y*j.w),q.viewport(o),F.updateMatrices(ne,R),i=F.getFrustum(),S(T,O,F.camera,ne,this.type)}F.isPointLightShadow!==!0&&this.type===ui&&_(F,O),F.needsUpdate=!1}d=this.type,m.needsUpdate=!1,t.setRenderTarget(E,b,B)};function _(w,T){const O=e.update(y);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Cr(r.x,r.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(T,null,O,h,y,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(T,null,O,p,y,null)}function x(w,T,O,E){let b=null;const B=O.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(B!==void 0)b=B;else if(b=O.isPointLight===!0?l:a,t.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const q=b.uuid,re=T.uuid;let U=c[q];U===void 0&&(U={},c[q]=U);let V=U[re];V===void 0&&(V=b.clone(),U[re]=V,T.addEventListener("dispose",P)),b=V}if(b.visible=T.visible,b.wireframe=T.wireframe,E===ui?b.side=T.shadowSide!==null?T.shadowSide:T.side:b.side=T.shadowSide!==null?T.shadowSide:f[T.side],b.alphaMap=T.alphaMap,b.alphaTest=T.alphaTest,b.map=T.map,b.clipShadows=T.clipShadows,b.clippingPlanes=T.clippingPlanes,b.clipIntersection=T.clipIntersection,b.displacementMap=T.displacementMap,b.displacementScale=T.displacementScale,b.displacementBias=T.displacementBias,b.wireframeLinewidth=T.wireframeLinewidth,b.linewidth=T.linewidth,O.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const q=t.properties.get(b);q.light=O}return b}function S(w,T,O,E,b){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===ui)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,w.matrixWorld);const re=e.update(w),U=w.material;if(Array.isArray(U)){const V=re.groups;for(let $=0,ne=V.length;$<ne;$++){const F=V[$],G=U[F.materialIndex];if(G&&G.visible){const C=x(w,G,E,b);w.onBeforeShadow(t,w,T,O,re,C,F),t.renderBufferDirect(O,null,re,C,w,F),w.onAfterShadow(t,w,T,O,re,C,F)}}}else if(U.visible){const V=x(w,U,E,b);w.onBeforeShadow(t,w,T,O,re,V,null),t.renderBufferDirect(O,null,re,V,w,null),w.onAfterShadow(t,w,T,O,re,V,null)}}const q=w.children;for(let re=0,U=q.length;re<U;re++)S(q[re],T,O,E,b)}function P(w){w.target.removeEventListener("dispose",P);for(const O in c){const E=c[O],b=w.target.uuid;b in E&&(E[b].dispose(),delete E[b])}}}function dT(t,e,n){const i=n.isWebGL2;function r(){let k=!1;const xe=new It;let we=null;const Fe=new It(0,0,0,0);return{setMask:function(Ue){we!==Ue&&!k&&(t.colorMask(Ue,Ue,Ue,Ue),we=Ue)},setLocked:function(Ue){k=Ue},setClear:function(Ue,Je,Qe,gt,_t){_t===!0&&(Ue*=gt,Je*=gt,Qe*=gt),xe.set(Ue,Je,Qe,gt),Fe.equals(xe)===!1&&(t.clearColor(Ue,Je,Qe,gt),Fe.copy(xe))},reset:function(){k=!1,we=null,Fe.set(-1,0,0,0)}}}function s(){let k=!1,xe=null,we=null,Fe=null;return{setTest:function(Ue){Ue?Me(t.DEPTH_TEST):ge(t.DEPTH_TEST)},setMask:function(Ue){xe!==Ue&&!k&&(t.depthMask(Ue),xe=Ue)},setFunc:function(Ue){if(we!==Ue){switch(Ue){case MS:t.depthFunc(t.NEVER);break;case ES:t.depthFunc(t.ALWAYS);break;case wS:t.depthFunc(t.LESS);break;case Xo:t.depthFunc(t.LEQUAL);break;case bS:t.depthFunc(t.EQUAL);break;case TS:t.depthFunc(t.GEQUAL);break;case Uh:t.depthFunc(t.GREATER);break;case AS:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}we=Ue}},setLocked:function(Ue){k=Ue},setClear:function(Ue){Fe!==Ue&&(t.clearDepth(Ue),Fe=Ue)},reset:function(){k=!1,xe=null,we=null,Fe=null}}}function o(){let k=!1,xe=null,we=null,Fe=null,Ue=null,Je=null,Qe=null,gt=null,_t=null;return{setTest:function(nt){k||(nt?Me(t.STENCIL_TEST):ge(t.STENCIL_TEST))},setMask:function(nt){xe!==nt&&!k&&(t.stencilMask(nt),xe=nt)},setFunc:function(nt,Et,Xn){(we!==nt||Fe!==Et||Ue!==Xn)&&(t.stencilFunc(nt,Et,Xn),we=nt,Fe=Et,Ue=Xn)},setOp:function(nt,Et,Xn){(Je!==nt||Qe!==Et||gt!==Xn)&&(t.stencilOp(nt,Et,Xn),Je=nt,Qe=Et,gt=Xn)},setLocked:function(nt){k=nt},setClear:function(nt){_t!==nt&&(t.clearStencil(nt),_t=nt)},reset:function(){k=!1,xe=null,we=null,Fe=null,Ue=null,Je=null,Qe=null,gt=null,_t=null}}}const a=new r,l=new s,c=new o,u=new WeakMap,f=new WeakMap;let h={},p={},v=new WeakMap,y=[],m=null,d=!1,_=null,x=null,S=null,P=null,w=null,T=null,O=null,E=new Ye(0,0,0),b=0,B=!1,q=null,re=null,U=null,V=null,$=null;const ne=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,G=0;const C=t.getParameter(t.VERSION);C.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(C)[1]),F=G>=1):C.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(C)[1]),F=G>=2);let R=null,j={};const z=t.getParameter(t.SCISSOR_BOX),Y=t.getParameter(t.VIEWPORT),Q=new It().fromArray(z),ie=new It().fromArray(Y);function J(k,xe,we,Fe){const Ue=new Uint8Array(4),Je=t.createTexture();t.bindTexture(k,Je),t.texParameteri(k,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(k,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Qe=0;Qe<we;Qe++)i&&(k===t.TEXTURE_3D||k===t.TEXTURE_2D_ARRAY)?t.texImage3D(xe,0,t.RGBA,1,1,Fe,0,t.RGBA,t.UNSIGNED_BYTE,Ue):t.texImage2D(xe+Qe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Ue);return Je}const me={};me[t.TEXTURE_2D]=J(t.TEXTURE_2D,t.TEXTURE_2D,1),me[t.TEXTURE_CUBE_MAP]=J(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(me[t.TEXTURE_2D_ARRAY]=J(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),me[t.TEXTURE_3D]=J(t.TEXTURE_3D,t.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Me(t.DEPTH_TEST),l.setFunc(Xo),ve(!1),A(fp),Me(t.CULL_FACE),te(Xi);function Me(k){h[k]!==!0&&(t.enable(k),h[k]=!0)}function ge(k){h[k]!==!1&&(t.disable(k),h[k]=!1)}function Ee(k,xe){return p[k]!==xe?(t.bindFramebuffer(k,xe),p[k]=xe,i&&(k===t.DRAW_FRAMEBUFFER&&(p[t.FRAMEBUFFER]=xe),k===t.FRAMEBUFFER&&(p[t.DRAW_FRAMEBUFFER]=xe)),!0):!1}function D(k,xe){let we=y,Fe=!1;if(k)if(we=v.get(xe),we===void 0&&(we=[],v.set(xe,we)),k.isWebGLMultipleRenderTargets){const Ue=k.texture;if(we.length!==Ue.length||we[0]!==t.COLOR_ATTACHMENT0){for(let Je=0,Qe=Ue.length;Je<Qe;Je++)we[Je]=t.COLOR_ATTACHMENT0+Je;we.length=Ue.length,Fe=!0}}else we[0]!==t.COLOR_ATTACHMENT0&&(we[0]=t.COLOR_ATTACHMENT0,Fe=!0);else we[0]!==t.BACK&&(we[0]=t.BACK,Fe=!0);Fe&&(n.isWebGL2?t.drawBuffers(we):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(we))}function ue(k){return m!==k?(t.useProgram(k),m=k,!0):!1}const X={[ur]:t.FUNC_ADD,[aS]:t.FUNC_SUBTRACT,[lS]:t.FUNC_REVERSE_SUBTRACT};if(i)X[xp]=t.MIN,X[vp]=t.MAX;else{const k=e.get("EXT_blend_minmax");k!==null&&(X[xp]=k.MIN_EXT,X[vp]=k.MAX_EXT)}const se={[cS]:t.ZERO,[uS]:t.ONE,[dS]:t.SRC_COLOR,[bd]:t.SRC_ALPHA,[xS]:t.SRC_ALPHA_SATURATE,[mS]:t.DST_COLOR,[fS]:t.DST_ALPHA,[hS]:t.ONE_MINUS_SRC_COLOR,[Td]:t.ONE_MINUS_SRC_ALPHA,[gS]:t.ONE_MINUS_DST_COLOR,[pS]:t.ONE_MINUS_DST_ALPHA,[vS]:t.CONSTANT_COLOR,[_S]:t.ONE_MINUS_CONSTANT_COLOR,[yS]:t.CONSTANT_ALPHA,[SS]:t.ONE_MINUS_CONSTANT_ALPHA};function te(k,xe,we,Fe,Ue,Je,Qe,gt,_t,nt){if(k===Xi){d===!0&&(ge(t.BLEND),d=!1);return}if(d===!1&&(Me(t.BLEND),d=!0),k!==oS){if(k!==_||nt!==B){if((x!==ur||w!==ur)&&(t.blendEquation(t.FUNC_ADD),x=ur,w=ur),nt)switch(k){case bs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case pp:t.blendFunc(t.ONE,t.ONE);break;case mp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case gp:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case bs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case pp:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case mp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case gp:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}S=null,P=null,T=null,O=null,E.set(0,0,0),b=0,_=k,B=nt}return}Ue=Ue||xe,Je=Je||we,Qe=Qe||Fe,(xe!==x||Ue!==w)&&(t.blendEquationSeparate(X[xe],X[Ue]),x=xe,w=Ue),(we!==S||Fe!==P||Je!==T||Qe!==O)&&(t.blendFuncSeparate(se[we],se[Fe],se[Je],se[Qe]),S=we,P=Fe,T=Je,O=Qe),(gt.equals(E)===!1||_t!==b)&&(t.blendColor(gt.r,gt.g,gt.b,_t),E.copy(gt),b=_t),_=k,B=!1}function Te(k,xe){k.side===An?ge(t.CULL_FACE):Me(t.CULL_FACE);let we=k.side===cn;xe&&(we=!we),ve(we),k.blending===bs&&k.transparent===!1?te(Xi):te(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),l.setFunc(k.depthFunc),l.setTest(k.depthTest),l.setMask(k.depthWrite),a.setMask(k.colorWrite);const Fe=k.stencilWrite;c.setTest(Fe),Fe&&(c.setMask(k.stencilWriteMask),c.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),c.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),H(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Me(t.SAMPLE_ALPHA_TO_COVERAGE):ge(t.SAMPLE_ALPHA_TO_COVERAGE)}function ve(k){q!==k&&(k?t.frontFace(t.CW):t.frontFace(t.CCW),q=k)}function A(k){k!==rS?(Me(t.CULL_FACE),k!==re&&(k===fp?t.cullFace(t.BACK):k===sS?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ge(t.CULL_FACE),re=k}function M(k){k!==U&&(F&&t.lineWidth(k),U=k)}function H(k,xe,we){k?(Me(t.POLYGON_OFFSET_FILL),(V!==xe||$!==we)&&(t.polygonOffset(xe,we),V=xe,$=we)):ge(t.POLYGON_OFFSET_FILL)}function ce(k){k?Me(t.SCISSOR_TEST):ge(t.SCISSOR_TEST)}function ae(k){k===void 0&&(k=t.TEXTURE0+ne-1),R!==k&&(t.activeTexture(k),R=k)}function oe(k,xe,we){we===void 0&&(R===null?we=t.TEXTURE0+ne-1:we=R);let Fe=j[we];Fe===void 0&&(Fe={type:void 0,texture:void 0},j[we]=Fe),(Fe.type!==k||Fe.texture!==xe)&&(R!==we&&(t.activeTexture(we),R=we),t.bindTexture(k,xe||me[k]),Fe.type=k,Fe.texture=xe)}function Ae(){const k=j[R];k!==void 0&&k.type!==void 0&&(t.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ye(){try{t.compressedTexImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function be(){try{t.compressedTexImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Le(){try{t.texSubImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Oe(){try{t.texSubImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function le(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ge(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function He(){try{t.texStorage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ke(){try{t.texStorage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function De(){try{t.texImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function _e(){try{t.texImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function N(k){Q.equals(k)===!1&&(t.scissor(k.x,k.y,k.z,k.w),Q.copy(k))}function fe(k){ie.equals(k)===!1&&(t.viewport(k.x,k.y,k.z,k.w),ie.copy(k))}function Ne(k,xe){let we=f.get(xe);we===void 0&&(we=new WeakMap,f.set(xe,we));let Fe=we.get(k);Fe===void 0&&(Fe=t.getUniformBlockIndex(xe,k.name),we.set(k,Fe))}function Pe(k,xe){const Fe=f.get(xe).get(k);u.get(xe)!==Fe&&(t.uniformBlockBinding(xe,Fe,k.__bindingPointIndex),u.set(xe,Fe))}function he(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),i===!0&&(t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},R=null,j={},p={},v=new WeakMap,y=[],m=null,d=!1,_=null,x=null,S=null,P=null,w=null,T=null,O=null,E=new Ye(0,0,0),b=0,B=!1,q=null,re=null,U=null,V=null,$=null,Q.set(0,0,t.canvas.width,t.canvas.height),ie.set(0,0,t.canvas.width,t.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Me,disable:ge,bindFramebuffer:Ee,drawBuffers:D,useProgram:ue,setBlending:te,setMaterial:Te,setFlipSided:ve,setCullFace:A,setLineWidth:M,setPolygonOffset:H,setScissorTest:ce,activeTexture:ae,bindTexture:oe,unbindTexture:Ae,compressedTexImage2D:ye,compressedTexImage3D:be,texImage2D:De,texImage3D:_e,updateUBOMapping:Ne,uniformBlockBinding:Pe,texStorage2D:He,texStorage3D:ke,texSubImage2D:Le,texSubImage3D:Oe,compressedTexSubImage2D:le,compressedTexSubImage3D:Ge,scissor:N,viewport:fe,reset:he}}function hT(t,e,n,i,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(A,M){return p?new OffscreenCanvas(A,M):jl("canvas")}function y(A,M,H,ce){let ae=1;if((A.width>ce||A.height>ce)&&(ae=ce/Math.max(A.width,A.height)),ae<1||M===!0)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){const oe=M?Gl:Math.floor,Ae=oe(ae*A.width),ye=oe(ae*A.height);f===void 0&&(f=v(Ae,ye));const be=H?v(Ae,ye):f;return be.width=Ae,be.height=ye,be.getContext("2d").drawImage(A,0,0,Ae,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+Ae+"x"+ye+")."),be}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function m(A){return Nd(A.width)&&Nd(A.height)}function d(A){return a?!1:A.wrapS!==Hn||A.wrapT!==Hn||A.minFilter!==Jt&&A.minFilter!==wn}function _(A,M){return A.generateMipmaps&&M&&A.minFilter!==Jt&&A.minFilter!==wn}function x(A){t.generateMipmap(A)}function S(A,M,H,ce,ae=!1){if(a===!1)return M;if(A!==null){if(t[A]!==void 0)return t[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let oe=M;if(M===t.RED&&(H===t.FLOAT&&(oe=t.R32F),H===t.HALF_FLOAT&&(oe=t.R16F),H===t.UNSIGNED_BYTE&&(oe=t.R8)),M===t.RED_INTEGER&&(H===t.UNSIGNED_BYTE&&(oe=t.R8UI),H===t.UNSIGNED_SHORT&&(oe=t.R16UI),H===t.UNSIGNED_INT&&(oe=t.R32UI),H===t.BYTE&&(oe=t.R8I),H===t.SHORT&&(oe=t.R16I),H===t.INT&&(oe=t.R32I)),M===t.RG&&(H===t.FLOAT&&(oe=t.RG32F),H===t.HALF_FLOAT&&(oe=t.RG16F),H===t.UNSIGNED_BYTE&&(oe=t.RG8)),M===t.RGBA){const Ae=ae?zl:rt.getTransfer(ce);H===t.FLOAT&&(oe=t.RGBA32F),H===t.HALF_FLOAT&&(oe=t.RGBA16F),H===t.UNSIGNED_BYTE&&(oe=Ae===at?t.SRGB8_ALPHA8:t.RGBA8),H===t.UNSIGNED_SHORT_4_4_4_4&&(oe=t.RGBA4),H===t.UNSIGNED_SHORT_5_5_5_1&&(oe=t.RGB5_A1)}return(oe===t.R16F||oe===t.R32F||oe===t.RG16F||oe===t.RG32F||oe===t.RGBA16F||oe===t.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function P(A,M,H){return _(A,H)===!0||A.isFramebufferTexture&&A.minFilter!==Jt&&A.minFilter!==wn?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function w(A){return A===Jt||A===_p||A===Wc?t.NEAREST:t.LINEAR}function T(A){const M=A.target;M.removeEventListener("dispose",T),E(M),M.isVideoTexture&&u.delete(M)}function O(A){const M=A.target;M.removeEventListener("dispose",O),B(M)}function E(A){const M=i.get(A);if(M.__webglInit===void 0)return;const H=A.source,ce=h.get(H);if(ce){const ae=ce[M.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&b(A),Object.keys(ce).length===0&&h.delete(H)}i.remove(A)}function b(A){const M=i.get(A);t.deleteTexture(M.__webglTexture);const H=A.source,ce=h.get(H);delete ce[M.__cacheKey],o.memory.textures--}function B(A){const M=A.texture,H=i.get(A),ce=i.get(M);if(ce.__webglTexture!==void 0&&(t.deleteTexture(ce.__webglTexture),o.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let ae=0;ae<6;ae++){if(Array.isArray(H.__webglFramebuffer[ae]))for(let oe=0;oe<H.__webglFramebuffer[ae].length;oe++)t.deleteFramebuffer(H.__webglFramebuffer[ae][oe]);else t.deleteFramebuffer(H.__webglFramebuffer[ae]);H.__webglDepthbuffer&&t.deleteRenderbuffer(H.__webglDepthbuffer[ae])}else{if(Array.isArray(H.__webglFramebuffer))for(let ae=0;ae<H.__webglFramebuffer.length;ae++)t.deleteFramebuffer(H.__webglFramebuffer[ae]);else t.deleteFramebuffer(H.__webglFramebuffer);if(H.__webglDepthbuffer&&t.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&t.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let ae=0;ae<H.__webglColorRenderbuffer.length;ae++)H.__webglColorRenderbuffer[ae]&&t.deleteRenderbuffer(H.__webglColorRenderbuffer[ae]);H.__webglDepthRenderbuffer&&t.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let ae=0,oe=M.length;ae<oe;ae++){const Ae=i.get(M[ae]);Ae.__webglTexture&&(t.deleteTexture(Ae.__webglTexture),o.memory.textures--),i.remove(M[ae])}i.remove(M),i.remove(A)}let q=0;function re(){q=0}function U(){const A=q;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),q+=1,A}function V(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function $(A,M){const H=i.get(A);if(A.isVideoTexture&&Te(A),A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version){const ce=A.image;if(ce===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ce.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(H,A,M);return}}n.bindTexture(t.TEXTURE_2D,H.__webglTexture,t.TEXTURE0+M)}function ne(A,M){const H=i.get(A);if(A.version>0&&H.__version!==A.version){Q(H,A,M);return}n.bindTexture(t.TEXTURE_2D_ARRAY,H.__webglTexture,t.TEXTURE0+M)}function F(A,M){const H=i.get(A);if(A.version>0&&H.__version!==A.version){Q(H,A,M);return}n.bindTexture(t.TEXTURE_3D,H.__webglTexture,t.TEXTURE0+M)}function G(A,M){const H=i.get(A);if(A.version>0&&H.__version!==A.version){ie(H,A,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,H.__webglTexture,t.TEXTURE0+M)}const C={[Rd]:t.REPEAT,[Hn]:t.CLAMP_TO_EDGE,[Pd]:t.MIRRORED_REPEAT},R={[Jt]:t.NEAREST,[_p]:t.NEAREST_MIPMAP_NEAREST,[Wc]:t.NEAREST_MIPMAP_LINEAR,[wn]:t.LINEAR,[US]:t.LINEAR_MIPMAP_NEAREST,[Yo]:t.LINEAR_MIPMAP_LINEAR},j={[YS]:t.NEVER,[QS]:t.ALWAYS,[$S]:t.LESS,[Tx]:t.LEQUAL,[qS]:t.EQUAL,[JS]:t.GEQUAL,[ZS]:t.GREATER,[KS]:t.NOTEQUAL};function z(A,M,H){if(H?(t.texParameteri(A,t.TEXTURE_WRAP_S,C[M.wrapS]),t.texParameteri(A,t.TEXTURE_WRAP_T,C[M.wrapT]),(A===t.TEXTURE_3D||A===t.TEXTURE_2D_ARRAY)&&t.texParameteri(A,t.TEXTURE_WRAP_R,C[M.wrapR]),t.texParameteri(A,t.TEXTURE_MAG_FILTER,R[M.magFilter]),t.texParameteri(A,t.TEXTURE_MIN_FILTER,R[M.minFilter])):(t.texParameteri(A,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(A,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),(A===t.TEXTURE_3D||A===t.TEXTURE_2D_ARRAY)&&t.texParameteri(A,t.TEXTURE_WRAP_R,t.CLAMP_TO_EDGE),(M.wrapS!==Hn||M.wrapT!==Hn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(A,t.TEXTURE_MAG_FILTER,w(M.magFilter)),t.texParameteri(A,t.TEXTURE_MIN_FILTER,w(M.minFilter)),M.minFilter!==Jt&&M.minFilter!==wn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(t.texParameteri(A,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(A,t.TEXTURE_COMPARE_FUNC,j[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ce=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===Jt||M.minFilter!==Wc&&M.minFilter!==Yo||M.type===Oi&&e.has("OES_texture_float_linear")===!1||a===!1&&M.type===$o&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||i.get(M).__currentAnisotropy)&&(t.texParameterf(A,ce.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy)}}function Y(A,M){let H=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",T));const ce=M.source;let ae=h.get(ce);ae===void 0&&(ae={},h.set(ce,ae));const oe=V(M);if(oe!==A.__cacheKey){ae[oe]===void 0&&(ae[oe]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ae[oe].usedTimes++;const Ae=ae[A.__cacheKey];Ae!==void 0&&(ae[A.__cacheKey].usedTimes--,Ae.usedTimes===0&&b(M)),A.__cacheKey=oe,A.__webglTexture=ae[oe].texture}return H}function Q(A,M,H){let ce=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ce=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ce=t.TEXTURE_3D);const ae=Y(A,M),oe=M.source;n.bindTexture(ce,A.__webglTexture,t.TEXTURE0+H);const Ae=i.get(oe);if(oe.version!==Ae.__version||ae===!0){n.activeTexture(t.TEXTURE0+H);const ye=rt.getPrimaries(rt.workingColorSpace),be=M.colorSpace===Cn?null:rt.getPrimaries(M.colorSpace),Le=M.colorSpace===Cn||ye===be?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);const Oe=d(M)&&m(M.image)===!1;let le=y(M.image,Oe,!1,r.maxTextureSize);le=ve(M,le);const Ge=m(le)||a,He=s.convert(M.format,M.colorSpace);let ke=s.convert(M.type),De=S(M.internalFormat,He,ke,M.colorSpace,M.isVideoTexture);z(ce,M,Ge);let _e;const N=M.mipmaps,fe=a&&M.isVideoTexture!==!0&&De!==Ex,Ne=Ae.__version===void 0||ae===!0,Pe=P(M,le,Ge);if(M.isDepthTexture)De=t.DEPTH_COMPONENT,a?M.type===Oi?De=t.DEPTH_COMPONENT32F:M.type===ki?De=t.DEPTH_COMPONENT24:M.type===_r?De=t.DEPTH24_STENCIL8:De=t.DEPTH_COMPONENT16:M.type===Oi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===yr&&De===t.DEPTH_COMPONENT&&M.type!==kh&&M.type!==ki&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=ki,ke=s.convert(M.type)),M.format===Os&&De===t.DEPTH_COMPONENT&&(De=t.DEPTH_STENCIL,M.type!==_r&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=_r,ke=s.convert(M.type))),Ne&&(fe?n.texStorage2D(t.TEXTURE_2D,1,De,le.width,le.height):n.texImage2D(t.TEXTURE_2D,0,De,le.width,le.height,0,He,ke,null));else if(M.isDataTexture)if(N.length>0&&Ge){fe&&Ne&&n.texStorage2D(t.TEXTURE_2D,Pe,De,N[0].width,N[0].height);for(let he=0,k=N.length;he<k;he++)_e=N[he],fe?n.texSubImage2D(t.TEXTURE_2D,he,0,0,_e.width,_e.height,He,ke,_e.data):n.texImage2D(t.TEXTURE_2D,he,De,_e.width,_e.height,0,He,ke,_e.data);M.generateMipmaps=!1}else fe?(Ne&&n.texStorage2D(t.TEXTURE_2D,Pe,De,le.width,le.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,le.width,le.height,He,ke,le.data)):n.texImage2D(t.TEXTURE_2D,0,De,le.width,le.height,0,He,ke,le.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){fe&&Ne&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Pe,De,N[0].width,N[0].height,le.depth);for(let he=0,k=N.length;he<k;he++)_e=N[he],M.format!==Vn?He!==null?fe?n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,he,0,0,0,_e.width,_e.height,le.depth,He,_e.data,0,0):n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,he,De,_e.width,_e.height,le.depth,0,_e.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):fe?n.texSubImage3D(t.TEXTURE_2D_ARRAY,he,0,0,0,_e.width,_e.height,le.depth,He,ke,_e.data):n.texImage3D(t.TEXTURE_2D_ARRAY,he,De,_e.width,_e.height,le.depth,0,He,ke,_e.data)}else{fe&&Ne&&n.texStorage2D(t.TEXTURE_2D,Pe,De,N[0].width,N[0].height);for(let he=0,k=N.length;he<k;he++)_e=N[he],M.format!==Vn?He!==null?fe?n.compressedTexSubImage2D(t.TEXTURE_2D,he,0,0,_e.width,_e.height,He,_e.data):n.compressedTexImage2D(t.TEXTURE_2D,he,De,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):fe?n.texSubImage2D(t.TEXTURE_2D,he,0,0,_e.width,_e.height,He,ke,_e.data):n.texImage2D(t.TEXTURE_2D,he,De,_e.width,_e.height,0,He,ke,_e.data)}else if(M.isDataArrayTexture)fe?(Ne&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Pe,De,le.width,le.height,le.depth),n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,He,ke,le.data)):n.texImage3D(t.TEXTURE_2D_ARRAY,0,De,le.width,le.height,le.depth,0,He,ke,le.data);else if(M.isData3DTexture)fe?(Ne&&n.texStorage3D(t.TEXTURE_3D,Pe,De,le.width,le.height,le.depth),n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,He,ke,le.data)):n.texImage3D(t.TEXTURE_3D,0,De,le.width,le.height,le.depth,0,He,ke,le.data);else if(M.isFramebufferTexture){if(Ne)if(fe)n.texStorage2D(t.TEXTURE_2D,Pe,De,le.width,le.height);else{let he=le.width,k=le.height;for(let xe=0;xe<Pe;xe++)n.texImage2D(t.TEXTURE_2D,xe,De,he,k,0,He,ke,null),he>>=1,k>>=1}}else if(N.length>0&&Ge){fe&&Ne&&n.texStorage2D(t.TEXTURE_2D,Pe,De,N[0].width,N[0].height);for(let he=0,k=N.length;he<k;he++)_e=N[he],fe?n.texSubImage2D(t.TEXTURE_2D,he,0,0,He,ke,_e):n.texImage2D(t.TEXTURE_2D,he,De,He,ke,_e);M.generateMipmaps=!1}else fe?(Ne&&n.texStorage2D(t.TEXTURE_2D,Pe,De,le.width,le.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,He,ke,le)):n.texImage2D(t.TEXTURE_2D,0,De,He,ke,le);_(M,Ge)&&x(ce),Ae.__version=oe.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function ie(A,M,H){if(M.image.length!==6)return;const ce=Y(A,M),ae=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,A.__webglTexture,t.TEXTURE0+H);const oe=i.get(ae);if(ae.version!==oe.__version||ce===!0){n.activeTexture(t.TEXTURE0+H);const Ae=rt.getPrimaries(rt.workingColorSpace),ye=M.colorSpace===Cn?null:rt.getPrimaries(M.colorSpace),be=M.colorSpace===Cn||Ae===ye?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Le=M.isCompressedTexture||M.image[0].isCompressedTexture,Oe=M.image[0]&&M.image[0].isDataTexture,le=[];for(let he=0;he<6;he++)!Le&&!Oe?le[he]=y(M.image[he],!1,!0,r.maxCubemapSize):le[he]=Oe?M.image[he].image:M.image[he],le[he]=ve(M,le[he]);const Ge=le[0],He=m(Ge)||a,ke=s.convert(M.format,M.colorSpace),De=s.convert(M.type),_e=S(M.internalFormat,ke,De,M.colorSpace),N=a&&M.isVideoTexture!==!0,fe=oe.__version===void 0||ce===!0;let Ne=P(M,Ge,He);z(t.TEXTURE_CUBE_MAP,M,He);let Pe;if(Le){N&&fe&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Ne,_e,Ge.width,Ge.height);for(let he=0;he<6;he++){Pe=le[he].mipmaps;for(let k=0;k<Pe.length;k++){const xe=Pe[k];M.format!==Vn?ke!==null?N?n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,k,0,0,xe.width,xe.height,ke,xe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,k,_e,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,k,0,0,xe.width,xe.height,ke,De,xe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,k,_e,xe.width,xe.height,0,ke,De,xe.data)}}}else{Pe=M.mipmaps,N&&fe&&(Pe.length>0&&Ne++,n.texStorage2D(t.TEXTURE_CUBE_MAP,Ne,_e,le[0].width,le[0].height));for(let he=0;he<6;he++)if(Oe){N?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,le[he].width,le[he].height,ke,De,le[he].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,_e,le[he].width,le[he].height,0,ke,De,le[he].data);for(let k=0;k<Pe.length;k++){const we=Pe[k].image[he].image;N?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,k+1,0,0,we.width,we.height,ke,De,we.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,k+1,_e,we.width,we.height,0,ke,De,we.data)}}else{N?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,ke,De,le[he]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,_e,ke,De,le[he]);for(let k=0;k<Pe.length;k++){const xe=Pe[k];N?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,k+1,0,0,ke,De,xe.image[he]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+he,k+1,_e,ke,De,xe.image[he])}}}_(M,He)&&x(t.TEXTURE_CUBE_MAP),oe.__version=ae.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function J(A,M,H,ce,ae,oe){const Ae=s.convert(H.format,H.colorSpace),ye=s.convert(H.type),be=S(H.internalFormat,Ae,ye,H.colorSpace);if(!i.get(M).__hasExternalTextures){const Oe=Math.max(1,M.width>>oe),le=Math.max(1,M.height>>oe);ae===t.TEXTURE_3D||ae===t.TEXTURE_2D_ARRAY?n.texImage3D(ae,oe,be,Oe,le,M.depth,0,Ae,ye,null):n.texImage2D(ae,oe,be,Oe,le,0,Ae,ye,null)}n.bindFramebuffer(t.FRAMEBUFFER,A),te(M)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ce,ae,i.get(H).__webglTexture,0,se(M)):(ae===t.TEXTURE_2D||ae>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ce,ae,i.get(H).__webglTexture,oe),n.bindFramebuffer(t.FRAMEBUFFER,null)}function me(A,M,H){if(t.bindRenderbuffer(t.RENDERBUFFER,A),M.depthBuffer&&!M.stencilBuffer){let ce=a===!0?t.DEPTH_COMPONENT24:t.DEPTH_COMPONENT16;if(H||te(M)){const ae=M.depthTexture;ae&&ae.isDepthTexture&&(ae.type===Oi?ce=t.DEPTH_COMPONENT32F:ae.type===ki&&(ce=t.DEPTH_COMPONENT24));const oe=se(M);te(M)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,oe,ce,M.width,M.height):t.renderbufferStorageMultisample(t.RENDERBUFFER,oe,ce,M.width,M.height)}else t.renderbufferStorage(t.RENDERBUFFER,ce,M.width,M.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,A)}else if(M.depthBuffer&&M.stencilBuffer){const ce=se(M);H&&te(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,ce,t.DEPTH24_STENCIL8,M.width,M.height):te(M)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ce,t.DEPTH24_STENCIL8,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,A)}else{const ce=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let ae=0;ae<ce.length;ae++){const oe=ce[ae],Ae=s.convert(oe.format,oe.colorSpace),ye=s.convert(oe.type),be=S(oe.internalFormat,Ae,ye,oe.colorSpace),Le=se(M);H&&te(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Le,be,M.width,M.height):te(M)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Le,be,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,be,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Me(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),$(M.depthTexture,0);const ce=i.get(M.depthTexture).__webglTexture,ae=se(M);if(M.depthTexture.format===yr)te(M)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ce,0,ae):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ce,0);else if(M.depthTexture.format===Os)te(M)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ce,0,ae):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ce,0);else throw new Error("Unknown depthTexture format")}function ge(A){const M=i.get(A),H=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Me(M.__webglFramebuffer,A)}else if(H){M.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[ce]),M.__webglDepthbuffer[ce]=t.createRenderbuffer(),me(M.__webglDepthbuffer[ce],A,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=t.createRenderbuffer(),me(M.__webglDepthbuffer,A,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ee(A,M,H){const ce=i.get(A);M!==void 0&&J(ce.__webglFramebuffer,A,A.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),H!==void 0&&ge(A)}function D(A){const M=A.texture,H=i.get(A),ce=i.get(M);A.addEventListener("dispose",O),A.isWebGLMultipleRenderTargets!==!0&&(ce.__webglTexture===void 0&&(ce.__webglTexture=t.createTexture()),ce.__version=M.version,o.memory.textures++);const ae=A.isWebGLCubeRenderTarget===!0,oe=A.isWebGLMultipleRenderTargets===!0,Ae=m(A)||a;if(ae){H.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(a&&M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[ye]=[];for(let be=0;be<M.mipmaps.length;be++)H.__webglFramebuffer[ye][be]=t.createFramebuffer()}else H.__webglFramebuffer[ye]=t.createFramebuffer()}else{if(a&&M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let ye=0;ye<M.mipmaps.length;ye++)H.__webglFramebuffer[ye]=t.createFramebuffer()}else H.__webglFramebuffer=t.createFramebuffer();if(oe)if(r.drawBuffers){const ye=A.texture;for(let be=0,Le=ye.length;be<Le;be++){const Oe=i.get(ye[be]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=t.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&A.samples>0&&te(A)===!1){const ye=oe?M:[M];H.__webglMultisampledFramebuffer=t.createFramebuffer(),H.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let be=0;be<ye.length;be++){const Le=ye[be];H.__webglColorRenderbuffer[be]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,H.__webglColorRenderbuffer[be]);const Oe=s.convert(Le.format,Le.colorSpace),le=s.convert(Le.type),Ge=S(Le.internalFormat,Oe,le,Le.colorSpace,A.isXRRenderTarget===!0),He=se(A);t.renderbufferStorageMultisample(t.RENDERBUFFER,He,Ge,A.width,A.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+be,t.RENDERBUFFER,H.__webglColorRenderbuffer[be])}t.bindRenderbuffer(t.RENDERBUFFER,null),A.depthBuffer&&(H.__webglDepthRenderbuffer=t.createRenderbuffer(),me(H.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ae){n.bindTexture(t.TEXTURE_CUBE_MAP,ce.__webglTexture),z(t.TEXTURE_CUBE_MAP,M,Ae);for(let ye=0;ye<6;ye++)if(a&&M.mipmaps&&M.mipmaps.length>0)for(let be=0;be<M.mipmaps.length;be++)J(H.__webglFramebuffer[ye][be],A,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,be);else J(H.__webglFramebuffer[ye],A,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);_(M,Ae)&&x(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(oe){const ye=A.texture;for(let be=0,Le=ye.length;be<Le;be++){const Oe=ye[be],le=i.get(Oe);n.bindTexture(t.TEXTURE_2D,le.__webglTexture),z(t.TEXTURE_2D,Oe,Ae),J(H.__webglFramebuffer,A,Oe,t.COLOR_ATTACHMENT0+be,t.TEXTURE_2D,0),_(Oe,Ae)&&x(t.TEXTURE_2D)}n.unbindTexture()}else{let ye=t.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(a?ye=A.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(ye,ce.__webglTexture),z(ye,M,Ae),a&&M.mipmaps&&M.mipmaps.length>0)for(let be=0;be<M.mipmaps.length;be++)J(H.__webglFramebuffer[be],A,M,t.COLOR_ATTACHMENT0,ye,be);else J(H.__webglFramebuffer,A,M,t.COLOR_ATTACHMENT0,ye,0);_(M,Ae)&&x(ye),n.unbindTexture()}A.depthBuffer&&ge(A)}function ue(A){const M=m(A)||a,H=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let ce=0,ae=H.length;ce<ae;ce++){const oe=H[ce];if(_(oe,M)){const Ae=A.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,ye=i.get(oe).__webglTexture;n.bindTexture(Ae,ye),x(Ae),n.unbindTexture()}}}function X(A){if(a&&A.samples>0&&te(A)===!1){const M=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],H=A.width,ce=A.height;let ae=t.COLOR_BUFFER_BIT;const oe=[],Ae=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ye=i.get(A),be=A.isWebGLMultipleRenderTargets===!0;if(be)for(let Le=0;Le<M.length;Le++)n.bindFramebuffer(t.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Le,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ye.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Le,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let Le=0;Le<M.length;Le++){oe.push(t.COLOR_ATTACHMENT0+Le),A.depthBuffer&&oe.push(Ae);const Oe=ye.__ignoreDepthValues!==void 0?ye.__ignoreDepthValues:!1;if(Oe===!1&&(A.depthBuffer&&(ae|=t.DEPTH_BUFFER_BIT),A.stencilBuffer&&(ae|=t.STENCIL_BUFFER_BIT)),be&&t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ye.__webglColorRenderbuffer[Le]),Oe===!0&&(t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[Ae]),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[Ae])),be){const le=i.get(M[Le]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,le,0)}t.blitFramebuffer(0,0,H,ce,0,0,H,ce,ae,t.NEAREST),c&&t.invalidateFramebuffer(t.READ_FRAMEBUFFER,oe)}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),be)for(let Le=0;Le<M.length;Le++){n.bindFramebuffer(t.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Le,t.RENDERBUFFER,ye.__webglColorRenderbuffer[Le]);const Oe=i.get(M[Le]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ye.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Le,t.TEXTURE_2D,Oe,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}}function se(A){return Math.min(r.maxSamples,A.samples)}function te(A){const M=i.get(A);return a&&A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Te(A){const M=o.render.frame;u.get(A)!==M&&(u.set(A,M),A.update())}function ve(A,M){const H=A.colorSpace,ce=A.format,ae=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===Ld||H!==Si&&H!==Cn&&(rt.getTransfer(H)===at?a===!1?e.has("EXT_sRGB")===!0&&ce===Vn?(A.format=Ld,A.minFilter=wn,A.generateMipmaps=!1):M=Cx.sRGBToLinear(M):(ce!==Vn||ae!==$i)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),M}this.allocateTextureUnit=U,this.resetTextureUnits=re,this.setTexture2D=$,this.setTexture2DArray=ne,this.setTexture3D=F,this.setTextureCube=G,this.rebindTextures=Ee,this.setupRenderTarget=D,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=X,this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=J,this.useMultisampledRTT=te}function fT(t,e,n){const i=n.isWebGL2;function r(s,o=Cn){let a;const l=rt.getTransfer(o);if(s===$i)return t.UNSIGNED_BYTE;if(s===vx)return t.UNSIGNED_SHORT_4_4_4_4;if(s===_x)return t.UNSIGNED_SHORT_5_5_5_1;if(s===kS)return t.BYTE;if(s===OS)return t.SHORT;if(s===kh)return t.UNSIGNED_SHORT;if(s===xx)return t.INT;if(s===ki)return t.UNSIGNED_INT;if(s===Oi)return t.FLOAT;if(s===$o)return i?t.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===FS)return t.ALPHA;if(s===Vn)return t.RGBA;if(s===zS)return t.LUMINANCE;if(s===BS)return t.LUMINANCE_ALPHA;if(s===yr)return t.DEPTH_COMPONENT;if(s===Os)return t.DEPTH_STENCIL;if(s===Ld)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===HS)return t.RED;if(s===yx)return t.RED_INTEGER;if(s===VS)return t.RG;if(s===Sx)return t.RG_INTEGER;if(s===Mx)return t.RGBA_INTEGER;if(s===Xc||s===Yc||s===$c||s===qc)if(l===at)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Xc)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Yc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===$c)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===qc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Xc)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Yc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===$c)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===qc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===yp||s===Sp||s===Mp||s===Ep)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===yp)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Sp)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Mp)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ep)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Ex)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===wp||s===bp)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===wp)return l===at?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===bp)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Tp||s===Ap||s===Cp||s===Rp||s===Pp||s===Lp||s===Np||s===Dp||s===Ip||s===Up||s===kp||s===Op||s===Fp||s===zp)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Tp)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ap)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Cp)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Rp)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Pp)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Lp)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Np)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Dp)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Ip)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Up)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===kp)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Op)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Fp)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===zp)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Zc||s===Bp||s===Hp)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Zc)return l===at?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Bp)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Hp)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===GS||s===Vp||s===Gp||s===jp)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Zc)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Vp)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Gp)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===jp)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===_r?i?t.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):t[s]!==void 0?t[s]:null}return{convert:r}}class pT extends Tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Kn extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const mT={type:"move"};class _u{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Kn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Kn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Kn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const m=n.getJointPose(y,i),d=this._getHandJoint(c,y);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,v=.005;c.inputState.pinching&&h>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(mT)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Kn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class gT extends Ir{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,v=null;const y=n.getContextAttributes();let m=null,d=null;const _=[],x=[],S=new de;let P=null;const w=new Tn;w.layers.enable(1),w.viewport=new It;const T=new Tn;T.layers.enable(2),T.viewport=new It;const O=[w,T],E=new pT;E.layers.enable(1),E.layers.enable(2);let b=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let Y=_[z];return Y===void 0&&(Y=new _u,_[z]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(z){let Y=_[z];return Y===void 0&&(Y=new _u,_[z]=Y),Y.getGripSpace()},this.getHand=function(z){let Y=_[z];return Y===void 0&&(Y=new _u,_[z]=Y),Y.getHandSpace()};function q(z){const Y=x.indexOf(z.inputSource);if(Y===-1)return;const Q=_[Y];Q!==void 0&&(Q.update(z.inputSource,z.frame,c||o),Q.dispatchEvent({type:z.type,data:z.inputSource}))}function re(){r.removeEventListener("select",q),r.removeEventListener("selectstart",q),r.removeEventListener("selectend",q),r.removeEventListener("squeeze",q),r.removeEventListener("squeezestart",q),r.removeEventListener("squeezeend",q),r.removeEventListener("end",re),r.removeEventListener("inputsourceschange",U);for(let z=0;z<_.length;z++){const Y=x[z];Y!==null&&(x[z]=null,_[z].disconnect(Y))}b=null,B=null,e.setRenderTarget(m),p=null,h=null,f=null,r=null,d=null,j.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(S.width,S.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){a=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",q),r.addEventListener("selectstart",q),r.addEventListener("selectend",q),r.addEventListener("squeeze",q),r.addEventListener("squeezestart",q),r.addEventListener("squeezeend",q),r.addEventListener("end",re),r.addEventListener("inputsourceschange",U),y.xrCompatible!==!0&&await n.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(S),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Y={antialias:r.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,Y),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),d=new Cr(p.framebufferWidth,p.framebufferHeight,{format:Vn,type:$i,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let Y=null,Q=null,ie=null;y.depth&&(ie=y.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Y=y.stencil?Os:yr,Q=y.stencil?_r:ki);const J={colorFormat:n.RGBA8,depthFormat:ie,scaleFactor:s};f=new XRWebGLBinding(r,n),h=f.createProjectionLayer(J),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),d=new Cr(h.textureWidth,h.textureHeight,{format:Vn,type:$i,depthTexture:new zx(h.textureWidth,h.textureHeight,Q,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0});const me=e.properties.get(d);me.__ignoreDepthValues=h.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),j.setContext(r),j.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function U(z){for(let Y=0;Y<z.removed.length;Y++){const Q=z.removed[Y],ie=x.indexOf(Q);ie>=0&&(x[ie]=null,_[ie].disconnect(Q))}for(let Y=0;Y<z.added.length;Y++){const Q=z.added[Y];let ie=x.indexOf(Q);if(ie===-1){for(let me=0;me<_.length;me++)if(me>=x.length){x.push(Q),ie=me;break}else if(x[me]===null){x[me]=Q,ie=me;break}if(ie===-1)break}const J=_[ie];J&&J.connect(Q)}}const V=new I,$=new I;function ne(z,Y,Q){V.setFromMatrixPosition(Y.matrixWorld),$.setFromMatrixPosition(Q.matrixWorld);const ie=V.distanceTo($),J=Y.projectionMatrix.elements,me=Q.projectionMatrix.elements,Me=J[14]/(J[10]-1),ge=J[14]/(J[10]+1),Ee=(J[9]+1)/J[5],D=(J[9]-1)/J[5],ue=(J[8]-1)/J[0],X=(me[8]+1)/me[0],se=Me*ue,te=Me*X,Te=ie/(-ue+X),ve=Te*-ue;Y.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(ve),z.translateZ(Te),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();const A=Me+Te,M=ge+Te,H=se-ve,ce=te+(ie-ve),ae=Ee*ge/M*A,oe=D*ge/M*A;z.projectionMatrix.makePerspective(H,ce,ae,oe,A,M),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}function F(z,Y){Y===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(Y.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;E.near=T.near=w.near=z.near,E.far=T.far=w.far=z.far,(b!==E.near||B!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),b=E.near,B=E.far);const Y=z.parent,Q=E.cameras;F(E,Y);for(let ie=0;ie<Q.length;ie++)F(Q[ie],Y);Q.length===2?ne(E,w,T):E.projectionMatrix.copy(w.projectionMatrix),G(z,E,Y)};function G(z,Y,Q){Q===null?z.matrix.copy(Y.matrixWorld):(z.matrix.copy(Q.matrixWorld),z.matrix.invert(),z.matrix.multiply(Y.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(Y.projectionMatrix),z.projectionMatrixInverse.copy(Y.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=qo*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(z){l=z,h!==null&&(h.fixedFoveation=z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=z)};let C=null;function R(z,Y){if(u=Y.getViewerPose(c||o),v=Y,u!==null){const Q=u.views;p!==null&&(e.setRenderTargetFramebuffer(d,p.framebuffer),e.setRenderTarget(d));let ie=!1;Q.length!==E.cameras.length&&(E.cameras.length=0,ie=!0);for(let J=0;J<Q.length;J++){const me=Q[J];let Me=null;if(p!==null)Me=p.getViewport(me);else{const Ee=f.getViewSubImage(h,me);Me=Ee.viewport,J===0&&(e.setRenderTargetTextures(d,Ee.colorTexture,h.ignoreDepthValues?void 0:Ee.depthStencilTexture),e.setRenderTarget(d))}let ge=O[J];ge===void 0&&(ge=new Tn,ge.layers.enable(J),ge.viewport=new It,O[J]=ge),ge.matrix.fromArray(me.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(me.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(Me.x,Me.y,Me.width,Me.height),J===0&&(E.matrix.copy(ge.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),ie===!0&&E.cameras.push(ge)}}for(let Q=0;Q<_.length;Q++){const ie=x[Q],J=_[Q];ie!==null&&J!==void 0&&J.update(ie,Y,c||o)}C&&C(z,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),v=null}const j=new Fx;j.setAnimationLoop(R),this.setAnimationLoop=function(z){C=z},this.dispose=function(){}}}function xT(t,e){function n(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Ux(t)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,_,x,S){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),f(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,S)):d.isMeshMatcapMaterial?(s(m,d),v(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),y(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,_,x):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,n(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===cn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,n(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===cn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,n(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,n(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const _=e.get(d).envMap;if(_&&(m.envMap.value=_,m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const x=t._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*x,n(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,_,x){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*_,m.scale.value=x*.5,d.map&&(m.map.value=d.map,n(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,m.roughnessMapTransform)),e.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,_){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===cn&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,d){d.matcap&&(m.matcap.value=d.matcap)}function y(m,d){const _=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function vT(t,e,n,i){let r={},s={},o=[];const a=n.isWebGL2?t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(_,x){const S=x.program;i.uniformBlockBinding(_,S)}function c(_,x){let S=r[_.id];S===void 0&&(v(_),S=u(_),r[_.id]=S,_.addEventListener("dispose",m));const P=x.program;i.updateUBOMapping(_,P);const w=e.render.frame;s[_.id]!==w&&(h(_),s[_.id]=w)}function u(_){const x=f();_.__bindingPointIndex=x;const S=t.createBuffer(),P=_.__size,w=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,S),t.bufferData(t.UNIFORM_BUFFER,P,w),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,x,S),S}function f(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const x=r[_.id],S=_.uniforms,P=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,x);for(let w=0,T=S.length;w<T;w++){const O=Array.isArray(S[w])?S[w]:[S[w]];for(let E=0,b=O.length;E<b;E++){const B=O[E];if(p(B,w,E,P)===!0){const q=B.__offset,re=Array.isArray(B.value)?B.value:[B.value];let U=0;for(let V=0;V<re.length;V++){const $=re[V],ne=y($);typeof $=="number"||typeof $=="boolean"?(B.__data[0]=$,t.bufferSubData(t.UNIFORM_BUFFER,q+U,B.__data)):$.isMatrix3?(B.__data[0]=$.elements[0],B.__data[1]=$.elements[1],B.__data[2]=$.elements[2],B.__data[3]=0,B.__data[4]=$.elements[3],B.__data[5]=$.elements[4],B.__data[6]=$.elements[5],B.__data[7]=0,B.__data[8]=$.elements[6],B.__data[9]=$.elements[7],B.__data[10]=$.elements[8],B.__data[11]=0):($.toArray(B.__data,U),U+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,q,B.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(_,x,S,P){const w=_.value,T=x+"_"+S;if(P[T]===void 0)return typeof w=="number"||typeof w=="boolean"?P[T]=w:P[T]=w.clone(),!0;{const O=P[T];if(typeof w=="number"||typeof w=="boolean"){if(O!==w)return P[T]=w,!0}else if(O.equals(w)===!1)return O.copy(w),!0}return!1}function v(_){const x=_.uniforms;let S=0;const P=16;for(let T=0,O=x.length;T<O;T++){const E=Array.isArray(x[T])?x[T]:[x[T]];for(let b=0,B=E.length;b<B;b++){const q=E[b],re=Array.isArray(q.value)?q.value:[q.value];for(let U=0,V=re.length;U<V;U++){const $=re[U],ne=y($),F=S%P;F!==0&&P-F<ne.boundary&&(S+=P-F),q.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=S,S+=ne.storage}}}const w=S%P;return w>0&&(S+=P-w),_.__size=S,_.__cache={},this}function y(_){const x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),x}function m(_){const x=_.target;x.removeEventListener("dispose",m);const S=o.indexOf(x.__bindingPointIndex);o.splice(S,1),t.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function d(){for(const _ in r)t.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}class Vh{constructor(e={}){const{canvas:n=p1(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=o;const p=new Uint32Array(4),v=new Int32Array(4);let y=null,m=null;const d=[],_=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ft,this._useLegacyLights=!1,this.toneMapping=Yi,this.toneMappingExposure=1;const x=this;let S=!1,P=0,w=0,T=null,O=-1,E=null;const b=new It,B=new It;let q=null;const re=new Ye(0);let U=0,V=n.width,$=n.height,ne=1,F=null,G=null;const C=new It(0,0,V,$),R=new It(0,0,V,$);let j=!1;const z=new Bh;let Y=!1,Q=!1,ie=null;const J=new Mt,me=new de,Me=new I,ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ee(){return T===null?ne:1}let D=i;function ue(L,W){for(let K=0;K<L.length;K++){const ee=L[K],Z=n.getContext(ee,W);if(Z!==null)return Z}return null}try{const L={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Ih}`),n.addEventListener("webglcontextlost",he,!1),n.addEventListener("webglcontextrestored",k,!1),n.addEventListener("webglcontextcreationerror",xe,!1),D===null){const W=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&W.shift(),D=ue(W,L),D===null)throw ue(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&D instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),D.getShaderPrecisionFormat===void 0&&(D.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let X,se,te,Te,ve,A,M,H,ce,ae,oe,Ae,ye,be,Le,Oe,le,Ge,He,ke,De,_e,N,fe;function Ne(){X=new Cw(D),se=new Mw(D,X,e),X.init(se),_e=new fT(D,X,se),te=new dT(D,X,se),Te=new Lw(D),ve=new Kb,A=new hT(D,X,te,ve,se,_e,Te),M=new ww(x),H=new Aw(x),ce=new z1(D,se),N=new yw(D,X,ce,se),ae=new Rw(D,ce,Te,N),oe=new Uw(D,ae,ce,Te),He=new Iw(D,se,A),Oe=new Ew(ve),Ae=new Zb(x,M,H,X,se,N,Oe),ye=new xT(x,ve),be=new Qb,Le=new sT(X,se),Ge=new _w(x,M,H,te,oe,h,l),le=new uT(x,oe,se),fe=new vT(D,Te,se,te),ke=new Sw(D,X,Te,se),De=new Pw(D,X,Te,se),Te.programs=Ae.programs,x.capabilities=se,x.extensions=X,x.properties=ve,x.renderLists=be,x.shadowMap=le,x.state=te,x.info=Te}Ne();const Pe=new gT(x,D);this.xr=Pe,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const L=X.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=X.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(L){L!==void 0&&(ne=L,this.setSize(V,$,!1))},this.getSize=function(L){return L.set(V,$)},this.setSize=function(L,W,K=!0){if(Pe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=L,$=W,n.width=Math.floor(L*ne),n.height=Math.floor(W*ne),K===!0&&(n.style.width=L+"px",n.style.height=W+"px"),this.setViewport(0,0,L,W)},this.getDrawingBufferSize=function(L){return L.set(V*ne,$*ne).floor()},this.setDrawingBufferSize=function(L,W,K){V=L,$=W,ne=K,n.width=Math.floor(L*K),n.height=Math.floor(W*K),this.setViewport(0,0,L,W)},this.getCurrentViewport=function(L){return L.copy(b)},this.getViewport=function(L){return L.copy(C)},this.setViewport=function(L,W,K,ee){L.isVector4?C.set(L.x,L.y,L.z,L.w):C.set(L,W,K,ee),te.viewport(b.copy(C).multiplyScalar(ne).floor())},this.getScissor=function(L){return L.copy(R)},this.setScissor=function(L,W,K,ee){L.isVector4?R.set(L.x,L.y,L.z,L.w):R.set(L,W,K,ee),te.scissor(B.copy(R).multiplyScalar(ne).floor())},this.getScissorTest=function(){return j},this.setScissorTest=function(L){te.setScissorTest(j=L)},this.setOpaqueSort=function(L){F=L},this.setTransparentSort=function(L){G=L},this.getClearColor=function(L){return L.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor.apply(Ge,arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha.apply(Ge,arguments)},this.clear=function(L=!0,W=!0,K=!0){let ee=0;if(L){let Z=!1;if(T!==null){const Ce=T.texture.format;Z=Ce===Mx||Ce===Sx||Ce===yx}if(Z){const Ce=T.texture.type,Ie=Ce===$i||Ce===ki||Ce===kh||Ce===_r||Ce===vx||Ce===_x,ze=Ge.getClearColor(),Be=Ge.getClearAlpha(),Xe=ze.r,Ve=ze.g,je=ze.b;Ie?(p[0]=Xe,p[1]=Ve,p[2]=je,p[3]=Be,D.clearBufferuiv(D.COLOR,0,p)):(v[0]=Xe,v[1]=Ve,v[2]=je,v[3]=Be,D.clearBufferiv(D.COLOR,0,v))}else ee|=D.COLOR_BUFFER_BIT}W&&(ee|=D.DEPTH_BUFFER_BIT),K&&(ee|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",he,!1),n.removeEventListener("webglcontextrestored",k,!1),n.removeEventListener("webglcontextcreationerror",xe,!1),be.dispose(),Le.dispose(),ve.dispose(),M.dispose(),H.dispose(),oe.dispose(),N.dispose(),fe.dispose(),Ae.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",_t),Pe.removeEventListener("sessionend",nt),ie&&(ie.dispose(),ie=null),Et.stop()};function he(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function k(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const L=Te.autoReset,W=le.enabled,K=le.autoUpdate,ee=le.needsUpdate,Z=le.type;Ne(),Te.autoReset=L,le.enabled=W,le.autoUpdate=K,le.needsUpdate=ee,le.type=Z}function xe(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function we(L){const W=L.target;W.removeEventListener("dispose",we),Fe(W)}function Fe(L){Ue(L),ve.remove(L)}function Ue(L){const W=ve.get(L).programs;W!==void 0&&(W.forEach(function(K){Ae.releaseProgram(K)}),L.isShaderMaterial&&Ae.releaseShaderCache(L))}this.renderBufferDirect=function(L,W,K,ee,Z,Ce){W===null&&(W=ge);const Ie=Z.isMesh&&Z.matrixWorld.determinant()<0,ze=iv(L,W,K,ee,Z);te.setMaterial(ee,Ie);let Be=K.index,Xe=1;if(ee.wireframe===!0){if(Be=ae.getWireframeAttribute(K),Be===void 0)return;Xe=2}const Ve=K.drawRange,je=K.attributes.position;let yt=Ve.start*Xe,dn=(Ve.start+Ve.count)*Xe;Ce!==null&&(yt=Math.max(yt,Ce.start*Xe),dn=Math.min(dn,(Ce.start+Ce.count)*Xe)),Be!==null?(yt=Math.max(yt,0),dn=Math.min(dn,Be.count)):je!=null&&(yt=Math.max(yt,0),dn=Math.min(dn,je.count));const Lt=dn-yt;if(Lt<0||Lt===1/0)return;N.setup(Z,ee,ze,K,Be);let ri,ut=ke;if(Be!==null&&(ri=ce.get(Be),ut=De,ut.setIndex(ri)),Z.isMesh)ee.wireframe===!0?(te.setLineWidth(ee.wireframeLinewidth*Ee()),ut.setMode(D.LINES)):ut.setMode(D.TRIANGLES);else if(Z.isLine){let $e=ee.linewidth;$e===void 0&&($e=1),te.setLineWidth($e*Ee()),Z.isLineSegments?ut.setMode(D.LINES):Z.isLineLoop?ut.setMode(D.LINE_LOOP):ut.setMode(D.LINE_STRIP)}else Z.isPoints?ut.setMode(D.POINTS):Z.isSprite&&ut.setMode(D.TRIANGLES);if(Z.isBatchedMesh)ut.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else if(Z.isInstancedMesh)ut.renderInstances(yt,Lt,Z.count);else if(K.isInstancedBufferGeometry){const $e=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,pc=Math.min(K.instanceCount,$e);ut.renderInstances(yt,Lt,pc)}else ut.render(yt,Lt)};function Je(L,W,K){L.transparent===!0&&L.side===An&&L.forceSinglePass===!1?(L.side=cn,L.needsUpdate=!0,oa(L,W,K),L.side=Ki,L.needsUpdate=!0,oa(L,W,K),L.side=An):oa(L,W,K)}this.compile=function(L,W,K=null){K===null&&(K=L),m=Le.get(K),m.init(),_.push(m),K.traverseVisible(function(Z){Z.isLight&&Z.layers.test(W.layers)&&(m.pushLight(Z),Z.castShadow&&m.pushShadow(Z))}),L!==K&&L.traverseVisible(function(Z){Z.isLight&&Z.layers.test(W.layers)&&(m.pushLight(Z),Z.castShadow&&m.pushShadow(Z))}),m.setupLights(x._useLegacyLights);const ee=new Set;return L.traverse(function(Z){const Ce=Z.material;if(Ce)if(Array.isArray(Ce))for(let Ie=0;Ie<Ce.length;Ie++){const ze=Ce[Ie];Je(ze,K,Z),ee.add(ze)}else Je(Ce,K,Z),ee.add(Ce)}),_.pop(),m=null,ee},this.compileAsync=function(L,W,K=null){const ee=this.compile(L,W,K);return new Promise(Z=>{function Ce(){if(ee.forEach(function(Ie){ve.get(Ie).currentProgram.isReady()&&ee.delete(Ie)}),ee.size===0){Z(L);return}setTimeout(Ce,10)}X.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let Qe=null;function gt(L){Qe&&Qe(L)}function _t(){Et.stop()}function nt(){Et.start()}const Et=new Fx;Et.setAnimationLoop(gt),typeof self<"u"&&Et.setContext(self),this.setAnimationLoop=function(L){Qe=L,Pe.setAnimationLoop(L),L===null?Et.stop():Et.start()},Pe.addEventListener("sessionstart",_t),Pe.addEventListener("sessionend",nt),this.render=function(L,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(W),W=Pe.getCamera()),L.isScene===!0&&L.onBeforeRender(x,L,W,T),m=Le.get(L,_.length),m.init(),_.push(m),J.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),z.setFromProjectionMatrix(J),Q=this.localClippingEnabled,Y=Oe.init(this.clippingPlanes,Q),y=be.get(L,d.length),y.init(),d.push(y),Xn(L,W,0,x.sortObjects),y.finish(),x.sortObjects===!0&&y.sort(F,G),this.info.render.frame++,Y===!0&&Oe.beginShadows();const K=m.state.shadowsArray;if(le.render(K,L,W),Y===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ge.render(y,L),m.setupLights(x._useLegacyLights),W.isArrayCamera){const ee=W.cameras;for(let Z=0,Ce=ee.length;Z<Ce;Z++){const Ie=ee[Z];$h(y,L,Ie,Ie.viewport)}}else $h(y,L,W);T!==null&&(A.updateMultisampleRenderTarget(T),A.updateRenderTargetMipmap(T)),L.isScene===!0&&L.onAfterRender(x,L,W),N.resetDefaultState(),O=-1,E=null,_.pop(),_.length>0?m=_[_.length-1]:m=null,d.pop(),d.length>0?y=d[d.length-1]:y=null};function Xn(L,W,K,ee){if(L.visible===!1)return;if(L.layers.test(W.layers)){if(L.isGroup)K=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(W);else if(L.isLight)m.pushLight(L),L.castShadow&&m.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||z.intersectsSprite(L)){ee&&Me.setFromMatrixPosition(L.matrixWorld).applyMatrix4(J);const Ie=oe.update(L),ze=L.material;ze.visible&&y.push(L,Ie,ze,K,Me.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||z.intersectsObject(L))){const Ie=oe.update(L),ze=L.material;if(ee&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),Me.copy(L.boundingSphere.center)):(Ie.boundingSphere===null&&Ie.computeBoundingSphere(),Me.copy(Ie.boundingSphere.center)),Me.applyMatrix4(L.matrixWorld).applyMatrix4(J)),Array.isArray(ze)){const Be=Ie.groups;for(let Xe=0,Ve=Be.length;Xe<Ve;Xe++){const je=Be[Xe],yt=ze[je.materialIndex];yt&&yt.visible&&y.push(L,Ie,yt,K,Me.z,je)}}else ze.visible&&y.push(L,Ie,ze,K,Me.z,null)}}const Ce=L.children;for(let Ie=0,ze=Ce.length;Ie<ze;Ie++)Xn(Ce[Ie],W,K,ee)}function $h(L,W,K,ee){const Z=L.opaque,Ce=L.transmissive,Ie=L.transparent;m.setupLightsView(K),Y===!0&&Oe.setGlobalState(x.clippingPlanes,K),Ce.length>0&&nv(Z,Ce,W,K),ee&&te.viewport(b.copy(ee)),Z.length>0&&sa(Z,W,K),Ce.length>0&&sa(Ce,W,K),Ie.length>0&&sa(Ie,W,K),te.buffers.depth.setTest(!0),te.buffers.depth.setMask(!0),te.buffers.color.setMask(!0),te.setPolygonOffset(!1)}function nv(L,W,K,ee){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;const Ce=se.isWebGL2;ie===null&&(ie=new Cr(1,1,{generateMipmaps:!0,type:X.has("EXT_color_buffer_half_float")?$o:$i,minFilter:Yo,samples:Ce?4:0})),x.getDrawingBufferSize(me),Ce?ie.setSize(me.x,me.y):ie.setSize(Gl(me.x),Gl(me.y));const Ie=x.getRenderTarget();x.setRenderTarget(ie),x.getClearColor(re),U=x.getClearAlpha(),U<1&&x.setClearColor(16777215,.5),x.clear();const ze=x.toneMapping;x.toneMapping=Yi,sa(L,K,ee),A.updateMultisampleRenderTarget(ie),A.updateRenderTargetMipmap(ie);let Be=!1;for(let Xe=0,Ve=W.length;Xe<Ve;Xe++){const je=W[Xe],yt=je.object,dn=je.geometry,Lt=je.material,ri=je.group;if(Lt.side===An&&yt.layers.test(ee.layers)){const ut=Lt.side;Lt.side=cn,Lt.needsUpdate=!0,qh(yt,K,ee,dn,Lt,ri),Lt.side=ut,Lt.needsUpdate=!0,Be=!0}}Be===!0&&(A.updateMultisampleRenderTarget(ie),A.updateRenderTargetMipmap(ie)),x.setRenderTarget(Ie),x.setClearColor(re,U),x.toneMapping=ze}function sa(L,W,K){const ee=W.isScene===!0?W.overrideMaterial:null;for(let Z=0,Ce=L.length;Z<Ce;Z++){const Ie=L[Z],ze=Ie.object,Be=Ie.geometry,Xe=ee===null?Ie.material:ee,Ve=Ie.group;ze.layers.test(K.layers)&&qh(ze,W,K,Be,Xe,Ve)}}function qh(L,W,K,ee,Z,Ce){L.onBeforeRender(x,W,K,ee,Z,Ce),L.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),Z.onBeforeRender(x,W,K,ee,L,Ce),Z.transparent===!0&&Z.side===An&&Z.forceSinglePass===!1?(Z.side=cn,Z.needsUpdate=!0,x.renderBufferDirect(K,W,ee,Z,L,Ce),Z.side=Ki,Z.needsUpdate=!0,x.renderBufferDirect(K,W,ee,Z,L,Ce),Z.side=An):x.renderBufferDirect(K,W,ee,Z,L,Ce),L.onAfterRender(x,W,K,ee,Z,Ce)}function oa(L,W,K){W.isScene!==!0&&(W=ge);const ee=ve.get(L),Z=m.state.lights,Ce=m.state.shadowsArray,Ie=Z.state.version,ze=Ae.getParameters(L,Z.state,Ce,W,K),Be=Ae.getProgramCacheKey(ze);let Xe=ee.programs;ee.environment=L.isMeshStandardMaterial?W.environment:null,ee.fog=W.fog,ee.envMap=(L.isMeshStandardMaterial?H:M).get(L.envMap||ee.environment),Xe===void 0&&(L.addEventListener("dispose",we),Xe=new Map,ee.programs=Xe);let Ve=Xe.get(Be);if(Ve!==void 0){if(ee.currentProgram===Ve&&ee.lightsStateVersion===Ie)return Kh(L,ze),Ve}else ze.uniforms=Ae.getUniforms(L),L.onBuild(K,ze,x),L.onBeforeCompile(ze,x),Ve=Ae.acquireProgram(ze,Be),Xe.set(Be,Ve),ee.uniforms=ze.uniforms;const je=ee.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(je.clippingPlanes=Oe.uniform),Kh(L,ze),ee.needsLights=sv(L),ee.lightsStateVersion=Ie,ee.needsLights&&(je.ambientLightColor.value=Z.state.ambient,je.lightProbe.value=Z.state.probe,je.directionalLights.value=Z.state.directional,je.directionalLightShadows.value=Z.state.directionalShadow,je.spotLights.value=Z.state.spot,je.spotLightShadows.value=Z.state.spotShadow,je.rectAreaLights.value=Z.state.rectArea,je.ltc_1.value=Z.state.rectAreaLTC1,je.ltc_2.value=Z.state.rectAreaLTC2,je.pointLights.value=Z.state.point,je.pointLightShadows.value=Z.state.pointShadow,je.hemisphereLights.value=Z.state.hemi,je.directionalShadowMap.value=Z.state.directionalShadowMap,je.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,je.spotShadowMap.value=Z.state.spotShadowMap,je.spotLightMatrix.value=Z.state.spotLightMatrix,je.spotLightMap.value=Z.state.spotLightMap,je.pointShadowMap.value=Z.state.pointShadowMap,je.pointShadowMatrix.value=Z.state.pointShadowMatrix),ee.currentProgram=Ve,ee.uniformsList=null,Ve}function Zh(L){if(L.uniformsList===null){const W=L.currentProgram.getUniforms();L.uniformsList=pl.seqWithValue(W.seq,L.uniforms)}return L.uniformsList}function Kh(L,W){const K=ve.get(L);K.outputColorSpace=W.outputColorSpace,K.batching=W.batching,K.instancing=W.instancing,K.instancingColor=W.instancingColor,K.skinning=W.skinning,K.morphTargets=W.morphTargets,K.morphNormals=W.morphNormals,K.morphColors=W.morphColors,K.morphTargetsCount=W.morphTargetsCount,K.numClippingPlanes=W.numClippingPlanes,K.numIntersection=W.numClipIntersection,K.vertexAlphas=W.vertexAlphas,K.vertexTangents=W.vertexTangents,K.toneMapping=W.toneMapping}function iv(L,W,K,ee,Z){W.isScene!==!0&&(W=ge),A.resetTextureUnits();const Ce=W.fog,Ie=ee.isMeshStandardMaterial?W.environment:null,ze=T===null?x.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Si,Be=(ee.isMeshStandardMaterial?H:M).get(ee.envMap||Ie),Xe=ee.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Ve=!!K.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),je=!!K.morphAttributes.position,yt=!!K.morphAttributes.normal,dn=!!K.morphAttributes.color;let Lt=Yi;ee.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(Lt=x.toneMapping);const ri=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ut=ri!==void 0?ri.length:0,$e=ve.get(ee),pc=m.state.lights;if(Y===!0&&(Q===!0||L!==E)){const yn=L===E&&ee.id===O;Oe.setState(ee,L,yn)}let xt=!1;ee.version===$e.__version?($e.needsLights&&$e.lightsStateVersion!==pc.state.version||$e.outputColorSpace!==ze||Z.isBatchedMesh&&$e.batching===!1||!Z.isBatchedMesh&&$e.batching===!0||Z.isInstancedMesh&&$e.instancing===!1||!Z.isInstancedMesh&&$e.instancing===!0||Z.isSkinnedMesh&&$e.skinning===!1||!Z.isSkinnedMesh&&$e.skinning===!0||Z.isInstancedMesh&&$e.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&$e.instancingColor===!1&&Z.instanceColor!==null||$e.envMap!==Be||ee.fog===!0&&$e.fog!==Ce||$e.numClippingPlanes!==void 0&&($e.numClippingPlanes!==Oe.numPlanes||$e.numIntersection!==Oe.numIntersection)||$e.vertexAlphas!==Xe||$e.vertexTangents!==Ve||$e.morphTargets!==je||$e.morphNormals!==yt||$e.morphColors!==dn||$e.toneMapping!==Lt||se.isWebGL2===!0&&$e.morphTargetsCount!==ut)&&(xt=!0):(xt=!0,$e.__version=ee.version);let tr=$e.currentProgram;xt===!0&&(tr=oa(ee,W,Z));let Jh=!1,Xs=!1,mc=!1;const Ht=tr.getUniforms(),nr=$e.uniforms;if(te.useProgram(tr.program)&&(Jh=!0,Xs=!0,mc=!0),ee.id!==O&&(O=ee.id,Xs=!0),Jh||E!==L){Ht.setValue(D,"projectionMatrix",L.projectionMatrix),Ht.setValue(D,"viewMatrix",L.matrixWorldInverse);const yn=Ht.map.cameraPosition;yn!==void 0&&yn.setValue(D,Me.setFromMatrixPosition(L.matrixWorld)),se.logarithmicDepthBuffer&&Ht.setValue(D,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&Ht.setValue(D,"isOrthographic",L.isOrthographicCamera===!0),E!==L&&(E=L,Xs=!0,mc=!0)}if(Z.isSkinnedMesh){Ht.setOptional(D,Z,"bindMatrix"),Ht.setOptional(D,Z,"bindMatrixInverse");const yn=Z.skeleton;yn&&(se.floatVertexTextures?(yn.boneTexture===null&&yn.computeBoneTexture(),Ht.setValue(D,"boneTexture",yn.boneTexture,A)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Z.isBatchedMesh&&(Ht.setOptional(D,Z,"batchingTexture"),Ht.setValue(D,"batchingTexture",Z._matricesTexture,A));const gc=K.morphAttributes;if((gc.position!==void 0||gc.normal!==void 0||gc.color!==void 0&&se.isWebGL2===!0)&&He.update(Z,K,tr),(Xs||$e.receiveShadow!==Z.receiveShadow)&&($e.receiveShadow=Z.receiveShadow,Ht.setValue(D,"receiveShadow",Z.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(nr.envMap.value=Be,nr.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),Xs&&(Ht.setValue(D,"toneMappingExposure",x.toneMappingExposure),$e.needsLights&&rv(nr,mc),Ce&&ee.fog===!0&&ye.refreshFogUniforms(nr,Ce),ye.refreshMaterialUniforms(nr,ee,ne,$,ie),pl.upload(D,Zh($e),nr,A)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(pl.upload(D,Zh($e),nr,A),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&Ht.setValue(D,"center",Z.center),Ht.setValue(D,"modelViewMatrix",Z.modelViewMatrix),Ht.setValue(D,"normalMatrix",Z.normalMatrix),Ht.setValue(D,"modelMatrix",Z.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){const yn=ee.uniformsGroups;for(let xc=0,ov=yn.length;xc<ov;xc++)if(se.isWebGL2){const Qh=yn[xc];fe.update(Qh,tr),fe.bind(Qh,tr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return tr}function rv(L,W){L.ambientLightColor.needsUpdate=W,L.lightProbe.needsUpdate=W,L.directionalLights.needsUpdate=W,L.directionalLightShadows.needsUpdate=W,L.pointLights.needsUpdate=W,L.pointLightShadows.needsUpdate=W,L.spotLights.needsUpdate=W,L.spotLightShadows.needsUpdate=W,L.rectAreaLights.needsUpdate=W,L.hemisphereLights.needsUpdate=W}function sv(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(L,W,K){ve.get(L.texture).__webglTexture=W,ve.get(L.depthTexture).__webglTexture=K;const ee=ve.get(L);ee.__hasExternalTextures=!0,ee.__hasExternalTextures&&(ee.__autoAllocateDepthBuffer=K===void 0,ee.__autoAllocateDepthBuffer||X.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ee.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(L,W){const K=ve.get(L);K.__webglFramebuffer=W,K.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(L,W=0,K=0){T=L,P=W,w=K;let ee=!0,Z=null,Ce=!1,Ie=!1;if(L){const Be=ve.get(L);Be.__useDefaultFramebuffer!==void 0?(te.bindFramebuffer(D.FRAMEBUFFER,null),ee=!1):Be.__webglFramebuffer===void 0?A.setupRenderTarget(L):Be.__hasExternalTextures&&A.rebindTextures(L,ve.get(L.texture).__webglTexture,ve.get(L.depthTexture).__webglTexture);const Xe=L.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Ie=!0);const Ve=ve.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(Ve[W])?Z=Ve[W][K]:Z=Ve[W],Ce=!0):se.isWebGL2&&L.samples>0&&A.useMultisampledRTT(L)===!1?Z=ve.get(L).__webglMultisampledFramebuffer:Array.isArray(Ve)?Z=Ve[K]:Z=Ve,b.copy(L.viewport),B.copy(L.scissor),q=L.scissorTest}else b.copy(C).multiplyScalar(ne).floor(),B.copy(R).multiplyScalar(ne).floor(),q=j;if(te.bindFramebuffer(D.FRAMEBUFFER,Z)&&se.drawBuffers&&ee&&te.drawBuffers(L,Z),te.viewport(b),te.scissor(B),te.setScissorTest(q),Ce){const Be=ve.get(L.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+W,Be.__webglTexture,K)}else if(Ie){const Be=ve.get(L.texture),Xe=W||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Be.__webglTexture,K||0,Xe)}O=-1},this.readRenderTargetPixels=function(L,W,K,ee,Z,Ce,Ie){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=ve.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Ie!==void 0&&(ze=ze[Ie]),ze){te.bindFramebuffer(D.FRAMEBUFFER,ze);try{const Be=L.texture,Xe=Be.format,Ve=Be.type;if(Xe!==Vn&&_e.convert(Xe)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const je=Ve===$o&&(X.has("EXT_color_buffer_half_float")||se.isWebGL2&&X.has("EXT_color_buffer_float"));if(Ve!==$i&&_e.convert(Ve)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ve===Oi&&(se.isWebGL2||X.has("OES_texture_float")||X.has("WEBGL_color_buffer_float")))&&!je){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=L.width-ee&&K>=0&&K<=L.height-Z&&D.readPixels(W,K,ee,Z,_e.convert(Xe),_e.convert(Ve),Ce)}finally{const Be=T!==null?ve.get(T).__webglFramebuffer:null;te.bindFramebuffer(D.FRAMEBUFFER,Be)}}},this.copyFramebufferToTexture=function(L,W,K=0){const ee=Math.pow(2,-K),Z=Math.floor(W.image.width*ee),Ce=Math.floor(W.image.height*ee);A.setTexture2D(W,0),D.copyTexSubImage2D(D.TEXTURE_2D,K,0,0,L.x,L.y,Z,Ce),te.unbindTexture()},this.copyTextureToTexture=function(L,W,K,ee=0){const Z=W.image.width,Ce=W.image.height,Ie=_e.convert(K.format),ze=_e.convert(K.type);A.setTexture2D(K,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,K.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,K.unpackAlignment),W.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ee,L.x,L.y,Z,Ce,Ie,ze,W.image.data):W.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ee,L.x,L.y,W.mipmaps[0].width,W.mipmaps[0].height,Ie,W.mipmaps[0].data):D.texSubImage2D(D.TEXTURE_2D,ee,L.x,L.y,Ie,ze,W.image),ee===0&&K.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),te.unbindTexture()},this.copyTextureToTexture3D=function(L,W,K,ee,Z=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ce=L.max.x-L.min.x+1,Ie=L.max.y-L.min.y+1,ze=L.max.z-L.min.z+1,Be=_e.convert(ee.format),Xe=_e.convert(ee.type);let Ve;if(ee.isData3DTexture)A.setTexture3D(ee,0),Ve=D.TEXTURE_3D;else if(ee.isDataArrayTexture||ee.isCompressedArrayTexture)A.setTexture2DArray(ee,0),Ve=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,ee.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ee.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,ee.unpackAlignment);const je=D.getParameter(D.UNPACK_ROW_LENGTH),yt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),dn=D.getParameter(D.UNPACK_SKIP_PIXELS),Lt=D.getParameter(D.UNPACK_SKIP_ROWS),ri=D.getParameter(D.UNPACK_SKIP_IMAGES),ut=K.isCompressedTexture?K.mipmaps[Z]:K.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,ut.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ut.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,L.min.x),D.pixelStorei(D.UNPACK_SKIP_ROWS,L.min.y),D.pixelStorei(D.UNPACK_SKIP_IMAGES,L.min.z),K.isDataTexture||K.isData3DTexture?D.texSubImage3D(Ve,Z,W.x,W.y,W.z,Ce,Ie,ze,Be,Xe,ut.data):K.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),D.compressedTexSubImage3D(Ve,Z,W.x,W.y,W.z,Ce,Ie,ze,Be,ut.data)):D.texSubImage3D(Ve,Z,W.x,W.y,W.z,Ce,Ie,ze,Be,Xe,ut),D.pixelStorei(D.UNPACK_ROW_LENGTH,je),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,yt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,dn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Lt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ri),Z===0&&ee.generateMipmaps&&D.generateMipmap(Ve),te.unbindTexture()},this.initTexture=function(L){L.isCubeTexture?A.setTextureCube(L,0):L.isData3DTexture?A.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?A.setTexture2DArray(L,0):A.setTexture2D(L,0),te.unbindTexture()},this.resetState=function(){P=0,w=0,T=null,te.reset(),N.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===Oh?"display-p3":"srgb",n.unpackColorSpace=rt.workingColorSpace===lc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ft?Sr:wx}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Sr?Ft:Si}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class _T extends Vh{}_T.prototype.isWebGL1Renderer=!0;class Wx extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}}class Qn extends Gs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Dm=new I,Im=new I,Um=new Mt,yu=new zh,Xa=new cc;class Xx extends kt{constructor(e=new $t,n=new Qn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Dm.fromBufferAttribute(n,r-1),Im.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Dm.distanceTo(Im);e.setAttribute("lineDistance",new pt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Xa.copy(i.boundingSphere),Xa.applyMatrix4(r),Xa.radius+=s,e.ray.intersectsSphere(Xa)===!1)return;Um.copy(r).invert(),yu.copy(e.ray).applyMatrix4(Um);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new I,u=new I,f=new I,h=new I,p=this.isLineSegments?2:1,v=i.index,m=i.attributes.position;if(v!==null){const d=Math.max(0,o.start),_=Math.min(v.count,o.start+o.count);for(let x=d,S=_-1;x<S;x+=p){const P=v.getX(x),w=v.getX(x+1);if(c.fromBufferAttribute(m,P),u.fromBufferAttribute(m,w),yu.distanceSqToSegment(c,u,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const O=e.ray.origin.distanceTo(h);O<e.near||O>e.far||n.push({distance:O,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,o.start),_=Math.min(m.count,o.start+o.count);for(let x=d,S=_-1;x<S;x+=p){if(c.fromBufferAttribute(m,x),u.fromBufferAttribute(m,x+1),yu.distanceSqToSegment(c,u,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(h);w<e.near||w>e.far||n.push({distance:w,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const km=new I,Om=new I;class Jn extends Xx{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)km.fromBufferAttribute(n,r),Om.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+km.distanceTo(Om);e.setAttribute("lineDistance",new pt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class yT extends un{constructor(e,n,i,r,s,o,a,l,c){super(e,n,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ii{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const u=i[r],h=i[r+1]-u,p=(o-u)/h;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=n||(o.isVector2?new de:new I);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n){const i=new I,r=[],s=[],o=[],a=new I,l=new Mt;for(let p=0;p<=e;p++){const v=p/e;r[p]=this.getTangentAt(v,new I)}s[0]=new I,o[0]=new I;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const v=Math.acos(bt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,v))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(bt(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let v=1;v<=e;v++)s[v].applyMatrix4(l.makeRotationAxis(r[v],p*v)),o[v].crossVectors(r[v],s[v])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Gh extends ii{constructor(e=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,n){const i=n||new de,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=l-this.aX,p=c-this.aY;l=h*u-p*f+this.aX,c=h*f+p*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class ST extends Gh{constructor(e,n,i,r,s,o){super(e,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function jh(){let t=0,e=0,n=0,i=0;function r(s,o,a,l){t=s,e=a,n=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,f){let h=(o-s)/c-(a-s)/(c+u)+(a-o)/u,p=(a-o)/u-(l-o)/(u+f)+(l-a)/f;h*=u,p*=u,r(o,a,h,p)},calc:function(s){const o=s*s,a=o*s;return t+e*s+n*o+i*a}}}const Ya=new I,Su=new jh,Mu=new jh,Eu=new jh;class MT extends ii{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new I){const i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(Ya.subVectors(r[0],r[1]).add(r[0]),c=Ya);const f=r[a%s],h=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(Ya.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Ya),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let v=Math.pow(c.distanceToSquared(f),p),y=Math.pow(f.distanceToSquared(h),p),m=Math.pow(h.distanceToSquared(u),p);y<1e-4&&(y=1),v<1e-4&&(v=y),m<1e-4&&(m=y),Su.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,v,y,m),Mu.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,v,y,m),Eu.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,v,y,m)}else this.curveType==="catmullrom"&&(Su.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),Mu.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),Eu.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return i.set(Su.calc(l),Mu.calc(l),Eu.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new I().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Fm(t,e,n,i,r){const s=(i-e)*.5,o=(r-n)*.5,a=t*t,l=t*a;return(2*n-2*i+s+o)*l+(-3*n+3*i-2*s-o)*a+s*t+n}function ET(t,e){const n=1-t;return n*n*e}function wT(t,e){return 2*(1-t)*t*e}function bT(t,e){return t*t*e}function bo(t,e,n,i){return ET(t,e)+wT(t,n)+bT(t,i)}function TT(t,e){const n=1-t;return n*n*n*e}function AT(t,e){const n=1-t;return 3*n*n*t*e}function CT(t,e){return 3*(1-t)*t*t*e}function RT(t,e){return t*t*t*e}function To(t,e,n,i,r){return TT(t,e)+AT(t,n)+CT(t,i)+RT(t,r)}class Yx extends ii{constructor(e=new de,n=new de,i=new de,r=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new de){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(To(e,r.x,s.x,o.x,a.x),To(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class PT extends ii{constructor(e=new I,n=new I,i=new I,r=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new I){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(To(e,r.x,s.x,o.x,a.x),To(e,r.y,s.y,o.y,a.y),To(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class $x extends ii{constructor(e=new de,n=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new de){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new de){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class LT extends ii{constructor(e=new I,n=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new I){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new I){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class qx extends ii{constructor(e=new de,n=new de,i=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new de){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(bo(e,r.x,s.x,o.x),bo(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class NT extends ii{constructor(e=new I,n=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new I){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(bo(e,r.x,s.x,o.x),bo(e,r.y,s.y,o.y),bo(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Zx extends ii{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new de){const i=n,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],f=r[o>r.length-3?r.length-1:o+2];return i.set(Fm(a,l.x,c.x,u.x,f.x),Fm(a,l.y,c.y,u.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new de().fromArray(r))}return this}}var Id=Object.freeze({__proto__:null,ArcCurve:ST,CatmullRomCurve3:MT,CubicBezierCurve:Yx,CubicBezierCurve3:PT,EllipseCurve:Gh,LineCurve:$x,LineCurve3:LT,QuadraticBezierCurve:qx,QuadraticBezierCurve3:NT,SplineCurve:Zx});class DT extends ii{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Id[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(n.push(u),i=u)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new Id[r.type]().fromJSON(r))}return this}}class Ud extends DT{constructor(e){super(),this.type="Path",this.currentPoint=new de,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new $x(this.currentPoint.clone(),new de(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,r){const s=new qx(this.currentPoint.clone(),new de(e,n),new de(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,n,i,r,s,o){const a=new Yx(this.currentPoint.clone(),new de(e,n),new de(i,r),new de(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new Zx(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,n+l,i,r,s,o),this}absarc(e,n,i,r,s,o){return this.absellipse(e,n,i,i,r,s,o),this}ellipse(e,n,i,r,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,n+u,i,r,s,o,a,l),this}absellipse(e,n,i,r,s,o,a,l){const c=new Gh(e,n,i,r,s,o,a,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Wh extends $t{constructor(e=[new de(0,-.5),new de(.5,0),new de(0,.5)],n=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:n,phiStart:i,phiLength:r},n=Math.floor(n),r=bt(r,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],u=1/n,f=new I,h=new de,p=new I,v=new I,y=new I;let m=0,d=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:m=e[_+1].x-e[_].x,d=e[_+1].y-e[_].y,p.x=d*1,p.y=-m,p.z=d*0,y.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(y.x,y.y,y.z);break;default:m=e[_+1].x-e[_].x,d=e[_+1].y-e[_].y,p.x=d*1,p.y=-m,p.z=d*0,v.copy(p),p.x+=y.x,p.y+=y.y,p.z+=y.z,p.normalize(),l.push(p.x,p.y,p.z),y.copy(v)}for(let _=0;_<=n;_++){const x=i+_*u*r,S=Math.sin(x),P=Math.cos(x);for(let w=0;w<=e.length-1;w++){f.x=e[w].x*S,f.y=e[w].y,f.z=e[w].x*P,o.push(f.x,f.y,f.z),h.x=_/n,h.y=w/(e.length-1),a.push(h.x,h.y);const T=l[3*w+0]*S,O=l[3*w+1],E=l[3*w+0]*P;c.push(T,O,E)}}for(let _=0;_<n;_++)for(let x=0;x<e.length-1;x++){const S=x+_*e.length,P=S,w=S+e.length,T=S+e.length+1,O=S+1;s.push(P,w,O),s.push(T,O,w)}this.setIndex(s),this.setAttribute("position",new pt(o,3)),this.setAttribute("uv",new pt(a,2)),this.setAttribute("normal",new pt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wh(e.points,e.segments,e.phiStart,e.phiLength)}}class zs extends $t{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],h=[],p=[];let v=0;const y=[],m=i/2;let d=0;_(),o===!1&&(e>0&&x(!0),n>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new pt(f,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(p,2));function _(){const S=new I,P=new I;let w=0;const T=(n-e)/i;for(let O=0;O<=s;O++){const E=[],b=O/s,B=b*(n-e)+e;for(let q=0;q<=r;q++){const re=q/r,U=re*l+a,V=Math.sin(U),$=Math.cos(U);P.x=B*V,P.y=-b*i+m,P.z=B*$,f.push(P.x,P.y,P.z),S.set(V,T,$).normalize(),h.push(S.x,S.y,S.z),p.push(re,1-b),E.push(v++)}y.push(E)}for(let O=0;O<r;O++)for(let E=0;E<s;E++){const b=y[E][O],B=y[E+1][O],q=y[E+1][O+1],re=y[E][O+1];u.push(b,B,re),u.push(B,q,re),w+=6}c.addGroup(d,w,0),d+=w}function x(S){const P=v,w=new de,T=new I;let O=0;const E=S===!0?e:n,b=S===!0?1:-1;for(let q=1;q<=r;q++)f.push(0,m*b,0),h.push(0,b,0),p.push(.5,.5),v++;const B=v;for(let q=0;q<=r;q++){const U=q/r*l+a,V=Math.cos(U),$=Math.sin(U);T.x=E*$,T.y=m*b,T.z=E*V,f.push(T.x,T.y,T.z),h.push(0,b,0),w.x=V*.5+.5,w.y=$*.5*b+.5,p.push(w.x,w.y),v++}for(let q=0;q<r;q++){const re=P+q,U=B+q;S===!0?u.push(U,U+1,re):u.push(U+1,U,re),O+=3}c.addGroup(d,O,S===!0?1:2),d+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zs(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xh extends zs{constructor(e=1,n=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,n,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Xh(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const $a=new I,qa=new I,wu=new I,Za=new bn;class co extends $t{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const r=Math.pow(10,4),s=Math.cos(Ts*n),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],f=new Array(3),h={},p=[];for(let v=0;v<l;v+=3){o?(c[0]=o.getX(v),c[1]=o.getX(v+1),c[2]=o.getX(v+2)):(c[0]=v,c[1]=v+1,c[2]=v+2);const{a:y,b:m,c:d}=Za;if(y.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),d.fromBufferAttribute(a,c[2]),Za.getNormal(wu),f[0]=`${Math.round(y.x*r)},${Math.round(y.y*r)},${Math.round(y.z*r)}`,f[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,f[2]=`${Math.round(d.x*r)},${Math.round(d.y*r)},${Math.round(d.z*r)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let _=0;_<3;_++){const x=(_+1)%3,S=f[_],P=f[x],w=Za[u[_]],T=Za[u[x]],O=`${S}_${P}`,E=`${P}_${S}`;E in h&&h[E]?(wu.dot(h[E].normal)<=s&&(p.push(w.x,w.y,w.z),p.push(T.x,T.y,T.z)),h[E]=null):O in h||(h[O]={index0:c[_],index1:c[x],normal:wu.clone()})}}for(const v in h)if(h[v]){const{index0:y,index1:m}=h[v];$a.fromBufferAttribute(a,y),qa.fromBufferAttribute(a,m),p.push($a.x,$a.y,$a.z),p.push(qa.x,qa.y,qa.z)}this.setAttribute("position",new pt(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ns extends Ud{constructor(e){super(e),this.uuid=Ur(),this.type="Shape",this.holes=[]}getPointsHoles(e){const n=[];for(let i=0,r=this.holes.length;i<r;i++)n[i]=this.holes[i].getPoints(e);return n}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let n=0,i=this.holes.length;n<i;n++){const r=this.holes[n];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(new Ud().fromJSON(r))}return this}}const IT={triangulate:function(t,e,n=2){const i=e&&e.length,r=i?e[0]*n:t.length;let s=Kx(t,0,r,n,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,u,f,h,p;if(i&&(s=zT(t,e,s,n)),t.length>80*n){a=c=t[0],l=u=t[1];for(let v=n;v<r;v+=n)f=t[v],h=t[v+1],f<a&&(a=f),h<l&&(l=h),f>c&&(c=f),h>u&&(u=h);p=Math.max(c-a,u-l),p=p!==0?32767/p:0}return Zo(s,o,n,a,l,p,0),o}};function Kx(t,e,n,i,r){let s,o;if(r===ZT(t,e,n,i)>0)for(s=e;s<n;s+=i)o=zm(s,t[s],t[s+1],o);else for(s=n-i;s>=e;s-=i)o=zm(s,t[s],t[s+1],o);return o&&fc(o,o.next)&&(Jo(o),o=o.next),o}function Lr(t,e){if(!t)return t;e||(e=t);let n=t,i;do if(i=!1,!n.steiner&&(fc(n,n.next)||ht(n.prev,n,n.next)===0)){if(Jo(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function Zo(t,e,n,i,r,s,o){if(!t)return;!o&&s&&jT(t,i,r,s);let a=t,l,c;for(;t.prev!==t.next;){if(l=t.prev,c=t.next,s?kT(t,i,r,s):UT(t)){e.push(l.i/n|0),e.push(t.i/n|0),e.push(c.i/n|0),Jo(t),t=c.next,a=c.next;continue}if(t=c,t===a){o?o===1?(t=OT(Lr(t),e,n),Zo(t,e,n,i,r,s,2)):o===2&&FT(t,e,n,i,r,s):Zo(Lr(t),e,n,i,r,s,1);break}}}function UT(t){const e=t.prev,n=t,i=t.next;if(ht(e,n,i)>=0)return!1;const r=e.x,s=n.x,o=i.x,a=e.y,l=n.y,c=i.y,u=r<s?r<o?r:o:s<o?s:o,f=a<l?a<c?a:c:l<c?l:c,h=r>s?r>o?r:o:s>o?s:o,p=a>l?a>c?a:c:l>c?l:c;let v=i.next;for(;v!==e;){if(v.x>=u&&v.x<=h&&v.y>=f&&v.y<=p&&xs(r,a,s,l,o,c,v.x,v.y)&&ht(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function kT(t,e,n,i){const r=t.prev,s=t,o=t.next;if(ht(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,u=r.y,f=s.y,h=o.y,p=a<l?a<c?a:c:l<c?l:c,v=u<f?u<h?u:h:f<h?f:h,y=a>l?a>c?a:c:l>c?l:c,m=u>f?u>h?u:h:f>h?f:h,d=kd(p,v,e,n,i),_=kd(y,m,e,n,i);let x=t.prevZ,S=t.nextZ;for(;x&&x.z>=d&&S&&S.z<=_;){if(x.x>=p&&x.x<=y&&x.y>=v&&x.y<=m&&x!==r&&x!==o&&xs(a,u,l,f,c,h,x.x,x.y)&&ht(x.prev,x,x.next)>=0||(x=x.prevZ,S.x>=p&&S.x<=y&&S.y>=v&&S.y<=m&&S!==r&&S!==o&&xs(a,u,l,f,c,h,S.x,S.y)&&ht(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;x&&x.z>=d;){if(x.x>=p&&x.x<=y&&x.y>=v&&x.y<=m&&x!==r&&x!==o&&xs(a,u,l,f,c,h,x.x,x.y)&&ht(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;S&&S.z<=_;){if(S.x>=p&&S.x<=y&&S.y>=v&&S.y<=m&&S!==r&&S!==o&&xs(a,u,l,f,c,h,S.x,S.y)&&ht(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function OT(t,e,n){let i=t;do{const r=i.prev,s=i.next.next;!fc(r,s)&&Jx(r,i,i.next,s)&&Ko(r,s)&&Ko(s,r)&&(e.push(r.i/n|0),e.push(i.i/n|0),e.push(s.i/n|0),Jo(i),Jo(i.next),i=t=s),i=i.next}while(i!==t);return Lr(i)}function FT(t,e,n,i,r,s){let o=t;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&YT(o,a)){let l=Qx(o,a);o=Lr(o,o.next),l=Lr(l,l.next),Zo(o,e,n,i,r,s,0),Zo(l,e,n,i,r,s,0);return}a=a.next}o=o.next}while(o!==t)}function zT(t,e,n,i){const r=[];let s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*i,l=s<o-1?e[s+1]*i:t.length,c=Kx(t,a,l,i,!1),c===c.next&&(c.steiner=!0),r.push(XT(c));for(r.sort(BT),s=0;s<r.length;s++)n=HT(r[s],n);return n}function BT(t,e){return t.x-e.x}function HT(t,e){const n=VT(t,e);if(!n)return e;const i=Qx(n,t);return Lr(i,i.next),Lr(n,n.next)}function VT(t,e){let n=e,i=-1/0,r;const s=t.x,o=t.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const h=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(h<=s&&h>i&&(i=h,r=n.x<n.next.x?n:n.next,h===s))return r}n=n.next}while(n!==e);if(!r)return null;const a=r,l=r.x,c=r.y;let u=1/0,f;n=r;do s>=n.x&&n.x>=l&&s!==n.x&&xs(o<c?s:i,o,l,c,o<c?i:s,o,n.x,n.y)&&(f=Math.abs(o-n.y)/(s-n.x),Ko(n,t)&&(f<u||f===u&&(n.x>r.x||n.x===r.x&&GT(r,n)))&&(r=n,u=f)),n=n.next;while(n!==a);return r}function GT(t,e){return ht(t.prev,t,e.prev)<0&&ht(e.next,t,t.next)<0}function jT(t,e,n,i){let r=t;do r.z===0&&(r.z=kd(r.x,r.y,e,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,WT(r)}function WT(t){let e,n,i,r,s,o,a,l,c=1;do{for(n=t,t=null,s=null,o=0;n;){for(o++,i=n,a=0,e=0;e<c&&(a++,i=i.nextZ,!!i);e++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||n.z<=i.z)?(r=n,n=n.nextZ,a--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:t=r,r.prevZ=s,s=r;n=i}s.nextZ=null,c*=2}while(o>1);return t}function kd(t,e,n,i,r){return t=(t-n)*r|0,e=(e-i)*r|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function XT(t){let e=t,n=t;do(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;while(e!==t);return n}function xs(t,e,n,i,r,s,o,a){return(r-o)*(e-a)>=(t-o)*(s-a)&&(t-o)*(i-a)>=(n-o)*(e-a)&&(n-o)*(s-a)>=(r-o)*(i-a)}function YT(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!$T(t,e)&&(Ko(t,e)&&Ko(e,t)&&qT(t,e)&&(ht(t.prev,t,e.prev)||ht(t,e.prev,e))||fc(t,e)&&ht(t.prev,t,t.next)>0&&ht(e.prev,e,e.next)>0)}function ht(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function fc(t,e){return t.x===e.x&&t.y===e.y}function Jx(t,e,n,i){const r=Ja(ht(t,e,n)),s=Ja(ht(t,e,i)),o=Ja(ht(n,i,t)),a=Ja(ht(n,i,e));return!!(r!==s&&o!==a||r===0&&Ka(t,n,e)||s===0&&Ka(t,i,e)||o===0&&Ka(n,t,i)||a===0&&Ka(n,e,i))}function Ka(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function Ja(t){return t>0?1:t<0?-1:0}function $T(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&Jx(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function Ko(t,e){return ht(t.prev,t,t.next)<0?ht(t,e,t.next)>=0&&ht(t,t.prev,e)>=0:ht(t,e,t.prev)<0||ht(t,t.next,e)<0}function qT(t,e){let n=t,i=!1;const r=(t.x+e.x)/2,s=(t.y+e.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==t);return i}function Qx(t,e){const n=new Od(t.i,t.x,t.y),i=new Od(e.i,e.x,e.y),r=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function zm(t,e,n,i){const r=new Od(t,e,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Jo(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function Od(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ZT(t,e,n,i){let r=0;for(let s=e,o=n-i;s<n;s+=i)r+=(t[o]-t[s])*(t[s+1]+t[o+1]),o=s;return r}class Ao{static area(e){const n=e.length;let i=0;for(let r=n-1,s=0;s<n;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return Ao.area(e)<0}static triangulateShape(e,n){const i=[],r=[],s=[];Bm(e),Hm(i,e);let o=e.length;n.forEach(Bm);for(let l=0;l<n.length;l++)r.push(o),o+=n[l].length,Hm(i,n[l]);const a=IT.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Bm(t){const e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function Hm(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class hr extends $t{constructor(e=new ns([new de(.5,.5),new de(-.5,.5),new de(-.5,-.5),new de(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:n},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new pt(r,3)),this.setAttribute("uv",new pt(s,2)),this.computeVertexNormals();function o(a){const l=[],c=n.curveSegments!==void 0?n.curveSegments:12,u=n.steps!==void 0?n.steps:1,f=n.depth!==void 0?n.depth:1;let h=n.bevelEnabled!==void 0?n.bevelEnabled:!0,p=n.bevelThickness!==void 0?n.bevelThickness:.2,v=n.bevelSize!==void 0?n.bevelSize:p-.1,y=n.bevelOffset!==void 0?n.bevelOffset:0,m=n.bevelSegments!==void 0?n.bevelSegments:3;const d=n.extrudePath,_=n.UVGenerator!==void 0?n.UVGenerator:KT;let x,S=!1,P,w,T,O;d&&(x=d.getSpacedPoints(u),S=!0,h=!1,P=d.computeFrenetFrames(u,!1),w=new I,T=new I,O=new I),h||(m=0,p=0,v=0,y=0);const E=a.extractPoints(c);let b=E.shape;const B=E.holes;if(!Ao.isClockWise(b)){b=b.reverse();for(let D=0,ue=B.length;D<ue;D++){const X=B[D];Ao.isClockWise(X)&&(B[D]=X.reverse())}}const re=Ao.triangulateShape(b,B),U=b;for(let D=0,ue=B.length;D<ue;D++){const X=B[D];b=b.concat(X)}function V(D,ue,X){return ue||console.error("THREE.ExtrudeGeometry: vec does not exist"),D.clone().addScaledVector(ue,X)}const $=b.length,ne=re.length;function F(D,ue,X){let se,te,Te;const ve=D.x-ue.x,A=D.y-ue.y,M=X.x-D.x,H=X.y-D.y,ce=ve*ve+A*A,ae=ve*H-A*M;if(Math.abs(ae)>Number.EPSILON){const oe=Math.sqrt(ce),Ae=Math.sqrt(M*M+H*H),ye=ue.x-A/oe,be=ue.y+ve/oe,Le=X.x-H/Ae,Oe=X.y+M/Ae,le=((Le-ye)*H-(Oe-be)*M)/(ve*H-A*M);se=ye+ve*le-D.x,te=be+A*le-D.y;const Ge=se*se+te*te;if(Ge<=2)return new de(se,te);Te=Math.sqrt(Ge/2)}else{let oe=!1;ve>Number.EPSILON?M>Number.EPSILON&&(oe=!0):ve<-Number.EPSILON?M<-Number.EPSILON&&(oe=!0):Math.sign(A)===Math.sign(H)&&(oe=!0),oe?(se=-A,te=ve,Te=Math.sqrt(ce)):(se=ve,te=A,Te=Math.sqrt(ce/2))}return new de(se/Te,te/Te)}const G=[];for(let D=0,ue=U.length,X=ue-1,se=D+1;D<ue;D++,X++,se++)X===ue&&(X=0),se===ue&&(se=0),G[D]=F(U[D],U[X],U[se]);const C=[];let R,j=G.concat();for(let D=0,ue=B.length;D<ue;D++){const X=B[D];R=[];for(let se=0,te=X.length,Te=te-1,ve=se+1;se<te;se++,Te++,ve++)Te===te&&(Te=0),ve===te&&(ve=0),R[se]=F(X[se],X[Te],X[ve]);C.push(R),j=j.concat(R)}for(let D=0;D<m;D++){const ue=D/m,X=p*Math.cos(ue*Math.PI/2),se=v*Math.sin(ue*Math.PI/2)+y;for(let te=0,Te=U.length;te<Te;te++){const ve=V(U[te],G[te],se);J(ve.x,ve.y,-X)}for(let te=0,Te=B.length;te<Te;te++){const ve=B[te];R=C[te];for(let A=0,M=ve.length;A<M;A++){const H=V(ve[A],R[A],se);J(H.x,H.y,-X)}}}const z=v+y;for(let D=0;D<$;D++){const ue=h?V(b[D],j[D],z):b[D];S?(T.copy(P.normals[0]).multiplyScalar(ue.x),w.copy(P.binormals[0]).multiplyScalar(ue.y),O.copy(x[0]).add(T).add(w),J(O.x,O.y,O.z)):J(ue.x,ue.y,0)}for(let D=1;D<=u;D++)for(let ue=0;ue<$;ue++){const X=h?V(b[ue],j[ue],z):b[ue];S?(T.copy(P.normals[D]).multiplyScalar(X.x),w.copy(P.binormals[D]).multiplyScalar(X.y),O.copy(x[D]).add(T).add(w),J(O.x,O.y,O.z)):J(X.x,X.y,f/u*D)}for(let D=m-1;D>=0;D--){const ue=D/m,X=p*Math.cos(ue*Math.PI/2),se=v*Math.sin(ue*Math.PI/2)+y;for(let te=0,Te=U.length;te<Te;te++){const ve=V(U[te],G[te],se);J(ve.x,ve.y,f+X)}for(let te=0,Te=B.length;te<Te;te++){const ve=B[te];R=C[te];for(let A=0,M=ve.length;A<M;A++){const H=V(ve[A],R[A],se);S?J(H.x,H.y+x[u-1].y,x[u-1].x+X):J(H.x,H.y,f+X)}}}Y(),Q();function Y(){const D=r.length/3;if(h){let ue=0,X=$*ue;for(let se=0;se<ne;se++){const te=re[se];me(te[2]+X,te[1]+X,te[0]+X)}ue=u+m*2,X=$*ue;for(let se=0;se<ne;se++){const te=re[se];me(te[0]+X,te[1]+X,te[2]+X)}}else{for(let ue=0;ue<ne;ue++){const X=re[ue];me(X[2],X[1],X[0])}for(let ue=0;ue<ne;ue++){const X=re[ue];me(X[0]+$*u,X[1]+$*u,X[2]+$*u)}}i.addGroup(D,r.length/3-D,0)}function Q(){const D=r.length/3;let ue=0;ie(U,ue),ue+=U.length;for(let X=0,se=B.length;X<se;X++){const te=B[X];ie(te,ue),ue+=te.length}i.addGroup(D,r.length/3-D,1)}function ie(D,ue){let X=D.length;for(;--X>=0;){const se=X;let te=X-1;te<0&&(te=D.length-1);for(let Te=0,ve=u+m*2;Te<ve;Te++){const A=$*Te,M=$*(Te+1),H=ue+se+A,ce=ue+te+A,ae=ue+te+M,oe=ue+se+M;Me(H,ce,ae,oe)}}}function J(D,ue,X){l.push(D),l.push(ue),l.push(X)}function me(D,ue,X){ge(D),ge(ue),ge(X);const se=r.length/3,te=_.generateTopUV(i,r,se-3,se-2,se-1);Ee(te[0]),Ee(te[1]),Ee(te[2])}function Me(D,ue,X,se){ge(D),ge(ue),ge(se),ge(ue),ge(X),ge(se);const te=r.length/3,Te=_.generateSideWallUV(i,r,te-6,te-3,te-2,te-1);Ee(Te[0]),Ee(Te[1]),Ee(Te[3]),Ee(Te[1]),Ee(Te[2]),Ee(Te[3])}function ge(D){r.push(l[D*3+0]),r.push(l[D*3+1]),r.push(l[D*3+2])}function Ee(D){s.push(D.x),s.push(D.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),n=this.parameters.shapes,i=this.parameters.options;return JT(n,i,e)}static fromJSON(e,n){const i=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=n[e.shapes[s]];i.push(a)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Id[r.type]().fromJSON(r)),new hr(i,e.options)}}const KT={generateTopUV:function(t,e,n,i,r){const s=e[n*3],o=e[n*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],u=e[r*3+1];return[new de(s,o),new de(a,l),new de(c,u)]},generateSideWallUV:function(t,e,n,i,r,s){const o=e[n*3],a=e[n*3+1],l=e[n*3+2],c=e[i*3],u=e[i*3+1],f=e[i*3+2],h=e[r*3],p=e[r*3+1],v=e[r*3+2],y=e[s*3],m=e[s*3+1],d=e[s*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new de(o,1-l),new de(c,1-f),new de(h,1-v),new de(y,1-d)]:[new de(a,1-l),new de(u,1-f),new de(p,1-v),new de(m,1-d)]}};function JT(t,e,n){if(n.shapes=[],Array.isArray(t))for(let i=0,r=t.length;i<r;i++){const s=t[i];n.shapes.push(s.uuid)}else n.shapes.push(t.uuid);return n.options=Object.assign({},e),e.extrudePath!==void 0&&(n.options.extrudePath=e.extrudePath.toJSON()),n}class vs extends Gs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bx,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Qa extends vs{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new de(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return bt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Fd extends Qn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class ev extends kt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}}const bu=new Mt,Vm=new I,Gm=new I;class QT{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.map=null,this.mapPass=null,this.matrix=new Mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bh,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Vm.setFromMatrixPosition(e.matrixWorld),n.position.copy(Vm),Gm.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Gm),n.updateMatrixWorld(),bu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(bu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class e2 extends QT{constructor(){super(new wo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class uo extends ev{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new e2}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class tv extends ev{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class jm{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(bt(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class t2 extends Jn{constructor(e=10,n=10,i=4473924,r=8947848){i=new Ye(i),r=new Ye(r);const s=n/2,o=e/n,a=e/2,l=[],c=[];for(let h=0,p=0,v=-a;h<=n;h++,v+=o){l.push(-a,0,v,a,0,v),l.push(v,0,-a,v,0,a);const y=h===s?i:r;y.toArray(c,p),p+=3,y.toArray(c,p),p+=3,y.toArray(c,p),p+=3,y.toArray(c,p),p+=3}const u=new $t;u.setAttribute("position",new pt(l,3)),u.setAttribute("color",new pt(c,3));const f=new Qn({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Wm=new I;let el,Tu;class n2 extends kt{constructor(e=new I(0,0,1),n=new I(0,0,0),i=1,r=16776960,s=i*.2,o=s*.2){super(),this.type="ArrowHelper",el===void 0&&(el=new $t,el.setAttribute("position",new pt([0,0,0,0,1,0],3)),Tu=new zs(0,.5,1,5,1),Tu.translate(0,-.5,0)),this.position.copy(n),this.line=new Xx(el,new Qn({color:r,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Qt(Tu,new dc({color:r,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(i,s,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Wm.set(e.z,0,-e.x).normalize();const n=Math.acos(e.y);this.quaternion.setFromAxisAngle(Wm,n)}}setLength(e,n=e*.2,i=n*.2){this.line.scale.set(1,Math.max(1e-4,e-n),1),this.line.updateMatrix(),this.cone.scale.set(i,n,i),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class i2 extends Jn{constructor(e=1){const n=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new $t;r.setAttribute("position",new pt(n,3)),r.setAttribute("color",new pt(i,3));const s=new Qn({vertexColors:!0,toneMapped:!1});super(r,s),this.type="AxesHelper"}setColors(e,n,i){const r=new Ye,s=this.geometry.attributes.color.array;return r.set(e),r.toArray(s,0),r.toArray(s,3),r.set(n),r.toArray(s,6),r.toArray(s,9),r.set(i),r.toArray(s,12),r.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ih}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ih);function r2(t,e){const{length:n,width:i,height:r}=e;switch(t){case"l-block":{const s=new ns,o=i/2,a=r/2;s.moveTo(-o,-a),s.lineTo(o,-a),s.lineTo(o,0),s.lineTo(0,0),s.lineTo(0,a),s.lineTo(-o,a),s.closePath();const l={steps:1,depth:n,bevelEnabled:!0,bevelThickness:.8,bevelSize:.8,bevelOffset:-.8,bevelSegments:3},c=new hr(s,l);return c.center(),c.rotateY(Math.PI/2),c}case"u-block":{const s=i/2,o=r/2,a=i/4,l=0,c=new ns;c.moveTo(-s,-o),c.lineTo(s,-o),c.lineTo(s,o),c.lineTo(a,o),c.lineTo(a,l),c.lineTo(-a,l),c.lineTo(-a,o),c.lineTo(-s,o),c.closePath();const u={steps:1,depth:n,bevelEnabled:!0,bevelThickness:.8,bevelSize:.8,bevelOffset:-.8,bevelSegments:3},f=new hr(c,u);return f.center(),f.rotateY(Math.PI/2),f}case"hex-prism":{const s=n/2,o=new zs(s,s,r,6,2,!1),a=i/n;return o.scale(1,1,a),o}case"square-pyramid":{const s=Math.SQRT2*(n/2),o=new Xh(s,r,4,1);o.rotateY(Math.PI/4);const a=i/n;return o.scale(1,1,a),o}case"cone-frustum":{const s=n/2,o=n/4,a=new zs(o,s,r,48,2),l=i/n;return a.scale(1,1,l),a}case"cylinder-hole":{const s=n/2,o=n/4,a=new ns;a.absarc(0,0,s,0,Math.PI*2,!1);const l=new Ud;l.absarc(0,0,o,0,Math.PI*2,!0),a.holes.push(l);const c={steps:1,depth:r,bevelEnabled:!0,bevelThickness:.6,bevelSize:.6,bevelSegments:2,curveSegments:48},u=new hr(a,c);u.center(),u.rotateX(Math.PI/2);const f=i/n;return u.scale(1,1,f),u}case"counterbore":{const s=n/2,o=n*.38,a=n*.22,l=[],c=r/2,u=r*.45;l.push(new de(a,-c)),l.push(new de(s,-c)),l.push(new de(s,c)),l.push(new de(o,c)),l.push(new de(o,c-u)),l.push(new de(a,c-u)),l.push(new de(a,-c));const f=new Wh(l,48),h=i/n;return f.scale(1,1,h),f}case"v-block":{const s=i/2,o=r/2,a=r*.42,l=i*.35,c=i*.06,u=new ns;u.moveTo(-s,-o),u.lineTo(s,-o),u.lineTo(s,o),u.lineTo(l,o),u.lineTo(c,o-a+c),u.lineTo(0,o-a),u.lineTo(-c,o-a+c),u.lineTo(-l,o),u.lineTo(-s,o),u.closePath();const f={steps:1,depth:n,bevelEnabled:!0,bevelThickness:.8,bevelSize:.8,bevelOffset:-.8,bevelSegments:3},h=new hr(u,f);return h.center(),h.rotateY(Math.PI/2),h}case"tri-prism":{const s=i/2,o=r/2,a=new ns;a.moveTo(-s,-o),a.lineTo(s,-o),a.lineTo(0,o),a.closePath();const l={steps:1,depth:n,bevelEnabled:!0,bevelThickness:.8,bevelSize:.8,bevelOffset:-.8,bevelSegments:3},c=new hr(a,l);return c.center(),c.rotateY(Math.PI/2),c}default:return new js(n,r,i)}}const Co=[{id:"l-block",name:"Stepped L-Block (Machined)",category:"Prismatic Solids",description:"Precision milled L-bracket with corner chamfers. Illustrates visible steps and profile alignment.",defaultDimensions:{length:60,width:40,height:50},iconName:"CornerDownRight"},{id:"u-block",name:"Slotted U-Channel Block",category:"Prismatic Solids",description:"Milled U-channel with longitudinal slot. Features crucial interior hidden lines in front and side views.",defaultDimensions:{length:60,width:50,height:45},iconName:"SplitSquareVertical"},{id:"hex-prism",name:"Hexagonal Prism (ISO Standard)",category:"Polyhedra",description:"Regular 6-sided prism. Demonstrates corner generators, face visibility, and symmetry axes.",defaultDimensions:{length:50,width:50,height:60},iconName:"Hexagon"},{id:"square-pyramid",name:"Square Pyramid",category:"Pyramids",description:"Square base with sloping triangular faces meeting at the vertex. Shows diagonal ridge lines in plan.",defaultDimensions:{length:50,width:50,height:65},iconName:"Pyramid"},{id:"cone-frustum",name:"Frustum of a Cone (ISO Symbol)",category:"Conics",description:"Truncated cone standard. This exact solid defines the official ISO First-Angle Projection symbol!",defaultDimensions:{length:60,width:60,height:50},iconName:"Cone"},{id:"counterbore",name:"Counterbore Bushing (Dual Step)",category:"Turned Parts",description:"Turned cylindrical component with stepped counterbore. Tests multi-tier hidden lines and concentric circles.",defaultDimensions:{length:55,width:55,height:60},iconName:"CircleDot"},{id:"cylinder-hole",name:"Hollow Cylinder (Bushing)",category:"Hollow Solids",description:"Solid cylinder with axial through-bore. Essential for practicing interior hidden lines and centerlines.",defaultDimensions:{length:50,width:50,height:55},iconName:"CircleDot"},{id:"v-block",name:"Machinist V-Block (90° Groove)",category:"Mechanical Fixtures",description:"Precision workshop locating fixture with 90° V-groove and central relief hole for clamping round bars.",defaultDimensions:{length:60,width:50,height:45},iconName:"Spline"},{id:"tri-prism",name:"Triangular Prism",category:"Polyhedra",description:"Equilateral triangular cross-section extruded horizontally. Ideal for learning apex projection.",defaultDimensions:{length:60,width:45,height:50},iconName:"Triangle"}],Au=[0,30,45,60,90,180],s2=({currentSolid:t,onSelectSolid:e,dimensions:n,onUpdateDimensions:i,rotation:r,onUpdateRotation:s,onResetRotation:o,theme:a,onToggleTheme:l,displayOptions:c,onUpdateDisplayOptions:u,isCollapsed:f,onToggleCollapse:h})=>{const[p,v]=Ze.useState("solids"),y=a==="blueprint",m=d=>{switch(d){case"CornerDownRight":return g.jsx(jy,{className:"w-4 h-4 text-sky-400"});case"SplitSquareVertical":return g.jsx(eS,{className:"w-4 h-4 text-sky-400"});case"Hexagon":return g.jsx(Xy,{className:"w-4 h-4 text-sky-400"});case"Pyramid":return g.jsx(Ky,{className:"w-4 h-4 text-sky-400"});case"Cone":return g.jsx(Gy,{className:"w-4 h-4 text-sky-400"});case"CircleDot":return g.jsx(Vy,{className:"w-4 h-4 text-sky-400"});case"Spline":return g.jsx(Qy,{className:"w-4 h-4 text-sky-400"});case"Triangle":return g.jsx(tS,{className:"w-4 h-4 text-sky-400"});default:return g.jsx(So,{className:"w-4 h-4 text-sky-400"})}};return f?g.jsxs("div",{className:`w-14 h-full flex flex-col items-center py-4 border-r select-none transition-colors duration-200 z-30 ${y?"bg-[#0f172a] border-slate-800":"bg-white border-slate-200"}`,children:[g.jsx("button",{onClick:h,title:"Expand Control Panel",className:`p-2.5 rounded-lg mb-6 transition-all ${y?"hover:bg-slate-800 text-sky-400":"hover:bg-slate-100 text-blue-600"}`,children:g.jsx(Hy,{className:"w-5 h-5"})}),g.jsxs("div",{className:"flex flex-col gap-4",children:[g.jsx("button",{onClick:()=>{h(),v("solids")},title:"Engineering Solids",className:"p-2 rounded hover:bg-slate-800 text-slate-400 hover:text-sky-400",children:g.jsx(So,{className:"w-5 h-5"})}),g.jsx("button",{onClick:()=>{h(),v("dimensions")},title:"Parametric Dimensions",className:"p-2 rounded hover:bg-slate-800 text-slate-400 hover:text-sky-400",children:g.jsx(hp,{className:"w-5 h-5"})}),g.jsx("button",{onClick:()=>{h(),v("orientation")},title:"Orientation & Inclination",className:"p-2 rounded hover:bg-slate-800 text-slate-400 hover:text-sky-400",children:g.jsx(dp,{className:"w-5 h-5"})}),g.jsx("button",{onClick:()=>{h(),v("display")},title:"Display Options",className:"p-2 rounded hover:bg-slate-800 text-slate-400 hover:text-sky-400",children:g.jsx(up,{className:"w-5 h-5"})})]}),g.jsx("div",{className:"mt-auto",children:g.jsx("button",{onClick:l,title:y?"Switch to Drawing Sheet (White)":"Switch to CAD Blueprint (Dark)",className:"p-2.5 rounded-lg text-amber-400 hover:bg-slate-800",children:y?g.jsx(wd,{className:"w-5 h-5"}):g.jsx(Ed,{className:"w-5 h-5 text-slate-700"})})})]}):g.jsxs("aside",{className:`w-80 h-full flex flex-col border-r select-none transition-colors duration-200 z-30 ${y?"bg-[#0f172a] border-slate-800 text-slate-200":"bg-white border-slate-200 text-slate-800"}`,children:[g.jsxs("div",{className:"px-4 py-3.5 border-b border-slate-700/50 flex items-center justify-between",children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx(Jy,{className:"w-4 h-4 text-sky-400"}),g.jsx("span",{className:"font-mono font-bold text-xs tracking-wider uppercase",children:"CONTROL PALETTE"})]}),g.jsx("button",{onClick:h,title:"Collapse Sidebar",className:"p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors",children:g.jsx(By,{className:"w-4 h-4"})})]}),g.jsxs("div",{className:"grid grid-cols-4 border-b border-slate-700/50 p-1 text-[11px] font-mono",children:[g.jsxs("button",{onClick:()=>v("solids"),className:`py-1.5 rounded transition-all text-center flex flex-col items-center gap-1 ${p==="solids"?y?"bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30":"bg-blue-50 text-blue-700 font-bold border border-blue-200":"text-slate-400 hover:text-slate-200"}`,children:[g.jsx(So,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:"Solids"})]}),g.jsxs("button",{onClick:()=>v("dimensions"),className:`py-1.5 rounded transition-all text-center flex flex-col items-center gap-1 ${p==="dimensions"?y?"bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30":"bg-blue-50 text-blue-700 font-bold border border-blue-200":"text-slate-400 hover:text-slate-200"}`,children:[g.jsx(hp,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:"Dimens"})]}),g.jsxs("button",{onClick:()=>v("orientation"),className:`py-1.5 rounded transition-all text-center flex flex-col items-center gap-1 ${p==="orientation"?y?"bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30":"bg-blue-50 text-blue-700 font-bold border border-blue-200":"text-slate-400 hover:text-slate-200"}`,children:[g.jsx(dp,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:"Rotate"})]}),g.jsxs("button",{onClick:()=>v("display"),className:`py-1.5 rounded transition-all text-center flex flex-col items-center gap-1 ${p==="display"?y?"bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30":"bg-blue-50 text-blue-700 font-bold border border-blue-200":"text-slate-400 hover:text-slate-200"}`,children:[g.jsx(up,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:"Display"})]})]}),g.jsxs("div",{className:"flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar",children:[p==="solids"&&g.jsxs("div",{className:"space-y-3",children:[g.jsxs("div",{className:"text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between",children:[g.jsx("span",{children:"Standard Engineering Solids"}),g.jsxs("span",{className:"text-[10px] text-sky-400",children:[Co.length," models"]})]}),g.jsx("div",{className:"grid grid-cols-1 gap-2",children:Co.map(d=>{const _=t===d.id;return g.jsxs("button",{onClick:()=>e(d.id),className:`p-3 rounded-lg border text-left transition-all flex items-start gap-3 ${_?y?"bg-sky-950/40 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]":"bg-blue-50 border-blue-500 shadow-sm":y?"bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50":"bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100"}`,children:[g.jsx("div",{className:`p-2 rounded-md ${_?y?"bg-sky-500/20 text-sky-300":"bg-blue-100 text-blue-700":y?"bg-slate-800 text-slate-400":"bg-slate-200 text-slate-600"}`,children:m(d.iconName)}),g.jsxs("div",{className:"flex-1 min-w-0",children:[g.jsxs("div",{className:"flex items-center justify-between",children:[g.jsx("span",{className:`font-mono text-xs font-bold truncate ${_?y?"text-sky-300":"text-blue-700":y?"text-slate-200":"text-slate-800"}`,children:d.name}),g.jsx("span",{className:"text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400",children:d.category})]}),g.jsx("p",{className:"text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight",children:d.description})]})]},d.id)})})]}),p==="dimensions"&&g.jsxs("div",{className:"space-y-4",children:[g.jsxs("div",{className:"text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between",children:[g.jsx("span",{children:"Parametric Dimensions"}),g.jsx("span",{className:"text-[10px] text-amber-400",children:"All in millimeters (mm)"})]}),g.jsxs("div",{className:"p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2",children:[g.jsxs("div",{className:"flex items-center justify-between text-xs font-mono",children:[g.jsxs("span",{className:"font-bold text-red-400 flex items-center gap-1.5",children:[g.jsx("span",{className:"w-2 h-2 rounded-full bg-red-400"}),"Length (L) [X-axis]"]}),g.jsxs("span",{className:"font-bold text-sky-400",children:[n.length," mm"]})]}),g.jsx("input",{type:"range",min:"20",max:"100",step:"2",value:n.length,onChange:d=>i({...n,length:Number(d.target.value)}),className:"w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"}),g.jsxs("div",{className:"flex justify-between text-[10px] text-slate-500 font-mono",children:[g.jsx("span",{children:"20 mm"}),g.jsx("span",{children:"60 mm"}),g.jsx("span",{children:"100 mm"})]})]}),g.jsxs("div",{className:"p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2",children:[g.jsxs("div",{className:"flex items-center justify-between text-xs font-mono",children:[g.jsxs("span",{className:"font-bold text-blue-400 flex items-center gap-1.5",children:[g.jsx("span",{className:"w-2 h-2 rounded-full bg-blue-400"}),"Width / Depth (W) [Z-axis]"]}),g.jsxs("span",{className:"font-bold text-sky-400",children:[n.width," mm"]})]}),g.jsx("input",{type:"range",min:"20",max:"100",step:"2",value:n.width,onChange:d=>i({...n,width:Number(d.target.value)}),className:"w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"}),g.jsxs("div",{className:"flex justify-between text-[10px] text-slate-500 font-mono",children:[g.jsx("span",{children:"20 mm"}),g.jsx("span",{children:"50 mm"}),g.jsx("span",{children:"100 mm"})]})]}),g.jsxs("div",{className:"p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2",children:[g.jsxs("div",{className:"flex items-center justify-between text-xs font-mono",children:[g.jsxs("span",{className:"font-bold text-emerald-400 flex items-center gap-1.5",children:[g.jsx("span",{className:"w-2 h-2 rounded-full bg-emerald-400"}),"Height (H) [Y-axis]"]}),g.jsxs("span",{className:"font-bold text-sky-400",children:[n.height," mm"]})]}),g.jsx("input",{type:"range",min:"20",max:"100",step:"2",value:n.height,onChange:d=>i({...n,height:Number(d.target.value)}),className:"w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"}),g.jsxs("div",{className:"flex justify-between text-[10px] text-slate-500 font-mono",children:[g.jsx("span",{children:"20 mm"}),g.jsx("span",{children:"50 mm"}),g.jsx("span",{children:"100 mm"})]})]}),g.jsxs("div",{className:"pt-2 border-t border-slate-800 flex items-center justify-between",children:[g.jsx("span",{className:"text-[11px] font-mono text-slate-400",children:"Quick Presets:"}),g.jsxs("div",{className:"flex gap-1.5",children:[g.jsx("button",{onClick:()=>i({length:60,width:40,height:50}),className:"px-2 py-1 text-[10px] font-mono bg-slate-800 hover:bg-slate-700 rounded text-slate-300",children:"60×40×50"}),g.jsx("button",{onClick:()=>i({length:50,width:50,height:50}),className:"px-2 py-1 text-[10px] font-mono bg-slate-800 hover:bg-slate-700 rounded text-slate-300",children:"Cube 50³"})]})]})]}),p==="orientation"&&g.jsxs("div",{className:"space-y-4",children:[g.jsxs("div",{className:"flex items-center justify-between text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider",children:[g.jsx("span",{children:"Inclination / Rotation"}),g.jsxs("button",{onClick:o,className:"text-[10px] text-amber-400 hover:underline flex items-center gap-1",children:[g.jsx(Dh,{className:"w-3 h-3"}),"Reset (0,0,0)"]})]}),g.jsxs("div",{className:"p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2",children:[g.jsxs("div",{className:"flex items-center justify-between text-xs font-mono",children:[g.jsx("span",{className:"font-bold text-red-400",children:"Tilt X (θ to HP)"}),g.jsxs("span",{className:"font-bold text-sky-400",children:[r.x,"°"]})]}),g.jsx("input",{type:"range",min:"0",max:"360",step:"1",value:r.x,onChange:d=>s({...r,x:Number(d.target.value)}),className:"w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"}),g.jsx("div",{className:"flex gap-1 flex-wrap pt-1",children:Au.map(d=>g.jsxs("button",{onClick:()=>s({...r,x:d}),className:`px-1.5 py-0.5 text-[9px] font-mono rounded ${r.x===d?"bg-red-500 text-white font-bold":"bg-slate-800 text-slate-400 hover:text-white"}`,children:[d,"°"]},d))})]}),g.jsxs("div",{className:"p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2",children:[g.jsxs("div",{className:"flex items-center justify-between text-xs font-mono",children:[g.jsx("span",{className:"font-bold text-emerald-400",children:"Spin Y (Azimuth)"}),g.jsxs("span",{className:"font-bold text-sky-400",children:[r.y,"°"]})]}),g.jsx("input",{type:"range",min:"0",max:"360",step:"1",value:r.y,onChange:d=>s({...r,y:Number(d.target.value)}),className:"w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"}),g.jsx("div",{className:"flex gap-1 flex-wrap pt-1",children:Au.map(d=>g.jsxs("button",{onClick:()=>s({...r,y:d}),className:`px-1.5 py-0.5 text-[9px] font-mono rounded ${r.y===d?"bg-emerald-500 text-white font-bold":"bg-slate-800 text-slate-400 hover:text-white"}`,children:[d,"°"]},d))})]}),g.jsxs("div",{className:"p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2",children:[g.jsxs("div",{className:"flex items-center justify-between text-xs font-mono",children:[g.jsx("span",{className:"font-bold text-blue-400",children:"Tilt Z (φ to VP)"}),g.jsxs("span",{className:"font-bold text-sky-400",children:[r.z,"°"]})]}),g.jsx("input",{type:"range",min:"0",max:"360",step:"1",value:r.z,onChange:d=>s({...r,z:Number(d.target.value)}),className:"w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"}),g.jsx("div",{className:"flex gap-1 flex-wrap pt-1",children:Au.map(d=>g.jsxs("button",{onClick:()=>s({...r,z:d}),className:`px-1.5 py-0.5 text-[9px] font-mono rounded ${r.z===d?"bg-blue-500 text-white font-bold":"bg-slate-800 text-slate-400 hover:text-white"}`,children:[d,"°"]},d))})]})]}),p==="display"&&g.jsxs("div",{className:"space-y-4",children:[g.jsx("div",{className:"text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider",children:"Drafting & Render Styles"}),g.jsxs("div",{className:"p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2",children:[g.jsx("div",{className:"text-xs font-mono font-bold text-slate-200",children:"3D CAD Material Finish"}),g.jsx("div",{className:"grid grid-cols-3 gap-1.5 pt-1",children:["aluminum","steel","polymer","glass","anodized"].map(d=>g.jsx("button",{onClick:()=>u({...c,renderStyle:d}),className:`py-1.5 px-2 rounded border text-[10px] font-mono uppercase font-bold transition-all ${c.renderStyle===d?"bg-sky-500 text-slate-950 border-sky-400 shadow":"bg-slate-800 border-slate-700 text-slate-400 hover:text-white"}`,children:d},d))})]}),g.jsxs("div",{className:"p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2",children:[g.jsx("div",{className:"text-xs font-mono font-bold text-slate-200",children:"Quadrant 4 Depth Transfer"}),g.jsxs("div",{className:"grid grid-cols-2 gap-2 pt-1",children:[g.jsx("button",{onClick:()=>u({...c,transferMethod:"miter"}),className:`py-1.5 px-2 rounded border text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${c.transferMethod==="miter"?"bg-sky-950 border-sky-500 text-sky-300 font-bold":"bg-slate-800 border-slate-700 text-slate-400"}`,children:g.jsx("span",{children:"45° Miter Line"})}),g.jsxs("button",{onClick:()=>u({...c,transferMethod:"compass"}),className:`py-1.5 px-2 rounded border text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${c.transferMethod==="compass"?"bg-sky-950 border-sky-500 text-sky-300 font-bold":"bg-slate-800 border-slate-700 text-slate-400"}`,children:[g.jsx(cx,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:"Compass Arcs"})]})]})]}),g.jsxs("div",{className:"p-3 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-between",children:[g.jsxs("div",{children:[g.jsx("div",{className:"text-xs font-mono font-bold text-slate-200",children:"Hidden Lines (Dashed)"}),g.jsx("div",{className:"text-[10px] text-slate-400 mt-0.5",children:"Renders occluded edges behind solid faces"})]}),g.jsx("input",{type:"checkbox",checked:c.showHiddenLines,onChange:d=>u({...c,showHiddenLines:d.target.checked}),className:"w-4 h-4 accent-amber-500 cursor-pointer"})]}),g.jsxs("div",{className:"p-3 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-between",children:[g.jsxs("div",{children:[g.jsx("div",{className:"text-xs font-mono font-bold text-slate-200",children:"Dimension Lines (L, W, H)"}),g.jsx("div",{className:"text-[10px] text-slate-400 mt-0.5",children:"BIS SP:46 aligned dimension arrows & text"})]}),g.jsx("input",{type:"checkbox",checked:c.showDimensions,onChange:d=>u({...c,showDimensions:d.target.checked}),className:"w-4 h-4 accent-red-500 cursor-pointer"})]}),g.jsxs("div",{className:"p-3 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-between",children:[g.jsxs("div",{children:[g.jsx("div",{className:"text-xs font-mono font-bold text-slate-200",children:"Observer Sight Arrows"}),g.jsx("div",{className:"text-[10px] text-slate-400 mt-0.5",children:"Visual sight-rays pointing to FV, TV, LHSV"})]}),g.jsx("input",{type:"checkbox",checked:c.showSightArrows,onChange:d=>u({...c,showSightArrows:d.target.checked}),className:"w-4 h-4 accent-emerald-500 cursor-pointer"})]}),g.jsxs("div",{className:"p-3 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-between",children:[g.jsxs("div",{children:[g.jsx("div",{className:"text-xs font-mono font-bold text-slate-200",children:"Axis & Center Lines"}),g.jsx("div",{className:"text-[10px] text-slate-400 mt-0.5",children:"BIS Type G dash-dot symmetry axes"})]}),g.jsx("input",{type:"checkbox",checked:c.showCenterLines,onChange:d=>u({...c,showCenterLines:d.target.checked}),className:"w-4 h-4 accent-red-500 cursor-pointer"})]}),g.jsxs("div",{className:"p-3 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-between",children:[g.jsxs("div",{children:[g.jsx("div",{className:"text-xs font-mono font-bold text-slate-200",children:"Alignment Projectors"}),g.jsx("div",{className:"text-[10px] text-slate-400 mt-0.5",children:"Faint rays connecting FV, TV, and LHSV"})]}),g.jsx("input",{type:"checkbox",checked:c.showProjectors,onChange:d=>u({...c,showProjectors:d.target.checked}),className:"w-4 h-4 accent-sky-500 cursor-pointer"})]}),g.jsxs("div",{className:"p-3 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2",children:[g.jsx("div",{className:"text-xs font-mono font-bold text-slate-200",children:"Visual Drafting Theme"}),g.jsxs("div",{className:"grid grid-cols-2 gap-2 pt-1",children:[g.jsxs("button",{onClick:()=>a!=="blueprint"&&l(),className:`p-2 rounded border text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${y?"bg-sky-950 border-sky-500 text-sky-300 font-bold shadow":"bg-slate-800 border-slate-700 text-slate-400"}`,children:[g.jsx(Ed,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:"CAD Blueprint"})]}),g.jsxs("button",{onClick:()=>a!=="paper"&&l(),className:`p-2 rounded border text-xs font-mono flex items-center justify-center gap-1.5 transition-all ${y?"bg-slate-800 border-slate-700 text-slate-400":"bg-white border-blue-600 text-blue-700 font-bold shadow"}`,children:[g.jsx(wd,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:"Drawing Sheet"})]})]})]})]})]}),g.jsxs("div",{className:"p-3 border-t border-slate-700/50 text-[10px] font-mono text-slate-500 flex items-center justify-between",children:[g.jsxs("span",{className:"flex items-center gap-1",children:[g.jsx($y,{className:"w-3.5 h-3.5 text-sky-400"}),g.jsx("span",{children:"BIS SP:46 / ISO 128"})]}),g.jsx("span",{children:"v1.1.0"})]})]})},Xm={type:"change"},Cu={type:"start"},Ym={type:"end"},tl=new zh,$m=new Li,o2=Math.cos(70*Mr.DEG2RAD);class a2 extends Ir{constructor(e,n){super(),this.object=e,this.domElement=n,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Or.ROTATE,MIDDLE:Or.DOLLY,RIGHT:Or.PAN},this.touches={ONE:Fr.ROTATE,TWO:Fr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(N){N.addEventListener("keydown",Le),this._domElementKeyEvents=N},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Le),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Xm),i.update(),s=r.NONE},this.update=function(){const N=new I,fe=new Rr().setFromUnitVectors(e.up,new I(0,1,0)),Ne=fe.clone().invert(),Pe=new I,he=new Rr,k=new I,xe=2*Math.PI;return function(Fe=null){const Ue=i.object.position;N.copy(Ue).sub(i.target),N.applyQuaternion(fe),a.setFromVector3(N),i.autoRotate&&s===r.NONE&&q(b(Fe)),i.enableDamping?(a.theta+=l.theta*i.dampingFactor,a.phi+=l.phi*i.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let Je=i.minAzimuthAngle,Qe=i.maxAzimuthAngle;isFinite(Je)&&isFinite(Qe)&&(Je<-Math.PI?Je+=xe:Je>Math.PI&&(Je-=xe),Qe<-Math.PI?Qe+=xe:Qe>Math.PI&&(Qe-=xe),Je<=Qe?a.theta=Math.max(Je,Math.min(Qe,a.theta)):a.theta=a.theta>(Je+Qe)/2?Math.max(Je,a.theta):Math.min(Qe,a.theta)),a.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,a.phi)),a.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&w||i.object.isOrthographicCamera?a.radius=C(a.radius):a.radius=C(a.radius*c),N.setFromSpherical(a),N.applyQuaternion(Ne),Ue.copy(i.target).add(N),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0));let gt=!1;if(i.zoomToCursor&&w){let _t=null;if(i.object.isPerspectiveCamera){const nt=N.length();_t=C(nt*c);const Et=nt-_t;i.object.position.addScaledVector(S,Et),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const nt=new I(P.x,P.y,0);nt.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),gt=!0;const Et=new I(P.x,P.y,0);Et.unproject(i.object),i.object.position.sub(Et).add(nt),i.object.updateMatrixWorld(),_t=N.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;_t!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(_t).add(i.object.position):(tl.origin.copy(i.object.position),tl.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(tl.direction))<o2?e.lookAt(i.target):($m.setFromNormalAndCoplanarPoint(i.object.up,i.target),tl.intersectPlane($m,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),gt=!0);return c=1,w=!1,gt||Pe.distanceToSquared(i.object.position)>o||8*(1-he.dot(i.object.quaternion))>o||k.distanceToSquared(i.target)>0?(i.dispatchEvent(Xm),Pe.copy(i.object.position),he.copy(i.object.quaternion),k.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",Ge),i.domElement.removeEventListener("pointerdown",A),i.domElement.removeEventListener("pointercancel",H),i.domElement.removeEventListener("wheel",oe),i.domElement.removeEventListener("pointermove",M),i.domElement.removeEventListener("pointerup",H),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",Le),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const o=1e-6,a=new jm,l=new jm;let c=1;const u=new I,f=new de,h=new de,p=new de,v=new de,y=new de,m=new de,d=new de,_=new de,x=new de,S=new I,P=new de;let w=!1;const T=[],O={};let E=!1;function b(N){return N!==null?2*Math.PI/60*i.autoRotateSpeed*N:2*Math.PI/60/60*i.autoRotateSpeed}function B(N){const fe=Math.abs(N*.01);return Math.pow(.95,i.zoomSpeed*fe)}function q(N){l.theta-=N}function re(N){l.phi-=N}const U=function(){const N=new I;return function(Ne,Pe){N.setFromMatrixColumn(Pe,0),N.multiplyScalar(-Ne),u.add(N)}}(),V=function(){const N=new I;return function(Ne,Pe){i.screenSpacePanning===!0?N.setFromMatrixColumn(Pe,1):(N.setFromMatrixColumn(Pe,0),N.crossVectors(i.object.up,N)),N.multiplyScalar(Ne),u.add(N)}}(),$=function(){const N=new I;return function(Ne,Pe){const he=i.domElement;if(i.object.isPerspectiveCamera){const k=i.object.position;N.copy(k).sub(i.target);let xe=N.length();xe*=Math.tan(i.object.fov/2*Math.PI/180),U(2*Ne*xe/he.clientHeight,i.object.matrix),V(2*Pe*xe/he.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(U(Ne*(i.object.right-i.object.left)/i.object.zoom/he.clientWidth,i.object.matrix),V(Pe*(i.object.top-i.object.bottom)/i.object.zoom/he.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function ne(N){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=N:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function F(N){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=N:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function G(N,fe){if(!i.zoomToCursor)return;w=!0;const Ne=i.domElement.getBoundingClientRect(),Pe=N-Ne.left,he=fe-Ne.top,k=Ne.width,xe=Ne.height;P.x=Pe/k*2-1,P.y=-(he/xe)*2+1,S.set(P.x,P.y,1).unproject(i.object).sub(i.object.position).normalize()}function C(N){return Math.max(i.minDistance,Math.min(i.maxDistance,N))}function R(N){f.set(N.clientX,N.clientY)}function j(N){G(N.clientX,N.clientX),d.set(N.clientX,N.clientY)}function z(N){v.set(N.clientX,N.clientY)}function Y(N){h.set(N.clientX,N.clientY),p.subVectors(h,f).multiplyScalar(i.rotateSpeed);const fe=i.domElement;q(2*Math.PI*p.x/fe.clientHeight),re(2*Math.PI*p.y/fe.clientHeight),f.copy(h),i.update()}function Q(N){_.set(N.clientX,N.clientY),x.subVectors(_,d),x.y>0?ne(B(x.y)):x.y<0&&F(B(x.y)),d.copy(_),i.update()}function ie(N){y.set(N.clientX,N.clientY),m.subVectors(y,v).multiplyScalar(i.panSpeed),$(m.x,m.y),v.copy(y),i.update()}function J(N){G(N.clientX,N.clientY),N.deltaY<0?F(B(N.deltaY)):N.deltaY>0&&ne(B(N.deltaY)),i.update()}function me(N){let fe=!1;switch(N.code){case i.keys.UP:N.ctrlKey||N.metaKey||N.shiftKey?re(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):$(0,i.keyPanSpeed),fe=!0;break;case i.keys.BOTTOM:N.ctrlKey||N.metaKey||N.shiftKey?re(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):$(0,-i.keyPanSpeed),fe=!0;break;case i.keys.LEFT:N.ctrlKey||N.metaKey||N.shiftKey?q(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):$(i.keyPanSpeed,0),fe=!0;break;case i.keys.RIGHT:N.ctrlKey||N.metaKey||N.shiftKey?q(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):$(-i.keyPanSpeed,0),fe=!0;break}fe&&(N.preventDefault(),i.update())}function Me(N){if(T.length===1)f.set(N.pageX,N.pageY);else{const fe=_e(N),Ne=.5*(N.pageX+fe.x),Pe=.5*(N.pageY+fe.y);f.set(Ne,Pe)}}function ge(N){if(T.length===1)v.set(N.pageX,N.pageY);else{const fe=_e(N),Ne=.5*(N.pageX+fe.x),Pe=.5*(N.pageY+fe.y);v.set(Ne,Pe)}}function Ee(N){const fe=_e(N),Ne=N.pageX-fe.x,Pe=N.pageY-fe.y,he=Math.sqrt(Ne*Ne+Pe*Pe);d.set(0,he)}function D(N){i.enableZoom&&Ee(N),i.enablePan&&ge(N)}function ue(N){i.enableZoom&&Ee(N),i.enableRotate&&Me(N)}function X(N){if(T.length==1)h.set(N.pageX,N.pageY);else{const Ne=_e(N),Pe=.5*(N.pageX+Ne.x),he=.5*(N.pageY+Ne.y);h.set(Pe,he)}p.subVectors(h,f).multiplyScalar(i.rotateSpeed);const fe=i.domElement;q(2*Math.PI*p.x/fe.clientHeight),re(2*Math.PI*p.y/fe.clientHeight),f.copy(h)}function se(N){if(T.length===1)y.set(N.pageX,N.pageY);else{const fe=_e(N),Ne=.5*(N.pageX+fe.x),Pe=.5*(N.pageY+fe.y);y.set(Ne,Pe)}m.subVectors(y,v).multiplyScalar(i.panSpeed),$(m.x,m.y),v.copy(y)}function te(N){const fe=_e(N),Ne=N.pageX-fe.x,Pe=N.pageY-fe.y,he=Math.sqrt(Ne*Ne+Pe*Pe);_.set(0,he),x.set(0,Math.pow(_.y/d.y,i.zoomSpeed)),ne(x.y),d.copy(_);const k=(N.pageX+fe.x)*.5,xe=(N.pageY+fe.y)*.5;G(k,xe)}function Te(N){i.enableZoom&&te(N),i.enablePan&&se(N)}function ve(N){i.enableZoom&&te(N),i.enableRotate&&X(N)}function A(N){i.enabled!==!1&&(T.length===0&&(i.domElement.setPointerCapture(N.pointerId),i.domElement.addEventListener("pointermove",M),i.domElement.addEventListener("pointerup",H)),He(N),N.pointerType==="touch"?Oe(N):ce(N))}function M(N){i.enabled!==!1&&(N.pointerType==="touch"?le(N):ae(N))}function H(N){ke(N),T.length===0&&(i.domElement.releasePointerCapture(N.pointerId),i.domElement.removeEventListener("pointermove",M),i.domElement.removeEventListener("pointerup",H)),i.dispatchEvent(Ym),s=r.NONE}function ce(N){let fe;switch(N.button){case 0:fe=i.mouseButtons.LEFT;break;case 1:fe=i.mouseButtons.MIDDLE;break;case 2:fe=i.mouseButtons.RIGHT;break;default:fe=-1}switch(fe){case Or.DOLLY:if(i.enableZoom===!1)return;j(N),s=r.DOLLY;break;case Or.ROTATE:if(N.ctrlKey||N.metaKey||N.shiftKey){if(i.enablePan===!1)return;z(N),s=r.PAN}else{if(i.enableRotate===!1)return;R(N),s=r.ROTATE}break;case Or.PAN:if(N.ctrlKey||N.metaKey||N.shiftKey){if(i.enableRotate===!1)return;R(N),s=r.ROTATE}else{if(i.enablePan===!1)return;z(N),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Cu)}function ae(N){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;Y(N);break;case r.DOLLY:if(i.enableZoom===!1)return;Q(N);break;case r.PAN:if(i.enablePan===!1)return;ie(N);break}}function oe(N){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(N.preventDefault(),i.dispatchEvent(Cu),J(Ae(N)),i.dispatchEvent(Ym))}function Ae(N){const fe=N.deltaMode,Ne={clientX:N.clientX,clientY:N.clientY,deltaY:N.deltaY};switch(fe){case 1:Ne.deltaY*=16;break;case 2:Ne.deltaY*=100;break}return N.ctrlKey&&!E&&(Ne.deltaY*=10),Ne}function ye(N){N.key==="Control"&&(E=!0,document.addEventListener("keyup",be,{passive:!0,capture:!0}))}function be(N){N.key==="Control"&&(E=!1,document.removeEventListener("keyup",be,{passive:!0,capture:!0}))}function Le(N){i.enabled===!1||i.enablePan===!1||me(N)}function Oe(N){switch(De(N),T.length){case 1:switch(i.touches.ONE){case Fr.ROTATE:if(i.enableRotate===!1)return;Me(N),s=r.TOUCH_ROTATE;break;case Fr.PAN:if(i.enablePan===!1)return;ge(N),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case Fr.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;D(N),s=r.TOUCH_DOLLY_PAN;break;case Fr.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;ue(N),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Cu)}function le(N){switch(De(N),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;X(N),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;se(N),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Te(N),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;ve(N),i.update();break;default:s=r.NONE}}function Ge(N){i.enabled!==!1&&N.preventDefault()}function He(N){T.push(N.pointerId)}function ke(N){delete O[N.pointerId];for(let fe=0;fe<T.length;fe++)if(T[fe]==N.pointerId){T.splice(fe,1);return}}function De(N){let fe=O[N.pointerId];fe===void 0&&(fe=new de,O[N.pointerId]=fe),fe.set(N.pageX,N.pageY)}function _e(N){const fe=N.pointerId===T[0]?T[1]:T[0];return O[fe]}i.domElement.addEventListener("contextmenu",Ge),i.domElement.addEventListener("pointerdown",A),i.domElement.addEventListener("pointercancel",H),i.domElement.addEventListener("wheel",oe,{passive:!1}),document.addEventListener("keydown",ye,{passive:!0,capture:!0}),this.update()}}const l2=({cameraMatrix:t,onSelectView:e,theme:n})=>{const i=n==="blueprint",[r,s,o,,a,l,c,,u,f,h,,]=t.length===16?t:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],v=`matrix3d(${[r,a,u,0,-s,-l,-f,0,o,c,h,0,0,0,0,1].join(",")})`,y=`absolute w-[68px] h-[68px] flex flex-col items-center justify-center font-mono font-bold text-[10px] tracking-wider border transition-all cursor-pointer select-none backface-visible ${i?"bg-slate-900/90 hover:bg-sky-500 hover:text-slate-950 text-slate-300 border-sky-500/40 shadow-[inset_0_0_10px_rgba(56,189,248,0.15)]":"bg-white/95 hover:bg-blue-600 hover:text-white text-slate-700 border-slate-300 shadow-sm"}`,m=34;return g.jsxs("div",{className:"relative flex flex-col items-center",children:[g.jsx("button",{onClick:()=>e("isometric"),title:"Isometric Home Orientation",className:`absolute -top-7 -left-1 p-1 rounded-md border text-xs transition-all z-20 ${i?"bg-slate-900/80 border-slate-700 text-sky-400 hover:bg-slate-800 hover:text-white":"bg-white/90 border-slate-300 text-blue-600 hover:bg-slate-100"}`,children:g.jsx(Yy,{className:"w-3.5 h-3.5"})}),g.jsx("div",{className:"w-24 h-24 flex items-center justify-center",style:{perspective:"400px"},children:g.jsxs("div",{className:"relative w-[68px] h-[68px] transition-transform duration-75",style:{transformStyle:"preserve-3d",transform:v},children:[g.jsxs("div",{onClick:()=>e("front"),className:y,style:{transform:`translateZ(${m}px)`},children:[g.jsx("span",{children:"FRONT"}),g.jsx("span",{className:"text-[8px] opacity-70",children:"V.P."})]}),g.jsx("div",{onClick:()=>e("back"),className:y,style:{transform:`rotateY(180deg) translateZ(${m}px)`},children:g.jsx("span",{children:"BACK"})}),g.jsxs("div",{onClick:()=>e("top"),className:y,style:{transform:`rotateX(90deg) translateZ(${m}px)`},children:[g.jsx("span",{children:"TOP"}),g.jsx("span",{className:"text-[8px] opacity-70",children:"H.P."})]}),g.jsx("div",{onClick:()=>e("bottom"),className:y,style:{transform:`rotateX(-90deg) translateZ(${m}px)`},children:g.jsx("span",{children:"BOTTOM"})}),g.jsx("div",{onClick:()=>e("right"),className:y,style:{transform:`rotateY(90deg) translateZ(${m}px)`},children:g.jsx("span",{children:"RIGHT"})}),g.jsxs("div",{onClick:()=>e("left"),className:y,style:{transform:`rotateY(-90deg) translateZ(${m}px)`},children:[g.jsx("span",{children:"LEFT"}),g.jsx("span",{className:"text-[8px] opacity-70",children:"R.P.P."})]})]})}),g.jsx("div",{className:"text-[9px] font-mono tracking-widest uppercase text-slate-400 -mt-1",children:"CAD VIEWCUBE"})]})},c2=({geometry:t,dimensions:e,rotation:n,theme:i,displayOptions:r,onResetRotation:s,onUpdateDisplayOptions:o})=>{const a=Ze.useRef(null),l=Ze.useRef(null),c=Ze.useRef(null),u=Ze.useRef(null),[f,h]=Ze.useState("isometric"),[p,v]=Ze.useState(!1),[y,m]=Ze.useState([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),d=i==="blueprint";Ze.useEffect(()=>{if(!p)return;const x=setInterval(()=>{o({...r,unfoldProgress:(r.unfoldProgress+2)%102})},40);return()=>clearInterval(x)},[p,r,o]),Ze.useEffect(()=>{const x=a.current,S=l.current;if(!x||!S)return;const P=new Vh({canvas:S,antialias:!0,alpha:!0,powerPreference:"high-performance"});P.setPixelRatio(Math.min(window.devicePixelRatio,2)),P.setSize(x.clientWidth,x.clientHeight),P.shadowMap.enabled=!0,P.shadowMap.type=fx,P.toneMapping=mx,P.toneMappingExposure=d?1.15:1.05;const w=new Wx;w.background=new Ye(d?461588:15594231);const T=new Tn(42,x.clientWidth/x.clientHeight,.1,2500),O=185;T.position.set(O,O*.85,O*1.15),T.lookAt(0,0,0),u.current=T;const E=new a2(T,S);E.enableDamping=!0,E.dampingFactor=.05,E.maxDistance=750,E.minDistance=50,E.target.set(0,0,0),c.current=E;const b=new tv(d?9741240:16777215,d?.8:.95);w.add(b);const B=new uo(16775917,d?1.6:1.3);B.position.set(160,240,180),B.castShadow=!0,B.shadow.mapSize.width=2048,B.shadow.mapSize.height=2048,B.shadow.bias=-1e-4,w.add(B);const q=new uo(d?3718648:9684477,d?.9:.6);q.position.set(-180,120,-140),w.add(q);const re=new uo(d?16096779:16639626,d?.8:.5);re.position.set(0,-120,-220),w.add(re);const U=new uo(16777215,.5);U.position.set(0,300,0),w.add(U);const V=Math.max(e.height,e.width,e.length),$=-V*.78,ne=new t2(240,24,d?3718648:2450411,d?1976635:13358561);ne.position.y=$,ne.visible=r.show3DGrid,w.add(ne);const F=document.createElement("canvas");F.width=128,F.height=128;const G=F.getContext("2d");if(G){const _e=G.createRadialGradient(64,64,10,64,64,64);_e.addColorStop(0,d?"rgba(0, 0, 0, 0.75)":"rgba(15, 23, 42, 0.5)"),_e.addColorStop(.5,d?"rgba(0, 0, 0, 0.35)":"rgba(15, 23, 42, 0.2)"),_e.addColorStop(1,"rgba(0, 0, 0, 0)"),G.fillStyle=_e,G.fillRect(0,0,128,128)}const C=new yT(F),R=new gr(V*1.8,V*1.8),j=new dc({map:C,transparent:!0,opacity:.85,depthWrite:!1}),z=new Qt(R,j);z.rotation.x=-Math.PI/2,z.position.y=$+.5,w.add(z);const Y=new i2(70);Y.visible=r.show3DAxes,Y.position.set(-75,$+2,-75),w.add(Y);const Q=140,ie=r.unfoldProgress/100,J=new Kn;J.visible=r.show3DPlanes;const me=new Qa({color:3718648,transparent:!0,opacity:d?.18:.12,roughness:.1,transmission:.85,thickness:1.5,side:An,depthWrite:!1}),Me=new gr(Q,Q),ge=new Qt(Me,me);ge.position.set(0,0,-Q/2),J.add(ge);const Ee=new Jn(new co(Me),new Qn({color:3718648,linewidth:2}));Ee.position.copy(ge.position),J.add(Ee);const D=new Qa({color:1096065,transparent:!0,opacity:d?.18:.12,roughness:.1,transmission:.85,thickness:1.5,side:An,depthWrite:!1}),ue=new gr(Q,Q),X=new Kn;X.position.set(0,-Q/2,-Q/2);const se=new Qt(ue,D);se.rotation.x=Math.PI/2,se.position.set(0,0,Q/2),X.add(se);const te=new Jn(new co(ue),new Qn({color:1096065,linewidth:2}));te.position.copy(se.position),te.rotation.copy(se.rotation),X.add(te),X.rotation.x=ie*(Math.PI/2),J.add(X);const Te=new Qa({color:16096779,transparent:!0,opacity:d?.18:.12,roughness:.1,transmission:.85,thickness:1.5,side:An,depthWrite:!1}),ve=new gr(Q,Q),A=new Kn;A.position.set(Q/2,0,-Q/2);const M=new Qt(ve,Te);M.rotation.y=Math.PI/2,M.position.set(0,0,Q/2),A.add(M);const H=new Jn(new co(ve),new Qn({color:16096779,linewidth:2}));H.position.copy(M.position),H.rotation.copy(M.rotation),A.add(H),A.rotation.y=ie*(Math.PI/2),J.add(A),w.add(J);const ce=new Kn;ce.visible=r.showSightArrows;const ae=(_e,N,fe)=>{const Ne=new n2(N,_e,45,fe,12,7);ce.add(Ne)};ae(new I(0,0,V+55),new I(0,0,-1),3718648),ae(new I(0,V+55,0),new I(0,-1,0),1096065),ae(new I(-V-55,0,0),new I(1,0,0),16096779),w.add(ce);const oe=new Kn;oe.rotation.set(Mr.degToRad(n.x),Mr.degToRad(n.y),Mr.degToRad(n.z),"XYZ"),w.add(oe);let Ae;r.renderStyle==="aluminum"?Ae=new vs({color:d?13161952:14870768,metalness:.9,roughness:.22,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}):r.renderStyle==="steel"?Ae=new vs({color:d?6583435:9741240,metalness:.85,roughness:.32,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}):r.renderStyle==="anodized"?Ae=new vs({color:d?165063:223649,metalness:.75,roughness:.25,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}):r.renderStyle==="glass"?Ae=new Qa({color:d?3718648:165063,metalness:.05,roughness:.1,transmission:.85,thickness:2.5,transparent:!0,opacity:.7,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}):Ae=new vs({color:d?1976635:15857145,metalness:.15,roughness:.38,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1});const ye=new Qt(t,Ae);ye.castShadow=!0,ye.receiveShadow=!0,oe.add(ye);const be=new co(t,24),Le=new Qn({color:d?3718648:988970,linewidth:2}),Oe=new Jn(be,Le);if(oe.add(Oe),r.showHiddenLines){const _e=be.clone(),N=new Fd({color:d?16096779:9741240,dashSize:3,gapSize:2,depthFunc:Uh,depthWrite:!1}),fe=new Jn(_e,N);fe.computeLineDistances(),oe.add(fe)}let le,Ge=0;const He=_e=>{le=requestAnimationFrame(He),E.update(),P.render(w,T),_e-Ge>30&&(m(Array.from(T.matrixWorldInverse.elements)),Ge=_e)};He(0);const ke=()=>{if(!x)return;const _e=x.clientWidth,N=x.clientHeight;_e===0||N===0||(T.aspect=_e/N,T.updateProjectionMatrix(),P.setSize(_e,N))},De=new ResizeObserver(()=>ke());return De.observe(x),()=>{De.disconnect(),cancelAnimationFrame(le),P.dispose(),Ae.dispose(),Le.dispose(),be.dispose(),me.dispose(),D.dispose(),Te.dispose(),j.dispose(),R.dispose(),C.dispose(),E.dispose()}},[t,e,n,i,r,d]);const _=x=>{const S=c.current,P=u.current;if(!S||!P)return;const w=190;switch(x){case"isometric":P.position.set(w*.9,w*.85,w*1.15),P.up.set(0,1,0),h("isometric");break;case"front":P.position.set(0,0,w*1.35),P.up.set(0,1,0),h("front");break;case"top":P.position.set(0,w*1.35,0),P.up.set(0,0,-1),h("top");break;case"side":case"left":P.position.set(-w*1.35,0,0),P.up.set(0,1,0),h("side");break;case"right":P.position.set(w*1.35,0,0),P.up.set(0,1,0),h("free");break;case"back":P.position.set(0,0,-w*1.35),P.up.set(0,1,0),h("free");break;case"bottom":P.position.set(0,-w*1.35,0),P.up.set(0,0,1),h("free");break;case"reset":P.position.set(w*.9,w*.85,w*1.15),P.up.set(0,1,0),s(),h("isometric");break}S.target.set(0,0,0),S.update()};return g.jsxs("div",{ref:a,className:`relative w-full h-full select-none overflow-hidden ${d?"bg-[#070b14]":"bg-[#edf2f7]"}`,children:[g.jsx("canvas",{ref:l,className:"w-full h-full block cursor-grab active:cursor-grabbing"}),g.jsx("div",{className:"absolute top-3 left-4 z-10 flex items-center gap-2",children:g.jsxs("div",{className:`px-3 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-mono font-semibold backdrop-blur shadow-lg ${d?"bg-slate-900/90 text-sky-400 border-sky-500/30 shadow-[0_0_15px_rgba(56,189,248,0.15)]":"bg-white/95 text-slate-800 border-slate-300"}`,children:[g.jsx(So,{className:"w-4 h-4 text-sky-400"}),g.jsx("span",{children:"3D SPACE (FIRST QUADRANT)"})]})}),g.jsx("div",{className:"absolute top-3 right-4 z-20",children:g.jsx(l2,{cameraMatrix:y,onSelectView:x=>{x==="isometric"?_("isometric"):x==="front"?_("front"):x==="top"?_("top"):x==="left"?_("left"):x==="right"?_("right"):x==="back"?_("back"):x==="bottom"&&_("bottom")},theme:i})}),g.jsxs("div",{className:"absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 p-1 rounded-lg border backdrop-blur bg-slate-900/85 border-slate-700/80 text-white shadow-xl",children:[g.jsxs("button",{onClick:()=>_("isometric"),title:"Isometric View (Standard 30° CAD perspective)",className:`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 transition-all ${f==="isometric"?"bg-sky-500 text-slate-950 font-bold shadow":"hover:bg-slate-800 text-slate-300"}`,children:[g.jsx(cx,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:"Iso"})]}),g.jsx("button",{onClick:()=>_("front"),title:"Direct Front View (Look along +Z onto VP)",className:`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 transition-all ${f==="front"?"bg-sky-500 text-slate-950 font-bold shadow":"hover:bg-slate-800 text-slate-300"}`,children:g.jsx("span",{className:"text-sky-400 font-bold",children:"FV"})}),g.jsx("button",{onClick:()=>_("top"),title:"Direct Top View (Look down +Y onto HP)",className:`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 transition-all ${f==="top"?"bg-sky-500 text-slate-950 font-bold shadow":"hover:bg-slate-800 text-slate-300"}`,children:g.jsx("span",{className:"text-emerald-400 font-bold",children:"TV"})}),g.jsx("button",{onClick:()=>_("side"),title:"Direct Left Side View (Look from -X onto RPP)",className:`px-2 py-1 text-xs font-mono rounded flex items-center gap-1 transition-all ${f==="side"?"bg-sky-500 text-slate-950 font-bold shadow":"hover:bg-slate-800 text-slate-300"}`,children:g.jsx("span",{className:"text-amber-400 font-bold",children:"LHSV"})}),g.jsx("div",{className:"w-[1px] h-4 bg-slate-700 mx-1"}),g.jsxs("button",{onClick:()=>_("reset"),title:"Reset Camera & Orientation",className:"px-2 py-1 text-xs font-mono rounded hover:bg-slate-800 text-slate-300 flex items-center gap-1 transition-all",children:[g.jsx(Dh,{className:"w-3.5 h-3.5 text-amber-400"}),g.jsx("span",{children:"Reset"})]})]}),g.jsxs("div",{className:`absolute bottom-14 left-4 right-4 z-10 p-3 rounded-xl border backdrop-blur flex items-center justify-between gap-4 shadow-xl transition-all ${d?"bg-slate-950/85 border-sky-800/60 text-slate-200":"bg-white/95 border-slate-300 text-slate-800"}`,children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsxs("button",{onClick:()=>v(!p),className:`p-2 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition-all ${p?"bg-amber-500 text-slate-950":"bg-sky-500 hover:bg-sky-400 text-slate-950"}`,children:[p?g.jsx(qy,{className:"w-3.5 h-3.5"}):g.jsx(Zy,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:p?"Pause":"Unfold Planes"})]}),g.jsxs("div",{className:"hidden sm:flex flex-col",children:[g.jsxs("span",{className:"text-xs font-mono font-bold text-sky-400 flex items-center gap-1",children:[g.jsx(ux,{className:"w-3.5 h-3.5"}),"GLASS BOX ROTATION (HP & RPP)"]}),g.jsx("span",{className:"text-[10px] text-slate-400",children:"Visual proof of why Top View is below FV & LHSV is on the right"})]})]}),g.jsxs("div",{className:"flex items-center gap-3 flex-1 max-w-xs",children:[g.jsx("span",{className:"text-[11px] font-mono font-bold text-slate-400",children:"3D Box"}),g.jsx("input",{type:"range",min:"0",max:"100",value:r.unfoldProgress,onChange:x=>{v(!1),o({...r,show3DPlanes:!0,unfoldProgress:Number(x.target.value)})},className:"w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"}),g.jsx("span",{className:"text-[11px] font-mono font-bold text-amber-400",children:"2D Sheet"}),g.jsxs("span",{className:"text-xs font-mono font-bold w-10 text-right text-sky-400",children:[r.unfoldProgress,"%"]})]})]}),g.jsxs("div",{className:`absolute bottom-3 left-4 z-10 px-3 py-1.5 rounded-lg border text-[11px] font-mono backdrop-blur flex items-center gap-3 ${d?"bg-slate-900/80 border-slate-800 text-slate-300":"bg-white/90 border-slate-300 text-slate-700 shadow-sm"}`,children:[g.jsxs("div",{className:"flex items-center gap-1",children:[g.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-red-500 inline-block"}),g.jsx("span",{className:"font-bold",children:"X (Length)"})]}),g.jsxs("div",{className:"flex items-center gap-1",children:[g.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"}),g.jsx("span",{className:"font-bold",children:"Y (Height)"})]}),g.jsxs("div",{className:"flex items-center gap-1",children:[g.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"}),g.jsx("span",{className:"font-bold",children:"Z (Width)"})]})]}),g.jsxs("div",{className:`absolute bottom-3 right-4 z-10 px-3 py-1.5 rounded-lg border text-[11px] font-mono backdrop-blur ${d?"bg-slate-900/80 border-slate-800 text-slate-400":"bg-white/90 border-slate-300 text-slate-600 shadow-sm"}`,children:[g.jsx("span",{children:"Orientation: "}),g.jsxs("span",{className:"text-sky-400 font-bold",children:["θx ",n.x,"°"]})," •"," ",g.jsxs("span",{className:"text-emerald-400 font-bold",children:["θy ",n.y,"°"]})," •"," ",g.jsxs("span",{className:"text-amber-400 font-bold",children:["θz ",n.z,"°"]})]})]})},Ru=({viewType:t,geometry:e,dimensions:n,rotation:i,theme:r,showHiddenLines:s,showDimensions:o,showCenterLines:a,label:l,sublabel:c,planeName:u,quadrant:f,dimensionsSummary:h,onCanvasReady:p})=>{const v=Ze.useRef(null),y=Ze.useRef(null);Ze.useEffect(()=>{const d=v.current,_=y.current;if(!d||!_)return;p&&p(t,_);const x=r==="blueprint",S=x?791074:16317180,P=x?1120814:16777215,w=x?3718648:988970,T=x?16096779:6583435,O=new Vh({canvas:_,antialias:!0,alpha:!1,preserveDrawingBuffer:!0});O.setPixelRatio(Math.min(window.devicePixelRatio,2)),O.setSize(d.clientWidth,d.clientHeight),O.setClearColor(S,1);const E=new Wx,b=new tv(16777215,x?.9:1);E.add(b);const B=new uo(16777215,x?.4:.2);B.position.set(50,100,100),E.add(B);const q=new Kn;q.rotation.set(Mr.degToRad(i.x),Mr.degToRad(i.y),Mr.degToRad(i.z),"XYZ"),E.add(q);const re=new vs({color:P,roughness:.6,metalness:.1,polygonOffset:!0,polygonOffsetFactor:1.5,polygonOffsetUnits:1.5,depthTest:!0,depthWrite:!0}),U=new Qt(e,re);U.renderOrder=0,q.add(U);const V=new co(e,20),$=new Qn({color:w,linewidth:2,depthTest:!0,depthWrite:!0,depthFunc:Xo}),ne=new Jn(V,$);if(ne.renderOrder=1,q.add(ne),s){const Q=V.clone(),ie=new Fd({color:T,dashSize:2.2,gapSize:1.5,scale:1,depthTest:!0,depthWrite:!1,depthFunc:Uh}),J=new Jn(Q,ie);J.computeLineDistances(),J.renderOrder=2,q.add(J)}if(a){const Q=new Fd({color:x?15680580:14427686,dashSize:6,gapSize:2,scale:1}),ie=new $t().setFromPoints([new I(0,-60,0),new I(0,60,0),new I(-60,0,0),new I(60,0,0)]),J=new Jn(ie,Q);J.computeLineDistances(),q.add(J)}const F=135,G=d.clientWidth/d.clientHeight;let C;const R=300;t==="front"?(C=new wo(-F*G/2,F*G/2,F/2,-F/2,1,1e3),C.position.set(0,0,R),C.up.set(0,1,0),C.lookAt(0,0,0)):t==="top"?(C=new wo(-F*G/2,F*G/2,F/2,-F/2,1,1e3),C.position.set(0,R,0),C.up.set(0,0,-1),C.lookAt(0,0,0)):(C=new wo(F*G/2,-F*G/2,F/2,-F/2,1,1e3),C.position.set(-R,0,0),C.up.set(0,1,0),C.lookAt(0,0,0)),C.updateProjectionMatrix();const j=()=>{O.render(E,C)};j();const z=()=>{if(!d)return;const Q=d.clientWidth,ie=d.clientHeight;if(Q===0||ie===0)return;const J=Q/ie;t==="leftSide"?(C.left=F*J/2,C.right=-F*J/2):(C.left=-F*J/2,C.right=F*J/2),C.top=F/2,C.bottom=-F/2,C.updateProjectionMatrix(),O.setSize(Q,ie),j()},Y=new ResizeObserver(()=>z());return Y.observe(d),()=>{Y.disconnect(),O.dispose(),re.dispose(),$.dispose(),V.dispose()}},[t,e,n,i,r,s,a,p]);const m=r==="blueprint";return g.jsxs("div",{ref:v,className:`relative w-full h-full overflow-hidden transition-colors duration-200 ${m?"bg-[#0c1222]":"bg-[#f8fafc]"}`,children:[g.jsx("div",{className:"absolute inset-0 pointer-events-none opacity-40",style:{backgroundImage:m?`radial-gradient(circle, rgba(56, 189, 248, 0.15) 1px, transparent 1px),
               linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px)`:`radial-gradient(circle, rgba(100, 116, 139, 0.2) 1px, transparent 1px),
               linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px)`,backgroundSize:"16px 16px"}}),g.jsx("canvas",{ref:y,className:"w-full h-full block relative z-0"}),g.jsxs("div",{className:"absolute top-2 left-3 z-10 pointer-events-none flex flex-col",children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("span",{className:`text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded border ${m?"bg-sky-950/80 text-sky-300 border-sky-800/80 shadow-[0_0_10px_rgba(56,189,248,0.2)]":"bg-slate-100 text-slate-800 border-slate-300"}`,children:l}),g.jsx("span",{className:`text-[10px] font-mono px-1.5 py-0.5 rounded ${m?"bg-slate-800/80 text-slate-400":"bg-slate-200/80 text-slate-600"}`,children:u})]}),g.jsxs("span",{className:`text-[10px] font-mono mt-0.5 ${m?"text-slate-400":"text-slate-500"}`,children:[c," • ",h]})]}),o&&g.jsxs("div",{className:"absolute inset-0 pointer-events-none z-10 flex items-center justify-center",children:[t==="front"&&g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"absolute bottom-6 flex items-center gap-1 font-mono text-[10px] text-red-400 font-bold",children:[g.jsx("span",{className:"w-2 h-[1px] bg-red-400"}),g.jsxs("span",{children:["◄── L = ",n.length," mm ──►"]}),g.jsx("span",{className:"w-2 h-[1px] bg-red-400"})]}),g.jsx("div",{className:"absolute right-6 flex flex-col items-center gap-1 font-mono text-[10px] text-emerald-400 font-bold rotate-90",children:g.jsxs("span",{children:["◄── H = ",n.height," mm ──►"]})})]}),t==="top"&&g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"absolute bottom-6 flex items-center gap-1 font-mono text-[10px] text-red-400 font-bold",children:g.jsxs("span",{children:["◄── L = ",n.length," mm ──►"]})}),g.jsx("div",{className:"absolute left-6 flex flex-col items-center gap-1 font-mono text-[10px] text-blue-400 font-bold -rotate-90",children:g.jsxs("span",{children:["◄── W = ",n.width," mm ──►"]})})]}),t==="leftSide"&&g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"absolute bottom-6 flex items-center gap-1 font-mono text-[10px] text-blue-400 font-bold",children:g.jsxs("span",{children:["◄── W = ",n.width," mm ──►"]})}),g.jsx("div",{className:"absolute right-6 flex flex-col items-center gap-1 font-mono text-[10px] text-emerald-400 font-bold rotate-90",children:g.jsxs("span",{children:["◄── H = ",n.height," mm ──►"]})})]})]}),g.jsxs("div",{className:"absolute inset-0 pointer-events-none flex items-center justify-center",children:[g.jsx("div",{className:`w-4 h-[1px] ${m?"bg-sky-500/30":"bg-slate-400/40"}`}),g.jsx("div",{className:`h-4 w-[1px] absolute ${m?"bg-sky-500/30":"bg-slate-400/40"}`})]}),g.jsx("div",{className:"absolute bottom-2 right-3 pointer-events-none",children:g.jsx("span",{className:`text-[9px] font-mono tracking-widest uppercase ${m?"text-slate-500":"text-slate-400"}`,children:f})})]})},u2=({solidName:t,dimensions:e,theme:n})=>{const i=n==="blueprint";return g.jsx("div",{className:`border text-[10px] font-mono select-none rounded p-2.5 transition-colors ${i?"bg-[#0f172a]/95 border-sky-800/80 text-slate-300 shadow-xl":"bg-white border-slate-400 text-slate-800 shadow-md"}`,children:g.jsxs("div",{className:"grid grid-cols-12 gap-2",children:[g.jsxs("div",{className:"col-span-8 flex flex-col justify-between border-r pr-2 border-slate-700/60",children:[g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center justify-between border-b pb-1 border-slate-700/40",children:[g.jsx("span",{className:`font-bold tracking-wider text-[11px] uppercase ${i?"text-sky-400":"text-blue-700"}`,children:"DEPT. OF MECHANICAL ENGINEERING • CAD LAB"}),g.jsx("span",{className:`text-[8px] px-1 py-0.2 rounded border font-bold ${i?"border-sky-500/40 text-sky-300 bg-sky-950/60":"border-slate-300 text-slate-600 bg-slate-100"}`,children:"ISO 128 / BIS SP:46:2003"})]}),g.jsxs("div",{className:"mt-1 flex items-baseline justify-between",children:[g.jsxs("div",{children:[g.jsx("span",{className:"text-[9px] text-slate-400",children:"PART: "}),g.jsx("span",{className:"text-xs font-bold text-slate-100 uppercase",children:t})]}),g.jsxs("div",{className:"text-[9px] text-slate-400",children:["DRG NO: ",g.jsx("span",{className:"font-bold text-sky-400",children:"OV3D-EG-101"})]})]}),g.jsxs("div",{className:"text-[9px] text-slate-400 mt-0.5",children:["Dimensions: ",g.jsxs("span",{className:"text-sky-300 font-bold",children:[e.length," × ",e.width," × ",e.height," mm"]})," • Scale: ",g.jsx("span",{className:"font-bold text-amber-400",children:"1:1"})]})]}),g.jsxs("div",{className:"mt-1.5 pt-1 border-t border-slate-700/40 grid grid-cols-2 gap-1 text-[8px] text-slate-400",children:[g.jsxs("div",{children:[g.jsx("span",{children:"TOLERANCES: "}),g.jsx("span",{className:"text-slate-300 font-semibold",children:"LINEAR ±0.1 mm, ANGULAR ±0.5°"})]}),g.jsxs("div",{children:[g.jsx("span",{children:"SURFACE FINISH: "}),g.jsx("span",{className:"text-slate-300 font-semibold",children:"Ra 1.6 μm (N7 MACHINED)"})]})]})]}),g.jsxs("div",{className:"col-span-4 flex flex-col items-center justify-center pl-1",children:[g.jsx("div",{className:"text-[8px] font-bold tracking-wider uppercase mb-0.5 text-slate-400",children:"PROJECTION METHOD"}),g.jsx("div",{className:"flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-black/30 border border-slate-800",children:g.jsxs("svg",{width:"80",height:"36",viewBox:"0 0 80 36",className:i?"stroke-sky-400":"stroke-slate-900",fill:"none",strokeWidth:"1.5",children:[g.jsx("line",{x1:"2",y1:"18",x2:"78",y2:"18",stroke:i?"#64748b":"#94a3b8",strokeWidth:"1",strokeDasharray:"5 2 1 2"}),g.jsx("line",{x1:"62",y1:"3",x2:"62",y2:"33",stroke:i?"#64748b":"#94a3b8",strokeWidth:"1",strokeDasharray:"5 2 1 2"}),g.jsx("polygon",{points:"10,12 30,6 30,30 10,24",fill:i?"rgba(56, 189, 248, 0.1)":"rgba(15, 23, 42, 0.05)"}),g.jsx("circle",{cx:"62",cy:"18",r:"12"}),g.jsx("circle",{cx:"62",cy:"18",r:"6"})]})}),g.jsx("div",{className:`text-[8px] font-bold tracking-widest mt-1 uppercase ${i?"text-amber-400":"text-amber-700"}`,children:"FIRST ANGLE PROJECTION"})]})]})})},d2=({geometry:t,dimensions:e,rotation:n,theme:i,displayOptions:r,solidName:s,onCanvasesReady:o})=>{const a=i==="blueprint",l=Ze.useRef(null),c=Ze.useRef(null),u=Ze.useRef(null),f=(h,p)=>{h==="front"&&(l.current=p),h==="top"&&(c.current=p),h==="leftSide"&&(u.current=p),o&&o({front:l.current,top:c.current,leftSide:u.current})};return g.jsx("div",{id:"orthographic-sheet-container",className:`relative w-full h-full p-3 flex flex-col select-none transition-colors duration-200 ${a?"bg-[#060a12]":"bg-[#e2e8f0]"}`,children:g.jsxs("div",{className:`relative flex-1 rounded-xl border-2 overflow-hidden flex flex-col shadow-2xl transition-colors duration-200 ${a?"bg-[#0b101d] border-sky-600/50 shadow-[0_0_35px_rgba(11,16,29,0.9)]":"bg-[#f8fafc] border-slate-500 shadow-xl"}`,children:[g.jsx("div",{className:`h-5 border-b grid grid-cols-8 text-[9px] font-mono font-bold items-center text-center ${a?"bg-[#0e1628] border-slate-800 text-slate-500":"bg-slate-200 border-slate-300 text-slate-600"}`,children:["1","2","3","4","5","6","7","8"].map(h=>g.jsx("div",{className:"border-r border-slate-800/40 last:border-r-0",children:h},h))}),g.jsxs("div",{className:"relative flex-1 flex overflow-hidden",children:[g.jsx("div",{className:`w-5 border-r flex flex-col justify-around text-[9px] font-mono font-bold items-center text-center ${a?"bg-[#0e1628] border-slate-800 text-slate-500":"bg-slate-200 border-slate-300 text-slate-600"}`,children:["A","B","C","D"].map(h=>g.jsx("span",{children:h},h))}),g.jsxs("div",{className:"relative flex-1 grid grid-cols-2 grid-rows-2",children:[g.jsx("div",{className:"relative border-r border-b border-dashed border-slate-600/30 overflow-hidden",children:g.jsx(Ru,{viewType:"front",geometry:t,dimensions:e,rotation:n,theme:i,showHiddenLines:r.showHiddenLines,showDimensions:r.showDimensions,showCenterLines:r.showCenterLines,label:"FRONT VIEW (FV)",sublabel:"ELEVATION",planeName:"V.P.",quadrant:"Quadrant 1",dimensionsSummary:`L: ${e.length}mm × H: ${e.height}mm`,onCanvasReady:f})}),g.jsx("div",{className:"relative border-b border-dashed border-slate-600/30 overflow-hidden",children:g.jsx(Ru,{viewType:"leftSide",geometry:t,dimensions:e,rotation:n,theme:i,showHiddenLines:r.showHiddenLines,showDimensions:r.showDimensions,showCenterLines:r.showCenterLines,label:"LEFT SIDE VIEW (LHSV)",sublabel:"PROFILE VIEW",planeName:"R.P.P.",quadrant:"Quadrant 2",dimensionsSummary:`W: ${e.width}mm × H: ${e.height}mm`,onCanvasReady:f})}),g.jsx("div",{className:"relative border-r border-dashed border-slate-600/30 overflow-hidden",children:g.jsx(Ru,{viewType:"top",geometry:t,dimensions:e,rotation:n,theme:i,showHiddenLines:r.showHiddenLines,showDimensions:r.showDimensions,showCenterLines:r.showCenterLines,label:"TOP VIEW (TV)",sublabel:"PLAN",planeName:"H.P.",quadrant:"Quadrant 3",dimensionsSummary:`L: ${e.length}mm × W: ${e.width}mm`,onCanvasReady:f})}),g.jsxs("div",{className:`relative p-3 flex flex-col justify-between overflow-hidden ${a?"bg-[#0d1424]":"bg-[#f1f5f9]"}`,children:[g.jsx("div",{className:"relative flex-1 flex flex-col items-center justify-center p-1",children:g.jsx("svg",{className:"w-full h-full max-h-[140px]",viewBox:"0 0 220 120",preserveAspectRatio:"xMidYMid meet",children:r.showMiterLine&&g.jsx(g.Fragment,{children:r.transferMethod==="miter"?g.jsxs("g",{children:[g.jsx("line",{x1:"10",y1:"10",x2:"160",y2:"110",stroke:a?"#38bdf8":"#2563eb",strokeWidth:"1.5",strokeDasharray:"4 3"}),g.jsx("text",{x:"95",y:"62",fill:a?"#38bdf8":"#2563eb",fontSize:"9",fontFamily:"monospace",fontWeight:"bold",children:"45° MITER LINE"}),r.showProjectors&&g.jsxs("g",{stroke:a?"rgba(56, 189, 248, 0.45)":"rgba(37, 99, 235, 0.4)",strokeWidth:"1",strokeDasharray:"2 2",children:[g.jsx("line",{x1:"10",y1:"45",x2:"60",y2:"45"}),g.jsx("line",{x1:"60",y1:"45",x2:"60",y2:"5"}),g.jsx("line",{x1:"10",y1:"85",x2:"116",y2:"85"}),g.jsx("line",{x1:"116",y1:"85",x2:"116",y2:"5"})]})]}):g.jsxs("g",{children:[g.jsx("path",{d:"M 10,50 A 45,45 0 0,0 55,5",fill:"none",stroke:a?"#38bdf8":"#2563eb",strokeWidth:"1.5",strokeDasharray:"4 3"}),g.jsx("path",{d:"M 10,90 A 85,85 0 0,0 95,5",fill:"none",stroke:a?"#38bdf8":"#2563eb",strokeWidth:"1.5",strokeDasharray:"4 3"}),g.jsx("text",{x:"70",y:"55",fill:a?"#38bdf8":"#2563eb",fontSize:"9",fontFamily:"monospace",fontWeight:"bold",children:"COMPASS ARCS"})]})})})}),g.jsx("div",{className:"w-full mt-auto",children:g.jsx(u2,{solidName:s,dimensions:e,theme:i})})]}),r.showProjectors&&g.jsxs("svg",{className:"absolute inset-0 w-full h-full pointer-events-none z-20",xmlns:"http://www.w3.org/2000/svg",children:[g.jsx("line",{x1:"28%",y1:"18%",x2:"28%",y2:"82%",stroke:a?"#38bdf8":"#3b82f6",strokeWidth:"1",strokeDasharray:"3 3",opacity:a?.35:.45}),g.jsx("line",{x1:"38%",y1:"18%",x2:"38%",y2:"82%",stroke:a?"#38bdf8":"#3b82f6",strokeWidth:"1",strokeDasharray:"3 3",opacity:a?.35:.45}),g.jsx("line",{x1:"15%",y1:"22%",x2:"85%",y2:"22%",stroke:a?"#38bdf8":"#3b82f6",strokeWidth:"1",strokeDasharray:"3 3",opacity:a?.35:.45}),g.jsx("line",{x1:"15%",y1:"36%",x2:"85%",y2:"36%",stroke:a?"#38bdf8":"#3b82f6",strokeWidth:"1",strokeDasharray:"3 3",opacity:a?.35:.45})]}),g.jsxs("div",{className:"absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-30 flex items-center",children:[g.jsx("div",{className:`absolute left-2 -top-6 px-1.5 py-0.5 rounded font-mono font-bold text-xs ${a?"bg-sky-950 text-sky-400 border border-sky-800":"bg-white text-slate-800 border border-slate-300"}`,children:"X"}),g.jsx("div",{className:`w-full h-[2px] ${a?"bg-sky-500/80 shadow-[0_0_8px_rgba(56,189,248,0.5)]":"bg-slate-700"}`}),g.jsx("div",{className:`absolute right-2 -top-6 px-1.5 py-0.5 rounded font-mono font-bold text-xs ${a?"bg-sky-950 text-sky-400 border border-sky-800":"bg-white text-slate-800 border border-slate-300"}`,children:"Y"})]}),g.jsxs("div",{className:"absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-30 flex justify-center",children:[g.jsx("div",{className:`absolute top-2 -left-8 px-1.5 py-0.5 rounded font-mono font-bold text-xs ${a?"bg-amber-950 text-amber-400 border border-amber-800":"bg-white text-slate-800 border border-slate-300"}`,children:"X₁"}),g.jsx("div",{className:`h-full w-[2px] ${a?"bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]":"bg-slate-700"}`}),g.jsx("div",{className:`absolute bottom-2 -left-8 px-1.5 py-0.5 rounded font-mono font-bold text-xs ${a?"bg-amber-950 text-amber-400 border border-amber-800":"bg-white text-slate-800 border border-slate-300"}`,children:"Y₁"}),g.jsx("div",{className:`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[10px] border shadow-lg ${a?"bg-slate-900 text-sky-300 border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.4)]":"bg-white text-slate-900 border-slate-600 shadow-md"}`,children:"O"})]})]}),g.jsx("div",{className:`w-5 border-l flex flex-col justify-around text-[9px] font-mono font-bold items-center text-center ${a?"bg-[#0e1628] border-slate-800 text-slate-500":"bg-slate-200 border-slate-300 text-slate-600"}`,children:["A","B","C","D"].map(h=>g.jsx("span",{children:h},h))})]}),g.jsx("div",{className:`h-5 border-t grid grid-cols-8 text-[9px] font-mono font-bold items-center text-center ${a?"bg-[#0e1628] border-slate-800 text-slate-500":"bg-slate-200 border-slate-300 text-slate-600"}`,children:["1","2","3","4","5","6","7","8"].map(h=>g.jsx("div",{className:"border-r border-slate-800/40 last:border-r-0",children:h},h))})]})})},h2=({isOpen:t,onClose:e,theme:n})=>{if(!t)return null;const i=n==="blueprint";return g.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200",children:g.jsxs("div",{className:`w-full max-w-4xl max-h-[90vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden font-sans ${i?"bg-[#0f172a] border-slate-700 text-slate-200":"bg-white border-slate-300 text-slate-800"}`,children:[g.jsxs("div",{className:`px-6 py-4 border-b flex items-center justify-between ${i?"border-slate-800 bg-[#131c31]":"border-slate-200 bg-slate-50"}`,children:[g.jsxs("div",{className:"flex items-center gap-2.5",children:[g.jsx(ax,{className:"w-5 h-5 text-sky-400"}),g.jsxs("div",{children:[g.jsx("h2",{className:"text-base font-bold font-mono tracking-tight text-slate-100",children:"FIRST-ANGLE ORTHOGRAPHIC PROJECTION GUIDE"}),g.jsx("p",{className:"text-xs text-slate-400 font-mono",children:"ISO 128 / BIS SP:46 Engineering Graphics Theory for First-Year B.Tech"})]})]}),g.jsx("button",{onClick:e,className:"p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors",children:g.jsx(dx,{className:"w-5 h-5"})})]}),g.jsxs("div",{className:"flex-1 overflow-y-auto p-6 space-y-6 text-sm custom-scrollbar",children:[g.jsxs("div",{className:`p-4 rounded-xl border ${i?"bg-sky-950/20 border-sky-800/50":"bg-blue-50/50 border-blue-200"}`,children:[g.jsxs("h3",{className:"text-sm font-bold font-mono text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-2",children:[g.jsx(lx,{className:"w-4 h-4 text-sky-400"}),"1. The Golden Rule of First-Angle Projection"]}),g.jsxs("p",{className:"leading-relaxed",children:["In First-Angle Projection, the object is imagined to be situated in the"," ",g.jsx("strong",{className:"text-sky-400",children:"First Quadrant"}),":"]}),g.jsxs("ul",{className:"list-disc list-inside mt-2 space-y-1 font-mono text-xs text-slate-300",children:[g.jsxs("li",{children:[g.jsx("strong",{children:"Above"})," the Horizontal Plane (H.P.)"]}),g.jsxs("li",{children:[g.jsx("strong",{children:"In front of"})," the Vertical Plane (V.P.)"]}),g.jsxs("li",{children:["The ",g.jsx("strong",{children:"Object lies BETWEEN the Observer and the Plane of Projection"}),"."]})]}),g.jsx("p",{className:"mt-3 text-xs text-slate-400",children:"When the rays of sight strike the object, its shadow or image is cast onto the plane behind it. Thus, each view is projected onto the opposite side of the observer!"})]}),g.jsxs("div",{children:[g.jsx("h3",{className:"text-sm font-bold font-mono text-amber-400 uppercase tracking-wider mb-3",children:"2. Standard Drawing Sheet Layout (ISO / BIS)"}),g.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[g.jsxs("div",{className:`p-4 rounded-xl border ${i?"bg-slate-900/60 border-slate-800":"bg-slate-50 border-slate-200"}`,children:[g.jsx("div",{className:"font-mono font-bold text-xs text-sky-300 mb-2",children:"TOP-LEFT: FRONT VIEW (FV / ELEVATION)"}),g.jsxs("p",{className:"text-xs text-slate-300 leading-relaxed",children:["Drawn on the Vertical Plane (V.P.) ",g.jsx("strong",{children:"ABOVE"})," the reference line"," ",g.jsx("code",{className:"text-amber-400 font-bold",children:"X — Y"}),"."]}),g.jsxs("div",{className:"text-[11px] text-slate-400 mt-2",children:["• Shows: ",g.jsx("strong",{children:"Length (L)"})," along horizontal and ",g.jsx("strong",{children:"Height (H)"})," along vertical."]})]}),g.jsxs("div",{className:`p-4 rounded-xl border ${i?"bg-slate-900/60 border-slate-800":"bg-slate-50 border-slate-200"}`,children:[g.jsx("div",{className:"font-mono font-bold text-xs text-amber-300 mb-2",children:"TOP-RIGHT: LEFT-HAND SIDE VIEW (LHSV)"}),g.jsxs("p",{className:"text-xs text-slate-300 leading-relaxed",children:["Projected onto the Right Profile Plane (R.P.P.) to the ",g.jsx("strong",{children:"RIGHT"})," of the Front View, beyond the reference line"," ",g.jsx("code",{className:"text-amber-400 font-bold",children:"X₁ — Y₁"}),"."]}),g.jsxs("div",{className:"text-[11px] text-slate-400 mt-2",children:["• Shows: ",g.jsx("strong",{children:"Width/Depth (W)"})," along horizontal and ",g.jsx("strong",{children:"Height (H)"})," along vertical."]})]}),g.jsxs("div",{className:`p-4 rounded-xl border ${i?"bg-slate-900/60 border-slate-800":"bg-slate-50 border-slate-200"}`,children:[g.jsx("div",{className:"font-mono font-bold text-xs text-emerald-300 mb-2",children:"BOTTOM-LEFT: TOP VIEW (TV / PLAN)"}),g.jsxs("p",{className:"text-xs text-slate-300 leading-relaxed",children:["Drawn on the Horizontal Plane (H.P.) ",g.jsx("strong",{children:"BELOW"})," the reference line"," ",g.jsx("code",{className:"text-amber-400 font-bold",children:"X — Y"}),", aligned directly under the Front View."]}),g.jsxs("div",{className:"text-[11px] text-slate-400 mt-2",children:["• Shows: ",g.jsx("strong",{children:"Length (L)"})," along horizontal and ",g.jsx("strong",{children:"Width/Depth (W)"})," along vertical."]})]}),g.jsxs("div",{className:`p-4 rounded-xl border ${i?"bg-slate-900/60 border-slate-800":"bg-slate-50 border-slate-200"}`,children:[g.jsx("div",{className:"font-mono font-bold text-xs text-purple-300 mb-2",children:"BOTTOM-RIGHT: 45° MITER LINE & TITLE BLOCK"}),g.jsx("p",{className:"text-xs text-slate-300 leading-relaxed",children:"A 45° construction line drawn from the intersection of X-Y and X₁-Y₁ that transfers depth dimensions from the Top View directly up into the Side View."}),g.jsx("div",{className:"text-[11px] text-slate-400 mt-2",children:"• Accommodates the official First-Angle Projection symbol and drawing credentials."})]})]})]}),g.jsxs("div",{className:`p-4 rounded-xl border ${i?"bg-amber-950/20 border-amber-800/40":"bg-amber-50 border-amber-200"}`,children:[g.jsxs("h3",{className:"text-sm font-bold font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2",children:[g.jsx(Oy,{className:"w-4 h-4 text-amber-400"}),"3. Classic Exam Question: Why are 2nd & 4th Angle Projections NOT used?"]}),g.jsxs("p",{className:"text-xs text-slate-300 leading-relaxed",children:["When preparing an orthographic projection sheet, the Horizontal Plane (H.P.) is rotated"," ",g.jsx("strong",{children:"90° clockwise"})," about the reference line X-Y to bring it into the same plane as the Vertical Plane (V.P.):"]}),g.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3 mt-3",children:[g.jsxs("div",{className:"p-2.5 rounded bg-black/20 text-xs",children:[g.jsx("span",{className:"font-bold text-amber-300",children:"In the 2nd Quadrant:"})," The H.P. is above the reference line. When rotated 90° clockwise, the H.P. swings upward and"," ",g.jsx("strong",{children:"overlaps directly with the V.P."})," The Front View and Top View lie on top of one another, resulting in an unintelligible mess of overlapping lines!"]}),g.jsxs("div",{className:"p-2.5 rounded bg-black/20 text-xs",children:[g.jsx("span",{className:"font-bold text-amber-300",children:"In the 4th Quadrant:"})," Both V.P. and H.P. end up ",g.jsx("strong",{children:"below"})," the reference line after rotation. Again, the Front View and Top View overlap each other, making the drawing unusable."]})]})]}),g.jsxs("div",{children:[g.jsx("h3",{className:"text-sm font-bold font-mono text-slate-300 uppercase tracking-wider mb-3",children:"4. Engineering Line Standards (BIS SP:46)"}),g.jsx("div",{className:"overflow-x-auto",children:g.jsxs("table",{className:"w-full text-xs font-mono border-collapse",children:[g.jsx("thead",{children:g.jsxs("tr",{className:"border-b border-slate-700 text-left text-slate-400",children:[g.jsx("th",{className:"pb-2",children:"Line Style"}),g.jsx("th",{className:"pb-2",children:"Standard Name"}),g.jsx("th",{className:"pb-2",children:"Thickness"}),g.jsx("th",{className:"pb-2",children:"Application in OrthoView3D"})]})}),g.jsxs("tbody",{className:"divide-y divide-slate-800",children:[g.jsxs("tr",{children:[g.jsx("td",{className:"py-2 text-sky-400 font-bold",children:"──────"}),g.jsx("td",{className:"py-2",children:"Continuous Thick (Type A)"}),g.jsx("td",{className:"py-2",children:"0.5 mm"}),g.jsx("td",{className:"py-2 text-slate-300",children:"Visible object outlines & edges"})]}),g.jsxs("tr",{children:[g.jsx("td",{className:"py-2 text-amber-400 font-bold",children:"- - - -"}),g.jsx("td",{className:"py-2",children:"Dashed Medium (Type F)"}),g.jsx("td",{className:"py-2",children:"0.3 mm"}),g.jsx("td",{className:"py-2 text-slate-300",children:"Hidden outlines & edges (occluded features)"})]}),g.jsxs("tr",{children:[g.jsx("td",{className:"py-2 text-slate-400 font-bold",children:"─ · ─ ·"}),g.jsx("td",{className:"py-2",children:"Long Dash-Dotted Thin (Type G)"}),g.jsx("td",{className:"py-2",children:"0.2 mm"}),g.jsx("td",{className:"py-2 text-slate-300",children:"Center lines, axes of cylinders & cones"})]}),g.jsxs("tr",{children:[g.jsx("td",{className:"py-2 text-sky-300/60 font-bold",children:"······"}),g.jsx("td",{className:"py-2",children:"Continuous / Faint Thin (Type B)"}),g.jsx("td",{className:"py-2",children:"0.2 mm"}),g.jsx("td",{className:"py-2 text-slate-300",children:"Projectors, dimension lines, 45° miter line"})]})]})]})})]})]}),g.jsx("div",{className:`px-6 py-3 border-t flex items-center justify-end ${i?"border-slate-800 bg-[#131c31]":"border-slate-200 bg-slate-50"}`,children:g.jsx("button",{onClick:e,className:"px-4 py-2 text-xs font-mono font-bold rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors",children:"Got It, Back to Workspace"})})]})})};var Yh={};(function t(e,n,i,r){var s=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),o=typeof Path2D=="function"&&typeof DOMMatrix=="function",a=function(){if(!e.OffscreenCanvas)return!1;try{var C=new OffscreenCanvas(1,1),R=C.getContext("2d");R.fillRect(0,0,1,1);var j=C.transferToImageBitmap();R.createPattern(j,"no-repeat")}catch{return!1}return!0}();function l(){}function c(C){var R=n.exports.Promise,j=R!==void 0?R:e.Promise;return typeof j=="function"?new j(C):(C(l,l),null)}var u=function(C,R){return{transform:function(j){if(C)return j;if(R.has(j))return R.get(j);var z=new OffscreenCanvas(j.width,j.height),Y=z.getContext("2d");return Y.drawImage(j,0,0),R.set(j,z),z},clear:function(){R.clear()}}}(a,new Map),f=function(){var C=Math.floor(16.666666666666668),R,j,z={},Y=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(R=function(Q){var ie=Math.random();return z[ie]=requestAnimationFrame(function J(me){Y===me||Y+C-1<me?(Y=me,delete z[ie],Q()):z[ie]=requestAnimationFrame(J)}),ie},j=function(Q){z[Q]&&cancelAnimationFrame(z[Q])}):(R=function(Q){return setTimeout(Q,C)},j=function(Q){return clearTimeout(Q)}),{frame:R,cancel:j}}(),h=function(){var C,R,j={};function z(Y){function Q(ie,J){Y.postMessage({options:ie||{},callback:J})}Y.init=function(J){var me=J.transferControlToOffscreen();Y.postMessage({canvas:me},[me])},Y.fire=function(J,me,Me){if(R)return Q(J,null),R;var ge=Math.random().toString(36).slice(2);return R=c(function(Ee){function D(ue){ue.data.callback===ge&&(delete j[ge],Y.removeEventListener("message",D),R=null,u.clear(),Me(),Ee())}Y.addEventListener("message",D),Q(J,ge),j[ge]=D.bind(null,{data:{callback:ge}})}),R},Y.reset=function(){Y.postMessage({reset:!0});for(var J in j)j[J](),delete j[J]}}return function(){if(C)return C;if(!i&&s){var Y=["var CONFETTI, SIZE = {}, module = {};","("+t.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{C=new Worker(URL.createObjectURL(new Blob([Y])))}catch(Q){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",Q),null}z(C)}return C}}(),p={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function v(C,R){return R?R(C):C}function y(C){return C!=null}function m(C,R,j){return v(C&&y(C[R])?C[R]:p[R],j)}function d(C){return C<0?0:Math.floor(C)}function _(C,R){return Math.floor(Math.random()*(R-C))+C}function x(C){return parseInt(C,16)}function S(C){return C.map(P)}function P(C){var R=String(C).replace(/[^0-9a-f]/gi,"");return R.length<6&&(R=R[0]+R[0]+R[1]+R[1]+R[2]+R[2]),{r:x(R.substring(0,2)),g:x(R.substring(2,4)),b:x(R.substring(4,6))}}function w(C){var R=m(C,"origin",Object);return R.x=m(R,"x",Number),R.y=m(R,"y",Number),R}function T(C){C.width=document.documentElement.clientWidth,C.height=document.documentElement.clientHeight}function O(C){var R=C.getBoundingClientRect();C.width=R.width,C.height=R.height}function E(C){var R=document.createElement("canvas");return R.style.position="fixed",R.style.top="0px",R.style.left="0px",R.style.pointerEvents="none",R.style.zIndex=C,R}function b(C,R,j,z,Y,Q,ie,J,me){C.save(),C.translate(R,j),C.rotate(Q),C.scale(z,Y),C.arc(0,0,1,ie,J,me),C.restore()}function B(C){var R=C.angle*(Math.PI/180),j=C.spread*(Math.PI/180);return{x:C.x,y:C.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:C.startVelocity*.5+Math.random()*C.startVelocity,angle2D:-R+(.5*j-Math.random()*j),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:C.color,shape:C.shape,tick:0,totalTicks:C.ticks,decay:C.decay,drift:C.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:C.gravity*3,ovalScalar:.6,scalar:C.scalar,flat:C.flat}}function q(C,R){R.x+=Math.cos(R.angle2D)*R.velocity+R.drift,R.y+=Math.sin(R.angle2D)*R.velocity+R.gravity,R.velocity*=R.decay,R.flat?(R.wobble=0,R.wobbleX=R.x+10*R.scalar,R.wobbleY=R.y+10*R.scalar,R.tiltSin=0,R.tiltCos=0,R.random=1):(R.wobble+=R.wobbleSpeed,R.wobbleX=R.x+10*R.scalar*Math.cos(R.wobble),R.wobbleY=R.y+10*R.scalar*Math.sin(R.wobble),R.tiltAngle+=.1,R.tiltSin=Math.sin(R.tiltAngle),R.tiltCos=Math.cos(R.tiltAngle),R.random=Math.random()+2);var j=R.tick++/R.totalTicks,z=R.x+R.random*R.tiltCos,Y=R.y+R.random*R.tiltSin,Q=R.wobbleX+R.random*R.tiltCos,ie=R.wobbleY+R.random*R.tiltSin;if(C.fillStyle="rgba("+R.color.r+", "+R.color.g+", "+R.color.b+", "+(1-j)+")",C.beginPath(),o&&R.shape.type==="path"&&typeof R.shape.path=="string"&&Array.isArray(R.shape.matrix))C.fill(ne(R.shape.path,R.shape.matrix,R.x,R.y,Math.abs(Q-z)*.1,Math.abs(ie-Y)*.1,Math.PI/10*R.wobble));else if(R.shape.type==="bitmap"){var J=Math.PI/10*R.wobble,me=Math.abs(Q-z)*.1,Me=Math.abs(ie-Y)*.1,ge=R.shape.bitmap.width*R.scalar,Ee=R.shape.bitmap.height*R.scalar,D=new DOMMatrix([Math.cos(J)*me,Math.sin(J)*me,-Math.sin(J)*Me,Math.cos(J)*Me,R.x,R.y]);D.multiplySelf(new DOMMatrix(R.shape.matrix));var ue=C.createPattern(u.transform(R.shape.bitmap),"no-repeat");ue.setTransform(D),C.globalAlpha=1-j,C.fillStyle=ue,C.fillRect(R.x-ge/2,R.y-Ee/2,ge,Ee),C.globalAlpha=1}else if(R.shape==="circle")C.ellipse?C.ellipse(R.x,R.y,Math.abs(Q-z)*R.ovalScalar,Math.abs(ie-Y)*R.ovalScalar,Math.PI/10*R.wobble,0,2*Math.PI):b(C,R.x,R.y,Math.abs(Q-z)*R.ovalScalar,Math.abs(ie-Y)*R.ovalScalar,Math.PI/10*R.wobble,0,2*Math.PI);else if(R.shape==="star")for(var X=Math.PI/2*3,se=4*R.scalar,te=8*R.scalar,Te=R.x,ve=R.y,A=5,M=Math.PI/A;A--;)Te=R.x+Math.cos(X)*te,ve=R.y+Math.sin(X)*te,C.lineTo(Te,ve),X+=M,Te=R.x+Math.cos(X)*se,ve=R.y+Math.sin(X)*se,C.lineTo(Te,ve),X+=M;else C.moveTo(Math.floor(R.x),Math.floor(R.y)),C.lineTo(Math.floor(R.wobbleX),Math.floor(Y)),C.lineTo(Math.floor(Q),Math.floor(ie)),C.lineTo(Math.floor(z),Math.floor(R.wobbleY));return C.closePath(),C.fill(),R.tick<R.totalTicks}function re(C,R,j,z,Y){var Q=R.slice(),ie=C.getContext("2d"),J,me,Me=c(function(ge){function Ee(){J=me=null,ie.clearRect(0,0,z.width,z.height),u.clear(),Y(),ge()}function D(){i&&!(z.width===r.width&&z.height===r.height)&&(z.width=C.width=r.width,z.height=C.height=r.height),!z.width&&!z.height&&(j(C),z.width=C.width,z.height=C.height),ie.clearRect(0,0,z.width,z.height),Q=Q.filter(function(ue){return q(ie,ue)}),Q.length?J=f.frame(D):Ee()}J=f.frame(D),me=Ee});return{addFettis:function(ge){return Q=Q.concat(ge),Me},canvas:C,promise:Me,reset:function(){J&&f.cancel(J),me&&me()}}}function U(C,R){var j=!C,z=!!m(R||{},"resize"),Y=!1,Q=m(R,"disableForReducedMotion",Boolean),ie=s&&!!m(R||{},"useWorker"),J=ie?h():null,me=j?T:O,Me=C&&J?!!C.__confetti_initialized:!1,ge=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,Ee;function D(X,se,te){for(var Te=m(X,"particleCount",d),ve=m(X,"angle",Number),A=m(X,"spread",Number),M=m(X,"startVelocity",Number),H=m(X,"decay",Number),ce=m(X,"gravity",Number),ae=m(X,"drift",Number),oe=m(X,"colors",S),Ae=m(X,"ticks",Number),ye=m(X,"shapes"),be=m(X,"scalar"),Le=!!m(X,"flat"),Oe=w(X),le=Te,Ge=[],He=C.width*Oe.x,ke=C.height*Oe.y;le--;)Ge.push(B({x:He,y:ke,angle:ve,spread:A,startVelocity:M,color:oe[le%oe.length],shape:ye[_(0,ye.length)],ticks:Ae,decay:H,gravity:ce,drift:ae,scalar:be,flat:Le}));return Ee?Ee.addFettis(Ge):(Ee=re(C,Ge,me,se,te),Ee.promise)}function ue(X){var se=Q||m(X,"disableForReducedMotion",Boolean),te=m(X,"zIndex",Number);if(se&&ge)return c(function(M){M()});j&&Ee?C=Ee.canvas:j&&!C&&(C=E(te),document.body.appendChild(C)),z&&!Me&&me(C);var Te={width:C.width,height:C.height};J&&!Me&&J.init(C),Me=!0,J&&(C.__confetti_initialized=!0);function ve(){if(J){var M={getBoundingClientRect:function(){if(!j)return C.getBoundingClientRect()}};me(M),J.postMessage({resize:{width:M.width,height:M.height}});return}Te.width=Te.height=null}function A(){Ee=null,z&&(Y=!1,e.removeEventListener("resize",ve)),j&&C&&(document.body.contains(C)&&document.body.removeChild(C),C=null,Me=!1)}return z&&!Y&&(Y=!0,e.addEventListener("resize",ve,!1)),J?J.fire(X,Te,A):D(X,Te,A)}return ue.reset=function(){J&&J.reset(),Ee&&Ee.reset()},ue}var V;function $(){return V||(V=U(null,{useWorker:!0,resize:!0})),V}function ne(C,R,j,z,Y,Q,ie){var J=new Path2D(C),me=new Path2D;me.addPath(J,new DOMMatrix(R));var Me=new Path2D;return Me.addPath(me,new DOMMatrix([Math.cos(ie)*Y,Math.sin(ie)*Y,-Math.sin(ie)*Q,Math.cos(ie)*Q,j,z])),Me}function F(C){if(!o)throw new Error("path confetti are not supported in this browser");var R,j;typeof C=="string"?R=C:(R=C.path,j=C.matrix);var z=new Path2D(R),Y=document.createElement("canvas"),Q=Y.getContext("2d");if(!j){for(var ie=1e3,J=ie,me=ie,Me=0,ge=0,Ee,D,ue=0;ue<ie;ue+=2)for(var X=0;X<ie;X+=2)Q.isPointInPath(z,ue,X,"nonzero")&&(J=Math.min(J,ue),me=Math.min(me,X),Me=Math.max(Me,ue),ge=Math.max(ge,X));Ee=Me-J,D=ge-me;var se=10,te=Math.min(se/Ee,se/D);j=[te,0,0,te,-Math.round(Ee/2+J)*te,-Math.round(D/2+me)*te]}return{type:"path",path:R,matrix:j}}function G(C){var R,j=1,z="#000000",Y='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof C=="string"?R=C:(R=C.text,j="scalar"in C?C.scalar:j,Y="fontFamily"in C?C.fontFamily:Y,z="color"in C?C.color:z);var Q=10*j,ie=""+Q+"px "+Y,J=new OffscreenCanvas(Q,Q),me=J.getContext("2d");me.font=ie;var Me=me.measureText(R),ge=Math.ceil(Me.actualBoundingBoxRight+Me.actualBoundingBoxLeft),Ee=Math.ceil(Me.actualBoundingBoxAscent+Me.actualBoundingBoxDescent),D=2,ue=Me.actualBoundingBoxLeft+D,X=Me.actualBoundingBoxAscent+D;ge+=D+D,Ee+=D+D,J=new OffscreenCanvas(ge,Ee),me=J.getContext("2d"),me.font=ie,me.fillStyle=z,me.fillText(R,ue,X);var se=1/j;return{type:"bitmap",bitmap:J.transferToImageBitmap(),matrix:[se,0,0,se,-ge*se/2,-Ee*se/2]}}n.exports=function(){return $().apply(this,arguments)},n.exports.reset=function(){$().reset()},n.exports.create=U,n.exports.shapeFromPath=F,n.exports.shapeFromText=G})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),Yh,!1);const f2=Yh.exports;Yh.exports.create;const On=[{id:1,question:"In ISO First-Angle Projection, where is the Top View (Plan) drawn on the drawing sheet?",options:["Directly BELOW the Front View, on the Horizontal Plane (H.P.)","Directly ABOVE the Front View, on the Vertical Plane (V.P.)","To the right of the Front View, on the Profile Plane (P.P.)","At any arbitrary position as long as dimensions are noted"],correctIndex:0,explanation:"In First-Angle projection, the observer looks from above, projecting down onto H.P. When H.P. rotates 90° clockwise down, Top View appears directly BELOW the Front View."},{id:2,question:"When drawing a First-Angle projection, which side view is placed to the RIGHT of the Front View?",options:["Left-Hand Side View (LHSV)","Right-Hand Side View (RHSV)","Bottom View (Inverted Plan)","Axonometric Isometric View"],correctIndex:0,explanation:"Looking from the left, rays pass through the object and project onto the Right Profile Plane (R.P.P.). When R.P.P. is unfolded to the right, LHSV appears to the RIGHT of Front View."},{id:3,question:"What is the spatial relationship between Observer, Object, and Projection Plane in First-Angle?",options:["Observer → Object → Plane (Object is between observer and plane)","Observer → Plane → Object (Plane is between observer and object)","Plane → Observer → Object","Object → Observer → Plane"],correctIndex:0,explanation:"In First-Angle, the object is placed in the First Quadrant between the observer and the plane of projection."},{id:4,question:"Why are 2nd-Angle and 4th-Angle projections never utilized in engineering drawing practice?",options:["Rotating H.P. by 90° causes Front View and Top View to overlap, creating unreadable clutter","They do not support millimeter or metric dimensioning systems","Computer-aided design software cannot compute negative quadrant coordinates","They require 4 orthogonal projection planes instead of 3"],correctIndex:0,explanation:"In both 2nd and 4th quadrants, rotating H.P. 90° clockwise brings H.P. and V.P. into the same plane on the same side of the X-Y line, causing views to overlap completely."},{id:5,question:"According to BIS SP:46 / ISO standards, what line type must represent hidden features and interior edges?",options:["Dashed medium line (Type F)","Continuous thick line (Type A)","Long dash-dotted thin line (Type G)","Wavy freehand line (Type C)"],correctIndex:0,explanation:"Dashed lines (Type F, medium thickness ~0.3mm) represent hidden outlines and occluded edges behind solid faces."},{id:6,question:"In the official ISO First-Angle Projection symbol, which element appears on the RIGHT side?",options:["Concentric circles with center crosshairs (representing cone view from smaller end)","Truncated cone trapezoid with smaller end on the left","A shaded equilateral triangle","Two concentric squares with diagonal alignment lines"],correctIndex:0,explanation:"In First-Angle, observer looks at the frustum cone from its smaller left end; the concentric circles projection is drawn on the RIGHT side."}],p2=({isOpen:t,onClose:e,theme:n})=>{const[i,r]=Ze.useState(0),[s,o]=Ze.useState({}),[a,l]=Ze.useState(!1);if(!t)return null;const c=n==="blueprint",u=On[i],f=s[u.id],h=f!==void 0,p=m=>{if(h)return;const d={...s,[u.id]:m};o(d),Object.keys(d).length===On.length&&On.filter(x=>d[x.id]===x.correctIndex).length>=4&&f2({particleCount:80,spread:70,origin:{y:.6}})},v=()=>On.filter(m=>s[m.id]===m.correctIndex).length,y=()=>{r(0),o({}),l(!1)};return g.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200",children:g.jsxs("div",{className:`w-full max-w-2xl rounded-2xl border shadow-2xl flex flex-col overflow-hidden font-sans ${c?"bg-[#0f172a] border-slate-700 text-slate-200":"bg-white border-slate-300 text-slate-800"}`,children:[g.jsxs("div",{className:`px-6 py-4 border-b flex items-center justify-between ${c?"border-slate-800 bg-[#131c31]":"border-slate-200 bg-slate-50"}`,children:[g.jsxs("div",{className:"flex items-center gap-2.5",children:[g.jsx(jc,{className:"w-5 h-5 text-amber-400"}),g.jsxs("div",{children:[g.jsx("h2",{className:"text-base font-bold font-mono tracking-tight text-slate-100",children:"B.TECH ENGINEERING GRAPHICS QUIZ"}),g.jsx("p",{className:"text-xs text-slate-400 font-mono",children:"First-Angle Projection & Technical Drawing Conventions"})]})]}),g.jsx("button",{onClick:e,className:"p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors",children:g.jsx(dx,{className:"w-5 h-5"})})]}),g.jsx("div",{className:"p-6 overflow-y-auto max-h-[75vh] space-y-5 custom-scrollbar",children:a?g.jsxs("div",{className:"text-center py-6 space-y-4",children:[g.jsx("div",{className:"w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto",children:g.jsx(jc,{className:"w-8 h-8"})}),g.jsxs("div",{children:[g.jsx("h3",{className:"text-xl font-bold font-mono text-slate-100",children:"QUIZ COMPLETE!"}),g.jsxs("p",{className:"text-xs text-slate-400 font-mono mt-1",children:["You scored ",v()," out of ",On.length," points"]})]}),g.jsxs("div",{className:`p-4 rounded-xl border inline-block min-w-[280px] font-mono ${v()>=4?"bg-emerald-950/30 border-emerald-500/40 text-emerald-300":"bg-amber-950/30 border-amber-500/40 text-amber-300"}`,children:[g.jsxs("div",{className:"text-2xl font-bold",children:[Math.round(v()/On.length*100),"%"]}),g.jsx("div",{className:"text-xs mt-1",children:v()===6?"Outstanding! University Gold Medal Grade.":v()>=4?"Well Done! Clear grasp of First-Angle Projections.":"Review the First-Angle Theory Guide and try again!"})]}),g.jsxs("div",{className:"flex items-center justify-center gap-3 pt-4",children:[g.jsxs("button",{onClick:y,className:"px-4 py-2 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 hover:bg-slate-800 flex items-center gap-1.5",children:[g.jsx(Dh,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:"Retake Quiz"})]}),g.jsx("button",{onClick:e,className:"px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono",children:"Close & Return"})]})]}):g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"space-y-1.5",children:[g.jsxs("div",{className:"flex justify-between text-xs font-mono text-slate-400",children:[g.jsxs("span",{children:["Question ",i+1," of ",On.length]}),g.jsxs("span",{children:["Answered: ",Object.keys(s).length," / ",On.length]})]}),g.jsx("div",{className:"w-full h-2 rounded-full bg-slate-800 overflow-hidden",children:g.jsx("div",{className:"h-full bg-sky-400 transition-all duration-300",style:{width:`${(i+1)/On.length*100}%`}})})]}),g.jsxs("div",{className:`p-4 rounded-xl border ${c?"bg-slate-900/60 border-slate-800":"bg-slate-50 border-slate-200"}`,children:[g.jsxs("div",{className:"text-xs font-mono font-bold text-sky-400 uppercase tracking-wider mb-1",children:["Question #",u.id]}),g.jsx("h3",{className:"text-sm font-semibold leading-relaxed text-slate-100",children:u.question})]}),g.jsx("div",{className:"space-y-2.5",children:u.options.map((m,d)=>{let _=c?"bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300":"bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700";return h&&(d===u.correctIndex?_=c?"bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold":"bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold":d===f&&(_=c?"bg-red-950/40 border-red-500 text-red-300":"bg-red-50 border-red-500 text-red-800")),g.jsxs("button",{onClick:()=>p(d),disabled:h,className:`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${_}`,children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("span",{className:"w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center font-mono text-[10px] shrink-0",children:String.fromCharCode(65+d)}),g.jsx("span",{children:m})]}),h&&d===u.correctIndex&&g.jsx(lx,{className:"w-4 h-4 text-emerald-400 shrink-0"}),h&&d===f&&d!==u.correctIndex&&g.jsx(nS,{className:"w-4 h-4 text-red-400 shrink-0"})]},d)})}),h&&g.jsxs("div",{className:`p-3.5 rounded-xl border text-xs leading-relaxed animate-in fade-in ${f===u.correctIndex?c?"bg-emerald-950/20 border-emerald-800/50 text-emerald-300":"bg-emerald-50 border-emerald-200 text-emerald-800":c?"bg-amber-950/20 border-amber-800/50 text-amber-300":"bg-amber-50 border-amber-200 text-amber-800"}`,children:[g.jsx("div",{className:"font-bold font-mono uppercase mb-1 flex items-center gap-1.5",children:f===u.correctIndex?"✓ Correct Answer!":"✗ Explanation:"}),g.jsx("div",{children:u.explanation})]}),g.jsxs("div",{className:"flex items-center justify-between pt-2",children:[g.jsx("button",{disabled:i===0,onClick:()=>r(m=>Math.max(0,m-1)),className:"px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-slate-400 hover:text-white disabled:opacity-30",children:"Previous"}),i<On.length-1?g.jsxs("button",{onClick:()=>r(m=>Math.min(On.length-1,m+1)),className:"px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1",children:[g.jsx("span",{children:"Next Question"}),g.jsx(zy,{className:"w-3.5 h-3.5"})]}):g.jsxs("button",{onClick:()=>l(!0),className:"px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1",children:[g.jsx("span",{children:"View Score Card"}),g.jsx(jc,{className:"w-3.5 h-3.5"})]})]})]})})]})})};async function m2({canvases:t,solidName:e,dimensions:n,theme:i,showMiterLine:r,showProjectors:s}){const o=i==="blueprint",a=1920,l=1080,c=document.createElement("canvas");c.width=a,c.height=l;const u=c.getContext("2d");if(!u)return;u.fillStyle=o?"#0c1222":"#f8fafc",u.fillRect(0,0,a,l);const f=30;u.strokeStyle=o?"#38bdf8":"#334155",u.lineWidth=4,u.strokeRect(f,f,a-2*f,l-2*f),u.lineWidth=1,u.strokeStyle=o?"rgba(56, 189, 248, 0.3)":"rgba(100, 116, 139, 0.4)",u.strokeRect(f+8,f+8,a-2*(f+8),l-2*(f+8)),u.fillStyle=o?"#10172a":"#e2e8f0",u.fillRect(f+9,f+9,a-2*(f+9),50),u.fillStyle=o?"#38bdf8":"#0f172a",u.font='bold 20px "JetBrains Mono", monospace',u.fillText("ORTHOVIEW 3D — FIRST-ANGLE ORTHOGRAPHIC PROJECTION SHEET",f+30,f+42),u.fillStyle=o?"#94a3b8":"#475569",u.font='14px "JetBrains Mono", monospace',u.fillText("ISO 128 / BIS SP:46 (FIRST QUADRANT)",a-f-350,f+42);const h=f+9,p=f+59,v=(a-2*(f+9))/2,y=(l-f-59-f-9)/2,m=h+v,d=p+y;t.front&&u.drawImage(t.front,h+10,p+10,v-20,y-20),t.leftSide&&u.drawImage(t.leftSide,m+10,p+10,v-20,y-20),t.top&&u.drawImage(t.top,h+10,d+10,v-20,y-20),s&&(u.save(),u.strokeStyle=o?"rgba(56, 189, 248, 0.35)":"rgba(37, 99, 235, 0.35)",u.lineWidth=1.5,u.setLineDash([5,5]),u.beginPath(),u.moveTo(h+v*.3,p+30),u.lineTo(h+v*.3,d+y-30),u.moveTo(h+v*.7,p+30),u.lineTo(h+v*.7,d+y-30),u.stroke(),u.beginPath(),u.moveTo(h+40,p+y*.3),u.lineTo(m+v-40,p+y*.3),u.moveTo(h+40,p+y*.7),u.lineTo(m+v-40,p+y*.7),u.stroke(),u.restore()),r&&(u.save(),u.strokeStyle=o?"#38bdf8":"#2563eb",u.lineWidth=2,u.setLineDash([6,4]),u.beginPath(),u.moveTo(m+20,d+20),u.lineTo(m+v*.65,d+y*.65),u.stroke(),u.fillStyle=o?"#38bdf8":"#2563eb",u.font='bold 13px "JetBrains Mono", monospace',u.fillText("45° MITER LINE",m+v*.28,d+y*.35),u.restore()),u.save(),u.strokeStyle=o?"#38bdf8":"#1e293b",u.lineWidth=3,u.beginPath(),u.moveTo(h,d),u.lineTo(h+2*v,d),u.stroke(),u.fillStyle=o?"#38bdf8":"#0f172a",u.font='bold 18px "JetBrains Mono", monospace',u.fillText("X",h+15,d-10),u.fillText("Y",h+2*v-30,d-10),u.strokeStyle=o?"#fbbf24":"#1e293b",u.lineWidth=3,u.beginPath(),u.moveTo(m,p),u.lineTo(m,p+2*y),u.stroke(),u.fillStyle=o?"#fbbf24":"#0f172a",u.fillText("X₁",m-35,p+30),u.fillText("Y₁",m-35,p+2*y-20),u.beginPath(),u.arc(m,d,14,0,Math.PI*2),u.fillStyle=o?"#0f172a":"#ffffff",u.fill(),u.strokeStyle=o?"#38bdf8":"#1e293b",u.lineWidth=2,u.stroke(),u.fillStyle=o?"#38bdf8":"#0f172a",u.font='bold 14px "JetBrains Mono", monospace',u.fillText("O",m-6,d+5),u.restore(),u.fillStyle=o?"#94a3b8":"#475569",u.font='bold 15px "JetBrains Mono", monospace',u.fillText("FRONT VIEW (FV / ELEVATION) [V.P.]",h+25,p+35),u.fillText("LEFT-HAND SIDE VIEW (LHSV) [R.P.P.]",m+25,p+35),u.fillText("TOP VIEW (TV / PLAN) [H.P.]",h+25,d+35);const _=560,x=150,S=a-f-9-_-10,P=l-f-9-x-10;u.save(),u.fillStyle=o?"#101728":"#ffffff",u.fillRect(S,P,_,x),u.strokeStyle=o?"#38bdf8":"#334155",u.lineWidth=2,u.strokeRect(S,P,_,x),u.beginPath(),u.moveTo(S+340,P),u.lineTo(S+340,P+x),u.stroke(),u.fillStyle=o?"#38bdf8":"#0f172a",u.font='bold 15px "JetBrains Mono", monospace',u.fillText("ORTHOVIEW 3D • DRAWING SHEET",S+15,P+28),u.fillStyle=o?"#ffffff":"#0f172a",u.font='bold 14px "JetBrains Mono", monospace',u.fillText(`SUBJECT: ${e.toUpperCase()}`,S+15,P+54),u.fillStyle=o?"#94a3b8":"#64748b",u.font='12px "JetBrains Mono", monospace',u.fillText("B.Tech Engineering Graphics & CAD Lab",S+15,P+76),u.fillText(`Dimensions: ${n.length} × ${n.width} × ${n.height} mm`,S+15,P+102),u.fillText("Scale: 1:1  •  Standard: ISO 128 / BIS SP:46",S+15,P+126),u.fillStyle=o?"#94a3b8":"#64748b",u.font='bold 11px "JetBrains Mono", monospace',u.fillText("PROJECTION METHOD",S+360,P+24);const w=S+360,T=P+40;u.strokeStyle=o?"#64748b":"#94a3b8",u.lineWidth=1,u.setLineDash([4,2,1,2]),u.beginPath(),u.moveTo(w,T+30),u.lineTo(w+170,T+30),u.moveTo(w+130,T),u.lineTo(w+130,T+60),u.stroke(),u.setLineDash([]),u.strokeStyle=o?"#38bdf8":"#0f172a",u.lineWidth=2,u.beginPath(),u.moveTo(w+15,T+20),u.lineTo(w+60,T+10),u.lineTo(w+60,T+50),u.lineTo(w+15,T+40),u.closePath(),u.stroke(),u.beginPath(),u.arc(w+130,T+30,20,0,Math.PI*2),u.stroke(),u.beginPath(),u.arc(w+130,T+30,10,0,Math.PI*2),u.stroke(),u.fillStyle=o?"#fbbf24":"#b45309",u.font='bold 11px "JetBrains Mono", monospace',u.fillText("FIRST ANGLE PROJECTION",S+365,P+130),u.restore();const O=c.toDataURL("image/png"),E=document.createElement("a");E.href=O,E.download=`OrthoView3D_FirstAngle_${e.replace(/\s+/g,"_")}.png`,document.body.appendChild(E),E.click(),document.body.removeChild(E)}function g2(){const[t,e]=Ze.useState("l-block"),[n,i]=Ze.useState({length:60,width:40,height:50}),[r,s]=Ze.useState({x:0,y:0,z:0}),[o,a]=Ze.useState("blueprint"),[l,c]=Ze.useState(!1),[u,f]=Ze.useState(!1),[h,p]=Ze.useState(!1),[v,y]=Ze.useState(!1),[m,d]=Ze.useState({showHiddenLines:!0,showProjectors:!0,showDimensions:!0,showMiterLine:!0,show3DPlanes:!1,show3DGrid:!0,show3DAxes:!0,showSightArrows:!0,showCenterLines:!0,renderStyle:"aluminum",transferMethod:"miter",unfoldProgress:0,showHatching:!1,showContactShadow:!0}),_=Ze.useRef({front:null,top:null,leftSide:null}),x=Ze.useMemo(()=>r2(t,n),[t,n]),S=Ze.useMemo(()=>Co.find(b=>b.id===t)||Co[0],[t]),P=b=>{e(b);const B=Co.find(q=>q.id===b);B&&(i(B.defaultDimensions),s({x:0,y:0,z:0}))},w=()=>{s({x:0,y:0,z:0})},T=()=>{a(b=>b==="blueprint"?"paper":"blueprint")},O=async()=>{y(!0);try{await m2({canvases:_.current,solidName:S.name,dimensions:n,theme:o,showMiterLine:m.showMiterLine,showProjectors:m.showProjectors})}catch(b){console.error("Export error:",b)}finally{y(!1)}},E=o==="blueprint";return g.jsxs("div",{className:`w-screen h-screen flex flex-col overflow-hidden font-sans select-none transition-colors duration-200 ${E?"dark bg-[#0b0f19] text-slate-100":"bg-slate-100 text-slate-900"}`,children:[g.jsx(iS,{solidName:S.name,dimensions:n,theme:o,onToggleTheme:T,onOpenTheory:()=>f(!0),onOpenQuiz:()=>p(!0),onExportSheet:O,isExporting:v}),g.jsxs("div",{className:"flex-1 flex overflow-hidden relative",children:[g.jsx(s2,{currentSolid:t,onSelectSolid:P,dimensions:n,onUpdateDimensions:i,rotation:r,onUpdateRotation:s,onResetRotation:w,theme:o,onToggleTheme:T,displayOptions:m,onUpdateDisplayOptions:d,isCollapsed:l,onToggleCollapse:()=>c(b=>!b)}),g.jsxs("main",{className:"flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-full",children:[g.jsx("section",{className:"lg:col-span-5 h-full relative border-r border-slate-700/50 overflow-hidden flex flex-col",children:g.jsx(c2,{geometry:x,dimensions:n,rotation:r,theme:o,displayOptions:m,onResetRotation:w,onUpdateDisplayOptions:d})}),g.jsx("section",{className:"lg:col-span-7 h-full relative overflow-hidden flex flex-col",children:g.jsx(d2,{geometry:x,dimensions:n,rotation:r,theme:o,displayOptions:m,solidName:S.name,onCanvasesReady:b=>{_.current=b}})})]})]}),g.jsx(h2,{isOpen:u,onClose:()=>f(!1),theme:o}),g.jsx(p2,{isOpen:h,onClose:()=>p(!1),theme:o})]})}Pu.createRoot(document.getElementById("root")).render(g.jsx(Ev.StrictMode,{children:g.jsx(g2,{})}));
