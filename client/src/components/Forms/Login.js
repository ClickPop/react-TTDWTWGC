import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client'
import {useHistory} from 'react-router-dom';
import {GlobalContext} from '../../context/GlobalState';

const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                id
            }
        }
    }
`;

export const Login = () => {

    const history = useHistory();
    const {setAuthenticated} = useContext(GlobalContext);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [login, {error}] = useMutation(LOGIN, {
        errorPolicy: 'all',
        onCompleted: (data) => {
            if (data.login) {
                setAuthenticated({loggedIn: true, id: data.login.user.id});
                history.push('/');
            }
        }
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
            <h1>Login</h1>
            {error && error.message.includes('Invalid credentials') && 
            <div className='alert alert-danger'>
                <h4 className='pt-2'>Invalid Credentials</h4>
            </div>}
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" name="email" id="email" onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" id="password" onChange={e => onChange(e)} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
