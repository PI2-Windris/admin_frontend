import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCol,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormGroup,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CButton,
  CAlert     
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import axios from 'axios'

const CreateUser = () => {
  const history = useHistory()
  const [generatorsData, setGeneratorsData] = useState([])

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [failAlert, setFailAlert] = useState(false)
  const [successAlert, setSuccessAlert] = useState(false)

  const token = sessionStorage.getItem('token');

    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    };

  const handleClick = (event) => {
    event.preventDefault();

    const loginObject = {
      password: password,
      email: email,
      name: username
    }

    axios
      .post('http://localhost:8001/user_service/users', loginObject, config)
      .then(response => {
        console.log(response)
        if('err' in response.data) {
          setFailAlert(true)
        } else {
          setSuccessAlert(true)
        }
        setUsername('')
        setPassword('')
        setEmail('')
      })
  }

  const handleUsernameChange = event => {
    event.preventDefault();
    setUsername(event.target.value);
  }

  const handlePasswordChange = event => {
    event.preventDefault();
    setPassword(event.target.value);
  }

  const handleEmailChange = event => {
    event.preventDefault();
    setEmail(event.target.value);
  }

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    };

    axios
      .get(`http://localhost:8001/generator/user/${JSON.parse(userId)}`, config)
      .then(response => {
        console.log(response)
        setGeneratorsData(response.data)
      })
    }, [])

  return (
    <CRow>
    <CCol xl={6}>
      <CCard>
        <CCardHeader>
          Cadastrar Usuários
        </CCardHeader>
        <CCardBody>
          {
          failAlert ? <CAlert color="danger">Falhou, campos incorretos.</CAlert> : 
          successAlert ? <CAlert color="success">Cadastro feito com sucesso.</CAlert>:
          null
          }
          <CForm action="" method="post">
            <CFormGroup>
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                </CInputGroupPrepend>
                <CInput onChange={handleUsernameChange} value={username} lazy={1} id="username1" name="username1" placeholder="Username" autoComplete="name"/>
              </CInputGroup>
            </CFormGroup>
            <CFormGroup>
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                </CInputGroupPrepend>
                <CInput onChange={handleEmailChange} value={email} lazy={1} type="email" id="email1" name="email1" placeholder="Email" autoComplete="username"/>
              </CInputGroup>
            </CFormGroup>
            <CFormGroup>
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                </CInputGroupPrepend>
                <CInput onChange={handlePasswordChange} value={password} lazy={1} type="password" id="password1" name="password1" placeholder="Password" autoComplete="current-password"/>
              </CInputGroup>
            </CFormGroup>
            <CFormGroup className="form-actions">
              <CButton onClick={handleClick} type="submit" size="md" color="success">Submit</CButton>
            </CFormGroup>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  )
}

export default CreateUser
