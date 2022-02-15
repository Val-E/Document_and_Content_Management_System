"""Implementation of the API-Endpoints required to manipulate datasets and its entries values. """

from flask import request, jsonify, wrappers
from flask_login import current_user
from flask_restx import Resource

from werkzeug.security import check_password_hash

from ....database.models import Group, User
from ....database.operations.get_operations import get_datasets
from ....database.operations.edit_data import push_new_data, delete_data, delete_dataset, delete_class

from ...webapp_api import api

from ..dashboard_api_parser import \
    verify_keys as verify_keys_parser, \
    edit_class_values as edit_class_values_parser, \
    delete_data as delete_data_parser


namespace = api.namespace(
    'manipulate-entries',
    description='API for editing values and deleting data.'
)


@namespace.route('/get-datasets')
class GetDatasetsEndpoint(Resource):
    """Implementation of the Endpoint used to access datasets. """

    # Parser for key verification can be used here as well.
    @api.expect(verify_keys_parser)
    def post(self) -> wrappers.Response:
        """Get datasets the current user is allowed to view and manipulate.

        :return datasets in a dictionary
        """

        # get user inputs
        args = verify_keys_parser.parse_args(request)
        user_password: str = args.get('user_password')

        if current_user.is_authenticated:
            if check_password_hash(current_user.password, user_password):
                datasets: dict = get_datasets(current_user.id, user_password)
                return jsonify({'class_groups': datasets})
            else:
                return jsonify({'msg': 'Wrong User Password', 'category': 'danger'})
        else:
            # if user do not uses session
            group_name: str = str(args.get('group_name')).strip()
            username: str = str(args.get('username')).strip()

            # validate user input
            group: Group = Group.query.filter(Group.group_name == group_name).first()
            if group:
                user: User = User.query.filter_by(User.username == username).filter(Group.group == group.id).first()
                if user:
                    if check_password_hash(user.password, user_password):
                        datasets: dict = get_datasets(current_user.id, user_password)
                        return jsonify({'class_groups': datasets})
                    else:
                        return jsonify({'msg': 'Wrong User Password', 'category': 'danger'})
                else:
                    return jsonify({'msg': 'Wrong Username', 'category': 'danger'})
            else:
                return jsonify({'msg': 'Group not found!', 'category': 'danger'})


@namespace.route('/push-data')
class PushDataEndpoint(Resource):
    """Implementation of the Endpoint used to edit record of the datasets. """

    @api.expect(edit_class_values_parser)
    def post(self) -> wrappers.Response:
        """Change values of datasets entries.

        :return status message
        """

        # get user inputs
        args = edit_class_values_parser.parse_args(request)
        user_password: str = args.get('user_password')
        data_id: int = args.get('data_id')
        new_data: str = str(args.get('new_data')).strip()

        if current_user.is_authenticated:
            if check_password_hash(current_user.password, user_password):
                message = push_new_data(data_id, current_user.id, user_password, new_data)
                return jsonify(message)
            else:
                return jsonify({'msg': 'Wrong User Password', 'category': 'danger'})
        else:
            # if user do not uses session
            group_name: str = str(args.get('group_name')).strip()
            username: str = str(args.get('username')).strip()

            # validate user input
            group: Group = Group.query.filter(Group.group_name == group_name).first()
            if group:
                user: User = User.query.filter_by(User.username == username).filter(Group.group == group.id).first()
                if user:
                    if check_password_hash(user.password, user_password):
                        message = push_new_data(data_id, user.id, user_password, new_data)
                        return jsonify(message)
                    else:
                        return jsonify({'msg': 'Wrong User Password', 'category': 'danger'})
                else:
                    return jsonify({'msg': 'Wrong Username', 'category': 'danger'})
            else:
                return jsonify({'msg': 'Group not found!', 'category': 'danger'})


@namespace.route('/delete-data')
class DeleteData(Resource):
    """Implementation of the API-Endpoints required to delete data, datasets and classes. """

    @api.expect(delete_data_parser)
    def post(self) -> wrappers.Response:
        """Delete purge data from Database.

        Implementation of the Endpoint used to delete unneeded data, datasets and classes.

        :return status message
        """

        # get user inputs
        args = delete_data_parser.parse_args(request)
        data_id: int = args.get('data_id')
        dataset_id: int = args.get('dataset_id')
        class_id: int = args.get('class_id')

        if current_user.is_authenticated:
            if data_id:
                delete_data(data_id, current_user.id)
            if dataset_id:
                delete_dataset(dataset_id, current_user.id)
            if class_id:
                delete_class(class_id, current_user.id)

            return jsonify({'msg': 'Removing Routine finished.', 'category': 'success'})
        else:
            # get user inputs
            group_name: str = args.get('group_name')
            username: str = args.get('username')
            user_password: str = args.get('user_password')

            # validate user input
            group: Group = Group.query.filter(Group.group_name == group_name).first()
            if group:
                user: User = User.query.filter_by(User.username == username).filter(Group.group == group.id).first()
                if user:
                    if check_password_hash(user.password, user_password):
                        if data_id:
                            delete_data(data_id, current_user.id)
                        if dataset_id:
                            delete_dataset(dataset_id, current_user.id)
                        if class_id:
                            delete_class(class_id, current_user.id)

                        return jsonify({'msg': 'Removing Routine finished.', 'category': 'success'})
                    else:
                        return jsonify({'msg': 'Wrong User Password', 'category': 'danger'})
                else:
                    return jsonify({'msg': 'Wrong Username', 'category': 'danger'})
            else:
                return jsonify({'msg': 'Group not found!', 'category': 'danger'})
