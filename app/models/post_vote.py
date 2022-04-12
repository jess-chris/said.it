from .db import db

class Post_Vote(db.Model):
  __tablename__ = 'post_votes'
  
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
  vote_type = db.Column(db.Boolean, nullable=False)