from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length



class PostForm(FlaskForm):
  title = TextAreaField('Title', validators=[DataRequired(), Length(min=3, max=300)])
  content = TextAreaField('content')
