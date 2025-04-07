import { QuestionType } from '../../types/quiz';

export const webdevQuestions: QuestionType[] = [
  {
    text: "What does HTML stand for?",
    options: [
      { text: "Hyper Text Markup Language", isCorrect: true },
      { text: "High Technology Modern Language", isCorrect: false },
      { text: "Hyper Transfer Markup Language", isCorrect: false },
      { text: "Home Tool Markup Language", isCorrect: false }
    ],
    explanation: "HTML stands for Hyper Text Markup Language. It is the standard markup language for creating Web pages and describes the structure of a Web page."
  },
  {
    text: "Which CSS property is used to control the spacing between elements?",
    options: [
      { text: "spacing", isCorrect: false },
      { text: "margin", isCorrect: true },
      { text: "padding", isCorrect: false },
      { text: "border", isCorrect: false }
    ],
    explanation: "The margin property in CSS is used to create space around elements, outside of any defined borders. It controls the spacing between elements."
  },
  {
    text: "Which of the following is NOT a JavaScript framework or library?",
    options: [
      { text: "React", isCorrect: false },
      { text: "Angular", isCorrect: false },
      { text: "Vue", isCorrect: false },
      { text: "HTML5", isCorrect: true }
    ],
    explanation: "HTML5 is not a JavaScript framework or library. It is the latest version of the Hypertext Markup Language (HTML), the code that describes web page content. React, Angular, and Vue are all JavaScript frameworks or libraries used for building user interfaces."
  },
  {
    text: "What is the purpose of the 'alt' attribute in an HTML image tag?",
    options: [
      { text: "To specify an alternative URL for the image", isCorrect: false },
      { text: "To specify alternative text for the image if it cannot be displayed", isCorrect: true },
      { text: "To provide a tooltip when hovering over the image", isCorrect: false },
      { text: "To alter the appearance of the image", isCorrect: false }
    ],
    explanation: "The 'alt' attribute provides alternative text for an image if it cannot be displayed. It is also used by screen readers to describe the image to visually impaired users, making it an important accessibility feature."
  },
  {
    text: "Which HTTP status code indicates a successful response?",
    options: [
      { text: "200 OK", isCorrect: true },
      { text: "404 Not Found", isCorrect: false },
      { text: "500 Internal Server Error", isCorrect: false },
      { text: "301 Moved Permanently", isCorrect: false }
    ],
    explanation: "The HTTP status code 200 OK indicates that the request has succeeded. It is the standard response for successful HTTP requests."
  },
  {
    text: "What is the box model in CSS?",
    options: [
      { text: "A design pattern for creating responsive websites", isCorrect: false },
      { text: "A layout model that describes how elements are rendered on a web page", isCorrect: true },
      { text: "A JavaScript library for creating modal boxes", isCorrect: false },
      { text: "A tool for measuring element dimensions", isCorrect: false }
    ],
    explanation: "The CSS box model is a layout model that describes the rectangular boxes that are generated for elements in the document tree and laid out according to the visual formatting model. It consists of content, padding, border, and margin areas."
  },
  {
    text: "Which of the following is used to store data in a client's web browser?",
    options: [
      { text: "Cookies", isCorrect: false },
      { text: "Local Storage", isCorrect: true },
      { text: "Session Storage", isCorrect: false },
      { text: "All of the above", isCorrect: false }
    ],
    explanation: "Local Storage is one of the web storage options available in HTML5. It allows you to store data in the client's web browser with no expiration time. Cookies and Session Storage are also used to store data in the browser, but Local Storage has a larger capacity and no expiration date."
  },
  {
    text: "What is CORS in web development?",
    options: [
      { text: "A programming language used for web animations", isCorrect: false },
      { text: "A security feature that restricts web page requests to other domains", isCorrect: true },
      { text: "A CSS framework for responsive design", isCorrect: false },
      { text: "A type of web server configuration", isCorrect: false }
    ],
    explanation: "CORS (Cross-Origin Resource Sharing) is a security feature implemented by browsers that restricts web page requests to other domains. It is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin access to selected resources from a different origin."
  },
  {
    text: "What is the purpose of the 'viewport' meta tag in HTML?",
    options: [
      { text: "To enhance SEO for the webpage", isCorrect: false },
      { text: "To control the page's dimensions and scaling for different devices", isCorrect: true },
      { text: "To specify the character encoding for the HTML document", isCorrect: false },
      { text: "To define the color scheme for the webpage", isCorrect: false }
    ],
    explanation: "The viewport meta tag in HTML is used to control the dimensions and scaling of the webpage on different devices. It helps create responsive web designs that adapt to various screen sizes, particularly on mobile devices."
  },
  {
    text: "Which JavaScript method is used to add an element at the end of an array?",
    options: [
      { text: "push()", isCorrect: true },
      { text: "pop()", isCorrect: false },
      { text: "unshift()", isCorrect: false },
      { text: "shift()", isCorrect: false }
    ],
    explanation: "The push() method in JavaScript is used to add one or more elements to the end of an array and returns the new length of the array."
  },
  {
    text: "What is a SPA in web development?",
    options: [
      { text: "Secure Protocol Application", isCorrect: false },
      { text: "Single Page Application", isCorrect: true },
      { text: "Server Page Application", isCorrect: false },
      { text: "Structured Programming Application", isCorrect: false }
    ],
    explanation: "SPA stands for Single Page Application. It is a web application or website that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from the server, creating a more fluid user experience."
  },
  {
    text: "Which of the following is a valid way to comment in CSS?",
    options: [
      { text: "// This is a comment", isCorrect: false },
      { text: "<!-- This is a comment -->", isCorrect: false },
      { text: "/* This is a comment */", isCorrect: true },
      { text: "# This is a comment", isCorrect: false }
    ],
    explanation: "In CSS, comments are written using the syntax /* This is a comment */. This helps in documenting the stylesheet and making it more readable for other developers."
  },
  {
    text: "What is the purpose of the 'form' element in HTML?",
    options: [
      { text: "To create a table structure", isCorrect: false },
      { text: "To define a section in the document", isCorrect: false },
      { text: "To collect user input and send it to a server", isCorrect: true },
      { text: "To format text in a specific style", isCorrect: false }
    ],
    explanation: "The HTML 'form' element is used to collect user input through various form controls like input fields, checkboxes, and radio buttons. It can send this data to a server for processing."
  },
  {
    text: "Which HTTP method is typically used to submit form data?",
    options: [
      { text: "GET", isCorrect: false },
      { text: "POST", isCorrect: true },
      { text: "PUT", isCorrect: false },
      { text: "DELETE", isCorrect: false }
    ],
    explanation: "The HTTP POST method is typically used to submit form data to a server. It is preferred over GET for form submissions because it can send larger amounts of data and doesn't expose the data in the URL."
  },
  {
    text: "What is the purpose of CSS media queries?",
    options: [
      { text: "To query a database for CSS styles", isCorrect: false },
      { text: "To apply different styles based on the device or viewport characteristics", isCorrect: true },
      { text: "To dynamically generate CSS using JavaScript", isCorrect: false },
      { text: "To optimize CSS for faster loading", isCorrect: false }
    ],
    explanation: "CSS media queries allow you to apply different styles based on device characteristics such as screen width, height, or orientation. They are a key component of responsive web design, enabling websites to look good on all devices."
  },
  {
    text: "What is the purpose of the 'localStorage' in web development?",
    options: [
      { text: "To store data on the server", isCorrect: false },
      { text: "To store data in the browser with no expiration date", isCorrect: true },
      { text: "To create local variables in JavaScript", isCorrect: false },
      { text: "To cache HTTP requests", isCorrect: false }
    ],
    explanation: "localStorage is a web storage option that allows JavaScript websites and apps to store and access data in the browser with no expiration date. The data will persist even after the browser window is closed and reopened."
  },
  {
    text: "What is a CDN in web development?",
    options: [
      { text: "Content Display Network", isCorrect: false },
      { text: "Content Delivery Network", isCorrect: true },
      { text: "Code Distribution Network", isCorrect: false },
      { text: "Creative Design Network", isCorrect: false }
    ],
    explanation: "CDN stands for Content Delivery Network. It is a system of distributed servers that deliver web content to users based on their geographic location, improving website performance by reducing latency and providing redundancy."
  },
  {
    text: "Which of the following is NOT a valid CSS positioning method?",
    options: [
      { text: "Static", isCorrect: false },
      { text: "Relative", isCorrect: false },
      { text: "Dynamic", isCorrect: true },
      { text: "Absolute", isCorrect: false }
    ],
    explanation: "Dynamic is not a valid CSS positioning method. The valid positioning methods in CSS are: static (default), relative, absolute, fixed, and sticky. Each positioning method determines how an element is positioned in the document flow."
  },
  {
    text: "What is the purpose of the 'defer' attribute in a script tag?",
    options: [
      { text: "To prevent the script from executing", isCorrect: false },
      { text: "To delay script execution until after the page has been parsed", isCorrect: true },
      { text: "To download the script faster", isCorrect: false },
      { text: "To make the script run in a separate thread", isCorrect: false }
    ],
    explanation: "The 'defer' attribute in a script tag tells the browser to execute the script after the HTML document has been completely parsed. This can improve page loading performance by ensuring the HTML rendering is not blocked by script execution."
  },
  {
    text: "What does API stand for in web development?",
    options: [
      { text: "Application Programming Interface", isCorrect: true },
      { text: "Automated Program Integration", isCorrect: false },
      { text: "Advanced Programming Implementation", isCorrect: false },
      { text: "Application Process Integration", isCorrect: false }
    ],
    explanation: "API stands for Application Programming Interface. In web development, it refers to a set of rules and protocols that allows different software applications to communicate with each other."
  },
  {
    text: "What is a RESTful API?",
    options: [
      { text: "An API that uses XML for data exchange", isCorrect: false },
      { text: "An API that follows specific architectural constraints", isCorrect: true },
      { text: "An API designed for mobile applications only", isCorrect: false },
      { text: "An API that requires authentication", isCorrect: false }
    ],
    explanation: "A RESTful API is an API that follows the architectural constraints of REST (Representational State Transfer). It uses HTTP requests to access and manipulate data, and it is designed to be simple, lightweight, and scalable."
  },
  {
    text: "Which of the following is NOT a benefit of using a CSS preprocessor like SASS or LESS?",
    options: [
      { text: "Variables for reusable values", isCorrect: false },
      { text: "Nested syntax", isCorrect: false },
      { text: "Mixins for reusable code blocks", isCorrect: false },
      { text: "Automatic browser compatibility", isCorrect: true }
    ],
    explanation: "CSS preprocessors like SASS or LESS offer many benefits, but automatic browser compatibility is not one of them. For that, you would need a tool like Autoprefixer. CSS preprocessors do provide variables, nested syntax, and mixins, which help write more maintainable CSS code."
  },
  {
    text: "What is the purpose of the 'aria' attributes in HTML?",
    options: [
      { text: "To enhance search engine optimization", isCorrect: false },
      { text: "To improve website accessibility for users with disabilities", isCorrect: true },
      { text: "To add animations to HTML elements", isCorrect: false },
      { text: "To optimize website loading speed", isCorrect: false }
    ],
    explanation: "ARIA (Accessible Rich Internet Applications) attributes in HTML are used to improve website accessibility for users with disabilities. They provide additional semantics about the role, state, and properties of elements to assistive technologies like screen readers."
  },
  {
    text: "What is the purpose of the HTTP 'OPTIONS' method?",
    options: [
      { text: "To retrieve data from a specified resource", isCorrect: false },
      { text: "To determine the communication options for the target resource", isCorrect: true },
      { text: "To submit data to be processed to a specified resource", isCorrect: false },
      { text: "To delete a specified resource", isCorrect: false }
    ],
    explanation: "The HTTP OPTIONS method is used to describe the communication options for the target resource. It allows a client to determine the options and/or requirements associated with a resource, or the capabilities of a server, without implying any action or resource retrieval."
  },
  {
    text: "What is a Web Worker in JavaScript?",
    options: [
      { text: "A background worker that performs web scraping", isCorrect: false },
      { text: "A JavaScript that runs in the background, independently of other scripts", isCorrect: true },
      { text: "A software that monitors web server performance", isCorrect: false },
      { text: "A plugin that enhances web browser functionality", isCorrect: false }
    ],
    explanation: "A Web Worker is a JavaScript that runs in the background, independently of other scripts, without affecting the performance of the page. It can perform tasks without interfering with the user interface, making web applications more responsive."
  },
  {
    text: "What is the purpose of the HTTP 'Cache-Control' header?",
    options: [
      { text: "To specify which website can frame the content", isCorrect: false },
      { text: "To control how web content is cached", isCorrect: true },
      { text: "To set cookies for the browser", isCorrect: false },
      { text: "To compress the HTTP response", isCorrect: false }
    ],
    explanation: "The HTTP 'Cache-Control' header is used to specify browser caching policies in both client requests and server responses. It controls how, and for how long, the browser and other intermediate caches should store responses to requests."
  },
  {
    text: "What is a progressive web app (PWA)?",
    options: [
      { text: "A web application that progressively loads content as the user scrolls", isCorrect: false },
      { text: "A web application that uses progressive enhancement for older browsers", isCorrect: false },
      { text: "A web application that can work offline and provide app-like experiences", isCorrect: true },
      { text: "A web application that focuses on progressive disclosure of information", isCorrect: false }
    ],
    explanation: "A Progressive Web App (PWA) is a type of web application that can work offline, is installable, and provides app-like experiences using modern web capabilities. PWAs aim to combine the best features of web and mobile apps."
  },
  {
    text: "What is the primary purpose of WebSockets?",
    options: [
      { text: "To enhance website security", isCorrect: false },
      { text: "To establish a persistent, two-way connection between a client and server", isCorrect: true },
      { text: "To optimize website loading speed", isCorrect: false },
      { text: "To create responsive web designs", isCorrect: false }
    ],
    explanation: "WebSockets provide a persistent, low-latency, full-duplex connection between a client and a server, allowing both to send and receive data at any time. This makes WebSockets ideal for real-time applications like chat apps, live sports updates, and multiplayer games."
  },
  {
    text: "What is the purpose of the 'srcset' attribute in an image tag?",
    options: [
      { text: "To specify multiple sources for video elements", isCorrect: false },
      { text: "To provide different image sizes for different device resolutions", isCorrect: true },
      { text: "To set the source repository for the image", isCorrect: false },
      { text: "To define a set of scripts to run when the image loads", isCorrect: false }
    ],
    explanation: "The 'srcset' attribute in an image tag allows you to specify different image sources for different device resolutions or viewport sizes. This helps in responsive web design by serving the most appropriate image size based on the user's device, improving performance."
  },
  {
    text: "What is the purpose of the 'preload' link attribute in HTML?",
    options: [
      { text: "To improve SEO by preloading content for search engines", isCorrect: false },
      { text: "To fetch resources before they are needed to improve performance", isCorrect: true },
      { text: "To preload user data before login", isCorrect: false },
      { text: "To establish database connections early", isCorrect: false }
    ],
    explanation: "The 'preload' link attribute in HTML is a hint to browsers that they should fetch a resource as soon as possible before it is needed. This can improve performance by making resources available sooner, reducing load times when the resources are actually used."
  },
  {
    text: "What is the difference between 'display: none' and 'visibility: hidden' in CSS?",
    options: [
      { text: "They are exactly the same in functionality", isCorrect: false },
      { text: "'display: none' removes the element from the document flow, while 'visibility: hidden' hides it but keeps its space", isCorrect: true },
      { text: "'display: none' makes the element transparent, while 'visibility: hidden' removes it", isCorrect: false },
      { text: "'display: none' only works on block elements, while 'visibility: hidden' works on all elements", isCorrect: false }
    ],
    explanation: "The key difference is that 'display: none' removes the element completely from the document flow, as if it doesn't exist, while 'visibility: hidden' hides the element but still maintains its space in the layout. Both hide the element, but they affect the layout differently."
  }
]; 