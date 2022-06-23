/* 최소힙 (Minheap) */
// heap() : 배열 내  요소를 저장하기 위한 생성자
function Heap() {
  this.items = [];
}

// swap() : 배열 내 두 요소 위치를 변경
Heap.prototype.swap = function (index1, index2) {
  let tmp = this.items[index1];
  this.items[index1] = this.items[index2];
  this.items[index2] = tmp;
};

// parentIndex() : 부모 노드의 위치 반환
Heap.prototype.parentIndex = function (index) {
  return Math.floor((index - 1) / 2);
};

// leftChildIndex() : 왼쪽 자식 노드의 위치 반환
Heap.prototype.leftChildIndex = function (index) {
  return index * 2 + 1;
};

// rightChildIndex() : 왼쪽 자식 노드의 위치 반환
Heap.prototype.rightChildIndex = function (index) {
  return index * 2 + 2;
};

// parent() : 부모 노드의 요소 값 반황
Heap.prototype.parent = function (index) {
  return this.items[this.parentIndex(index)];
};

// leftChild() : 왼쪽 자식 노드의 요소 값 반환
Heap.prototype.leftChild = function (index) {
  return this.items[this.leftChildIndex(index)];
};

// rightChild() : 오른쪽 자식 노드의 요소 값 반환
Heap.prototype.rightChild = function (index) {
  return this.items[this.rightChildIndex(index)];
};

// peek() : 현재 정렬된 최소/최대 요소값 반환
Heap.prototype.peek = function (index) {
  return this.items[0];
};

// size() : 현재 배열 내 크기 반환
Heap.prototype.size = function (index) {
  return this.items.length;
};

// insert() : 신규 노드 추가
Heap.prototype.insert = function (item) {
  this.items[this.size()] = item;
  this.bubbleUp();
};

// bubbleUp() : 추가된 노드 위치 정렬
Heap.prototype.bubbleUp = function () {
  let index = this.size() - 1;
  while (this.parent(index) && this.parent(index) > this.items[index]) {
    this.swap(this.parentIndex(index), index);
    index = this.parentIndex(index);
  }
};

// extract() : root 노드 반환 및 삭제
Heap.prototype.extract = function () {
  let item = this.items[0];
  this.items[0] = this.items[this.size() - 1];
  this.items.pop();
  this.bubbleDown();

  return item;
};

// bubbleDown() : 대체된 root 노드 위치를 기준으로 정렬
Heap.prototype.bubbleDown = function () {
  let index = 0;
  while (
    this.leftChild(index) &&
    (this.leftChild(index) < this.items[index] ||
      this.rightChild(index) < this.items[index])
  ) {
    let childIndex = this.leftChildIndex(index);
    if (
      this.rightChild(index) &&
      this.rightChild(index) < this.items[childIndex]
    ) {
      childIndex = this.rightChildIndex(index);
    }
    this.swap(childIndex, index);
    index = childIndex;
  }
};
