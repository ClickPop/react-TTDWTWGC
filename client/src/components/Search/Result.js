import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const QUERY = gql`
  query activity($activity_type: String, $audience: String) {
    activity(activity_type: $activity_type, audience: $audience) {
      title
      description
      url
      contributors {
        name
      }
    }
  }
`;

export const Result = ({searchData}) => {

  const {search, activity_type, audience} = searchData;

  const {data, loading, error} = useQuery(QUERY, {
    variables: {
      activity_type: activity_type,
      audience: audience
    }
  });

  // if(!loading) {
  //   console.log(data.activity.contributors);
  // }
  if (loading) return <h1>Loading...</h1>
  
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
          {data.activity.url !== undefined && 
          <small className="font-weight-bold">
            <a href={data.activity.url} id="learn-more" target="_blank">Learn more...</a>
          </small>}
          {data.activity.contributors !== undefined && data.activity.contributors.map(contributor => (
            console.log(contributor.name)
          ))}
          <div className="notice notice--warning pl-2 pr-3 py-2 mt-5 bg--slate">
            <div>
              ⚠️
            </div>
            <div>
              In-person activities are for people who share a house only. Please follow the <a href="https://www.cdc.gov/coronavirus/2019-ncov/community/index.html" className="text--mustard">CDC guidelines</a> regarding social distancing. We have plenty of ideas for people in different locations to connect using the magic of the internet.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
