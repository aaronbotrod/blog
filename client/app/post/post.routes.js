'use strict';
import routes from './post.routes';

export class PostComponent {
  constructor(post, $http) {
    "ngInject";
    this.post = post;
    this.$http = $http;
    this.isOwner = true;
  }

  editPost() {
    this.isEditing = true;
  }

  postComment(postId, content) {
    this.$http.post(`/api/posts/${postId}/comments`, {
      content: content
    });
  }

  upsertPost() {
    if(this.postTitle && this.postContent) {
      this.$http.post('/api/posts', {
        title: this.postTitle,
        content: this.postContent
      });
      this.postTitle = '';
      this.postContent = '';
    }
  }

  deletePost(post) {
    this.$http.delete(`/api/posts/${this.post._id}`);
  }
}

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('post', {
      url: '/posts/:id',
      template: require('./post.pug'),
      controller: PostComponent,
      controllerAs: 'postCtrl',
      resolve: {
        post: ($http, $stateParams)=> {
          return $http.get('/api/posts/'+$stateParams.id).then((response)=> {
            return response.data;
          },
          (error)=> {
            return null;
          });
        }
      }
    });
}
