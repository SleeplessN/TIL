# 39장. DOM

> **DOM이란 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API, 즉 프로퍼티와 메서드를 제공하는 트리 자료구조다.**

## 노드

### HTML 요소와 노드 객체

<img src="./39장 DOM-images/Untitled.png" width="500">

- HTML 문서들은 HTML 요소들의 집합으로 이루어진다.
- HTML 요소는 중첩 관계를 갖는다. 이로 인해 계측적인 부자관계가 형성된다.

  - **트리 자료구조**

    - 트리 자료구조는 노드들의 계층 구조(부모 노드와 자식 노드)로 이루어 진다.

     <img src="./39장 DOM-images/Untitled%201.png" width="500">

> **노드 객체들로 구성된 트리 자료구조를 DOM(트리)이라 한다.**

### 노드 객체의 타입

<img src="./39장 DOM-images/Untitled%202.png" width="700">

1. **문서 노드 (document node)**
   - **문서 노드는 DOM 트리의 최상위에 있는 루트 노드이며 document 객체를 가리킨다.**
2. **요소 노드 (element node)**
   - **요소 노드는 HTML 요소를 가리키는 객체다. 문서의 구조를 표현한다.**
   - HTML 요소 간의 중첩에 의한 부자 관계를 가지고, 이를 통해 정보를 구조화한다.
3. **어트리뷰트 노드 (attribute node)**
   - **어트리뷰트 노드는 HTML 요소의 어트리뷰트를 가리키는 객체이다.**
   - 요소 노드와 연결되어 있다. 문서 노드와 부자 관계는 아니다
4. **텍스트 노드 (text node)**
   - **텍스트 노드는 HTML 요소의 텍스트를 가리키는 객체이다. 문서의 정보를 표현한다.**

- 4가지 말고도 총 12개의 노드 타입이 있다.

### 노드 객체의 상속 구조

<img src="./39장 DOM-images/Untitled%203.png" width="700">

| input 요소 노드 객체의 특성                                                | 프로토타입을 제공하는 객체 |
| -------------------------------------------------------------------------- | -------------------------- |
| 객체                                                                       | Object                     |
| 이벤트를 발생시키는 객체                                                   | EventTarget                |
| 트리 자료구조의 노드 객체                                                  | Node                       |
| 브라우저가 렌더링할 수 있는 웹 문서의 요소(HTML, XML, SVG)를 표현하는 객체 | Element                    |
| 웹 문서의 요소 중에서 HTML 요소를 표현하는 객체                            | HTMLElement                |
| HTML 요소 중에서 input 요소를 표현하는 객체                                | HTMLInputElement           |

> 💡 DOM은 HTML의 계층적인 구조와 정보를 표현하는 것은 물론, 노드 타입에 따라 필요한 기능을 프로퍼티와 메서드의 집합인 **DOM API**로 제공한다.
> 이 DOM API를 통해 HTML의 구조나 내용 또는 스타일 등을 동적으로 조작할 수 있다.

## 요소 노드 취득

> 요소 노드의 취득은 HTML 요소를 조작하는 시작점이다.
> 이를 위해 DOM은 요소 노드를 취득할 수 있는 다양한 메서드를 제공한다.

> 💡 **지금부터 나오는 표의 프로퍼티들은 `prototype`가 생략된 형태이다.**

| 프로퍼티                           | 설명                                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------------------- |
| `Document.getElementById()`        | 인수로 전달한 id 값을 갖는 하나의 요소 노드를 탐색해 반환                                   |
| `Document.getElementsByTagName()`  | 인수로 전달한 태그 이름을 갖는 모든 요소 노드들을 탐색하여 반환                             |
| `Document.getElementByClassName()` | 인수로 전달한 class 값을 갖는 모든 요소 노드들을 탐핵하여 반환                              |
| `Document.querySelector()`         | 인수로 전달한 CSS 선택자를 만족시키는 하나의 요소 노드를 탐색하여 반환                      |
| `Document.querySelectorAll()`      | 인수로 전달한 CSS 선택자를 만족시키는 모든 요소 노드를 탐색하여 반환                        |
| `Element.matches()`                | 인수로 전달한 CSS 선택자를 통해 특정 요소 노드를 취득할 수 있는지 확인 (이벤트 위임에 유용) |

