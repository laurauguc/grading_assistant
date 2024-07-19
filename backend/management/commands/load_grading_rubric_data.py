from csv import DictReader
from datetime import datetime

from django.core.management import BaseCommand

from backend.models import GradingRubric
from pytz import UTC


from pathlib import Path # added
from django.core.files import File # added


DATETIME_FORMAT = '%Y-%m-%d %H:%M'

ALREDY_LOADED_ERROR_MESSAGE = """
If you need to reload the grading rubric data from the CSV file,
first delete the db.sqlite3 file to destroy the database.
Then, run `python manage.py migrate` for a new empty
database with tables"""


class Command(BaseCommand):
    # Show this when the user types help
    help = "Loads data from grading_rubric_data.csv into our GradingRubric mode"

    def handle(self, *args, **options):
        if GradingRubric.objects.exists():
            print(ALREDY_LOADED_ERROR_MESSAGE)
            return

        for row in DictReader(open('./external_data/rubrics_data_for_loading/grading_rubric_table.csv')):
            # grading rubrics in markdown loaded here based on name?
            # or??: folder with grading rubrics. each grading rubric file contains a JSON (??) with the info
            # parse that info here
            grading_rubric = GradingRubric()
            grading_rubric.name = row['Rubric Name']
            grading_rubric.class_name = row['Class Name']
            grading_rubric.level = row['Grade Level(s)']
            grading_rubric.country = row['Country']
            grading_rubric.language = row['Language']
            grading_rubric.description = row['Description']
            grading_rubric.notes = row['Additional Notes']
            grading_rubric.writing_type = row['Writing Type']
            raw_update_date = row['Last Update Date']
            update_date = UTC.localize(
                datetime.strptime(raw_update_date, DATETIME_FORMAT))
            grading_rubric.last_updated = update_date

            content_path = Path("./external_data/rubrics_data_for_loading/" + row['Rubric Name'] + '.md')
            with content_path.open(mode="r") as f:
                grading_rubric.content = File(f, name=content_path.name)
                grading_rubric.save()
            grading_rubric.save()
