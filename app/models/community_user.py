from .db import db

class Community_User(db.Model):
  __tablename__ = 'community_users'
  
  id = db.Column(db.Integer, primary_key=True)
  community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  role = db.Column(db.String(30), nullable=False)
  
  def to_dict(self):
    return {
      'id': self.id,
      'community_id': self.community_id,
      'user_id': self.user_id,
      'role': self.role
    }