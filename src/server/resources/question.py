from __future__ import division
from flask_restful import Resource
from models.question import QuestionModel
from models.answers import AnswersModel
from flask import request
from flask_jwt_extended import (jwt_required)
from models.question_category import QuestionCategoryModel
import os.path
from werkzeug.utils import secure_filename
from flask import send_file

import logging

log = logging.getLogger('tester.sub')


class Question(Resource):
  @jwt_required
  def get(self, questionName):
    try:
      question = QuestionModel.find_by_name(questionName)
      if question:
        return question.json()
      return {'message': 'Item not found'}, 404
    except Exception as e:
      log.warning(e)


class getAllQuestion(Resource):
  @jwt_required
  def get(self):
    try:
      return list(map(lambda x: x.serialize_QuestionModel(), QuestionModel.query.all()))
    except Exception as e:
      log.warning(e)


class addQuestion(Resource):
  @jwt_required
  def post(self):
    try:
      data = request.get_json(force=True)
      counter = 0
      correctAnswerNum = (data['correctAnswerNum'])
      correctAnswerNum = list(map(int, correctAnswerNum))
      new_question = QuestionModel(
        name=data['name'],
        description=data['description'],
        difficulty=data['difficulty'],
        category_id=data['category_id'],
        image=data['image']
      )
      new_question.flush_db()
      questionId = new_question.id
      new_question.save_to_db()
      answers = data['answers']
      for answer in answers:
        if counter in correctAnswerNum:
          new_answer = AnswersModel(
            question_id=questionId,
            answer=answer,
            correct='1'
          )
        else:
          new_answer = AnswersModel(
            question_id=questionId,
            answer=answer,
            correct='0'
          )
        new_answer.save_to_db()
        counter += 1
      return {'response': 'Succesfull'}, 200
    except Exception as e:
      log.warning(e)
      return {'response': 'Invalid data'}, 400


class editQuestion(Resource):
  @jwt_required
  def post(self):
    try:
      data = request.get_json(force=True)
      question_id = data['question_id']
      edited_question = data['question']
      edited_answers = edited_question['answers']
      question = QuestionModel.query.filter_by(id=question_id).first()
      question.name = edited_question['name']
      question.description = edited_question['description']
      question.difficulty = edited_question['difficulty']
      question.category_id = edited_question['category_id']
      question.reviewed = edited_question['reviewed']
      self.updateAnswers(edited_answers, edited_question, question_id)
      question.save_to_db()
      return {'response': 'Succesfull'}, 200
    except Exception as e:
      log.warning(e)

  def updateAnswers(self, edited_answers, edited_question, question_id):
    try:
      answers = AnswersModel.query.filter_by(question_id=question_id).all()
      if len(edited_answers) > len(answers):
        for i, editedAnswer in enumerate(edited_answers, start=0):
          if i > len(answers) - 1:
            if i in edited_question['correctAnswerNum']:
              new_answer = AnswersModel(
                question_id=question_id,
                answer=editedAnswer['answer'],
                correct='1'
              )
              new_answer.save_to_db()
            else:
              new_answer = AnswersModel(
                question_id=question_id,
                answer=editedAnswer['answer'],
                correct='0'
              )
              new_answer.save_to_db()
          else:
            answers[i].answer = editedAnswer['answer']
            if i in edited_question['correctAnswerNum']:
              answers[i].correct = 1
            else:
              answers[i].correct = 0
      else:
        if len(edited_answers) == len(answers):
          for i, editedAnswer in enumerate(edited_answers, start=0):
            answers[i].answer = editedAnswer['answer']
            if i in edited_question['correctAnswerNum']:
              answers[i].correct = 1
            else:
              answers[i].correct = 0
        else:
          row_counter = len(answers)
          while row_counter != len(edited_answers):
            AnswersModel.deletebyID(answers[row_counter - 1].id)
            row_counter -= 1
          answers = AnswersModel.query.filter_by(question_id=question_id).all()
          for i, editedAnswer in enumerate(edited_answers, start=0):
            answers[i].answer = editedAnswer['answer']
            if i in edited_question['correctAnswerNum']:
              answers[i].correct = 1
            else:
              answers[i].correct = 0
      for answer in answers:
        answer.save_to_db()
    except Exception as e:
      log.warning(e)


