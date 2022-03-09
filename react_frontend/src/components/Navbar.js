import { useEffect, useState, useContext } from 'react';

import { MessageContext, UserPasswordContext } from '../Context';


export const Navbar = () => {
  /* initialize all variable for changeable values */
  const {message} = useContext(MessageContext),
        {setUserPassword} = useContext(UserPasswordContext),

        [pathname, setPath] = useState('');


  /* update Navbar if message appears */
  useEffect(() => {
     /* navbar update uses current url */
    setPath(window.location.pathname);
  }, [message])

  /* Initialize visibility status flags for buttons */
  var statusSignUpGroupButton = '',
      statusSignUpButton = '',
      statusLoginButton = '',
      statusLogoutButton = 'visually-hidden';

  /* validate url */
  if (pathname === '/auth/sign-up-group' ) {
    document.title = 'Sign Up Group';
    statusSignUpGroupButton = 'active';
    statusLogoutButton = 'visually-hidden';
  } else if (pathname === '/auth/sign-up') {
    document.title = 'Sign Up';
    statusSignUpButton = 'active';
    statusLogoutButton = 'visually-hidden';
  } else if (pathname === '/auth/login') {
    document.title = 'Login';
    statusLoginButton = 'active';
    statusLogoutButton = 'visually-hidden';
  }  else if (pathname === '/dashboard') {
    document.title = 'Dashboard';
    statusSignUpGroupButton = 'visually-hidden';
    statusSignUpButton = 'visually-hidden';
    statusLoginButton = 'visually-hidden';
    statusLogoutButton = '';
  }

  /* return Navbar HTML */
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom container-fluid">
      <span className="fs-4"> Document and Content Management Software </span>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a className={`nav-link ${statusSignUpGroupButton}`} href="/auth/sign-up-group">Sign Up Group</a>
        </li>
        <li className="nav-item">
          <a  href="/auth/logout">
            <button
              className={`btn btn-danger ${statusLogoutButton}`}
              href="/auth/logout"
              onClick={e => setUserPassword('')}
            >
              Logout
            </button>
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${statusSignUpButton}`} href="/auth/sign-up">Sign Up</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${statusLoginButton}`} href="/auth/login">Login</a>
        </li>
      </ul>
    </div>
  );
}
