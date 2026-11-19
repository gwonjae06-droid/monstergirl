import {zones,clamp,distance,seeded,atZone,moveEnt} from '../world/Spatial.js';
import {updateMonsterAI} from '../simulation/MonsterAI.js';
import {dispatchArachneStage} from '../scenario/ArachneScenario.js';
import {createMapRenderer} from '../rendering/MapRenderer.js';
import {createMonsterRenderer} from '../rendering/MonsterRenderer.js';
import {createPlayerRenderer} from '../rendering/PlayerRenderer.js';
import {createEffects} from '../effects/VisualEffects.js';
import {SoundEngine} from '../audio/SoundEngine.js';
import {ARACHNE_ACTION_TEXT,arachneReplies} from '../content/arachne.js';
import {ARACHNE_ART} from '../content/AssetManifest.js';
import {applyManagementAction,stageForStress} from '../simulation/Management.js';
import {createStatusPanel} from '../ui/StatusPanel.js';
import {bindInput} from './InputController.js';

(()=>{'use strict';const W=760,H=540,WW=1470,WH=850;const c=document.getElementById('game'),v=document.getElementById('viewport');let ctx=c.getContext('2d');ctx.imageSmoothingEnabled=false;const $=id=>document.getElementById(id);const imgs=ARACHNE_ART.stages.map(src=>{const image=new Image();image.src=src;return image});const keys=new Set();let state='title',dialogue=false,done=false,started=false,last=0,elapsed=0,uiAt=0,toastAt=0,shake=0,samples=0,stress=10,bond=48,feedCount=0,stage=0,monster={x:1162,y:272,targetX:1162,targetY:272,decide:0,path:[],routeTick:0},player={x:235,y:285,dir:0,walk:0},camera={x:0,y:0},flash=0,proximity='',logHistory=[];

/* fx module */

/* zones module */

/* math module */

/* spatial module */
function say(t){$('hint').textContent=t;toastAt=elapsed+5}function record(t){let mm=String(9+Math.floor(elapsed/80)).padStart(2,'0'),m=String(Math.floor((elapsed%80)*.75)).padStart(2,'0');logHistory.unshift(`${mm}:${m} · ${t}`);logHistory=logHistory.slice(0,3);$('log').textContent=logHistory[0];$('tickLeft').textContent=t}

/* map module */

/* monster module */

/* player module */

const sound=new SoundEngine($('soundBtn')),playSound=()=>sound.toggle(),ping=(f,d)=>sound.ping(f,d);
const fx=createEffects({getContext:()=>ctx,getCamera:()=>camera,getMonster:()=>monster,getStage:()=>stage,isPlaying:()=>state==='play',onImpact:(s,f)=>{shake=s;flash=f},clamp});
const {showSpeech,spawnRage,addFX,triggerActionFX,animateVisuals,drawActionDecor,drawFXParticles,drawSpeechBubble}=fx;
const {background,web}=createMapRenderer({ctx,WW,WH,zones,seeded});
const f=(x,y,w,h,color)=>{ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
const {drawSprite}=createMonsterRenderer({getContext:()=>ctx,getImages:()=>imgs,getEffects:()=>fx,clamp});
const {drawPlayer}=createPlayerRenderer({getContext:()=>ctx,getPlayer:()=>player});
const {updateUI}=createStatusPanel({getSnapshot:()=>({stage,player,monster,state,dialogue,stress,bond,samples}),distance});

function drawWorld(){ctx.save();if(shake>0)ctx.translate((seeded(elapsed*18,1)-.5)*shake,(seeded(elapsed*23,5)-.5)*shake);ctx.drawImage(background,-Math.floor(camera.x),-Math.floor(camera.y));let mx=monster.x-camera.x,my=monster.y-camera.y,px=player.x-camera.x,py=player.y-camera.y;
// extra hazards and living threads
let webAmt=stage>0?stage:0;for(let k=0;k<webAmt*8;k++){let ax=1010+(k*59)%340,ay=108+(k*71)%340;if((ax-camera.x>-50)&&(ax-camera.x<W+50)) {ctx.save();ctx.globalAlpha=.12+.04*webAmt;web(ax-camera.x,ay-camera.y,9+(k%4)*3);ctx.restore()}}
if(stage===4){for(let i=0;i<11;i++){let a=i*.72+fx.motionTime*1.7;f(mx+Math.cos(a)*45-4,my+Math.sin(a)*22-4,6,5,'#be263e')}}
drawActionDecor(mx,my,px,py);
// entity draw order
if(my<py){drawSprite(stage,mx,my,stage===4?184:stage===3?143:118);drawPlayer(px,py)}else{drawPlayer(px,py);drawSprite(stage,mx,my,stage===4?184:stage===3?143:118)}
if(stage<4 && distance(player.x,player.y,monster.x,monster.y)<120){ctx.textAlign='center';ctx.font='bold 13px sans-serif';ctx.fillStyle='#f6d6d8';ctx.fillText('E · 아라크네',mx,my-(stage>=3?160:126));ctx.textAlign='left'}
if(fx.speech&&stage<4&&fx.motionTime<fx.speech.until&&mx>-130&&mx<W+130&&my>-20&&my<H+180){drawSpeechBubble(mx,my-(stage>=3?159:133),fx.speech.text)}
drawFXParticles();
if(stage===4){ctx.fillStyle='rgba(152,15,36,.16)';ctx.fillRect(0,0,W,H);let glow=ctx.createRadialGradient(mx,my,10,mx,my,180);glow.addColorStop(0,'#fa1d3118');glow.addColorStop(1,'#fa1d3100');ctx.fillStyle=glow;ctx.fillRect(mx-190,my-190,380,380)}
for(let o of [{x:781,y:728,txt:'격리 장치'},{x:239,y:185,txt:'근무 보고서'}]){let d=distance(player.x,player.y,o.x,o.y);if(d<90){ctx.textAlign='center';ctx.font='bold 12px sans-serif';ctx.fillStyle='#f3c19d';ctx.fillText('E · '+o.txt,o.x-camera.x,o.y-camera.y-24);ctx.textAlign='left'}}
if(flash>0){ctx.fillStyle=`rgba(230,46,70,${flash*.35})`;ctx.fillRect(0,0,W,H)}ctx.restore()}

/* move module */
function setStage(next){if(next===stage)return;const old=stage;stage=next;flash=1;shake=next>2?13:3;
if(next===4){monster.path=[];dialogue=false;fx.speech=null;fx.rageTimer=.55;$('viewport').classList.add('redmode')}
dispatchArachneStage({next,old,record,say,showSpeech,spawnRage,addFX,monster});
$('portrait').src=imgs[stage===4?3:stage===3?2:stage].src;updateUI(true)}

function tick(dt){if(state!=='play'||dialogue)return;elapsed+=dt;flash=Math.max(0,flash-1.6*dt);shake=Math.max(0,shake-17*dt);let dx=Number(keys.has('ArrowRight')||keys.has('d'))-Number(keys.has('ArrowLeft')||keys.has('a')),dy=Number(keys.has('ArrowDown')||keys.has('s'))-Number(keys.has('ArrowUp')||keys.has('w'));let mag=Math.hypot(dx,dy);if(mag){let speed=keys.has('Shift')?213:144;moveEnt(player,dx/mag*dt*speed,dy/mag*dt*speed);player.walk+=dt*(keys.has('Shift')?2.4:1);player.dir=dx<0?1:0}else player.walk=0;
if(stage<4 && elapsed>65)stress=Math.min(100,stress+dt*.18);let next=stageForStress(stress);if(next!==stage)setStage(next);updateMonsterAI({monster,player,stage,elapsed,dt,onCapture:msg=>finish(false,msg)});
camera.x=clamp(player.x-W*.5,0,WW-W);camera.y=clamp(player.y-H*.55,0,WH-H);
if(elapsed-uiAt>.12){uiAt=elapsed;updateUI(false)}if(elapsed>toastAt && toastAt!==0 && stage<4){$('hint').textContent='WASD 이동 · Shift 달리기 · E 상호작용';toastAt=0}
let z=atZone(player.x,player.y);if($('zoneName').textContent!==z)$('zoneName').textContent=z;
let mins=Math.floor((elapsed%80)*.75),hour=9+Math.floor(elapsed/80);$('dateLabel').textContent=`DAY 01　✦　${String(hour).padStart(2,'0')}:${String(mins).padStart(2,'0')}`}

/* panel module */
function interact(){if(state!=='play'||done)return;if(stage===4){if(distance(player.x,player.y,781,728)<85){finish(true,'비상 격리 성공. 시설은 회복되었지만, 닫힌 문 너머에서 누군가 당신의 이름을 부릅니다.');return}say('관제실 남쪽의 붉은 봉쇄 장치까지 이동하세요.');return}
if(distance(player.x,player.y,monster.x,monster.y)<118){dialogue=!dialogue;if(dialogue){showSpeech(stage>=2?'더 가져가려고 온 거예요?':'오늘은 무슨 일로 찾아오셨나요, 관리관님?',5);say('세라와 대화 중입니다. 우측 관리 행동을 선택하세요.')}else{showSpeech('...또 오세요.',2);say('대화 종료')}updateUI(true);return}
if(distance(player.x,player.y,239,185)<93){if(samples>=2 && stress<94){finish(true,'근무 보고서 제출 완료. 세라는 조금 불안해 보였지만, 오늘 밤은 무사히 지나갔습니다.');return}else{say(samples<2?'샘플이 부족합니다. 세라의 거미줄을 최소 2개 채집하세요.':'경고: 사고 위험도가 높습니다. 세라를 진정시키세요.');return}}
if(distance(player.x,player.y,781,728)<80){say('봉쇄 장치 준비 완료. 격리 사고 발생 시 이 장치를 작동시키세요.');return}say('상호작용할 대상이 가까이 없습니다.');}
function action(type){if(!dialogue||stage===4||state!=='play'||distance(player.x,player.y,monster.x,monster.y)>118)return;const texts=ARACHNE_ACTION_TEXT;({stress,bond,samples,feedCount}=applyManagementAction(type,{stress,bond,samples,feedCount}));record(texts[type]);say(texts[type]);triggerActionFX(type);
const replies=arachneReplies(stage);
showSpeech(replies[type],type==='nest'?5:3.8);dialogue=false;let next=stageForStress(stress);setStage(next);updateUI(true)}
function finish(success,msg){state='end';done=true;dialogue=false;keys.clear();$('viewport').classList.remove('redmode');$('screamField').replaceChildren();let h=success?'근무 종료':'격리 실패';$('modalContent').innerHTML=`<div class="tag">${success?'ENDING / SURVIVED':'ENDING / LOST'}</div><h2>${h}</h2><p>${msg}</p><p>연구 샘플 ${samples}개 수집 · 최종 변질도 ${Math.round(stress)}%<br>${success?'당신의 선택이 다음 근무 기록으로 남았습니다.':'시설 어딘가에서 다시 근무 시작 종이 울립니다.'}</p><button class="start" id="startBtn">처음부터 다시 근무하기</button>`;$('mask').classList.remove('hidden');$('startBtn').onclick=start}
function reset(){elapsed=0;fx.motionTime=0;fx.fxParticles=[];fx.actionAnim=null;fx.speech=null;fx.rageTimer=0;fx.rageIndex=0;$('screamField').replaceChildren();uiAt=0;toastAt=0;samples=0;stress=10;bond=48;feedCount=0;stage=0;flash=0;shake=0;dialogue=false;done=false;player={x:235,y:285,dir:0,walk:0};monster={x:1162,y:272,targetX:1162,targetY:272,decide:0,path:[],routeTick:0};camera={x:0,y:0};$('portrait').src=imgs[0].src;$('viewport').classList.remove('redmode');keys.clear();record('첫 출근. 아라크네 세라를 점검하십시오.');say('동쪽 복도 끝 격리실에 세라가 있습니다.');updateUI(true)}
function start(){reset();state='play';$('mask').classList.add('hidden');c.focus()}
function loop(t){let dt=Math.min((t-last)/1000||0,0.04);last=t;animateVisuals(dt);tick(dt);ctx.clearRect(0,0,W,H);drawWorld();requestAnimationFrame(loop)}

/* sound module */
$('soundBtn').onclick=playSound;$('startBtn').onclick=start;$('restartBtn').onclick=()=>{state='title';$('modalContent').innerHTML='<div class="tag">격리생태원 / 근무 기록 초기화</div><h2>근무를 다시 시작합니까?</h2><p>현재의 관리 상태와 연구 샘플이 초기화됩니다.</p><button class="start" id="startBtn">처음부터 다시 시작</button>';$('startBtn').onclick=start;$('mask').classList.remove('hidden')};document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>{action(b.dataset.action);ping(b.dataset.action==='nest'?75:160,.18)});

/* input module */
bindInput({keys,interact,ping});
if(new URLSearchParams(location.search).has('dev')){window.__wardDev={start,teleport(x,y){player.x=x;player.y=y;camera.x=clamp(x-W/2,0,WW-W);camera.y=clamp(y-H/2,0,WH-H)},interact,action,setStress(n){stress=n;setStage(stageForStress(stress))},status(){return{state,stage,stress,dialogue,fx:fx.fxParticles.length,actionAnim:fx.actionAnim?.type||null,speech:fx.speech?.text||null,rage:$('screamField').childElementCount,player:{...player}}}}}requestAnimationFrame(loop);})();
