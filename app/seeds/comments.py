from app.models import db, Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():
  
  comment1 = Comment (
    user_id='1', user_name='Demo', post_id='1', content='probably science'
  )
  comment2 = Comment (
    user_id='2', user_name='marnie', post_id='1', content='what does it taste like'
  )
  
  comment3 = Comment (
    user_id='1', user_name='Demo', post_id='2', content='it starts screaming, you just cant hear it anymore'
  )
  comment4 = Comment (
    user_id='4', user_name='actualdog', post_id='2', content='nobody knows'
  )
  
  comment5 = Comment (
    user_id='5', user_name='joe', post_id='4', content='thank you'
  )
  
  db.session.add(comment1)
  db.session.add(comment2)
  db.session.add(comment3)
  db.session.add(comment4)
  db.session.add(comment5)


  db.session.commit()




# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
