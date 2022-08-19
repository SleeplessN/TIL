# 22장. this

- 객체는 상태(state)를 나타내는 프로퍼티와 동작(behavior)을 나타내는 메서드를 하나의 논리적인 단위로 묶은 복잡적인 자료구조이다.

## this 키워드

- 동작을 나타내는 메서드는 자신이 속한 객체의 상태, 즉 프로퍼티를 참조하고 변경할 수 있어야 한다.
- 이 때, 메서드가 자신이 속한 객체의 프로퍼티를 참조하려면 먼저 **자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.**

> `this`는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수(self-referencing variable)이다.
`this`를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.
> 
- `this`는 자바스크립트 엔진에 의해 암묵적으로 생성되며, 코드 어디서든 참조할 수 있다.
- 함수를 호출하면 `arguments` 객체와 `this`가 암묵적으로 함수 내부에 전달된다.
    - 함수 내부에서 `arguments`객체를 지역 변수처럼 사용할 수 있는 것처럼 `this`도 지역 변수처럼 사용할 수 있다
- `this`가 가리키는 값, 즉 `this` 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.

> 🖐 **this 바인딩이란?
바인딩이란 식별자와 값을 연결하는 과정을 의미한다.
예를 들어, 변수 선언은 변수 이름(식별자)과 확보된 메모리 공간의 주소를 바인딩하는 것이다.
this 바인딩은 `this`와 `this가 가리킬 객체`를 바인딩하는 것이다.**
> 

## 함수 호출 방식과 this 바인딩

- this 바인딩(this에 바인딩될 값)은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다

> 🖐 **렉시컬 스코프와 this 바인딩은 결정 시기가 다르다.**
함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다. 하지만 this 바인딩은 함수 호출 시점에 결정된다.
> 
- 함수를 호출하는 방식은 다음과 같다. (주의할 점은 동일한 함수도 다양한 방식으로 호출할 수 있다)
    - 일반 함수 호출
    - 메서드 호출
    - 생성자 함수 호출
    - `Function.prototype.apply/call/bind` 메서드에 의한 간접 호출

```jsx
// this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.
const foo = function () {
  console.dir(this);
}

// 동일한 함수도 다양한 방식으로 호출할 수 있다.

// 1. 일반 함수로 호출
// foo 함수를 일반적인 방식으로 호출
// foo 함수 내부의 this는 전역 객체 window를 가리킨다.
foo(); // window

// 2. 메서드 호출
// foo 함수를 프로퍼티 값으로 할당하여 호출
// foo 함수 내부의 this는 메서드를 호출한 객체 obj를 가리킨다
obj.foo(); // obj

// 3. 생성자 함수로 호출
// foo 함수를 new 연산자와 함께 생성자 함수로 호출
// foo 함수 내부의 this는 생성자 함수가 생성한 인스턴스를 가리킨다.
new foo(); // foo {}

// 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
// foo 함수 내부의 this는 인수에 의해 결정된다.
const bar = { name: 'bar' };

foo.call(bar);   // bar
foo.apply(bar);  // bar
foo.bind(bar)(); // bar
```

### 일반 함수 호출

- **기본적으로 `this`에는 전역 객체(global object)가 바인딩된다.**

```jsx
function foo() {
  console.log("foo's this: ", this);   // window
  function bar() {
    console.log("bar's this: ", this);   // window
  }
  bar();
}
foo();
```

- **일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 `this`에는 전역 객체가 바인딩된다.**

### 메서드 호출

- 메서드 내부의 `this`에는 메서드를 호출한 객체, 즉 메서드를 호출할 때 메서드 이름 앞의 마침표(`.`) 연산자 앞에 기술한 객체가 바인딩된다.
- 주의할 것은 메서드 내부의 `this`는 메서드를 소유한 객체가 아닌 **메서드를 호출한 객체에 바인딩된다.**

```jsx
const person = {
  name: 'Lee',
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  }
};

// 메서드 getName을 호출한 객체는 person이다.
console.log(person.getName()); // Lee
```

