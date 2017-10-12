/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/comments              ->  index
 * POST    /api/comments              ->  create
 * GET     /api/comments/:id          ->  show
 * PUT     /api/comments/:id          ->  upsert
 * PATCH   /api/comments/:id          ->  patch
 * DELETE  /api/comments/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Comment from './comment.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function removeEntity(res, user) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    } 
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    if(err.message) {
      return res.status(422).send({error: {message: err.message}});
    }
    res.status(statusCode).send(err);
  };
}

// Gets a list of Comments
export function index(req, res) {
  return Comment.find({post: req.params.postId}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Comment from the DB
export function show(req, res) {
  return Comment.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Comment in the DB
export function create(req, res) {
  let comment = req.body;
  comment.user = req.user._id;
  comment.post = req.params.postId;
  comment.username = req.user.username;
  return Comment.create(comment)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Comment in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  
  return Comment.findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Comment from the DB
export function destroy(req, res) {
  return Comment.findOne({_id: req.params.id, user: req.user._id}).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res, req.user))
    .catch(handleError(res));
}
