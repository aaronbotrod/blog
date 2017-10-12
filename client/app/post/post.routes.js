'use strict';
import routes from './post.routes';
import PostController from './post.controller';
export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('post', {
      url: '/posts/:id',
      template: require('./post.pug'),
      controller: PostController,
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
          if($stateParams.id) {
            return $http.get('/api/posts/'+$stateParams.id+'/comments').then((response)=> {
              return response.data;
            },
            (error)=> {
              return null;
            });
          } else {
            return [];
          }
        }
      }
    });
}