class diffByNum(Resource):
  @jwt_required
  def post(self):
    try:
      data = request.get_json(force=True)['categoryIDs']
      data.sort()
      numberArray = []
      resp = []
      for id in data:
        for diff in range(1, 6):
          number = QuestionModel.difficultyByNumber(diff, id)
          numberArray.append(number)
        categoryName = QuestionCategoryModel.query.filter_by(id=id).first().name
        resp.append({
          'category_id': id,
          'category_name': categoryName,
          'numberOfQuestion': numberArray
        })
        numberArray = []
      return (resp)
    except Exception as e:
      log.warning(e)


class getQuestionCategories(Resource):
  @jwt_required
  def get(self):
    return list(map(lambda x: x.json(), QuestionCategoryModel.query.all()))


class createNewQuestionCategory(Resource):
  @jwt_required
  def post(self):
    categoryname = request.get_json(force=True)['categoryname']
    existname = QuestionCategoryModel.query.filter_by(name=categoryname).first()
    if existname is not None:
      return {'message': 'exist'}, 200
    else:
      newCategory = QuestionCategoryModel(name=categoryname)
      newCategory.flush_db()
      id = newCategory.id
      newCategory.save_to_db()
      return {'message': id}, 200


class addQuestionImage(Resource):
  @jwt_required
  def post(self):
    try:
      static_file = request.files['image']
      fileName = secure_filename(static_file.filename)
      if os.path.exists('image/' + fileName):
        i = 1
        splitName = fileName.split('.')
        fileName = splitName[0] + str(i) + '.' + splitName[1]
        while os.path.exists('image/' + fileName):
          fileName = splitName[0] + str(i) + '.' + splitName[1]
          i += 1
        static_file.save(os.path.join('Image', fileName))
      else:
        static_file.save(os.path.join('Image', fileName))
      return {'fileName': fileName}
    except Exception as e:
      log.warning(e)


class getQuestionImage(Resource):
  @jwt_required
  def get(self, filename):
    return send_file('Image/' + filename)


class postSimilarQuestion(Resource):
  @jwt_required
  def post(self):
    try:
      data = request.get_json(force=True)
      wordCounter = 0
      questionName = data['name']
      questionDescription = data['description']
      allQuestions = QuestionModel.query.all()
      newSplitedDescription = questionDescription.split()
      divedNewSplitedDescriptionLength = (len(newSplitedDescription) / 100) * 75
      similarQuestions = []
      for question in allQuestions:
        if question.name == questionName:
          similarQuestions.append(question)
        else:
          splitedDescription = question.description.split()
          for word in newSplitedDescription:
            if word in list(splitedDescription):
              wordCounter += 1
          if wordCounter > divedNewSplitedDescriptionLength:
            similarQuestions.append(question)
            wordCounter = 0
      return list(map(lambda x: x.serialize_QuestionModel(), similarQuestions))
    except Exception as e:
      log.warning(e)


class deleteQuestion(Resource):
  @jwt_required
  def post(self):
    try:
      data = request.get_json(force=True)
      question_id = data['question_id']
      QuestionModel.deletebyID(question_id)
      AnswersModel.deletebyQuestionID(question_id)
    except Exception as e:
      log.warning(e)


class sortbyCategoryAscQuestion(Resource):
  @jwt_required
  def get(self):
    try:
      questions = QuestionModel.query.order_by(QuestionModel.category_id.asc()).all()
      return list(map(lambda x: x.serialize_QuestionModel(), questions))
    except Exception as e:
      log.warning(e)


class sortbyCategoryDescQuestion(Resource):
  @jwt_required
  def get(self):
    try:
      questions = QuestionModel.query.order_by(QuestionModel.category_id.desc()).all()
      return list(map(lambda x: x.serialize_QuestionModel(), questions))
    except Exception as e:
      log.warning(e)


class reviewedQuestion(Resource):
  @jwt_required
  def get(self):
    try:
      questions = QuestionModel.query.filter_by(reviewed=1).all()
      return list(map(lambda x: x.serialize_QuestionModel(), questions))
    except Exception as e:
      log.warning(e)


class unreviewedQuestion(Resource):
  @jwt_required
  def get(self):
    try:
      questions = QuestionModel.query.filter_by(reviewed=None).all()
      return list(map(lambda x: x.serialize_QuestionModel(), questions))
    except Exception as e:
      log.warning(e)