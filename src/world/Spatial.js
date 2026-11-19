/* Spatial topology and movement — does not depend on DOM or graphics. */
const WW=1470,WH=850;
const zones=[{name:'관리관 사무실',x:60,y:70,w:390,h:300,type:'office'},{name:'연결 복도',x:445,y:266,w:535,h:134,type:'hall'},{name:'아라크네 격리실',x:980,y:70,w:390,h:420,type:'cell'},{name:'관제실',x:660,y:396,w:280,h:395,type:'control'},{name:'온실',x:60,y:368,w:390,h:410,type:'garden'}];
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),distance=(x,y,a,b)=>Math.hypot(x-a,y-b);const seeded=(x,y)=>{const n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n)};
function allowed(x,y){return zones.some(z=>x>=z.x+12&&x<=z.x+z.w-12&&y>=z.y+18&&y<=z.y+z.h-12)|| (x>=425&&x<=463&&y>=277&&y<=355)||(x>=962&&x<=996&&y>=283&&y<=370)||(x>=685&&x<=910&&y>=377&&y<=420)||(x>=220&&x<=338&&y>=355&&y<=387)}
function atZone(x,y){return zones.find(z=>x>=z.x&&x<=z.x+z.w&&y>=z.y&&y<=z.y+z.h)?.name||'출입 제한 구역'}
function moveEnt(obj,dx,dy){if(allowed(obj.x+dx,obj.y))obj.x+=dx;if(allowed(obj.x,obj.y+dy))obj.y+=dy}
// BFS over tiles for pursuing through connected rooms, not straight through walls
function pathTo(start,goal){let tile=24,cols=Math.ceil(WW/tile),rows=Math.ceil(WH/tile),sx=clamp(Math.floor(start.x/tile),0,cols-1),sy=clamp(Math.floor(start.y/tile),0,rows-1),gx=clamp(Math.floor(goal.x/tile),0,cols-1),gy=clamp(Math.floor(goal.y/tile),0,rows-1),queue=[[sx,sy]],head=0,parent=new Map,key=(x,y)=>x+','+y;parent.set(key(sx,sy),null);let directions=[[1,0],[-1,0],[0,1],[0,-1]];while(head<queue.length&&head<5000){let [x,y]=queue[head++];if(Math.abs(x-gx)+Math.abs(y-gy)<=1){let arr=[];let k=key(x,y);while(k&&arr.length<150){let [tx,ty]=k.split(',').map(Number);arr.unshift({x:tx*tile+12,y:ty*tile+12});k=parent.get(k)}return arr.slice(1)}for(let [dx,dy] of directions){let nx=x+dx,ny=y+dy,nk=key(nx,ny);if(nx<0||ny<0||nx>=cols||ny>=rows||parent.has(nk)||!allowed(nx*tile+12,ny*tile+12))continue;parent.set(nk,key(x,y));queue.push([nx,ny])}}return [{x:goal.x,y:goal.y}]}

export {zones,clamp,distance,seeded,allowed,atZone,moveEnt,pathTo};
