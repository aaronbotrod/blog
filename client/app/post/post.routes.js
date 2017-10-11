'use strict';
import routes from './post.routes';

export class PostComponent {
  constructor(post, comments, $http, socket) {
    "ngInject";
    this.post = post;
    this.$http = $http;
    this.isOwner = true;
    this.socket = socket;
    this.comments = comments;
  }

 $onDestroy() {
    this.socket.unsyncUpdates('comment');
  }

  $onInit() {
    this.socket.syncUpdates('comment', this.comments);
  }

  editPost() {
    this.isEditing = true;
  }

  postComment(postId, content) {
    this.$http.post(`/api/posts/${postId}/comments`, {
      content: content
    });
    this.comments.content = '';
  }

  upsertPost() {
    if(this.post.title && this.post.content) {
      let postFix = "";
      if(this.post._id) {
        postFix = "/"+this.post._id;
      }
      this.$http.put('/api/posts'+postFix, {
        title: this.post.title,
        content: this.post.content
      }).then((response)=>{
        this.post = response.data;
        this.isEditing = false;
      });

    }
  }

  removePost(post) {
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
      controllerAs: '$ctrl',
      resolve: {
        post: ($http, $stateParams)=> {
          return $http.get('/api/posts/'+$stateParams.id).then((response)=> {
            return response.data;
          },
          (error)=> {
            return null;
          });
        },
        comments: ($http, $stateParams)=> {
          return $http.get('/api/posts/'+$stateParams.id+'/comments').then((response)=> {
            return response.data;
          },
          (error)=> {
            return null;
          });
        }
      }
    });
}
