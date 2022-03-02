"""Implementation of the API-Endpoints required to sign up new datasets and its keys etc. """

from flask import request, jsonify, wrappers
from flask_login import current_user, login_required
from flask_restx import Resource

from werkzeug.security import check_password_hash

from ....database.operations.add_data import add_datasets
from ....database.operations.get_operations import get_topic_user_lists, get_class_list
from ....database.models import Group, User, Class, Dataset
from .... import db

from ...webapp_api import api

from ...auth.auth_api_parser import login as login_parser
from ..dashboard_api_parser import class_sign_up as class_sign_up_parser

        # get user inputs
namespace = api.namespace(
    'sign-up-data/',
    description='API for creating classes and adding datasets to them.'
)


@namespace.route('/get-topic-user-lists')
class UserTopicListEndpoints(Resource):
    """Implementation of the Endpoint used
    to get list with the topics and users
    of the group of the current user.
    """
    @login_required
    def get(self) -> wrappers.Response:
        """Return a list with all topics and a list with all users of the group.

        :return a list with all usernames and a list with all topic names of the group
        """

        usernames, topic_names = get_topic_user_lists(current_user.group)
        return jsonify({'user_list': usernames, 'topic_list': topic_names})

    @api.expect(login_parser)
    def post(self) -> wrappers.Response:
        """Work the same way as the get methode,
        except it does not requires session cookies
        and perform instead over validations.
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
                    usernames, topic_names = get_topic_user_lists(user.group)
                    return jsonify({'user_list': usernames, 'topic_list': topic_names})
                else:
                    return jsonify({'msg': 'Wrong User Password', 'category': 'danger'})
            else:
                return jsonify({'msg': 'Wrong Username', 'category': 'danger'})
        else:
            return jsonify({'msg': 'Group not found!', 'category': 'danger'})


@namespace.route('/get-class-list')
class ClassListEndpoints(Resource):
    """Implementation of the Endpoint used to fetch class lists. """
    @login_required
    def get(self) -> wrappers.Response:
        """Return a list with all classes, which the user owns.

        :return A list with all classes belonging to the user.
        """

        class_names: list = get_class_list(current_user.id)
        return jsonify({'class_list': class_names})

    @api.expect(login_parser)
    def post(self) -> wrappers.Response:
        """Work the same way as the get method, except it does not require session cookies.

        :return A list with all classes belonging to the user.
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
                    class_names: list = get_class_list(user.id)
                    return jsonify({'class_list': class_names})
                else:
                    return jsonify({'msg': 'Wrong User Password', 'category': 'danger'})
            else:
                return jsonify({'msg': 'Wrong Username', 'category': 'danger'})
        else:
            return jsonify({'msg': 'Group not found!', 'category': 'danger'})


