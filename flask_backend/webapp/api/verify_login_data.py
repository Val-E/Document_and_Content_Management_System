"""Implementation of the login validator"""

from flask import jsonify, wrappers
from werkzeug.security import check_password_hash

from ..database.models import Group, User


def verify_login_data(func: any) -> any:
    """Verify Login Data

    Validate login data, and executes the given function, when the validation succeed.
    Most uses cases are operations, were the user cannot use session cookies.

    :param func: Method to execute, when verification succeed.
    :return: error message or whatever the methode should return
    """
    def wrapper(**kwargs):
        group: Group = Group.query.filter(Group.group_name == kwargs['group_name']).first()
        if group:
            user: User = User.query.filter_by(User.username == kwargs['username']).filter(Group.group == group.id).first()
            if user:
                if check_password_hash(user.password, kwargs['user_password']):
                    return func()
                else:
                    return jsonify({'msg': 'Wrong User Password', 'category': 'danger'})
            else:
                return jsonify({'msg': 'Wrong Username', 'category': 'danger'})
        else:
            return jsonify({'msg': 'Group not found!', 'category': 'danger'})

    return wrapper
