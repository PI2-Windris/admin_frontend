import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CFormGroup, CLabel, CSelect, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios'

const Generator = ({match}) => {
  const [generatorsData, setGeneratorsData] = useState([])
  const [users, setUsers] = useState([])
  const [selectedValue, setSelectedValue] = useState(-1)
  const history = useHistory()

  const handleSelectValueChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const handleSelectClick = () => {
    const token = sessionStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    };

    const postObject = {
      "userId": users[selectedValue].id,
      "generatorId": generator._id,
    }

    console.log(postObject)

    axios
      .post('http://localhost:8001/generator',postObject, config)
      .then(response => {
        history.push('/generators')
      })

  }

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    };

    axios
      .get('http://localhost:8001/user_service/users', config)
      .then(response => {
        console.log(response)
        setUsers(response.data)
      })

    axios
      .get('http://localhost:8001/generator', config)
      .then(response => {
        // console.log(response)
        setGeneratorsData(response.data)
      })
    }, [])

  const generator = generatorsData.find( generator => generator._id.toString() === match.params.id)

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Página do Gerador
          </CCardHeader>
          <CCardBody>
          <CRow>
            {generator ? <h3 style={{'marginLeft':10}} ><strong>Gerador ID: </strong>{generator._id}</h3> : <h3></h3>}
            </CRow>
          <CRow>
            {generator ? <h3 style={{'marginLeft':15}}><strong>Latitude: </strong>{generator.location.latitude}</h3> : <h3></h3>}  
          </CRow>
          <CRow>
            {generator ? <h3 style={{'marginLeft':15, 'marginBottom': 30}}><strong>Longitude: </strong>{generator.location.longitude}</h3> : <h3></h3>}  
          </CRow>
          <CRow>
            <CCol>
            
              <h4><strong>Associar Usuário: </strong></h4>
              </CCol>
            <CCol>
              <CSelect value={selectedValue} onChange={handleSelectValueChange} custom name="select" id="select">
              <option value="-1">Selecionar usuário</option>
                {users.map((user, index) => {
                      return (
                        <option value={index}>{user.name}</option>
                      )
                    })}
              </CSelect>
            </CCol>
            <CCol>
              <CButton onClick={handleSelectClick}  size="md" color="primary"><CIcon name="cil-scrubber" /> Enviar</CButton>
            </CCol>
          </CRow>  
            </CCardBody>
        </CCard>
      </CCol>
        
      </CRow>
          
        
 
    
  )
}

export default Generator
