"""Implementation of the AES Encryption algorithms required for database encryption. """

from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from ..settings import SALT


def get_key_from_password(password: str) -> bytes:
    """Generate Key from a password using SHA256

    :param password of the current user
    :return: key for encrypting
    """

    return SHA256.new(password.encode('utf-8')).digest()


def encrypt(key: bytes, data: bytes) -> bytes:
    """Encrypt Data using AES CFB-Mode

    :param key for encryption
    :param data which should be encrypted
    :return: encrypted data
    """

    cipher: AES = AES.new(key, AES.MODE_CFB, SALT)
    encrypted_data = cipher.encrypt(data)
    return encrypted_data


def decrypt(key: bytes, data: bytes) -> bytes:
    """Decrypt Data using AES CFB-Mode

    :param key for decryption
    :param data which should be decrypted
    :return: decrypted data
    """

    cipher: AES = AES.new(key, AES.MODE_CFB, SALT)
    decrypted_data = cipher.decrypt(data)
    return decrypted_data
