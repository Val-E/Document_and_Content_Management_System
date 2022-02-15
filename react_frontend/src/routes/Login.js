import { useState, useContext } from 'react';

import { MessageContext, UserPasswordContext } from '../Context';


export const Login = () => {
  /* initialize all variable for all changeable values */
  const [groupName, setGroupName] = useState(''),
        [username, setUsername] = useState(''),

        { setMessage } = useContext(MessageContext),
        { userPassword, setUserPassword } = useContext(UserPasswordContext);

  /* log in form */
  return (
    <div className="container">
      <div className="row g-4">
        <div className="col-md">
          <label for="group_name" className="visually-hidden">Group Name</label>
          <input
            type="text"
            className="form-control"
            id="group_name"
            name="group_name"
            placeholder="Group Name"
            onChange={e => setGroupName(e.target.value)}
          />
        </div>

        <div className="col-md">
          <label for="username" className="visually-hidden">Your Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Ihr Name"
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="col-md">
          <label for="user_password" className="visually-hidden">Your Password</label>
          <input
            type="password"
            className="form-control"
            id="user_password"
            name="user_password"
            placeholder="Ihr Password"
            onChange={e => setUserPassword(e.target.value)}
          />
        </div>

        <div className="col-auto">
          {/* send data to api */}
          <button
            type="submit"
            className="btn btn-primary mb-3"
            onClick={ () => {
              fetch(
                '/api/auth/login',
                {
                  method: 'post',
                  headers: {"content-type": "application/json; charset=utf-8"},
                  body: JSON.stringify({
                    'group_name': groupName,
                    'username': username,
                    'user_password': userPassword
                  })
                }
              ).then(response => response.json())
               .then(response => setMessage(response))
               .catch(error => console.log(error));
            }}
          >
            Login!
          </button>
        </div>
      </div>
    </div>
  );
}
