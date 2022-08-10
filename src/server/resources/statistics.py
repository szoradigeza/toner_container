from flask_restful import Resource
from models.statistics import StatisticsModel
from flask import request
from flask_jwt_extended import (jwt_required)
from flask import jsonify
import random






class GetStatistics(Resource):
    def get(self):
        args = request.args
        args.to_dict()
        minDate = args.get('min')
        maxDate = args.get('max')
        try:               
            if (minDate is None):
                  statistics = (
                list(map(lambda x: x.to_dict(), StatisticsModel.query.all())))
            else:
                statistics =  list(map(lambda x: x.to_dict(), StatisticsModel.query.filter(StatisticsModel.date.between(minDate, maxDate))))

            return statistics

        except Exception as e:
            print(e)
