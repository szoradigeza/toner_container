from db import db

from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import DateTime
from datetime import datetime

class StatisticsModel(db.Model, SerializerMixin):
    __tablename__ = 'statistics'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25))
    value = db.Column(db.Integer())
    date = db.Column(db.DateTime, default=datetime.now())


    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        db.session.remove()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
