/* Pure simulation rules: no Canvas/DOM/audio dependencies. */
import {ARACHNE} from '../content/arachne.js';
export function stageForStress(stress){
 const limits=ARACHNE.mutationThresholds;
 for(let i=limits.length-1;i>=0;i--)if(stress>=limits[i])return i+1;
 return 0;
}
export function applyManagementAction(type,{stress,bond,samples,feedCount}){
 if(type==='talk'){stress=Math.max(0,stress-13);bond=Math.min(100,bond+7)}
 else if(type==='feed'){stress=Math.max(0,stress-8);bond=Math.min(100,bond+4);feedCount++}
 else if(type==='sample'){samples++;stress=Math.min(100,stress+29);bond=Math.max(0,bond-10)}
 else if(type==='nest'){stress=Math.min(100,stress+58);bond=Math.max(0,bond-24)}
 return {stress,bond,samples,feedCount};
}
