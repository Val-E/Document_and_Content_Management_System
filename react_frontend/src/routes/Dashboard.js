import { useState, useEffect } from 'react';

import { VerifyKeys } from '../components/dashboard/VerifyKeys';
import { AddDataForm } from '../components/dashboard/AddDataForm';
import { EditValuesForm } from '../components/dashboard/EditValuesForm'
import { DownloadDatasets } from '../components/dashboard/DownloadDatasets'


export const Dashboard = () => {
  /* initialize all variable for all changeable values */
  const [modalContent, setModalContent] = useState([]),
        [lists, setLists] = useState([]);

  /* get topics and users of the group from api */
  useEffect(() => {
    fetch(
      '/api/sign-up-data/get-topic-user-lists',
      {
        method: 'get',
        headers: {"content-type": "application/json; charset=utf-8"}
      }
    ).then(response => response.json())
     .then(response => setLists(response))
     .catch(error => console.log(error));
  }, []);

  /* Dashboard HTML */
  return (
    <div className="container">
      <center>
        <h1 className="h1">Dashboard</h1>
        <hr />
        <br />

        <div className="container container-fluid">
          <h4 className="h4">Class Administration</h4>
          <div className="container container-fluid mb-3" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group me-2" role="group" aria-label="First group">
              <button
                type="button"
                className="btn btn-outline-info btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#modal"
                onClick={ () => setModalContent(<AddDataForm value={{'lists': lists, 'form': 'addClass'}} />)}
              >
                Add Class
              </button>
              <button
                type="button"
                className="btn btn-outline-info btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#modal"
                onClick={ () => setModalContent( <AddDataForm value={{'lists': lists, 'form': 'addDatasets'}} /> )}
              >
                Add Datasets
              </button>
            </div>

            <div className="btn-group me-2" role="group" aria-label="Second group">
              <button
                type="button"
                className="btn btn-outline-danger btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#modal"
                onClick={ () => setModalContent(<EditValuesForm values={{'lists': lists, 'form': 'deleteData'}}/>)}
              >
                Delete Data
              </button>
            </div>

            <div className="btn-group" role="group" aria-label="Third group">
              <button
                type="button"
                className="btn btn-outline-primary btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#modal"
                onClick={ () => setModalContent(<EditValuesForm values={{'lists': lists, 'form': 'editData'}}/>)}
              >
                Edit Class Values
              </button>
            </div>
          </div>
        </div>

        <br />
        <br />

        <DownloadDatasets />

        <br />
        <br />

        <VerifyKeys />


        <div className="modal fade" id="modal" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
          <div className="modal-dialog modal-xl">
            { modalContent }
          </div>
        </div>

      </center>
    </div>
  );
}
