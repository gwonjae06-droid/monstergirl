import test from 'node:test';
import assert from 'node:assert/strict';
import {stageForStress,applyManagementAction} from '../src/simulation/Management.js';
import {ARACHNE,arachneReplies} from '../src/content/arachne.js';

test('mutation thresholds remain predictable',()=>{
 const cases=[[0,0],[24,0],[25,1],[50,1],[51,2],[75,2],[76,3],[93,3],[94,4],[100,4]];
 for(const [value,expected] of cases)assert.equal(stageForStress(value),expected);
});
test('tending the monster changes stats without changing the input object',()=>{
 const before={stress:35,bond:48,samples:0,feedCount:0};
 assert.deepEqual(applyManagementAction('feed',before),{stress:27,bond:52,samples:0,feedCount:1});
 assert.equal(before.stress,35);
 const sample=applyManagementAction('sample',before);
 assert.equal(sample.stress,64);
 assert.equal(sample.samples,1);
});
test('species dialogue and thresholds are defined',()=>{
 assert.equal(ARACHNE.mutationThresholds.length,4);
 assert.ok(arachneReplies(0).talk.length);
 assert.ok(arachneReplies(3).nest.includes('하지'));
});
