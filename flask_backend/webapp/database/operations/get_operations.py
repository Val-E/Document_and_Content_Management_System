"""Implementation of functions used to get data from database. """

from ..models import User, Class, Data, Key, Dataset, Topic
from ... import db

from ...cryptography.cryptography import decrypt, get_key_from_password


def get_topic_user_lists(group_id) -> tuple[list, list]:
    """ Get all user and topics of a group.

    :param group_id: Group ID of the group, which should be queried.
    :return JSON containing a list with all usernames and all topic name of the group the user belongs to.
    """

    user_list: list = User.query.filter(User.group == group_id).all()
    topic_list: list = Topic.query.filter(Topic.group == group_id).all()

    return [user.username for user in user_list], [topic.topic_name for topic in topic_list]


def get_class_list(user_id) -> list:
    """Get all classes of a group.

    :param user_id: ID of the user based on which database should be queried.
    :return list: a list with all classes belonging to the current user.
    """

    # search for classes of user
    class_list: list = Class.query.filter(Class.owner == user_id).all()
    return [_class.class_name for _class in class_list]


def get_assigned_data(user_id: int) -> tuple[list, list]:
    """Get Assignment Data

    Get a list of all user,
    which need to verify data from your
    classes and a list of classes, which contains unverified data from the user.
    :param user_id:
    :return a list with users and list with classes embedded into a tuple
    """

    # query through class with unverified keys
    assigned_keys: list = db.session.query(Data, Key, Dataset, Class) \
        .join(Key) \
        .join(Dataset) \
        .join(Class) \
        .filter(Key.user == user_id) \
        .filter(Key.encrypted == 0) \
        .group_by(Class) \
        .all()

    # query through users with unverified keys from users classes
    users: list = db.session.query(Data, Key, User) \
        .join(Data) \
        .join(User) \
        .join(Dataset) \
        .join(Class) \
        .filter(Class.owner == user_id) \
        .filter(Key.encrypted == 0) \
        .group_by(User) \
        .all()

    # return list names from list from queries
    return [assignment.Class.class_name for assignment in assigned_keys], [user.User.username for user in users]


def get_datasets(user_id: int, user_password: str) -> dict:
    """Get Datasets of the current user.

    Get the datasets which the current user is allow to administrate, sorted by class and organized using the topics.

    :param user_id: Id of the current user is required to query the database.
    :param user_password: Password of the current user is used to encrypt the data.
    :return dictionary with the containing the whole data
    """

    data_list = db.session.query(Key, Data, Dataset, Topic, Class) \
        .join(Key) \
        .join(Dataset) \
        .join(Topic) \
        .join(Class) \
        .filter(Key.user == user_id) \
        .filter(Key.encrypted == 1) \
        .order_by(Class.id) \
        .order_by(Dataset.id).all()

    if data_list:
        # create list a list to sort the order the datasets
        class_groups: dict = {}
        class_name: str = ''

        old_dataset_id: int = -1
        old_class_id: int = -1

        for data_tuple in data_list:
            # keep track of the ids to merge the lists correctly
            new_dataset_id: int = data_tuple.Dataset.id
            new_class_id: int = data_tuple.Class.id

            # extract id of the data
            data_id: int = data_tuple.Data.id

            # extract names of the data
            topic_name: str = data_tuple.Topic.topic_name

            # encrypt the record
            key_for_key = get_key_from_password(user_password)
            data_key: bytes = decrypt(key_for_key, data_tuple.Key.key)
            record: str = str(decrypt(data_key, data_tuple.Data.record), encoding='utf-8')

            if new_class_id == old_class_id:
                if new_dataset_id == old_dataset_id:
                    class_groups[class_name]['datasets'][-1][topic_name] = {'data_id': data_id, 'record': record}
                else:
                    old_dataset_id = data_tuple.Dataset.id
                    class_groups[class_name]['datasets'].append({
                        topic_name: {'data_id': data_id, 'record': record}, 'dataset_id': old_dataset_id
                    })
            else:
                class_name = data_tuple.Class.class_name

                old_class_id = data_tuple.Class.id
                old_dataset_id = data_tuple.Dataset.id
                class_groups[class_name] = {
                    'datasets':
                        [
                            {
                                topic_name: {'data_id': data_id, 'record': record}, 'dataset_id': old_dataset_id
                            }
                        ],
                    'class_id': old_class_id,
                }
        return {'class_groups': class_groups}
    else:
        return {'msg': 'No datasets found.', 'category': 'warning'}
