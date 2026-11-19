/* Desktop and touch input routing, separate from gameplay. */
export function bindInput({keys,interact,ping}){
const $=id=>document.getElementById(id);
window.addEventListener('keydown',e=>{let k=e.key.length===1?e.key.toLowerCase():e.key;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','Shift'].includes(k))e.preventDefault();keys.add(k);if((k==='e'||k==='Enter')&&!e.repeat){interact();ping(188,.12)}});window.addEventListener('keyup',e=>keys.delete(e.key.length===1?e.key.toLowerCase():e.key));window.addEventListener('blur',()=>keys.clear());
for(let b of document.querySelectorAll('[data-key]')){let k=b.dataset.key;const down=e=>{e.preventDefault();keys.add(k)},up=e=>{e.preventDefault();keys.delete(k)};b.addEventListener('pointerdown',down);b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up);b.addEventListener('pointerleave',up)}$('touchE').onclick=interact;

}
