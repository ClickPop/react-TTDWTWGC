import React from 'react';

export const Result = ({data, loading, error, search}) => {
  if (error) return (
    <div className="col-12 col-md-10 offset-md-1">
      <div className="result__container">
        <div className="notice notice--warning pl-2 pr-3 py-2 mt-5 bg--slate d-flex justify-content-center align-items-center">
          <h1 className="d-flext align-items-center"><span role="img" aria-label="Warning sign">⚠️</span></h1>
          <h2 className="d-flex align-items-center ">An error occured</h2>
        </div>
      </div>
    </div>
  )
  if (loading) return (
    <div className="col-12 col-md-10 offset-md-1">
      <div className="result__container py-3 py-sm-4 my-sm-4">
        <h1>Loading...</h1>
      </div>
    </div>
  )
  if (!loading) {
    return (
      <div
        id='result'
        className='row px-3'
        // style={{ minHeight: '500px', opacity: search ? '1' : '0', transition: 'opacity 0...1',}}
      >
        <div className="col-12 col-md-10 offset-md-1">
          <div className="result__container py-3 py-sm-4 my-sm-4">
            <h1>{data.activity.title}</h1>
            <p>{data.activity.description}</p>
            {data.activity.url !== null &&
            <small className="font-weight-bold">
              <a href={data.activity.url} id="learn-more" target="_blank" rel="noopener noreferrer">Learn more...</a>
            </small>}
            {data.activity.contributors.length > 0 
              ? <div className="mt-4 d-sm-flex align-items-center">
                  <div>This idea came from:</div>
                  <ul className="p-0 m-0 d-flex">
                      {data.activity.contributors.map(contributor => (
                          <li key={contributor.id} className="d-flex my-2 align-items-center">
                          {
                          contributor.headshot !== null
                              ? <img src={contributor.headshot} className="img-thumbnail rounded-circle mx-1" width="50" alt="Contributor Avatar" />
                              : <span className="mx-1"></span>
                          }
                          <p className="m-0 contributor__name font-weight-bold">{contributor.name}</p>
                      </li>))}
                  </ul>
              </div> 
              : <div className="mt-4 d-sm-flex align-items-center">
                  <div>This idea came from:</div>
                    <ul className="p-0 m-0 d-flex">
                      <li key={null} className="d-flex my-2 align-items-center">
                        <span className="mx-1"></span><p className="m-0 contributor__name font-weight-bold">An Anonymous User</p>
                      </li>
                    </ul>
                  </div> 
            }
            <div className="notice notice--warning pl-2 pr-3 py-2 mt-5 bg--slate">
              <div>
                <span role="img" aria-label="Warning sign">⚠️</span>
              </div>
              <div>
                In-person activities are for people who share a house only. Please follow the <a href="https://www.cdc.gov/coronavirus/2019-ncov/community/index.html" className="text--mustard">CDC guidelines</a> regarding social distancing. We have plenty of ideas for people in different locations to connect using the magic of the internet.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    }
};
