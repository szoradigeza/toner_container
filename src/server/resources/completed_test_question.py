from flask_restful import Resource
from models.completed_tests_questions import CompletedTestQuestionsModel
from models.answers import AnswersModel
from flask import request
from flask_jwt_extended import (jwt_required)
import logging
log = logging.getLogger('tester.sub')

class ResponseObj:
  def __init__(self, id, question_name, question_description, ans, correct_answer):
    self.id = id
    self.question_name = question_name
    self.question_description = question_description
    self.answer = ans
    self.correct_answer = correct_answer

  def json(self):
    return {'id': self.id,
            'question_name': self.question_name,
            'question_description': self.question_description,
            'answer': self.answer,
            'correct_answer': self.correct_answer
            }


class CompletedTestQuestionByID(Resource):
  @jwt_required
  def post(self):
    try:
      respArray = []
      data = request.get_json(force=True)
      test=CompletedTestQuestionsModel.query.filter_by(test_id=data['id']).all()
      for question in test:
        resp = ResponseObj(question.id, question.question.name, question.question.description,
                           question.answer, self.getcorrectAnsArray(question.question_id)).json()
        respArray.append(resp)
      return (respArray)
    except Exception as e:
      log.warning(e)
  def getcorrectAnsArray(self, id):
    try:
      correctAnswers = AnswersModel.getCorrectAnswer(id)
      answers = []
      for ans in correctAnswers:
        answers.append(ans.answer)
      return answers
    except Exception as e:
      log.warning(e)

