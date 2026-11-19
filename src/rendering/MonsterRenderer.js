/* Dedicated monster portrait/sprite art, separate from world simulation. */
export function createMonsterRenderer({getContext,getImages,getEffects,clamp}){
function drawSprite(stage,x,y,size){const ctx=getContext(),imgs=getImages(),motionTime=getEffects().motionTime,actionAnim=getEffects().actionAnim;let idx=stage===0?0:stage===1?1:stage===2?2:3;let im=imgs[idx];if(!im.complete||!im.naturalWidth)return;let asp=im.width/im.height;let ht=size,wd=ht*asp;ctx.save();ctx.translate(Math.round(x),Math.round(y));let idle=Math.sin(motionTime*2.1+1)*1.6;let recoil=0,tilt=0,sx=1,sy=1;
if(actionAnim){let age=motionTime-actionAnim.at,t=clamp(age/actionAnim.duration,0,1),env=Math.sin(Math.PI*t),type=actionAnim.type;if(type==='talk'){tilt=.06*Math.sin(age*9)*env;sy=1-.035*env;recoil=-4*env}else if(type==='feed'){recoil=-16*Math.abs(Math.sin(age*6))*env;tilt=-.07*Math.sin(age*5)*env;sy=1+.055*env;sx=1-.03*env}else if(type==='sample'){recoil=8*env;tilt=.16*Math.sin(age*17)*env;sx=1+.07*env}else if(type==='nest'){tilt=.22*Math.sin(age*26)*env;recoil=-9*Math.abs(Math.sin(age*18))*env;sy=1+.1*env;sx=1-.07*env}}
if(stage===4){tilt+=Math.sin(motionTime*11)*.035;recoil+=Math.sin(motionTime*14)*4}
ctx.rotate(tilt);ctx.scale(sx,sy);ctx.drawImage(im,-wd/2,-ht+idle+recoil,wd,ht);ctx.restore()}

return {drawSprite};
}
