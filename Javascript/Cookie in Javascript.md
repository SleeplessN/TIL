# Javascript에서의 Cookie

- 쿠키란 브라우저에 저장되는 작은 크기의 문자열이다. HTTP 프로토콜의 일부이다.
- 쿠키는 주로 웹 서버에 의해 만들어진다.
- 서버가 HTTP 응답 헤더(header)의 `Set-Cookie`에 내용을 넣어 전달하면, 브라우저는 이 내용을 자체적으로 브라우저에 저장하는데 이게 쿠키이다.
- 쿠키는 클라이언트 식별과 같은 인증에 가장 많이 쓰인다
  1. 사용자가 로그인하면 서버는 HTTP 응답 헤더의 `Set-Cookie` 에 담긴 “세션 식별자(session identifier)” 정보를 사용해 쿠키를 설정
  2. 사용자가 동일 도메인에 접속하려고 하면 브라우저는 HTTP `Cookie` 헤더에 인증 정보가 담긴 고윳값(세션 식별자)을 함께 실어 서버에 요청을 보낸다.
  3. 서버는 브라우저가 보낸 요청 헤더의 세션 식별자를 읽어 사용자를 식별

## 쿠키 다루기

1. **쿠키 읽기**

   ```jsx
   document.cookie; // cookie1=value1; cookie2=value2;...
   ```

   - 결과는 ;(세미클론)으로 구분되고 하나의 독립된 쿠키는 ‘name = value’ 쌍으로 이루어져 있다.

