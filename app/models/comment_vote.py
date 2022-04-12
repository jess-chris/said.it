from .db import db

class Comment_Vote(db.Model):
  __tablename__ = 'comment_votes'
  
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=False)
  vote_type = db.Column(db.Boolean, nullable=False)