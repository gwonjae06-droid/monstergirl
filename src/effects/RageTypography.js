import {ARACHNE_RAGE_LINES} from '../content/arachne.js';
/** DOM-only emergency typography; does not touch story state. */
export function createRageTypography({field,lines=ARACHNE_RAGE_LINES}){
 const spots=[[12,16],[58,30],[27,58],[46,75],[6,74],[62,13],[29,30],[9,43],[50,52],[17,82]];
 let index=0;
 function spawn(text){
  if(field.childElementCount>=9)field.firstElementChild.remove();
  const el=document.createElement('span');
  el.className='rage-word '+(index%4===0?'big':index%3===0?'small':'');
  el.textContent=text||lines[index%lines.length];
  const [left,top]=spots[index%spots.length];
  el.style.left=left+'%';el.style.top=top+'%';
  el.style.setProperty('--duration',(2.1+(index%3)*.37)+'s');
  field.appendChild(el);
  el.addEventListener('animationend',()=>el.remove(),{once:true});
  index++;
 }
 return {spawn,get index(){return index},set index(value){index=value}};
}
