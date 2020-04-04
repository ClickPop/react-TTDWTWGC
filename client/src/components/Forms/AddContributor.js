import React, { useState, useContext } from 'react'
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

const addContributor = gql`
    mutation(
      $name: String!, 
      $website: String,
      $twitter: String,
      $other: String,
      $bio: String,
      $headshot: Upload) {
        createContributor(contributor: {
          name: $name, 
          website: $website, 
          twitter: $twitter, 
          other: $other,
          bio: $bio,
          headshot: $headshot
        }) {
            id
            name
            website
            twitter
            other
            bio
        }
    }
`;

const InitialContributor = {
  name: '',
  bio: '',
  website: '',
  twitter: '',
  other: '',
  headshot: null,
}

export const AddContributor = () => {
  let history = useHistory();
  const [contributorData, setContributorData] = useState(InitialContributor);
  const [createContributor] = useMutation(addContributor, {
    onCompleted: (data) => {
      setCurrentContributor({
        name: data.name,
        bio: data.bio,
        website: data.website,
        twitter: data.twitter,
        other: data.other,
        headshot: data.headshot,
      });
    }
  });
  const {authenticated, currentContributor, setCurrentContributor} = useContext(GlobalContext);

  const onChangeText = (e) => {
    const {id, value} = e.target;
    setContributorData({...contributorData, [id]: value});
  }

  const onChangeFile = (e) => {
    const [file] = e.target.files;
    setContributorData({...contributorData, headshot: file});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    createContributor({
      variables: contributorData
    });
    setContributorData(InitialContributor);
    history.push('/');
  }

  return (
    <div className='d-flex flex-column' style={{width: '40vw', maxHeight: '90vh'}}>
      <h1 className='mb-2'>New Contributor</h1>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id='name' placeholder='Your name' onChange={e => onChangeText(e)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea type="text" className="form-control" id='bio' placeholder='Tell us something about yourself' onChange={e => onChangeText(e)} style={{maxHeight: '8vh'}}/>
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input type="text" className="form-control" id='website' placeholder='Your website' onChange={e => onChangeText(e)}/>
        </div>
        <div className="form-group">
          <label htmlFor="twitter">Twitter handle</label>
          <input type="text" className="form-control" id='twitter' placeholder='Your twitter' onChange={e => onChangeText(e)}/>
          <small>No @ plz</small>
        </div>
        <div className="form-group">
          <label htmlFor="other">Other</label>
          <input type="text" className="form-control" id='other' placeholder='Your other social media' onChange={e => onChangeText(e)}/>
        </div>
        <div className="form-group">
          <label htmlFor="headshot">Headshot</label>
          <input type="file" className="form-control-file" id='headshot' onChange={e => onChangeFile(e)}/>
          {/* {authenticated.loggedIn && !loading ? <img src={data.headshot} /> : null} */}
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}
