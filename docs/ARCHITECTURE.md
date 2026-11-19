# 게임 구조 / 확장 규약

## 의존 방향
`core`가 `simulation` / `world` / `rendering` / `audio` / `ui`를 조립합니다.
`simulation`은 DOM, Canvas, 오디오를 호출하지 않습니다.
`content`는 개체 데이터만 제공합니다.
`effects`는 게임 규칙을 직접 수정하지 않고 이벤트 반응만 표현합니다.

## 새 몬무스를 추가할 때
1. `src/content/<species>.js`에 ID, 종족, 변질 문턱, 대사, 행동 설정을 추가.
2. `assets/characters/<species>/`에 정상~폭주 스프라이트를 추가.
3. `src/simulation`에 종족별 행동/변질 판정 확장 (현재 기본 구현은 아라크네 전용).
4. `src/rendering`에 종족별 renderer/animation adapter를 등록.
5. `src/world`에 개체 격리구역·이동영역을 추가.
6. UI는 개체 ID에 따라 상태를 보여주도록 확장.

## 아직 범용화되지 않은 부분
현재 `main.js`는 아라크네 1개체의 이벤트·시나리오 진행을 직접 구성합니다. 2개체 이상을 추가하기 전 `EntityRegistry`와 `ScenarioDirector`로 이벤트 흐름을 옮기는 것이 다음 단계입니다. 이 저장소는 리팩터링 기초 버전이며 완성된 범용 게임엔진은 아닙니다.

## 렌더링 규칙
- 실제 스프라이트를 사용하고 인체를 사각형/원통 조립으로 대체하지 않음
- Canvas 배율 시 nearest-neighbor / imageSmoothingEnabled=false
- 일상모션은 파츠 및 프레임 조합, 변질은 단계별 독립 스프라이트
- 영상/음향 옵션을 중앙 시스템에서 제어
- 신규 애셋은 사용 권한과 파일 출처를 문서화
