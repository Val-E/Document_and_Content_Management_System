import { useState, useEffect, useContext } from 'react';

import { MessageContext, UserPasswordContext } from '../../Context';

import { Messages } from '../../components/Messages';


export const EditValuesForm = (values) => {
  /* initialize all variable for all changeable values */
  const { setMessage } = useContext(MessageContext),
        {userPassword, setUserPassword} = useContext(UserPasswordContext),

        [classGroups, setClassGroups] = useState([]),

        form = values.values.form,
        topic_list = values.values.lists.topic_list;


  /* Push changes to database! */
  const pushData = (dataId, newData) => {
    fetch(
      '/api/manipulate-entries/push-data',
      {
        method: 'post',
        headers: {"content-type": "application/json; charset=utf-8"},
        body: JSON.stringify({
          'data_id': dataId,
          'new_data': newData,
          'user_password': userPassword
        })
      }
    ).then(response => response.json())
     .then(response => {setMessage(response)})
     .catch(error => console.log(error));
  }

  /* Get datasets from database! */
  const getDatasets = () => {
    fetch(
      '/api/manipulate-entries/get-datasets',
      {
        method: 'post',
        headers: {"content-type": "application/json; charset=utf-8"},
        body: JSON.stringify({'user_password': userPassword})
      }
    ).then(response => response.json())
     .then(response => {
       if (Object.keys(response).indexOf('msg') >= 0) { setMessage(response) }
       else { setClassGroups(response.class_groups) }
     })
     .catch(error => console.log(error));
  }

  /* Get datasets from database! */
  const deleteData = (body) => {
    fetch(
      '/api/manipulate-entries/delete-data',
      {
        method: 'post',
        headers: {"content-type": "application/json; charset=utf-8"},
        body: JSON.stringify(body)
      }
    ).then(response => response.json())
     .then(response => setMessage(response))
     .catch(error => console.log(error));
  }

  return(
    <div className='container modal-content'>
      <div className="modal-header">
        <h5 className="modal-title" id="newClassLabel">
          { form === 'editData' ? ('Edit Class Values'): ('Delete Data')}
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div className="modal-body form-group">
        <div className="row g-3 align-items-center">
          <Messages />
          <div className="btn-group me-2" role="group">
            {/* button to send post request to get datasets */}
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={ e => getDatasets() }
            >
              Get Datasets!
            </button>

            {/*
              * password input field,
              * the password is required for all operations on this modal
              */}
            <div className="form-floating">
              <input
                type="password"
                id="user_password"
                name="user_password"
                className="border border-success border-rounded form-control"
                aria-describedby="user_password"
                defaultValue={userPassword}
                onChange={e => setUserPassword(e.target.value)}
              />
              <label for="user_password">User Password</label>
            </div>
          </div>
          <br />
          <hr />

          <div
            style={{
              'overflow-x': 'scroll',
              'height': '500px',
            }}
          >
            {/* Table HTML */}
            { Object.keys(classGroups).map(class_name => {
              return (
                <div className="container container-fluid">
                  <table className="table table-bordered border-dark table-striped">
                    {/* table header */}
                    <thead>
                      {/* class name */}
                      <tr>
                        <th
                          className="bg-warning"
                          colspan={ form === 'editData' ? (`${topic_list.length}`): (`${topic_list.length + 1}`)}
                        >
                          <center>
                            { form === 'editData' ? (
                              <div>
                                { class_name }
                              </div>
                            ): (
                                <button
                                  type="button"
                                  id={`class-${classGroups[class_name].class_id}`}
                                  name={`class-${classGroups[class_name].class_id}`}
                                  className="btn btn-danger"
                                  onClick={e => deleteData({'class_id': classGroups[class_name].class_id})}
                                >
                                  Delete <span className="badge bg-light text-danger">{ class_name }</span>
                                </button>
                            )}
                          </center>
                        </th>
                      </tr>
                     {/* topics used to order data */}
                      <tr>
                        { form === 'deleteData' ? (
                          <th className="bg-info">
                             <center>#</center>
                           </th>
                        ): null }

                        { topic_list.map(topic_name => {
                          return (
                           <th className="bg-info">
                             <center>{ topic_name }</center>
                           </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      { classGroups[class_name].datasets.map(dataset => {
                        return (
                          <tr>
                            { form === 'deleteData'? (
                              <td className="bg-primary lol">
                                <center>
                                  <button
                                    name={ `dataset-${ dataset.dataset_id }` }
                                    id={ `dataset-${ dataset.dataset_id }` }
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={e => deleteData({'dataset_id': dataset.dataset_id})}
                                  >
                                    Delete <span className="badge bg-light text-danger">Dataset</span>
                                  </button>
                                </center>
                              </td>
                            ): null }

                            {/* generate dataset row */}
                            { topic_list.map(topic => {
                              var data = dataset[topic];
                              if (data) {
                                /* generate data submit field */
                                return (
                                  <td className="bg-primary">
                                    <center>
                                      { form === 'editData' ? (
                                        <div className="form-floating" style={{ 'width': '190px' }}>
                                          <input
                                            type="text"
                                            name={ `data-${ data.data_id}` }
                                            id={ `data-${ data.data_id }` }
                                            className="form-control"
                                            style={{ 'width': '190px' }}
                                            placeholder={ topic }
                                            defaultValue={ data.record }
                                            onChange={ e => pushData(data.data_id, e.target.value)}
                                          />
                                          <label for={ `data-${ data.record }` }> Content for { topic }</label>
                                        </div>
                                      ): (
                                        <button
                                          name={ `data-${ data.data_id}` }
                                          id={ `data-${ data.data_id }` }
                                          type="button"
                                          className="btn btn-danger"
                                          onClick={e => deleteData({'data_id': data.data_id})}
                                        >
                                          Delete <span className="badge bg-light text-danger">{ data.record }</span>
                                        </button>
                                      )}
                                    </center>
                                  </td>
                                );
                              } else { return (<td className="bg-primary"></td>) }
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <br />
                </div>
              );
            })}
          </div>

          {/* make the table form fit the modal */}
        </div>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close!</button>
      </div>
    </div>
  );
}
