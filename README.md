# RKDBTI?

Next.js로 구현한 애니메이션 캐릭터 유형별 성격을 진단하는 심리 테스트 페이지 입니다.

## Getting Started

1. 다음의 명령어를 실행합니다.

```
yarn install
cd dkc
docker-compose up --build -d
```

2. 캐릭터 정보(characters.json)를 mongodb에 옮기기 위해 API를 호출합니다.

```
curl http://localhost:8880/api/init
```

## Environment variables Example

```
MONGO_HOST=mongo
MONGO_PORT=27017
MONGO_USER="mongouser"
MONGO_PASS="mongopassword"
MONGO_DATABASE="mychar_db"

REDIS_URI=redis://redis:6379

NEXT_PUBLIC_KAKAO_API_KEY="yourkakaoapikey"
NEXT_PUBLIC_FIREBASE_API_KEY="fbapikey"
NEXT_PUBLIC_FIREBASE_APP_ID="fbappid"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="fbsenderid"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="fbmid"
```

## Pages

- `/`: 메인
- `/test`: 테스트 수행 페이지
- `/result`: 결과 페이지
