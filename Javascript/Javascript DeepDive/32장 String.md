# 32장. String

## String 생성자 함수

- 표준 빌트인 객체인 String 객체는 `new` 연산자와 함께 호출하면 `[[PrimitiveValue]]` 내부 슬롯을 갖는 **String 래퍼 객체를 생성한다.**

```jsx
// 인수 전달 X
const strObj = new String();
console.log(strObj); // String {length: 0, [[PrimitiveValue]]: ""}

// 인수 전달 O
const strObj = new String('Jeon');
console.log(strObj);
// String {0: "L", 1: "e", 2: "e", length: 3, [[PrimitiveValue]]: "Jeon"}
```

- **String 래퍼 객체는 배열과 마찬가지로 length 프로퍼티와 인덱스를 가지는 유사배열이자 이터러블이다.**
    - 때문에 배열과 유사하게 인덱스를 사용하여 각 문자에 접근할 수 있다.
- 문자가 아닌 값을 인수로 전달하면 문자열로 **강제 변환**한다.
- `new`를 사용하지 않으면 문자열을 반환하는데 이를 이용해 명시적으로 타입 변경하기도 한다

## length 프로퍼티

> length 프로퍼티는 문자열의 문자 개수를 반환한다.
> 

## String 메서드

> 배열과는 달리 String 객체에는 **원본 String 래퍼 객체를 직접 변경하는 메서드는 존재하지 않는다.
즉, String 객체의 메서드는 언제나 새로운 문자열을 반환한다.**
> 
- 이는 문자열이 변경 불가능한 원시 값이기 때문에 래퍼 객체도 읽기 전용(`writable: false`) 객체로 제공된다.

### String.prototype.indexOf

> **인수로 전달받은 문자열을 검색하여 첫 번째 인덱스를 반환한다.**
> 

### String.prototype.search

> **인수로 전달받은 정규 표현식과 매치하는 문자열을 검색하여 일치하는 문자열의 인덱스를 반환한다.**
> 
- **없을 시 `-1`을 반환**
- 없을 시 `-1`을 반환

```jsx
const str = 'Hello world';

// 문자열 str에서 정규 표현식과 매치하는 문자열을 검색하여 일치하는 문자열의 인덱스를 반환한다.
str.search(/o/); // -> 4
str.search(/x/); // -> -1
```

### String.prototype.includes

> **인수로 전달받은 문자열이 포함되어 있는지 확인**하여 불리언 값으로 반환한다.
> 

### String.prototype.startsWith

> **인수로 전달받은 문자열로 시작하는지 확인**하여 불리언 값으로 반환한다.
> 
- 접두사 관련

### String.prototype.endsWith

> **인수로 전달받은 문자열로 끝나는지 확인**하여 불리언 값으로 반환한다.
> 
- 접미사 관련

### String.prototype.charAt

> **인수로 전달받은 인덱스에 위치한 문자를 검색하여 반환한다.**
> 

```jsx
const str = 'Hello';

for (let i = 0; i < str.length; i++) {
  console.log(str.charAt(i)); // H e l l o
}
```

- 인수가 생략되면 `0`이 기본값이다.
- 범위를 벗어날 경우에는 `''` 를 반환한다.
- 유사한 문자열 메서드는 `String.prototype.charCodeAt`, `String.prototype.codePointAt` 이 있다.

 

### String.prototype.substring

> 첫 번째 인수로 전달받은 인덱스에 위치하는 문자부터 두 번째 인수로 전달받은 인덱스에 위치하는 문자의 바로 이전 문자 까지의 **부분 문자열을 반환한다.**
> 

```jsx
// 구문
str.substring(indexStart[, indexEnd])
```

```jsx
const str = 'Hello World';

// 인덱스 1부터 인덱스 4 이전까지의 부분 문자열을 반환한다.
str.substring(1, 4); // -> ell
```

- `indexEnd`는 옵션값이며, 생략시 마지막 문자까지 반환한다.
- 다음과 같이 인수를 전달해도 정상 작동한다
    - `indexStart` > `indexEnd` 인 경우 두 인수는 교환된다.
    - `인수 < 0` 또는 `NaN` 인 경우 0으로 취급
    - `인수 > string.length` 인 경우 인수는 `string.length`로 취급된다

### String.prototype.slice

> substring 메서드와 동일하게 동작하지만, 음수인 인수를 전달할 수 있다.
> 
- `substring`은 음수로 전달시 0으로 취급하지만
- `slice`는 뒤에서부터 시작하여 문자열을 잘라낸다.

### String.prototype.toUpperCase

> **대상 문자열을 모두 대문자로 변경하여 반환한다.**
> 

### String.prototype.toLowerCase

> **대상 문자열을 모두 소문자로 변경하여 반환한다.**
> 

### String.prototype.trim

> **대상 문자열의 앞뒤의 공백 문자를 제거한 문자열을 반환한다.**
> 
- 앞 ,뒤를 나누어서 제거하는 메서드(`String.prototype.{trimStart,trimEnd}`)도 제공한다

```jsx
const str = '   foo  ';

str.trim(); // -> 'foo'

// String.prototype.{trimStart,trimEnd} : Proposal stage 4
str.trimStart(); // -> 'foo  '
str.trimEnd();   // -> '   foo'
```

- `String.prototype.replace`와 정규표현식을 사용해도 된다

### String.prototype.repeat

> 인수로 전달받은 정수만큼 반복해 연결한 새로운 문자열을 반환한다.
> 
- 인수
    - `0` or 생략시 빈 문자열 반환
    - `음수`일 시 `RangeError` 발생
    - 소숫점일 시 소숫점내림
    

### String.prototype.replace

> 대상 문자열에서 **첫 번째 인수로 전달받은 문자열 또는 정규표현식을 검색하여 두 번째 인수로 전달한 문자열로 치환한 문자열을 반환한다**
> 
- 검색된 문자열이 여러 개일 경우 첫 번째로 검색된 문자열만 치환한다.
- 교체 패턴에 대한 자세한 내용은 MDN 참고

### String.prototype.split

> **첫 번째 인수로 전달한 문자열 또는 정규 표현식을 검색하여 문자열을 분리한 후 배열에 담아 반환한다.**
> 
- 두 번째 인수로 배열의 길이를 지정할 수 있다.
    
    ```jsx
    const str = 'How are you doing?';
    
    // 공백으로 구분하여 배열로 반환한다. 단, 배열의 길이는 3이다
    str.split(' ', 3); // -> ["How", "are", "you"]
    ```