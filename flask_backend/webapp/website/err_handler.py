from flask import flash, redirect, url_for
from flask_login import current_user


def page_not_found(e) -> redirect:
    """ 404Error Handler

    Redirect login users to the dashboard and not logged in users to the home page.

    :param e: useless error code, which is only taken to avoid errors
    :return: Redirect to home or dashboard page
    """

    if current_user.is_authenticated:
        flash('Page not found! You have been redirected to the dashboard!', category='warning')
        return redirect(url_for('views.dashboard'))

    flash('Page not found! You have been redirected to the home page!', category='warning')
    return redirect(url_for('views.home'))
