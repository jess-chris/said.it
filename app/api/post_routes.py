from crypt import methods
from flask import Blueprint, jsonify, session, request
from app.models import db, Post
from app.forms import PostForm
from flask_login import current_user
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def posts():
  posts = Post.query.all()
  
  return {'posts': [post.to_dict() for post in posts]}




@post_routes.route('/new', methods=['POST'])
def new_post():
  
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  community_id = request.json['community']
  
  if form.validate_on_submit():
    
    post = Post(
      community_id=community_id,
      content=form.data['content'],
      user_id=current_user.id,
      user_name=current_user.username
    )
    
    db.session.add(post)
    db.session.commit()
    return post.to_dict()
  
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400




@post_routes.route('/edit', methods=['PUT'])
def edit_post():
  
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  
  post_id = request.json['id']
  
  post = Post.query.get(post_id)
  
  if form.validate_on_submit() and post.user_id == current_user.id:
    post.content=form.data['content']
    
    db.session.add(post)
    db.session.commit()
    return post.to_dict()   
  
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@post_routes.route('/delete', methods=['DELETE'])
def delete_post():
  
  post_id = request.json['id']
  
  post = Post.query.get(post_id)
  
  if post.user_id == current_user.id:
    db.session.delete(post)
    db.session.commit()
    return post.to_dict()
  else:
    return {'Error': 'Invalid request'}, 401