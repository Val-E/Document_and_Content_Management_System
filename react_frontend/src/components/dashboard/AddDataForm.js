import { useState, useEffect, useContext } from 'react';

import { MessageContext } from '../../Context';

import { Messages } from '../../components/Messages';


export const AddDataForm = (values) => {
  /* initialize all variable for all changeable values */
  const { setMessage } = useContext(MessageContext),

        [className, setClassName] = useState(''),
        [datasetNumber, setDatasetNumber] = useState(0),
        [tableForm, setTableForm] = useState([]),
        [classList, setClassList] = useState([]),

        lists = values.value.lists,
        form = values.value.form,

        [globalDatasetDict] = useState({}),
        [irregularData] = useState([]),

        [updateNeed, updateTrigger] = useState(0);

  useEffect(() => {
    if (form === 'addDatasets') {
      /* fetch existing classes */
      fetch(
        '/api/sign-up-data/get-class-list',
        {
          method: 'get',
          headers: {"content-type": "application/json; charset=utf-8"}
        }
      ).then(response => response.json())
       .then(response => setClassList(response['class_list']))
       .catch(error => console.log(error));
    }
  }, [form]);

  /* update table form if number of datasets changes or a global value was set */
  useEffect(() => {
    /* initialize table HTML */
    var table = [];

    /* update dictionary with irregularData */
    for (let index = 0; index < datasetNumber; index++) {
      if (!irregularData[index]) {
        irregularData.push({});
        for (let topic of lists.topic_list) {
          irregularData[index][topic] = '';
        }
      }

      /* push forms */
      table.push(
        <tr>
          { lists.topic_list.map(topic => {
             return (
                <td>
                  <center>
                    <div className="form-floating" style={{ 'width': '190px' }}>
                      <input
                        type="text"
                        name={ `dataset-${ index }-${ topic }` }
                        id={ `dataset-${ index }-${ topic }` }
                        className="form-control"
                        placeholder={ topic }
                        list="user_list"
                        value={
                          irregularData[index][topic] ? irregularData[index][topic]: globalDatasetDict[topic]
                        }
                        onChange={ e => {
                          irregularData[index][topic] = e.target.value;
                          if (updateNeed === 0) { updateTrigger(1) }
                          else { updateTrigger(0) }
                        }}
                      />
                      <label for={ `dataset-${ index }-${ topic }` }> User for { topic }</label>
                    </div>
                  </center>
                </td>
              );
            })
          }
        </tr>
      );
    }

    irregularData.length = Math.round(Math.abs(datasetNumber));

    setTableForm(table);
  }, [datasetNumber, updateNeed]);


  /* return Modal */
  return (
    <div className='container modal-content'>
      <div className="modal-header">
        <h5 className="modal-title" id="newClassLabel">
          {/* render modal header */}
          { form === 'addClass' ? ('Add Class') : ('Add Datasets') }
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div className="modal-body form-group">
        <div className="row g-3 align-items-center">
          <Messages />
          {/*
            * Form to set number of datasets and class name
            */}
          <div className="col-md">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                list={form === 'addDatasets' ? ('class_list'): null}
                id="class_name"
                name="class_name"
                placeholder="Class Name"
                aria-describedby="class_name"
                onChange={e => setClassName(e.target.value)}
              />
              <label for="class_name">Class Name</label>

              {/*
                * class list is used for suggestions in form for adding datasets
                */}
              <datalist id="class_list">
                {
                  classList.map( _class => {
                    return (<option>{ _class }</option>);
                  })
                }
              </datalist>
            </div>
          </div>

          <div className="col-md">
            <div className="form-floating">
              <input
                type="number"
                id="dataset_number"
                name="dataset_number"
                className="form-control"
                placeholder="Number of Datasets"
                aria-describedby="dataset_number"
                onChange={e => setDatasetNumber(e.target.value)}
              />
              <label for="dataset_number">Number of Datasets</label>
            </div>
          </div>
        </div>
        <hr />
        <br />
        <br />

        {/*
          * user list is used for suggestions in table form
          */}
        <datalist id="user_list">
          {
            lists.user_list.map(user => {
              return (<option>{ user }</option>);
            })
          }
        </datalist>

        {/* make the table form fit the modal */}
        <div
          style={{
            'overflow-x': 'scroll',
            'height': '500px',
          }}
        >
          {/* Table HTML */}
          <table
            className={
              `table table-bordered border-dark
              ${ form === 'addClass' ? ('table-primary'): ('table-success')}
              table-striped`
            }
          >
            <thead>
              <tr>
                { lists.topic_list.map(topic => {
                    return (
                      <th className="bg-info" scope="col">
                        <center> { topic } </center>
                      </th>
                    );
                  })
                }
              </tr>

              <tr>
                {/*
                  * configure global values using table header
                  * Call update hook by editing updateNeed flag
                 */}
                { lists.topic_list.map(topic => {
                    return (
                      <td className="bg-danger" >
                        <center>
                          <div className="form-floating" style={{ 'width': '190px' }}>
                            <input
                              type="text"
                              name={ `global-${topic}` }
                              id={ `global-${topic}` }
                              className="form-control"
                              placeholder={ topic }
                              list="user_list"
                              onChange={ e => {
                                globalDatasetDict[topic] = e.target.value;
                                if (updateNeed === 0) { updateTrigger(1) }
                                else { updateTrigger(0) }
                              }}
                            />
                            <label for={ `global-${topic}` }>User for {topic}</label>
                          </div>
                        </center>
                      </td>
                    );
                  })
                }
              </tr>
            </thead>
            <tbody>
              { tableForm }
            </tbody>
          </table>
        </div>
      </div>

      <div className="modal-footer">
        {/* send data to api */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={ () => {
            irregularData.push(globalDatasetDict);

            if (form === 'addClass') {
              var url = '/api/sign-up-data/sign-up-class';
            } else {
              var url = '/api/sign-up-data/sign-up-datasets';
            }

            fetch(
              url,
              {
                method: 'post',
                headers: {"content-type": "application/json; charset=utf-8"},
                body: JSON.stringify({
                  'class_name': className,
                  'datasets': irregularData
                })
              }
            ).then(response => response.json())
             .then(response => setMessage(response))
             .catch(error => console.log(error));

             irregularData.pop();
          }}
        >
          {/* render modal submit button */}
          { form === 'addClass' ? ('Sign Up Class') : ('Sign Up Datasets') }
        </button>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close!</button>
      </div>
    </div>
  )
}
