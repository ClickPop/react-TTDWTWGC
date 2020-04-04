import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client'
import {useHistory, Link} from 'react-router-dom';
import {GlobalContext} from '../../context/GlobalState';

const REGISTER = gql`
    mutation register($email: String!, $password: String!) {
        register(email: $email, password: $password) {
            user {
                id
            }
        }
    }
`;

export const Register = () => {

    const history = useHistory();
    const {setAuthenticated} = useContext(GlobalContext);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [login, {error}] = useMutation(REGISTER, {
        errorPolicy: 'all',
        onCompleted: (data) => {
            setAuthenticated({loggedIn: true, id: data.register.user.id});
            history.push('/contributorinfo');
        },
    });

    const onChange = e => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        login({
            variables: {
                email: loginData.email,
                password: loginData.password
            }
        });
    }

    return (
        <div style={{width: '40vw'}}>
            <h1>Register</h1>
            {error && error.message.includes('User already exists') && 
            <div className='alert alert-danger'>
                <h4 className='pt-2'>User Already exists</h4>
                <Link to='/login'>Please login</Link>
            </div>}
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" name="email" id="email" onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" id="password" pattern="\S{6,}" onChange={e => onChange(e)} required />
                    <small>Must be at least 6 characters</small>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
