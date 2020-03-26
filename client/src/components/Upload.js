import React, {useCallback} from 'react';
import { useMutation } from '@apollo/react-hooks';
import {useDropzone} from 'react-dropzone';

import gql from 'graphql-tag';

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const Upload = () => {
  console.log(uploadFileMutation);
  const [uploadFile] = useMutation(uploadFileMutation);

  const onDrop = useCallback(
    ([file]) => {
      uploadFileMutation({variables: {file}});
    },
    [uploadFile]
  );
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (   
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drop files here</p>
    </div>
  );
}
