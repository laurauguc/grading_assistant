# GradeMate

The Gemini-powered Grading assistant application, GradeMate, aids teachers in grading written work. Teachers can apply curated rubrics or upload their own.

## Architecture

The GradeMate is built using Javascript for the frontend and Python for the backend. Specifically, the frontend is a ReactJS App while the backend is a Django app, functioning as an API endpoint for the frontend. The calls to the Gemini API are made from the backend.

## Requirements

The required programming languages are Node.js and Python. Versions used: Python 3.12.3, node v22.3.0, npm 10.8.1.

For installation of Javascript and Python dependencies, see the setup instructions below.


## Set-Up Instructions

1. (Optional) Create and activate a virtual environment.

  1.A. Using the command line, install virtualenv:

  ```console
  pip install virtualenv
  ```
  Note: if using Homebrew to manage packages, the command is likely `brew install virtualenv`, instead.

  1.B. Create a virtual environment, by first navigating to the project folder and then running this command:

  ```console
  virtualenv venv
  ```

  This command creates a virtual environment called "venv" contained in the homonymous folder. By using the same name for the virtual environment, git will know to ignore it (since listed in the .gitignore file).

  1.C. Activate the virtual environment:

  ```console
  source venv/bin/activate
  ```

2. Create and store the GOOGLE_API_KEY.

  Obtain a Google API KEY here: https://aistudio.google.com/app/apikey


3. Prepare the _.env_ file

  Create a Django secret key by running the following command.

  ```console
  python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
  ```

  Create a .env file in the project directory. Run the following commands to add the GOOGLE_API_KEY, DJANGO_SECRET_KEY, DJANGO_DEBUG, and SECURITY_SETTINGS environment variables.

  ```console
  echo 'GOOGLE_API_KEY="<Insert-API-Key-here>"' >> .env
  echo 'DJANGO_SECRET_KEY="<Insert-Django-Key-here>"' >> .env
  echo 'DJANGO_DEBUG="True"' >> .env
  echo 'SECURITY_SETTINGS="False"' >> .env
  ```

4. Install the JavaScript dependencies.

First, ensure that npm is installed and up to date:

```console
npm install -g npm@latest
```

Then navigate to the frontend directory, within the project directory, and run:

```console
npm install
```

5. Install the Python dependencies.

   Ensure that the virtual environment is activated, then run:

   ```console
   pip install -e .
   ```

  6. Run the development servers.

    To start the backend server, run:

    ```console
    python manage.py runserver
    ```

    To start the frontend server, navigate to the frontend folder (within the project folder), and run:

    ```console
    npm start
    ```
    Note: Since the two development servers need to run a the same time, open each in a separate Terminal window.

7. Open your web browser and navigate to: http://localhost:3000/


## Instructions for modifying the _db.sqlite3_ database

The recommended way to modify the database is through the admin site. Make sure that the backend server is running, and then, from a browser, navigate to the admin site: http://localhost:8000/admin. The admin site allows both viewing and modifying the data. It also allows managing users and user group authentication and authorization. Superuser credentials have been shared on Slack.

It is also possible to view and modify the _db.sqlite3_ database with a database browsing app, such as DB Browser for SQLite (downloadable here: https://sqlitebrowser.org/). However, using the admin site is recommended.







7. Load grading rubric data.

   Run the provided Python script to load the grading rubric data from the _external_data_ folder into this database. It will also move the grading rubrics to a specified folder.

   Note: As of release 0.0.1, the _load_grading_rubric_data_ module assumes a specific location for the _external_data_ folder. For future versions, we should pass the location as an argument to the command.






## Managing data

The data can be loaded and changed in a few different ways. Note: if changes are made to the field names, the data model in _backend/models.py_ need to be updated accordingly.

### Instructions for loading external data for the first time.

The project on this GitHub repository already contains loaded data. So, this step is only needed if wanting to load data from scratch. In this scenario, the _db.sqlite3_ database would first need to be deleted.


```console
python manage.py migrate
python manage.py load_grading_rubric_data
````

These commands create the _db.sqlite3_ database and load the data contained in the _external_data_ folder into this database. It will also move the grading rubrics to a specified folder.

Note: As of the release 0.0.1, the _load_grading_rubric_data_ module assumes a specific location for the _external_data_ folder. For future version, we should pass the location as an argument to the command.

### Instructions for modifying the _db.sqlite3_ database

The recommended way to modify the database is through the admin site. Make sure that the backend server is running, and then, from a browser, navigate to the admin site: http://127.0.0.1:8000/admin. The admin site allows both viewing and modifying the data. It also allows managing users and user groups authentication and authorization. Superuser credentials have been shared on Slack.

It is also possible to view and modify the _db.sqlite3_ database with a database browsing App, such as DB Browser for SQLite (downloadable here: https://sqlitebrowser.org/). However, I recommend using the admin site instead.

## Instructions to prepare for deployment

Before running the code on a live website, use the .env file on the host server to turn on the security settings and turn off the Django debug mode.

_.env_ file:
```txt
DJANGO_DEBUG="False"
SECURITY_SETTINGS="True"
```

## Deployment instructions

Instead of installing Node.js on the App's hosting server, it is possible to use the static files generated from running `npm run build` locally. Since running the build locally does not allow accessing environment variables from the host server, we added a _frontend/src/config.json_ file to store the URL of the host server. This is needed by the frontend to make API requests to the backend.

The script _prepare_static_for_hosting.py_ automates the steps to obtain and collect required static files, including obtain the host base URL, running the React build, and collecting static files. If hosting on a different site, the URLs specified in the script for the development and production sites need to be updated accordingly.
