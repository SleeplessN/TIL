# 28장. Number

## Number 생성자 함수

> **표준 빌트인 객체인 Number 객체는 생성자 함수 객체다.**
> 따라서 new 연산자와 함께 호출하여 Number 인스턴스를 생성할 수 있다.

- Number 생성자 함수에 new 연산자와 함께 호출하면 `[[NumberData]]` 내부 슬롯에 인수를 전달받은 숫자를 할당한 Number 래퍼 객체를 생성한다.
  > **🖐 래퍼 객체란?
  > 문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시 객체를 말한다.**
  - 인수를 숫자로 변경하지 못하는 경우에는 `NaN`을 할당한다

## Number 프로퍼티

### Number.EPSILON

> **1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이와 같다.**
> 약 `2^-52`의 값을 갖는다.

- 주로 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용한다

```jsx
// 부동소수점으로 인해 발생하는 오류
0.1 + 0.2; // 0.3000000000000004
0.3 + 0.2 === 0.3; // false

// Number.EPSILON 활용
function isEqual(a, b) {
  // a와 b를 뺀 값의 절대값이 Number.EPSILON보다 작으면 같은 수로 인정한다.
  return Math.abs(a - b) < Number.EPSILON;
}

isEqual(0.1 + 0.2, 0.3); // true
```

### Number.MAX_VALUE, Number.MIN.VALUE

> 자바스크립트에서 **표현할 수 있는 가장 큰 양수 값**(`2^1024`)**과 가장 작은 양수값(**`5 x 10^-324`**)을 나타낸다.**

- `Number.MAX_VALUE` 보다 큰 숫자는 `Infinity` 이다.
- `Number.MIN_VALUE` 보다 작은 숫자는 `0` 이다

### Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER

> 자바스크립트에서 **안전하게** **표현할 수 있는 가장 큰 정수값과 가장 작은 정수값을 나타낸다.**

- JavaScript가 `IEEE 754` 에 기술된 **배정밀도 부동소숫점 형식 숫자체계** 를 사용하기 때문에 `-(2^53 - 1)` ~ `2^53 - 1`사이의 수만 안전하게 표현할 수 있다.

### Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY

> **양의 무한대와 음의 무한대를 나타낸다.**

### Number.NaN

> **숫자가 아님(Not-a-Number)을 나타내는 숫자값이다.**

## Number 메서드

- Number의 정적 메서드는 **암묵적 타입 변환을 하지 않기에** 인수가 `NaN`이면 항상 `false`를 반환한다.

### Number.isFinite

> 전달된 인수가 **유한수인지 검사하여 불리언 값으로 반환한다.**

### Number.isInteger

> 전달된 인수가 **정수인지 검사하여 불리언 값으로 반환한다.**

### Number.isNaN

> 전달된 인수가 **NaN인지 검사하여 불리언 값으로 반환한다.**

### Number.isSafeInteger

> 전달된 인수가 **안전한 정수인지 검사하여 불리언 값으로 반환한다**

### Number.prototype.toExponential

> 숫자를 **지수 표기법으로 변환하여 문자열로 반환한다.**

- 인수로 표현할 자릿수를 전달할 수 있다.
  ```jsx
  (77.1234).toExponential(); // 7.71234e+1
  (77.1234).toExponential(4); // 7.71234e+1
  (77.1234).toExponential(2); // 7.71e+1
  ```
- `.`의 의미는 1. 부동 소수점 숫자의 소수 구분 기호, 2. 객체 프로퍼티에 접근하기 위한 프로퍼티 접근 연산자가 존재한다.
  - 숫자 리터럴로 접근할 경우 1번으로 해석핸다
  ```jsx
  77.toExponential(); // SyntaxError: Invalid of unexpected token
  ```

### Number.prototype.toFixed

> **숫자를 반올림하여 문자열로 반환한다.**

- 인수로 소숫점 이하 자릿수를 정한다.

### Number.prototype.toPrecision

> **인수로 전달 받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환한다.**

- 전체 자릿수로 표현할 수 없는 경우 지수 표기법으로 반환한다.

### ⭐️ Number.prototype.toString

> **숫자를 문자열로 변환하여 반환한다.**

- **숫자를 원하는 진수 문자열로 변환하는 경우 많이 사용한다.**
  ```jsx
  (10).toString(); // "10"
  // 10진수 숫자 -> 2진수 문자열로 변환
  (16).toString(2); // "10000"
  // 10진수 숫자 -> 8진수 문자열로 변환
  (16).toString(8); // "20"
  // 10진수 숫자 -> 16진수 문자열로 변환
  (16).toString(16); // "10"
  ```
