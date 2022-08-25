# 30장. Date

> 표준 빌트인 객체인 Date는 날짜와 시간을 위한 메서드를 제공하는 빌트인 객체이면서 생성자 함수다.
> 

## Date 생성자 함수

> Date는 생성자 함수다
> 
- Date 생성자 함수로 생성한 Date 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖는다.
- 모든 시간의 기점은 `1970년 1월 1일 0시`를 나타낸다.

### new Date()

```jsx
// 인수 없이 호출하면 현재 날짜와 시간을 가지는 Date 객체를 반환한다.
new Date(); // Wed Aug 24 2022 20:34:01 GMT+0900 (한국 표준시)

Date(); // Wed Aug 24 2022 20:34:01 GMT+0900 (한국 표준시)
```

### new Date(milliseconds)

> **new Date의 인수에 `숫자 타입`이 전달되면 이를 milliseconds로 인식한다.**
> 
- 인수에 값이 들어오면 모든 시간의 기점인 `1970년 1월 1일 0시`에서 그 값만큼 지난 날짜가 나타난다.

```jsx
// 한국 표준시 KST는 협정 세계시 UTC에 9시간을 더한 시간이다.
new Date(0); // Thu Jan 01 1970 09:00:00 GMT+0900 (한국 표준시)

/*
86400000ms는 1day를 의미한다
*/
new Date(86400000); // Fri Jan 02 1970 09:00:00 GMT+0900 (한국 표준시)
```

### new Date(dateString)

> **new Date의 인수에 `문자열 타입`이 전달되면 지정된 날짜와 시간을 나타내는 Date 객체를 반환한다.**
> 

```jsx
new Date('May 26, 2020 10:00:00');
// Tue May 26 2020 10:00:00 GMT+0900 (한국 표준시)

new Date('2020/03/26/10:00:00');
// Tue May 26 2020 10:00:00 GMT+0900 (한국 표준시)
```

### new Date(year, month[, day, hour, minute, second, millisecond])

> Date 생성자 함수에 연, 월, 일, 시, 분, 초, 밀리초를 의미하는 숫자를 인수로 전달하면 지정된 날짜오 시간을 나타내는 Date 객체를 반환한다.
이때, 연, 월은 필수 값이다. 나머지 옵션 값들은 0 또는 1로 초기화 된다.
> 

| 인수 | 내용 |
| --- | --- |
| year | 연을 나타내는 1900년 이후의 정수. 0부터 99는 1900부터 1999로 처리된다. |
| month | 월을 나타내는 0 ~ 11 까지의 정수 (❗️주의: 0 : 1월, 11 : 12월) |
| day | 일을 나타내는 1 ~ 31 까지의 정수 |
| hour | 시를 나타내는 0 ~ 23 까지의 정수 |
| minute | 분을 나타내는 0 ~ 59 까지의 정수 |
| second | 초를 나타내는 0 ~ 59 까지의 정수 |
| millisecond | 밀리초를 나타내는 0 ~ 999 까지의 정수 |
- 필수값(연, 월)을 작성하지 않은 경우 모든 시간 기점을 반환한다.

```jsx
// 월은 작성시 주의해야 한다
new Date(2020, 2);
// Sun Mar 01 2020 00:00:00 GMT+0900 (한국 표준시)

new Date(2020, 2, 26, 10, 00, 00, 0);
// Thu Mar 26 2020 10:00:00 GMT+0900 (한국 표준시)

// 다음처럼 작성시 가동성이 훨씬 좋다
new Date('2020/3/26/10:00:00:00')
// Thu Mar 26 2020 10:00:00 GMT+0900 (한국 표준시)
```

## Date 메서드

### Date.now

> 1970년 1월 1일 00:00:00(UTC)을 기점으로 현재 시간까지 경과한 밀리초를 숫자로 반환한다.
> 

```jsx
const now = Date.now(); // 1661342075818ms

// 결국 new Date(now)는 현재 시간을 반환한다.
new Date(now)
// Wed Aug 24 2022 20:54:21 GMT+0900 (한국 표준시)
```

### Date.parse

> `1970년 1월 1일 00:00:00(UTC)`을 기점으로 인수로 전달된 지정 시간(`new Date(dataString)`의 인수와 동일한 형식)까지의 밀리초를 숫자로 반환한다.
> 

```jsx
// UTC
Date.parse('Jan 2, 1970 00:00:00 UTC'); // 86400000

// KST
Date.parse('Jan 2, 1970 09:00:00'); // 86400000

// KST
Date.parse('1970/01/02/09:00:00'); // 86400000
```

- 인수로 문자열 형식이 와야한다. (아닐시 0을 반환)

### Date.UTC

> `1970년 1월 1일 00:00:00(UTC)`을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환한다.
> 

```jsx
Date.UTC(1970, 0, 2); // 86400000
Date.UTC('1970/1/2'); // NaN
```

