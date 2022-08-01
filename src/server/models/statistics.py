from db import db

from sqlalchemy_serializer import SerializerMixin


class StatisticsModel(db.Model, SerializerMixin):
    __tablename__ = 'statistics'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    value = db.Column(db.Integer())

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        db.session.remove()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
