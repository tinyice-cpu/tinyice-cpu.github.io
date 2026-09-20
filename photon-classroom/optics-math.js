'use strict';
const Optics = {
 fresnel(n1,n2,deg){const a=deg*Math.PI/180,s=n1/n2*Math.sin(a),c=Math.cos(a),critical=n1>n2?Math.asin(n2/n1)*180/Math.PI:null,brewster=Math.atan(n2/n1)*180/Math.PI;if(s>=1-1e-12)return {rs:1,rp:1,transmitted:null,tir:s>1+1e-12,critical,brewster};const b=Math.asin(s),ct=Math.cos(b);return {rs:((n1*c-n2*ct)/(n1*c+n2*ct))**2,rp:((n2*c-n1*ct)/(n2*c+n1*ct))**2,transmitted:b*180/Math.PI,tir:false,critical,brewster};},
 gaussian(w0um,lambdaNm,zmm){const w0=w0um/1000,lambda=lambdaNm/1e6,zr=Math.PI*w0*w0/lambda;return {zr,w:w0*Math.sqrt(1+(zmm/zr)**2),divergence:lambda/(Math.PI*w0)*1000,relativePeak:1/(1+(zmm/zr)**2)};},
 cavity(d,r1,r2){const g1=1+d/r1,g2=1+d/r2,p=g1*g2;return {g1,g2,p,state:Math.abs(p)<1e-9||Math.abs(p-1)<1e-9?'临界 / 条件稳定':p>0&&p<1?'稳定':'不稳定'};},
 fiber(delta,a,lambda,angle){const n1=1.45,n2=n1-delta,na=Math.sqrt(n1*n1-n2*n2),acceptance=Math.asin(na)*180/Math.PI,v=2*Math.PI*a*na/(lambda/1000);return {n1,n2,na,acceptance,v,cutoff:2*Math.PI*a*na/2.405*1000,single:v<2.405-1e-9,atCutoff:Math.abs(v-2.405)<1e-9,accepted:angle<=acceptance+1e-9};},
 detector(lambda,eta,power){const h=6.62607015e-34,c=299792458,e=1.602176634e-19,energy=h*c/(lambda*1e-9),flux=power*1e-6/energy,responsivity=eta*e/energy;return {energy,flux,responsivity,current:responsivity*power};}
};
if(typeof module!=='undefined')module.exports=Optics;
