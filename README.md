# Magic Leap Blog

## Summary

### Tools
Decided to use angular-full-stack as a baseline project because it included boilerplate for:
Authentication
Data store configuration
Front-end and Back-end application frameworks
Build configurations
Boiler plate templates
Deployment to Heroku Web Hosting

Given that I chose angular-full-stack in the interest of time I decided to keep with the latest stable version instead of the beta version containing angular 2. I chose pug for being concise and because I'm already transpiling the application. I chose to use sass because of the expressiveness. I chose to include web sockets to give real time updates of blog posts. 

### Improvements
- SEO considerations Ex. Updating the title per page
- Background image support the grid layout
- Validations and blacklists for user generated content
- Additional feedback for user interaction using animations and notifications

### Thoughts
My original decision to use angular fullstack tools 

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.2.2.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.
