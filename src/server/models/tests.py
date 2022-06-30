from db import db
import json
from datetime import datetime
class TestModel(db.Model):
  __tablename__='tests'
  id=db.Column(db.Integer, primary_key=True)
  test_writer_name= db.Column(db.String(250))
  start_date = db.Column(db.DateTime())
  end_date = db.Column(db.DateTime)
  time= db.Column(db.String(50))
  completed = db.Column(db.Integer)

  def json(self):
    return {'id': self.id, 'startDate': self.start_date.strftime("%Y-%m-%d %H:%M"),
            'endDate': self.end_date.strftime("%Y-%m-%d %H:%M"), 'testWriterName': self.test_writer_name,
            'time': self.time, 'completed:': self.completed}
  @classmethod
  def find_by_id(cls,id):
    return cls.query.filter_by(id = id).first()

  def flush_db(self):
    db.session.add(self)
    db.session.flush()

  def save_to_db(self):
    db.session.commit()
    db.session.remove()
