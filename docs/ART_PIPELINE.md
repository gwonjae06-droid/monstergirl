# 픽셀아트 · 모델링 · 애니메이션 작업 규격

이 게임은 2D 픽셀 스프라이트 게임입니다. `modeling`은 현재 3D 메시가 아니라 **캐릭터 원화/파츠/스프라이트 아틀라스 제작 파이프라인**을 뜻합니다.

- `assets/characters`: 최종 게임용 투명 WebP/PNG. 아라크네 0~3은 정상/불안/변이/폭주 단계.
- `assets/characters/<name>/source/`: 추후 Aseprite 원본(.aseprite), 클립 분할 파츠.
- `src/rendering`: 스프라이트 그리기와 카메라 좌표 변환.
- `src/animation`: 프레임 속도와 상태 전환; 모션 키는 `idle / walk / talk / feed / sample / nest / mutate / chase` 사용 권장.
- `src/effects`: 스프라이트 위의 파티클과 화면 연출만 제어.
- `assets/audio/bgm` 및 `assets/audio/sfx`: 향후 사운드 파일 추가.

중요: 현재 기존 그림은 4단계 **정지 이미지**에 코드 기반 흔들림/반응을 결합한 프로토타입입니다. 정교한 손·거미다리·머리카락 개별 프레임 애니메이션은 아직 만들지 않았습니다.
