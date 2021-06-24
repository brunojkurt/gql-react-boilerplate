import React from 'react'
import { IoMdPeople } from 'react-icons/io'
import { Typography } from 'components/UI'
import { Dashboard as DashboardLayout } from 'components/UI/layouts'

// Dashboard components
import Users from '../Users'

const Dashboard = () => {
  const routes = [
    {
      icon: <IoMdPeople size={24} />,
      label: 'Usuários',
      url: 'users',
      component: Users
    }
  ]
  return (
    <DashboardLayout routes={routes}>
      <Typography
        variant='h4'
        color='primary'
      >
        Dashboard
      </Typography>
    </DashboardLayout>
  )
}

export default Dashboard
