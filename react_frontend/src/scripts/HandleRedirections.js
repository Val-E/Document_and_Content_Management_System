import { useContext } from 'react';
import { Redirect } from 'react-router';

import { MessageContext } from '../Context';


export const HandleRedirections = () => {
  const { message } = useContext(MessageContext);

  /* generates Redirection based on notification message */
  if (message) {
    if (message.msg === 'The group has been registered!') {
      return( <Redirect to='/auth/sign-up'/> );
    } else if (message.msg === 'Account was created and you were logged in automatically!' || message.msg === 'You have been logged in!') {
      return( <Redirect to='/dashboard'/> );
    }
  }

  return null;
}
