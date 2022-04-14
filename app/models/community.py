from .db import db
from datetime import datetime

class Community(db.Model):
  __tablename__ = 'communities'
  
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False, unique=True)
  owner = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  members = db.Column(db.Integer, default=1, nullable=False)
  member_title = db.Column(db.String(30), nullable=False)
  community_image = db.Column(db.String)
  community_info = db.Column(db.Text, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
  
  posts = db.relationship('Post', backref='posts', cascade='all, delete')
  
  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'owner': self.owner,
      'members': self.members,
      'member_title': self.member_title,
      'community_image': self.community_image,
      'community_info': self.community_info,
      'posts': [post.to_dict() for post in self.posts],
      'created_at': self.created_at
    }