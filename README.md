# 괴이종 관리일지 (Monster Ward)

탑뷰 몬무스 관리·괴물화 공포게임. 아라크네 세라가 등장하는 플레이 가능한 웹 프로토타입을 **확장 가능한 ES 모듈 구조**로 분리했습니다.

## 바로 실행
GitHub Pages에서 `main / (root)` 배포를 활성화하면 됩니다. 로컬에서는 브라우저 모듈 보안 때문에 `index.html` 파일 직접 열기보다 `python -m http.server 8000` 후 `http://localhost:8000/` 로 실행하세요.

## 조작
WASD / 방향키 이동 · Shift 달리기 · E 상호작용 · 관리 패널의 행동 버튼으로 대화/특식/실 채집/둥지 정리. 위험도가 올라가면 세라가 변이하고 추격합니다. 관제실의 봉쇄 장치로 이동하면 비상 봉쇄가 가능합니다.

## 구조
- `src/core` — 게임 루프 및 입력
- `src/world` — 공간·충돌·경로 탐색
- `src/rendering` — 타일맵·플레이어·괴이종의 렌더링
- `src/animation` — 행동 애니메이션 데이터와 확장 규칙
- `src/effects` — 작업 파티클·말풍선·분노 대사
- `src/audio` — 중앙 오디오 라우팅 (현재는 단순 합성 효과음)
- `src/simulation` — 관리·변질 판정 순수 함수
- `src/content` — 괴이종별 설정과 대사
- `src/ui` — UI 갱신과 스타일
- `assets/characters` — 실제 픽셀 아트 캐릭터 이미지
- `docs` — 확장 절차 및 아트 규칙

기존 프로토타입의 게임 규칙과 실제 4단계 아라크네 스프라이트를 보존했으며, 향후 신규 몬무스는 데이터+이미지+고유 행동을 추가하는 방향으로 확장합니다. 자세한 내용은 `docs/ARCHITECTURE.md`를 참고하세요.

### 더 세분화된 확장 지점
괴이종 AI는 `simulation/MonsterAI.js`, 변질 시나리오는 `scenario/ArachneScenario.js`, 캐릭터 자세 변형은 `animation/MonsterMotion.js`, 행동/말풍선/분노 활자는 `effects`의 개별 모듈로 분리했습니다. `docs/ARCHITECTURE.md`에서 신규 콘텐츠 작업 순서를 확인하세요.
