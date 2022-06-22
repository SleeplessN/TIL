import { Stack } from "./Stack.mjs";

function Graph() {
  this.edge = {};
  this.visited = {};
}

// addVertex() : 정점(vertex) 추가
Graph.prototype.addVertex = function (v) {
  this.edge[v] = [];
  this.visited[v] = false;
};

// addEdge() : 간선(Edge) 추가
Graph.prototype.addEdge = function (v1, v2) {
  this.edge[v1].push(v2);
};

// print() : 전체 Graph 연결 상태 출력
Graph.prototype.print = function () {
  for (let vertex in this.edge) {
    let neighbors = this.edge[vertex];
    if (neighbors.length === 0) continue;

    process.stdout.write(`${vertex} -> `);
    for (let j = 0; j < neighbors.length; j++) {
      {
        process.stdout.write(`${neighbors[j]} `);
      }
    }
    console.log("");
  }
};

// dfs() : DFS 탐색
Graph.prototype.dfs = function (startVertex) {
  this._dfsLoopVisit(startVertex);
};

// _dfsRecursiveVisit() : 재귀를 이용한 DFS 탐색
Graph.prototype._dfsRecursiveVisit = function (vertex) {
  // 1. 종료 조건
  if (this.visited[vertex]) {
    return;
  }
  // 2. 재귀 호출을 하면서 수행해야할 코드
  this.visited[vertex] = true;
  console.log(`visit "${vertex}"`);

  let neighbors = this.edge[vertex];
  for (let i = 0; i < neighbors.length; i++) {
    this._dfsRecursiveVisit(neighbors[i]);
  }
};

// _dfsLoopVisit() :  스택을 이용한 DFS 탐색
Graph.prototype._dfsLoopVisit = function (vertex) {
  let stack = new Stack();
  stack.push(vertex);

  while (!stack.isEmpty()) {
    let vertex = stack.pop();
    if (this.visited[vertex]) {
      continue;
    }
    this.visited[vertex] = true;
    console.log(`visit "${vertex}"`);

    let neighbors = this.edge[vertex];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      stack.push(neighbors[i]);
    }
  }
};
