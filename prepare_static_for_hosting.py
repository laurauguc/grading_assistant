import os
import json
import argparse
import subprocess
import sys

def prepare_project(site_type):
    """
    Prepares the Django and ReactJS project for deployment.

    Steps:
    1. Selects the appropriate backend server URL based on the site type (development or production).
    2. Overwrites the frontend config.json file with the selected server URL.
    3. Builds the frontend ReactJS project.
    4. Collects static files from the frontend and backend into the Django static folder.

    Parameters:
    site_type (str): The type of site for deployment, either 'dev_site' or 'prod_site'.
    """
    site_type_full_name = {"dev_site": "development site", "prod_site": "production site"}
    print(f"\nPreparing project for {site_type_full_name[site_type]}.\n")

    API_urls = {
        'dev_site': 'https://grademate.pythonanywhere.com/',
        'prod_site': 'https://www.grade-mate.app/'
    }

    # Step 1: select URL for API
    server_url = API_urls[site_type]
    print("Backend server URL selected:\n", server_url)

    # Step 2: overwrite config.json file
    config_dict = {"SERVER_URL": server_url}

    try:
        with open("frontend/src/config.json", "w") as outfile:
            json.dump(config_dict, outfile)
        print("\nConfig.json file overwritten with backend server URL.\n")
    except IOError as e:
        print(f"Error writing config.json: {e}")
        sys.exit(1)

    # Step 3: run build
    print("Starting frontend build.")
    try:
        bashCommand = "npm --prefix ./frontend run build"
        os.system(bashCommand)
        print("\nFrontend build folder generated.\n")
    except Exception as e:
        print(f"Error during npm build: {e}")
        sys.exit(1)

    # Step 4: collect static files
    print("\nCollecting static files from frontend and backend.\n")

    os.environ['DJANGO_SETTINGS_MODULE'] = 'grading_assistant.settings'
    os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "True"

    try:
        import django
        django.setup()
        from django.core.management import execute_from_command_line
        execute_from_command_line(['manage.py', 'collectstatic', '--noinput'])
        print("\nStatic folder ready.\n")
    except Exception as e:
        print(f"Error collecting static files: {e}")
        sys.exit(1)

    print("\nNow the project is ready for the live site. Next step: use git to push your changes.\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="""
    Prepare the project for going live on a development or production site.
    Due to disk limitations on the respective servers, this script avoids installing Node.js on the server by configuring the frontend locally,\
    obtaining the respective build files from the frontend, and combining them with the backend's static files.""")

    parser.add_argument("site_type", choices=['dev_site', 'prod_site'], default='dev_site', help="Type of site to prepare for deployment.")

    args = parser.parse_args()
    prepare_project(args.site_type)
