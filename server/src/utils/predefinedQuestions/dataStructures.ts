import { QuestionType } from '../../types/quiz';

export const dataStructuresQuestions: QuestionType[] = [
  {
    text: "What is the time complexity of searching for an element in a binary search tree in the worst case?",
    options: [
      { text: "O(1)", isCorrect: false },
      { text: "O(log n)", isCorrect: false },
      { text: "O(n)", isCorrect: true },
      { text: "O(n²)", isCorrect: false }
    ],
    explanation: "In the worst case (when the tree is skewed/degenerate and essentially becomes a linked list), searching in a binary search tree takes O(n) time, where n is the number of nodes in the tree."
  },
  {
    text: "Which data structure operates on the Last In, First Out (LIFO) principle?",
    options: [
      { text: "Queue", isCorrect: false },
      { text: "Stack", isCorrect: true },
      { text: "Linked List", isCorrect: false },
      { text: "Hash Table", isCorrect: false }
    ],
    explanation: "A stack operates on the Last In, First Out (LIFO) principle, where the most recently added element is the first one to be removed."
  },
  {
    text: "What is the time complexity of accessing an element in an array by its index?",
    options: [
      { text: "O(1)", isCorrect: true },
      { text: "O(log n)", isCorrect: false },
      { text: "O(n)", isCorrect: false },
      { text: "O(n log n)", isCorrect: false }
    ],
    explanation: "Accessing an element in an array by its index has a time complexity of O(1) (constant time) because the memory address of the element can be calculated directly from the index and base address of the array."
  },
  {
    text: "Which sorting algorithm has the best average-case time complexity?",
    options: [
      { text: "Bubble Sort", isCorrect: false },
      { text: "Quick Sort", isCorrect: true },
      { text: "Insertion Sort", isCorrect: false },
      { text: "Selection Sort", isCorrect: false }
    ],
    explanation: "Quick Sort has an average-case time complexity of O(n log n), which is better than Bubble Sort, Insertion Sort, and Selection Sort, all of which have O(n²) average-case time complexity."
  },
  {
    text: "What data structure would you use to check if a word is a palindrome?",
    options: [
      { text: "Queue", isCorrect: false },
      { text: "Stack", isCorrect: true },
      { text: "Binary Tree", isCorrect: false },
      { text: "Hash Table", isCorrect: false }
    ],
    explanation: "A stack is useful for checking if a word is a palindrome. You can push each character onto a stack, then compare each character of the original word with the characters popped from the stack. If they match all the way through, the word is a palindrome."
  },
  {
    text: "Which of the following is NOT a balanced binary search tree?",
    options: [
      { text: "AVL Tree", isCorrect: false },
      { text: "Red-Black Tree", isCorrect: false },
      { text: "B-Tree", isCorrect: false },
      { text: "Binary Search Tree", isCorrect: true }
    ],
    explanation: "A standard Binary Search Tree (BST) is not necessarily balanced. AVL Trees, Red-Black Trees, and B-Trees all have mechanisms to maintain balance, ensuring logarithmic time complexity for operations."
  },
  {
    text: "What is the time complexity of inserting an element at the end of an array-based list?",
    options: [
      { text: "O(1) amortized", isCorrect: true },
      { text: "O(log n)", isCorrect: false },
      { text: "O(n)", isCorrect: false },
      { text: "O(n²)", isCorrect: false }
    ],
    explanation: "Inserting an element at the end of an array-based list (like ArrayList in Java or vector in C++) is O(1) amortized. While occasional resizing of the array may take O(n) time, the amortized cost over many operations is O(1)."
  },
  {
    text: "Which algorithm is used to find the shortest path between all pairs of vertices in a weighted graph?",
    options: [
      { text: "Dijkstra's Algorithm", isCorrect: false },
      { text: "Bellman-Ford Algorithm", isCorrect: false },
      { text: "Floyd-Warshall Algorithm", isCorrect: true },
      { text: "Prim's Algorithm", isCorrect: false }
    ],
    explanation: "The Floyd-Warshall Algorithm is used to find the shortest paths between all pairs of vertices in a weighted graph. Dijkstra's and Bellman-Ford are for single-source shortest paths, and Prim's is for minimum spanning trees."
  },
  {
    text: "What is the space complexity of a recursive Fibonacci function without memoization?",
    options: [
      { text: "O(1)", isCorrect: false },
      { text: "O(log n)", isCorrect: false },
      { text: "O(n)", isCorrect: true },
      { text: "O(2^n)", isCorrect: false }
    ],
    explanation: "The space complexity of a recursive Fibonacci function without memoization is O(n) due to the function call stack. Each recursive call adds a new frame to the stack, and the maximum depth of the recursion is n."
  },
  {
    text: "Which data structure is best for implementing a priority queue?",
    options: [
      { text: "Array", isCorrect: false },
      { text: "Linked List", isCorrect: false },
      { text: "Heap", isCorrect: true },
      { text: "Stack", isCorrect: false }
    ],
    explanation: "A heap (typically a binary heap) is the most efficient data structure for implementing a priority queue. It allows for O(log n) insertion and deletion of the highest/lowest priority element."
  },
  {
    text: "What is the worst-case time complexity of the Merge Sort algorithm?",
    options: [
      { text: "O(n)", isCorrect: false },
      { text: "O(n log n)", isCorrect: true },
      { text: "O(n²)", isCorrect: false },
      { text: "O(2^n)", isCorrect: false }
    ],
    explanation: "The worst-case time complexity of Merge Sort is O(n log n), making it more efficient than algorithms like Bubble Sort or Insertion Sort for large datasets, particularly in worst-case scenarios."
  },
  {
    text: "Which of the following data structures allows for O(1) insertion and deletion at both ends?",
    options: [
      { text: "Array", isCorrect: false },
      { text: "Linked List", isCorrect: false },
      { text: "Deque (Double-ended queue)", isCorrect: true },
      { text: "Binary Search Tree", isCorrect: false }
    ],
    explanation: "A Deque (Double-ended queue) allows for O(1) insertion and deletion at both ends. This makes it versatile for problems requiring both FIFO and LIFO operations."
  },
  {
    text: "What is a hash collision?",
    options: [
      { text: "When a hash function produces the same hash value for different input values", isCorrect: true },
      { text: "When a hash function fails to produce a hash value", isCorrect: false },
      { text: "When two hash functions produce different values for the same input", isCorrect: false },
      { text: "When a hash table becomes full", isCorrect: false }
    ],
    explanation: "A hash collision occurs when a hash function produces the same hash value (or index) for two different input values. Hash tables need methods to handle collisions, such as chaining or open addressing."
  },
  {
    text: "Which data structure is most efficient for implementing a dictionary (key-value store)?",
    options: [
      { text: "Array", isCorrect: false },
      { text: "Linked List", isCorrect: false },
      { text: "Hash Table", isCorrect: true },
      { text: "Binary Tree", isCorrect: false }
    ],
    explanation: "A Hash Table is the most efficient data structure for implementing a dictionary (key-value store) as it provides O(1) average-case time complexity for insertion, deletion, and lookup operations."
  },
  {
    text: "What is the time complexity of the breadth-first search (BFS) algorithm in a graph?",
    options: [
      { text: "O(V)", isCorrect: false },
      { text: "O(E)", isCorrect: false },
      { text: "O(V + E)", isCorrect: true },
      { text: "O(V × E)", isCorrect: false }
    ],
    explanation: "The time complexity of BFS is O(V + E), where V is the number of vertices and E is the number of edges in the graph. This is because BFS needs to visit each vertex and edge at least once."
  },
  {
    text: "Which of the following is NOT a graph traversal algorithm?",
    options: [
      { text: "Breadth-First Search (BFS)", isCorrect: false },
      { text: "Depth-First Search (DFS)", isCorrect: false },
      { text: "Quick Sort", isCorrect: true },
      { text: "Dijkstra's Algorithm", isCorrect: false }
    ],
    explanation: "Quick Sort is a sorting algorithm, not a graph traversal algorithm. BFS, DFS, and Dijkstra's Algorithm are all used for traversing or searching through graphs."
  },
  {
    text: "Which data structure would you use to implement a system to undo operations?",
    options: [
      { text: "Queue", isCorrect: false },
      { text: "Stack", isCorrect: true },
      { text: "Heap", isCorrect: false },
      { text: "Hash Table", isCorrect: false }
    ],
    explanation: "A stack is ideal for implementing an undo system because it follows the Last In, First Out (LIFO) principle, allowing you to undo operations in reverse order of their execution."
  },
  {
    text: "What is the primary advantage of a B-tree over a binary search tree?",
    options: [
      { text: "B-trees are always balanced", isCorrect: false },
      { text: "B-trees have fewer nodes", isCorrect: false },
      { text: "B-trees are better for disk access patterns", isCorrect: true },
      { text: "B-trees use less memory", isCorrect: false }
    ],
    explanation: "B-trees are optimized for systems that read and write large blocks of data, such as disk drives. They reduce the number of disk accesses by having a large number of keys and children in each node, making them better suited for disk access patterns than binary search trees."
  },
  {
    text: "What is the time complexity of finding an element in a sorted array using binary search?",
    options: [
      { text: "O(1)", isCorrect: false },
      { text: "O(log n)", isCorrect: true },
      { text: "O(n)", isCorrect: false },
      { text: "O(n log n)", isCorrect: false }
    ],
    explanation: "Binary search has a time complexity of O(log n) because it repeatedly divides the search interval in half, significantly reducing the number of comparisons needed to find an element in a sorted array."
  },
  {
    text: "Which of these algorithms cannot handle graphs with negative weight edges?",
    options: [
      { text: "Dijkstra's Algorithm", isCorrect: true },
      { text: "Bellman-Ford Algorithm", isCorrect: false },
      { text: "Floyd-Warshall Algorithm", isCorrect: false },
      { text: "A* Algorithm", isCorrect: false }
    ],
    explanation: "Dijkstra's Algorithm cannot handle graphs with negative weight edges because it assumes that adding an edge to a path can never decrease the path's length, which is not true when negative weights are allowed."
  },
  {
    text: "What is the purpose of a sentinel node in a linked list?",
    options: [
      { text: "To mark the end of the list", isCorrect: false },
      { text: "To simplify edge cases and avoid null checks", isCorrect: true },
      { text: "To store the size of the list", isCorrect: false },
      { text: "To improve search performance", isCorrect: false }
    ],
    explanation: "A sentinel node (or dummy node) in a linked list is used to simplify edge cases and avoid special case handling, particularly for empty lists or operations at the head or tail of the list. It helps avoid null checks and makes the code cleaner."
  },
  {
    text: "Which sorting algorithm is the most efficient for nearly sorted arrays?",
    options: [
      { text: "Bubble Sort", isCorrect: false },
      { text: "Quick Sort", isCorrect: false },
      { text: "Insertion Sort", isCorrect: true },
      { text: "Merge Sort", isCorrect: false }
    ],
    explanation: "Insertion Sort is most efficient for nearly sorted arrays because it has a best-case time complexity of O(n) when the array is already sorted or nearly sorted, making only a small number of comparisons and swaps."
  },
  {
    text: "What is the primary advantage of a trie (prefix tree) data structure?",
    options: [
      { text: "Fast insertion and deletion", isCorrect: false },
      { text: "Memory efficiency", isCorrect: false },
      { text: "Fast prefix matching and lookup", isCorrect: true },
      { text: "Naturally balanced structure", isCorrect: false }
    ],
    explanation: "A trie (prefix tree) excels at fast prefix matching and lookup operations, making it ideal for applications like autocomplete, spell checking, and IP routing. It allows quick retrieval of all strings with a common prefix."
  },
  {
    text: "What is the primary difference between a queue and a priority queue?",
    options: [
      { text: "A queue stores more elements", isCorrect: false },
      { text: "A priority queue removes elements based on priority rather than insertion order", isCorrect: true },
      { text: "A queue allows removal from both ends", isCorrect: false },
      { text: "A priority queue is faster for all operations", isCorrect: false }
    ],
    explanation: "The primary difference is that a standard queue removes elements in First In, First Out (FIFO) order based on insertion time, while a priority queue removes elements based on their priority value, regardless of when they were inserted."
  },
  {
    text: "What is dynamic programming?",
    options: [
      { text: "Programming that changes during execution", isCorrect: false },
      { text: "A method to produce random algorithms", isCorrect: false },
      { text: "An approach to solve complex problems by breaking them into simpler subproblems", isCorrect: true },
      { text: "Programming for dynamic memory allocation", isCorrect: false }
    ],
    explanation: "Dynamic programming is an algorithmic paradigm that solves complex problems by breaking them down into simpler overlapping subproblems and storing the results of subproblems to avoid redundant computation. It's often used for optimization problems."
  },
  {
    text: "Which of the following is NOT a property of a min-heap?",
    options: [
      { text: "The root contains the minimum element", isCorrect: false },
      { text: "Every node's value is less than or equal to its children's values", isCorrect: false },
      { text: "The heap is a complete binary tree", isCorrect: false },
      { text: "Nodes are sorted left to right at each level", isCorrect: true }
    ],
    explanation: "A min-heap does not require nodes to be sorted left to right at each level. While it must be a complete binary tree where each node's value is less than or equal to its children's values, the relative ordering of siblings is not specified."
  },
  {
    text: "What is the worst-case time complexity of the Quick Sort algorithm?",
    options: [
      { text: "O(n log n)", isCorrect: false },
      { text: "O(n²)", isCorrect: true },
      { text: "O(n)", isCorrect: false },
      { text: "O(log n)", isCorrect: false }
    ],
    explanation: "The worst-case time complexity of Quick Sort is O(n²), which occurs when the pivot selection consistently results in highly unbalanced partitions, such as when the array is already sorted and the pivot is always chosen as the first or last element."
  },
  {
    text: "Which data structure is typically used to implement breadth-first search?",
    options: [
      { text: "Stack", isCorrect: false },
      { text: "Queue", isCorrect: true },
      { text: "Heap", isCorrect: false },
      { text: "Hash Table", isCorrect: false }
    ],
    explanation: "A queue is typically used to implement breadth-first search because it follows the First In, First Out (FIFO) principle, which ensures that nodes are explored level by level, visiting all nodes at the current depth before moving to nodes at the next depth."
  },
  {
    text: "What is a self-balancing binary search tree?",
    options: [
      { text: "A tree that has the same number of nodes in the left and right subtrees", isCorrect: false },
      { text: "A tree that automatically maintains its height to be logarithmic relative to the number of nodes", isCorrect: true },
      { text: "A tree with nodes that can balance themselves", isCorrect: false },
      { text: "A tree that has equal values in both subtrees", isCorrect: false }
    ],
    explanation: "A self-balancing binary search tree automatically keeps its height small (logarithmic) relative to the number of nodes through rebalancing operations after insertions and deletions, ensuring O(log n) time complexity for operations like search, insert, and delete."
  },
  {
    text: "What is the time complexity of building a heap from an array of n elements?",
    options: [
      { text: "O(n log n)", isCorrect: false },
      { text: "O(n)", isCorrect: true },
      { text: "O(log n)", isCorrect: false },
      { text: "O(n²)", isCorrect: false }
    ],
    explanation: "Although it might seem like building a heap would take O(n log n) time (n elements with O(log n) time per heapify operation), using the bottom-up approach to build a heap actually has a time complexity of O(n) due to the distribution of node heights in a complete binary tree."
  }
]; 