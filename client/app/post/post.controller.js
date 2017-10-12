export default class PostController {
  constructor(post, comments, $http, socket, Auth, $state) {
    "ngInject";
    this.post = post;
    this.$http = $http;
    this.currentUser = Auth.getCurrentUserSync();
    this.isOwner = this.currentUser._id === post.user;
    this.socket = socket;
    this.comments = comments;
    this.isEditing = !this.post._id;
    this.isLoggedIn = Auth.isLoggedInSync();
    this.$state = $state;
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

  ownsComment(userId) {
    return userId === this.currentUser._id;
  }

  removeComment(commentId) {
    this.$http.delete(`/api/posts/${this.post._id}/comments/${commentId}`);
  }

  postComment() {
    this.$http.post(`/api/posts/${this.post._id}/comments`, {
      content: this.comment.content
    }).then(()=> {
      this.comment.content = '';
    }); 
  }

  updateComment(comment) {
    this.$http.put(`/api/posts/${this.post._id}/comments/${comment._id}`, {
      content: comment.content
    }).then(()=> {
      comment.editing = false;
    }); 
  }

  upsertPost() {
    if(this.post.title && this.post.content) {
      let postFix = "";
      let action = "post";
      if(this.post._id) {
        postFix = "/"+this.post._id;
        action = "put"
      }
      this.$http[action]('/api/posts'+postFix, {
        title: this.post.title,
        content: this.post.content
      }).then((response)=>{
        this.post = response.data;
        this.isEditing = false;
        this.$state.go('post', {id: this.post._id}, {reload: true});
      });

    }
  }

  removePost(post) {
    this.$http.delete(`/api/posts/${this.post._id}`).then(()=>{
      this.$state.go('main');
    });
  }
}