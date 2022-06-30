from flask_restful import Resource, reqparse
from models.answers import AnswersModel
from flask import jsonify
from flask import request
from sqlalchemy.sql.expression import func
from models.question import QuestionModel
from models.tests import TestModel
from models.test_question import Test_QuestionModel
parser = reqparse.RequestParser()
from models.completed_tests import CompletedTestModel
from models.completed_tests_questions import CompletedTestQuestionsModel
from flask_jwt_extended import (jwt_required)
from datetime import datetime
from models.user import UserModel
import logging
parser = reqparse.RequestParser()

import logging
log = logging.getLogger('tester.sub')

parser.add_argument('username', help='This field cannot be blank', required=True)
parser.add_argument('password', help='This field cannot be blank', required=True)

class TestGeneration(Resource):
  def getRandQuestion(self, categoryID, diff, difNum):
    return list(map(lambda x: x.serialize_QuestionModel(),
             QuestionModel.query
                    .filter_by(category_id=categoryID)
                    .filter_by(difficulty=diff)
                    .filter_by(reviewed=1)
                    .order_by(func.random())
                    .limit(difNum)))

  @jwt_required
  def post(self):
    try:
      data = request.get_json(force=True)
      questions = []
      for categoryData in data:
        difficulties = categoryData['difficulties']
        for i in range(len(difficulties)):
          randQuestion = self.getRandQuestion(categoryData['categoryID'], i+1, difficulties[i])
          if len(randQuestion):
            questions += randQuestion
    except Exception as e:
      log.warning(e)
      return {'message': 'Something went wrong!'}
    return questions

class CreateOnlineTest(Resource):
  @jwt_required
  def post(self):
    try:
      data = request.get_json(force=True)
      new_test = TestModel(
        test_writer_name=data['name'],
        start_date=data['start_date'],
        end_date=data['end_date'],
        time=data['time'],
        completed=0
      )
      new_test.flush_db()
      questionIDs=data['question_id']
      testid = new_test.id
      new_test.save_to_db()
      for q in questionIDs:
        new_testQuestion = Test_QuestionModel(
        test_id=testid,
        quest_id=q
        )
        new_testQuestion.save_to_db()
    except Exception as e:
      log.warning(e)
    return {'ok': 'ok'}

class ActiveTest(Resource):
  @jwt_required
  def get(self):
    try:
      now = datetime.now()
      dt_string = now.strftime("%Y-%m-%d %H:%M")
      return list(map(lambda x: x.json(), TestModel.query.filter(TestModel.completed == 0)
                      .filter(TestModel.start_date <= dt_string)
                      .filter(TestModel.end_date >= dt_string).all()))
    except Exception as e:
      log.warning(e)

class getTestbyID(Resource):
  @jwt_required
  def post(self):
    try:
      data = request.get_json(force=True)
      dataId = data['id']
      tests = Test_QuestionModel.query.filter_by(test_id=dataId).all()
      testRespSum = []
      for test in tests:
        answers = []
        for ans in test.question.answers:
          answers.append(ans.serialize_answers_without_correct())
        testResp = {
          'questionId': test.question.id,
          'description': test.question.description,
          'image': test.question.image,
          'answers': answers
        }
        testRespSum.append(testResp)
      return jsonify(testRespSum)
    except Exception as e:
      log.warning(e)
class sendtestResult(Resource):
  def getcorrectAnsArray(self, id):
    try:
      correctAnswers = AnswersModel.getCorrectAnswer(id)
      answers = []
      for ans in correctAnswers:
        answers.append(ans.answer)
      return answers
    except Exception as e:
      log.warning(e)

  @jwt_required
  def post(self):
    try:
      data = request.get_json(force=True)
      response = []
      questionCounter = 0
      point = 0
      for question in data['testdata']:
        correctAnswerArray = self.getcorrectAnsArray(question['question_id'])
        questionCounter += 1
        questionData = {
          'question_id': question['question_id'],
          'answers': correctAnswerArray
        }
        newCompletedTest = CompletedTestQuestionsModel(
          test_id=data['testid'],
          question_id= question['question_id'],
          answer=question['answer']
        )
        if question['answer'] in correctAnswerArray:
          point += 1
        response.append(questionData)
        newCompletedTest.save_to_db()
      newCompletedTest =  CompletedTestModel(
        test_writer_name=data['testwriter'],
        test_id=data['testid'],
        question_num=questionCounter,
        correct_answer_num=point,
        fill_time = data['date'])
      updateTestModel = TestModel.find_by_id(data['testid'])
      updateTestModel.completed=1
      updateTestModel.save_to_db()
      newCompletedTest.save_to_db()
      user = UserModel.find_by_name(data['testwriter'])
      if user:
        user.delete_db()
      return {'maxpoint': questionCounter,
              'userpoint': point,
              'correctAns': response}
    except Exception as e:
      log.warning(e)

class getTests(Resource):
  @jwt_required
  def get(self):
    try:
      return list(map(lambda x: x.json(), CompletedTestModel.query.order_by(CompletedTestModel
                                                                            .fill_time.desc()).all()))
    except Exception as e:
      log.warning(e)

class getTestFailedAndCompletedStatistic(Resource):
  @jwt_required
  def get(self):
    try:
        completed = 0
        failed = 0
        completed_tests = CompletedTestModel.query.all()
        if len(completed_tests) == 0:
            return {'completed': completed, 'failed': failed}, 200
        for test in completed_tests:
            if test.question_num != 0 :
                percent = test.correct_answer_num/test.question_num
                if percent >= 0.5:
                    completed += 1
                else:
                    failed += 1
        return {'completed': completed, 'failed': failed}, 200
    except Exception as e:
      log.warning(e)
      return {'message': 'Something went wrong!'}