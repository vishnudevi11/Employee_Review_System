# Employee_Review_System
A web application is made for employee reviews.Employees can provide each other performance feedback on this page.Admin or employee roles are both possible for a user.The dashboard page, which renders and stores the data based on the role, will be displayed.User with the role of admin can assign employees to participate in review of other employees.Employees are limited to provide feedback that is requested by assigned reviews.
_______________________________________________________________________________________________________________________________________________________________________________________________________________________

## **Project view**
### *Admin's Panel*
  * Add Employee
  * Delete Employee
  * Update Employee
  * Assign review to Employee
    
### *Employee's Panel*
  * Submit Reviews assigned to it
  * View reviews given by others
____________________________________________________________________________________________________________________________________________________________________________________________________________________

## **How to setup the project**
* Clone this project from github
* Start by installing npm
* Navigate to project directory and run the following command
````
npm install
``````
* Run project
````
npm start or nodemon index.js
````
* Visit local browser- http://localhost:8080/
* Hosted Link- https://employee-review-system-esft.onrender.com

## **If you want User to make an admin,use the secret key : ers**
____________________________________________________________________________________________________________________________________________________________________________________________________________________
## **Tech Stack**
* NodeJs
* ExpressJs
* EJS
* MongoDB
____________________________________________________________________________________________________________________________________________________________________________________________________________________
## **Folder Structure**

employeereviewsystem
         |
         |
       asset-----CSS------->|------>admin.css
         |                  |------>footer.css
         |                  |------>header.css
         |                  |------>home.css
         |                  |------>sign.css
         |
       config
