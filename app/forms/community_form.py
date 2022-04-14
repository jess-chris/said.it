from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Community
from sqlalchemy import func

def community_exists(form, field):
  name = field.data
  community = Community.query.filter(func.lower(Community.name) == func.lower(name)).first()
  if community:
    raise ValidationError('Community already exists.')



class CommunityForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), community_exists, Length(max=40)])
  title = StringField('title', validators=[DataRequired(), Length(max=30)])
  image = StringField('image')
  info = TextAreaField('info', validators=[DataRequired()])