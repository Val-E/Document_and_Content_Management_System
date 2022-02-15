""" Views

Host Frontend of the Webapp.
"""

from flask import Blueprint, render_template, redirect, flash, url_for
from flask_login import current_user, logout_user, login_required


views: Blueprint = Blueprint('views', __name__)


@views.route('/')
@views.route('/home')
@views.route('/auth/sign-up')
@views.route('/auth/sign-up-group')
@views.route('/auth/login')
def auth() -> str:
    """Host routes for authentication pages.

    :return: Return the ReactJS-Frontend.
    """
    return render_template('index.html', user=current_user)


@views.route('/')
@views.route('/home')
def home() -> str:
    """Host routes for Home page.

    :return: Return the ReactJS-Frontend.
    """
    return render_template('index.html', user=current_user)


@views.route('/dashboard')
@login_required
def dashboard() -> str:
    """Host route for dashboard page.

    :return: Return the reactjs-frontend.
    """

    return render_template('index.html', user=current_user)


@views.route('/auth/logout')
@login_required
def logout() -> redirect:
    """Host route for logout page.

    :return: Return the reactjs-frontend.
    """
    logout_user()
    flash('You have been logged out!', category='success')
    return redirect(url_for('views.auth'))
