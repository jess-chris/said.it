from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length


class CommentForm(FlaskForm):
  content = TextAreaField('comment', validators=[DataRequired()])