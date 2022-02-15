export const Home = () => {
  /* start page of the webapp */
  return (
    <div className="container alert alert-success"role="alert">
      <h2 className="alert-heading">Welcome!</h2>
      <h4 className="h4">
        The website offers you the service to collect data and store it indefinitely in order to create documents based on it.
      </h4>
      <hr />
      <p className="mb-0">
        All datasets are stored in encrypted form.
        <br />
        The webapp does not collect metadata.
      </p>
      <br />
      <br />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">API</h5>
          <h6 className="card-subtitle mb-2 text-muted">Try the API-Interface!</h6>
          <p className="card-text">
            The webapp offers you the option to write your own interface or to integrate the webapp
            into your own application using the API.
          </p>
          <a href="/api" class="card-link">Open Swagger API UI</a>
        </div>
      </div>
      <br />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Q&A</h5>
          <p className="card-text">
            If you have questions about the functionality, read the documentation on Github!
            If you want to report a problem use the features provided by Github or write an email!
          </p>
          <a href="http://www.github.com/Val-E/Document_and_Content_Management_System/" class="card-link">Github</a>
        </div>
      </div>
    </div>
  );
}
