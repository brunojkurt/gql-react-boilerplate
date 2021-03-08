import React from 'react'
import { IoMdPeople } from 'react-icons/io'
import { Dashboard as DashboardLayout } from '../../../UI'

// Dashboard components
import Users from '../Users'

const Dashboard = () => {
  const routes = [
    {
      icon: <IoMdPeople size={24}/>,
      label: "Usuários",
      url: "users",
      component: Users
    }
  ]
  return (
    <DashboardLayout routes={routes}>
      <h1>Dashboard</h1>
    </DashboardLayout>
  )
}

export default Dashboard