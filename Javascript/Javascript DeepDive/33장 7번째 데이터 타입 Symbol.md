# 33장. 7번째 데이터 타입 Symbol

## 심벌이란?

> **심벌(Symbol)은 다른 값과 절대 중복되지 않는 유일무이한 값이다.**

- 특징
  - 원시값이기 때문에 **변경 불가능**하다.
  - 외부로 노출되지 않아 확인할 수 없다.
  - 주로 이름의 충돌 위험이 없는 **유일한 프로퍼티 키를 만들기 위해 사용**한다.

## 심벌 값의 생성

### Symbol 함수

> 심벌 값은 다른 원시값과는 달리 **반드시 Symbol 함수를 호출하여 생성**한다.

```jsx
const mySymbol = Symbol();
console.log(typeof mySymbol); // symbol

console.log(mySymbol); // Symbol()
```

- 호출될 때마다 유일무이한 심벌 값을 생성한다.
- 언뜻 보면 생성자 함수로 객체를 생성하는 것처럼 보이지만 new 연산자와 함께 호출되지 않는다
- Symbol 함수에는 선택적으로 문자열을 인수로 전달할 수 있다
  - 이 문자열은 생성된 심벌값에 대한 설명이다
  - 디버깅 용도이다.
  - 심벌값 생성에 어떠한 영향도 주지 않는다.
- 심벌 값도 원시값이기 대문에 객체처럼 접근하면 래퍼 객체를 생성한다.
- 심벌 값은
  - 암묵적으로 문자열과 숫자 타입으로 변환 X
  - 암묵적으로 불리언 타입으로 변환 O

### Symbol.for / Symbol.keyFor 메서드

1. **`Symbol.for`**

- `Symbol.for` 메서드는 인수로 전달받은 문자열을 키로 사용하여 심벌 레지스트리에서 해당 키와 일치하는 심벌 값을 검색한다.
  - 검색에 **성공**시 : 검색된 심벌 값을 반환
  - 검색에 **실패**시 : 새로운 심벌 값을 생성하여 `Symbol.for` 메서드의 인수로 전달된 키로 전역 심벌 레지스트리에 저장하고, 생성된 심벌값을 반환
- Symbol 함수는 호출할 때마다 심벌 값을 생성하는데 `Symbol.for`를 사용하면 심벌 값을 단 하나만 생성하여 공유한다.

```jsx
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 생성
const s1 = Symbol.for("mySymbol");
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 있으면 해당 심벌 값을 반환
const s2 = Symbol.for("mySymbol");

console.log(s1 === s2); // true
```

1. **`Symbol.keyFor`**

- Symbol.keyFor 메서드를 사용하면 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있다.

```jsx
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 생성
const s1 = Symbol.for("mySymbol");
// 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
Symbol.keyFor(s1); // mySymbol
```

## 심벌과 상수

- 값에는 특별한 의미가 없고 상수 이름 자체에 의미가 있는 경우에 사용할 수 있다.

```jsx
// 위, 아래, 왼쪽, 오른쪽을 나타내는 상수를 정의한다.
// 중복될 가능성이 없는 심벌 값으로 상수 값을 생성한다.
const Direction = {
  UP: Symbol("up"),
  DOWN: Symbol("down"),
  LEFT: Symbol("left"),
  RIGHT: Symbol("right"),
};

const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
  console.log("You are going UP.");
}
```

- 참고) enum

  - 명명된 숫자 상수의 집합으로 열거형이라 부른다
  - 자바스크립트에서는 이를 지원하지 않지만 Object.freeze를 사용하여 흉내낼 수 있다.

  ```jsx
  // JavaScript enum
  // Direction 객체는 불변 객체이며 프로퍼티는 유일무이한 값이다.
  const Direction = Object.freeze({
    UP: Symbol("up"),
    DOWN: Symbol("down"),
    LEFT: Symbol("left"),
    RIGHT: Symbol("right"),
  });

  const myDirection = Direction.UP;

  if (myDirection === Direction.UP) {
    console.log("You are going UP.");
  }
  ```

## 심벌과 프로퍼티 키

