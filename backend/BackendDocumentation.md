Table of Contents

- [First Time Setup: Running Locally](#first-time-setup-running-locally)
  - [IF Models/Databases/Migrations getting messed up](#if-modelsdatabasesmigrations-getting-messed-up)
- [Deployment Environment](#deployment-environment)
- [Packages used](#packages-used)

### First Time Setup: Running Locally

  - cd into backend/
  - pipenv for depenency management and virutalization locally
    - first need to tell pipenv to look for the .venv dir in this dir
    - run: `mkdir .venv`
    - run: `export PIPENV_VENV_IN_PROJECT="enabled"`
      - run: `pipenv install` on first run
      - run: `pipenv shell` on subsequent runs
  - with the venv activated
    - run: `python manage.py runserver` 
    - once it's running now run migrations and create super user
    - CTRL + C to shutdown the server
    - run: `python manage.py makemigrations`
    - run: `python manage.py migrate`
    - run: `python manage.py createsuperuser`
  - now you can start the server, open up the admin, and populate test data
    - run: `python manage.py runserver`
    - navigate to: `http://localhost:8000/admin/`
    - login, and you can now conduct admin operations.
      - for example, if you go to the sites table, you can set the site domain name which will then be automatically configured for stuff like authentication flow emails


#### IF Models/Databases/Migrations getting messed up

- sometimes when experimenting with data models the database/migrations can get messed up
- the quick fix with a non-production database is to just wipe the migrations and database and start over. SOMETIMES wiping migrations is enough
- Steps:
  - cd into backend
  - run: `rm */migrations/00*`
  - run: `rm db.sqlite3`
  - run: `python manage.py makemigrations`
  - run: `python manage.py migrate`
  - run: `python manage.py runserver`
- _note: this method will wipe your Site admin settings for emails using domain and and users or data._
  - run: `python manage.py createsuperuser`
  - Go into django admin 'localhost:8000/admin/' and change 'Sites' domain setting to frontend port for proper email link configurations if needed

### Deployment Environment

- run `pip freeze > requirements.txt` prior to hosting in production
- using PostgreSQL as server
- installing psycopg2 for using postgres in django:
  *note: you need to install pre-reqs system wide in order to build from source for use in production. explained here: https://stackoverflow.com/questions/5420789/how-to-install-psycopg2-with-pip-on-python*
  ```bash
  sudo apt install libpq-dev python3-dev
  pipenv install psycopg2
  ```

### Packages used

- Django LTS stable 3.2.x
- DRF LTS stable 3.12.x
-