- 인수로 `(year, month[, day, hour, minute, second, millisecond])` 형식으로 숫자 형식이 와야한다. (아닐시 NaN를 반환)

### Date.prototype.getFullYear

> Date 객체의 연도를 나타내는 정수를 반환한다.
> 

### Date.prototype.setFullYear

> Date 객체에 연도를 나타내는 정수를 설정한다. 옵션으로 월, 일도 설정할 수 있다.
> 

### Date.prototype.getMonth

> Date 객체의 월을 나타내는 0 ~ 11의 정수를 반환한다. 1월은 0, 12월은 11이다.
> 

### Date.prototype.setMonth

> Date 객체에 월을 나타내는 0 ~ 11의 정수를 설정한다. 옵션으로 일도 설정할 수 있다.
> 

### Date.prototype.getDate

> Date 객체에 날짜(1 ~ 31)를 나타내는 정수를 반환한다.
> 

### Date.prototype.setDate

> Date 객체에 날짜(1 ~ 31)를 나타내는 정수를 설정한다.
> 

### Date.prototype.getDay

> Date 객체에 요일(0 ~ 6)을 나타내는 정수를 반환한다.
> 
- 0이 일요일, 6이 토요일

### Date.prototype.getHours

> Date 객체의 시간(0 ~ 25)을 나타내는 정수를 반환한다.
> 

### Date.prototype.setHours

> Date 객체의 시간(0 ~ 25)을 나타내는 정수를 설정한다. 옵션으로 분, 초, 밀리초도 설정할 수 있다.
> 

### Date.prototype.getMinutes

> Date 객체의 분(0 ~ 59)을 나타내는 정수를 반환한다.
> 

### Date.prototype.setMinutes

> Date 객체의 분(0 ~ 59)을 나타내는 정수를 설정한다. 옵션으로 초, 밀리초도 설정할 수 있다.
> 

### Date.prototype.getSeconds

> Date 객체의 초(0 ~ 59)을 나타내는 정수를 반환한다.
> 

### Date.prototype.setSeconds

> Date 객체의 초(0 ~ 59)을 나타내는 정수를 설정한다. 옵션으로 밀리초도 설정할 수 있다.
> 

### Date.prototype.getMilliseconds

> Date 객체의 밀리초(0 ~ 999)을 나타내는 정수를 반환한다.
> 

### Date.prototype.setMilliseconds

> Date 객체의 밀리초(0 ~ 999)을 나타내는 정수를 설정한다.
> 

### Date.prototype.getTime

> `1970년 1월 1일 00:00:00(UTC)`를 기점으로 Date 객체의 시간까지 경과된 밀리초를 반환한다.
> 

```jsx
new Date('2020/07/24/12:30').getTime(); // 1595561400000
```

### Date.prototype.setTime

> `1970년 1월 1일 00:00:00(UTC)`를 기점으로 경과된 밀리초를 설정한다.
> 

```jsx
const today = new Date();

today.setTime(86400000); // 1day
console.log(today); // Fri Jan 02 1970 09:00:00 GMT+0900 (한국 표준시)
```

### Date.prototype.getTimezoneOffset

> **UTC와 Date 객체에 지정된 로캘(locale) 시간과의 차이를 분 단위로 반환한다**. KST는 UTC에 9시간을 더한 시간이다. 즉, `UTC = KST - 9h`
> 

```jsx
const today = new Date(); // today의 지정 로캘은 KST이다.

// UTC와 today의 지정 로캘 KST의 차이는 -9시간이다.
today.getTimezoneOffset() / 60; // -9
```

### Date.prototype.toDateString

> 사람이 읽을 수 있는 형식의 문자열로 Date 객체의 날짜를 반환한다.
> 

### Date.prototype.toTimeString

> 사람이 읽을 수 있는 형식으로 Date 객체의 시간을 표현한 문자열을 반환한다.
> 

### Date.prototype.toISOString

> ISO 8601 형식으로 Date 객체의 날자와 시간을 표현한 문자열을 반환한다.
> 

```jsx
const today = new Date('2020/7/24/12:30')

today.toISOString(); // 2020-07-24T03:30:00.000Z
```

### Date.prototype,toLocaleString

> 인수로 전달한 로캘을 기준으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다.
> 

```jsx
const today = new Date('2020/7/24/12:30')

today.toLocaleString(); // 2020. 7. 24. 오후 12:30:00
today.toLocaleString('ko-KR'); // 7/24/2020, 12:30:00 PM
today.toLocaleString('en-US'); // 2020/7/24 12:30:00
```

### Date.prototype.toLocaleTimeString

> 인수로 전달한 로캘을 기준으로 Date 객체의 시간을 표현한 문자열을 반환한다.
> 

```jsx
const today = new Date('2020/7/24/12:30')

today.toLocaleTimeString(); // 오후 12:30:00
today.toLocaleTimeString('ko-KR'); // 12:30:00 PM
today.toLocaleTimeString('en-US'); // 12:30:00
```