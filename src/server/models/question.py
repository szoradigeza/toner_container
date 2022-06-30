from db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
class QuestionModel(db.Model):
  __tablename__='questions'
  id=db.Column(db.Integer,primary_key=True)
  description=db.Column(db.String(255))
  name=db.Column(db.String(50))
  difficulty = db.Column(db.Integer())
  image = db.Column(db.String(255))
  reviewed = db.Column(db.Integer())
  answers = relationship("AnswersModel")
  category_id = db.Column(db.Integer, ForeignKey("question_category.id"))
  category = relationship("QuestionCategoryModel")

  @classmethod
  def nextId(cls):
    num = cls.query.count()+1
    db.session.remove()
    return num
  @classmethod
  def getbyID(cls, id):
    return cls.query.filter_by(id=id).first()

  def flush_db(self):
    db.session.add(self)
    db.session.flush()
    print(self.id)

  def save_to_db(self):
    db.session.commit()
    db.session.remove()

  def db_commit(self):
    db.session.add(self)
    db.session.commit()
    db.session.remove()

  def merge(self):
    db.session.merge(self)

  @classmethod
  def deletebyID(cls, question_id):
    question = cls.query.filter_by(id=question_id).delete()
    db.session.commit()

  @classmethod
  def difficultyByNumber(cls, dif, id):
    dif1 = cls.query.filter_by(difficulty=dif).filter_by(category_id=id).count()
    db.session.remove()
    return dif1

  def serialize_QuestionModel(self):
    if self.answers:
      answers = [answer.serialize_answers() for answer in self.answers]
      return {
        'id': self.id,
        'description': self.description,
        'name': self.name,
        'difficulty': self.difficulty,
        'categoryID': self.category_id,
        'image': self.image,
        'answers': answers,
        'reviewed': self.reviewed
      }
