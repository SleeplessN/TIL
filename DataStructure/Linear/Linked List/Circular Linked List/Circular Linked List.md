# Circular Linked List

<img src="Circular-Linked-List(img)/Untitled.png" width="300" >

<img src="Circular-Linked-List(img)/Untitled%201.png" width="200" >

- 노드 : 데이터 저장단위(데이터값, 포인터)로 구성
  - Data : 해당 주소의 Data를 담는 공간
  - Next : 각 노드안에서 다음 주소를 가지고 있는 공간

<br>
<br>

- **특징**

  **마지막 노드가** Null을 가르키는게 아닌 **첫번째 노드를 가리킨다.**

<br>
<br>

- **장점**

  단순 연결 리스트처럼 머리와 꼬리를 가리키는 포인터 변수를 각각 두지 않아도,

  하나의 포인터 변수만 있어도 머리 또는 꼬리에 노드를 간단히 추가할 수 있다.

<br>
<br>
<br>

- **구현해보기**
  <details>
  <summary> 구현 with JavaScript </summary>

  ```jsx
  // Node() : data와 point를 가지고 있는 객체
  function Node(data) {
    this.data = data;
    this.next = null;
  }

  // CircularLinkedList
  function CircularLinkedList() {
    this.head = null;
    this.length = 0;
  }

  // size() : 연결 리스트 내 노드 개수 확인
  CircularLinkedList.prototype.size = function () {
    return this.length;
  };

  // isEmpty() : 객체 내 노드 존재 여부 파악
  CircularLinkedList.prototype.isEmpty = function () {
    return this.length === 0;
  };

  // printNode(): 노드 출력
  CircularLinkedList.prototype.printNode = function () {
    process.stdout.write("head -> ");

    if (this.length != 0) {
      process.stdout.write(`${this.head.data} -> `);
      for (let node = this.head.next; node != this.head; node = node.next) {
        process.stdout.write(`${node.data} -> `);
      }
    }

    console.log("null");
  };

  // append() : 연결 리스트 가장 끝에 노드 추가
  CircularLinkedList.prototype.append = function (value) {
    let node = new Node(value),
      current = this.head;

    if (this.head === null) {
      this.head = node;
    } else {
      while (current.next != this.head) {
        current = current.next;
      }
      current.next = node;
    }

    node.next = this.head;

    this.length++;
  };

  //insert() : position 위치에 노드 추가
  CircularLinkedList.prototype.insert = function (value, position = 0) {
    if (position < 0 || position > this.length) {
      return false;
    }

    let node = new Node(value),
      current = this.head,
      index = 0,
      prev;

    if (position === 0) {
      node.next = current;

      if (this.isEmpty()) {
        current = node;
      } else {
        while (current.next != this.head) {
          current = current.next;
        }
      }

      this.head = node;
      current.next = this.head;
    } else {
      while (index++ < position) {
        prev = current;
        current = current.next;
      }

      node.next = current;
      prev.next = node;

      if (node.next === null) {
        node.next = this.head;
      }
    }
    this.length++;

    return true;
  };

  // remove() : value 데이터를 찾아 노드 삭제
  CircularLinkedList.prototype.remove = function (value) {
    let current = this.head,
      prev = current,
      data;

    while (current.data != value && current.next != this.head) {
      prev = current;
      current = current.next;
    }

    if (current.data != value) {
      return null;
    }

    data = current.data;
    if (current === this.head) {
      while (current.next != this.head) {
        current = current.next;
      }

      this.head = this.head.next;
      current.next = this.head;
    } else {
      prev.next = current.next;
    }

    this.length--;

    return data;
  };

  // removeAt() : position 위치 노드 삭제
  CircularLinkedList.prototype.removeAt = function (position = 0) {
    if (position < 0 || position >= this.length) {
      return null;
    }

    let current = this.head,
      index = 0,
      prev,
      data;

    if (position === 0) {
      data = current.data;

      while (current.next != this.head) {
        current = current.next;
      }

      this.head = this.head.next;
      current.next = this.head;
    } else {
      while (index++ < position) {
        prev = current;
        current = current.next;
      }

      data = current.data;

      prev.next = current.next;
    }
    this.length--;

    return data;
  };

  // indexOf(): value 값을 갖는 노드 위치 반환
  CircularLinkedList.prototype.indexOf = function (value) {
    let current = this.head,
      index = 0;

    do {
      if (current.data === value) {
        return index;
      }
      index++;
      current = current.next;
    } while (current != this.head);

    return -1;
  };

  // remove2(): indexOf + removeAt = remove
  CircularLinkedList.prototype.remove2 = function (value) {
    let index = this.indexOf(value);
    return this.removeAt(index);
  };
  ```

    </details>

<br>
<br>
<br>
<br>
<br>
<br>

**Ref :**

[https://velog.io/@mmindoong/자료구조-원형-연결-리스트-Circular-Linked-List](https://velog.io/@mmindoong/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EC%9B%90%ED%98%95-%EC%97%B0%EA%B2%B0-%EB%A6%AC%EC%8A%A4%ED%8A%B8-Circular-Linked-List)
