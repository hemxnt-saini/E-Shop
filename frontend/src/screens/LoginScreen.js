import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../actions/userActions'
import {FormContainer} from '../components/FormContainer'

const LoginScreen = () => {

    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')

    return (
        <FormContainer>
            
        </FormContainer>
    )
}

export default LoginScreen
