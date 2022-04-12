from flask import Blueprint, jsonify, session, request
from app.models import db, Community

community_routes = Blueprint('communities', __name__)

@community_routes.route('/')
def communities():
  communities = Community.query.all()
  
  return {'communities': [community.to_dict() for community in communities]}