# Grading Assistant Application

The Gemini-powered Grading Assistant Application aids teachers in grading written work. Teachers can apply curated rubrics or upload their own.

## Architecture

The Grading Assistant is built using Javascript for the frontend and Python for the backend. Specifically, the frontend is a ReactJS App while the backend is a Django App, functioning as an api endpoint. The calls to the Gemini API are made from the backend.

## Requirements

The required programming languages are Node.js and Python. Versions: Python 3.12.3, node v22.3.0, npm 10.8.1.

For installation of Javascript and Python dependencies, see the set-up instructions below.

## Set-Up Instructions

1. (Optional) Create and activate a virtual environment.

  A. Using the command line, install virtualenv:

  ```console
  pip install virtualenv
  ```
  Note: if using Homebrew to manage packages, the command is likely `brew install virtualenv`, instead.

  B. Create a virtual environment, by first navigating to the project folder and then running this command:

  ```console
  virtualenv venv
  ```

  This command creates a virtual environment called "venv" contained in the homonymous folder. By using the same name for the virtual environment, git will know to ignore it (since listed in the .gitignore file).

  C. Activate the virtual environment:

  ```console
  source venv/bin/activate
  ```

2. Create and store the GOOGLE_API_KEY.

  A. Obtain a Google API KEY here: https://aistudio.google.com/app/apikey

  B. Add the API key to a new _.env_ file.

  Create a .env file in the project directory.

  ```console
  echo 'GOOGLE_API_KEY="<Insert-API-Key-here>"' >> .env
  ```

3. Check that node, npm, and python are installed:

  ```console
  node -v
  npm -v
  python3 -V
  ```

4. Install dependencies:

  A. To install the python dependencies, first navigate to the project folder, and then run the following command.

  ```console
  pip install -e .
  ```

  Note: this command installs the packages listed in the _grading_assistant.toml_ file.

  B. To install Javascript dependencies, first navigate to the _frontend_ folder (within project the folder):

  ```console
  cd ./frontend
  ```

  And then run the following command:

  ```console
  npm install
  ```

  Note: this command installs the packages listed in the _package.json_ file.

5. Run the project

  Two terminal windows are needed to start the Django development server and the React development server.

  A. To start the Django development server, navigate to the project folder and run:

  ```console
  python manage.py runserver
  ```
  B. To start the React development server, navigate to the React app folder (_grading_assistant/frontend_) and run:

  ```console
  npm start
  ````

6. Open your web browser and navigate to http://localhost:3000/

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

## Deploying Application


Production ready.

What the backend detects to adjust security settings.

What the frontend detects. Local of API server needs to be added to config file (location) (even if the same as frontend).
But can detect if running locally.


* Security settings applied and configured to be applied when running in production.

* In order to reduce disk space, it is possible to run the application on a server using only Python, avoiding the need to install Node.js. Following steps performed by script ...
