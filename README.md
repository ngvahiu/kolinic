# Kolinic website application

This is a web application for clinics offering healthcare services, appointment scheduling, drugs selling, health blogs, and other related information. This application has two sides: User and Administrator.
Here are functionalities of the application:
- Sign up, sign in (by account/Google/Facebook), forgot/reset password, update password, role-based authorization, email verification
- View services/departments/doctors/drugs/orders/blogs information (user, admin); view users/appointments/orders (admin). Create/Update/Delete users/doctors/drugs/orders/services/appointments (admin). Update profile
- Update profile, view shopping cart, paypal payment, responsive for mobile screens

## Tech Stack:
* Front-end (client): React + JavaScript, Redux Toolkit, SASS/SCSS, Tailwind CSS, React Router, Ant Design, animation package (slick, toastify, aos)
* Back-end (server): Spring Boot, Spring Security, MySQL, AWS: S3 bucket

## Live Demonstration

The E-commerce demo can be [viewed online here](http://kolinic-client.s3-website-ap-southeast-1.amazonaws.com).
(Notice that the demo is hosted on AWS service with free of charge so it can have some errors when reloading page)

Here is a Home-page screenshot for visualizing how my application looks like.

**Home Page**
![Home Page](home-page.png?raw=true "Optional Title")

---

## Getting Started
To get started  you can simply clone this `kolinic` repository and install the dependencies.

Clone the `kolinic` repository using git:

```bash
git clone https://github.com/ngvahiu/kolinic
cd kolinic
```

Install dependencies (`kolinic-client` folder) with this command:
```bash
npm install
```
Using any suitable IDE for opening `kolinic-server` folder, then load all needed packages in pom.xml. In addtion, creating application.yml file for sensitive information and run `kolinic-server when everything is ready.

Run the application (`kolinic-client` folder) with this command:
```bash
npm start
```