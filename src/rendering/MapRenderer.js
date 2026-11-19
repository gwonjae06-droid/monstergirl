/* Static tilemap art and cobweb primitive, isolated from simulation. */
export function createMapRenderer({ctx:worldContext,WW,WH,zones,seeded}){
 let ctx=worldContext;
 const f=(x,y,w,h,color)=>{ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
function decorLamp(x,y){f(x-7,y-9,14,14,'#3d2d34');f(x-5,y-7,10,9,'#ab7162');f(x-3,y-5,6,5,'#f7cc84');f(x-2,y+2,4,3,'#3c252b')}
function web(x,y,s){ctx.strokeStyle='#ba9aa085';ctx.lineWidth=1;for(let r=0;r<5;r++){ctx.beginPath();ctx.arc(x,y,s*(r+1)/5,Math.PI,Math.PI*1.98);ctx.stroke()}for(let a=0;a<=6;a++){let an=Math.PI+a*Math.PI/6;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+s*Math.cos(an),y+s*Math.sin(an));ctx.stroke()}}
function plant(x,y){f(x-8,y+2,16,10,'#412b32');f(x-6,y+4,12,6,'#6a4a38');for(let k=0;k<11;k++){let a=k*2.39,r=4+(k%3)*4;let xx=x+Math.cos(a)*r,yy=y-4+Math.sin(a)*r;f(xx-3,yy-3,7,6,k%3?'#3d8066':'#6da780')}f(x-2,y+1,5,4,'#d7a16d')}
let background=document.createElement('canvas');background.width=WW;background.height=WH;let bg=background.getContext('2d');
function buildMap(){let prev=ctx;ctx=bg;f(0,0,WW,WH,'#101019');for(let y=0;y<WH;y+=28)for(let x=0;x<WW;x+=28){let r=seeded(x,y);if(r>.85)f(x,y,2,2,'#292331')}
for(let z of zones){let palette=z.type==='office'?['#45313c','#493742','#513c45']:z.type==='garden'?['#3d5148','#425b4e','#4a6254']:z.type==='cell'?['#38313f','#403542','#483846']:z.type==='control'?['#302d3b','#383340','#403543']:['#353340','#403843','#453b49'];f(z.x-8,z.y-8,z.w+16,z.h+16,'#14121b');f(z.x,z.y,z.w,z.h,palette[0]);for(let ty=z.y;ty<z.y+z.h;ty+=28)for(let tx=z.x;tx<z.x+z.w;tx+=28){let r=seeded(tx,ty);f(tx+1,ty+1,26,26,palette[Math.floor(r*3)]);f(tx+1,ty+1,26,1,'#ffffff0b');f(tx+1,ty+27,26,1,'#140e1926');if(r>.82)f(tx+6,ty+16,3,2,'#92807438')}
// architectural walls: deliberately broken where doors connect
const wall=(x,y,w,h)=>{f(x+3,y+4,w,h,'#0b0b14');f(x,y,w,h,'#715663');f(x,y,w,4,'#b08a92');f(x,y+h-5,w,3,'#302330')};
wall(z.x-8,z.y-13,z.w+16,13);wall(z.x-12,z.y,12,z.h);wall(z.x+z.w,z.y,12,z.h);
// foot of each wall
f(z.x,z.y+z.h-8,z.w,8,'#3c2733');}
// doorway passage covers over wall between adjacent areas
f(424,276,47,87,'#433845');f(961,285,47,80,'#41333c');f(687,376,216,44,'#353342');f(230,354,95,35,'#3c4c48');
// office carpet and desk
f(141,142,234,168,'#69424c');for(let k=0;k<5;k++){f(148+k*45,150,18,4,'#af776f');f(148+k*45,298,18,4,'#9f7067')};f(174,165,132,46,'#39272c');f(180,170,120,36,'#946d57');for(let k=0;k<9;k++)f(187+k*11,177,7,12,k%2?'#cbb29c':'#ecc0a8');f(326,177,36,88,'#3d2d37');for(let k=0;k<5;k++)f(330,182+k*14,28,9,k%2?'#b46b69':'#c1a082');f(200,323,96,19,'#765058');
// garden
for(let i=0;i<25;i++){let xx=86+(i*71)%330,yy=430+(i*89)%300;plant(xx,yy)}for(let k=0;k<8;k++){let x=123+k*35;f(x,590,7,75,'#735440');f(x-6,588,20,5,'#b27b5c')}
// hallway lighting and rugs
for(let i=0;i<11;i++){let x=478+i*43;f(x,305,25,40,'#473342');f(x+4,311,17,27,'#6b4951');if(i%2===0)decorLamp(x+13,281)}
// containment floor design, bed, shelf, web
f(1044,166,230,228,'#4c3544');for(let i=0;i<7;i++){f(1050+i*30,174,14,6,'#714559');f(1050+i*30,382,14,6,'#714559')};f(1010,104,106,42,'#3c2b39');for(let i=0;i<7;i++)f(1015+i*13,109,8,32,['#ac7c8c','#6e596d','#d2a58e'][i%3]);f(1265,120,55,90,'#3c2b39');f(1271,130,43,75,'#5d444b');f(1220,361,90,47,'#5a3b44');f(1227,367,76,35,'#9a6c71');web(1003,108,95);web(1358,112,111);web(1337,461,90);web(1030,453,65);decorLamp(1025,259);decorLamp(1321,260);
// control room controls, generator
f(704,552,192,85,'#292331');f(714,562,174,67,'#514454');for(let i=0;i<6;i++){let x=722+i*27;f(x,574,20,28,'#191c2a');f(x+3,577,14,17,i%2?'#5b927f':'#815869');f(x+7,602,6,7,'#e8bd87')};f(773,706,52,56,'#60454a');f(781,709,36,10,'#a77c63');f(788,728,18,18,'#e08a7f');plant(684,735);plant(916,742);
// doors and markers
for(let a of [[450,315],[985,320],[784,393],[280,365]]){f(a[0]-9,a[1]-12,18,24,'#9a7281');f(a[0]-5,a[1]-8,10,16,'#2c2431');f(a[0]-2,a[1]-4,4,7,'#e7b67c')}
ctx=prev;}
// allow reassignment from inside build
let originalCanvasCtx=ctx;buildMap();

 return {background,web};
}