### 생성자 함수 호출

- **생성자 함수 내부의 `this`에는 생성자 함수가 (미래에) 생성할 인스턴스가 바인딩된다.**

```jsx
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  }
}

// 반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
// 반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);
console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20

// new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않는다. 즉, 일반적인 함수의 호출이다.
const circle3 = Circle(15);

// 일반 함수로 호출된 Circle에는 반환문이 없으므로 암묵적으로 undefined를 반환한다.
console.log(circle3); // undefined

// 일반 함수로 호출된 Circle 내부의 this는 전역 객체를 가리킨다.
console.log(radius); // 15 (radius === window.radius)
```

### Function.prototype.apply/call/bind 메서드에 의한 간접 호출

1. `apply`, `call` 메서드
- `apply`, `call`, `bind` 메서드는 `Function.prototype`의 메서드이므로 모든 함수가 상속받아 사용할 수 있다.
- 먼저 `apply`, `call` 메서드의 본질적인 기능은 함수를 호출하는 것이다.

```jsx
function getThisBinding() {
  console.log(arguments);
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding()); // window

// getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
console.log(getThisBinding.apply(thisArg)); // { a: 1 }
console.log(getThisBinding.call(thisArg));  // { a: 1 }

// getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩한다.
// apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다.
console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}

// call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.
console.log(getThisBinding.call(thisArg, 1, 2, 3));
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}
```

- `apply` 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다.
    - `[ 1, 2, 3 ]`
- `call` 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.
    - `1, 2, 3`
- 이처럼 `apply`와 `call` 메서드는 호출할 함수에 인수를 전달하는 방식만 다를 뿐 this로 사용할 객체를 전달하면서 함수를 호출하는 것은 동일하다.

1. `**bind**` 메서드
- `bind` 메서드는 `apply`, `call` 메서드와 달리 함수를 호출하지 않는다.
- 다만 첫 번째 인수로 전달한 값으로 this 바인딩이 교체된 함수를 새롭게 생성해 반환한다.

```jsx
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// bind 메서드는 첫 번째 인수로 전달한 thisArg로 this 바인딩이 교체된
// getThisBinding 함수를 새롭게 생성해 반환한다.
console.log(getThisBinding.bind(thisArg)); // getThisBinding
// bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야 한다.
console.log(getThisBinding.bind(thisArg)()); // {a: 1}
```

- `bind` 메서드는 `메서드의 this`와 `메서드 내부의 중첩 함수 또는 콜백 함수의 this`가 불일치하는 문제의 해결을 위해 유용하게 사용된다.

```jsx
const person = {
	name: 'Lee',
	foo(callback) {
		setTimeout(callback, 100);
	}
};

person.foo(function () {
	console.log(`Hi! my name is ${this.name}.`);
}); // Hi! my name is .
```

- person.foo에서는 `this`가 person에 바인딩되어 있지만 callback 함수가 일반함수로 호출되어진 시점에서 `this`는 전역 객체를 가리킨다. 즉 `this.name`이 `window.name`과 같다.
- 이를 해결하기 위해서 bind 메서드를 사용하여 `person.foo 내부의 this`와 `콜백 함수 내부의 this`를 일치시켜준다.

```jsx
const person = {
	name: 'Lee',
	foo(callback) {
		setTimeout(callback.bind(this), 100);
	}
};

person.foo(function () {
	console.log(`Hi! my name is ${this.name}.`);
}); // Hi! my name is Lee.
```

### 정리

| 함수 호출 방식 | this 바인딩 |
| --- | --- |
| 일반 함수 호출 | 전역 객체 |
| 메서드 호출 | 메서드를 호출한 객체 |
| 생성자 함수 호출 | 생성자 함수가 (미래에) 생성할 인스턴스 |
| Function.prototype.apply/call/bind 메서드에 의한 간접호출 | Function.prototype.apply/call/bind 메서드에 첫 번째 인수로 전달한 객체 |