import { Queue } from "./Queue.mjs";
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

// bfs() : BFS 탐색
Graph.prototype.bfs = function (startVertex) {
  this._bfsLoopVisit(startVertex);
};

// _bfsLoopVisit() : 큐를 이용한 BFS 탐색
Graph.prototype._bfsLoopVisit = function (vertex) {
  let queue = new Queue();
  queue.enqueue(vertex);

  while (!queue.isEmpty()) {
    let vertex = queue.dequeue();
    if (this.visited[vertex]) {
      continue;
    }

    this.visited[vertex] = true;
    console.log(`visit "${vertex}"`);

    let neighbors = this.edge[vertex];
    for (let i = 0; i < neighbors.length; i++) {
      queue.enqueue(neighbors[i]);
    }
  }
};

// _bfsShortestPath() : 다음 정점 간 최단 경로 비용 산출
Graph.prototype._bfsShortestPath = function (vertex) {
  let queue = new Queue();
  queue.enqueue(vertex);

  let distance = {};
  let pre_visit = {};
  for (let vertex in this.edge) {
    distance[vertex] = 0;
    pre_visit[vertex] = null;
  }

  while (!queue.isEmpty()) {
    let vertex = queue.dequeue();

    this.visited[vertex] = true;
    console.log(`visit "${vertex}"`);

    let neighbors = this.edge[vertex];
    for (let i = 0; i < neighbors.length; i++) {
      if (!this.visited[neighbors[i]]) {
        distance[neighbors[i]] = distance[vertex] + 1;
        pre_visit[neighbors[i]] = vertex;
        queue.enqueue(neighbors[i]);
      }
    }
  }

  return { distance, pre_visit };
};

// _from_to_path() : from 정점에서 to 정점으로 최단 경로 출력
Graph.prototype._from_to_path = function (pre_visit, from, to) {
  let stack = new Stack();

  for (let v = to; v !== from; v = pre_visit[v]) {
    stack.push(v);
  }
  stack.push(from);

  while (!stack.isEmpty()) {
    let v = stack.pop();
    process.stdout.write(`${v} -> `);
  }
  console.log("end");
};

// shortestPath() : 다른 정점 간 최단 경로 탐색
Graph.prototype.shortestPath = function (startVertex) {
  let result = this._bfsShortestPath(startVertex);

  console.log(result.distance);
  console.log(result.pre_visit);

  for (let vertex in this.edge) {
    if (vertex === startVertex) continue;

    this._from_to_path(result.pre_visit, startVertex, vertex);
  }
};
