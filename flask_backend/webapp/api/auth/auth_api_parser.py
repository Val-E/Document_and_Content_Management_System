"""Definition for the Authentication API-Endpoints. """

from flask_restx import reqparse


group_sign_up: reqparse.RequestParser = reqparse.RequestParser()
group_sign_up.add_argument('group_name', type=str, required=True, help='Group Name')
group_sign_up.add_argument('group_password', type=str, required=True, help='Group Password')
group_sign_up.add_argument('topics', type=str, action='append', required=True, help='all topics of the group')


sign_up: reqparse.RequestParser = reqparse.RequestParser()
sign_up.add_argument('group_name', type=str, required=True, help='Group Name')
sign_up.add_argument('group_password', type=str, required=True, help='Group Password')
sign_up.add_argument('username', type=str, required=True, help='Username')
sign_up.add_argument('user_password', type=str, required=True, help='User Password')


login: reqparse.RequestParser = reqparse.RequestParser()
login.add_argument('group_name', type=str, required=True, help='Group Name')
login.add_argument('username', type=str, required=True, help='Username')
login.add_argument('user_password', type=str, required=True, help='User Password')
