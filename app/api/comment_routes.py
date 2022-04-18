from crypt import methods
from flask import Blueprint, jsonify, session, request
from app.models import db, Post, Comment
from app.forms import CommentForm
from flask_login import current_user
from .auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/new', methods=['POST'])
def new_comment():
  
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  
  post_id = request.json['postId']
  
  if form.validate_on_submit():
    comment = Comment(
      user_id=current_user.id,
      user_name=current_user.username,
      post_id=post_id,
      content=form.data['content']
    )
    
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()
  
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@comment_routes.route('/edit', methods=['PUT'])
def edit_comment():
  
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  
  comment_id = request.json['commentId']
  
  comment = Comment.query.get(comment_id)
  
  if form.validate_on_submit():
    comment.content=form.data['content']
    
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()
  
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400



@comment_routes.route('/delete', methods=['DELETE'])
def delete_comment():
  
  comment_id = request.json['commentId']
  
  comment = Comment.query.get(comment_id)
  
  if comment.user_id == current_user.id:
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()
  else:
    return {'Error': 'Invalid request'}, 401