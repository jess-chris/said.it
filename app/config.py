import os


class Config:
    SECRET_KEY = 'pihQMMn0dKtg0un7oIkU8AXIocJzCuTZGdhlKeN2x0qwphQZNtCINU7KmiN7b+eniUjnFM5bejRmnuZG5fAkvQ=='
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here
    SQLALCHEMY_DATABASE_URI = 'postgresql://squ99:ERMTH9LsPCfucXSa@localhost/said_it'
    SQLALCHEMY_ECHO = True
