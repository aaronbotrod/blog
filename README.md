# Magic Leap Blog

## Demo
[Demo Blog Can Be Found Here](https://magic-leap-blog-demo.herokuapp.com/)

## Summary

### Planning
Decided to use angular-fullstack as a baseline project because it included boilerplate for:
Authentication
Data store configuration
Front-end and Back-end application frameworks
Build configurations
Boiler plate templates
Deployment to Heroku Web Hosting

Given that I chose angular-fullstack, in the interest of time I decided to keep with the latest stable version instead of the beta version containing angular 2. I chose pug and sass for having concise and expressive syntax. I chose to include web sockets to give real time updates of blog posts and comments. 

I added wysiwyg text editors for comments and posts to allow for richer content. Provided a preview of the content to more closely match the mock blog. Added transitions to posts and comments to provide visual queues for the changing of state. 

### Improvements
- SEO considerations Ex. Updating the title per page
- Have the background image support the grid layout
- Validations and blacklists for user generated content
- Additional feedback for user interaction using animations and notifications
- Return appropriate http response codes for errors
- Follow CSS conventions such as BEM
- Granular set of angular components
- Better icon selection
- Paging for comments and posts
- Create and update test code

### Reflection
My original decision to stick to angular-fullstack is set of tools became an issue when trying to immitate the example blog styles. Starting from the ground up with bootstrap 4 would have reduced the amount of new css rules used to match the mock blog. Which would have led to considerably shorter development time and cleaner css/html code. 

I enjoyed getting the post/comment updates and animations to work based on real time events from the server.

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
