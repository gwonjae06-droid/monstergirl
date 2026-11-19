import test from 'node:test';
import assert from 'node:assert/strict';
import {createMapRenderer} from '../src/rendering/MapRenderer.js';
import {createMonsterRenderer} from '../src/rendering/MonsterRenderer.js';
import {createPlayerRenderer} from '../src/rendering/PlayerRenderer.js';
import {createEffects} from '../src/effects/VisualEffects.js';
import {createStatusPanel} from '../src/ui/StatusPanel.js';
import {bindInput} from '../src/core/InputController.js';
import {SoundEngine} from '../src/audio/SoundEngine.js';
import {ANIMATION_PRESETS} from '../src/animation/AnimationPresets.js';
test('subsystems expose separate extension entry points',()=>{
 for(const fn of [createMapRenderer,createMonsterRenderer,createPlayerRenderer,createEffects,createStatusPanel,bindInput])assert.equal(typeof fn,'function');
 assert.equal(typeof SoundEngine,'function');
 assert.ok(ANIMATION_PRESETS.mutate.fps);
});