@namespace.route('/sign-up-class')
class SignUpClassEndpoint(Resource):
    """Implementation of the Endpoint used to sign up class. """
    @api.expect(class_sign_up_parser)
    def post(self) -> wrappers.Response:
        """Sign up class, datasets, data and keys belonging to the class.

        Check user inputs.
        Create entry for the class for the user.
        Create entries for the datasets belonging to the class.
        Create entries for data and the keys associated with that data.
        :return status message
        """

        # get user inputs
        args = class_sign_up_parser.parse_args(request)
        group_name: str = str(args.get('group_name')).strip()
        username: str = str(args.get('username')).strip()
        class_name: str = str(args.get('class_name')).strip()
        user_password: str = args.get('user_password')
        datasets: list = args.get('datasets')

        # validate user input
        if current_user.is_authenticated:
            _class: Class = db.session.query(Class, User, Group) \
                .join(Class) \
                .join(Group) \
                .filter(Class.class_name == class_name) \
                .filter(Group.id == current_user.id) \
                .first()
            if _class:
                return jsonify({'msg': 'There already exists a class with this name!', 'category': 'danger'})
            elif len(class_name) < 4:
                return jsonify({
                    'msg': 'The name of the class must have at least four characters!',
                    'category': 'danger'
                })
            elif len(datasets) > 501:
                return jsonify({
                    'msg': 'The maximum number of datasets is five hundred per class!',
                    'category': 'danger'
                })
            elif len(datasets[0].keys()) > 100:
                return jsonify({'msg': 'The maximum number of topics is one hundred per class.', 'category': 'danger'})
            else:
                # call function to add datasets and generate output
                status_message: dict = add_datasets(datasets, class_name, current_user)
                return jsonify(status_message)
        else:
            # validate user input for requests without session cookies
            group: Group = Group.query.filter(Group.group_name == group_name).first()
            if group:
                user: User = User.query.filter_by(User.username == username).filter(Group.group == group.id).first()
                if user:
                    if check_password_hash(user.password, user_password):
                        _class: Class = db.session.query(Class, User, Group) \
                            .join(Class) \
                            .join(Group) \
                            .filter(Class.class_name == class_name) \
                            .filter(Group.id == user.id) \
                            .first()
                        if _class:
                            return jsonify({
                                'msg': 'There already exists a class with this name!',
                                'category': 'danger'
                            })
                        elif len(class_name) < 4:
                            return jsonify({
                                'msg': 'The name of the class must have at least four characters!',
                                'category': 'danger'
                            })
                        elif len(datasets) > 501:
                            return jsonify({
                                'msg': 'The maximum number of datasets is five hundred per class!',
                                'category': 'danger'
                            })
                        elif len(datasets[0].keys()) > 100:
                            return jsonify(
                                {'msg': 'The maximum number of topics is one hundred per class.', 'category': 'danger'})
                        else:
                            # call function to add datasets and generate output
                            status_message: dict = add_datasets(datasets, _class, user)
                            return jsonify(status_message)
                    else:
                        return jsonify({'msg': 'Wrong User Password', 'category': 'danger'})
                else:
                    return jsonify({'msg': 'Wrong Username', 'category': 'danger'})
            else:
                return jsonify({'msg': 'Group not found!', 'category': 'danger'})


@namespace.route('/sign-up-datasets')
class SignUpDatasetsEndpoint(Resource):
    """Implementation of the Endpoint used to sign up datasets to existing class.

    Work the same way as the upper class, except extra validations.
    """
    @api.expect(class_sign_up_parser)
    def post(self) -> wrappers.Response:
        """Check whether all users and all listed topics exist and add based on them datasets to the database.

        The methode works the same way the '/sign-up-class' endpoint works.
        :return wrappers.Response: status message
        """

        # get user inputs
        args = class_sign_up_parser.parse_args(request)
        group_name: str = str(args.get('group_name')).strip()
        username: str = str(args.get('username')).strip()
        class_name: str = str(args.get('class_name')).strip()
        user_password: str = args.get('user_password')
        datasets: list = args.get('datasets')

        # validate user input
        if current_user.is_authenticated:
            _class: Class = Class.query \
                .filter(Class.class_name == class_name) \
                .filter(Class.owner == current_user.id) \
                .first()
            if _class:
                dataset_number: int = Dataset.query.filter(Dataset._class == _class.id).count()
                if dataset_number + len(datasets) > 501:
                    return jsonify({
                        'msg': 'The maximum number of datasets is five hundred per class!',
                        'category': 'danger'
                    })
                else:
                    status_message: dict = add_datasets(datasets, _class, current_user)
                    return jsonify(status_message)
            else:
                return jsonify({'msg': 'You do not own a class with such a name!', 'category': 'danger'})
        else:
            # validate user input
            group: Group = Group.query.filter(Group.group_name == group_name).first()
            if group:
                user: User = User.query.filter(User.username == username).filter(User.group == group.id).first()
                if user:
                    if check_password_hash(user.password, user_password):
                        # Check if class exists.
                        _class: Class = Class.query \
                            .filter(Class.class_name == class_name) \
                            .filter(Class.owner == user.id) \
                            .first()
                        if _class:
                            # Check if the sum of datasets is still below 500.
                            dataset_number: int = Dataset.query.filter(Dataset._class == _class.id).count()
                            if dataset_number + len(datasets) > 501:
                                return jsonify({
                                    'msg': 'The maximum number of datasets is five hundred per class!',
                                    'category': 'danger'
                                })
                            else:
                                status_message: dict = add_datasets(datasets, _class, user)
                                return jsonify(status_message)
                        else:
                            return jsonify({'msg': 'There is no class with this name!', 'category': 'danger'})
                    else:
                        return jsonify({'msg': 'Wrong User Password', 'category': 'danger'})
                else:
                    return jsonify({'msg': 'Wrong Username', 'category': 'danger'})
            else:
                return jsonify({'msg': 'Group not found!', 'category': 'danger'})
