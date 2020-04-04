import React, { useContext, Fragment} from 'react';
import {GlobalContext} from '../../context/GlobalState';
import {Result} from './Result'; 
import gql from 'graphql-tag';
import {useLazyQuery} from '@apollo/client';
import store from 'store';
import {useSpring, animated} from 'react-spring';
import activity_types from '../../enums/activity_types';
import audiences from '../../enums/audiences';

const QUERY = gql`
  query activity($activity_type: ID, $audience: ID, $pastResults: [ID]) {
    activity(activity_type: $activity_type, audience: $audience, pastResults: $pastResults) {
      id
      title
      description
      url
      contributors {
        id
        name
        headshot
      }
    }
  }
`;

const ACTIVITY = gql`
  query($id: ID) {
    activity(id: $id) {
      id
      title
      description
      url
      contributors {
        id
        name
        headshot
      }
    }
  }
`

export const Search = ({id}) => {
  const {searchData, setSearchData} = useContext(GlobalContext);
  let {activity_type, audience, result, pastResults} = searchData;

  if (store.get('pastResults') !== undefined) {
    pastResults = store.get('pastResults');
  }

  const query = id ? ACTIVITY : QUERY;

  const [getActivity, {data, loading, error, called}] = useLazyQuery(query, {
    onCompleted: (data) => {
      let pastResults = searchData.pastResults;
      if (pastResults === undefined) {
        pastResults = [];
      }
  
      while (pastResults.length >= 50) {
        pastResults.shift();
      }
  
      pastResults.push(data.activity.id);
  
      setSearchData({...searchData, pastResults: pastResults});
      store.set('pastResults', searchData.pastResults);
      setSearchData({...searchData, search: true, result: true})
    },
    onError: (err) => {
      console.log(err);
    }
  });

  if (id && !called && !searchData.search) {
    console.log('test');
    setSearchData({...searchData, pastResults});
    getActivity({
      variables: {
        id: id
      }
    });
  }

  const onChange = e => {
    const {value, name} = e.target
    setSearchData({...searchData, [name]: value});
  }

  const onClick = (e) => {
    setSearchData({...searchData, pastResults});
    getActivity({
      variables: {
        activity_type,
        audience,
        pastResults
      }
    });
  }

  const spring = useSpring({
    opacity: loading ? 0 : 1,
    height: loading ? 0 : 'auto',
    transform: loading ? 'scaleY(0)' : 'scaleY(1)',
  })

  return (
    <Fragment>
    <div id='form' className='row'>
      <div className='col-12 col-md-10 offset-md-1'>
        <div id='activity-search-form' className={result ? 'form__container px-2 py-2 bg--lavender' : 'form__container px-2 py-2'}>
          <div className='d-md-flex justify-content-center align-items-center'>
            <div className='mb-3 mb-md-0 pl-1' style={{ flexShrink: '0' }}>
              I want to:
            </div>

            <select
              name='activity_type'
              id='search-type'
              className='form-control mb-3 mb-md-0 mx-md-1'
              value = {activity_type}
              onChange={e => onChange(e)}
            >
              <option value='' disabled hidden>
                What do you want to do?
              </option>
              {activity_types.map(({value, label}) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <select
              name='audience'
              id='search-audience'
              className='form-control mb-3 mb-md-0 mx-sm-1'
              value = {audience}
              onChange={e => onChange(e)}
            >
              <option value='' disabled hidden>
                With whom?
              </option>
              {audiences.map(({value, label}) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <input
              type="submit"
              id='go'
              className='btn btn-warning btn-block-xs ml-sm-1'
              value={result ? 'New idea?' : 'Go!'}
              onClick={e => onClick(e)}
            />
          </div>
          {/* <div className="form-inline">
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="search-free" name="free" value="1">
              <label className="form-check-label" for="search-free">Free activities only, please!</label>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    <animated.div style={spring}>
      {called && !loading && searchData.search && <Result data={data} loading={loading} error={error} />}
    </animated.div>
    </Fragment>
  );
};
