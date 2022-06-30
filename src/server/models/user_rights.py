from db import db

class UserRightsModel(db.Model):
  __tablename__ = 'user_rights'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), index=True)

  @classmethod
  def getUserRight(cls, right):
    return cls.query.filter_by(id=right).first().name
  @classmethod
  def isItAdmin(cls):
    return cls.getUserRight == "admin"

  def json(self):
    return {
      'id': self.id,
      'name': self.name
    }
