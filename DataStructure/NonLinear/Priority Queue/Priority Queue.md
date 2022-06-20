# Priority Queue

> 일반적인 큐(Queue)는 먼저 집어넣은 데이터가 먼저 나오는 FIFO (First In First Out) 구조로 저장하는 선형 자료구조이다.
> 하지만 우선순위 큐(Priority Queue)는 들어간 순서에 상관없이 우선순위가 높은 데이터가 먼저 나오는 것을 말한다.

<img src="Priority-Queue-images/Untitled.png" width="550" >

- Element : 데이터 저장단위(Data, Priority)로 구성

  - Data : Data를 담는 공간
  - Priority : 해당 Element의 우선순위를 담는 공간

- **특징**

1. 모든 항목에는 우선순위가 있다.
2. 우선 순위가 높은 요소는 우선 순위가 낮은 요소보다 먼저 queue에서 제외된다.
3. 두 요소의 우선 순위가 같으면 queue의 순서에 따라 제공된다.

- **시간복잡도**

  구현 방법에 따라 다른 시간복잡도를 갖는다

  <img src="Priority-Queue-images/Untitled%201.png" width="330" >

- **구현해보기**

  [구현 with JavaScript]()

**Ref :**

- [https://yoongrammer.tistory.com/81](https://yoongrammer.tistory.com/81)

- [https://suyeon96.tistory.com/31](https://suyeon96.tistory.com/31)
