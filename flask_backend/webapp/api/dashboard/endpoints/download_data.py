"""Implementation of the API-Endpoints required to download datasets and its entries values. """

from flask import request, jsonify, wrappers, send_file
from flask_login import current_user
from flask_restx import Resource

from werkzeug.security import check_password_hash

from ....database.models import Group, User, Topic
from ....database.operations.get_operations import get_datasets
from ....database.operations.edit_data import push_new_data, delete_data, delete_dataset, delete_class

from ....file_operations.create_files import create_collection

from ...webapp_api import api

from ..dashboard_api_parser import \
    verify_keys as verify_keys_parser, \
    edit_class_values as edit_class_values_parser, \
    delete_data as delete_data_parser


namespace = api.namespace(
    'get-files',
    description='API for downloading data.'
)


@namespace.route('/download-datasets')
class DownloadDatasetsEndpoint(Resource):
    """Implementation of the Endpoint used to access datasets. """

    # Parser for key verification can be used here as well.
    @api.expect(verify_keys_parser)
    def post(self) -> wrappers.Response:
        """Download Datasets of the current user

        :return: Zipped csv files or error msg
        """

        # get user inputs
        args = verify_keys_parser.parse_args(request)
        user_password: str = args.get('user_password')

        if current_user.is_authenticated:
            if check_password_hash(current_user.password, user_password):
                path: str = create_collection(current_user.id, user_password)
                if isinstance(path, str):
                    return send_file(path_or_file=f'{path}.zip', as_attachment=True)
                else:
                    return jsonify(path)
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
                        pass

                    else:
                        return jsonify({'msg': 'Wrong User Password!', 'category': 'danger'})
                else:
                    return jsonify({'msg': 'Wrong Username!', 'category': 'danger'})
            else:
                return jsonify({'msg': 'Wronge Group Name!', 'category': 'danger'})


