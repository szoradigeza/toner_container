# from flask import Flask
# from flask_restful import Api
# from resources.user import *
# from flask_cors import CORS
# from flask_jwt_extended import JWTManager
# from resources.question import *
# from sqlalchemy.orm import scoped_session, sessionmaker
# import pymysql
# from resources.test import *
# from models.user import RevokedTokenModel
# from flask_socketio import SocketIO, emit
# from resources.completed_test_question import CompletedTestQuestionByID
# from db import db
# from scheduler import scheduler
# from flask_apscheduler import APScheduler
# import logging
# pymysql.install_as_MySQLdb()

# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret!'
# CORS(app)
# # initialize scheduler
# scheduler.init_app(app)
# scheduler.start()


# app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
# jwt = JWTManager(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://adminuser:kuplung@localhost:3306/production'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['PROPAGATE_EXCEPTIONS'] = True
# app.config['JWT_BLACKLIST_ENABLED'] = True
# app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
# app.config['SQLALCHEMY_POOL_SIZE'] = 1
# app.config['SQLALCHEMY_MAX_OVERFLOW'] = 2
# app.config['SQLALCHEMY_POOL_TIMEOUT'] = 30
# app.config['UPLOAD_FOLDER'] = "/image/"
# app.config['JSON_AS_ASCII'] = False
# app.config['SCHEDULER_API_ENABLED'] = True


# api = Api(app, catch_all_404s=True)
# socketio = SocketIO(app, manage_session=False, cors_allowed_origins='*')
# db_session = scoped_session(sessionmaker(autocommit=False,
#                                          autoflush=False,
#                                          bind=db))

# logFormatStr = '[%(asctime)s] p%(process)s {%(pathname)s:%(lineno)d} %(levelname)s - %(message)s'
# logging.basicConfig(format=logFormatStr, filename="global.log", level=logging.DEBUG)
# formatter = logging.Formatter(logFormatStr, '%m-%d %H:%M:%S')
# streamHandler = logging.StreamHandler()
# streamHandler.setLevel(logging.DEBUG)
# streamHandler.setFormatter(formatter)
# app.logger.addHandler(streamHandler)
# app.logger.info("Logging is set up.")

# @app.teardown_appcontext
# def shutdown_session(exception=None):
#   db.session.remove()

# @socketio.on('message')
# def handle_message(message):
#     emit('message', message, broadcast=True)


# @jwt.token_in_blacklist_loader
# def check_if_token_in_blacklist(decrypted_token):
#     jti = decrypted_token['jti']
#     return RevokedTokenModel.is_jti_blacklisted(jti)

# #Users
# api.add_resource(UserRegistration, '/users/addnewuser')
# api.add_resource(UserLogin, '/login')
# api.add_resource(UserLogoutAccess, '/logout/access')
# api.add_resource(AllUsers, '/users/getusers')
# api.add_resource(UserLogoutRefresh, '/logout/refresh')
# api.add_resource(setNewPassword, '/users/setnewpassword')
# api.add_resource(adminChangePassword, '/users/changepassword')
# api.add_resource(getRights, '/users/getrights')
# api.add_resource(deleteUser, '/users/deleteuser')
# api.add_resource(getNamebyUserName, '/users/getnamebyusername')

# #question
# api.add_resource(diffByNum, '/question/difbynum')
# api.add_resource(TestGeneration, '/question/testgen')
# api.add_resource(editQuestion, '/question/editquestion')
# api.add_resource(getQuestionCategories, '/question/questioncategories')
# api.add_resource(addQuestion, '/question/addquestion')
# api.add_resource(getAllQuestion, '/question/getquestions')
# api.add_resource(createNewQuestionCategory, '/question/newcategory')
# api.add_resource(addQuestionImage, '/question/image-upload')
# api.add_resource(getQuestionImage, '/question/image/<filename>')
# api.add_resource(postSimilarQuestion, '/question/check-similar')
# api.add_resource(deleteQuestion, '/question/delete-question')
# api.add_resource(sortbyCategoryAscQuestion, '/question/sortbycategoryasc')
# api.add_resource(reviewedQuestion, '/question/reviewed')
# api.add_resource(unreviewedQuestion, '/question/unreviewed')
# #Test
# api.add_resource(CreateOnlineTest, '/test/createtest')
# api.add_resource(ActiveTest, '/test/getactivetest')
# api.add_resource(getTestbyID, '/test/testbyid')
# api.add_resource(sendtestResult, '/test/testresult')
# api.add_resource(getTests, '/test/alltest')
# api.add_resource(CompletedTestQuestionByID, '/test/completedtestbyid')
# api.add_resource(getTestFailedAndCompletedStatistic, '/test/completedstatistic')


# if __name__ == '__main__':
#   with app.app_context():
#     db.init_app(app)
#     socketio.run(app, host='0.0.0.0', port=5000, debug=True)


from flask import Flask
from resources.user import *
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager
from db import db
import pymysql
pymysql.install_as_MySQLdb()


app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)

api = Api(app, catch_all_404s=True)


@app.before_first_request
def create_database():
    db.create_all()


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://db_felhasznalo:password@localhost:6033/toner'

db.init_app(app)


api.add_resource(UserRegistration, '/users/addnewuser')
api.add_resource(UserLogin, '/login')
api.add_resource(CurrentUser, '/current/user')


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000)
