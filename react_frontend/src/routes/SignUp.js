import React, { useState, useContext } from 'react';

import { MessageContext, UserPasswordContext } from '../Context';


export const SignUp = () => {
  /* initialize all variable for all changeable values */
  const { setMessage } = useContext(MessageContext),
        { userPassword, setUserPassword } = useContext(UserPasswordContext),

        [groupName, setGroupName] = useState(''),
        [groupPassword, setGroupPassword] = useState(''),
        [username, setUsername] = useState('');

  /* form to sign up a user */
  return (
    <div className="container">
      <div className="mb-3 row">
        <label for="group_name" className="col-sm-2 col-form-label">Your Group</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="group_name"
            name="group_name"
            placeholder="Your Group"
            onChange={e => setGroupName(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label for="group_password" className="col-sm-2 col-form-label">Group Password</label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            id="group_password"
            name="group_password"
            placeholder="Group Password"
            onChange={e => setGroupPassword(e.target.value)}
          />
        </div>
      </div>
      <hr />
      <div className="row g-4">
        <div className="col-md">
          <label for="username" className="visually-hidden">Your Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Your Username"
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
            placeholder="Your Password"
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
                '/api/auth/sign-up',
                {
                  method: 'post',
                  headers: {"content-type": "application/json; charset=utf-8"},
                  body: JSON.stringify({
                    'group_name': groupName,
                    'group_password': groupPassword,
                    'username': username,
                    'user_password': userPassword
                  })
                }
              ).then(response => response.json())
               .then(response => setMessage(response))
               .catch(error => console.log(error));
            }}
          >
            Sign Up!
          </button>
        </div>
      </div>
      <br />
    </div>
  );
}
