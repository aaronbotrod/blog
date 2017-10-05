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

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('post');
    });
  }

  $onInit() {
    this.$http.get('/api/posts')
      .then(response => {
        this.awesomePosts = response.data;
        this.socket.syncUpdates('post', this.awesomePosts);
      });
  }

  addPost() {
    if(this.newPost) {
      this.$http.post('/api/posts', {
        name: this.newPost
      });
      this.newPost = '';
    }
  }

  deletePost(post) {
    this.$http.delete(`/api/posts/${post._id}`);
  }
}

export default angular.module('magicLeapBlogApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .name;
