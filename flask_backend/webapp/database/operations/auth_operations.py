"""Functions used to create user and group accounts"""

from flask_login import login_user
from werkzeug.security import generate_password_hash

from ..models import Topic, User, Group
from ... import db


def add_group(group_name: str, group_password: str, topics: list) -> None:
    """Create a new entry for the group.

    :param group_name: Name of the group. The user will need the name to find the group.
    :param group_password: Password of the Group. The Password is required to access the group.
    :param topics: Topics of the Group will be used to categories entries for one datasets.
    """

    # create group object
    new_group: Group = Group(
        group_name=group_name,
        group_password=generate_password_hash(group_password, method='sha256')
    )

    # add group object to database
    db.session.add(new_group)
    db.session.flush()

    # create entries for topics and add them
    for topic in topics:
        new_topic: Topic = Topic(group=new_group.id, topic_name=str(topic).strip())
        db.session.add(new_topic)

    db.session.commit()


def add_user(username: str, user_password: str, group_id: int) -> None:
    """Create a new entry for the user and log user automatically in.

    :param username: Username of the student, which will be added.
    :param user_password: Password dedicated to the new account.
    :param group_id: Each user must be a member of a specific group.
    """

    # create user object
    new_user: User = User(
        username=username,
        password=generate_password_hash(user_password, method='sha256'),
        group=group_id
    )

    # create entry in database
    db.session.add(new_user)
    db.session.commit()

    # login user
    login_user(new_user, remember=True)
