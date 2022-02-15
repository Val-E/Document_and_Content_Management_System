"""Implementation of the Database. """

from .. import db
from flask_login import UserMixin


class Group(db.Model):
    """Implementation of the entity Group. """
    id = db.Column(db.Integer(), primary_key=True)
    group_name = db.Column(db.String(length=256), unique=True)
    group_password = db.Column(db.String(length=256))
    user = db.relationship('User', lazy=True)
    topic = db.relationship('Topic', lazy=True)


class Topic(db.Model):
    """Implementation of the entity Topic """
    id = db.Column(db.Integer(), primary_key=True)
    topic_name = db.Column(db.String(length=256))
    group = db.Column(db.Integer(), db.ForeignKey('group.id'))
    related_data = db.relationship('Data', lazy=True)


class User(db.Model, UserMixin):
    """Implementation of the entity User. """
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=256))
    password = db.Column(db.String(length=256))
    group = db.Column(db.Integer(), db.ForeignKey('group.id'))
    owned_classes = db.relationship('Class', lazy=True)
    owned_keys = db.relationship('Key', lazy=True)


class Class(db.Model):
    """Implementation of the entity Class. """
    id = db.Column(db.Integer(), primary_key=True)
    class_name = db.Column(db.String(length=256))
    owner = db.Column(db.Integer(), db.ForeignKey('user.id'))
    dataset = db.relationship('Dataset', lazy=True)


class Dataset(db.Model):
    """Implementation of the entity Dataset. """
    id = db.Column(db.Integer(), primary_key=True)
    _class = db.Column(db.Integer(), db.ForeignKey('class.id'))
    data = db.relationship('Data', lazy=True)


class Data(db.Model):
    """Implementation of the entity Data. """
    id = db.Column(db.Integer(), primary_key=True)
    record = db.Column(db.LargeBinary(length=2048))
    creation_date = db.Column(db.DateTime(timezone=True), default=db.func.now())
    updated_date = db.Column(db.DateTime(timezone=True), onupdate=db.func.now())
    topic = db.Column(db.Integer(), db.ForeignKey('topic.id'))
    dataset = db.Column(db.Integer(), db.ForeignKey('dataset.id'))
    key = db.relationship('Key', lazy=True)


class Key(db.Model):
    """Implementation of the entity Key. """
    id = db.Column(db.Integer(), primary_key=True)
    key = db.Column(db.LargeBinary(length=2048))
    encrypted = db.Column(db.Boolean())
    user = db.Column(db.Integer(), db.ForeignKey('user.id'))
    data = db.Column(db.Integer(), db.ForeignKey('data.id'))
