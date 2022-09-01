# 46장. 제너레이터와 async/await

## 제너레이터란?

> **제너레이터는 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수다.**
> 
- 제너레이터와 일반 함수의 차이는 다음과 같다
    1. 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
    2. 제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.
    3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
    

## 제너레이터 함수의 정의

> 제너레이터 함수는 `function*` 키워드로 선언한다.
그리고 하나 이상의 yield 표현식을 포함한다.
> 

```jsx
// 제너레이터 함수 선언문
function* genDecFunc() {
  yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
  yield 1;
};

// 제너레이터 메서드
const obj = {
  * genObjMethod() {
    yield 1;
  }
};

// 제너레이터 클래스 메서드
class MyClass {
  * genClsMethod() {
    yield 1;
  }
}
```

- 제너레이터 함수는 화살표 함수로 정의할 수 없다
- 제너레이터 함수는 `new` 연산자와 함께 생성자 함수로 호출할 수 없다.

## 제너레이터 객체

> **제너레이터 함수를 호출하면** 일반 함수처럼 코드 블록을 실행하는 것이 아닌, **제너레이터 객체를 생성해 반환한다.**
이 제너레이터 객체는 **이터러블**이면서 **이터레이터**이다.
> 
- 제너레이터 객체는 `Symbol.iterator` 메서드를 상속받는 이터러블이면서 이터레이터 리절트 객체를 반환하는 `next` 메서드를 소유하는 이터레이터이다.
- 제너레이터 객체는 next 메서드를 갖는 이터레이터이지만 이터레이터에는 없는 return, throw 메서드를 갖는다.
    - `**next**` 메서드를 호출 ⇒ 제너레이터 함수의 yield 표현식까지 코드 블록을 실행하고 yield된 값을 `value` 프로퍼티 값으로, `false`를 `done` 프로퍼티 값으로 갖는 **이터레이터 리절트 객체를 반환**한다.
    - `**return**` 메서드 호출 ⇒ 인수로 전달받은 값을 `value` 프로퍼티 값으로, `true`를 `done` 프로퍼티 값으로 갖는 **이터레이터 리절트 객체를 반환**한다
        
        ```jsx
        function* genFunc() {
          try {
            yield 1;
            yield 2;
            yield 3;
          } catch (e) {
            console.error(e);
          }
        }
        
        const generator = genFunc();
        
        console.log(generator.next()); // {value: 1, done: false}
        console.log(generator.return('End!')); // {value: "End!", done: true}
        ```
        
    - `**throw**` 메서드 호출 ⇒ 인수로 전달받은 에러를 발생시키고 `undefined`를 `value` 프로퍼티 값으로, `true`를 `done` 프로퍼티 값으로 갖는 **이터레이터 리절트 객체를 반환**한다
        
        ```jsx
        function* genFunc() {
          try {
            yield 1;
            yield 2;
            yield 3;
          } catch (e) {
            console.error(e);
          }
        }
        
        const generator = genFunc();
        
        console.log(generator.next()); // {value: 1, done: false}
        console.log(generator.throw('Error!')); // {value: undefined, done: true}
        ```
        

## 제너레이터의 일시 중지와 재개

> **제너레이터는 yield 키워드와 next 메서드를 통해 일시 중지와 재개가 가능하다.**
> 
- 제너레이터는 함수 호출자에게 제어권을 양도(yield)하여 필요한 시점에 함수 실행을 재개할 수 있다.
- next 메서드로 모든 코드를 일괄 실행하는 것이 아닌 yield 표현식까지만 실행한다.
- yield 키워드는 제너레이터 함수의 실행을 일시 중지시키거나 yield 키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환한다

