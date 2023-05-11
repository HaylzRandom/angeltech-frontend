# Angel Tech Helpdesk MERN Project <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Description](#description)
- [Technologies](#technologies)
- [Linked Repositories](#linked-repositories)
- [Packages](#packages)
- [Roadmap](#roadmap)
- [Demo](#demo)
- [Screenshots](#screenshots)

## Description

A helpdesk application that allows users to login to an account, create tickets for technical issues, update tickets and admin users can create, delete and manage other user accounts. Client-side created using React. Server-side created using MongoDB for databse, Express.js and Node.js for API.

## Technologies

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![JSON Web Token](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

## Linked Repositories

- Frontend:
  [AngelTech Frontend](https://github.com/HaylzRandom/angeltech-frontend)
- Backend: [AngelTech API](https://github.com/HaylzRandom/angeltech-api)

## Packages

<table>
    <tr><th>Name</th><th>Description</th></tr>
    <tr><td>@fortawesome</td><td>Fontawesome packages for React to enable use as components in React apps.</td></tr>
    <tr><td>@fvilers/disable-react-devtools</td><td>A simple method to disable the React Developer Tools addon to access your application.</td></tr>
    <tr><td>@reduxjs/toolkit</td><td>Used for state management to manage the state of users and tickets.</td></tr>
    <tr><td>jwt-decode</td><td>Small browser library that helps decode JWTs token which are Base64Url encoded.</td></tr>
    <tr><td>react</td><td>JavaScript library for building user interfaces</td></tr>
    <tr><td>react-dom</td><td>Package that provides DOM-specific methods for React.</td></tr>
    <tr><td>react-redux</td><td>Used for state management to manage the state users and allowing persistant login to occur throughout use of the applications.</td></tr>
    <tr><td>react-router-dom</td><td>Enables client side routing navigation.</td></tr>
    <tr><td>react-spinners</td><td>Package containing a collection of React spinners that are used for loading data.</td></tr>
</table>

## Roadmap

- [x] When deleting a user, checked if there are any open tickets attached to
      them
- [x] Redirect user if they should have have access to ticket
- [ ] Redirect user if they should have have access to profile
- [ ] When creating a customer user, add a company to their account
- [ ] Research if a cleaner method for pre-populating customer exists when
      creating ticket
- [x] Set last logged in date and time on user dashboard
- [x] Create a custom loading spinner
- [ ] Redesign website layout with new styles
- [ ] Add a note system to tickets
- [ ] Allow users to alter their own passwords (Only Admins and Managers can
      alter passwords)
- [ ] When tickets are updated, send an e-mail out
- [ ] Implement TypeScript when more comfortable with it

## Demo

[Demo Website](https://angeltech-helpdesk.onrender.com/)

Demo Gif

<img src="./screenshots/demo.gif.gif" alt="Demo Gif" width="800"  />

## Screenshots

<p align="center">
    <table>
        <thead>General</thead>
        <tr>
            <td>
                <img src="./screenshots/desktop-homepage.png" alt="Homepage Screenshot" width="300" height="100%" />
            </td>
            <td>
                <img src="./screenshots/desktop-login.png" alt="Login Page Screenshot" width="300" height="100%" />
            </td>
        </tr>
    </table>
</p>

<p align="center">
    <table>
        <thead>Admin Pages</thead>
        <tr>
            <td>
                <img src="./screenshots/admin-dashboard.png" alt="Admin Dashboard Screenshot" width="300" height="100%" />
            </td>
            <td>
                <img src="./screenshots/users-list.png" alt="Users List Screenshot" width="300" height="100%" />
            </td>
        </tr>
        <tr>
            <td>
                <img src="./screenshots/new-user.png" alt="New User Creation Screenshot" width="300" height="100%" />
            </td>
        </tr>
    </table>
</p>

<p align="center">
    <table>
        <thead>Customer Pages</thead>
        <tr>
            <td>
                <img src="./screenshots/customer-tickets.png" alt="Customer Tickets Page Screenshot" width="300" height="100%" />
            </td>
            <td>
                <img src="./screenshots/ticket-creation.png" alt="Creation of a Ticket Screenshot" width="300" height="100%" />
            </td>
        </tr>
    </table>
</p>
