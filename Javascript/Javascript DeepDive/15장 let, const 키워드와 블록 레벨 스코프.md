# 15장. let, const 키워드와 블록 레벨 스코프

## var 키워드로 선언한 변수의 문제점

### 1. **변수 중복 선언 허용**

```jsx
var x = 1;
var y = 1;

var x = 100;
var y; // 초기화문이 없는 변수 선언문은 무시된다.

console.log(x); // 100
console.log(y); // 1
```

- 예제와 같이 초기화문의 유무에 따라 다르게 동작한다.

### 2. **함수 레벨 스코프**

- var 키워드로 선언한 변수는 **함수의 코드 블록** 만을 **지역 스코프** 로 인정한다.
- 즉, 함수 외부에서 var 키워드로 선언한 변수는 코드 블록(조건문, 반복문 등) 내에서 선언해도 모두 전역 변수가 된다.

```jsx
var x = 1;

if (true) {
  var x = 10;
}

console.log(x); // 10

var i = 10;

for (var i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}
console.log(i); // 5
```

### 3. **변수 호이스팅**

```jsx
console.log(foo); // undefined

foo = 123;

console.log(foo); // 123

var foo;
```

- 변수 호이스팅은 프로그램의 흐름상 맞지 않고 가독성을 떨어뜨리며 오류를 발생할 여지를 남긴다.

## let 키워드 (var와의 차이점)

### 1. **변수 중복 선언 금지**

```jsx
var foo = 123;
var foo = 456;

let bar = 123;
let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
```

### 2. **블록 레벨 스코프**

- let 키워드로 선언한 변수는 **모든 코드 블록** (함수, 조건문, 반복문, try/catch 문 등)을 지역 스코프로 인정하는 **블록 레벨 스코프**를 따른다.

```jsx
let foo = 1;
{
  let foo = 2;
  let bar = 3;
}
console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
```

- 함수도 코드 블록이므로 스코프를 만든다.
- 이 때, 함수 내의 코드 블록은 함수 레벨 스코프에 중첩된다.

```jsx
let i = 10;
function foo() {
  let i = 100;
  for (let i = 1; i < 3; i++) {
    console.log(i); // 1, 2
  }
  console.log(i); // 100
}
foo();
console.log(i); // 10
```

### 3. **변수 호이스팅**

- var 키워드와 달리 let 키워드로 선언한 변수는 변수 **호이스팅이 발생하지 않는 것처럼 동작**한다.
- var 키워드 선언의 경우, **런타임 이전에** 자바스크립트 엔진에 의해 암묵적으로 **선언 단계와 초기화 단계가 진행**되었다.
- let 키워드로 선언한 변수는 **선언 단계와 초기화 단계가 분리되어 진행**된다.
  - 런타임 이전에 암묵적으로 선언 단계만 먼저 실행되고
  - 초기화 단계는 변수 선언문에 도달했을 때 실행된다.

> 🖐 일시적 사각지대(Temporal Dead Zone, TDZ)란?
> `스코프의 시작지점 ~ 초기화 시작 지점`까지 변수를 참조할 수 없는 구간
>
> ```jsx
> console.log(foo); // ReferenceError. TDZ
>
> let foo;
> console.log(foo); // undefined
>
> foo = 1;
> console.log(foo); // 1
> ```
>
> 선언단계(`RefErr`) - 일시적 사각지대(TDZ)(`RefErr`) - 초기화 단계(`undefined`) - 할당 단계(`1`)
>
> let 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 보이지만..?
>
> ```jsx
> let foo = 1; // 전역 변수
> {
>   console.log(foo); // ReferenceError: TDZ
>   let foo = 2; // 지역 변수
> }
> ```
>
> 만약 호이스팅이 일어나지 않는다면 ReferenceError가 아닌 전역 변수 값을 출력했을 것이다.

### 4. **전역 객체와 let**

- var 키워드로 선언한 전역 변수와 전역 함수,그리고 선언하지 않은 변수에 값을 할당한 `암묵적 전역`은 **전역 객체 window의 프로퍼티**가 된다.(전역 객체의 프로퍼티를 참조할 때 window를 생략할 수 있다)

```jsx
// 브라우저 환경

var x = 1;
y = 2; // 암묵적 전역

function foo() {}

console.log(window.x); // 1
console.log(x); // 1
console.log(window.y); // 2
console.log(y); // 2

console.log(window.foo); // f foo() {}
console.log(foo); // f foo() {}
```

- let 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니며 위와 같이 접근할 수 없다.
- let 전역 변수는 보이지 않는 개념적 블록(전역 렉시컬 환경의 선언적 환경 레코드) 내에 존재하게 된다.

```jsx
//브라우저 환경
let x = 1;

console.log(window.x); // undefined
console.log(x); // 1
```

## const 키워드 (let 과의 차이점)

- const 키워드는 상수를 선언하기 위해 사용한다. 하지만 반드시 상수 만을 위해 사용하지 않는다.

### 1. **선언과 초기화**

- const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다

```jsx
const foo; // SyntaxError: Missing initializer in const declaration
const foo = 1;
```

- const 키워드로 선언한 변수는 let 키워드로 선언한 변수와 마찬가지로 블록 레벨 스코프를 가지며, **변수 호이스팅이 발생하지 않는 것처럼 동작**한다.

```jsx
{
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  const foo = 1;
  console.log(foo); // 1
}

// 블록 레벨 스코프를 갖는다
console.log(foo); // ReferenceError: foo is not defined
```

### 2. **재할당 금지**

- var, let 키워드로 선언한 변수는 재할당이 자유로우나 const 키워드로 선언한 변수는 재할당이 금지 된다
  ```jsx
  const foo = 1;
  foo = 2; // TypeError: Assignment to constant variable.
  ```

### 3. **상수**

- const 키워드로 선언한 변수에 원시 값을 할당한 경우 변수 값을 변경할 수 없다.
- 이러한 특징을 이용해 const 키워드를 상수를 표현하는데 사용하기도 한다
- 상수도 값을 저장하기 위한 메모리 공간이 필요하므로 **재할당이 금지된 변수**라고 말할 수 있다.
- 상수는 **상태 유지**와 **가독성**, **유지보수의 편의**를 위해 적극적으로!! 사용해야 한다. 일반적으로 상수는 대문자로 선언하며, `스네이크 케이스`로 표현한다.
  ```jsx
  const TAX_RATE = 0.1;

  let preTaxPrice = 100;

  let afterTaxPrice = preTaxPrice + preTaxPrice * TAX_RATE;

  console.log(afterTaxPrice); // 110
  ```

### 4. **const 키워드와 객체**

- const 키워드로 선언된 변수에 객체를 할당한 경우 값을 변경할 수 있다.
- 프로퍼티 동적 생성, 삭제, 프로퍼티 값의 변경을 통한 객체 변경이 가능하다.
  ```jsx
  const person = {
    name: "Lee",
  };

  person.name = "Kim";

  console.log(person); // {name: "Kim"}
  ```
  - 이 때, 객체가 변경되더라도 변수에 할당된 참조 값은 변경되지 않는다.

## **var vs let vs const**

- 변수 선언에는 기본적으로 const를 사용하고 let은 재할당이 필요한 경우 한정적으로 사용하는 것이 좋다.
  - **ES6를 사용한다면 var 키워드는 사용하지 않는다.**
  - 재할당이 필요한 경우에 한정해 let 키워드를 사용하고, 이때 변수의 스코프는 최대한 좁게 만든다.
  - 읽기 전용 원시 값과 객체에는 const 키워드를 사용한다.
