import React from 'react'
import {withFormik, Form, Field} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

//redux
import {connect, useSelector} from 'react-redux'
import {loginStart, loginSuccess, loginFail} from '../../store/actions'

//styles
import {FormContainer} from '../styled-components/form'
import * as color from '../../styles/color'

//component
import Loader from 'react-loader-spinner'

const errorDiv = {
  marginTop: '40px',
  height: '60px',
  fontSize: '2rem',
  color: 'red',
  background: 'pink',
}

const loaderStyle = {
  height: '100%',
  width: '100%',
  background: 'rgb(0,0,0,.8)',
  position: 'fixed',
  bottom: '0',
  Zindex: '2',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

function Login({touched, errors, status}) {
  const loggingStatus = useSelector(state => state.login.loggingStatus)

  return (
    <>
      {loggingStatus ? (
        <div style={loaderStyle}>
          <Loader type="Oval" color={color.spinner} height={150} width={150} />
        </div>
      ) : (
        <span></span>
      )}
      {status && <div style={errorDiv}>{status.message}</div>}
      <FormContainer>
        <Form className="form">
          <div
            style={{
              backgroundColor: color.primary,
              marginBottom: '3rem',
              padding: '1rem',
            }}
          >
            <h1 style={{color: 'black'}}>DEMO LOGIN</h1>
            <p style={{color: 'black', fontSize: '1.5rem'}}>
              username: demo123
            </p>
            <p style={{color: 'black', fontSize: '1.5rem'}}>
              password: demo123
            </p>
          </div>
          <p style={{color: 'red'}}>{touched.user_name && errors.user_name}</p>
          <div className="ui input">
            <Field
              placeholder="Enter your username"
              name="user_name"
              type="text"
            />
          </div>
          <p style={{color: 'red'}}>{touched.password && errors.password}</p>
          <div className="ui input">
            <Field placeholder="Password" name="password" type="password" />
          </div>
          <br />
          <button color="black" type="sumbmit">
            Login
          </button>
          <br />
        </Form>
      </FormContainer>
    </>
  )
}

const FormikRegister = withFormik({
  mapPropsToValues({user_name, password}) {
    return {
      user_name: user_name || '',
      password: password || '',
    }
  },
  validationSchema: Yup.object().shape({
    user_name: Yup.string().required('Username is a required field'),
    password: Yup.string().required('Password is a required field'),
  }),

  handleSubmit(values, props) {
    props.props.loginStart()
    axios
      .post(`https://project-use-my-tools.herokuapp.com/api/user/login`, values)
      .then(res => {
        props.props.loginSuccess(values)
        console.log(res)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', values.user_name)
        props.props.history.push(`/marketplace/${values.user_name}`)
      })
      .catch(err => {
        props.props.loginFail(err)
        console.log('err', err)
        props.setStatus({message: 'Invalid Username or Password'})
      })
    props.resetForm()
  },
})(Login)

export default connect(null, {loginStart, loginSuccess, loginFail})(
  FormikRegister,
)
