import { QuestionType } from '../../types/quiz';

export const databaseQuestions: QuestionType[] = [
  {
    text: "What is normalization in database design?",
    options: [
      { text: "The process of converting data types", isCorrect: false },
      { text: "The process of organizing data to reduce redundancy and improve data integrity", isCorrect: true },
      { text: "The process of indexing tables for faster queries", isCorrect: false },
      { text: "The process of securing database access", isCorrect: false }
    ],
    explanation: "Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It typically involves dividing large tables into smaller, related tables and defining relationships between them."
  },
  {
    text: "Which of the following is NOT a type of SQL join?",
    options: [
      { text: "INNER JOIN", isCorrect: false },
      { text: "LEFT JOIN", isCorrect: false },
      { text: "RIGHT JOIN", isCorrect: false },
      { text: "PARALLEL JOIN", isCorrect: true }
    ],
    explanation: "PARALLEL JOIN is not a standard SQL join type. The common types are INNER JOIN, LEFT (OUTER) JOIN, RIGHT (OUTER) JOIN, and FULL (OUTER) JOIN."
  },
  {
    text: "What is the primary purpose of an index in a database?",
    options: [
      { text: "To enforce data integrity", isCorrect: false },
      { text: "To speed up data retrieval operations", isCorrect: true },
      { text: "To reduce the size of the database", isCorrect: false },
      { text: "To organize data in normalized form", isCorrect: false }
    ],
    explanation: "Indexes in databases are used to speed up data retrieval operations. They work similarly to an index in a book, allowing the database engine to quickly locate the data without having to scan every row in a table."
  },
  {
    text: "What is a transaction in a database context?",
    options: [
      { text: "A query that modifies data in the database", isCorrect: false },
      { text: "A connection to the database", isCorrect: false },
      { text: "A unit of work that is performed against a database and treated as a single logical operation", isCorrect: true },
      { text: "A table that stores temporary data", isCorrect: false }
    ],
    explanation: "A transaction is a unit of work that is performed against a database and treated as a single logical operation. Transactions follow the ACID properties (Atomicity, Consistency, Isolation, Durability) to ensure data integrity."
  },
  {
    text: "What does ACID stand for in the context of database transactions?",
    options: [
      { text: "Atomicity, Consistency, Isolation, Durability", isCorrect: true },
      { text: "Atomicity, Concurrency, Integrity, Durability", isCorrect: false },
      { text: "Authentication, Consistency, Isolation, Durability", isCorrect: false },
      { text: "Availability, Consistency, Integrity, Distribution", isCorrect: false }
    ],
    explanation: "ACID stands for Atomicity (a transaction is all or nothing), Consistency (a transaction brings the database from one valid state to another), Isolation (concurrent transactions don't interfere with each other), and Durability (once a transaction is committed, it remains so)."
  },
  {
    text: "Which normal form requires that all non-key attributes are fully functionally dependent on the primary key?",
    options: [
      { text: "First Normal Form (1NF)", isCorrect: false },
      { text: "Second Normal Form (2NF)", isCorrect: true },
      { text: "Third Normal Form (3NF)", isCorrect: false },
      { text: "Boyce-Codd Normal Form (BCNF)", isCorrect: false }
    ],
    explanation: "Second Normal Form (2NF) requires that a table is in 1NF and all non-key attributes are fully functionally dependent on the primary key. This eliminates partial dependencies in tables with composite primary keys."
  },
  {
    text: "What is a foreign key in a relational database?",
    options: [
      { text: "A key used to encrypt sensitive data", isCorrect: false },
      { text: "A field that uniquely identifies each record in a table", isCorrect: false },
      { text: "A field that establishes a link between two tables", isCorrect: true },
      { text: "A key exported from another database system", isCorrect: false }
    ],
    explanation: "A foreign key is a field (or collection of fields) in one table that refers to the primary key in another table. It is used to establish and enforce a link between the data in two tables, maintaining referential integrity."
  },
  {
    text: "Which SQL statement is used to add new data to a database?",
    options: [
      { text: "SELECT", isCorrect: false },
      { text: "UPDATE", isCorrect: false },
      { text: "INSERT", isCorrect: true },
      { text: "ALTER", isCorrect: false }
    ],
    explanation: "The INSERT statement is used to add new records (rows) to a table in a database. The basic syntax is: INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);"
  },
  {
    text: "What is the difference between DELETE and TRUNCATE commands in SQL?",
    options: [
      { text: "DELETE removes specific rows based on a condition, while TRUNCATE removes all rows", isCorrect: true },
      { text: "DELETE is faster than TRUNCATE for removing large amounts of data", isCorrect: false },
      { text: "DELETE permanently removes data, while TRUNCATE allows for recovery", isCorrect: false },
      { text: "DELETE works on views, while TRUNCATE works only on tables", isCorrect: false }
    ],
    explanation: "DELETE allows you to remove specific rows based on a WHERE condition and logs individual row deletions. TRUNCATE removes all rows from a table without logging individual row deletions, making it faster, but it doesn't allow a WHERE clause."
  },
  {
    text: "What is a NoSQL database?",
    options: [
      { text: "A database that doesn't use SQL at all", isCorrect: false },
      { text: "A database that doesn't store relational data", isCorrect: false },
      { text: "A database that provides mechanisms for storage and retrieval of data that is modeled differently from the tabular relations used in relational databases", isCorrect: true },
      { text: "A newer version of SQL databases", isCorrect: false }
    ],
    explanation: "NoSQL (Not Only SQL) databases provide mechanisms for storage and retrieval of data that is modeled differently from the tabular relations used in relational databases. They are often used for large sets of distributed data and are designed with simpler horizontal scaling in mind."
  },
  {
    text: "Which of the following is a characteristic of a primary key?",
    options: [
      { text: "It can contain NULL values", isCorrect: false },
      { text: "It must be unique for each record in the table", isCorrect: true },
      { text: "It can be modified frequently", isCorrect: false },
      { text: "It can be duplicated across multiple tables", isCorrect: false }
    ],
    explanation: "A primary key is a column or a set of columns that uniquely identifies each row in a table. It must contain UNIQUE values and cannot contain NULL values. It should also be stable (not frequently changed) and as simple as possible."
  },
  {
    text: "What does SQL stand for?",
    options: [
      { text: "Structured Query Language", isCorrect: true },
      { text: "System Query Language", isCorrect: false },
      { text: "Sequential Query Language", isCorrect: false },
      { text: "Standard Query Logic", isCorrect: false }
    ],
    explanation: "SQL stands for Structured Query Language. It is a standard language for storing, manipulating, and retrieving data in relational database management systems."
  },
  {
    text: "What is a stored procedure in a database?",
    options: [
      { text: "A sequence of SQL statements saved in the database", isCorrect: true },
      { text: "A data structure for storing temporary results", isCorrect: false },
      { text: "A mechanism for backing up the database", isCorrect: false },
      { text: "A type of index for faster data retrieval", isCorrect: false }
    ],
    explanation: "A stored procedure is a prepared SQL code that you can save and reuse. It's like a function that can take parameters, perform operations, and return results. Stored procedures are stored in the database and can be executed with a call statement."
  },
  {
    text: "Which of the following is NOT a common type of NoSQL database?",
    options: [
      { text: "Document stores (e.g., MongoDB)", isCorrect: false },
      { text: "Key-value stores (e.g., Redis)", isCorrect: false },
      { text: "Graph databases (e.g., Neo4j)", isCorrect: false },
      { text: "Relational stores (e.g., PostgreSQL)", isCorrect: true }
    ],
    explanation: "Relational databases like PostgreSQL are not NoSQL databases. Common types of NoSQL databases include document stores (MongoDB), key-value stores (Redis), column-family stores (Cassandra), and graph databases (Neo4j)."
  },
  {
    text: "What is database sharding?",
    options: [
      { text: "A technique to encrypt sensitive data in a database", isCorrect: false },
      { text: "A method of splitting a large database into smaller, more manageable pieces across multiple servers", isCorrect: true },
      { text: "A process of optimizing database performance by removing unused indexes", isCorrect: false },
      { text: "A backup strategy for databases", isCorrect: false }
    ],
    explanation: "Database sharding is a type of horizontal partitioning that separates large databases into smaller, faster, more manageable pieces called shards. Each shard is held on a separate database server instance, to spread load."
  },
  {
    text: "What is a view in SQL?",
    options: [
      { text: "A physical table in the database", isCorrect: false },
      { text: "A virtual table based on the result-set of an SQL statement", isCorrect: true },
      { text: "A graphical representation of database tables", isCorrect: false },
      { text: "A user interface for entering data into a database", isCorrect: false }
    ],
    explanation: "A view is a virtual table based on the result-set of an SQL statement. It contains rows and columns, just like a real table, but doesn't store the data physically. Instead, it displays data from one or more tables."
  },
  {
    text: "Which of the following statements about database indexing is TRUE?",
    options: [
      { text: "Indexes always improve the performance of all queries", isCorrect: false },
      { text: "Indexes require additional storage space and can slow down write operations", isCorrect: true },
      { text: "A table can have at most one index", isCorrect: false },
      { text: "Indexes are automatically created for all columns in a table", isCorrect: false }
    ],
    explanation: "While indexes can dramatically improve the speed of read operations, they require additional storage space and can slow down write operations (INSERT, UPDATE, DELETE) because the indexes must also be updated. Therefore, they should be created strategically."
  },
  {
    text: "What is denormalization in database design?",
    options: [
      { text: "The process of creating backup copies of a database", isCorrect: false },
      { text: "The process of introducing redundancy into a database to improve read performance", isCorrect: true },
      { text: "The process of removing all indexes from a database", isCorrect: false },
      { text: "The process of converting a relational database to a NoSQL database", isCorrect: false }
    ],
    explanation: "Denormalization is the process of adding redundant data to one or more tables to avoid complex joins and improve read performance. This is done at the expense of increased data redundancy and potential consistency issues."
  },
  {
    text: "What is the CAP theorem in distributed database systems?",
    options: [
      { text: "A theorem stating that a database must choose between consistency, availability, and partition tolerance", isCorrect: true },
      { text: "A principle for designing efficient database schemas", isCorrect: false },
      { text: "A method for calculating the capacity of a database system", isCorrect: false },
      { text: "A protocol for secure database communications", isCorrect: false }
    ],
    explanation: "The CAP theorem states that a distributed database system can only simultaneously provide two out of the three guarantees: Consistency (all nodes see the same data at the same time), Availability (every request receives a response), and Partition tolerance (the system continues to operate despite network partitions)."
  },
  {
    text: "Which statement is TRUE about the HAVING clause in SQL?",
    options: [
      { text: "It is used instead of the WHERE clause", isCorrect: false },
      { text: "It is used to filter rows before grouping", isCorrect: false },
      { text: "It is used to filter groups after the GROUP BY clause", isCorrect: true },
      { text: "It is used to sort the result set", isCorrect: false }
    ],
    explanation: "The HAVING clause in SQL is used to filter groups after the GROUP BY clause has been applied. While the WHERE clause filters rows before grouping, the HAVING clause filters groups after grouping."
  },
  {
    text: "What is a database trigger?",
    options: [
      { text: "A special type of stored procedure that automatically executes when an event occurs in the database", isCorrect: true },
      { text: "A mechanism to start a database backup", isCorrect: false },
      { text: "A method to initiate a database connection", isCorrect: false },
      { text: "A tool to force index rebuilding", isCorrect: false }
    ],
    explanation: "A trigger is a special type of stored procedure that automatically executes when an event occurs in the database server. Triggers are used to maintain data integrity, log changes, or automate certain tasks."
  },
  {
    text: "What is the purpose of the SQL GROUP BY statement?",
    options: [
      { text: "To sort the result set in ascending or descending order", isCorrect: false },
      { text: "To filter rows based on a condition", isCorrect: false },
      { text: "To group rows that have the same values into summary rows", isCorrect: true },
      { text: "To join multiple tables together", isCorrect: false }
    ],
    explanation: "The GROUP BY statement in SQL is used to group rows that have the same values into summary rows, often used with aggregate functions (COUNT, MAX, MIN, SUM, AVG) to perform calculations on each group."
  },
  {
    text: "What is a deadlock in database systems?",
    options: [
      { text: "A situation where the database server crashes", isCorrect: false },
      { text: "A situation where two or more transactions are waiting for each other to release locks", isCorrect: true },
      { text: "A situation where all database connections are used up", isCorrect: false },
      { text: "A situation where a query never completes due to improper indexing", isCorrect: false }
    ],
    explanation: "A deadlock occurs when two or more transactions are waiting for each other to release locks, resulting in a standstill where none can proceed. Database systems typically detect deadlocks and resolve them by aborting one of the transactions."
  },
  {
    text: "Which of the following is TRUE about a Composite Key in a database?",
    options: [
      { text: "It is a combination of two or more columns that uniquely identify a row", isCorrect: true },
      { text: "It is a primary key that is automatically generated by the database", isCorrect: false },
      { text: "It is a key that allows NULL values", isCorrect: false },
      { text: "It is a key that is shared across multiple tables", isCorrect: false }
    ],
    explanation: "A Composite Key is a combination of two or more columns that together uniquely identify a row in a table. It is used when a single column is not sufficient to uniquely identify records."
  },
  {
    text: "What is eventual consistency in distributed database systems?",
    options: [
      { text: "A consistency model where writes to the database are immediately visible to all clients", isCorrect: false },
      { text: "A consistency model where the database system guarantees that if no new updates are made to an object, eventually all accesses to that object will return the last updated value", isCorrect: true },
      { text: "A model where the database is always in a consistent state", isCorrect: false },
      { text: "A model where data consistency is maintained only for critical transactions", isCorrect: false }
    ],
    explanation: "Eventual consistency is a consistency model used in distributed computing that informally guarantees that, if no new updates are made to a given data item, eventually all accesses to that item will return the last updated value. It provides high availability at the cost of relaxed consistency."
  },
  {
    text: "What is a database schema?",
    options: [
      { text: "A visual representation of a database structure", isCorrect: false },
      { text: "The physical organization of data on disk", isCorrect: false },
      { text: "A collection of database objects including tables, views, and procedures", isCorrect: true },
      { text: "A backup of a database", isCorrect: false }
    ],
    explanation: "A database schema is a collection of database objects, including tables, views, indexes, and procedures. It defines how the data is organized and how the relations among them are associated. It formulates all the constraints that are to be applied on the data."
  },
  {
    text: "Which statement about SQL injection is correct?",
    options: [
      { text: "It is a technique to speed up SQL queries", isCorrect: false },
      { text: "It is a method to import data into a database", isCorrect: false },
      { text: "It is a code injection technique that exploits security vulnerabilities in an application's software", isCorrect: true },
      { text: "It is a way to inject new features into an SQL database", isCorrect: false }
    ],
    explanation: "SQL injection is a code injection technique that exploits a security vulnerability occurring in the database layer of an application. The vulnerability is present when user input is either incorrectly filtered or not strongly typed and thereby passed directly into an SQL statement."
  },
  {
    text: "What is the purpose of the UNION operator in SQL?",
    options: [
      { text: "To join tables based on related columns", isCorrect: false },
      { text: "To combine the result sets of two or more SELECT statements", isCorrect: true },
      { text: "To filter rows based on a condition", isCorrect: false },
      { text: "To group rows that have the same values", isCorrect: false }
    ],
    explanation: "The UNION operator is used to combine the result sets of two or more SELECT statements into a single result set. The SELECT statements must have the same number of columns, and corresponding columns must have compatible data types."
  },
  {
    text: "What is a database connection pool?",
    options: [
      { text: "A collection of database instances for high availability", isCorrect: false },
      { text: "A cache of database connections maintained so that the connections can be reused when future requests to the database are required", isCorrect: true },
      { text: "A set of database tables that are frequently joined together", isCorrect: false },
      { text: "A group of database administrators who manage the database", isCorrect: false }
    ],
    explanation: "A database connection pool is a cache of database connections maintained so that the connections can be reused when future requests to the database are required. This saves the overhead of establishing a new connection for each database request."
  },
  {
    text: "What is the purpose of the ACID properties in database transactions?",
    options: [
      { text: "To increase the performance of database operations", isCorrect: false },
      { text: "To ensure the security of database access", isCorrect: false },
      { text: "To guarantee that database transactions are processed reliably", isCorrect: true },
      { text: "To minimize the size of the database", isCorrect: false }
    ],
    explanation: "The ACID properties (Atomicity, Consistency, Isolation, Durability) are designed to guarantee that database transactions are processed reliably. They ensure that the data remains accurate and consistent despite failures, errors, or concurrent access."
  }
]; 