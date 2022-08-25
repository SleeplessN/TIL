# 31장. RegExp

## 정규 표현식이란?

> 정규 표현식(Regular Expression)은 **일정한 패턴을 가진 문자열의 집합을 표현**하기 위해 사용하는 형식 언어이다.
> 
- 정규 표현식은 문자열을 대상으로 **패턴 매칭 기능**을 제공한다
    - **패턴 매칭 기능**이란 특정 패턴과 일치하는 문자열을 검색하거나 추출 또는 치환할 수 있는 기능을 말한다.
    - ex. 휴대폰번호 패턴
    

## 정규 표현식의 생성

- 정규 표현식 객체(RegExp)를 생성 방법
    - 정규 표현식 리터럴 (일반적인 방법)
    - `RegExp` 생성자 함수
        - 생성자 함수의 경우 변수를 사용해 동적으로 생성할 수 있다.
- 예시

```jsx
const target = 'Is this all there is?';

// 패턴 : is
// 플래그 : i =? 대소문자를 구별하지 않고 검색한다

// 1. 정규 표현식 리터럴
const regexp = /is/i;

// 2. RegExp 생성자 함수
const regexp = new RegExp(/is/i);

// test 메서드는 target 문자열에 대해 정규 표현식 regexp의 패턴을 검색하여 
// 매칭결과를 불리언 값으로 반환한다
regexp.test(target); // true
```

## RegExp 메서드

### RegExp.prototype.exec

> 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환한다.
단, 매칭 결과가 없는 경우 `null`을 반환
> 

```jsx
const target = 'Is this all there is?';
const regExp = /is/;

regExp.exec(target);
// ['is', index: 5, input: 'Is this all there is?', groups: undefined]
```

- ❗️주의 : 문자열 내의 모든 패턴을 검색하는 g 플래그를 지정해도 첫 번째 매칭 결과만을 반환

### RegExp.prototype.test

> 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.
> 

```jsx
const target = 'Is this all there is?';
const regExp = /is/;

regExp.test(target); // true
```

### String.prototype.match

> 대산 문자열과 인수로 전달받은 정규 표현식과의 매칭 결과를 배열로 반환한다.
> 

```jsx
const target = 'Is this all there is?';
const regExp = /is/;

target.match(regExp);
// ['is', index: 5, input: 'Is this all there is?', groups: undefined]
```

- RegExp.prototype.exec와의 차이점
    - g 플래그를 지정해도 모든 매칭 결과를 배열로 반환한다
    
    ```jsx
    const target = 'Is this all there is?';
    const regExp = /is/g;
    
    target.match(regExp); // ["is", "is"]
    ```
    

## 플래그

> 플래그는 정규 표현식의 검색방식을 설정하기 위해 사용한다.
> 

| 플래그 | 의미 | 설명 |
| --- | --- | --- |
| i | ignore case | 대소문자를 구별하지 않고 패턴을 검색한다. |
| g | Global | 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다. |
| m | Multi line | 문자열의 행이 바뀌더라도 패턴 검색을 계속한다. |
- 플래그는 옵션이므로 선택적으로 사용할 수 있으며, 여러개를 동시에 설정할 수도 있다
- 어떤 플래그도 사용하지 않은 경우에는 대소문자를 구별해서 패턴을 검색한다.
- 문자열 패턴 검색 매칭 대상이 1개 이상 존재해도 첫 번째 매칭한 대상만 검색하고 종료한다

```jsx
const target = 'Is this all there is?';

// 1. target 문자열에서 is 문자열을 대소문자 구별하여 한 번만 검색한다
target.match(/is/);
// ['is', index: 5, input: 'Is this all there is?', groups: undefined]

// 2. target 문자열에서 is 문자열을 대소문자 구별하지 않고 한 번만 검색한다
target.match(/is/i);
// ['is', index: 0, input: 'Is this all there is?', groups: undefined]

// 3. target 문자열에서 is 문자열을 대소문자 구별하여 전역 검색한다
target.match(/is/g);
// ["is", "is"]

// 4. target 문자열에서 is 문자열을 대소문자 구별하지 않고 전역 검색한다.
target.match(/is/ig);
// ["Is", "is", "is"]
```

## 패턴

> 문자열의 일정한 규칙을 표현하기 위해 사용한다.
> 

### 문자열 검색

> 정규 표현식의 패턴에 문자 또는 문자열을 지정하면 검색 대상 문자열에서 패턴으로 지정한 문자 또는 문자열을 검색한다.
> 
- 정규 표현식을 생성하여 RegExp 메서드를 사용해야 검색이 수행된다

```jsx
const target = 'Is this all there is?';

const regExp = /is/;
target.match(regExp);
```

### 임의의 문자열 검색

> `**.` 은 임의의 문자 한 개를 의미한다.**
> 

```jsx
const target = 'Is this all there is?';

// 임의의 3자리 문자열을 대소문자를 구별하여 전역 검색한다.
const regExp = /.../g;

target.match(regExp); // ["is ", "thi", "s a", "ll ", "the", "re ", "is?"]
```

### 반복 검색

> `{m,n}`**은 앞선 패턴이 최소 m번, 최대 n번 반복되는 문자열을 의미한다.**
> 
- ❗️주의 : `{m,n}` 은 공백 없이 작성해야한다.

```jsx
const target = 'A AA B BB Aa Bb AAA';

// 'A'가 최소 1번, 최대 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{1,2}/g;

target.match(regExp); // ["A", "AA", "A", "AA", "A"]
```

