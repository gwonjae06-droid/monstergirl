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

## 모듈화 2단계 (2026-11-19)
- `src/core/main.js`: 화면·상태 흐름을 조립하는 엔트리포인트만 담당. 신규 적 AI나 연출 코드를 여기에 직접 작성하지 않습니다.
- `src/simulation/MonsterAI.js`: 이동/추격과 접촉 이벤트. 세계 이동·길찾기는 `world/Spatial.js`가 담당.
- `src/scenario/ArachneScenario.js`: 변이 단계별 대사와 상황 이벤트. 이후 신규 괴이종은 시나리오 파일을 분리합니다.
- `src/animation/MonsterMotion.js`: 행동에 따른 캐릭터 자세 변형 수치. 실제 그림을 그리는 `rendering/MonsterRenderer.js`와 독립.
- `src/effects/ActionEffects.js`: 작업 장면의 캔버스 장식; `SpeechBubble.js`: 평상시 대사; `RageTypography.js`: 비상사태 분노 활자.
- `src/effects/VisualEffects.js`: 위 이펙트를 묶고 파티클 생명주기·타이밍을 관리하는 호환 어댑터.

### 다음 업데이트의 실제 작업 순서
1. `content`에 종족·말투·대사·단계별 데이터 추가
2. `assets/characters`에 새 픽셀 원화·방향별 스프라이트 시트 추가
3. `simulation`과 `scenario`에 신규 생물 행동·시나리오 작성
4. `animation`에 행동 모션 정의, `rendering`에 실제 프레임 그리기 연결
5. `effects`에 해당 작업의 전용 연출 추가, `audio`에 SFX/BGM 연결
6. `core`에는 생성·등록·이벤트 연결만 추가하고 `npm test` 실행

**현재 한계:** 한 마리(세라)와 단일 근무 시나리오만 지원합니다. 두 마리 이상 동시 관리 전에는 EntityRegistry / ScenarioDirector 및 UI 동적 개체 선택이 필요합니다. 기존 정지 아트만으로 손·다리의 진짜 프레임 애니메이션이 생기지는 않습니다.
