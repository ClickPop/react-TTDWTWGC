import React, {useContext} from 'react'
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';
import { InitialContributor, GlobalContext } from '../../context/GlobalState';

const newActivity = gql`
  query(
    $title: String!, 
    $description: String,
    $url: String,
    $activity_type: [String!]!,
    $audience: [String!]!,
    $contributors: [String]) {
      addActivity(activity: {
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

export default function AddActivity() {
  return (
    <div>
      
    </div>
  )
}
