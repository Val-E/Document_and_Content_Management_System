""" Document and Content Management Software

A Python Webapp for administrating data and building documents.
"""

import logging

from flask import Flask, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from os import path

from . import settings


# initialize app and db objects
app = Flask(__name__)
db = SQLAlchemy()


# set logging settings
logging.basicConfig(
    filename=settings.LOG_FILE_PATH,
    level=settings.LOGGING_LEVEL,
    format=settings.LOG_FORMAT
)


# initialize app
def create_app() -> app:
    """ Configure and implement all Features.

    :return app: Return the fully initialized and configured up app.
    """

    # load app settings
    app.config['SECRET_KEY'] = settings.SECRET_KEY
    app.config['LANGUAGES'] = settings.SUPPORTED_LANGUAGES
    app.config['SWAGGER_UI_DOC_EXPANSION'] = settings.RESTPLUS_SWAGGER_EXPANSION
    app.config['RESTPLUS_VALIDATE'] = settings.RESTPLUS_VAL
    app.config['RESTPLUS_MASK_SWAGGER'] = settings.RESTPLUS_MASK_SWAGGER
    app.config['SQLALCHEMY_DATABASE_URI'] = settings.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = f'sqlite:///database/{settings.DB_NAME}'

    # routes for website
    from .website.views import views
    app.register_blueprint(views, url_prefix='/')

    # initialize api
    from .api.webapp_api import api, api_blueprint
    api.init_app(api_blueprint)
    app.register_blueprint(api_blueprint)

    # register authentication api namespaces
    from .api.auth.endpoints.auth_api import namespace as auth_namespace
    api.add_namespace(auth_namespace)

    # register dashboard api namespaces
    from .api.dashboard.endpoints.sign_up_data import namespace as sign_up_data_api_namespace
    api.add_namespace(sign_up_data_api_namespace)

    from .api.dashboard.endpoints.verify_keys import namespace as verify_keys_api_namespace
    api.add_namespace(verify_keys_api_namespace)

    from .api.dashboard.endpoints.edit_class_values import namespace as edit_class_values_api_namespace
    api.add_namespace(edit_class_values_api_namespace)

    from .api.dashboard.endpoints.download_data import namespace as download_data_api_namespace
    api.add_namespace(download_data_api_namespace)

    # register error handler
    from .website.err_handler import page_not_found
    app.register_error_handler(404, page_not_found)

    # initialize database, when not exists yet
    db.init_app(app)
    if not path.exists(f'website/database{settings.DB_NAME}'):
        db.create_all(app=app)

    # initialize login manager
    login_manager: LoginManager = LoginManager()

    # login route
    login_manager.login_view = 'views.auth'

    # redirect unauthorized requests to login page and flash message
    @login_manager.unauthorized_handler
    def unauthorized():
        flash('You must log in in order to access the dashboard!', category='warning')
        return redirect(url_for('views.auth'))

    login_manager.init_app(app)

    from .database.models import User

    @login_manager.user_loader
    def load_user(user_id: int) -> User:
        return User.query.get(int(user_id))

    return app
