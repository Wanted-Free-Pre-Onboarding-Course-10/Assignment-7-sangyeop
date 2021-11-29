# Assignment7
원티드 X 위코드 프리 온보딩 카닥

## 설명

본 프로젝트는 원티드x위코드 백엔드 프리온보딩  [카닥](https://www.notion.so/wecode/0afde1d6649b43ed8bf620a9266f0190)에서 출제한 과제를 기반으로 제작 되었습니다.

 <details>

 
<summary> 필수포함사항  </summary>

- READ.ME 작성
    - 프로젝트 빌드, 자세한 실행 방법 명시
    - 구현 방법과 이유에 대한 간략한 설명
    - **서버 구조 및 디자인 패턴에 대한 개략적인 설명**
    - 완료된 시스템이 배포된 서버의 주소
    - 해당 과제를 진행하면서 회고 내용 블로그 포스팅
- Swagger나 Postman을 이용하여 API 테스트 가능하도록 구현

</details>


 <details>

<summary> 과제 안내 </summary>
 
## 1. 배경 및 공통 요구사항

<aside>
😁 **카닥에서 실제로 사용하는 프레임워크를 토대로 타이어 API를 설계 및 구현합니다.**

</aside>

- 데이터베이스 환경은 별도로 제공하지 않습니다.
 **RDB중 원하는 방식을 선택**하면 되며, sqlite3 같은 별도의 설치없이 이용 가능한 in-memory DB도 좋으며, 가능하다면 Docker로 준비하셔도 됩니다.
- 단, 결과 제출 시 README.md 파일에 실행 방법을 완벽히 서술하여 DB를 포함하여 전체적인 서버를 구동하는데 문제없도록 해야합니다.
- 데이터베이스 관련처리는 raw query가 아닌 **ORM을 이용하여 구현**합니다.
- Response Codes API를 성공적으로 호출할 경우 200번 코드를 반환하고, 그 외의 경우에는 아래의 코드로 반환합니다.

[Copy of Code](https://www.notion.so/08e67c3cdc8e471fb1aab50e5963fb05)

---

## 2. 사용자 생성 API

🎁 **요구사항**

- ID/Password로 사용자를 생성하는 API.
- 인증 토큰을 발급하고 이후의 API는 인증된 사용자만 호출할 수 있다.

```jsx
/* Request Body 예제 */

 { "id": "candycandy", "password": "ASdfdsf3232@" }
```

---

## 3. 사용자가 소유한 타이어 정보를 저장하는 API

🎁 **요구사항**

- 자동차 차종 ID(trimID)를 이용하여 사용자가 소유한 자동차 정보를 저장한다.
- 한 번에 최대 5명까지의 사용자에 대한 요청을 받을 수 있도록 해야한다. 즉 사용자 정보와 trimId 5쌍을 요청데이터로 하여금 API를 호출할 수 있다는 의미이다.

```jsx
/* Request Body 예제 */
[
  {
    "id": "candycandy",
    "trimId": 5000
  },
  {
    "id": "mylovewolkswagen",
    "trimId": 9000
  },
  {
    "id": "bmwwow",
    "trimId": 11000
  },
  {
    "id": "dreamcar",
    "trimId": 15000
  }
]
```

🔍 **상세구현 가이드**

- 자동차 정보 조회 API의 사용은 아래와 같이 5000, 9000부분에 trimId를 넘겨서 조회할 수 있다.
 **자동차 정보 조회 API 사용 예제 → 
📄** [https://dev.mycar.cardoc.co.kr/v1/trim/5000](https://dev.mycar.cardoc.co.kr/v1/trim/5000)
**📄** [https://dev.mycar.cardoc.co.kr/v1/trim/9000
📄](https://dev.mycar.cardoc.co.kr/v1/trim/9000) [https://dev.mycar.cardoc.co.kr/v1/trim/11000
📄](https://dev.mycar.cardoc.co.kr/v1/trim/11000) [https://dev.mycar.cardoc.co.kr/v1/trim/15000](https://dev.mycar.cardoc.co.kr/v1/trim/15000)
- 조회된 정보에서 타이어 정보는 spec → driving → frontTire/rearTire 에서 찾을 수 있다.
- 타이어 정보는 205/75R18의 포맷이 정상이다. 205는 타이어 폭을 의미하고 75R은 편평비, 그리고 마지막 18은 휠사이즈로써 {폭}/{편평비}R{18}과 같은 구조이다.
 위와 같은 형식의 데이터일 경우만 DB에 항목별로 나누어 서로다른 Column에 저장하도록 한다.

---

## 4. 사용자가 소유한 타이어 정보 조회 API

🎁 **요구사항**

- 사용자 ID를 통해서 2번 API에서 저장한 타이어 정보를 조회할 수 있어야 한다.
 
</details>





## 과제 구현사항

| 구현사항  | 구현 여부                                          |
|------- | ----------------------------------------------- |
| 회원가입 |  OK| 
| 로그인|  OK| 
| 단일 타이어 정보저장 |  OK|
| 복수 타이어 정보저장 |NO|
| 타이어 조회 |  NO| 





## 사용 스택

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/TYPEORM-red?style=for-the-badge&logo=TYPEORM&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/Amazon%20AWS-232F3E?style=for-the-badge&logo=Amazon%20AWS&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" />&nbsp;





## API
[API문서](https://documenter.getpostman.com/view/15919456/UVC3jnu9)

## API 테스트
배포 실패로 로컬에서 부탁드립니다.
1. 우측 링크를 클릭해서 postman으로 들어갑니다.[링크](https://www.postman.com/martian-satellite-348039/workspace/cardoc/overview) 
2. 테스트를 해주세요

## 설치 및 실행 방법

### 프로젝트 설치

```
git clone https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment-7-sangyeop.git

```

 ### 환경 구축 및 실행
```
//.env파일 존재해야 실행가능합니다.
npm install

npm run start:dev
```



