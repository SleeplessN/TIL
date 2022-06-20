// Element() : 데이터와 우선순위를 저장하기 위한 생성자 함수
function Element(data, priority) {
  this.data = data;
  this.priority = priority;
}

// PriorityQueue() : Element 관리를 위한 생성자 함수
function PriorityQueue() {
  this.array = [];
}

// getBuffet() : 객체 내 데이터 셋 반환
PriorityQueue.prototype.getBuffer = function () {
  return this.array.map((element) => element.data);
};

// isEmpty() : 객체 내 데이터 존재 여부 파악
PriorityQueue.prototype.isEmpty = function () {
  return this.array.length === 0;
};

// enqueue() : 데이터 추가
PriorityQueue.prototype.enqueue = function (data, priority) {
  let element = new Element(data, priority);
  let added = false;

  for (let i = 0; i < this.array.length; i++) {
    if (element.priority < this.array[i].priority) {
      this.array.splice(i, 0, element);
      added = true;
      break;
    }
  }

  if (!added) {
    this.array.push(element);
  }

  return this.array.length;
};

// dequeue() : 데이터 삭제
PriorityQueue.prototype.dequeue = function () {
  return this.array.shift();
};

// front() : 가장 첫 데이터 반환
PriorityQueue.prototype.front = function () {
  return this.array.length == 0 ? undefined : this.array[0].data;
};

// size() : 큐 내 데이터 개수 반환
PriorityQueue.prototype.size = function () {
  return this.array.length;
};

// clear() : 큐 초기화
PriorityQueue.prototype.clear = function () {
  this.array = [];
};