- `querySelector()` , `querySelectorAll()` 는 `getElementBy***` 메서드들 보다 느린것으로 알려져 있지만 좀 더 구체적이고 일관된 방식으로 요소 노드를 취득하는 장점이 있다.

> 💡 **그래서 무엇을 써야하나?**
> id 어트리뷰트가 있는 요소 노드를 취득하는 경우 ⇒ `getElementById`
> 나머지 ⇒ `querytSelector`, `querySelectorAll`

### HTMLCollection과 NodeList

> DOM 컬렉션 객체인 HTMLCollection과 NodeList는 DOM API가 여러 개의 결과값을 반환하기 위한 DOM 컬레션 객체이다.

- 유사 배열 객체이자 이터러블이다.
- 노드 객체의 **상태 변화를 실시간으로 반영**하는 살아 있는 객체다.
  - 정확히는 **HTMLCollection만 실시간**이다.

1. **HTMLCollection**
   - `getElementsByTagName`, `getElementByClassName` 메서드가 반환하는 객체이다.
   - **실시간으로 노드 객체의 상태 변경을 반영**하여 요소를 제거할 수 있으므로 주의해야 한다.
     - 해결책 : 사용하지 않거나 배열로 바꾸어 배열의 고차 함수를 사용
2. **NodeList**
   - `getSelectorAll` 메서드가 반환하는 객체이다.
   - 실시간으로 노드 객체 상태 변경을 반영하지 않는다.
     - **하지만**, `childNodes` 프로퍼티가 반환하는 NodeList 객체는 **실시간으로 노드 객체의 상태 변경을 반영**한다.
   - `forEach`, `item`, `entries`, `keys`, `values` 메서드를 제공한다.

> 💡 **노드 객체의 상태 변경과 상관없이 안전하게 DOM 컬렉션을 사용하고 싶다면?
> ⇒ HTMLCollection, NodeList 를 배열로 변환하여 사용**

## 노드 탐색

- **Node** 인터페이스는
  - `parentNode`, `previousSibling`, `nextSibling`, `firstChild`, `lastChild`, `childNodes`
     프로퍼티를 제공
- **Element** 인터페이스는
  - `previousElementSibling`, `nextElementSibling`, `firstElementChild`, `lastElementChild`, `children` 프로퍼티를 제공한다.
- 트리 노드 탐색 프로퍼티
  <img src="./39장 DOM-images/Untitled%204.png" width="700">

> 💡 **노드 탐색 프로퍼티는 모두 접근자 프로퍼티다!**

### 공백 텍스트 노드

> HTML 요소 사이의 스페이스, 탭, 줄바꿈(개행) 등의 **공백 문자는 텍스트 노드를 생성하는데 이를 공백 텍스트 노드라 한다.**

- 공백 문자가 제거하면 공백 텍스트 노드가 사라지지만 가독성이 좋지 않으므로 권장하지 않는다.

### 자식 노드 탐색

| 프로퍼티                    | 설명                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------- |
| `Node.childNode`            | 자식 노드를 모두 탐색하여 NodeList에 담아 반환 (텍스트 노드 포함 ⭕️)                   |
| `Element.children`          | 자식 노드 중 요소 노드만 모두 탐색하여 HTMLCollection에 담아 반환 (텍스트 노드 포함 ❌) |
| `Node.firstChild`           | 첫 번째 자식 노드를 반환 (텍스트 노드이거나 요소 노드)                                  |
| `Node.lastChild`            | 마지막 자식 노드를 반환 (텍스트 노드이거나 요소 노드)                                   |
| `Element.firstElementChild` | 첫 번째 자식 요소 노드를 반환 (요소 노드)                                               |
| `Element.lastElementChild`  | 첫 번째 자식 요소를 반환 (요소 노드)                                                    |

### 자식 노드 존재 확인

| 프로퍼티 or 메서드                               | 설명                                                           |
| ------------------------------------------------ | -------------------------------------------------------------- |
| `Node.hasChildNodes()`                           | 자식 노드가 존재하는지 확인 (텍스트 노드 포함 ⭕️)             |
| `.children.length` , `Element.childElementCount` | 자식 노드 중 요소 노드가 존재하는지 확인 (텍스트 노드 포함 ❌) |