```jsx
// 제너레이터 함수
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
// 이터러블이면서 동시에 이터레이터인 제너레이터 객체는 next 메서드를 갖는다.
const generator = genFunc();

// 처음 next 메서드를 호출하면 첫 번째 yield 표현식까지 실행되고 일시 중지된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 첫 번째 yield 표현식에서 yield된 값 1이 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 1, done: false}

// 다시 next 메서드를 호출하면 두 번째 yield 표현식까지 실행되고 일시 중지된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 두 번째 yield 표현식에서 yield된 값 2가 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 2, done: false}

// 다시 next 메서드를 호출하면 세 번째 yield 표현식까지 실행되고 일시 중지된다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 세 번째 yield 표현식에서 yield된 값 3이 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 false가 할당된다.
console.log(generator.next()); // {value: 3, done: false}

// 다시 next 메서드를 호출하면 남은 yield 표현식이 없으므로 제너레이터 함수의 마지막까지 실행한다.
// next 메서드는 이터레이터 리절트 객체({value, done})를 반환한다.
// value 프로퍼티에는 제너레이터 함수의 반환값 undefined가 할당된다.
// done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었음을 나타내는 true가 할당된다.
console.log(generator.next()); // {value: undefined, done: true}
```

```jsx
generator.next() → yield → generator.next() → yield → … 
→ generator.next() → return
```

- 제너레이터 객체의 next 메서드에는 인수를 전달할 수 있는데, 이 인수는 제너레이터 함수의 yield 표현식을 할당받는 변수에 할당된다.

## 제너레이터의 활용

### 1. 이터러블의 구현

- 제너레이터 함수를 이용하면 이터레이션 프로토콜 방식보다 더 간단히 이터러블을 구현할 수 있다

### 2. 비동기 처리

- 제너레이터 함수는 next 메서드와 yield 표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있다.
    - 이를 활용하여 프로미스를 사용한 비동기 처리를 동기 처리처럼 구현할 수 있다.
    - 즉, 프로미스의 후속처리 (then/catch/finally) 없이 비동기 처리 결과를 반환하도록 구현할 수 있다.
- 구현 과정 대충 이해하고, 얼마나 코드가 장황해지고 가독성이 나빠졌는지.. 이를 통해 ES8에서 `async/await`가 나왔다는 것을 알면된다..?

## async/await

> 제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 동작하도록 구혈할 수 있는 async/await가 도입되었다
> 
- async/await는 프로미스를 기반으로 동작한다.
- 프로미스와는 달리 후속 처리 메서드(then/catch/finally) 필요없이 **마치 동기 처리처럼 프로미스를 사용할 수 있다.**

### async 함수

- async 함수는 async 키워드를 사용해 정의하며 언제나 프로미스를 반환한다
- async 함수가 명시적으로 프로미스를 반환하지 않더라도 async 함수는 암묵적으로 반환값을 resolve하는 프로미스를 반환한다.

```jsx
// async 함수 선언문
async function foo(n) { return n; }
foo(1).then(v => console.log(v)); // 1

// async 함수 표현식
const bar = async function (n) { return n; };
bar(2).then(v => console.log(v)); // 2

// async 화살표 함수
const baz = async n => n;
baz(3).then(v => console.log(v)); // 3

// async 메서드
const obj = {
  async foo(n) { return n; }
};
obj.foo(4).then(v => console.log(v)); // 4

// async 클래스 메서드
class MyClass {
  async bar(n) { return n; }
}
const myClass = new MyClass();
myClass.bar(5).then(v => console.log(v)); // 5

// 예외 : 클래스의 construct 메서드
class MyClass {
  async constructor() { }
  // SyntaxError: Class constructor may not be an async method
}

const myClass = new MyClass();
```

### await 키워드

- await 키워드는 프로미스가 settled 상태(비동기 처리 완료)가 될 때까지 대기하다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환한다.
- await 키워드는 반드시 async 함수 내부에서 사용해야 한다.
- await 키워드는 반드시 프로미스 앞에 사용해야 한다.

```jsx
const fetch = require('node-fetch');

const getGithubUserName = async id => {
  const res = await fetch(`https://api.github.com/users/${id}`); // ①
  const { name } = await res.json(); // ②
  console.log(name); // Ungmo Lee
};

