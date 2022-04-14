from .db import db
from datetime import datetime

class Post(db.Model):
  __tablename__ = 'posts'
  
  id = db.Column(db.Integer, primary_key=True)
  community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user_name = db.Column(db.String, db.ForeignKey('users.username'), nullable=False)
  content = db.Column(db.Text, nullable=False)
  vote_score = db.Column(db.Integer, default=0, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
  updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
  
  comments = db.relationship('Comment', backref='comments', cascade='all, delete')
  
  def to_dict(self):
    return {
      'id': self.id,
      'community_id': self.community_id,
      'user_id': self.user_id,
      'user_name': self.user_name,
      'content': self.content,
      'vote_score': self.vote_score,
      'comments': [comment.to_dict() for comment in self.comments],
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }