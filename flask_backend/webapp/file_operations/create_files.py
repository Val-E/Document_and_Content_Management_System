""""""

import os
import pandas as pd

from time import sleep
from threading import Thread
from shutil import make_archive, rmtree
from cryptography.fernet import Fernet

from ..database.models import Class, Data, Key, Dataset, Topic
from .. import db

from ..cryptography.cryptography import decrypt, get_key_from_password


def remove_package(package_path: str) -> None:
    """Remove zip-file and folder after sending data to user.

    :param package_path: package_path to folder, which should be deleted
    """
    sleep(10)
    os.remove(f'{package_path}.zip')
    rmtree(package_path)
    

def create_collection(user_id: int, user_password: str) -> any:
    """Get Datasets of the current user for Download.

    Get the datasets which the current user is allow to access, sorted by class and organized using the topics.

    :param user_id: Id of the current user is required to query the database.
    :param user_password: Password of the current user is used to encrypt the data.
    :return dictionary with the containing the whole data
    """

    # Search and sort algorithm works similar to the one of get_operations.get_assigned_data.
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

            # extract names of the data
            topic_name: str = data_tuple.Topic.topic_name

            # encrypt the record
            key_for_key = get_key_from_password(user_password)
            data_key: bytes = decrypt(key_for_key, data_tuple.Key.key)
            record: str = str(decrypt(data_key, data_tuple.Data.record), encoding='utf-8')

            if new_class_id == old_class_id:
                if new_dataset_id == old_dataset_id:
                    class_groups[class_name]['datasets'][-1][topic_name] = record
                else:
                    old_dataset_id = data_tuple.Dataset.id
                    class_groups[class_name]['datasets'].append({topic_name: record})
            else:
                class_name = data_tuple.Class.class_name

                old_class_id = data_tuple.Class.id
                old_dataset_id = data_tuple.Dataset.id
                class_groups[class_name] = {
                    'datasets':
                        [
                            {
                                topic_name: record
                            }
                        ]
                }

        # generate random url safe name for csv-package and add it to the path
        package_path: str = os.getcwd() + '/webapp/file_operations/files/' + str(Fernet.generate_key(), encoding='utf-8')[0: -1]

        # create folder for package
        os.mkdir(package_path)

        # build all csv for package
        for class_name, datasets in class_groups.items():
            df = pd.DataFrame.from_dict(datasets['datasets'])
            df.to_csv(f'{package_path}/{class_name}.csv', index=False)

        # zip all the files
        make_archive(package_path, format='zip', root_dir=f'{package_path}')

        # clear zip and folder asynchronously
        t: Thread = Thread(target=remove_package, args=[package_path])
        t.start()

        return package_path

    else:
        return {'msg': 'No datasets found.', 'category': 'warning'}
