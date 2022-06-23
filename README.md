## Getting Started

- 일반 실행 명령어:
```bash
# for development
./run.sh dev
# for production
./run.sh prd
```

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
`./run.sh dev`로 자동 생성되지만, 내용은 따로 적어주셔야합니다.
하지만 아직까지 비밀스러운 내용은 없어서 여기에 적어드릴게요..ㅋㅋㅋ
```
<.env.local>
MONGO_DATABASE="mychar_db"
<.env.production.local>
MONGO_HOST=mongo
MONGO_PORT=27017 

REDIS_URI=redis://redis:6379
```


- 현재까지 개발된 API

```
/api/result?typeNumber=<number>
가장 높은 점수를 받은 유형을 받아서 통계에 추가하고, 관련 정보를 내려줍니다.
(아직 세션별로 increment 제한은 개발안했음)
예시 데이터는 sample/api.result 확인
```

## 참고할만한 프로젝트들
- [Next.js + Mongodb](https://github.com/hoangvvo/nextjs-mongodb-app)
- [Next.js + typescript](https://github.com/vercel/next.js/tree/canary/examples/with-typescript)
- [Recoil](https://github.com/sudongyuer/mini-spotify)

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
```
- 서버는 비용절감을 위해 개인서버 이용예정
- 도메인은 3,000원/1년 대 저렴한거 쓰면될듯
- Adsense 붙이려면 사이트 승인기간 2~4주(오피셜)이라고함. 급하면 승인이 빠른 Adfit을 사용해도 될듯 (단가는 훨씬 낮음)
- 트위터 공유 ([https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview))
- 카카오톡 공유 ([https://developers.kakao.com/docs/latest/ko/message/js-link](https://developers.kakao.com/docs/latest/ko/message/js-link))
- SEO
