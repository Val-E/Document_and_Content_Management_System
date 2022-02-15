import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import { Header } from './components/Header';
import { Messages } from './components/Messages';
import { Footer } from './components/Footer';

import { HandleRedirections } from './scripts/HandleRedirections';

import { MessageContext, UserPasswordContext } from './Context';
import './index.css';

import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { SignUp } from './routes/SignUp';
import { SignUpGroup } from './routes/SignUpGroup';
import { Dashboard } from './routes/Dashboard';


export const App = () => {
  const [message, setMessage] = useState(''),
        [userPassword, setUserPassword] = useState('');

  return(
    <Router>
      { window.location.pathname === '/' ? <Redirect to='/home' /> : null }
      { window.isAuthenticated ? <Redirect to='/dashboard' /> : null }

      <MessageContext.Provider value={{message, setMessage}}>
        <UserPasswordContext.Provider value={{userPassword, setUserPassword}}>
          <Route path='/'>
            <HandleRedirections />
            <Header />
            <Messages />
            <Footer />
          </Route>

          <Route path='/home' component={Home} />
          <Route path='/auth/sign-up' component={SignUp} />
          <Route path='/auth/sign-up-group' component={SignUpGroup} />
          <Route path='/auth/login' component={Login} />
          <Route path='/dashboard' component={Dashboard} />
        </UserPasswordContext.Provider>
      </MessageContext.Provider>
    </Router>
  );
}
