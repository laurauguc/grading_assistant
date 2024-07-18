# GradeMate

The Gemini-powered Grading assistant Application, GradeMate, aids teachers in grading written work. Teachers can apply curated rubrics or upload their own. The most recent version of this App is available at: https://wwww.grade-mate.app.

## Architecture

The GradeMate is built using Javascript for the frontend and Python for the backend. Specifically, the frontend is a ReactJS App while the backend is a Django App, functioning as an API endpoint for the frontend. The calls to the Gemini API are made from the backend.

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
  npm -v
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


## Additional Instructions

### Modifying the _db.sqlite3_ database

The recommended way to modify the database is through the admin site. Make sure that the backend server is running, and then, from a browser, navigate to the admin site: http://localhost:8000/admin. The admin site allows both viewing and modifying the data. It also allows managing users and user group authentication and authorization. Superuser credentials have been shared on Slack.

It is also possible to view and modify the _db.sqlite3_ database with a database browsing App, such as DB Browser for SQLite (downloadable here: https://sqlitebrowser.org/). However, using the admin site is recommended.

### Replacing the _db.sqlite3_ database with other external data

The developer can also replace the existing _db.sqlite3_ database with new data in the format expected by the _backend/management/commands/load_grading_rubric_data.py_ file.

To run this loading function, first deleted the _db.sqlite3_ database and then run the following command.

```console
python manage.py load_grading_rubric_data
```

Note: As of release 0.0.1, the _load_grading_rubric_data_ module assumes a specific location for the _rubrics_data_for_loading_ directory. For future versions, we should pass the location of this directory as an argument to the command.

### Preparing for deployment

Before running the code on a live website, use the .env file on the host server to turn on the security settings and turn off the Django debug mode.

_.env_ file:
```txt
DJANGO_DEBUG="False"
SECURITY_SETTINGS="True"
```

### Deployment

To avoid installing Node.js on the App's hosting server, it is possible to use the static files generated from running `npm run build` locally. Since running the build locally does not allow accessing environment variables from the host server, we added a _frontend/src/config.json_ file to store the URL of the host server. This is needed by the frontend to make API requests to the backend.

The script _prepare_static_for_hosting.py_ automates the steps to obtain and collect required static files, including obtain the host base URL, running the ReactJS build, and collecting Django static files. If hosting on a different site, the URLs specified in the script for the development and production sites need to be updated accordingly.

## Helpful Resources

We consulted the following tutorials and documentation to help us integrate ReactJS with Django framework and prepare to deploy on PythonAnywhere.

* The Perfect Match: How to Integrate ReactJS with Django Framework for Stunning Web Apps: https://medium.com/@devsumitg/how-to-connect-reactjs-django-framework-c5ba268cb8be

* Modern JavaScript for Django developers: https://www.saaspegasus.com/guides/modern-javascript-for-django-developers/

* Streaming LLM Output with Django, React, and LangChain: https://medium.com/@m.moshek/streaming-llm-output-with-django-react-and-langchain-tutorial-2963275b4f9c

* Deploying Django to production: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Deployment

* PythonAnywhere: Deploying an existing Django project on PythonAnywhere: https://help.pythonanywhere.com/pages/DeployExistingDjangoProject/

* PythonAnywhere: How to connect production React frontend with a Python backend: https://help.pythonanywhere.com/pages/React/
