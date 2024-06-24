# Descriptions
Gemini-powered Grading Assistant aids teachers in grading written work. Teachers can apply pre-designed rubrics or upload their own.

# Architecture

The Grading Assistant is built using Javascript for the frontend and Python for the backend. Specifically, the frontend is a ReactJS App while the backend is a Django App, functioning as an api endpoint. The calls to the Gemini API are made from the backend.

# Requirements

Requirements: Node.js, Python.

Fr installation of Javascript and Python depedencies, see set-up instructions below, or see the package.json and requirements.text files for respectively.

Versions: Python 3.12.3, node v22.3.0, npm 10.8.1.

# Set-Up

1. (Optional): Create and activate a virtual environment. From the command line:

  * Install virtualenv (if not already installed): pip install virtualenv

  * Create a virtual env: virtualenv venv

  * Activate the virtual environment: source venv/bin/activate

2. Create a .env file to store the GOOGLE_API_KEY.

  * Obtain a Google API KEY here: https://aistudio.google.com/app/apikey

  * Create a .env file in the project root directory. From the terminal: touch .env

  * Add the API key to the .env file: GOOGLE_API_KEY="<Insert-API-Key-here"

3. Check that node, npm, and python are installed by running (on terminal):

    node -v
    npm -v
    python3 -V

4. Install depedencies:

  * To install python depedencies from project folder: pip install -e (or: pip install -r requirements.txt). Note: packages listed in requirements.txt.

  * To install Javascript depedencies run from project folder: npm install. Note: depedencies listed in package.json.

5. Run the project: Need to open 2 terminal windows to start the Django and React development servers.

* To start the Django development server, navigate to the project folder and run: python manage.py runserver

* To start the React development server, navigate to the React app folder (grading_assistant/frontend) and run: npm start.

6. Open your web browser and navigate to http://localhost:3000/

# Managing data

The data can be loaded and changed in a few different ways. Note: if changes are made to the field names, the data model in backend/models.py and the admin settings in backend/admin.py need to be updated accordingly.

1. To load external data to the db.sqlite3 database for the first time, run from command line:

* python manage.py migrate

* python manage.py load_grading_rubric_data (Note: right now the script assumes a specific location for the external_data; it would be better to pass the location as an argument (for later))

These commands will create the db.sqlite3 database and load the data into it. It will also move the grading rubrics to the rubrics folder and create a new name matching the file-path specified in the database.

Since the project in the GitHub repo already contains loaded data, first the db.sqlite3 database and the rubrics folder would need to be deleted.

2. Modifying the db.sqlite3. You can view and modify the the db.sqlite3 database by using an App such as DB Browser for SQLite, downloadable here: https://sqlitebrowser.org/

3. Through the admin site: http://127.0.0.1:8000/admin (after launching the Django server). Superuser credentials shared on Slack.
