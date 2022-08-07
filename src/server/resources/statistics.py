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
            for x in range(3):
                '''new_Statistics1 = StatisticsModel(
                    name='kek',
                    value =  random.randint(0, 100),
                )
                new_Statistics2 = StatisticsModel(
                    name='piros',
                    value =  random.randint(0, 100),
                )
                new_Statistics3 = StatisticsModel(
                    name='zold',
                    value =  random.randint(0, 100),
                )
                new_Statistics1.save_to_db()
                new_Statistics2.save_to_db()
                new_Statistics3.save_to_db()''' 


            if (minDate is None):
                  statistics = (
                list(map(lambda x: x.to_dict(), StatisticsModel.query.all())))
            else:
                statistics =  list(map(lambda x: x.to_dict(), StatisticsModel.query.filter(StatisticsModel.date.between(minDate, maxDate))))

            return statistics

        except Exception as e:
            print(e)
