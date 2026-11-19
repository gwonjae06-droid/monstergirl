/* Dedicated monster portrait/sprite art, separate from world simulation. */
import {computeMonsterPose} from '../animation/MonsterMotion.js';
export function createMonsterRenderer({getContext,getImages,getEffects,clamp}){
function drawSprite(stage,x,y,size){const ctx=getContext(),imgs=getImages(),motionTime=getEffects().motionTime,actionAnim=getEffects().actionAnim;let idx=stage===0?0:stage===1?1:stage===2?2:3;let im=imgs[idx];if(!im.complete||!im.naturalWidth)return;let asp=im.width/im.height;let ht=size,wd=ht*asp;ctx.save();ctx.translate(Math.round(x),Math.round(y));const {idle,recoil,tilt,sx,sy}=computeMonsterPose({stage,motionTime,actionAnim,clamp});
ctx.rotate(tilt);ctx.scale(sx,sy);ctx.drawImage(im,-wd/2,-ht+idle+recoil,wd,ht);ctx.restore()}

return {drawSprite};
}
