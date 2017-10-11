'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './post.routes';

export default angular.module('magicLeapBlogApp.post', [uiRouter])
  .config(routes)
  .name;