getGithubUserName('ungmo2');
```

- 동작 과정
    1. ①의 fetch 함수가 수행한 HTTP 요청에 대한 서버의 응답이 도착해서 fetch 함수가 반환한 프로미스가 settled 상태가 될 때까지 대기한다.
    2. 이후 **프로미스가 settled 상태가 되면** 프로미스가 resolve한 처리 결과가 res 변수에 할당된다.
- 이처럼 await 키워드는 다음 실행을 일시 중지시켰다가 프로미스가 settled 상태가 되면 다시 재개한다.
- 모든 프로미스에 await 키워드를 사용하는 것은 좋지 않다.
    - 개별적으로 수행되는 비동기 처리의 경우 순차적으로 수행할 필요 없다
    
    ```jsx
    async function foo() {
      const a = await new Promise(resolve => setTimeout(() => resolve(1), 3000));
      const b = await new Promise(resolve => setTimeout(() => resolve(2), 2000));
      const c = await new Promise(resolve => setTimeout(() => resolve(3), 1000));
    
      console.log([a, b, c]); // [1, 2, 3]
    }
    
    foo(); // 약 6초 소요된다.
    ```
    
    - 이 경우 다음과 같이 Promise.all 함수와 함께 사용하는 것이 좋다
    
    ```jsx
    async function foo() {
      const res = await Promise.all([
        new Promise(resolve => setTimeout(() => resolve(1), 3000)),
        new Promise(resolve => setTimeout(() => resolve(2), 2000)),
        new Promise(resolve => setTimeout(() => resolve(3), 1000))
      ]);
    
      console.log(res); // [1, 2, 3]
    }
    
    foo(); // 약 3초 소요된다.
    ```
    
- 하지만 비동기 처리의 처리 순서가 보장되어야 할 경우에는 await 키워드를 사용하여 순차적으로 처리해야 한다

```jsx
async function bar(n) {
  const a = await new Promise(resolve => setTimeout(() => resolve(n), 3000));
  // 두 번째 비동기 처리를 수행하려면 첫 번째 비동기 처리 결과가 필요하다.
  const b = await new Promise(resolve => setTimeout(() => resolve(a + 1), 2000));
  // 세 번째 비동기 처리를 수행하려면 두 번째 비동기 처리 결과가 필요하다.
  const c = await new Promise(resolve => setTimeout(() => resolve(b + 1), 1000));

  console.log([a, b, c]); // [1, 2, 3]
}

bar(1); // 약 6초 소요된다.
```

### 에러 처리

- 비동기 처리를 위한 콜백 패턴의 단점 중 가장 심각한 것을 에러 처리가 곤란하다는 점이다.
    - 에러는 호출자 방향으로 전파된다
    - 비동기 함수의 콜백 함수를 호출한 것은 비동기 함수가 아니기 때문에 에러를 캐치할 수 없다.
- async/await에서 에러 처리는 `try …catch`문을 사용할 수 있다,
- async/await 와 같이 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확하다.

```jsx
const fetch = require('node-fetch');

const foo = async () => {
  try {
    const wrongUrl = 'https://wrong.url';

    const response = await fetch(wrongUrl);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err); // TypeError: Failed to fetch
  }
};

foo();
```

- async 함수 내에서 catch 문을 사용해서 에러 처리를 하지 않으면 async 함수는 발생한 에러를 reject 하는 프로미스를 반환한다.
    - 따라서 async 함수를 호출하고 `Promise.protytype.catch` 후속 처리 메서드를 사용할 수 있다.
    
    ```jsx
    const fetch = require('node-fetch');
    
    const foo = async () => {
      const wrongUrl = 'https://wrong.url';
    
      const response = await fetch(wrongUrl);
      const data = await response.json();
      return data;
    };
    
    foo()
      .then(console.log)
      .catch(console.error); // TypeError: Failed to fetch
    ```