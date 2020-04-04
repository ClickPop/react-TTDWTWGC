import React, {useState, useContext} from 'react'
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';
import Select from 'react-select';
import {useHistory} from 'react-router-dom';
import activity_types from '../../enums/activity_types';
import audiences from '../../enums/audiences';
import {GlobalContext} from '../../context/GlobalState';
import {Link} from 'react-router-dom';

const addActivity = gql`
  mutation(
    $title: String!, 
    $description: String,
    $url: String,
    $activity_type: [String!]!,
    $audience: [String!]!,
    $contributors: [String]) {
      createActivity(activity: {
        title: $title,
        description: $description,
        url: $url,
        activity_type: $activity_type,
        audience: $audience,
        contributors: $contributors
      }) {
        id
        title
      }
    }
`;

const InitialActivity = {
  activity_type: [],
  audience: [],
  title: '',
  description: '',
  url: '',
};

export const AddActivity = () => {
  const {authenticated} = useContext(GlobalContext);
  const [activityData, setActivityData] = useState(InitialActivity);
  const [createActivity] = useMutation(addActivity);
  const history = useHistory();
  const onChange = e => {
    setActivityData({...activityData, [e.target.id]: e.target.value});
  }

  const handleActivityType = e => {
    if (e) {
      let tmp = e.map(type => type.value);
      setActivityData({...activityData, activity_type: tmp});
    }
  }

  const handleAudience = e => {
    if (e) {
      let tmp = e.map(aud => aud.value);
      setActivityData({...activityData, audience: tmp});
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(activityData);
    createActivity({
      variables: activityData
    });
    setActivityData(InitialActivity);
    history.push('/');
  }

  return (
    <div className='d-flex flex-column' style={{width: '40vw'}}>
      <h1>New Activity</h1>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id='title' placeholder='Activity title' onChange={e => onChange(e)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" id='description' placeholder='Activity description' onChange={e => onChange(e)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input type="text" className="form-control" id='url' placeholder='Link to the activity' onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <label>What type of activity?</label>
          <Select id='activity_type' options={activity_types} isMulti onChange={e => handleActivityType(e)} required/>
        </div>       
        <div className="form-group">
          <label>Who will you do it with?</label>
          <Select id='audience' options={audiences} isMulti onChange={e => handleAudience(e)} required/>
        </div>
        {!authenticated && <small><Link to='/login'>Login</Link> or <Link to='/register'>register</Link> to get credit for this submission!</small>}   
        <div className="form-group">
          <button className="btn btn-primary mt-4">Submit</button>
        </div>
      </form>
    </div>
  )
}
