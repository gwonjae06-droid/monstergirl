/* Player's hand-drawn pixel sprite. Add new directional frames here. */
export function createPlayerRenderer({getContext,getPlayer}){
const playerPixels=[
'      kkkkk       ','     khhhhhk      ','    khhhhhhkk     ','    khhhhhdhkk    ','    khssssdkk     ','     kssssk       ','    kmmssmmk      ','   kmmmmmmmmk     ','  kmmmmbmmmmmk    ','  kmmmmbmmmmmk    ','    kmbbbbmk      ','    kbbbbbbk      ','    kbbbbbbk      ','    kbbbbbbk      ','    kbbbbbbk      ','    kbbbbbbk      ','    kbbkkbbk      ','    kbbkkbbk      ','    kbbkkbbk      ','    kbbkkbbk      ','    kggkkggk      ','    kggkkggk      ','    kkk  kkk      '];
const sprite=document.createElement('canvas');sprite.width=19;sprite.height=23;const sc=sprite.getContext('2d');let colors={k:'#1c1721',h:'#c7b9ba',d:'#665d69',s:'#f2cebe',m:'#53465a',b:'#998198',g:'#473d4a'};for(let y=0;y<playerPixels.length;y++)for(let x=0;x<playerPixels[y].length;x++){let p=playerPixels[y][x];if(colors[p]){sc.fillStyle=colors[p];sc.fillRect(x,y,1,1)}}
function drawPlayer(x,y){const ctx=getContext(),player=getPlayer(),f=(x,y,w,h,color)=>{ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));};let t=Math.sin(player.walk*13)*Math.min(1,player.walk>0?1:0);ctx.save();ctx.translate(Math.round(x),Math.round(y));if(player.dir===1)ctx.scale(-1,1);f(-16,1,32,5,'#120d17a0');ctx.drawImage(sprite,-25,-59+Math.abs(t)*2,50,60);ctx.restore()}

return {drawPlayer};
}
