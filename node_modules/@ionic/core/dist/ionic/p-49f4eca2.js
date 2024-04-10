/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{e as o,w as s}from"./p-f419feca.js";import{f as t,s as e}from"./p-12a8643e.js";import{c as f}from"./p-1b3ffb2f.js";import"./p-06fee233.js";const r=()=>{const r=window;r.addEventListener("statusTap",(()=>{o((()=>{const o=document.elementFromPoint(r.innerWidth/2,r.innerHeight/2);if(!o)return;const a=t(o);a&&new Promise((o=>f(a,o))).then((()=>{s((async()=>{a.style.setProperty("--overflow","hidden"),await e(a,300),a.style.removeProperty("--overflow")}))}))}))}))};export{r as startStatusTap}