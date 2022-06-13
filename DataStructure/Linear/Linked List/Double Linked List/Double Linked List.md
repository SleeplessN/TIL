# Double Linked List

![Untitled](<Double-Linked-List(img)/Untitled.png>)

- 노드 : 데이터 저장단위(데이터값, 포인터 2개)로 구성

  - Data : 해당 주소의 Data를 담는 공간
  - Prev : 각 노드안에서 이전 주소를 가지고 있는 공간
  - Next : 각 노드안에서 다음 주소를 가지고 있는 공간

<br>
<br>

- **사용하는 이유**

단일 연결리스트의 단점이 데이터 탐색에 있어서 찾고자하는 데이터가 어디에 있는간에 처음인 HEAD부터 차례차례 찾아가야 하기에 배열에 비해 탐색이 오래 걸리며 Θ(n)의 시간복잡도를 갖는다. 이를 줄이고자 맨 뒤에 TAIL을 만들어 뒤에서부터도 탐색이 가능하도록 한다.

<br>
<br>

- **장점**

1. 노드를 찾을 때는 단일 연결리스트에 비해 시간을 절반으로 줄일 수 있다.

<br>
<br>

- **단점**

1. 추가 포인터 때문에 더 많은 메모리가 필요

<br>
<br>

- **시간 복잡도**

탐색 : 정확하게 O(n/2)이지만, Big O에 의하면 여전히 O(n)

이 외의 이중 연결 리스트의 시간복잡도는 단일 연결 리스트의 성능과 동일

<br>
<br>
<br>

- **구현해보기**
  <details>
  <summary>구현 with JavaScript</summary>

  ```jsx
  // Node()
  function Node(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }

  // DoubleLinkedList() 생성자 함수
  function DoubleLinkedList() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // size() : 연결 리스트 내 노드 개수 확인
  DoubleLinkedList.prototype.size = function () {
    return this.length;
  };

  // isEmpty() : 객체 내 노드 존재 여부 파악
  DoubleLinkedList.prototype.isEmpty = function () {
    return this.length === 0;
  };

  // printNode(): 노드 정방향 출력
  DoubleLinkedList.prototype.printNode = function () {
    process.stdout.write("head -> ");
    for (let node = this.head; node != null; node = node.next) {
      process.stdout.write(`${node.data} -> `);
    }
    console.log("null");
  };

  // printNodeInverse() : 노드 역방향 출력
  DoubleLinkedList.prototype.printNodeInverse = function () {
    let temp = [];

    process.stdout.write("null <- ");
    for (let node = this.tail; node != null; node = node.prev) {
      temp.push(node.data);
    }
    for (let i = temp.length - 1; i >= 0; i--) {
      process.stdout.write(`${temp[i]} <- `);
    }
    console.log("tail");
  };

  // append() : 연결 리스트 가장 끝에 노드 추가
  DoubleLinkedList.prototype.append = function (value) {
    let node = new Node(value);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.length++;
  };

  // insert() : position 위치에 value 추가
  DoubleLinkedList.prototype.insert = function (value, position = 0) {
    if (position < 0 || position > this.length) {
      return false;
    }

    let node = new Node(value),
      current = this.head,
      index = 0,
      prev;

    if (position === 0) {
      if (this.head === null) {
        this.head = node;
        this.tail = node;
      } else {
        node.next = current;
        current.prev = node;
        this.head = node;
      }
    } else if (position === this.length) {
      current = this.tail;
      current.next = node;
      node.prev = current;
      this.tail = node;
    } else {
      while (index++ < position) {
        prev = current;
        current = current.next;
      }

      node.next = current;
      prev.next = node;

      current.prev = node;
      node.prev = prev;
    }

    this.length++;

    return true;
  };

  // remove() : value 삭제
  DoubleLinkedList.prototype.remove = function (value) {
    let current = this.head,
      prev;

    while (current.data != value && current.next != null) {
      prev = current;
      current = current.next;
    }

    if (current.data != value) {
      return null;
    }

    if (current === this.head) {
      this.head = current.next;
      if (this.length === 1) this.tail = null;
      else this.head.prev = null;
    } else if (current === this.tail) {
      this.tail = current.prev;
      this.tail.next = null;
    } else {
      prev.next = current.next;
      current.next.prev = prev;
    }

    this.length--;

    return current.data;
  };

  // removeAt() : position 위치 노드 삭제
  DoubleLinkedList.prototype.removeAt = function (position = 0) {
    if (position < 0 || position >= this.length) {
      return null;
    }

    let current = this.head,
      index = 0,
      prev;

    if (position === 0) {
      this.head = current.next;
      if (this.length === 1) this.tail = null;
      else this.head.prev = null;
    } else if (position === this.length - 1) {
      current = this.tail;
      this.tail = current.prev;
      this.tail.next = null;
    } else {
      while (index++ < position) {
        prev = current;
        current = current.next;
      }

      prev.next = current.next;
      current.next.prev = prev;
    }

    this.length--;

    return current.data;
  };

  // indexOf(): value 값을 갖는 노드 위치 반환
  DoubleLinkedList.prototype.indexOf = function (value) {
    let current = this.head,
      index = 0;

    while (current != null) {
      if (current.data === value) {
        return index;
      }

      index++;
      current = current.next;
    }

    return -1;
  };

  // remove2(): indexOf + removeAt = remove
  DoubleLinkedList.prototype.remove2 = function (value) {
    let index = this.indexOf(value);
    return this.removeAt(index);
  };
  ```

    <details>

<br>
<br>
<br>
<br>
<br>
<br>

**Ref :**

[https://subscription.packtpub.com/book/web-development/9781785285493/5/ch05lvl1sec41/doubly-linked-lists](https://subscription.packtpub.com/book/web-development/9781785285493/5/ch05lvl1sec41/doubly-linked-lists)

[https://www.geeksforgeeks.org/doubly-linked-list/](https://www.geeksforgeeks.org/doubly-linked-list/)
