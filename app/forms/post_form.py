from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError



class PostForm(FlaskForm):
  content = TextAreaField('content', validators=[DataRequired()])
