# 43장. Ajax

> Ajax란 자바스크립트를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식을 말한다.
> 
- Ajax(Asynchronous Javascript And XML)는 브라우저에서 제공하는 Web API인 XMLHttpRequest 객체를 기반으로 동작한다.
    - XMLHttpRequest는 HTTP 비동기 통신을 위한 메서드와 프로퍼티를 제공
- 장점
    - 변경에 필요한 데이터만 서버로부터 전송받기 때문에 불필요한 데이터 통신이 발생하지 않는다.
    - 변경할 필요가 없는 부분은 다시 렌더링 하지 않는다. (화면 깜빡임 X)
    - 클라이언트와 서버와의 통신이 비동기 방식으로 동작하므로 블로킹이 발생하지 않는다.
- 이를 통해 브라우저에서도 데스크톱 애플리케이션과 유사한 퍼포먼스와 브드라운 화면전환이 가능해졌다
    
    

## JSON

> JSON은 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷이다.
> 
- 자바스크립트에 종속되지 않은 언어 독립형 데이터 포맷으로, 대부분의 프로그래밍 언어에서 사용할 수 있다.

### JSON 표기 방식

> JSON은 자바스크립트의 객체 리터럴과 유사하게 키와 값으로 구성된 순수한 텍스트이다.
> 

```json
{
	"name": "Lee",
	"age": 20,
	"alive": true,
	"hobby": ["traveling", "tennis"]
}
```

- JSON의 **키는 반드시 큰따옴표**(작은따옴표 불가)로 묶어야 한다.

### JSON.stringify

> JSON.stringify 메서드는 **객체를 JSON 포맷의 문자열로 변환**한다.
> 

```jsx
// 구문
JSON.stringify(value[, replacer[, space]])
```

- 클라이언트가 서버로 객체를 전송하려면 **객체를 문자열화**해야하는데 이를 `직렬화`라한다

```jsx
const obj = {
  name: 'Lee',
  age: 20,
  alive: true,
  hobby: ['traveling', 'tennis']
};

// 객체를 JSON 포맷의 문자열로 변환한다.
const json = JSON.stringify(obj);
console.log(typeof json, json);
// string {"name":"Lee","age":20,"alive":true,"hobby":["traveling","tennis"]}
```

- 객체도 JSON 포맷의 문자열로 변환한다.

```jsx
const todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];

// 배열을 JSON 포맷의 문자열로 변환한다.
const json = JSON.stringify(todos, null, 2);
console.log(typeof json, json);
/*
string [
  {
    "id": 1,
    "content": "HTML",
    "completed": false
  },
  ...
]
*/
```

### JSON.parse

> JSON.parse 메서드는 **JSON 포맷의 문자열을 객체로 변환**한다.
> 

```jsx
// 구문
JSON.parse(text[, reviver])
```

- 문자열을 객체로서 사용하려면 **JSON 포맷의 문자열을 객체화**해야 하는데 이를 `역질렬화`라 한다

```jsx
const obj = {
  name: 'Lee',
  age: 20,
  alive: true,
  hobby: ['traveling', 'tennis']
};

// 객체를 JSON 포맷의 문자열로 변환한다.
const json = JSON.stringify(obj);

// JSON 포맷의 문자열을 객체로 변환한다.
const parsed = JSON.parse(json);
console.log(typeof parsed, parsed);
// object {name: "Lee", age: 20, alive: true, hobby: ["traveling", "tennis"]}
```

- 배열이 JSON 포맷의 문자열로 변환되어 있는 경우 문자열을 배열 객체로 변환한다. 배열의 오소가 객체인 경우 배열의 요소까지 객체로 변환한다.

```jsx
const todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];

// 배열을 JSON 포맷의 문자열로 변환한다.
const json = JSON.stringify(todos);

// JSON 포맷의 문자열을 배열로 변환한다. 배열의 요소까지 객체로 변환된다.
const parsed = JSON.parse(json);
console.log(typeof parsed, parsed);
/*
 object [
  { id: 1, content: 'HTML', completed: false },
  ...
]
*/
```

## XMLHttpRequest

- 브라우저는 주소창이나 HTML의 `form` 태그 또는 `a` 태그를 통해 HTTP 요청 전송 기능을 기본 제공한다.
- Web API인 XMLHttpRequest는 HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 메서드와 프로퍼티를 제공한다.

### XMLHttpRequest 객체 생성

```jsx
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();
```

### XMLHttpRequest 객체의 프로퍼티와 메서드

- 중요한 프로퍼티와 메서드 위주로 작성
1. XMLHttpRequest 객체의 프로토타입 프로퍼티

