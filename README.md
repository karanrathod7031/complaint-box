# complaint-box
simple dummy code where used the hostel complaint box concept, here student can drop the complaints online

step 1:-
# Open MySQL Workbench.
  CREATE DATABASE hostel_complaints;
  USE hostel_complaints;  
  CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100),
    room_number VARCHAR(50),
    complaint TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );


step 2:-
open cmd erun following command - it install project relevent modules
 # npm init -y
 # npm install express mysql2 body-parser express-session

step 3:- Start server
  # node server.js
  
  if successful , you will see following url-->
  Server running on http://localhost:3000

