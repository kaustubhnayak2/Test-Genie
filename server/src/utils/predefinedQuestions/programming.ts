import { QuestionType } from '../../types/quiz';

export const programmingQuestions: QuestionType[] = [
  {
    text: "Which programming language was created by James Gosling at Sun Microsystems in 1995?",
    options: [
      { text: "Java", isCorrect: true },
      { text: "Python", isCorrect: false },
      { text: "C++", isCorrect: false },
      { text: "JavaScript", isCorrect: false }
    ],
    explanation: "Java was created by James Gosling at Sun Microsystems and released in 1995. It was designed to be platform-independent with its 'write once, run anywhere' philosophy."
  },
  {
    text: "Which of the following is NOT a dynamically typed language?",
    options: [
      { text: "Python", isCorrect: false },
      { text: "JavaScript", isCorrect: false },
      { text: "Ruby", isCorrect: false },
      { text: "Java", isCorrect: true }
    ],
    explanation: "Java is a statically typed language, which means the type of a variable is checked at compile-time rather than run-time. Python, JavaScript, and Ruby are all dynamically typed languages."
  },
  {
    text: "What does HTML stand for?",
    options: [
      { text: "Hyper Text Markup Language", isCorrect: true },
      { text: "High Tech Multi Language", isCorrect: false },
      { text: "Hyperlink and Text Markup Language", isCorrect: false },
      { text: "Home Tool Markup Language", isCorrect: false }
    ],
    explanation: "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages and web applications."
  },
  {
    text: "Which symbol is used for single-line comments in JavaScript?",
    options: [
      { text: "//", isCorrect: true },
      { text: "#", isCorrect: false },
      { text: "--", isCorrect: false },
      { text: "/* */", isCorrect: false }
    ],
    explanation: "In JavaScript, single-line comments start with two forward slashes (//). The # symbol is used in languages like Python, -- in SQL, and /* */ for multi-line comments in JavaScript."
  },
  {
    text: "Which language is often referred to as the 'mother of all programming languages'?",
    options: [
      { text: "C", isCorrect: true },
      { text: "Fortran", isCorrect: false },
      { text: "Cobol", isCorrect: false },
      { text: "Assembly", isCorrect: false }
    ],
    explanation: "C is often referred to as the 'mother of all programming languages' because many modern programming languages have derived syntax and features from C, including C++, Java, and JavaScript."
  },
  {
    text: "What year was Python first released?",
    options: [
      { text: "1991", isCorrect: true },
      { text: "1995", isCorrect: false },
      { text: "1985", isCorrect: false },
      { text: "2000", isCorrect: false }
    ],
    explanation: "Python was created by Guido van Rossum and first released in 1991. It emphasizes code readability with its notable use of significant whitespace."
  },
  {
    text: "Which of the following is NOT a valid variable name in most programming languages?",
    options: [
      { text: "myVariable", isCorrect: false },
      { text: "_value", isCorrect: false },
      { text: "counter1", isCorrect: false },
      { text: "2ndPlace", isCorrect: true }
    ],
    explanation: "Variable names in most programming languages cannot start with a number. '2ndPlace' is invalid because it starts with a digit. The others follow standard naming conventions."
  },
  {
    text: "In object-oriented programming, what is encapsulation?",
    options: [
      { text: "The bundling of data and methods that operate on that data into a single unit", isCorrect: true },
      { text: "The ability of a class to inherit from another class", isCorrect: false },
      { text: "The ability to present the same interface for different underlying data types", isCorrect: false },
      { text: "The principle that restricts the access of certain object's components", isCorrect: false }
    ],
    explanation: "Encapsulation is the bundling of data (attributes) and methods that operate on that data into a single unit or class. It helps in hiding the internal state of an object from the outside."
  },
  {
    text: "Which programming paradigm treats computation as the evaluation of mathematical functions and avoids changing state and mutable data?",
    options: [
      { text: "Object-oriented programming", isCorrect: false },
      { text: "Procedural programming", isCorrect: false },
      { text: "Functional programming", isCorrect: true },
      { text: "Event-driven programming", isCorrect: false }
    ],
    explanation: "Functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. Languages like Haskell, Clojure, and parts of JavaScript follow this paradigm."
  },
  {
    text: "What does CSS stand for?",
    options: [
      { text: "Computer Style Sheets", isCorrect: false },
      { text: "Creative Style System", isCorrect: false },
      { text: "Cascading Style Sheets", isCorrect: true },
      { text: "Coded Style Structures", isCorrect: false }
    ],
    explanation: "CSS stands for Cascading Style Sheets, which is a style sheet language used for describing the presentation of a document written in HTML or XML."
  },
  {
    text: "Which of the following is NOT a JavaScript framework or library?",
    options: [
      { text: "React", isCorrect: false },
      { text: "Vue", isCorrect: false },
      { text: "Angular", isCorrect: false },
      { text: "Django", isCorrect: true }
    ],
    explanation: "Django is not a JavaScript framework or library; it's a high-level Python web framework. React, Vue, and Angular are all JavaScript frameworks or libraries used for building user interfaces."
  },
  {
    text: "What does API stand for?",
    options: [
      { text: "Application Programming Interface", isCorrect: true },
      { text: "Automated Program Integration", isCorrect: false },
      { text: "Application Process Integration", isCorrect: false },
      { text: "Advanced Programming Interface", isCorrect: false }
    ],
    explanation: "API stands for Application Programming Interface. It's a set of rules and protocols for building and interacting with software applications."
  },
  {
    text: "Which programming language is primarily used for iOS app development?",
    options: [
      { text: "Java", isCorrect: false },
      { text: "Swift", isCorrect: true },
      { text: "Kotlin", isCorrect: false },
      { text: "C#", isCorrect: false }
    ],
    explanation: "Swift is a programming language developed by Apple Inc. for iOS, iPadOS, macOS, watchOS, and tvOS app development. It was introduced in 2014 as a replacement for Objective-C."
  },
  {
    text: "What is the most common return value of a function that successfully completes its task but doesn't return any meaningful data?",
    options: [
      { text: "void", isCorrect: false },
      { text: "null", isCorrect: false },
      { text: "0", isCorrect: false },
      { text: "true", isCorrect: true }
    ],
    explanation: "In many programming languages, functions that successfully complete their task but don't have a specific value to return often return 'true' to indicate success. Some languages use 'void', NULL, or 0, but true is most common for indicating success."
  },
  {
    text: "Which programming language is used with the React Native framework?",
    options: [
      { text: "Java", isCorrect: false },
      { text: "Swift", isCorrect: false },
      { text: "JavaScript", isCorrect: true },
      { text: "C#", isCorrect: false }
    ],
    explanation: "React Native is a framework that allows developers to build mobile applications using JavaScript and React. It enables the development of cross-platform mobile apps."
  },
  {
    text: "Which of the following is NOT a valid way to create a function in JavaScript?",
    options: [
      { text: "function myFunction() {}", isCorrect: false },
      { text: "const myFunction = function() {}", isCorrect: false },
      { text: "const myFunction = () => {}", isCorrect: false },
      { text: "def myFunction():", isCorrect: true }
    ],
    explanation: "The 'def' keyword is used to define functions in Python, not JavaScript. In JavaScript, functions can be declared using the 'function' keyword, function expressions, or arrow functions."
  },
  {
    text: "Which language is known for its use in statistical computing and data analysis?",
    options: [
      { text: "R", isCorrect: true },
      { text: "Ruby", isCorrect: false },
      { text: "Rust", isCorrect: false },
      { text: "Racket", isCorrect: false }
    ],
    explanation: "R is a programming language and free software environment for statistical computing and graphics. It's widely used among statisticians and data miners for developing statistical software and data analysis."
  },
  {
    text: "What is the purpose of the 'this' keyword in JavaScript?",
    options: [
      { text: "To refer to the previous object", isCorrect: false },
      { text: "To refer to the current function", isCorrect: false },
      { text: "To refer to the current object", isCorrect: true },
      { text: "To refer to the parent object", isCorrect: false }
    ],
    explanation: "In JavaScript, the 'this' keyword refers to the object it belongs to. Its value depends on how a function is called, and it has different values depending on where it is used."
  },
  {
    text: "Which of the following is a strongly typed programming language?",
    options: [
      { text: "JavaScript", isCorrect: false },
      { text: "Python", isCorrect: false },
      { text: "Ruby", isCorrect: false },
      { text: "TypeScript", isCorrect: true }
    ],
    explanation: "TypeScript is a strongly typed superset of JavaScript that adds optional static typing to the language. JavaScript, Python, and Ruby are dynamically typed languages."
  },
  {
    text: "What does DOM stand for in web development?",
    options: [
      { text: "Document Object Model", isCorrect: true },
      { text: "Data Object Model", isCorrect: false },
      { text: "Document Oriented Middleware", isCorrect: false },
      { text: "Digital Ordinance Management", isCorrect: false }
    ],
    explanation: "DOM stands for Document Object Model. It's a programming interface for HTML and XML documents that represents the page so that programs can change the document structure, style, and content."
  },
  {
    text: "Which language was designed to query databases?",
    options: [
      { text: "HTML", isCorrect: false },
      { text: "SQL", isCorrect: true },
      { text: "CSS", isCorrect: false },
      { text: "XML", isCorrect: false }
    ],
    explanation: "SQL (Structured Query Language) was designed for managing data held in a relational database management system. It's particularly useful for retrieving and manipulating data."
  },
  {
    text: "What is a closure in programming?",
    options: [
      { text: "A way to secure code from external access", isCorrect: false },
      { text: "A function that has access to variables from its outer scope", isCorrect: true },
      { text: "A method to close resources like files and connections", isCorrect: false },
      { text: "A technique to end a program execution", isCorrect: false }
    ],
    explanation: "A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has finished executing. It's a powerful feature in languages like JavaScript."
  },
  {
    text: "Which of these languages was created by Microsoft?",
    options: [
      { text: "Java", isCorrect: false },
      { text: "PHP", isCorrect: false },
      { text: "C#", isCorrect: true },
      { text: "Python", isCorrect: false }
    ],
    explanation: "C# (pronounced C sharp) was developed by Microsoft as part of its .NET initiative. It was designed by Anders Hejlsberg and his team and was first released in 2000."
  },
  {
    text: "What is the result of 5 + '5' in JavaScript?",
    options: [
      { text: "10", isCorrect: false },
      { text: "55", isCorrect: true },
      { text: "Error", isCorrect: false },
      { text: "Undefined", isCorrect: false }
    ],
    explanation: "In JavaScript, when you add a number and a string, the number is converted to a string and the two strings are concatenated. So 5 + '5' results in the string '55'."
  },
  {
    text: "What does the acronym AJAX stand for?",
    options: [
      { text: "Asynchronous JavaScript And XML", isCorrect: true },
      { text: "Advanced JavaScript And XHTML", isCorrect: false },
      { text: "Automated JavaScript And XML", isCorrect: false },
      { text: "Asynchronous Java Archives for XML", isCorrect: false }
    ],
    explanation: "AJAX stands for Asynchronous JavaScript And XML. It's a set of web development techniques that uses various web technologies on the client-side to create asynchronous web applications."
  },
  {
    text: "Which language is often used for Android app development?",
    options: [
      { text: "Java", isCorrect: true },
      { text: "Swift", isCorrect: false },
      { text: "C#", isCorrect: false },
      { text: "Ruby", isCorrect: false }
    ],
    explanation: "Java has traditionally been the primary language for Android app development. While Kotlin is now also officially supported and increasingly popular, Java remains widely used for Android development."
  },
  {
    text: "What is the purpose of the 'virtual' keyword in C++?",
    options: [
      { text: "To create a virtual machine", isCorrect: false },
      { text: "To allow a method to be overridden in a derived class", isCorrect: true },
      { text: "To create a virtual copy of an object", isCorrect: false },
      { text: "To define a virtual function with no implementation", isCorrect: false }
    ],
    explanation: "In C++, the 'virtual' keyword is used to declare a virtual function, which can be overridden in derived classes. It's a key feature for implementing polymorphism in object-oriented programming."
  },
  {
    text: "Which of these languages is NOT compiled?",
    options: [
      { text: "Java", isCorrect: false },
      { text: "C++", isCorrect: false },
      { text: "JavaScript", isCorrect: true },
      { text: "Go", isCorrect: false }
    ],
    explanation: "JavaScript is primarily an interpreted language, not a compiled one. It's executed by the JavaScript engine in a web browser or other environment without being compiled to machine code beforehand."
  },
  {
    text: "What is the purpose of a constructor in object-oriented programming?",
    options: [
      { text: "To destroy objects when they are no longer needed", isCorrect: false },
      { text: "To initialize objects when they are created", isCorrect: true },
      { text: "To copy objects from one variable to another", isCorrect: false },
      { text: "To check if two objects are equal", isCorrect: false }
    ],
    explanation: "A constructor is a special method in a class used to initialize objects. It's called automatically when an object is created and can be used to set initial values for object attributes."
  },
  {
    text: "What does SQL stand for?",
    options: [
      { text: "Structured Query Language", isCorrect: true },
      { text: "Sequential Query Language", isCorrect: false },
      { text: "Standard Query Language", isCorrect: false },
      { text: "System Query Language", isCorrect: false }
    ],
    explanation: "SQL stands for Structured Query Language. It's a domain-specific language used for managing and manipulating relational databases."
  }
]; 