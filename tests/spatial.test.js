import test from 'node:test';
import assert from 'node:assert/strict';
import {allowed,atZone,pathTo} from '../src/world/Spatial.js';

test('zones and collision are available to both AI and player',()=>{
 assert.ok(allowed(235,285));
 assert.ok(allowed(1162,272));
 assert.equal(atZone(1162,272),'아라크네 격리실');
 assert.equal(allowed(0,0),false);
});
test('pursuit can reach office and control room without walking through walls',()=>{
 const monster={x:1162,y:272};
 for(const player of [{x:235,y:285},{x:781,y:728}]){
  const route=pathTo(monster,player);
  assert.ok(route.length>3);
  assert.ok(route.every(point=>allowed(point.x,point.y)));
 }
});
