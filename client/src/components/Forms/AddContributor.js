import React, { useContext } from 'react'
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';
import { InitialContributor, GlobalContext } from '../../context/GlobalState';

const addContributor = gql`
    mutation(
      $name: String!, 
      $website: String,
      $twitter: String,
      $other: String,
      $bio: String,
      $email: String!
      $headshot: Upload) {
        createContributor(contributor: {
          name: $name, 
          website: $website, 
          twitter: $twitter, 
          other: $other,
          bio: $bio,
          email: $email
          headshot: $headshot
        }) {
            id
            name
            website
            twitter
            other
            bio
            email
        }
    }
`;

export const AddContributor = () => {
  const {contributorData, setContributorData} = useContext(GlobalContext);
  const [createContributor, {data, loading, error}] = useMutation(addContributor);

  const onChangeText = (e) => {
    const {id, value} = e.target;
    setContributorData({...contributorData, [id]: value});
    console.log(contributorData);
  }

  const onChangeFile = (e) => {
    const [file] = e.target.files;
    setContributorData({...contributorData, headshot: file});
    console.log(contributorData);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(contributorData);
    createContributor({
      variables: contributorData
    });
    setContributorData(InitialContributor);
  }
  
  return (
    <div>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id='name' placeholder='Your name' onChange={e => onChangeText(e)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" id='email' placeholder='Your email' onChange={e => onChangeText(e)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea type="text" className="form-control" id='bio' placeholder='Tell us something about yourself' onChange={e => onChangeText(e)}/>
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input type="text" className="form-control" id='website' placeholder='Your website' onChange={e => onChangeText(e)}/>
        </div>
        <div className="form-group">
          <label htmlFor="twitter">Twitter</label>
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
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}
