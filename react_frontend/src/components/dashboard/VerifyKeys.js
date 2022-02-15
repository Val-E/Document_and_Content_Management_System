import { useState, useEffect, useContext } from 'react';

import { MessageContext, UserPasswordContext } from '../../Context';


export const VerifyKeys = () => {
  /* initialize all variable for all changeable values */
  const {userPassword, setUserPassword} = useContext(UserPasswordContext),
        { setMessage } = useContext(MessageContext),

        [classList, setClassList] = useState([]),
        [userList, setUserList] = useState([]);


  /* check for new verification requirements on load */
  useEffect(() => {
    checkVerifications();
  }, []);

  /*
   * fetch lists with class and user names from server
   * and lists to state
  */
  const checkVerifications = () => {
    fetch(
      '/api/verify-keys/get-assigned-data',
      {
        method: 'get',
        headers: {"content-type": "application/json; charset=utf-8"},
      }
    )
    .then(response => response.json())
    .then(response => {
      setClassList(response.classes);
      setUserList(response.users);
    })
    .catch(error => console.log(error));
  }

  return (
    <div className="container container-fluid">
      <h4 className="h4">Key Administration!</h4>

      {/* button to fetch updated list */}
      <div className="btn-group me-2" role="group">
        <button
          type="button"
          className="btn btn-outline-primary btn-lg"
          onClick={e => checkVerifications() }
        >
          Update!
        </button>

        {/* button to clear unverified lists */}
        <button
          type="button"
          className="btn btn-outline-danger btn-lg"
          onClick={() => {
            fetch(
              '/api/verify-keys/clear-unverified-keys',
              {
                method: 'get',
                headers: {"content-type": "application/json; charset=utf-8"},
              }
            )
            .then(response => response.json())
            .then(response => setMessage(response))
            .then(e => checkVerifications())
            .catch(error => console.log(error));
          }}
        >
          Clear Unverified Keys!
        </button>

        {/* button to send post request to verified keys */}
        <button
          type="button"
          className="btn btn-outline-warning btn-lg"
          onClick={ () => {
            fetch(
              '/api/verify-keys/verify',
              {
                method: 'post',
                headers: {"content-type": "application/json; charset=utf-8"},
                body: JSON.stringify({'user_password': userPassword})
              }
            )
            .then(response => response.json())
            .then(response => setMessage(response))
            .then(e => checkVerifications())
            .catch(error => console.log(error));
          }}
        >
          Verify Keys!
        </button>

        {/* password input field, only required for verification */}
        <div className="form-floating">
          <input
            type="password"
            id="user_password"
            name="user_password"
            className="border border-warning border-rounded form-control"
            aria-describedby="user_password"
            value={userPassword}
            onChange={e => setUserPassword(e.target.value)}
          />
          <label for="user_password">User Password</label>
        </div>
      </div>
      <br />

      <div className="container container-fluid">
        <table>
          <tr>
            <td style={{padding: 50}}>
              <ol className="list-group list-group-numbered">
                { classList.length > 0 ? (<h5 className="h5">Must be verified:</h5>): null }
                {
                  classList.map(_class => {
                    return (<li className="list-group-item">{ _class }</li>);
                  })
                }
              </ol>
            </td>
            <td style={{padding: 50}}>
              {/*
                * Display a list of users, which have to verify keys from classes of the current user
                * and a list of classes with unverified keys from the current user.
                */}
              <ol className="list-group list-group-numbered">
                { userList.length > 0 ? (<h5 className="h5">Need to verify:</h5>): null }
                {
                  userList.map(user => {
                    return (<li className="list-group-item">{ user }</li>);
                  })
                }
              </ol>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
