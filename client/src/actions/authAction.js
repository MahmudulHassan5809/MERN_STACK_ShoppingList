import axios from 'axios';
import { returnErrors } from './errorAction'
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';


//Check Token & Load User
export const loadUser = () => (dispatch,getState) => {
	// User Loading
	dispatch({ type: USER_LOADING });

	axios.get('/api/auth/current', tokenConfig(getState))
		.then(res => {
			dispatch({
				type: USER_LOADED,
	        	payload: res.data
			})
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data,err.response.status));
			dispatch({
				type: AUTH_ERROR
			});
		});

}

// Register User
export const register = ({ name , email , password}) => dispatch => {
	//Headers
	const config = {
		headers: {
			'Content-type' : 'application/json'
		}
	}

	//Request Body
	const body = JSON.stringify({name,email,password});
	axios.post('/api/users',body,config)
		.then(res => dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		}))
		.catch(err => {
			dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'));
			dispatch({
				type: REGISTER_FAIL
			});
		});
}

// Logout

export const logout = () =>{
	return {
		type: LOGOUT_SUCCESS
	}
}

//Login
export const login = ({email , password}) => dispatch => {
	//Headers
	const config = {
		headers: {
			'Content-type' : 'application/json'
		}
	}

	//Request Body
	const body = JSON.stringify({email,password});
	axios.post('/api/auth',body,config)
		.then(res => dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		}))
		.catch(err => {
			dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'));
			dispatch({
				type: LOGIN_FAIL
			});
		});
}


// SetUp Config/Headers and token
export const tokenConfig = getState =>{
	//Get Token from LoaclStorage
	const token = getState().auth.token;
	//Headers
	const config = {
		headers : {
			"Content-type":"application/json"
		}
	}
	// if token , add to headers
	if(token){
		config.headers['x-auth-token'] = token;
	}

	return config;
}
