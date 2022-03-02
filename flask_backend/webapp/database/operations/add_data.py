"""Functions required and used to add datasets, data and keys to the database. """

from Crypto import Random

from ...cryptography.cryptography import encrypt
from ..models import Topic, User, Class, Data, Key, Dataset
from ... import db


def cache_users(datasets: list, current_user: User) -> any:
    """Cache assigned users from datasets from user inputs

    :param datasets: Data assignments and configuration from users.
    :param current_user: Owner of the new class.
    :return: Return either an error message or a dictionary with all users and their ids.
    """

    user_cache: dict = {}
    users_lists: list = []
    for i, dataset in enumerate(datasets):
        users_lists.append({})
        for topic, target_users in dataset.items():
            for target_user in target_users.split(';'):
                # check if target user is set
                if target_user:
                    # check if target user is already know
                    if target_user in user_cache.keys():
                        # modify dict based on cache
                        if topic in users_lists[i]:
                            # add user id, when list already exists
                            users_lists[i][topic].append(user_cache[target_user])
                        else:
                            # create list and add user id
                            users_lists[i][topic] = [user_cache[target_user]]
                    else:
                        # get target user
                        target_user_id: User = User.query \
                            .filter(User.username == str(target_user).strip()) \
                            .filter(User.group == current_user.group) \
                            .first()
                        if target_user_id:
                            # add target user to dict and cache
                            if topic in users_lists[i]:
                                users_lists[i][topic].append(target_user_id.id)
                            else:
                                users_lists[i][topic] = [target_user_id.id]

                            user_cache[target_user] = target_user_id.id
                        else:
                            if i + 1 == len(datasets):
                                return {
                                    'msg': f'{target_user} not found! Look at the global Configuration!',
                                    'category': 'danger'
                                }
                            else:
                                return {
                                    'msg': f'{target_user} not found! Look at {topic}! Row: {i + 1}',
                                    'category': 'danger'
                                }
                else:
                    users_lists[i][topic] = []

    return users_lists


def cache_topics(datasets: list, current_user: User) -> any:
    """Cache Topics from user inputs

    :param datasets: Data assignments and configuration from users.
    :param current_user: Owner of the new class.
    :return: Return either an error message or a dictionary with all topics and their ids.
    """

    topic_cache: dict = {}
    for dataset in datasets:
        for topic in dataset.keys():
            if not (topic in topic_cache):
                topic_id: int = Topic.query \
                    .filter(Topic.group == current_user.group) \
                    .filter(Topic.topic_name == topic) \
                    .first().id
                if topic_id:
                    topic_cache[topic] = topic_id
                else:
                    return {
                        'msg': f'{topic} not found!',
                        'category': 'danger'
                    }
    return topic_cache


def add_data(dataset_id: int, topic_id: int, user_ids: list) -> None:
    """ Create entries for data and for

    :param dataset_id: ID of the dataset to which the data should be assigned.
    :param topic_id: ID of the topic to which the data should be assigned.
    :param user_ids: List with the IDs of all users, which should have a access to the data.
    """

    # generate key for data
    data_key: bytes = Random.new().read(16)
    # create entry for data, when users are assigned
    new_data: Data = Data(
        record=encrypt(data_key, bytes('', encoding='utf-8')),
        dataset=dataset_id,
        topic=topic_id,
    )
    db.session.add(new_data)
    db.session.flush()

    # write keys for all users
    for user in user_ids:
        new_key: Key = Key(
            key=data_key,
            encrypted=False,
            data=new_data.id,
            user=user
        )
        db.session.add(new_key)

    db.session.flush()


def add_datasets(datasets: list, _class, current_user: User) -> dict:
    """Checks whether all users and all listed topics exist and add based on datasets to the database.

    :param datasets: A list of all users and their assignment data
    :param _class: When a class should be added, the value will be used ass class name,
            otherwise it is a class object and based on it will be datasets added.
    :param current_user: Owner of the new class.
    :return: status message
    """

    # check whether all users exist and extract user ids
    users_lists = cache_users(datasets, current_user)
    if not isinstance(users_lists, list):
        # return error message from cache_users, when something went wrong
        return users_lists

    # check whether all topics exist and extract topic id
    topic_cache = cache_topics(datasets, current_user)
    if 'msg' in topic_cache.keys():
        # return error message from cache_topic, when something went wrong
        return topic_cache

    # create a new class and add it to database
    if isinstance(_class, str):
        # condition is true, when user asks to create a new class and not just add datasets to persistent class
        new_class: Class = Class(
            class_name=_class,
            owner=current_user.id
        )
        db.session.add(new_class)
        db.session.flush()
        # set success message
        success_msg: str = 'Class was successfully created.'
    else:
        # use existing class when user asks to add datasets
        new_class = _class
        success_msg: str = 'Datasets were successfully created.'

    for i, users_list in enumerate(users_lists):
        # check whether iteration has reached the global dataset configuration
        if i == len(users_lists) - 1:
            db.session.commit()
            return {'msg': success_msg, 'category': 'success'}

        # create a new dataset entry
        new_dataset: Dataset = Dataset(_class=new_class.id)
        db.session.add(new_dataset)
        db.session.flush()

        for topic, users in users_list.items():
            if users:
                # Create entry for data, when users are assigned via specific configuration
                add_data(new_dataset.id, topic_cache[topic], users[topic])

            elif topic in users_lists[-1].keys():
                # Create entry for data, when users are assigned via global configuration
                add_data(new_dataset.id, topic_cache[topic], users_lists[-1][topic])
