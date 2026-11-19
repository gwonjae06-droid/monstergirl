/** Produces pose offsets; a spritesheet renderer can replace this without changing gameplay. */
export function computeMonsterPose({stage,motionTime,actionAnim,clamp}){
 let idle=Math.sin(motionTime*2.1+1)*1.6;let recoil=0,tilt=0,sx=1,sy=1;
if(actionAnim){let age=motionTime-actionAnim.at,t=clamp(age/actionAnim.duration,0,1),env=Math.sin(Math.PI*t),type=actionAnim.type;if(type==='talk'){tilt=.06*Math.sin(age*9)*env;sy=1-.035*env;recoil=-4*env}else if(type==='feed'){recoil=-16*Math.abs(Math.sin(age*6))*env;tilt=-.07*Math.sin(age*5)*env;sy=1+.055*env;sx=1-.03*env}else if(type==='sample'){recoil=8*env;tilt=.16*Math.sin(age*17)*env;sx=1+.07*env}else if(type==='nest'){tilt=.22*Math.sin(age*26)*env;recoil=-9*Math.abs(Math.sin(age*18))*env;sy=1+.1*env;sx=1-.07*env}}
if(stage===4){tilt+=Math.sin(motionTime*11)*.035;recoil+=Math.sin(motionTime*14)*4}
 return {idle,recoil,tilt,sx,sy};
}
