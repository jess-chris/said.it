from .db import db
from datetime import datetime
from sqlalchemy import func

class Post(db.Model):
  __tablename__ = 'posts'
  
  id = db.Column(db.Integer, primary_key=True)
  community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user_name = db.Column(db.String, db.ForeignKey('users.username'), nullable=False)
  title = db.Column(db.Text, nullable=False)
  content = db.Column(db.Text)
  vote_score = db.Column(db.Integer, default=0, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
  updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
  
  comments = db.relationship('Comment', backref='comments', cascade='all, delete')
  votes = db.relationship('Post_Vote', backref='post_votes', cascade='all, delete')
  
  @property
  def score(self):
    return self.vote_score
  
  # @score.setter
  # def score(self):
  #   upvotes = db.session.execute('select count(vote_type) from post_votes where vote_type=true').scalar()
  #   downvotes = db.session.execute('select count(vote_type) from post_votes where vote_type=false').scalar()
  #   self.vote_score = upvotes - downvotes      
  
  
  
  def to_dict(self):
    return {
      'id': self.id,
      'community_id': self.community_id,
      'user_id': self.user_id,
      'user_name': self.user_name,
      'title': self.title,
      'content': self.content,
      'vote_score': self.score,
      'votes': {vote.user_id: vote.to_dict() for vote in self.votes},
      'comments': [comment.to_dict() for comment in self.comments],
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
    
    