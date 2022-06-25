## Getting Started

- 도커로 실행하기:

```
cd dkc
docker-compose up --build -d # 소스코드를 수정하여 이미지 빌드를 원할시 --build 붙여준다.
```

sample/mongo를 dkc/mongo에 복사하여 테스트 데이터가 들어간 채로 mongodb 시작가능합니다.

docker로 실행후 `http://localhost:8880` 접속하여 확인

- 환경변수:

```
.env.local 공용 환경변수
.env.production.local 프로덕션
.env.development.local 개발용
```

sample/.env.local에 예시 환경변수 설정을 적어두었습니다.

- 현재까지 개발된 API

```
/api/result?typeNumber=<number>
가장 높은 점수를 받은 유형을 받아서 통계에 추가하고, 관련 정보를 내려줍니다.
(아직 세션별로 increment 제한은 개발안했음)
예시 데이터는 sample/api.result 확인
```

## 계획

```
cloudflare

docker
 -- nginx
 -- mongodb
 -- next.js

firebase [링크](https://console.firebase.google.com/u/0/project/rkdbti/overview)

mongodb
 -- characters: 유형별 정보 collection
 -- statistics: 유형별 통계 collection
```

- 트위터 공유 ([https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview))
- 카카오톡 공유 ([https://developers.kakao.com/docs/latest/ko/message/js-link](https://developers.kakao.com/docs/latest/ko/message/js-link))
- SEO

## TODO List

- [ ] 스타일링, 컴포넌트 만들기
- [ ] 에러 페이지 생성
- [ ] Firebase 연동
- [ ] 서버에 docker 설치
- [ ] 도메인 설정
- [ ] 광고 붙이기
