import test from 'node:test';
import assert from 'node:assert/strict';
import {computeMonsterPose} from '../src/animation/MonsterMotion.js';
import {dispatchArachneStage} from '../src/scenario/ArachneScenario.js';
import {updateMonsterAI} from '../src/simulation/MonsterAI.js';

test('monster motion is pure pose data with no renderer state',()=>{
 const idle=computeMonsterPose({stage:0,motionTime:0,actionAnim:null,clamp:(x,a,b)=>Math.max(a,Math.min(b,x))});
 assert.equal(idle.sx,1);
 assert.equal(idle.sy,1);
 const active=computeMonsterPose({stage:0,motionTime:.5,actionAnim:{type:'sample',at:0,duration:1.9},clamp:(x,a,b)=>Math.max(a,Math.min(b,x))});
 assert.ok(active.sx>idle.sx);
});
test('scenario raises emergency lines and a single rage effect',()=>{
 const logs=[],speech=[],rage=[],effects=[];
 dispatchArachneStage({next:4,old:3,monster:{x:42,y:84},record:msg=>logs.push(msg),say:msg=>logs.push(msg),showSpeech:(msg)=>speech.push(msg),spawnRage:msg=>rage.push(msg),addFX:(...args)=>effects.push(args)});
 assert.equal(speech.length,0);
 assert.equal(rage.length,3);
 assert.deepEqual(effects,[['rage',42,84,80]]);
});
test('monster behavior calls encounter callback, not UI',()=>{
 const monster={x:1162,y:272,routeTick:0,path:[],decide:0},player={x:1162,y:272};
 let captured='';
 updateMonsterAI({monster,player,stage:4,elapsed:0,dt:.016,onCapture:msg=>{captured=msg}});
 assert.ok(captured.includes('그림자'));
});
