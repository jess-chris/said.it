from .db import db
from datetime import datetime

class Comment(db.Model):
  __tablename__ = 'comments'
  
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
  comment_id = db.Column(db.Integer)
  content = db.Column(db.Text, nullable=False)
  vote_score = db.Column(db.Integer, default=0, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
  updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
  
  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'post_id': self.post_id,
      'comment_id': self.comment_id,
      'content': self.content,
      'vote_score': self.vote_score,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }