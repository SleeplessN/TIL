# 37장. Set과 Map

## Set

> Set 객체는 중복되지 않는 유일한 값들의 집합이다.
> 
- Set 객체는 배열과 유사하지만 다음과 같은 차이가 있다

| 구분 | 배열 | Set 객체 |
| --- | --- | --- |
| 동일한 값을 중복하여 포함할 수 있다. | ⭕️ | ❌ |
| 요소 순서에 의미가 있다. | ⭕️ | ❌ |
| 인덱스로 요소에 접근할 수 있다. | ⭕️ | ❌ |
- **Set 객체의 특성은 수학적 집합을 구현하기 위한 자료구조이다.**
    - 교집합, 합집합, 여집합 등을 구현할 수 있다.
    

### Set 객체의 생성

> Set 객체는 Set 생성자 함수로 생성한다.
> 
- Set 생성자 함수는 이터러블을 인수로 전달받아 Set 객체를 생성한다.
- 이때 이터러블의 중복된 값은 Set 객체에 요소로 저장되지 않는다.

```jsx
const set1 = new Set([1, 2, 3, 3]);
console.log(set1); // Set(3) {1, 2, 3}

const set2 = new Set('hello');
console.log(set2); // Set(4) {"h", "e", "l", "o"}
```

### 요소 개수 확인

> `**Set.prototype.size**` 프로퍼티를 사용한다.
> 

### 요소 추가

> `**Set.prototype.add**` 메서드를 사용한다.
> 

```jsx
// 요소 추가
const set = new Set();
console.log(set); // Set(0) {}

set.add(1).add(2).add(2)
console.log(set); // Set(2) {1, 2}
```

- 객체나 배열과 같이 자바스크립트의 모든 값을 요소로 저장할 수 있다.

### 요소 존재 여부 확인

> `**Set.prototype.has**` 메서드를 사용한다.
> 
- 불리언 값을 반환한다.

### 요소 삭제

> `**Set.prototype.delet**e` 메서드를 사용한다.
> 
- 삭제 성공 여부의 불리언 값을 반환한다.
- Set은 인덱스를 가지지 않으므로, 인수에 인덱스가 아닌 삭제하려는 요소값을 전달해야 한다.

### 요소 일괄 삭제

> `**Set.prototype.clear**` 메서드를 사용한다.
> 
- 언제나 `undefined` 값을 반환한다.

### 요소 순회

> **`Set.prototype.forEach`** 메서드를 사용한다.
> 

```jsx
// 구문
mySet.forEach(callback[, thisArg])
```

- `thisArg` : this로 사용될 객체를 인수로 전달한다. (옵션)
- 콜백 함수는 3개의 인수를 전달 받는다.
    - 첫 번째 인수 : 현재 순회 중인 요소값
    - 두 번째 인수 : 현재 순회 중인 요소값
    - 세 번째 인수 : 현재 순회 중인 Set 객체 자체
- 첫 번째 인수와 두 번째 인수는 같은 값이다.
- 배열과는 달리 순서가 의미가 없어 인덱스를 갖지 않는다.

```jsx
const set = new Set([1, 2, 3]);

set.forEach((v, v2, set) => console.log(v, v2, set));
/*
1 1 Set(3) {1, 2, 3}
2 2 Set(3) {1, 2, 3}
3 3 Set(3) {1, 2, 3}
*/
```

- **Set 객체는 이터러블이다.**
    - `for … of` 문으로 순회가능
    - 스프레드 문법과 배열 디스트럭처링 가능
    

### 집합 연산

