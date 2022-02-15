import React, { useState, useContext } from 'react';

import { MessageContext } from '../Context';


export const SignUpGroup = () => {
  /* initialize all variable for all changeable values */
  const { setMessage } = useContext(MessageContext),

        [groupName, setGroupName] = useState(''),
        [groupPassword, setGroupPassword] = useState(''),
        [topics, setTopics] = useState('');


  /* form to sign a group */
  return (
    <div className="container">
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="group_name"
          name="group_name"
          placeholder="Group Name"
          onChange={e => setGroupName(e.target.value)}
        />
        <label for="group_name">Group Name</label>
      </div>

      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="group_password"
          name="group_password"
          placeholder="Group Password"
          onChange={e => setGroupPassword(e.target.value)}
        />
        <label for="group_password">Group Password</label>
      </div>

      <br />
      <div className="form-floating">
        <textarea
          className="form-control"
          id="topics"
          name="topics"
          style={{ height: 100 }}
          placeholder="Topics"
          onChange={e => setTopics(e.target.value)}
        ></textarea>
        <label for="topics">Topics</label>
      </div>
      <hr />

      <center>
        {/* send data to api */}
        <button
          type="submit"
          className="btn btn-primary mb-3"
          onClick={ () => {
            fetch(
              '/api/auth/sign-up-group',
              {
                method: 'post',
                headers: {"content-type": "application/json; charset=utf-8"},
                body: JSON.stringify({
                  'group_name': groupName,
                  'group_password': groupPassword,
                  'topics': topics.split(';').filter(topic => topic)
                })
              }
            ).then(response => response.json())
             .then(response => setMessage(response))
          }}
        >
          Sign Up Group!
        </button>
      </center>
    </div>
  );
}
