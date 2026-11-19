/* Central audio driver. Replace synth tones with licensed sound files in assets/audio. */
export class SoundEngine {
 constructor(label){this.label=label;this.ctx=null;this.enabled=false;this.master=0.035;this.channels={bgm:0.5,sfx:1,ambience:0.7};}
 toggle(){try{if(!this.ctx){const AC=window.AudioContext||window.webkitAudioContext;this.ctx=new AC()}if(this.ctx.state==='suspended')this.ctx.resume();this.enabled=!this.enabled;this.label.textContent='소리: '+(this.enabled?'켜짐':'꺼짐')}catch(e){this.enabled=false;this.label.textContent='소리 지원 안 됨'}return this.enabled;}
 ping(freq=160,duration=.12){if(!this.enabled||!this.ctx)return;const ctx=this.ctx,o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(.0001,ctx.currentTime);g.gain.exponentialRampToValueAtTime(this.master*this.channels.sfx,ctx.currentTime+.02);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+duration);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+duration+.02)}
}
