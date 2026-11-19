/* Species-specific dialogue/identity. New monster girls get their own data modules. */
export const ARACHNE={id:'arachne',name:'세라',species:'아라크네',room:'B-03',spritePrefix:'arachne',mutationThresholds:[25,51,76,94]};
export const ARACHNE_RAGE_LINES=['네가 내 둥지를 찢었지!!','전부 네 탓이야.','왜 건드렸어?!','도망쳐 봐, 끝까지 쫓아갈 테니까.','이제 네 차례야.','내 집을 돌려내!!','거기 서!!!','도망갈 수 있을 것 같아?','다 찢어버릴 거야!','관리관!! 네가 먼저 시작했잖아!!'];
export const ARACHNE_ACTION_TEXT={
talk:'세라가 당신의 목소리를 듣고 조금 진정했습니다.',
feed:'세라가 특식을 받아 기쁘게 웃습니다.',
sample:'거미줄 샘플을 채집했습니다. 세라가 자신의 둥지를 지키려 합니다.',
nest:'둥지를 강제로 철거했습니다. 세라의 미소가 사라졌습니다.'
};
export function arachneReplies(stage){return {
talk:stage>=2?'...입에 발린 말은 그만해요.':'관리관님과 이야기하면 마음이 놓여요.',
feed:stage>=2?'이걸로 달래질 줄 알아요?':'와, 제가 제일 좋아하는 거예요!',
sample:'그거 내 실이잖아! 그만 가져가!',
nest:'내 집을 부수지 마!! 하지 말라고!!!'
}}
