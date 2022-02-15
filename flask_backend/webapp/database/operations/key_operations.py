"""Implementation of functions used to work with data keys. """

from ..models import User, Class, Data, Key, Dataset
from ... import db

from ...cryptography.cryptography import get_key_from_password, encrypt


def verify_keys(user_id: int, user_password: str) -> None:
    """Verify keys of the user.

    Encrypt keys of a user.
    :param user_id: Id of the user, whose keys will be encrypted.
    :param user_password: The user password is required to encrypted the keys.
    """

    # generate the encryption key from the user password
    pwd_key: bytes = get_key_from_password(user_password)

    # query through keys
    keys: list = Key.query.filter(Key.user == user_id).filter(Key.encrypted == 0).all()

    # Encrypted keys and set encrypted flag on true.
    for key in keys:
        """
        :key.key: not encrypted key
        :pwd_key: key from password
        """
        key.key = encrypt(pwd_key, key.key)
        key.encrypted = True

    db.session.commit()


def clear_unverified_keys(user_id) -> None:
    """Clear unverified keys from Classes of the current user.

    :param user_id: Id of the user, whose classes should be secured through cleaning.
    """

    # Get key id from not encrypted keys and where the user id matches.
    key_ids: list = db.session.query(Key.id) \
        .join(Data) \
        .join(User) \
        .join(Dataset) \
        .join(Class) \
        .filter(Class.owner == user_id) \
        .filter(Key.encrypted == 0)

    # Delete keys.
    db.session.query(Key).filter(Key.id.in_(key_ids)).delete(synchronize_session=False)
    db.session.commit()
