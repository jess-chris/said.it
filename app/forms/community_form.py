from flask import Flask
from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Community
from flask_login import current_user
from sqlalchemy import func

def community_exists(form, field):
  name = field.data
  community = Community.query.filter(func.lower(Community.name) == func.lower(name)).first()
  if community:
    raise ValidationError('Community already exists.')

# def community_exists_edit(form, field):
#   name = field.data
#   community = Community.query.filter(func.lower(Community.name) == func.lower(name)).first()
#   if community.owner != current_user.id:
#     raise ValidationError('Community already exists.')


class CommunityForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), community_exists, Length(min=3, max=40)])
  # title = StringField('title', validators=[DataRequired(), Length(min=2, max=30)])
  image = StringField('image', validators=[FileAllowed('jpg', 'png')])
  info = TextAreaField('info', validators=[DataRequired(), Length(max=800)])
  
  
class EditCommunityForm(FlaskForm):
  #name = StringField('name', validators=[DataRequired(), community_exists_edit, Length(min=3, max=40)])
  # title = StringField('title', validators=[DataRequired(), Length(min=2, max=30)])
  image = StringField('image', validators=[FileAllowed('jpg', 'png')])
  info = TextAreaField('info', validators=[DataRequired(), Length(max=800)])