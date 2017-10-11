import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  awesomePosts = [];
  newPost = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
  }
  $onDestroy() {
    this.socket.unsyncUpdates('post');
  }

  $onInit() {
    this.$http.get('/api/posts')
      .then(response => {
        this.posts = response.data;
        this.socket.syncUpdates('post', this.posts);
      });
  }
}

export default angular.module('magicLeapBlogApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .name;