> Set 객체의 특성은 **수학적 집합을 구현하기 위한 자료구조**이다.
> 
1. **교집합**
    
    ```jsx
    Set.prototype.intersection = function (set) {
      const result = new Set();
    
      for (const value of set) {
        // 2개의 set의 요소가 공통되는 요소이면 교집합의 대상이다.
        if (this.has(value)) result.add(value);
      }
    
      return result;
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA와 setB의 교집합
    console.log(setA.intersection(setB)); // Set(2) {2, 4}
    // setB와 setA의 교집합
    console.log(setB.intersection(setA)); // Set(2) {2, 4}
    ```
    
    ```jsx
    Set.prototype.intersection = function (set) {
      return new Set([...this].filter(v => set.has(v)));
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA와 setB의 교집합
    console.log(setA.intersection(setB)); // Set(2) {2, 4}
    // setB와 setA의 교집합
    console.log(setB.intersection(setA)); // Set(2) {2, 4}
    ```
    
2. **합집합**
    
    ```jsx
    Set.prototype.union = function (set) {
      // this(Set 객체)를 복사
      const result = new Set(this);
    
      for (const value of set) {
        // 합집합은 2개의 Set 객체의 모든 요소로 구성된 집합이다. 중복된 요소는 포함되지 않는다.
        result.add(value);
      }
    
      return result;
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA와 setB의 합집합
    console.log(setA.union(setB)); // Set(4) {1, 2, 3, 4}
    // setB와 setA의 합집합
    console.log(setB.union(setA)); // Set(4) {2, 4, 1, 3}
    ```
    
    ```jsx
    Set.prototype.union = function (set) {
      return new Set([...this, ...set]);
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA와 setB의 합집합
    console.log(setA.union(setB)); // Set(4) {1, 2, 3, 4}
    // setB와 setA의 합집합
    console.log(setB.union(setA)); // Set(4) {2, 4, 1, 3}
    ```
    

1. **차집합**
    - `A-B` : A에는 존재하지만 B에는 존재하지 않는 요소로 구성
    
    ```jsx
    Set.prototype.difference = function (set) {
      // this(Set 객체)를 복사
      const result = new Set(this);
    
      for (const value of set) {
        // 차집합은 어느 한쪽 집합에는 존재하지만 다른 한쪽 집합에는 존재하지 않는 요소로 구성된 집합이다.
        result.delete(value);
      }
    
      return result;
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA에 대한 setB의 차집합
    console.log(setA.difference(setB)); // Set(2) {1, 3}
    // setB에 대한 setA의 차집합
    console.log(setB.difference(setA)); // Set(0) {}
    ```
    
    ```jsx
    Set.prototype.difference = function (set) {
      return new Set([...this].filter(v => !set.has(v)));
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA에 대한 setB의 차집합
    console.log(setA.difference(setB)); // Set(2) {1, 3}
    // setB에 대한 setA의 차집합
    console.log(setB.difference(setA)); // Set(0) {}
    ```
    

1. **부분 집합과 상위 집합**
    - 집합 A가 집합 B에 포함되는 경우
        - 집합 A는 집합 B의 부분 집합
        - 집합 B는 집합 A의 상위 집합
    
    ```jsx
    // this가 subset의 상위 집합인지 확인한다.
    Set.prototype.isSuperset = function (subset) {
      for (const value of subset) {
        // superset의 모든 요소가 subset의 모든 요소를 포함하는지 확인
        if (!this.has(value)) return false;
      }
    
      return true;
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA가 setB의 상위 집합인지 확인한다.
    console.log(setA.isSuperset(setB)); // true
    // setB가 setA의 상위 집합인지 확인한다.
    console.log(setB.isSuperset(setA)); // false
    ```
    
    ```jsx
    // this가 subset의 상위 집합인지 확인한다.
    Set.prototype.isSuperset = function (subset) {
      const supersetArr = [...this];
      return [...subset].every(v => supersetArr.includes(v));
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA가 setB의 상위 집합인지 확인한다.
    console.log(setA.isSuperset(setB)); // true
    // setB가 setA의 상위 집합인지 확인한다.
    console.log(setB.isSuperset(setA)); // false
    ```
    

## Map

