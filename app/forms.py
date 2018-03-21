from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, PasswordField, TextAreaField, FileField
from wtforms.validators import DataRequired, Email, EqualTo

class LoginForm(FlaskForm):
    username=StringField("Enter username",validators=[DataRequired()])
    password=PasswordField("Enter password",validators=[DataRequired()])
    remember_me = BooleanField('remember_me', default=False)

class RegisterForm(FlaskForm):
    username = StringField("Enter username", validators=[DataRequired()])
    password = PasswordField("Enter password", validators=[DataRequired()])
    repassword = PasswordField("Confirm password", validators=[EqualTo("password")])
    email = StringField("email", validators=[Email()])

class SearchForm(FlaskForm):
    searchtext = StringField( validators=[DataRequired()])



