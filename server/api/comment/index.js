'use strict';

var express = require('express');
var controller = require('./comment.controller');
import * as auth from '../../auth/auth.service';
var router = express.Router();

router.get('/posts/:postId/comments/', controller.index);
router.get('/posts/:postId/comments/:id', controller.show);
router.post('/posts/:postId/comments/', auth.isAuthenticated(), controller.create);
router.put('/posts/:postId/comments/:id', auth.isAuthenticated(), controller.upsert);
router.patch('/posts/:postId/comments/:id', auth.isAuthenticated(), controller.patch);
router.delete('/posts/:postId/comments/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
