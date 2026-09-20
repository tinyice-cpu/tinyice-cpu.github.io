'use strict';
const PrincipleModels={
 standing(q,z,t){return {forward:Math.sin(q*Math.PI*z-t),backward:Math.sin(q*Math.PI*z+t),total:2*Math.sin(q*Math.PI*z)*Math.cos(t)}},
 interference(deg){const phase=deg*Math.PI/180;return {a:(1+Math.cos(phase))/2,b:(1-Math.cos(phase))/2}},
 evanescent(deg,lambdaNm=633){const n1=1.5,n2=1,critical=Math.asin(n2/n1)*180/Math.PI,s=n1*Math.sin(deg*Math.PI/180);return {critical,tir:s>n2,depthNm:s>n2?lambdaNm/(2*Math.PI*Math.sqrt(s*s-n2*n2)):null}},
 modulator(ratio){return {phase:Math.PI*ratio,intensity:Math.sin(Math.PI*ratio/2)**2}},
 shg(x,s=1){return Math.abs(x)<1e-9?{re:s,im:0,power:s*s}:{re:Math.sin(2*x*s)/(2*x),im:(1-Math.cos(2*x*s))/(2*x),power:(Math.sin(x*s)/x)**2}},
 lens(f,z,r=1){return r*(1-z/f)},
 photonEvent(kind,stage){if(kind==='absorb')return {excited:stage>=.5,photons:stage<.5?1:0};if(kind==='spontaneous')return {excited:stage<.5,photons:stage<.5?0:1};return {excited:stage<.5,photons:stage<.5?1:2}}
};if(typeof module!=='undefined')module.exports=PrincipleModels;
