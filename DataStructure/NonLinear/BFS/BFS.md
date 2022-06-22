# BFS

> 그래프를 탐색하는 방법 중에 하나인 BFS이다.
> BFS의 기본 원리는 queue를 이용하여 지금 위치에 갈 수 있는 정점을 모두 queue에 넣는 것이다.
> 쉽게 말하면 DFS와는 정반대로 가로로 한줄씩 읽는다고 생각하면 된다.

<img src="BFS-images/BFS.gif" width="300">

- **장점**
  - 너비를 우선으로 탐색하므로 답이 되는 경로가 여러 개인 경우에도 최단경로를 얻을 수 있다.
  - 경로가 무한히 깊어져도 최단경로를 반드시 찾을 수 잇다.
  - 노드 수가 적고 깊이가 얕은 해가 존재할 때 유리하다.
- **단점**
  - DFS와 달리 큐를 이용하여 다음에 탐색할 정점들을 저장하므로 더 큰 저장공간이 필요하다.
- **시간복잡도**
  - 인접 행렬로 구현했을 경우
    정점 한개당 N번의 for loop를 돌기 때문에 O(n)의 시간이 걸리는데 이 for loop는 큐에 아무것도 없을 때까지 즉, 모든 정점을 방문할 때까지 실행되므로 n번 반복 실행된다.
    따라서 시간복잡도는 **O(n^2)**이다.
  - 인접 리스트로 구현했을 경우
    BFS가 다 끝난 후를 생각해보면, 모든 간선에 대해서 한번씩 검사를 할 것이고, 각 정점을 한번씩 모두 방문하기 때문에 **O(n+e)**만큼의 시간복잡도를 가질 것이다.
- 구현해보기 (재귀함수로 구현 & Queue로 구현[인접리스트])
  - [구현 with JavaScript](https://github.com/SleeplessN/TIL/blob/main/DataStructure/NonLinear/BFS/BFS.js)

**Ref :**

- [https://currygamedev.tistory.com/10](https://currygamedev.tistory.com/10)
- [https://ko.wikipedia.org/wiki/너비*우선*탐색](https://ko.wikipedia.org/wiki/%EB%84%88%EB%B9%84_%EC%9A%B0%EC%84%A0_%ED%83%90%EC%83%89)
