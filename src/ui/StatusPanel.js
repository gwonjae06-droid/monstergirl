/* Side-panel presentation. Receives a read-only state snapshot. */
export function createStatusPanel({getSnapshot,distance}){
const $=id=>document.getElementById(id);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function updateUI(force){const {stage,player,monster,state,dialogue,stress,bond,samples}=getSnapshot();let stable=clamp(100-stress,0,100);$('stabilityValue').textContent=Math.round(stable)+'%';$('bondValue').textContent=Math.round(bond)+'%';$('mutationValue').textContent=Math.round(stress)+'%';$('stabilityBar').style.width=stable+'%';$('bondBar').style.width=bond+'%';$('mutationBar').style.width=stress+'%';$('samples').textContent=samples;let near=distance(player.x,player.y,monster.x,monster.y)<110&&stage<4;let enabled=dialogue&&near&&state==='play';document.querySelectorAll('[data-action]').forEach(b=>b.disabled=!enabled);$('actionNote').textContent=stage===4?'봉쇄 장치까지 도망쳐 E를 누르세요.':enabled?'행동은 세라의 안정도와 변질도에 영향을 줍니다.':near?'E로 상호작용하세요.':'세라의 가까이에서 E를 누르면 관리할 수 있습니다.';
$('mission').textContent=stage===4?`⚠ 비상사태! ${samples>0?'관제실(남쪽)의 봉쇄 장치로 이동해 E를 누르세요.':'관제실로 도망쳐 비상 봉쇄를 실행하세요.'}`:samples>=2?'관리가 끝났다면 사무실 책상에서 E를 눌러 보고서를 제출하세요. 실험을 계속하면 사고가 발생할 수도 있습니다.':stage>=2?'외형 변질이 관찰됩니다. 세라를 진정시키거나 연구용 거미줄 샘플을 채집하세요.':samples===1?'샘플 1개 확보. 진정시키면서 추가 샘플을 채집하거나 둥지를 정리하세요.':'세라의 격리실로 이동해 E를 누르세요. 연구용 실 샘플 2개가 필요합니다.';}

return {updateUI};
}