### 요소 노드의 텍스트 노드 탐색

- 요소 노드의 텍스트 노드는 요소 노드의 자식 노드이다
  - `firstChild` 프로퍼티로 접근하고 반환한 노드는 텍스트 노드이거나 요소 노드이다.

### 부모 노드 탐색

| 프로퍼티          | 설명           |
| ----------------- | -------------- |
| `Node.parentNode` | 부모 노드 탐색 |

### 형제 노드 탐색

| 프로퍼티                         | 설명                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| `Node.previousSibling`           | 부모 노드가 같은 형제 노드 중 자신의 이전 형제 노드를 탐색하여 반환 (텍스트 노드 포함 ⭕️) |
| `Node.nextSibling`               | 부모 노드가 같은 형제 노드 중 자신의 다음 형제 노드를 탐색하여 반환 (텍스트 노드 포함 ⭕️) |
| `Element.previousElementSibling` | 부모 노드가 같은 형제 노드 중 자신의 이전 형제 요소를 탐색하여 반환 (텍스트 노드 포함 ❌)  |
| `Element.nextElementSibling`     | 부모 노드가 같은 형제 노드 중 자신의 다음 형제 요소를 탐색하여 반환 (텍스트 노드 포함 ❌)  |

## 노드 정보 취득

| 프로퍼티        | 설명                                                  |
| --------------- | ----------------------------------------------------- |
| `Node.nodeType` | 노드 객체의 종류, 즉 노드 타입을 나타내는 상수를 반환 |
| `Node.nodeName` | 노드의 이름을 문자열로 반환                           |

### Node.nodeType

- `Node.ELEMENT_NODE` : 요소 노드 타입을 나타내는 상수 `1`을 반환
- `Node.TEXT_NODE` : 텍스트 노드 타입을 나타내는 상수 `3`을 반환
- `Node.DOCUMENT_NODE` : 문서 노드 타입을 나타내는 상수 `9`를 반환

### Node.nodeName

- 요소 노드 : 대문자 문자열로 `태그 이름`(”UL”, ”LI” 등)을 반환
- 텍스트 노드 : 문자열 “`#text`”를 반환
- 문서 노드 : 문자열 “`#document`”를 반환

## 요소 노드의 텍스트 조작

- `getter` / `setter`가 모두 존재한다.

| 프로퍼티       | 설명                                                                |
| -------------- | ------------------------------------------------------------------- |
| `.nodeValue`   | 텍스트 노드 객체의 값을 반환하거나 변경 (그 외는 null 반환)         |
| `.textContent` | 요소 노드의 텍스트와 모든 자손 노드의 텍스트를 모두 취득하거나 변경 |

> 🖐 `textContent` vs `innerText`
> innerText 프로퍼티는 다음과 같은 이유로 사용하지 않는 것이 좋다.

1. innerText는 CSS에 순종적이다. (CSS에 비표시되는 요소 노드의 텍스트를 반환하지 않는다.)
2. 즉,CSS를 고려해야 하므로 더 느리다.
   >

## DOM 조작

> **DOM 조작이란 새로운 노드를 생성하여 DOM에 추가하거나 기존 노드를 삭제 또는 교체하는 것을 말한다.**
> DOM 조작시 **리플로우**와 **리페인트**가 발생할 수 있으므로 주의해서 다루어야 한다.

- `getter` / `setter` 가 모두 존재한다.

| 프로퍼티                     | 설명                                                           |
| ---------------------------- | -------------------------------------------------------------- |
| `Element.innerHTML`          | 요소 노드의 HTML 마크업을 취득하거나 변경                      |
| `Element.insertAdjacentHTML` | 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입 |

### innerHTML

- **장점**
  - 구현이 간단하고 직관적이다.
- **단점**
  - `크로스 사이트 스크립팅 공격`에 취약하다
  - 요소 노드의 innerHTML 프로퍼티에 마크업 문자열을 할당하는 경우 **모든 자식 노드를 제거하고** 할당한 HTML 마크업 문자열을 파싱한다
  - 새로운 요소를 삽입할 때 삽입할 위치를 지정할 수 없다.
- **결론 : 사용하지 않는 것이 좋다.**

