from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
from models.user import UserModel, RevokedTokenModel
from models.user_rights import UserRightsModel
from flask import request
parser = reqparse.RequestParser()
parser.add_argument('username', help='This field cannot be blank', required=True)
parser.add_argument('password', help='This field cannot be blank', required=True)
from datetime import datetime
from dateutil.relativedelta import relativedelta
import logging
import sys
log = logging.getLogger('tester.sub')

class UserRegistration(Resource):
  def post(self):
    try:
      parser.add_argument('right', help='This field cannot be blank', required=True)
      data = request.get_json(force=True)
      if UserModel.find_by_username(data['username']):
        current_user = UserModel.query.filter_by(username=data['username']).first()
        current_user.set_new_password(data['password'])
        current_user.save_to_db()
        return {'message': 'User {} already exists'.format(data['username'])}
      new_user = UserModel(
        name=data['name'],
        username=data['username'],
        password_hash=UserModel.generate_hash(data['password']),
        rights=data['right'],
        created=datetime.today().strftime('%Y-%m-%d')
      )
      new_user.save_to_db()
      return {
        'message': 'User {} was created!'.format(data['username']),
      }
    except Exception as e:
      log.warning(e)
      return {'message:': 'Something went wrong{}'.format(e)}, 500


class UserLogin(Resource):
  def post(self):
    try:
      data = request.get_json(force=True)
      current_user = UserModel.find_by_username(data['username'])
      if not current_user:
        return {'message': 'Incorrect password or username!'},403

      if UserModel.verify_hash(data['password'], current_user.password_hash):
        token = {
          'username': data['username'],
          'role': UserRightsModel.getUserRight(current_user.rights)
        }
        expires = datetime.timedelta(days=365)
        access_token = create_access_token(identity=token, expires_delta=expires)
        return {
          'idToken': access_token
        }
      else:
        return {'message': 'Incorrect password or username!'},403
    except Exception as e:
      log.warning(e)


class UserLogoutAccess(Resource):
  @jwt_required
  def post(self):
    jti = get_raw_jwt()['jti']
    try:
      revoked_token = RevokedTokenModel(jti=jti)
      revoked_token.add()
      return {'message': 'Access token has been revoked'}
    except Exception as e:
      log.warning(e)
      return {'message': 'Something went wrong {}'.format(e)}, 500


class AllUsers(Resource):
  def get(self):
    try:
      return list(map(lambda x: x.return_username_and_role(), UserModel.query.all()))
    except Exception as e:
      log.warning(e)

class UserLogoutRefresh(Resource):
  @jwt_refresh_token_required
  def post(self):
    jti = get_raw_jwt()['jti']
    try:
      revoked_token = RevokedTokenModel(jti=jti)
      revoked_token.add()
      return {'message': 'Refresh token has been revoked'}
    except Exception as e:
      log.warning(e)
      return {'message': 'Something went wrong'}, 500



class setNewPassword(Resource):
  @jwt_required
  def post(self):
    try:
      data = request.get_json(force=True)
      old_password = data['old_password']
      new_password = data['new_password']
      current_user = UserModel.find_by_username(data['username'])
      if UserModel.verify_hash(old_password, current_user.password_hash):
        current_user.set_new_password(new_password)
        current_user.save_to_db()
        return {'message': 'complete'}, 200
      else:
        return {'message': 'Wrong password!'}, 200
    except Exception:
      return { 'message': 'Error' }, 404

class getRights(Resource):
  def get(self):
    return list(map(lambda x: x.json(), UserRightsModel.query.all()))


class adminChangePassword(Resource):
  @jwt_required
  def post(self):
    try:
        data = request.get_json(force=True)
        username = data['username']
        new_password = data['new_password']
        role_id = data['right_id']
        user = UserModel.find_by_username(username)
        if new_password:
            user.password_hash = UserModel.generate_hash(new_password)
        user.rights = role_id
        user.save_to_db()
        return {'message': 'User password and right changed!'}, 200
    except Exception as e:
        return {'message:' 'Something went wrong!'}

class deleteUser(Resource):
  @jwt_required
  def post(self):
    try:
        data = request.get_json(force=True)
        user = UserModel.find_by_username(data['username'])
        user.delete_db()
        return {'message': 'User has been deleted!'}, 200
    except Exception as e:
        return {'message:' 'Something went wrong!'}

class getNamebyUserName(Resource):
  def post(self):
    try:
      data = request.get_json(force=True)
      username = data['username']
      user = UserModel.find_by_username(username)
      return {'userName': user.name}, 200
    except Exception:
      return { 'message': 'Error' }, 404



def delete_user_in_every_month():
    time = datetime.today()
    time = time - relativedelta(months=+1)
    time = time.strftime('%Y-%m-%d')

    old_users = UserModel.get_older_users(time)
    for user in old_users:
        if "_" in user.username:
          print(str(user.username), file=sys.stderr)
          user.delete_db()
    print(str(time), file=sys.stderr)   