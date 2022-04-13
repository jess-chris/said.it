from crypt import methods
from flask import Blueprint, jsonify, session, request
from app.models import db, Community
from app.forms import CommunityForm
from flask_login import current_user
from .auth_routes import validation_errors_to_error_messages

community_routes = Blueprint('communities', __name__)

@community_routes.route('/')
def communities():
  communities = Community.query.all()
  
  return {'communities': [community.to_dict() for community in communities]}



@community_routes.route('/new', methods=['POST'])
def new_community():
  
  form = CommunityForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    community = Community(
      name=form.data['name'],
      owner=current_user.id,
      member_title=form.data['title'],
      community_image=form.data['image'],
      community_info=form.data['info']
    )
    
    db.session.add(community)
    db.session.commit()
    return community.to_dict()
  
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400