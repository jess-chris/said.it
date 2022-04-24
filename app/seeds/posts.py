from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
  
  post1 = Post (
    community_id='1', user_id='1', user_name='Demo', title='ELI5: why does Pepsi in a can taste different from Pepsi in a glass or plastic.', vote_score='2'
  )
  post2 = Post (
    community_id='1', user_id='2', user_name='marnie', title='ELI5: What exactly happens when a WiFi router stops working and needs to be restarted to give you internet connection again?', vote_score='-2'
  )
  post3 = Post (
    community_id='1', user_id='3', user_name='bobbie', title='ELI5: Why does the campfire smoke keep following me?', vote_score='2'
  )
  
  post4 = Post (
    community_id='2', user_id='4', user_name='actualdog', title='a group of ferrets is called a business', vote_score='3'
  )
  post5 = Post (
    community_id='2', user_id='5', user_name='joe', title='Should I buy a boat?', vote_score='2'
  )
  post6 = Post (
    community_id='2', user_id='6', user_name='OkInvestigator', title='Why do i have no money?', vote_score='3'
  )
  
  post7 = Post (
    community_id='3', user_id='10', user_name='uhhhh', title='did you know', vote_score='2'
  )
  post8 = Post (
    community_id='3', user_id='12', user_name='Consistent-Sound', title='heckin interesting'
  )
  post9 = Post (
    community_id='3', user_id='14', user_name='ClientDecent5523', title='very cool thing'
  )
  
  post10 = Post (
    community_id='4', user_id='13', user_name='IllRecipe5302', title='cute dog picture'
  )
  post11 = Post (
    community_id='4', user_id='4', user_name='actualdog', title='look at all these chickens'
  )
  post12 = Post (
    community_id='4', user_id='15', user_name='No-Cable8670', title='awwwwwwww'
  )
  
  post13 = Post (
    community_id='4', user_id='8', user_name='OutrageousScarcity', title='what is an array'
  )
  post14 = Post (
    community_id='4', user_id='4', user_name='actualdog', title='can you do kmaps in python'
  )
  post15 = Post (
    community_id='4', user_id='7', user_name='ImaginationOk', title='Why doesn\'t my code work'
  )
  
  db.session.add(post1)
  db.session.add(post2)
  db.session.add(post3)
  db.session.add(post4)
  db.session.add(post5)
  db.session.add(post6)
  db.session.add(post7)
  db.session.add(post8)
  db.session.add(post9)
  db.session.add(post10)
  db.session.add(post11)
  db.session.add(post12)
  db.session.add(post13)
  db.session.add(post14)
  db.session.add(post15)

  db.session.commit()




# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
