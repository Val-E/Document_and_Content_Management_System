"""Implementation of operation required to edit dataframes. """

from ..models import Data, Key, User, Class, Dataset
from ... import db

from ...cryptography.cryptography import encrypt, decrypt, get_key_from_password


def push_new_data(data_id: int, user_id: int, user_password: str, new_data: str) -> dict:
    """Push new Data to Database.

    Replace old record with submitted new record.

    :param data_id: Id of the Data, which should be updated.
    :param user_id: Id of the user, is required to check to the access rights of the user.
    :param user_password: The User Password is required to decrypt the key for the record.
    :param new_data: Data, which should be pushed to database.
    :return: status message
    """

    # query through database, to find entry
    data: Data = db.session.query(Data, Key) \
        .join(Key) \
        .filter(Data.id == data_id) \
        .filter(Key.user == user_id) \
        .filter(Key.encrypted == 1) \
        .first()

    # check if data exists
    if data:
        # encrypt key for record encryption
        key_for_key: bytes = get_key_from_password(user_password)
        data_key: bytes = decrypt(key_for_key, data.Key.key)

        # push encrypted record to database
        encrypt_record: bytes = encrypt(data_key, bytes(new_data, encoding='utf-8'))
        data.Data.record = encrypt_record

        db.session.commit()

        return {'msg': 'Changes were successfully applied.', 'category': 'success'}

    else:
        return {'msg': 'Data not found. Reload table and check data id!', 'category': 'danger'}


def delete_data(data_id: int, user_id) -> None:
    """Query through database to find entries of data and keys and hand over objects to delete function.

    :param data_id: Id of the data, which should be removed from.
    :param user_id: Id of the current user, to gain precession to access the data.
    """

    target_data: list = db.session.query(Key, Data) \
        .join(Key) \
        .join(Dataset) \
        .join(Class) \
        .filter(Data.id == data_id) \
        .filter(Class.owner == user_id) \
        .all()

    delete_routine(target_data)


def delete_dataset(dataset_id: int, user_id: int):
    """Query through database to find entries of datasets, data keys and hand over objects to delete function.

    :param dataset_id: Id of the data, which should be removed from database.
    :param user_id: Id of the current user, to gain precession to access the data.
    """

    target_data: list = db.session.query(Key, Data, Dataset) \
        .join(Key) \
        .join(Dataset) \
        .join(Class) \
        .filter(Dataset.id == dataset_id) \
        .filter(Class.owner == user_id) \
        .all()

    delete_routine(target_data)


def delete_class(class_id: int, user_id: int):
    """Query through database to find entries of
    Classes datasets, data and keys to hand over objects to delete function.

    :param class_id:  Id of the data, which should be removed from database.
    :param user_id: Id of the current user, to gain precession to access the data.
    """

    target_data: list = db.session.query(Class, Key, Data, Dataset) \
        .join(Key) \
        .join(Dataset) \
        .join(Class) \
        .filter(Class.id == class_id) \
        .filter(Class.owner == user_id) \
        .all()

    delete_routine(target_data)


def delete_routine(target_data) -> None:
    """Execute the delete comment for an list of database elements.

    :param target_data: element list
    """

    for data in target_data:
        for element in data:
            db.session.delete(element)

    db.session.commit()
