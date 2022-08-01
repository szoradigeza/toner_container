from flask_restful import Resource
from models.statistics import StatisticsModel
from flask import request
from flask_jwt_extended import (jwt_required)
from flask import jsonify


class GetStatistics(Resource):
    def get(self):
        try:
            statistics = (
                list(map(lambda x: x.to_dict(), StatisticsModel.query.all())))
            return statistics

        except Exception as e:
            print(e)
