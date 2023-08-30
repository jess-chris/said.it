import os
from flask import Flask, render_template, request, session, redirect, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.community_routes import community_routes
from .api.post_routes import post_routes
from .api.comment_routes import comment_routes
from .api.vote_routes import vote_routes

from .seeds import seed_commands

from .config import Config
#from .socket_config import socketio

app = Flask(__name__, static_folder='../build', static_url_path='/')

base_url = 'said_it'
#secret_key = os.environ.get('SECRET_KEY')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
#app.config['SECRET_KEY'] = settings.SECRET_KEY

app.register_blueprint(user_routes, url_prefix=f"/{base_url}/api/users")
app.register_blueprint(auth_routes, url_prefix=f"/{base_url}/api/auth")
app.register_blueprint(community_routes, url_prefix=f"/{base_url}/api/communities")
app.register_blueprint(post_routes, url_prefix=f"/{base_url}/api/posts")
app.register_blueprint(comment_routes, url_prefix=f"/{base_url}/api/comments")
app.register_blueprint(vote_routes, url_prefix=f"/{base_url}/api/votes")
db.init_app(app)
Migrate(app, db)


#socketio.init_app(app)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route(f"/{base_url}/", defaults={'path': ''})
@app.route(f"/{base_url}/<path:path>")
def react_root(path):
    if path != "" and os.path.exists(f"{app.static_folder}/{path}"):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

#    if path == 'favicon.ico':
#        return app.send_static_file('favicon.ico')
#    return app.send_static_file('index.html')

#if __name__ == '__main__':
#    socketio.run(app)