### insertAdjacentHTML

- `Element.prototype.insertAdjacentHTML(position, DOMString)`

  - 두 번째 인수로 전달한 HTML 마크업 문자열(DOMString)을 파싱하고 그 결과를 첫 번째 인수로 전달한 위치(position)에 삽입한다.
  - 첫 번째 인수

    <img src="./39장 DOM-images/Untitled%205.png" width="500">

- 장점
  - 기존 요소에 영향을 주지 않고 새롭게 삽입될 요소만을 추가하므로 효율적이고 빠르다
- 단점
  - 크로스 사이트 스크립팅 공격에 취약하다.

### 노드 관련 메서드

| 기능                  | 메서드                                  | 설명                                                              |
| --------------------- | --------------------------------------- | ----------------------------------------------------------------- |
| 노드 생성             | `Document.createElement(tagName)`       | 요소 노드를 생성하여 반환한다.                                    |
| 노드 생성             | `Document.createTextNode(text)`         | 텍스트 노드를 생성하여 반환한다.                                  |
| 노드 추가             | `Node.appendChild(childNode)`           | 인수로 전달받은 노드를 호출한 노드의 마지막 자식 노드로 추가한다. |
| 복수 노드 생성과 추가 | `Document.createDocumentFragment()`     | 비어 있는 DocumentFragment 노드를 생성하여 반환                   |
| 노드 삽입             | `Node.appendChild(childNode)`           | 인수로 전달받은 노드를 호출한 노드의 마지막 자식 노드로 추가한다. |
| 노드 위치 변경        | `Node.insertBefore(newNode, childNode)` | newNode를 childNode 앞에 삽입(위치 변경)한다.                     |
| 노드 복사             | `Node.cloneNode([deep: true / false])`  | 노드의 사본을 생성하여 반환 ( 얕은 복사 : 텍스트 노드 포함 X)     |
| 노드 교체             | `Node.replaceChild(newChild, oldChild)` | oldChild를 newChild로 교체                                        |
| 노드 삭제             | `Node.removeChild(child)`               | child를 삭제                                                      |

- 노드 생성과 추가

  - 자식 노드가 하나도 없는 경우에는 `textContent` 프로퍼티를 사용하는 것이 간편하다.

- **`Document.createDocumentFragment()`**

  - 여러 번의 DOM 변경 ⇒ 여러 번의 리플로우 리페인트 실행 ⇒ 높은 비용이 듦
  - 컨테이너 요소를 사용하는 것은 한 번의 DOM 변경이 일어나지만 불필요한 컨테이너 요소(div)가 추가된다.
  - 이를 방지하고자 비어 있는 노드를 생성하는 `DocumentFragment()` 를 사용

- 노드 삽입
  - **`Node.insertBefore()`**
    - 해당위치에 추가하는 것이 아니라, 일단 부모 노드에 추가한 뒤에 위치를 변경하는 것이다.
      - `appendChild` 후에 `insertBefore`로 위치를 변경하는 것이다.
    - 두 번째 인수가 `null` 일 경우 `appendChild` 처럼 동작한다.

## 어트리뷰트

### 어트리뷰트 노드와 attributes 프로퍼티

- HTML 요소는 여러 개의 어트리뷰트(속성)를 가질 수 있다.
- 어트리뷰트는 HTML시작 태그에 `어트리뷰트 이름 = "어트리뷰트 값"` 형식

```html
<input id="user" type="text" value="heejun" />
```

```jsx
const { attributes } = document.getElementById("user");
console.log(attributes);
// NamedNodeMap {0: id, 1: type, 2: value, id: id, type: type, value: value, length: 3}

// 어트리뷰트 값 취득
console.log(attributes.id.value); // user
console.log(attributes.type.value); // text
console.log(attributesvluae.value); // heejun
```

### HTML 어트리뷰트 조작

| 기능               | 메서드                               | 설명                                |
| ------------------ | ------------------------------------ | ----------------------------------- |
| 어트리뷰트 값 참조 | `Element.getAttribute(name)`         | name 어트리뷰트의 값 참조           |
| 어트리뷰트 값 변경 | `Element.setAttributes(name, value)` | name 어트리뷰트의 값을 value로 변경 |

