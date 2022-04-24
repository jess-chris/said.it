from app.models import db, Post_Vote


# Adds a demo user, you can add other users here if you want
def seed_post_votes():
  
  post_vote1 = Post_Vote (
    user_id='1', post_id='1', vote_type=True
  )
  post_vote2 = Post_Vote (
    user_id='1', post_id='2', vote_type=False
  )
  post_vote3 = Post_Vote (
    user_id='2', post_id='1', vote_type=True
  )
  post_vote4 = Post_Vote (
    user_id='2', post_id='2', vote_type=False
  )
  post_vote5 = Post_Vote (
    user_id='3', post_id='1', vote_type=False
  )
  post_vote6 = Post_Vote (
    user_id='3', post_id='2', vote_type=True
  )
  post_vote7 = Post_Vote (
    user_id='4', post_id='1', vote_type=True
  )
  post_vote8 = Post_Vote (
    user_id='4', post_id='2', vote_type=False
  )
  post_vote9 = Post_Vote (
    user_id='5', post_id='3', vote_type=True
  )
  post_vote10 = Post_Vote (
    user_id='5', post_id='4', vote_type=True
  )
  post_vote11 = Post_Vote (
    user_id='6', post_id='5', vote_type=True
  )
  post_vote12 = Post_Vote (
    user_id='6', post_id='4', vote_type=True
  )
  post_vote13 = Post_Vote (
    user_id='7', post_id='3', vote_type=True
  )
  post_vote14 = Post_Vote (
    user_id='7', post_id='6', vote_type=True
  )
  post_vote15 = Post_Vote (
    user_id='8', post_id='6', vote_type=True
  )
  post_vote16 = Post_Vote (
    user_id='8', post_id='7', vote_type=True
  )
  post_vote17 = Post_Vote (
    user_id='9', post_id='5', vote_type=True
  )
  post_vote18 = Post_Vote (
    user_id='9', post_id='4', vote_type=True
  )
  post_vote19 = Post_Vote (
    user_id='10', post_id='6', vote_type=True
  )
  post_vote20 = Post_Vote (
    user_id='10', post_id='7', vote_type=True
  )
  
  
  db.session.add(post_vote1)
  db.session.add(post_vote2)
  db.session.add(post_vote3)
  db.session.add(post_vote4)
  db.session.add(post_vote5)
  db.session.add(post_vote6)
  db.session.add(post_vote7)
  db.session.add(post_vote8)
  db.session.add(post_vote9)
  db.session.add(post_vote10)
  db.session.add(post_vote11)
  db.session.add(post_vote12)
  db.session.add(post_vote13)
  db.session.add(post_vote14)
  db.session.add(post_vote15)
  db.session.add(post_vote16)
  db.session.add(post_vote17)
  db.session.add(post_vote18)
  db.session.add(post_vote19)
  db.session.add(post_vote20)

  db.session.commit()




# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_post_votes():
    db.session.execute('TRUNCATE post_votes RESTART IDENTITY CASCADE;')
    db.session.commit()