- `{n}`은 앞선 패턴이 **n번 반복되는 문자열을 의미**한다. `{n,n}`과 동일
- `{n,}`은 앞선 패턴이 **최소 n번 이상 반복되는 문자열을 의미**한다.
- `+`는 앞선 패턴이 **최소 한번 이상 반복되는 문자열을 의미**한다. 즉 `{1,}`과 같다.
- `?`는 앞선 패턴이 **최대 한 번(0번 포함) 이상 반복되는 문자열을 의미**한다. 즉 `{0,1}`과 같다.

### OR 검색

> `|`는 or의 의미를 갖는다.
> 

```jsx
const target = "A AA B BB Aa Bb";

// 'A' 또는 'B'를 전역 검색한다.
const regExp = /A|B/g;
target.match(regExp); // ["A", "A", "A", "B", "B", "B", "A", "B"]

// 분해되지 않은 단어 레벨로 검색하기 위해서는 +와 함께 사용한다
const regExp = /A+|B+/g;
// []내의 문자는 or로 동작한다. 즉 위식은 다음과 같이 표현될 수 있다.
const regExp = /[AB]+/g
target.match(regExp); // ["A", "AA", "B", "BB", "A", "B"]
```

- 범위를 지정할 경우 `[]`내에 `-`를 사용한다.

```jsx
const target = "A AA BB ZZ Aa Bb";

// 'A' ~ 'Z'가 한 번 이상 반복되는 문자열을 전역 검색한다.
// 'A', 'AA', 'AAA', ... 'B', 'BB', 'BBB', ... ~ 'Z', 'ZZ', 'ZZZ', ...
const regExp = /[A-Z]+/g
target.match(regExp); // ["A", "AA", "BB", "ZZ", "A", "B"]

// 만약 대소문자를 구별하지 않으려면 다음과 같다
const regExp = /[A-Za-z]+/g
```

- 숫자를 검색하는 경우는 다음과 같다

```jsx
const target = "AA BB 12,345";

// '0' ~ '9'가 한 번 이상 반복되는 문자열을 전역 검색한다
const regExp = /[0-9]+/g;
target.match(regExp); // ["12", "345"]

// 위의 경우 쉼표(,)때문에 매칭결과가 분리되므로 쉼표를 패턴에 포함시킨다
const regExp = /[0-9,]+/g;
target.match(regExp); // ["12,345"]
```

|  | 의미 | 관계 |
| --- | --- | --- |
| | | or | | === or |
| [] 내부 | or | [] === or |
| \d | 숫자 | \d === [0-9] |
| \D | 숫자가 아닌 문자(특수문자 포함) |  |
| \w | 알파벳, 숫자, 언더스코어(_) | \w === [A-Za-z0-9_] |
| \W | 알파벳, 숫자, 언더스코어가 아닌 문자 |  |
| \s | 여러 가지 공백 문자(스페이스, 탭 등) | \s === [\t\r\n\v\f] |

### NOT 검색

> `**[…]`내의 `^`는 not의 의미를 갖는다**
> 
- 예를 들어, `[^0-9]`는 숫자를 제외한 문자를 의미한다
- `\d`와 `\D`, `\w`와 `\W`는 이러한 not 관계를 갖는다.

### 시작 위치로 검색

> `**[…]` 밖의 `^`문자열은 시작을 의미한다.**
> 
- 예를 들어, https로 시작하는지 검사하려면 `/^https/`

### 마지막 위치로 검색

> **`$`는 문자열의 마지막을 의미한다**
> 
- 예를 들어, com으로 끝나는지 검사하려면 `/com$/`

## 자주 사용하는 정규표현식

### 특정 단어로 시작하는지 검사

- ‘http://’ 나 ‘https://’ 로 시작하는지 검사하려면? `[…]`내의 `^` 활용

```jsx
const url = 'https://example.com';

/^https?:\/\//.test(url); // true
/^(http|https):\/\//.test(url); // true
```

### 특정 단어로 끝나는지 검사

- ‘html’로 끝나는지 검사하려면? `$` 활용

```jsx
const fillname = 'index.html';

/html$/.test(filname); // true
```

### 숫자로만 이루어진 문자열인지 검사

```jsx
const target = '12345';

/^\d+$/.test(target); // true
```

### 하나 이상의 공백으로 시작하는지 검사

```jsx
const target = ' Hi!';

/^[\ㄴ]+/.test(target); // true
```

### 아이디로 사용 가능한지 검사

- 예를 들어, 아이디가 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4~10자리인지 검사

```jsx
const id = 'abc123';

/^[A-Za-z0-9]{4,10}$/.test(id); // true
```

### 메일 주소 형식에 맞는지 검사

```jsx
const email = 'gmlwns7020@naver.com';

/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(email); // true
```

- 더 정교한 패턴 매칭

```jsx
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

### 핸드폰 번호 형식에 맞는지 검사

```jsx
const cellphone = '010-1234-5678';

/^\d{3}-\d{3,4}-\d{4}$/.test(cellphone); // true
```

### 특수 문자 포함 여부 검사

- 특수 문자는 `A-Za-z0-9` 이외의 문자이다.

```jsx
const target = 'abc#123';

(/[^A-Za-z0-9]/gi).test(target); // true
// 다음과 같이 대체할 수 있다. 선택적으로 검사할 수 있는 장점이 있다.
(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi).test(target); // -> true

// 특수 문자를 제거할 경우 String.prototype.replace 메서드를 사용한다.
target.replace(/[^A-Za-z0-9]/gi, ''); // abc123
```