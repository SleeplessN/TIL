# 44장. REST API

> **REST(REpresentational State Transfer)는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처**를 의미하고,
**REST API는 REST를 기반으로 서비스 API를 구현한 것을 의미**한다.
> 

## REST API의 구성

- REST API는 자원, 행위, 표현 3가지 요소로 구성된다

| 구성 요소 | 내용 | 표현 방법 |
| --- | --- | --- |
| 자원(resouce) | 자원 | URI(엔드포인트) |
| 행위(verb) | 자원에 대한 행위 | HTTP 요청 메서드 |
| 표현(representations) | 자원에 대한 행위의 구체적 내용 | 페이로드 |

> 🖐 **페이로드(payload)란?**
**페이로드는 사용에 있어서 전송되는 데이터**를 뜻한다. 페이로드는 전송의 근본적인 목적이 되는 데이터의 일부분으로 그 데이터와 함께 전송되는 헤더와 메타데이터와 같은 데이터는 제외한다.
> 

## REST API 설계 원칙

> REST에서 가장 중요한 기본적인 원칙
> 
> 1. **URI는 리소스를 표현**하는데 집중해야 한다.
> 2. **행위에 대한 정의는 HTTP 요청 메서드**를 통해 한다.

### 1. URI는 리소스를 표현해야 한다.

- **URI는 리소스를 표현하는 데 중정을 두어야한다.**
- 리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용한다.

```jsx
# bad
GET /getTodos/1
GET /todos/show/1

# good
GET /todos/1
```

### 2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.

- HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적(리소스에 대한 행위)를 알리는 방법이다.
- 주로 5가지 요청 메서드(GET, POST, PUT, PATCH, DELETE 등)을 사용하여 CRUD를 구현한다.

> 🖐 **CRUD**
는 대부분의 컴퓨터 소프트웨어 가 가지는 기본적인 데이터 처리 기능인 **Create(생성), Read(읽기), Update(갱신), Delete(삭제)를 묶어서 일컫는 말**이다.
> 

| HTTP 요청 메서드 | 종류 | 목적 | 페이로드 |
| --- | --- | --- | --- |
| GET | index/retrieve | 모든/특정 리소스 취득 | ❌ |
| POST | create | 리소스 생성 | ⭕️ |
| PUT | replace | 리소스의 전체 교체 | ⭕️ |
| PATCH | modify | 리소스의 일부 수정 | ⭕️ |
| DELETE | delete | 모든/특정 리소스 삭제 | ❌ |
- 리소스에 대한 행위는 HTTP 요청 메서드를 통해 표현하며 URI에 표현되지 않는다.

```jsx
# bad
GET /todos/delete/1

# good
DELETE /todos/1
```

## JSON Server를 이용한 REST API 실습

### 1. JSON Server 설치

> JSON Server는 json 파일을 사용하여 가상 REST API 서버를 구축할 수 있는 툴이다.
> 
- 터미널

```jsx
$ mkdir json-server-exan && cd json-server-exam
$ npm init -y
$ npm install json-server --save-dev
```

### 2. db.json 파일 생성

> db.json 파일은 리소스를 제공하는 데이터베이스 역할을 한다.
> 
- 프로젝트 루트 폴더(/json-server-exam)에 다음과 같이 db.json 파일을 생성한다

```jsx
{
  "todos": [
    {
      "id": 1,
      "content": "HTML",
      "completed": true
    },
    {
      "id": 2,
      "content": "CSS",
      "completed": false
    },
    {
      "id": 3,
      "content": "Javascript",
      "completed": true
    }
  ]
}
```

- 실습 부분은 [https://poiemaweb.com/js-rest-api](https://poiemaweb.com/js-rest-api) 참고