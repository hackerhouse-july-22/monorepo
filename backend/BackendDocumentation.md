Table of Contents

- [Local Environment](#local-environment)
  - [IF Models/Databases/Migrations getting messed up](#if-modelsdatabasesmigrations-getting-messed-up)
- [Deployment Environment](#deployment-environment)
- [Packages used](#packages-used)

### Local Environment
  - pipenv for depenency management and virutalization locally
    - to start virtualenvironment:
      - run: `pipenv shell`
      - run: `pipenv install` on first run
  - sqlite3 server for test data

#### IF Models/Databases/Migrations getting messed up
  - sometimes when experimenting with data models the database/migrations can get messed up
  - the quick fix with a non-production database is to just wipe the migrations and database and start over
  - Steps:
    - cd into backend
    - run: `rm */migrations/00*`
    - run: `rm db.sqlite3`
    - run: `python manage.py makemigrations`
    - run: `python manage.py migrate`
    - run: `python manage.py runserver`
  - *note: this method will wipe your Site admin settings for emails using domain and and users or data.*
    - run: `python manage.py createsuperuser`
    - Go into django admin 'localhost:8000/admin/' and change 'Sites' domain setting to frontend port for proper email link configurations if needed 

### Deployment Environment
  - run `pip freeze > requirements.txt` prior to hosting in production
  - using PostgreSQL as server

### Packages used
  - Django LTS stable 3.2.x
  - DRF LTS stable 3.12.x
  - 