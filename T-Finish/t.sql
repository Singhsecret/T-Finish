//create the MySQL table to store code snippets
//Run the following SQL command in your MySQL database-

CREATE TABLE code_snippets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  language VARCHAR(50) NOT NULL,
  stdin TEXT,
  source_code TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