### HTML 어트리뷰트 vs DOM 프로퍼티

- HTML 어트리뷰트
  - HTML 요소의 초기 상태 (변하지 않는다)
- DOM 프로퍼티
  - HTML 요소의 최신 상태 (변한다)
- 대응 관계
  | 어트리뷰트 | 프로퍼티 |
  | -------------------- | ---------------------------------- |
  | id | id |
  | input.value (초기값) | input.value (최신값) |
  | class | className, classList |
  | for | htmlFor |
  | textContent | X |
  | 대소문자 구별 X | 카멜 케이스(maxlength → maxLength) |

### data 어트리뷰트와 dataset 프로퍼티

- data 어트리뷰트
  - `data-` 접두사 다음에 임의의 이름을 붙여 사용 (케밥 케이스)
  ```html
  <li id="1" data-user-id="7621" data-role="admin">Lee</li>
  <li id="2" data-user-id="9524" data-role="subscriber">Kim</li>
  ```
- dataset 프로퍼티

  - 카멜 케이스(camelCase) 사용
  - `HTMLElement.dataset` 프로퍼티로 취득하거나 변경할 수 있다.
    - 카멜 케이스 사용시 케밥케이스로 자동 변경된다.

  ```jsx
  <li id="1" data-user-id="7621" data-role="admin">Lee</li>
  <li id="2" data-user-id="9524" data-role="subscriber">Kim</li>

  // javascript
  // 첫번째 li 취득
  const user = document.querySelector('li');
  console.log(user.dataset.role) // "admin"
  ```

## 스타일

### 인라인 스타일 조작

```jsx
<div style="color: red">Hello World</div>;

// javascript
const $div = document.querySelector("div");

// 인라인 스타일 취득
console.log($div.style); // CSSStyleDeclaration {0: "color", ... }

// 인라인 스타일 변경
$div.style.color = "blue";

// 인라인 스타일 추가
$div.style.backgroundColor = "yellow";
```

### ⭐️ 클래스 조작

| 기능                | 프로퍼티 / 메서드                       | 설명                                                       |
| ------------------- | --------------------------------------- | ---------------------------------------------------------- |
| 클래스 값 취득/변경 | `Element.className`                     | class 어트리뷰트 값을 취득하거나 변경                      |
| 클래스 목록 취득    | `Element.classList`                     | class 어트리뷰트의 DOMTokenList 객체 반환                  |
| 클래스 목록 추가    | `Element.classList.add(…className)`     | 인수로 전달한 문자열을 추가                                |
| 클래스 목록 제거    | `Element.classList.remove(…className)`  | 인수로 전달한 문자열과 일치하는 클래스를 삭제              |
| 클래스 취득         | `Element.classList.index(index)`        | index에 해당하는 클래스를 삭제                             |
| 클래스 포함 여부    | `Element.classList.contains(className)` | 인수로 전달한 문자열이 쿨래스에 포함되어있는지 확인        |
| 클래스 변경         | `Element.classList.replace(old, new)`   | old class ⇒ new class 로 변경                              |
| 클래스 토글         | `Element.classList.toggle(className)`   | 인수로 전달한 클래스가 존재하면 제거, 존재하지 않으면 추가 |

### 요소에 적용되어 있는 CSS 스타일 참조

- `window.getComputedStyle(element[, pseudo])`
  - `element`로 전달한 요소 노드에 **최종적으로 적용되어 있는** 평가된 스타일을 `CSSStyleDeclaration` 객체에 담아 반환
  - **리플로우가 발생한다**

## DOM 표준

- HTML과 DOM 표준은 W3C과 WHATWG 두 단체가 협력하여 공통된 표준을 만들어왔다
- 2018년 4월부터 WHATWG이 단일 표준을 내놓기로 두 단체가 합의했다

| 레벨        | 표준 문서 URL                          |
| ----------- | -------------------------------------- |
| DOM Level 1 | https://www.w3.org/TR/REC-DOM-Level-1  |
| DOM Level 2 | https://www.w3.org/TR/DOM-Level-2-Core |
| DOM Level 3 | https://www.w3.org/TR/DOM-Level-3-Core |
| DOM Level 4 | https://dom.spec.whatwg.org            |
