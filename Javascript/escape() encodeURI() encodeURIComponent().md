# escape() / encodeURI() /encodeURIComponent()

이 함수들은 모두 자바스크립트에서 **인코딩을 담당하는 함수**이다.

### 1. escape()

```jsx
ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
1234567890
@*-_+./
```

위 열거된 아스키문자가 아니라면 모두 **유니코드 형식**으로 변환한다.

여기서 **유니코드**는 전 세계의 모든 문자를 컴퓨터에서 일관되게 표현하고 다룰 수 있도록 설계된 산업 표준이다

그 변환된 형식은 16진수 형식으로 표시 되며,

- 1바이트 문자는 `%XX` 형태로 /
  ex) 빈칸 → %20
- 2바이트 문자는 `%uXXXX` 형태로 변환된다.
  ex) 한글 → %uD55C%uAE00

주소창에 %XX 형식의 문자들이 들어있는 것들도 인코딩 된것의 한 종류로 보면 된다.

### 2. encodeURI()

기본적으로 escape()와 비슷한 동작

차이점은 인터넷 주소표시에 쓰이는 특수문자들 `: ; / = ? &` 은 인코딩이 되지 않는다.

즉, 파라미터를 전달하는 인터넷주소(URL) 전체를 인코딩할 때 사용한다.

### 3. encodeURIComponent()

인터넷 주소에 쓰는 특수문자 `: ; / = ? &` 까지 변환한다.

인터넷 주소를 하나의 변수에 넣을 때 쓸 수 있다.

★ **encodeURIComponent() 는 UTF-8 로 인코딩 하는 것과 같음**

URL을 통째로 인코딩할 때는 `encodeURI()`,

URL의 파라메터만 인코딩할 때는 `encodeURIComponent()`를 쓰면 된다.

**Ref :**

- [https://baver.zetacode.com/entry/자바스크립트-escape-encodeURI-encodeURIComponent-차이](https://baver.zetacode.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-escape-encodeURI-encodeURIComponent-%EC%B0%A8%EC%9D%B4)
