import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Geradores',
    to: '/generators',
    icon: <CIcon name="cilGrid" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Cadastrar clientes',
    to: '/createusers',
    icon: <CIcon name="cilUser" customClasses="c-sidebar-nav-icon"/>,
  },
  
]

export default _nav
