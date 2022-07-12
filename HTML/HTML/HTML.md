## HTML vs XHTML

### HTML (HyperText Markup Language)

- SGML에 근거하여 만들어졌다.
- 문제가 있는 부분(닫히지 않은 태그나 잘못된 태그 사용)을 허용하거나 무시하고 사용한다. (오류에 대해서 관대하다.)
- 하지만 이는 정보의 구조화 및 데이터간의 연관성 표현과 유효성 검증을 어렵게 한다.

### XML (EXtension Markup Language)

- HTML과 같은 문서의 형태보다는 정보의 전달에 초점이 맞춰져있다.
  (단, 요즘은 XML보단 JSON을 사용한다)
- XML 태그는 HTML 태그처럼 미리 정의되어 있지 않고, 사용자가 직접 정의할 수 있다. (확장성이 좋다)
- 텍스트 데이터 형식의 언어로 모든 XML 문서는 유니코드 문자로만 이루어진다.
- SGML의 단순화된 부분집합이다.

### XHTML (EXtension HyperText Markup Language)

- HTML을 XML 바탕으로 새롭게 만들어진 마크업 언어이다.
- HTML보다 구조화된 형식과 엄격한 문법을 가지고 있다.

ex) XML, HTML, XHTML의 문법 구조를 한 눈에 보여주는 예제

- `<br>` — HTML notation
- `<br />` — XHTML notation
- `<br/>` — XML notation

## 웹(WEB)

### 웹표준은 누가 만드는가?

- **World Wide Web Consortiums(W3C)**

- Reference Book - 제프리 젤드만의 웹표준 가이드

## 웹 구조

### 3단

- 주로 **고정형**에 사용된다.
- **[ 헤더 /** 콘**텐츠** / **푸터 ]**로 구성된다.
- **[ 헤더 /** **콘텐츠**(**비주얼**, **메인컨텐츠**, **슬로건**) / **푸터 ]와 같이 5단으로 구성될 수도 있다.**
- 각각의 요소에는 다음과 같이 역할에 맞는 Native Tag를 사용하면 된다.
  - 헤더 : `<header> </header>`
  - 비주얼 : `<div> </div>`
  - 메인콘텐츠 : `<main> </main>`
  - 슬로건 : `<article> </article>`
  - 푸터 : `<footer> </footer>`
- WAI-ARIA의 Role, Property, State 사용하여 다음과 같이 표현할 수 있다.
  - 헤더 : `<div role=”banner”> <div>`
  - 비주얼 : `<div role=”region”> <div>`
  - 메인콘텐츠 : `<div role=”main”> <div>`
  - 슬로건 : `<div role=”article”> <div>`
  - 푸터 : `<div role=”contentinfo”> <div>`
- 하지만 존재하는 Native Tag를 사용하는 것을 권장한다.

### 4단

- 주로 **반응형**에 사용된다.
- **[ 헤더** / **내비게이션** / **콘텐츠** / **푸터 ]** 로 구성된다

### 웹 접근성

- **웹 사이트에서 제공하는 정보를 모든 사람이 접근하고 이용 할 수 있도록 보장하는 것**
- 웹 접근성은 **사용자 관점**에서 바라보아야 한다.
- 장애에 대한 이해 : 장애는 틀린 것이 아니라 다른 것이다.
  - 시작 장애 - 전맹, 저시력
  - 청각 장애
  - 지체 장애 - 절단 및 지체기능 장애
  - 뇌병변 장애
- 장애뿐만 아니라 **다른 브라우저를 사용하는 사람들에게도 동일하게 정보를 제공**하는 것도 포함이다.
- 웹 접근성을 위해서 고려해야할 사항
  예를 들어, 이미지를 클릭하면 어떠한 동작을 하도록 만들고자 할 때,
  1. `<img>` 태그에
     - `tabIndex=”0”`을 넣어 tab을 눌렀을 때 접근할 수 있도록 한다.
     - tab으로 접근을 해도 결국 엔터를 눌러도 동작을 하지 않으므로 `keyup` 이벤트를 추가한다.
     - 클릭할 경우에도 마찬가지로 `onClick` 이벤트를 추가한다.
  2. 1번의 방법보다는 해당 기능을 가지고 있는 `<button>` **태그를 사용하는 것이 더 효율적**이다.
     - 이미지는 그냥 svg나 background-image를 사용하면 된다.

### Emmet이란?

- Emmet은 HTML, XML, XSL 문서 등을 편집할 때 빠른 코딩을 위해 사용하는 플러그인이다.
- VS Code는 에밋 플러그인이 내장되어 있고, 다른 프로그램의 경우 따로 설치해주어야 한다.
- Emmet 사용 예시
  - `main.main{메인콘텐츠}` + 탭 버튼 ⇒ `<main class=”main”>메인콘텐츠</main>`
  - `.visual` + 탭 버튼 ⇒ `<div class=”visual”></div>`
- 추가적인 사용법은 [https://docs.emmet.io/cheat-sheet/](https://docs.emmet.io/cheat-sheet/) 참고

### 네이밍 방법

- HTML의 class, id 명이나 Javascript의 변수나 함수명은 **길어도 상관없다.**
- 짧아서 나중에 알아보기 힘든 것 보다는 길더라도 **이 것이 무엇을 의미하는지 정확하게 표시하는 것이 더 중요**하다
- 띄워쓰기 표시 방법 ( 예 : footer inner )
  - Pascal Case : FooterInner
  - Camel Case : footerInner
  - Kebab Case : footer-inner
  - Snake Case : footer_inner

### 기본 HTML 구조 파헤치기

```html
<!--어떤 문법을 사용하는지 명시해야 한다. 그냥 html은 html5를 의미한다. -->
<!DOCTYPE html>
<!--어떤 언어를 사용하는지 작성해야 한다.-->
<!--이는 스크린 리더가 어떤 언어의 성우로 읽는지 정하는 웹 접근성에 해당한다.-->
<!--KR은 국가명을 의미한다. 만약 영국식 영어를 원하면 en-UK와 같이 작성한다. -->
<html lang="ko-KR">
  <head>
    <!--HTML의 문자 인코딩 방식을 명시한다-->
    <meta charset="UTF-8" />
    <!--렌더링 엔진을 말하는 부분으로 edge는 인터넷 edge를 말하는 것이 아닌 최신 렌더링 엔진 실행하는 것을 말한다-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--뷰포트의 모양과 크기를 명시한다-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--HTML의 제목 부분으로 맨 마지막에 위치 시킨다-->
    <title>문서의 제목</title>
  </head>
  <body></body>
</html>
```
