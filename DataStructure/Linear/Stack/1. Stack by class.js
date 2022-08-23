class Stack {
  #elements = [];
  constructor(elements = []) {
    if (!Array.isArray(elements))
      throw new TypeError(`${elements} is not an array`);
    this.#elements = elements;
  }
  // 정적 메서드
  static from(elements) {
    return new Stack(elements);
  }
  static of(...elements) {
    return new Stack(elements);
  }
  [Symbol.iterator]() {
    return this.#elements[Symbol.iterator]();
  }
  // 프로토타입 메서드
  get size() {
    return this.#elements.length;
  }
  push(val) {
    if (!val) return new Stack(this.#elements);
    this.#elements.push(val);
    return this;
  }
  pop() {
    this.#elements.pop();
    return this;
  }
  peek() {
    return this.#elements.length === 0
      ? null
      : this.#elements[this.#elements.length - 1];
  }
  isEmpty() {
    return this.#elements.length === 0;
  }
  clone() {
    return new Stack([...this.#elements]);
  }
  clear() {
    this.#elements = [];
    return this;
  }
}

export default Stack;
