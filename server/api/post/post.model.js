'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './post.events';

var PostSchema = new mongoose.Schema({
  title: { type: String, required: true},
  content: { type: String, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
  username: { type: String, require: true }, 
  datetime: { type: Date, default: Date.now()}
});

registerEvents(PostSchema);
export default mongoose.model('Post', PostSchema);
