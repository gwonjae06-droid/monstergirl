/** Story beats and dialogue for the Arachne scenario. No DOM, canvas or engine state. */
export function dispatchArachneStage({next,old,record,say,showSpeech,spawnRage,addFX,monster}){
 if(next===1){record('세라의 눈동자가 오래도록 당신을 따라옵니다.');showSpeech('괜찮아요... 만지지만 마세요.',4)}
 else if(next===2){record('등 뒤에 달린 다리들이 기이한 각도로 꺾이기 시작합니다.');showSpeech('내 거미줄에 손대지 말랬잖아요!',4)}
 else if(next===3){record('세라가 더는 인간의 모습으로 서 있지 못합니다.');showSpeech('한 번만 더 건드리면... 가만 안 둬!',4)}
 else if(next===4){record('격리 실패! 아라크네가 폭주했습니다.');say('⚠ 세라 폭주! 관제실의 봉쇄 장치로 달리세요!');spawnRage('내 둥지를 짓밟아 놓고 어딜 도망가!!');spawnRage('거기 서!!!');spawnRage('용서 안 해!!!');addFX('rage',monster.x,monster.y,80)}
 else if(next<old){record('개체의 이상징후가 일부 완화되었습니다.')}
}
