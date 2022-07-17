import os
from flask_socketio import SocketIO, emit


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://said-it-reddit.herokuapp.com/",
        "https://said-it-reddit.herokuapp.com/"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("votes")
def handle_post_updates(post):
  emit("votes", post, broadcast=True)
  



  