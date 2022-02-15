"""Definition for the Authentication API-Endpoints. """

from flask_restx import reqparse


class_sign_up: reqparse.RequestParser = reqparse.RequestParser()
class_sign_up.add_argument('class_name', type=str, required=True, help='Class Name')
class_sign_up.add_argument(
    'datasets',
    type=dict,
    action='append',
    required=True,
    help='Globale Konfiguration: Access rights will be applied to every dataset!'
)
class_sign_up.add_argument('group_name', type=str, required=False, help='Group Name')
class_sign_up.add_argument('username', type=str, required=False, help='Username')
class_sign_up.add_argument('user_password', type=str, required=False, help='User password')

verify_keys: reqparse.RequestParser = reqparse.RequestParser()
verify_keys.add_argument('group_name', type=str, required=False, help='Group Name')
verify_keys.add_argument('username', type=str, required=False, help='Username')
verify_keys.add_argument('user_password', type=str, required=True, help='User Password')

edit_class_values: reqparse.RequestParser = reqparse.RequestParser()
edit_class_values.add_argument('data_id', type=int, required=True, help='ID of the data which should be updated')
edit_class_values.add_argument('new_data', type=str, required=True, help='Data which should be submitted to database')
edit_class_values.add_argument('user_password', type=str, required=True, help='User Password')
edit_class_values.add_argument('username', type=str, required=False, help='Username')
edit_class_values.add_argument('group_name', type=str, required=False, help='Group Name')

delete_data: reqparse.RequestParser = reqparse.RequestParser()
delete_data.add_argument('data_id', type=int, required=False, help='ID of the data which should be updated')
delete_data.add_argument('dataset_id', type=int, required=False, help='ID of the dataset which should be updated')
delete_data.add_argument('class_id', type=int, required=False, help='ID of the class which should be updated')
delete_data.add_argument('username', type=str, required=False, help='Username')
delete_data.add_argument('group_name', type=str, required=False, help='Group Name')
delete_data.add_argument('user_password', type=str, required=False, help='User Password')
