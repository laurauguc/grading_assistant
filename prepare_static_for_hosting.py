import os
import json
import argparse

parser = argparse.ArgumentParser(description="""Prepare the project for going live on a development or production stie.\
Due to disk limitations on the respective servers, this script avoids installing node on the server by configuring the frontend locally,
obtaining the respective build files from the frontend, and adding them to the backend's static files.""")


parser.add_argument("site_type", choices=['dev_site', 'prod_site'], default ='dev_site')
args = parser.parse_args()

site_type = args.site_type

site_type_full_name = {"dev_site": "development site", "prod_site": "production site"}

print("\nPreparing project for {}.\n".format(site_type_full_name[site_type]) )

API_urls = {'dev_site': 'https://grademate.pythonanywhere.com/',
           'prod_site': 'https://grade-mate.app/' }

# step 1: select URL for API
server_url = API_urls[site_type]
print("Backend server URL selected: \n", server_url)

# step 2: overwrite config.json file
config_dict = {"SERVER_URL": server_url}

# Convert and write JSON object to file
with open("frontend/src/config.json", "w") as outfile:
    json.dump(config_dict, outfile)
print("\nConfig.json file overwritten with backend server URL.\n")

# step 3: run build
print("Start build.")
bashCommand = "npm --prefix ./frontend run build"
os.system(bashCommand)
print("\nFrontend build folder generated.\n")

# step 4: collectstatic
print("\nCollecting static files from frontend and backend.\n")

import sys
from django.core.management import execute_from_command_line

# Ensure the script is being executed in the Django project directory
os.environ['DJANGO_SETTINGS_MODULE'] = 'grading_assistant.settings'
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "True"

# Set up Django
import django
django.setup()

# Run the collectstatic command
execute_from_command_line(['manage.py', 'collectstatic', '--noinput'])

print("\nStatic folder ready.\n")

print("\nNow the project is ready for the live site. Next step: use git to push your changes.\n")
