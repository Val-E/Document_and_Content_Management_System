"""Implementation of the API"""

from flask_restx import Api
from flask import Blueprint, jsonify, wrappers
from werkzeug.exceptions import HTTPException

from .. import settings


# Initialization of the API object
api: Api = Api(
    version=settings.API_VERSION,
    title=settings.API_TITLE,
    description=settings.API_DESC
)

api_blueprint: Blueprint = Blueprint('api', __name__, url_prefix='/api')


@api.errorhandler(HTTPException)
def default_error_handler(e) -> dict:
    """Default API Error Handler

    :param e: Error message, error code etc.
    :return: Return a Response with error message.
    """

    return {'msg': str(e)}
