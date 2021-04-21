import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  
} from '@coreui/react'

import axios from 'axios'

const getStatusBadge = status => {
  switch (status) {
    case 0: return 'success'
    case '1': return 'danger'
    default: return 'primary'
  }
}

const Generators = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [generatorsData, setGeneratorsData] = useState([])

  const [details, setDetails] = useState([])
  // const [items, setItems] = useState(usersData)

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/generators?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    };

    axios
      .get('http://localhost:8001/generator', config)
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
            Geradores
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={generatorsData}
            fields={[
              { key: '_id', label: 'Id do Gerador', _classes: 'font-weight-bold' },
              { key: '__v', label: 'Status'},
            ]}
            hover
            striped
            clickableRows
            onRowClick={(item) => history.push(`/generators/${item._id}`)}
            itemsPerPage={5}
            activePage={page}
            scopedSlots = {{
              '__v':
                (item)=>(
                  <td>
                    <CBadge color={getStatusBadge(item.__v)}>
                      {'ON'}
                    </CBadge>
                  </td>
                ),
              }
            }
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={3}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Generators
