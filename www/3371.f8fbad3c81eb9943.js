"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3371],{3371:(q,p,m)=>{m.r(p),m.d(p,{startInputShims:()=>Z});var w=m(467),l=m(8476),T=m(2885),y=m(5638),R=m(4379);m(8438);const I=new WeakMap,P=(e,t,s,r=0,o=!1)=>{I.has(e)!==s&&(s?k(e,t,r,o):G(e,t))},k=(e,t,s,r=!1)=>{const o=t.parentNode,n=t.cloneNode(!1);n.classList.add("cloned-input"),n.tabIndex=-1,r&&(n.disabled=!0),o.appendChild(n),I.set(e,n);const a="rtl"===e.ownerDocument.dir?9999:-9999;e.style.pointerEvents="none",t.style.transform=`translate3d(${a}px,${s}px,0) scale(0)`},G=(e,t)=>{const s=I.get(e);s&&(I.delete(e),s.remove()),e.style.pointerEvents="",t.style.transform=""},C="input, textarea, [no-blur], [contenteditable]",U="$ionPaddingTimer",B=(e,t,s)=>{const r=e[U];r&&clearTimeout(r),t>0?e.style.setProperty("--keyboard-offset",`${t}px`):e[U]=setTimeout(()=>{e.style.setProperty("--keyboard-offset","0px"),s&&s()},120)},F=(e,t,s)=>{e.addEventListener("focusout",()=>{t&&B(t,0,s)},{once:!0})};let A=0;const x="data-ionic-skip-scroll-assist",V=(e,t,s,r,o,n,i,a=!1)=>{const _=n&&(void 0===i||i.mode===R.a.None);let L=!1;const u=void 0!==l.w?l.w.innerHeight:0,f=S=>{!1!==L?W(e,t,s,r,S.detail.keyboardHeight,_,a,u,!1):L=!0},c=()=>{L=!1,null==l.w||l.w.removeEventListener("ionKeyboardDidShow",f),e.removeEventListener("focusout",c,!0)},h=function(){var S=(0,w.A)(function*(){t.hasAttribute(x)?t.removeAttribute(x):(W(e,t,s,r,o,_,a,u),null==l.w||l.w.addEventListener("ionKeyboardDidShow",f),e.addEventListener("focusout",c,!0))});return function(){return S.apply(this,arguments)}}();return e.addEventListener("focusin",h,!0),()=>{e.removeEventListener("focusin",h,!0),null==l.w||l.w.removeEventListener("ionKeyboardDidShow",f),e.removeEventListener("focusout",c,!0)}},K=e=>{document.activeElement!==e&&(e.setAttribute(x,"true"),e.focus())},W=function(){var e=(0,w.A)(function*(t,s,r,o,n,i,a=!1,_=0,L=!0){if(!r&&!o)return;const u=((e,t,s,r)=>{var o;return((e,t,s,r)=>{const o=e.top,n=e.bottom,i=t.top,_=i+15,u=Math.min(t.bottom,r-s)-50-n,f=_-o,c=Math.round(u<0?-u:f>0?-f:0),h=Math.min(c,o-i),g=Math.abs(h)/.3;return{scrollAmount:h,scrollDuration:Math.min(400,Math.max(150,g)),scrollPadding:s,inputSafeY:4-(o-_)}})((null!==(o=e.closest("ion-item,[ion-item]"))&&void 0!==o?o:e).getBoundingClientRect(),t.getBoundingClientRect(),s,r)})(t,r||o,n,_);if(r&&Math.abs(u.scrollAmount)<4)return K(s),void(i&&null!==r&&(B(r,A),F(s,r,()=>A=0)));if(P(t,s,!0,u.inputSafeY,a),K(s),(0,y.r)(()=>t.click()),i&&r&&(A=u.scrollPadding,B(r,A)),typeof window<"u"){let f;const c=function(){var S=(0,w.A)(function*(){void 0!==f&&clearTimeout(f),window.removeEventListener("ionKeyboardDidShow",h),window.removeEventListener("ionKeyboardDidShow",c),r&&(yield(0,T.c)(r,0,u.scrollAmount,u.scrollDuration)),P(t,s,!1,u.inputSafeY),K(s),i&&F(s,r,()=>A=0)});return function(){return S.apply(this,arguments)}}(),h=()=>{window.removeEventListener("ionKeyboardDidShow",h),window.addEventListener("ionKeyboardDidShow",c)};if(r){const S=yield(0,T.g)(r);if(L&&u.scrollAmount>S.scrollHeight-S.clientHeight-S.scrollTop)return"password"===s.type?(u.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",h)):window.addEventListener("ionKeyboardDidShow",c),void(f=setTimeout(c,1e3))}c()}});return function(s,r,o,n,i,a){return e.apply(this,arguments)}}(),Z=function(){var e=(0,w.A)(function*(t,s){if(void 0===l.d)return;const r="ios"===s,o="android"===s,n=t.getNumber("keyboardHeight",290),i=t.getBoolean("scrollAssist",!0),a=t.getBoolean("hideCaretOnScroll",r),_=t.getBoolean("inputBlurring",r),L=t.getBoolean("scrollPadding",!0),u=Array.from(l.d.querySelectorAll("ion-input, ion-textarea")),f=new WeakMap,c=new WeakMap,h=yield R.K.getResizeMode(),S=function(){var v=(0,w.A)(function*(d){yield new Promise(M=>(0,y.c)(d,M));const O=d.shadowRoot||d,D=O.querySelector("input")||O.querySelector("textarea"),b=(0,T.f)(d),j=b?null:d.closest("ion-footer");if(D){if(b&&a&&!f.has(d)){const M=((e,t,s)=>{if(!s||!t)return()=>{};const r=a=>{(e=>e===e.getRootNode().activeElement)(t)&&P(e,t,a)},o=()=>P(e,t,!1),n=()=>r(!0),i=()=>r(!1);return(0,y.a)(s,"ionScrollStart",n),(0,y.a)(s,"ionScrollEnd",i),t.addEventListener("blur",o),()=>{(0,y.b)(s,"ionScrollStart",n),(0,y.b)(s,"ionScrollEnd",i),t.removeEventListener("blur",o)}})(d,D,b);f.set(d,M)}if("date"!==D.type&&"datetime-local"!==D.type&&(b||j)&&i&&!c.has(d)){const M=V(d,D,b,j,n,L,h,o);c.set(d,M)}}});return function(O){return v.apply(this,arguments)}}();_&&(()=>{let e=!0,t=!1;const s=document;(0,y.a)(s,"ionScrollStart",()=>{t=!0}),s.addEventListener("focusin",()=>{e=!0},!0),s.addEventListener("touchend",i=>{if(t)return void(t=!1);const a=s.activeElement;if(!a||a.matches(C))return;const _=i.target;_!==a&&(_.matches(C)||_.closest(C)||(e=!1,setTimeout(()=>{e||a.blur()},50)))},!1)})();for(const v of u)S(v);l.d.addEventListener("ionInputDidLoad",v=>{S(v.detail)}),l.d.addEventListener("ionInputDidUnload",v=>{(v=>{if(a){const d=f.get(v);d&&d(),f.delete(v)}if(i){const d=c.get(v);d&&d(),c.delete(v)}})(v.detail)})});return function(s,r){return e.apply(this,arguments)}}()}}]);