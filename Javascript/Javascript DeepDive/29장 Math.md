# 29장. Math

> 표준 빌트인 객체인 `Math`는 **수학적인 상수와 함수를 위한 프로퍼티와 메서드를 제공한다.**
> `Math`는 생성자 함수가 아니므로 정적 프로퍼티와 정적 메서드만을 제공한다

## Math 프로퍼티

### Math.PI

> **원주율 PI 값(_π = 3.14159…_)을 반환한다**

## Math 메서드

### Math.abs [절대값 반환]

### Math.round [반올림]

### Math.ceil [올림]

### Math.floor [내림]

### Math.sqrt [제곱근 반환]

### Math.random

> **임의의 난수(랜덤 숫자)를 반환한다**.
> Math.random 이 반환하는 난수는 **0이상 1미만의 실수**이다.

```jsx
// 1에서 10 범위의 랜덤 정수를 받고자 할 때
const random = Math.floor(Math.random() * 10 + 1);
console.log(random); // 1에서 10 범위의 정수
```

### Math.pow [거듭 제곱]

### Math.max [가장 큰 수 반환]

> 전달받은 인수 중 가장 큰 수를 반환한다.

- 인수가 전달되지 않으면 `-Infinity`를 반환한다.

### Math.min [가장 작은 수 반환]

> 전달받은 인수 중 가장 작은 수를 반환한다.

- 인수가 전달되지 않으면 `Infinity`를 반환한다.