> **Map 객체는 키와 값의 쌍으로 이루어진 컬렉션이다.**
> 
- Map 객체는 객체와 유사하지만 다음과 같은 차이가 있다.

| 구분 | 객체 | Map 객체 |
| --- | --- | --- |
| 키로 사용할 수 있는 값 | 문자열 또는 심벌 값 | 객체를 포함한 모든 값 |
| 이터러블 | ❌ | ⭕️ |
| 요소 개수 확인 | Object.keys(obj).length | map.size |

### Map 객체의 생성

> Map 생성자 함수는 이터러블을 인수로 전달받아 Map 객체를 생성한다.
이때 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소로 구성되어야 한다.
> 

```jsx
const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
console.log(map1); // Map(2) {"key1" => "value1", "key2" => "value2"}

const map2 = new Map([1, 2]); // TypeError: Iterator value 1 is not an entry object
```

- Map 생성자 함수에 중복된 키를 갖는 요소가 존재하면 값이 덮어써진다. (중복된 키를 갖는 요소 존재 X)

### 요소 개수 확인

> `**Map.prototype.size**` 프로퍼티를 사용한다.
> 

### 요소 추가

> `**Map.prototype.set**` 메서드를 사용한다.
> 

```jsx
const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
console.log(map1); // Map(2) {"key1" => "value1", "key2" => "value2"}

const map2 = new Map([1, 2]); // TypeError: Iterator value 1 is not an entry object
```

- 연속적으로 호출 가능하다.
- Map 객체는 키 타입에 제한이 없다.
    - **객체를 포함한 모든 값을 키로 사용할 수 있다.** (**일반 객체와의 가장 큰 차이점**)

```jsx
const map = new Map();

const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

// 객체도 키로 사용할 수 있다.
map
  .set(lee, 'developer')
  .set(kim, 'designer');

console.log(map);
// Map(2) { {name: "Lee"} => "developer", {name: "Kim"} => "designer" }
```

### 요소 취득

> **`Map.prototype.get`** 메서드를 사용한다.
> 

### 요소 존재 여부 확인

> **`Map.prototype.has`** 메서드를 사용한다.
> 
- 요소가 존재하지 않는다면 `undefined`를 반환한다

### 요소 삭제

> **`Map.prototype.delete`** 메서드를 사용한다.
> 
- 삭제 성공 여부의 불리언 값을 반환한다.

### 요소 일괄 삭제

> **`Map.prototype.clear`** 메서드를 사용한다.
> 
- 언제나 `undefined`를 반환한다.

### 요소 순회

> `**Map.prototype.forEach**` 메서드를 사용한다
> 

```jsx
// 구문
myMap.forEach(callback[, thisArg])
```

- `thisArg` : this로 사용될 객체를 인수로 전달한다. (옵션)
- 콜백 함수는 3개의 인수를 전달 받는다.
    - 첫 번째 인수 : 현재 순회 중인 요소값
    - 두 번째 인수 : 현재 순회 중인 요소키
    - 세 번째 인수 : 현재 순회 중인 Map 객체 자체

```jsx
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.forEach((v, k, map) => console.log(v, k, map));
/*
developer {name: "Lee"} Map(2) {
  {name: "Lee"} => "developer",
  {name: "Kim"} => "designer"
}
designer {name: "Kim"} Map(2) {
  {name: "Lee"} => "developer",
  {name: "Kim"} => "designer"
}
*/
```

- **Map 객체는 이터러블이다.**
    - `for … of` 문으로 순회가능
    - 스프레드 문법과 배열 디스트럭처링 가능
    
- **Map 객체는 이터러블이면서 동시에 이터레이터인 객체를 반환하는 메서드를 제공한다.**

| Map 메서드 | 설명 |
| --- | --- |
| Map.prototype.keys | Map 객체에서 요소키를 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환 |
| Map.prototype.values | Map 객체에서 요소값를 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환 |
| Map.prototype.entries | Map 객체에서 요소키와 요소값를 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환 |