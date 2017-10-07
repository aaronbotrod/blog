'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './post.events';

var PostSchema = new mongoose.Schema({
  title: { type: String, required: true},
  content: { type: String, required: true},
  username: { type: String, required: true},
  datetime: { type: Date, default: Date.now()}
});

registerEvents(PostSchema);
export default mongoose.model('Post', PostSchema);
