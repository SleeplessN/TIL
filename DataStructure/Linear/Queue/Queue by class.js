class Queue {
  #elements = [];
  constructor(elements = []) {
    if (!Array.isArray(elements))
      throw new TypeError(`${elements} is not an array`);
    this.#elements = elements;
  }
  // 정적 메서드
  static from(elements) {
    return new Queue(elements);
  }
  static of(...elements) {
    return new Queue(elements);
  }
  [Symbol.iterator]() {
    return this.#elements[Symbol.iterator]();
  }
  // 프로토타입 메서드
  get size() {
    return this.#elements.length;
  }
  enqueue(val) {
    if (!val) return new Queue(this.#elements);
    this.#elements.push(val);
    return this;
  }
  dequeue() {
    this.#elements.shift();
    return this;
  }
  peek() {
    return this.#elements.length === 0 ? null : this.#elements[0];
  }
  isEmpty() {
    return this.#elements.length === 0;
  }
  clone() {
    return new Queue([...this.#elements]);
  }
  clear() {
    this.#elements = [];
    return this;
  }
}

export default Queue;
