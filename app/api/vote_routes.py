from crypt import methods
from flask import Blueprint, jsonify, session, request
from app.models import db, Post, Comment, Post_Vote, Comment_Vote
from flask_login import current_user
from .auth_routes import validation_errors_to_error_messages

vote_routes = Blueprint('votes', __name__)


@vote_routes.route('/post_vote', methods=['GET'])
def get_post_vote():
  post_votes = Post_Vote.query.filter_by(user_id = current_user.id).all()
  
  return {'post_votes': [post.to_dict() for post in post_votes]}


@vote_routes.route('/post_vote', methods=['POST'])
def post_vote():
  
  post_id = request.json['postId']
  user_id = request.json['userId']
  vote_type = request.json['voteType']
  
  post = Post.query.get(post_id)
  
  
  try:
    prev_vote = Post_Vote.query.filter_by(user_id = user_id, post_id = post_id).one()
  except:
    prev_vote = None
  
  if prev_vote != None and prev_vote.vote_type != vote_type:
    
    prev_vote.vote_type = vote_type
    db.session.add(prev_vote)
    db.session.commit()
  
  elif prev_vote != None and prev_vote.vote_type == vote_type:
    
    db.session.delete(prev_vote)
    db.session.commit()
  
  else:
    
    vote = Post_Vote(
      user_id=current_user.id,
      post_id=post_id,
      vote_type=vote_type
    )
    
    db.session.add(vote)
    db.session.commit()
  
  
  upvotes = db.session.execute('select count(vote_type) from post_votes where vote_type=true and post_id={0}'.format(post_id)).scalar()
  downvotes = db.session.execute('select count(vote_type) from post_votes where vote_type=false and post_id={0}'.format(post_id)).scalar()
  post.vote_score = upvotes - downvotes
  db.session.add(post)
  db.session.commit()
  db.session.flush()
  
  if prev_vote != None:
    return prev_vote.to_dict()
  else:
    return vote.to_dict()
  
  
  
# Comments
  
@vote_routes.route('/comment_vote', methods=['GET'])
def get_comment_vote():
  comment_votes = Comment_Vote.query.filter_by(user_id = current_user.id).all()
  
  return {'comment_votes': [comment.to_dict() for comment in comment_votes]}


@vote_routes.route('/comment_vote', methods=['POST'])
def comment_vote():
  
  comment_id = request.json['commentId']
  user_id = request.json['userId']
  vote_type = request.json['voteType']
  
  comment = Comment.query.get(comment_id)
  
  
  try:
    prev_vote = Comment_Vote.query.filter_by(user_id = current_user.id, comment_id = comment_id).one()
  except:
    prev_vote = None
  
  if prev_vote != None and prev_vote.vote_type != vote_type:
    
    prev_vote.vote_type = vote_type
    db.session.add(prev_vote)
    db.session.commit()
  
  elif prev_vote != None and prev_vote.vote_type == vote_type:
    
    db.session.delete(prev_vote)
    db.session.commit()
  
  else:
    
    vote = Comment_Vote(
      user_id=current_user.id,
      comment_id=comment_id,
      vote_type=vote_type
    )
    
    db.session.add(vote)
    db.session.commit()
  
  
  upvotes = db.session.execute('select count(vote_type) from comment_votes where vote_type=true and comment_id={0}'.format(comment_id)).scalar()
  downvotes = db.session.execute('select count(vote_type) from comment_votes where vote_type=false and comment_id={0}'.format(comment_id)).scalar()
  comment.vote_score = upvotes - downvotes
  db.session.add(comment)
  db.session.commit()
  db.session.flush()
  
  if prev_vote != None:
    return prev_vote.to_dict()
  else:
    return vote.to_dict()