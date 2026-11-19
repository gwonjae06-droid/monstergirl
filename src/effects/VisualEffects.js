import {createRageTypography} from './RageTypography.js';
import {renderSpeechBubble} from './SpeechBubble.js';
import {renderActionDecor} from './ActionEffects.js';
/** Visual event/particle/bubble renderer: no game rules inside. */
export function createEffects({getContext,getCamera,getMonster,getStage,isPlaying,onImpact,clamp}){
 const $=id=>document.getElementById(id),W=760,H=540;
 let motionTime=0,speech=null,actionAnim=null,fxParticles=[],rageTimer=0;
const typography=createRageTypography({field:$('screamField')});
function showSpeech(text,seconds=3.9){if(getStage()===4)return;speech={text,until:motionTime+seconds}}
function spawnRage(text){typography.spawn(text)}
function addFX(type,px,py,count){const colors={talk:['#ffbbd1','#f9a7e9','#fff4e9'],feed:['#ffd779','#ffab9e','#fff8d3'],sample:['#e0d7ef','#f5eaff','#c9b5d4'],nest:['#ed4357','#af3048','#deb2b7'],rage:['#f12f53','#ff7b8d','#77203e']};let cs=colors[type]||colors.talk;for(let i=0;i<count;i++){let a=i*2.399+Math.random()*.4,vel=22+Math.random()*62;fxParticles.push({x:px+(Math.random()-.5)*30,y:py-45+(Math.random()-.5)*28,vx:Math.cos(a)*vel,vy:Math.sin(a)*vel-18,max:.8+Math.random()*.7,life:.8+Math.random()*.7,size:2+Math.random()*3,color:cs[i%cs.length],kind:type})}if(fxParticles.length>180)fxParticles.splice(0,fxParticles.length-180)}
function triggerActionFX(type){actionAnim={type,at:motionTime,duration:type==='nest'?2.3:type==='sample'?1.9:1.65};addFX(type,getMonster().x,getMonster().y,type==='nest'?36:type==='sample'?25:18);if(type==='nest'){onImpact(12,.65)}}
function animateVisuals(dt){motionTime+=dt;for(const p of fxParticles){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=(p.kind==='nest'?42:14)*dt;p.vx*=Math.pow(.9,dt*10)}fxParticles=fxParticles.filter(p=>p.life>0);if(actionAnim&&motionTime-actionAnim.at>actionAnim.duration)actionAnim=null;if(isPlaying()&&getStage()===4){rageTimer-=dt;if(rageTimer<=0){rageTimer=1.05+Math.random()*.6;spawnRage()}}}
function drawActionDecor(mx,my,px,py){renderActionDecor({ctx:getContext(),mx,my,px,py,actionAnim,motionTime,clamp})}
function drawFXParticles(){const ctx=getContext(),camera=getCamera();const f=(x,y,w,h,color)=>{ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));};for(let p of fxParticles){let x=p.x-camera.x,y=p.y-camera.y;if(x<-10||x>W+10||y<-10||y>H+10)continue;ctx.globalAlpha=clamp(p.life/p.max,0,1);f(x,y,p.size,p.size,p.color);if(p.kind==='feed'||p.kind==='talk'){f(x-2,y+1,p.size+4,1,'#fff2f1')}}ctx.globalAlpha=1}
function drawSpeechBubble(x,y,text){renderSpeechBubble({ctx:getContext(),x,y,text,stage:getStage(),clamp})}

 return {showSpeech,spawnRage,addFX,triggerActionFX,animateVisuals,drawActionDecor,drawFXParticles,drawSpeechBubble,
   get motionTime(){return motionTime},set motionTime(v){motionTime=v},
   get speech(){return speech},set speech(v){speech=v},
   get actionAnim(){return actionAnim},set actionAnim(v){actionAnim=v},
   get fxParticles(){return fxParticles},set fxParticles(v){fxParticles=v},
   get rageTimer(){return rageTimer},set rageTimer(v){rageTimer=v},
   get rageIndex(){return typography.index},set rageIndex(v){typography.index=v}
 };
}
