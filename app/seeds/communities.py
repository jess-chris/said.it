from app.models import db, Community


# Adds a demo user, you can add other users here if you want
def seed_communities():
  
  explain = Community (
    name='explainlikeimfive', owner='1', owner_username='Demo', community_info='Explain Like I\'m Five is the best forum and archive on the internet for layperson-friendly explanations. Don\'t Panic!'
  )
  
  business = Community (
    name='business', owner='2', owner_username='marnie', community_info='/s/business brings you the best of your business section. From tips for running a business, to pitfalls to avoid, /s/business teaches you the smart moves and helps you dodge the foolish.'
  )
  
  interesting = Community (
    name='interestingasheck', owner='3', owner_username='bobbie', community_info='For anything that is InterestingAsHeck.'
  )
  
  aww = Community (
    name='aww', owner='4', owner_username='actualdog', community_info='Things that make you go AWW! Like puppies, bunnies, babies, and so on... A place for really cute pictures and videos!'
  )
  
  python_com = Community (
    name='Python', owner='5', owner_username='joe', community_info='News about the programming language Python. If you have something to teach others post here.'
  )
  
  db.session.add(explain)
  db.session.add(business)
  db.session.add(interesting)
  db.session.add(aww)
  db.session.add(python_com)
  db.session.commit()




# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_communities():
    db.session.execute('TRUNCATE communities RESTART IDENTITY CASCADE;')
    db.session.commit()
