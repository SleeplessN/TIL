# 20장. strict mode

## strict mode란?

```jsx
function foo() {
  x = 10;
}
foo();

console.log(x); // ?
```

- 여기서 `x`는 선언되지 않았기 때문에 `ReferenceError`를 발생시킬 것 같지만 자바스크립트 엔진은 암묵적으로 전역 객체에 `x` 프로퍼티를 동적 생성하는데 이를 **암묵적 전역**이라 한다.
- 이러한 암묵적 전역은 오류를 발생시키는 원인이 될 가능성이 크기 때문에 `strict mode` 를 사용한다.
- `strict mode`는 ES5에 추가되었다.
- 

> 🖐 **ESLint**
ESLint같은 도구를 사용해도 `strict mode`와 유사한 효과를 얻을 수 있다.
린트 도구는 정적 분석 기능을 통해 소스코드를 실행하기 전에 소스코드를 스캔하여 문법적 오류만이 아니라 잠재적 오류까지 찾아내고 오류의 원인을 리포팅해주는 유용한 도구다.
> 

## strict mode의 적용

- 전역의 선두 또는 함수 몸체의 **선두에** `'use strict';`**를 추가**한다.
- 전역의 선두에 추가하면 전역 전체에, 함수 몸체의 선두에 추가하면 해당 함수와 중첩 함수에 적용된다.

## 전역에 strict mode를 적용하는 것은 피하자

- 전역에 적용한 `strict mode`는 스크립트 단위로 적용된다.
    - 스크립트 단위로 적용된 `strict mode`는 다른 스크립트에 영향을 주지 않고 해당 스크립트에 한정되어 적용된다.
- **`strict mode` 스크립트와 `non-strict mode` 스크립트를 혼용하는 것은 오류를 발생**시킬 수 있다
    - 특히, 외부 서드파티 라이브러리를 사용하는 경우, 라이브러리가 `non-strict mode`인 경우도 있기 때문에 전역 `strict mode`를 적용하는 것은 바람직하지 않다.
- 그럼 어떻게 사용해야 하지?
    - 즉시 실행함수로 스크립트 전체를 감싸서 스코프를 구분하고 **선두에** `strict mode`**를 적용**하는것이 바람직하다.
    

## 함수 단위로 strict mode를 적용하는 것도 피하자

- 함수 단위로도 `strict mode`를 적용할 수 있으나 모든 함수에 일일이 `strict mode`를 적용하는것은 번거롭고 바람직하지 못하기 때문에 **즉시 실행 함수로 감싼 스크립트 단위로 적용**하는것이 바람직하다.

## strict mode가 발생시키는 에러

### 암묵적 전역

- 선언하지 않은 변수를 참조하면 ReferenceError가 발생한다

```jsx
(function () {
  'use strict';

  x = 1;
  console.log(x); // ReferenceError: x is not defined
}());
```

### 변수, 함수, 매개변수의 삭제

- `delete` 연산자로 변수, 함수, 매개변수를 삭제하면 `SyntaxError`가 발생한다.

```jsx
(function () {
  'use strict';

  var x = 1;
  delete x;
  // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a;
    // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo;
  // SyntaxError: Delete of an unqualified identifier in strict mode.
}());
```

### 매개변수 이름의 중복

- 중복된 매개변수 이름을 사용하면 `SyntaxError`가 발생한다.

```jsx
(function () {
  'use strict';

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
}());
```

### with 문의 사용

- `with` 문을 사용하면 `SyntaxError`가 발생한다.
- `with`문은 성능과 가독성이 나빠지는 문제가 있기 때문에 **`with`문은 사용하지 않는 것**이 좋다.

## Strict mode 적용에 의한 변화

### 일반 함수의 this

- `strict mode`에서 함수를 일반 함수로서 호출하면 `this`에 `undefined`가 바인딩된다.
- 이는 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다.
- 이 때, 에러는 발생하지 않는다.

```jsx
(function () {
  'use strict';

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
}());
```

### arguments 객체

- `strict mode`에서는 매개변수에 전달된 인수를 재할당하여 변경해도 `arguments` 객체에 반영되지 않는다.

```jsx
(function (a) {
  'use strict';
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
}(1));
```