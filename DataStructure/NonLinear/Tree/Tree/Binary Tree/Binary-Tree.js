// Node() : value와 left, right node 저장을 위한 생성자
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

// BinarySearchTree() : 시작 노드인 root를 저장하기 위한 생성자
function BinarySearchTree() {
  this.root = null;
}

// _inOrderTraverseNode() : 재귀로 트리를 순회하며 중위 순회 (내부 사용)
BinarySearchTree.prototype._inOrderTraverseNode = function (node, callback) {
  if (node === null) {
    return;
  }

  this._inOrderTraverseNode(node.left, callback);
  callback(node);
  this._inOrderTraverseNode(node.right, callback);
};

// inOrderTraverse() : 중위 순회하며 노드 출력
BinarySearchTree.prototype.inOrderTraverse = function (callback) {
  this._inOrderTraverseNode(this.root, callback);
  console.log("end");
};

// _insertNode() : 재귀로 트리를 순회하며 노드 추가 (내부 사용)
BinarySearchTree.prototype._insertNode = function (node, value) {
  // 현재값과 비교
  // 작으면 왼쪽, 크면 오른쪽
  // 왼쪽, 오른쪽에 left, right pointer 비어있다면 추가할 노드를 연결
  // 비어있지 않다면 하위 노드에서 다시 비교하도록 넘겨준다

  if (node === null) {
    node = new Node(value);
  } else if (value < node.value) {
    node.left = this._insertNode(node.left, value);
  } else if (value > node.value) {
    node.right = this._insertNode(node.right, value);
  }

  return node;
};

// insert() : 노드 추가
BinarySearchTree.prototype.insert = function (value) {
  this.root = this._insertNode(this.root, value);
};

// _minNode() : 반복문으로 트리를 순회하며 최솟값 노드 탐색
BinarySearchTree.prototype._minNode = function (node) {
  if (node === null) {
    return null;
  }

  while (node && node.left !== null) {
    node = node.left;
  }

  return node.value;
};

// _maxNode() : 반복문으로 트리를 순회하며 최댓값 노드 탐색
BinarySearchTree.prototype._maxNode = function (node) {
  if (node === null) {
    return null;
  }

  while (node && node.right !== null) {
    node = node.right;
  }

  return node.value;
};

// min() : 최솟값 노드 탐색
BinarySearchTree.prototype.min = function () {
  return this._minNode(this.root);
};

// max() : 최댓값 노드 탐색
BinarySearchTree.prototype.max = function () {
  return this._maxNode(this.root);
};

// _ search() : 재귀로 트리를 순회하며 값을 만족하는 노드 탐색
BinarySearchTree.prototype._searchNode = function (node, value) {
  if (node === null) {
    return false;
  }

  if (node.value === value) {
    return true;
  } else if (node.value > value) {
    return this._searchNode(node.left, value);
  } else if (node.value < value) {
    return this._searchNode(node.right, value);
  }
};

// search() : value 노드 탐색
BinarySearchTree.prototype.search = function (value) {
  return this._searchNode(this.root, value);
};

// _findMinNode() : 반복문으로 트리를 순회하며 최솟값을 보유한 노드 탐색/반환
BinarySearchTree.prototype._findMinNode = function (node) {
  while (node && node.left !== null) {
    node = node.left;
  }
  return node;
};

// _removeNode() : 재귀로 트리를 순회하며 값을 만족하는 노드를 찾고 삭제
BinarySearchTree.prototype._removeNode = function (node, value) {
  if (node === null) {
    return null;
  }

  if (node.value === value) {
    // case 1 : 0 child node (leaf node)
    if (node.left === null && node.right === null) {
      node = null;
    }

    // case 2 : 1 child node
    else if (node.left === null) {
      node = node.right;
    } else if (node.right === null) {
      node = node.left;
    }

    // case 3 : 2 child node
    else {
      let aux = this._findMinNode(node.right);
      node.value = aux.value;
      node.right = this._removeNode(node.right, aux.value);
    }
  } else if (node.value > value) {
    node.left = this._removeNode(node.left, value);
  } else if (node.value < value) {
    node.right = this._removeNode(node.right, value);
  }

  return node;
};

// remove() : 노드 삭제
BinarySearchTree.prototype.remove = function (value) {
  this.root = this._removeNode(this.root, value);
};