| 프로포타입 프로퍼티 | 설명 |
| --- | --- |
| readyState | HTTP 요청의 현재 상태
- UNSENT : 0
- OPENED : 1
- HEADERS_RECEIVED: 2
- LOADING : 3
- DONE : 4 |
| status | HTTP 요청에 대한 응답 상태 (ex. 200) |
| statusText | HTPP 요청에 대한 응답 메시지 (ex. “OK”) |
| responseType | HTTP 응답 타입 (ex. document, json, text, …) |
| response | HTTP 요청에 대한 응답 몸체 |
1. XMLHttpRequest 객체의 이벤트 핸들러 프로퍼티

| 이벤트 핸들러 프로퍼티 | 설명 |
| --- | --- |
| onreadystatechange | readyState 프로퍼티 값이 변경된 경우 |
| onerror | HTTP 요청에 에러가 발생한 경우 |
| onload | HTTP 요청이 성공적으로 완료한 경우 |
1. XMLHttpRequest 객체의 메서드

| 메서드 | 설명 |
| --- | --- |
| open | HTTP 요청 초기화 |
| send | HTTP 요청 전송 |
| abort | 이미 전송된 HTTP 요청 중단 |
| setRequestHeader | 특정 HTTP 요청 헤더의 값을 설정 |
1. XMLHttpRequest 객체의 정적 프로퍼티

| 정적 프로퍼티 | 값 | 설명 |
| --- | --- | --- |
| DONE | 4 | 서버 응답 완료 |

### HTTP 요청 전송

- HTTP 요청을 전송하는 경우 다음 순서를 따른다
1. `XMLHttpRequest.prototype.open` 메서드로 **HTTP 요청을 초기화**한다.
2. 필요에 따라 `XMLHttpRequest.prototype.setRequestHeader` 메서드로 특정 **HTTP 요청의 헤더 값을 설정**한다.
3. `XMLHttpRequest.prototype.send` 메서드로 **HTTP 요청을 전송**한다.

```jsx
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open('GET', '/users');

// HTTP 요청 헤더 설정
// 클라이언트가 서버로 전송할 데이터의 MIME 타입 지정: json
xhr.setRequestHeader('content-type', 'application/json');

// HTTP 요청 전송
xhr.send();
```

- HTTP 요청 메서드
    
    
    | HTTP  요청 메서드 | 종류 | 목적 | 페이로드 |
    | --- | --- | --- | --- |
    | GET | index/retrieve | 모든/특정 리소스 취득 | ❌ |
    | POST | create | 리소스 생성 | ⭕️ |
    | PUT | replace | 리소스의 전체 교체 | ⭕️ |
    | PATCH | modify | 리소스의 일부 수정 | ⭕️ |
    | DELETE | delete | 모든/특정 리소스 삭제 | ❌ |
    - HTTP 요청 메서드가 GET인 경우 send 메서드에 페이로드로 전달한 인수는 무시되고 요청 몸체는 null로 설정된다.
    

### HTTP 응답 처리

- 서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야 한다.
- HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티 값이 변경된 경우 발생하는 **readystatechange 이벤트를 캐치하여 HTTP 응답을 처리**한다

```jsx
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
// https://jsonplaceholder.typicode.com은 Fake REST API를 제공하는 서비스다.
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

// HTTP 요청 전송
xhr.send();

// readystatechange 이벤트는 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티가
// 변경될 때마다 발생한다.
xhr.onreadystatechange = () => {
  // readyState 프로퍼티는 HTTP 요청의 현재 상태를 나타낸다.
  // readyState 프로퍼티 값이 4(XMLHttpRequest.DONE)가 아니면 서버 응답이 완료되지 상태다.
  // 만약 서버 응답이 아직 완료되지 않았다면 아무런 처리를 하지 않는다.
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  // status 프로퍼티는 응답 상태 코드를 나타낸다.
  // status 프로퍼티 값이 200이면 정상적으로 응답된 상태이고
  // status 프로퍼티 값이 200이 아니면 에러가 발생한 상태다.
  // 정상적으로 응답된 상태라면 response 프로퍼티에 서버의 응답 결과가 담겨 있다.
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response));
    // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
  } else {
    console.error('Error', xhr.status, xhr.statusText);
  }
};
```

- load 이벤트를 캐치해도 된다

```jsx
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
// https://jsonplaceholder.typicode.com은 Fake REST API를 제공하는 서비스다.
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

// HTTP 요청 전송
xhr.send();

// load 이벤트는 HTTP 요청이 성공적으로 완료된 경우 발생한다.
xhr.onload = () => {
  // status 프로퍼티는 응답 상태 코드를 나타낸다.
  // status 프로퍼티 값이 200이면 정상적으로 응답된 상태이고
  // status 프로퍼티 값이 200이 아니면 에러가 발생한 상태다.
  // 정상적으로 응답된 상태라면 response 프로퍼티에 서버의 응답 결과가 담겨 있다.
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response));
    // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
  } else {
    console.error('Error', xhr.status, xhr.statusText);
  }
};
```