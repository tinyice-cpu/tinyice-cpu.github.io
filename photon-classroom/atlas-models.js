'use strict';
const AtlasModels={
 photon(lambdaNm,powerMw=1){const energy=6.62607015e-34*299792458/(lambdaNm*1e-9);return {energyEv:energy/1.602176634e-19,flux:powerMw*.001/energy}},
 laser(pump,threshold=40,efficiency=.35){return {threshold,power:Math.max(0,pump-threshold)*efficiency}},
 bandgap(eg,lambdaNm=850){const energyEv=1239.8419843320025/lambdaNm;return {cutoff:1239.8419843320025/eg,energyEv,allowed:energyEv>=eg}},
 modulation(v){return Math.sin(Math.PI*v/2)**2},
 phaseMismatch(x){return Math.abs(x)<1e-10?1:(Math.sin(x)/x)**2}
};
if(typeof module!=='undefined')module.exports=AtlasModels;
