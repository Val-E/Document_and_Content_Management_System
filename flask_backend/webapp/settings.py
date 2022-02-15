"""The following file provides all kinds of settings related to the webapp. """

import logging

from Crypto import Random

# Server settings
FLASK_SERVER_NAME: str = 'localhost:3000'
FLASK_SERVER_PORT: int = 3000
FLASK_DEBUG: bool = True  # TODO SET TO FALSE FOR DEPLOYMENT
FLASK_THREADED: bool = True

# Language settings
SUPPORTED_LANGUAGES: dict = {
    'de': 'Deutsch'
}

# Password Salt
# Random generates a salt everytime the server runs!
# Make sure you want this!
SALT = Random.new().read(16)
# Otherwise uncomment the following line and set user custom salt. The salt must have a length of 16 bytes!
# SALT: bytes = u''


# Logging Settings
LOG_FILE_PATH: str = 'webapp/logs/server_log.log'
LOGGING_LEVEL: int = logging.INFO
LOG_FORMAT: str = '[%(levelname)s]\t[%(asctime)s]\t%(message)s'

# API settings
RESTPLUS_SWAGGER_EXPANSION: str = 'list'
RESTPLUS_VAL: bool = True
RESTPLUS_MASK_SWAGGER: bool = False
API_VERSION: str = '0.1'
API_TITLE: str = 'Document and Content Management System'
API_DESC: str = 'The software was developed to store data and manage data for documents.'

# Configuration
SECRET_KEY: str = 'T36fB2Wp8fvkDXxkTUQLvK4X'

# Database settings
DB_NAME: str = 'database.db'
SQLALCHEMY_DATABASE_URI: str = f'sqlite:///database/{DB_NAME}'
SQLALCHEMY_TRACK_MODIFICATIONS: bool = False
