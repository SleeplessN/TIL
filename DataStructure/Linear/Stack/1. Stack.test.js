import Stack from "./1. Stack";

describe("Stack", () => {
  describe("constructor", () => {
    test("인수로 배열을 전달받아 stack을 생성한다.", () => {
      expect([...new Stack([10, 3, 8, 40, 1])]).toEqual([10, 3, 8, 40, 1]);
    });

    test("인수를 전달하지 않으면 빈 stack을 생성한다.", () => {
      expect([...new Stack()]).toEqual([]);
    });

    test("stack 객체는 이터러블이다.", () => {
      expect([...new Stack([10, 3, 8, 40, 1])]).toEqual([10, 3, 8, 40, 1]);
    });

    test("인수로 배열 이외의 값을 전달하면 에러를 발생시킨다.", () => {
      expect(() => new Stack(1)).toThrow(new TypeError("1 is not an array"));
      expect(() => new Stack(true)).toThrow(
        new TypeError("true is not an array")
      );
      expect(() => new Stack({})).toThrow(
        new TypeError("[object Object] is not an array")
      );
    });
  });

  describe("Stack.from", () => {
    test("인수로 배열을 전달받아 배열로 stack을 생성한다.", () => {
      expect([...Stack.from([10, 3, 8, 40, 1])]).toEqual([10, 3, 8, 40, 1]);
    });

    test("인수를 전달하지 않으면 빈 stack을 생성한다.", () => {
      expect([...Stack.from()]).toEqual([]);
    });

    test("stack 객체는 이터러블이다.", () => {
      expect([...Stack.from([10, 3, 8, 40, 1])]).toEqual([10, 3, 8, 40, 1]);
    });

    test("인수로 배열 이외의 값을 전달하면 에러를 발생시킨다.", () => {
      expect(() => Stack.from(1)).toThrow(new TypeError("1 is not an array"));
      expect(() => Stack.from(true)).toThrow(
        new TypeError("true is not an array")
      );
      expect(() => Stack.from({})).toThrow(
        new TypeError("[object Object] is not an array")
      );
    });
  });

  describe("Stack.of", () => {
    test("인수로 여러 개의 요소를 전달받아 stack을 생성한다.", () => {
      expect([...Stack.of(10, 3, 8, 40, 1)]).toEqual([10, 3, 8, 40, 1]);
    });

    test("인수를 전달하지 않으면 빈 stack을 생성한다.", () => {
      expect([...Stack.of()]).toEqual([]);
    });

    test("stack 객체는 이터러블이다.", () => {
      expect([...Stack.of(10, 3, 8, 40, 1)]).toEqual([10, 3, 8, 40, 1]);
    });
  });

  describe("Stack.prototype.size", () => {
    test("stack 요소의 갯수를 반환한다.", () => {
      expect(new Stack().size).toBe(0);
      expect(new Stack([10, 3, 8, 40, 1]).size).toBe(5);
    });
  });

  describe("Stack.prototype.push", () => {
    test("stack의 가장 후미에 요소를 추가하고 변경된 stack을 반환한다.", () => {
      const stack = new Stack([1, 2]).push(3);
      expect([...stack]).toEqual([1, 2, 3]);

      stack.push(4).push(5);
      expect([...stack]).toEqual([1, 2, 3, 4, 5]);
    });

    test("인수를 전달하지 않으면 요소를 추가하지 않는다.", () => {
      expect([...new Stack([1, 2]).push()]).toEqual([1, 2]);
    });
  });

  describe("Stack.prototype.pop", () => {
    test("stack에서 가장 나중에 추가된 요소를 제거하고 변경된 stack을 반환한다.", () => {
      const stack = new Stack([1, 2, 3]).pop();
      expect([...stack]).toEqual([1, 2]);

      stack.pop().pop();
      expect([...stack]).toEqual([]);
    });
  });

  describe("Stack.prototype.peek", () => {
    test("가장 나중에 추가된 stack 요소를 반환한다.", () => {
      const stack = new Stack([1, 2]);
      expect(stack.peek()).toBe(2);

      stack.push(3);
      expect(stack.peek()).toBe(3);
    });

    test("stack을 직접 변경하지 않는다.", () => {
      const stack = new Stack([1, 2]);
      stack.peek();

      expect([...stack]).toEqual([1, 2]);
    });

    test("stack이 비어있으면 null을 반환한다.", () => {
      const empty = new Stack();
      expect(empty.peek()).toBe(null);
    });
  });

  describe("Stack.prototype.isEmpty", () => {
    test("stack이 비어있는지 확인한다.", () => {
      const stack = new Stack([1]);

      expect(stack.isEmpty()).toBe(false);
      expect(stack.pop().isEmpty()).toBe(true);
    });
  });

  describe("Stack.prototype.clone", () => {
    test("stack의 복사본(shallow copy)을 반환한다.", () => {
      const stack = new Stack([{ id: 1 }, { id: 2 }]);
      const clone = stack.clone();

      expect(stack).toEqual(clone);
      expect(stack).not.toBe(clone);
      expect(stack.peek()).toBe(clone.peek());
    });
  });

  describe("Stack.prototype.clear", () => {
    test("stack의 모든 요소를 제거하고 변경된 stack을 반환한다.", () => {
      expect(new Stack([1, 2, 3]).clear().size).toBe(0);
    });

    test("복사본이 아닌 원본을 반환한다.", () => {
      const stack = Stack.of(1, 2, 3);
      expect(stack.clear()).toBe(stack);
    });
  });
});
