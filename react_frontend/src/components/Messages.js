import { useContext, useState } from 'react';

import { MessageContext } from '../Context';


export const Messages = () => {
  const {message, setMessage} = useContext(MessageContext),

        [cookieNotification, setCookieNotification] = useState(true);

  /* return Notification Message HTML */
  return (
    <div className="container container-fluid">
      {/* generate a cookie message if the user visits the website for the first time */}
      { cookieNotification && document.cookie === '' ? (
        <div className="alert alert-primary alert-dismissible fade show" role="alert">
          <strong>The website uses cookies!</strong>
          <br />
          Cookies are necessary to ensure the functionality of the website.
          <button
            type="button" 
            class="btn-close" 
            aria-label="Close"
            onClick={() => {
              setCookieNotification(false);
              document.cookie = '_';
            }}
          >
          </button>
        </div>
      ): null }

      {/* generate an error message based on the flashed messages */}
      { Object.keys(window.flashed_messages).length === 2 ? (
        <div className={ `alert alert-${ window.flashed_messages.category } alert-dismissible fade show` } role="alert">
          { window.flashed_messages.message }
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      ): null }

      {/* generate a message based on API-Return-Message */}
      { message ? (
        <div
          className={`alert alert-${ message.category ? (message.category): 'secondary' }
          d-flex align-items-center container`}
          role="alert"
        >
          <div className="container">

            {/* custom error messages */}
            { message.msg }

            {/* flask error messages */}
            { message.message }

          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setMessage(null)}
          ></button>
        </div>
      ): null }
    </div>
  );
}
