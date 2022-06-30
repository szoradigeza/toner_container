from db import db
from sqlalchemy import ForeignKey

class AnswersModel(db.Model):
  __tablename__='answers'
  id=db.Column(db.Integer,primary_key=True)
  question_id=db.Column(db.Integer, ForeignKey("questions.id"))
  correct = db.Column(db.Integer)
  answer=db.Column(db.String(255))
  def save_to_db(self):
    db.session.add(self)
    db.session.commit()
    db.session.remove()

  def serialize_answers(self):
    return {
      'id': self.id,
      'question_id': self.question_id,
      'answer': self.answer,
      'correct': self.correct
    }
  def serialize_answers_without_correct(self):
    return {
      'id': self.id,
      'question_id': self.question_id,
      'answer': self.answer
    }
  @classmethod
  def getCorrectAnswer(cls, id):
    return cls.query.filter_by(question_id=id).filter_by(correct=1).all()
  @classmethod
  def deletebyID(cls, ans_id):
    answers = cls.query.filter_by(id=ans_id).delete()
    db.session.commit()

  @classmethod
  def deletebyQuestionID(cls, id):
    answers = cls.query.filter_by(question_id=id).delete()
    db.session.commit()
