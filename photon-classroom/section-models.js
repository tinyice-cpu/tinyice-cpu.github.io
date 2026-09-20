/* Teaching models; assumptions are exposed beside each visualization. */
(function(scope){'use strict';const M={
 pn(v){const ratio=Math.sqrt((.7+v)/.7);return {width:ratio,capacitance:1/ratio,field:ratio}},
 pin(w){return {absorption:1-Math.exp(-.35*w),transit:10*w,capacitance:1.035/w}},
 hetero(lambda){const energy=1239.841984/lambda;return {energy,state:energy>=1.7?'window':energy>=1.1?'absorber':'pass'}},
 single(a,lambda){const v=2*Math.PI*a*.12/(lambda/1000);return {v,single:v<2.405}},
 dispersion(length,bw){const spread=17*length*bw;return {spread,width:Math.hypot(30,spread)}},
 attenuation(length,alpha){return {loss:length*alpha,transmission:10**(-length*alpha/10)}},
 bandgap(lambda,eg){const energy=1239.841984/lambda;return {energy,absorbs:energy>=eg,cutoff:1239.841984/eg}},
 led(current,eta){return {rate:current*.001/1.602176634e-19*eta/100}},
 qswitch(stage){const x=stage/100;return {open:x>=.5&&x<.85,stored:x<.5?x*1.8:x<.85?.9*Math.exp(-(x-.5)*12):.1+(x-.85)*1.2,pulse:x>=.5&&x<.85?Math.exp(-(((x-.61)/.055)**2)):0}},
 modes(n,locked,t){let re=0,im=0;for(let k=0;k<n;k++){const phi=locked?0:Math.sin(k*k*1.71+1.2)*Math.PI;const a=2*Math.PI*k*t+phi;re+=Math.cos(a);im+=Math.sin(a)}return (re*re+im*im)/n},
 fp(r,deg){return (1-r)**2/(1+r*r-2*r*Math.cos(deg*Math.PI/180))}
};scope.SectionModels=M;if(typeof module!=='undefined')module.exports=M;
})(typeof window==='undefined'?globalThis:window);