> 객체의 프로퍼티 키는 빈 문자열을 포함하는 모든 문자열 또는 심벌 값으로 만들 수 있으며, 동적으로 생성할 수도 있다.

```jsx
const obj = {
  // 심벌 값으로 프로퍼티 키를 생성
  [Symbol.for("mySymbol")]: 1,
};

obj[Symbol.for("mySymbol")]; // -> 1
```

## 심벌과 프로퍼티 은닉

> 심벌 값을 프로퍼티 키로 사용하여 프로퍼티를 생성하면 외부에 노출할 필요가 없는 프로퍼티를 은닉할 수 있다.

- 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티는 `for … in` 문이나 `Object.keys`, `Object.getOwnPropertyNames` 메서드로 찾을 수 없다.
- 하지만 `Object.getOwnPropertySymbols` 메서드를 사용하면 찾을 수 있다.

```jsx
const obj = {
  // 심벌 값으로 프로퍼티 키를 생성
  [Symbol("mySymbol")]: 1,
};

for (const key in obj) {
  console.log(key); // 아무것도 출력되지 않는다.
}

console.log(Object.keys(obj)); // []
console.log(Object.getOwnPropertyNames(obj)); // []

// getOwnPropertySymbols 메서드는 인수로 전달한 객체의 심벌 프로퍼티 키를 배열로 반환한다.
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(mySymbol)]

// getOwnPropertySymbols 메서드로 심벌 값도 찾을 수 있다.
const symbolKey1 = Object.getOwnPropertySymbols(obj)[0];
console.log(obj[symbolKey1]); // 1
```

## 심벌과 표준 빌트인 객체 확장

- 일반적으로 표준 빌트인 객체에 사용자 정의 메서드를 직접 추가하여 확장하는 것은 권장하지 않는다.
  즉, 읽기 전용으로 사용하는 것이 좋다. - 이유는 사용자 정의 메서드가 미래에 표준 사양으로 추가될 메서드의 이름과 중복될 수 있다.
- **하지만, 심벌 값으로 프로퍼티 키를 생성하여 표준 빌트인 객체를 확장하면 표준 빌트인 객체의 기존 프로퍼티 키와 충돌하지 않는다.**
  - **또한 미래에 추가될 수 있는 프로퍼티 키와도 충돌할 위험이 없다.**

```jsx
// 심벌 값으로 프로퍼티 키를 동적 생성하면 다른 프로퍼티 키와 절대 충돌하지 않아 안전하다.
Array.prototype[Symbol.for("sum")] = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
};

[1, 2][Symbol.for("sum")](); // -> 3
```

## Well-known Symbol

> Well-known Symbol은 자바스크립트가 기본 제공하는 빌트인 심벌 값을 말한다.

<img src="./33장 7번째 데이터 타입 Symbol-images/Untitled.png" width="500">

- Well-known Symbol은 자바스크립트 엔진의 내부 알고리즘에 사용된다.
  - 예를 들어, Array, String, Map, Set, TypeArray, arguments, NodeList, HTMLCollection 등과 같이 `for .. of`문으로 순회 가능한 빌트인 이터러블은 Well-known Symbol인 `Symbol.iterator`를 키로 갖는 메서드를 가진다.

```jsx
// 1 ~ 5 범위의 정수로 이루어진 이터러블
const iterable = {
  // Symbol.iterator 메서드를 구현하여 이터러블 프로토콜을 준수
  [Symbol.iterator]() {
    let cur = 1;
    const max = 5;
    // Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환
    return {
      next() {
        return { value: cur++, done: cur > max + 1 };
      },
    };
  },
};

for (const num of iterable) {
  console.log(num); // 1 2 3 4 5
}
```

- 이때 이터레이션 프로토콜을 준수하기 위해 일반 객체에 추가해야하는 **메서드의 키 `Symbol.iterator`는 기존 프로퍼티 키 또는 미래에 추가될 프로퍼티 키와 절대로 중복되지 않는다.**

> **심벌은 중복되지 않는 상수 값을 생성하는 것은 물론 기존에 작성된 코드에 영향을 주지 않고 새로운 프로퍼티를 추가하기 위해, 즉 하위 호환성을 보장하기 위해 도입되었다.**
