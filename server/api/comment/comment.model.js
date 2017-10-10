'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './comment.events';

var CommentSchema = new mongoose.Schema({
  content: {type: String, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', require: true},
  username: { type: String, require: true },
  datetime: {type: Date, default: Date.now()}
});

registerEvents(CommentSchema);
export default mongoose.model('Comment', CommentSchema);
