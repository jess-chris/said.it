from .db import db
from datetime import datetime

class Comment(db.Model):
  __tablename__ = 'comments'
  
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user_name = db.Column(db.String, db.ForeignKey('users.username'), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
  comment_id = db.Column(db.Integer)
  content = db.Column(db.Text, nullable=False)
  vote_score = db.Column(db.Integer, default=0, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
  updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
  
  votes = db.relationship('Comment_Vote', backref='comment_votes', cascade='all, delete')
  
  @property
  def score(self):
    return self.vote_score
  
  
  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'user_name': self.user_name,
      'post_id': self.post_id,
      'comment_id': self.comment_id,
      'content': self.content,
      'vote_score': self.score,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }