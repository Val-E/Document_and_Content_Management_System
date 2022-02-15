"""Implementation of the Authentication API-Endpoints. """

from flask import request, jsonify, escape, wrappers
from flask_login import login_user
from flask_restx import Resource
from werkzeug.security import check_password_hash

from ....database.operations.auth_operations import add_group, add_user
from ....database.models import Group, User

from ...webapp_api import api
from ..auth_api_parser import \
    group_sign_up as group_sign_up_parser, \
    sign_up as sign_up_parser, \
    login as login_parser


namespace: api.namespaces = api.namespace(
    'auth',
    description='Api for registration of groups and users.'
)


@namespace.route('/sign-up-group')
class SignUpSchoolEndpoint(Resource):
    """Implementation of the Endpoint used to sign up groups. """
    @api.expect(group_sign_up_parser)
    def post(self) -> wrappers.Response:
        """Check user input and add group, when values are valid.

        :return status message
        """

        # get values from user
        args = group_sign_up_parser.parse_args(request)
        group_name: str = str(args.get('group_name')).strip()
        group_password: str = args.get('group_password')
        topics: list = args.get('topics')

        # validate user input
        group: Group = Group.query.filter(Group.group_name == group_name).first()
        if group:
            return jsonify({'msg': 'There already exists a group with this name!', 'category': 'danger'})
        elif len(group_name) < 4:
            return jsonify({'msg': 'The name of the group must have at least four characters!', 'category': 'danger'})
        elif len(group_password) < 7:
            return jsonify({'msg': 'The password must have at least seven characters!', 'category': 'danger'})
        elif len(topics) > 100:
            return jsonify({'msg': 'The maximum number of topics is one hundred per group!', 'category': 'danger'})
        else:
            # create entry for group
            add_group(group_name, group_password, topics)
            return jsonify({'msg': 'The group has been registered!', 'category': 'success'})


@namespace.route('/sign-up')
class SignUpEndpoint(Resource):
    """Implementation of the Endpoint used to sign up users for one specific group. """
    @api.expect(sign_up_parser)
    def post(self) -> wrappers.Response:
        """Check user input and add user, when values are valid.

        :return status message
        """

        # get user inputs
        args = sign_up_parser.parse_args(request)
        group_name: str = str(args.get('group_name')).strip()
        group_password: str = args.get('group_password')
        username: str = str(args.get('username')).strip()
        user_password: str = args.get('user_password')

        # validate user input
        group: Group = Group.query.filter(Group.group_name == group_name).first()
        if group:
            if check_password_hash(group.group_password, group_password):
                if ';' in username:
                    return jsonify({'msg': 'Semicolons are not allowed in username!', 'category': 'danger'})
                else:
                    user = User.query.filter(User.username == username).filter(User.group == group.id).first()
                    if user:
                        return jsonify({
                            'msg': 'There already exists a user with this name!',
                            'category': 'danger'
                        })
                    elif len(username) < 4:
                        return jsonify({
                            'msg': 'The username must have at least four characters!',
                            'category': 'danger'
                        })
                    elif len(user_password) < 7:
                        return jsonify({
                            'msg': 'The password must have at least seven characters!',
                            'category': 'danger'
                        })
                    else:
                        add_user(username, user_password, group.id)
                        return jsonify({
                            'msg': 'Account was created and you were logged in automatically!',
                            'category': 'success'
                        })
            else:
                return jsonify({
                    'msg': 'Wrong Group Password!',
                    'category': 'danger'
                })
        else:
            return jsonify({
                'msg': 'Wrong Groupname!',
                'category': 'danger'
            })


@namespace.route('/login')
class LoginEndpoint(Resource):
    """Implementation of the Endpoint for logins. """
    @api.expect(login_parser)
    def post(self) -> wrappers.Response:
        """Check user input and login user, when values are valid.

        Login is implemented using flask_login .
        :return status message
        """

        # get user inputs
        args = login_parser.parse_args(request)
        group_name: str = str(args.get('group_name')).strip()
        username: str = str(args.get('username')).strip()
        user_password: str = args.get('user_password')

        # validate user input
        group: Group = Group.query.filter(Group.group_name == group_name).first()
        if group:
            user: User = User.query.filter(User.username == username).filter(User.group == group.id).first()
            if user:
                if check_password_hash(user.password, user_password):
                    # login user
                    login_user(user, remember=True)
                    return jsonify({'msg': 'You have been logged in!', 'category': 'success'})
                else:
                    return jsonify({'msg': 'Wrong User Password!', 'category': 'danger'})
            else:
                return jsonify({'msg': 'Wrong Username!', 'category': 'danger'})
        else:
            return jsonify({'msg': 'Wronge Group Name!', 'category': 'danger'})
