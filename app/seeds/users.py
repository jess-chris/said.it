from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    dog = User(
        username='actualdog', email='woof@aa.io', password='woofwoof')
    joe = User(
        username='joe', email='joe@aa.io', password='password234')
    ok_investigator = User(
        username='OkInvestigator', email='oki@aa.io', password='password123')
    no_cobbler = User(
        username='No-Cobbler', email='cobbler@aa.io', password='password3453')
    imagination_ok = User(
        username='ImaginationOk', email='imagination@aa.io', password='password2342')
    outrageous = User(
        username='OutrageousScarcity', email='OutrageousScarcity@aa.io', password='password23421')
    bulky = User(
        username='uhhhh', email='uhhhh@aa.io', password='password13412')
    no_state = User(
        username='NoState8457', email='NoState8457@aa.io', password='password23423')
    sound = User(
        username='Consistent-Sound', email='Consistent-Sound@aa.io', password='password765')
    recipe = User(
        username='IllRecipe5302', email='IllRecipe5302@aa.io', password='password897')
    client_decent = User(
        username='ClientDecent5523', email='ClientDecent5523@aa.io', password='password987')
    no_cable = User(
        username='No-Cable8670', email='No-Cable8670@aa.io', password='password2732')    
    

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(dog)
    db.session.add(joe)
    db.session.add(ok_investigator)
    db.session.add(no_cobbler)
    db.session.add(imagination_ok)
    db.session.add(outrageous)
    db.session.add(bulky)
    db.session.add(no_state)
    db.session.add(sound)
    db.session.add(recipe)
    db.session.add(client_decent)
    db.session.add(no_cable)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
