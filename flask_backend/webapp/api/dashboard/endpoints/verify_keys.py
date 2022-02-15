"""Implementation of the Authentication API-Endpoints. """

from flask import request, jsonify, wrappers
from flask_login import current_user, login_required
from flask_restx import Resource
from werkzeug.security import check_password_hash

from ....database.operations.get_operations import get_assigned_data
from ....database.operations.key_operations import clear_unverified_keys, verify_keys
from ....database.models import Group, User
from ...webapp_api import api

from ...auth.auth_api_parser import login as login_parser
from ..dashboard_api_parser import verify_keys as verify_keys_parser


namespace = api.namespace(
    'verify-keys',
    description='API for verifying keys from data, which was assigned to you.'
)


@namespace.route('/clear-unverified-keys')
class ClearUnverifiedEndpoint(Resource):
    """Implementation of the Endpoint used to clear unverified keys. """
    @login_required
    def get(self) -> wrappers.Response:
        """Clear unverified keys of a user.

        :return success message
        """

        clear_unverified_keys(current_user.id)
        return jsonify({'msg': 'Clear routine finished!', 'category': "success"})

    @api.expect(login_parser)
    def post(self) -> wrappers.Response:
        """Work the same way as the get method, except it does not require session cookies.

        :return wrappers.Response: status message
        """

        # get user inputs
        args = login_parser.parse_args(request)
        group_name: str = str(args.get('group_name')).strip()
        username: str = str(args.get('username')).strip()
        user_password: str = args.get('user_password')

        # validate user input
        group: Group = Group.query.filter_by(group_name=group_name).first()
        if group:
            user: User = User.query.filter_by(username=username, group=group.id).first()
            if user:
                if check_password_hash(user.password, user_password):
                    clear_unverified_keys(user.id)
                    return jsonify({'msg': 'Clear routine finished!', 'category': "success"})
                else:
                    return jsonify({'msg': 'Wrong User Password!', 'category': 'danger'})
            else:
                return jsonify({'msg': 'Wrong Username!', 'category': 'danger'})
        else:
            return jsonify({'msg': 'Wronge Group Name!', 'category': 'danger'})


@namespace.route('/verify')
class VerifyKeysEndpoint(Resource):
    """Implementation of the Endpoint used to verify keys. """
    @api.expect(verify_keys_parser)
    def post(self) -> wrappers.Response:
        """Verify keys of the user.

        :return status message
        """

        # get user inputs
        args = verify_keys_parser.parse_args(request)
        user_password: str = args.get('user_password')

        if current_user.is_authenticated:
            if check_password_hash(current_user.password, user_password):
                verify_keys(current_user.id, user_password)
                return jsonify({'msg': 'Verification routine finished!', 'category': "success"})
            else:
                return jsonify({'msg': 'Wrong User Password!', 'category': 'danger'})
        else:
            # if user do not uses session
            group_name: str = str(args.get('group_name')).strip()
            username: str = str(args.get('username')).strip()

            # validate user input
            group: Group = Group.query.filter_by(group_name=group_name).first()
            if group:
                user: User = User.query.filter_by(username=username, group=group.id).first()
                if user:
                    if check_password_hash(user.password, user_password):
                        verify_keys(current_user.id, user_password)
                        return jsonify({'msg': 'Verification routine finished!', 'category': "success"})
                    else:
                        return jsonify({'msg': 'Wrong User Password!', 'category': 'danger'})
                else:
                    return jsonify({'msg': 'Wrong Username!', 'category': 'danger'})
            else:
                return jsonify({'msg': 'Wronge Group Name!', 'category': 'danger'})


@namespace.route('/get-assigned-data')
class GetAssignedDataEndpoint(Resource):
    """Implementation of the Endpoint used to get assigned information about assigned keys from assigned classes. """
    @login_required
    def get(self) -> wrappers.Response:
        """Return a list of the users, which need to verify your classes and a list of classes the user needs to verify.

        :return Dictionary with two lists
        """

        class_names, user_names = get_assigned_data(current_user.id)
        return jsonify({'classes': class_names, 'users': user_names})

    @api.expect(login_parser)
    def post(self) -> wrappers.Response:
        """ Work the same way as the get method, except it does not require session cookies

        :return Dictionary with two lists
        """

        args = login_parser.parse_args(request)
        group_name: str = str(args.get('group_name')).strip()
        username: str = str(args.get('username')).strip()
        user_password: str = args.get('user_password')

        # validate user input
        group: Group = Group.query.filter_by(group_name=group_name).first()
        if group:
            user: User = User.query.filter_by(username=username, group=group.id).first()
            if user:
                if check_password_hash(user.password, user_password):
                    class_names, user_names = get_assigned_data(current_user.id)
                    return jsonify({'classes': class_names, 'users': user_names})
                else:
                    return jsonify({'msg': 'Wrong User Password!', 'category': 'danger'})
            else:
                return jsonify({'msg': 'Wrong Username!', 'category': 'danger'})
        else:
            return jsonify({'msg': 'Wronge Group Name!', 'category': 'danger'})
