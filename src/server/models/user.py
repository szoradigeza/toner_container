from db import db
from passlib.hash import pbkdf2_sha256 as sha256
from models.user_rights import UserRightsModel
from datetime import datetime

class UserModel(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(50), index=True)
  password_hash = db.Column(db.String(128))
  rights = db.Column(db.Integer)
  name = db.Column(db.String(255))
  created = db.Column(db.DateTime, default=datetime.now())
  def save_to_db(self):
    db.session.add(self)
    db.session.commit()

  def set_new_password(self, password):
    self.password_hash = sha256.hash(password)

  @classmethod
  def find_by_username(cls,username):
    return cls.query.filter_by(username = username).first()

  @classmethod
  def find_by_name(cls,username):
    return cls.query.filter_by(name = username).first()

  @classmethod
  def get_older_users(cls,time):
    return cls.query.filter(cls.created < time).all()


  @classmethod
  def return_all(cls):
    def to_json(x):
      return {
        'username': x.username,
        'password': x.password_hash,
        'name': x.name
      }
    return {'users': list(map(lambda x: to_json(x), UserModel.query.all()))}

  @staticmethod
  def generate_hash(password):
    return sha256.hash(password)

  @staticmethod
  def verify_hash(password, hash):
    return sha256.verify(password,hash)

  def return_username_and_role(self):
    return {
      'username': self.username,
      'role': UserRightsModel.query.filter_by(id=self.rights).first().name,
      'name': self.name
    }
  def delete_db(self):
    db.session.delete(self)
    db.session.commit()


class RevokedTokenModel(db.Model):
  __tablename__ = 'revoked_tokens'
  id = db.Column(db.Integer, primary_key=True)
  jti = db.Column(db.String(120))


  @classmethod
  def is_jti_blacklisted(cls, jti):
    query = cls.query.filter_by(jti=jti).first()
    db.session.remove()
    return bool(query)

  def add(self):
    db.session.add(self)
    db.session.commit()
