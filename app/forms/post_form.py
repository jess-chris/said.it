from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post


class PostForm(FlaskForm):
  content = TextAreaField('content', validators=[DataRequired()])