2. **쿠키 쓰기**

   `document.cookie`에 직접 값을 쓸 수 있다. 이 때 cookie는 데이터 프로퍼티가 아니라 **접근자 프로퍼티**이다.

   ```jsx
   document.cookie = "name = sleepless"; // 이름이 name인 크키의 값만 갱신한다.
   document.cookie; // 결과에 name=sleepless이 등록된 것을 볼 수 있다.
   ```

   - document.cookie를 했다고 **모든 값을 덮어 쓰는게 아니라 명시된 쿠키인 name 값만 갱신**한다.

   - 쿠키의 이름과 값에는 특별한 제약이 없기 때문에 모든 글자가 허용되지만, **형식의 유효성을 일관성 있게 유지하기 위해** 반드시 내장 함수 [encodeURIComponent](https://www.notion.so/escape-encodeURI-encodeURIComponent-cf6b6e1dd513461687771d1a879b725b) 를 사용하여 escape(즉, 인코딩)처리를 해줘야 한다.

   ```jsx
   // 특수 값(공백)은 인코딩 처리해 줘야 한다.
   let name = "my name";
   let value = "Sleepless Night";

   // 인코딩 처리를 해, 쿠키를 my%20name=Sleepless%20Night 로 변경하였다.
   document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

   alert(document.cookie); // ...; my%20name=Sleepless%20Night
   ```

   ❗ **쿠키의 한계**

   - `encodeURIComponent`로 인코딩한 이후의 `name=value` 쌍은 4KB를 넘을 수 없다. 이 용량을 넘는 정보는 쿠키에 저장할 수 없다.
     (반면 LocalStorage는 최대 5MB의 정보를 저장할 수 있다.)
   - 도메인 하나당 저장할 수 있는 쿠키의 개수는 20여 개 정도로 한정되어 있다. 개수는 브라우저에 따라 조금씩 다르다.

   ## 쿠키 값 옵션

   쿠키에는 옵션값들이 존재하며 ;(세미콜론)으로 구분한다.

   ex. `document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"`

   1. **path (Default : 현재 경로)**

      - URL path(경로)의 접두사로, 이 경로나 이 경로의 하위 경로에 있는 페이지만 쿠키에 접근할 수 있다.

      - `path=/admin` 옵션을 사용하여 설정한 쿠키는 `/admin`과 `/admin/something`에선 볼 수 있지만, `/home` 이나 `/adminpage`에선 볼 수 없다. (탐색기 같은거)

      - 특별한 경우가 아니라면, `path` 옵션을 `path=/`같이 루트로 설정해 웹사이트의 모든 페이지에서 쿠키에 접근할 수 있도록 한다.

   2. **domain (Default : 쿠키를 설정한 도메인에서만 접근가능)**

      - 민감한 데이터가 저장된 쿠키는 관련 페이지에서만 볼 수 있도록 하기 위해서 쿠키에 접근 가능한 domain(도메인)을 지정

      - 다만, 몇 가지 제약이 있어서 아무 도메인이나 지정할 수 없다.

        case 1) 도메인 설정 X ⇒ 다른 도메인이나 서브 도메인에서 접근 X

        case 2)`domain = [site.com](http://site.com)` ⇒ 다른 도메인에서 접근 X (서브 도메인은 O)

      ```jsx
      // site.com에서
      // 서브 도메인(*.site.com) 어디서든 쿠키에 접속하게 설정할 수 있다.
      document.cookie = "user=John; domain=site.com";

      // 이렇게 설정하면
      // forum.site.com와 같은 서브도메인에서도 쿠키 정보를 얻을 수 있다.
      alert(document.cookie); // user=John 쿠키를 확인할 수 있다
      ```

   3. **expire와 max-age**

      - expire(유효 일자) max-age(만료 기간)이 지정이 되어 있지 않으면, 해당 쿠키는 브라우저가 닫히면 같이 사라진다. 이를 세션 쿠키(session cookie)라고 한다.

      - 반대로 설정되어 있다면 브라우저가 닫혀도 삭제되지 않는다.

      - expire

      ```jsx
      // 지금으로부터 하루 후 삭제
      let date = new Date(Date.now() + 86400e3); // 하루는 86000초(e3은 ms단위이기 때문)
      date = date.toUTCString();
      document.cookie = "user=John; expires=" + date;
      ```

      쿠키의 유효 일자는 반드시 GMT(Greenwich Mean Time) 포맷으로 설정해야함

      ⇒ `date.toUTCString`을 사용

      **이 기간을 과거로 설정하면 쿠키 삭제**

      - max-age

      쿠키 만료 기간을 설정 (expire의 대안)

      ```jsx
      // 1시간 뒤에 쿠키가 삭제
      document.cookie = "user=John; max-age=3600";
      ```

      이 또한 **max-age 값을 0이나 음수로 지정하면 쿠키 삭제**

   4. **secure**

      ```jsx
      // (https:// 로 통신하고 있다고 가정 중)
      // 설정한 쿠키는 HTTPS 통신시에만 접근할 수 있음
      document.cookie = "user=John; secure";
      ```

      secure이 있다면 http**s** 에서만 접근 가능

   5. **samesite**
      - **`samesite=strict`**
        : 사용자가 사이트 외부에서 요청을 보낼 때, `samesite=strict`옵션이 있는 쿠키는 절대로 전송X
      - **`samesite=lax`**
        : 사이트 외부에서 요청을 보낼 때 브라우저가 쿠키를 보내는 걸 막아주지만 예외 존재
        예외 1. “안전한” HTTP 메서드인 경우
        예외 2. 작업이 최상위 레벨 탐색에서 이루어질 때(브라우저 주소창에서 URL을 변경하는 경우).

## 쿠키 함수

1. **쿠키접근**

   ```jsx
   // 주어진 이름의 쿠키를 반환하는데,
   // 조건에 맞는 쿠키가 없다면 undefined를 반환한다.
   function getCookie(name) {
     let matches = document.cookie.match(
       new RegExp(
         "(?:^|; )" +
           name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
           "=([^;]*)"
       )
     );
     return matches ? decodeURIComponent(matches[1]) : undefined;
   }
   ```

2. **쿠키생성**

   ```jsx
   const setCookie = function (name, value, exp) {
     var date = new Date();
     date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
     document.cookie =
       name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
   };

   // setCookie(변수이름, 변수값, 기간(일)) (하루뒤 삭제)
   setCookie("expend", "true", 1);
   ```

   ```jsx
   const setCookie = function(name, value, max-age) {
   document.cookie = name + '=' + value + ';max-age= ' + max-age + ';path=/';
   };

   // setCookie(변수이름, 변수값, 초); (하루 뒤 삭제)
   setCookie("expend", "true", 86400);
   ```

3. **쿠키삭제**

   ```jsx
   var deleteCookie = function (name) {
     document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
   };

   // deleteCookie(변수이름)
   deleteCookie("name");
   ```

   **정확하게 쿠키 삭제란건 없고 기간을 조정한 값을 덮어씌워 삭제하는 것이다.**

참고 : [https://ko.javascript.info/cookie](https://ko.javascript.info/cookie)
