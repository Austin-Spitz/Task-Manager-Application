# Application NOT complete, still a work in progress

"# Task-Manager-Application"


### to setup mysql database

for windows, you need to install the MySQL community edition from the official orcale website:
https://dev.mysql.com/downloads/installer/


After installing mysql on windows, launch the MySQL command line client and run the following (Ensure the database is ran on localhost: 3306

```sql
create database taskmanager_db; -- Creates the new database

create user 'root'@'%' identified by 'password1234'; -- Creates the user and the password

 grant all on taskmanager_db.* to 'root'@'%'; -- Gives all privileges to the new user on the newly created database
```


### npm run start <-- to run the Ui side of the project. Ensure the server is: localhost:3000

### if there's an npm error run the following and repeat the step above: npm install

### run java complier for backend. Ensure the server is: localhost:8080

-------------------------------------------------------------------------------------------------------------------------------------------------



# Known bugs / issues:

- Found an issue where user tasks are merging into one single user.
