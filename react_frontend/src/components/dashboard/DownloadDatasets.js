import { useContext } from 'react';
import { saveAs } from 'file-saver'

import { MessageContext, UserPasswordContext } from '../../Context';


export const DownloadDatasets = () => {
  /* initialize all variable for all changeable values */
  const {userPassword, setUserPassword} = useContext(UserPasswordContext),
        { setMessage } = useContext(MessageContext);

  return (
    <div className="container container-fluid">
      <h4 className="h4">Download Datasets!</h4>
      <div className="btn-group me-2" role="group">
        {/* button to send download request */}
        <button
          type="button"
          className="btn btn-outline-secondary btn-lg"
          onClick={ () => {
            fetch(
              '/api/get-files/download-datasets',
              {
                method: 'post',
                headers: {"content-type": "application/json; charset=utf-8"},
                body: JSON.stringify({'user_password': userPassword})
              }
            )
            .then(response => response.blob())
            .then((response) => {
              if (response.type === 'application/json') {
                setMessage({'msg': 'An error occurred.', 'category': 'danger'});
              } else {
                saveAs(response, 'package.zip');
              }
            })
            .catch(error => console.log(error));
          }}
        >
          Download Datasets
        </button>

        <div className="form-floating">
          {/* password input field, only required for verification */}
          <input
            type="password"
            id="user_password"
            name="user_password"
            className="border border-secondary border-rounded form-control"
            aria-describedby="user_password"
            value={userPassword}
            onChange={e => setUserPassword(e.target.value)}
          />
          <label for="user_password">User Password</label>
        </div>
      </div>
    </div>
  );
}
