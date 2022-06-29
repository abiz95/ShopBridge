General Information
Project: Shop Bridge
Front-End technology: Angular

Application setup
To run the application, navigate to the root folder/project ShopBridge and execute the below mentioned commands
1.	npm install
2.	ng serve

Functionalities
Angular Material has been usedused throughout the application for styling. The application has been made responsive.

Landing page:
•	It lists all the latest products.
•	If no products are available then it shows the message to add new products
•	From the landing, page products can be viewed.
•	A custom pipe has been created for showing the currency type.

Add/Edit pages:
•	The edit and add pages have almost the same functionality.
•	There is a custom validation added to see if the entered price of a product is lesser than 1 GBP.
•	And also in the price field, it won’t allow any other value other than the number. A custom directive was created to validate that.
•	There is a field to upload the image.
•	Custom reactive form validation was also added.

Manage listings:
•	The listing page manages the listing of the products.
•	All the products will be listed on this page.
•	The products can be deleted, edited and viewed from the listing page.
•	An angular material dialogue has been used for the product deletion confirmation message.
