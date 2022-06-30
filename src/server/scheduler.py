import sys
from flask_apscheduler import APScheduler
from resources.user import delete_user_in_every_month

scheduler = APScheduler()
@scheduler.task('cron', id='do_job_3', week='*', day_of_week='sun')
def job1():
    with scheduler.app.app_context():
        delete_user_in_every_month()