import React, { useState } from 'react'
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  FormControlLabel,
  Switch as SwitchButton
} from 'components/UI'
import { IoIosHome } from 'react-icons/io'
import { FiMenu, FiLogOut } from 'react-icons/fi'
import { Router, Switch, Route, useHistory, useLocation } from 'react-router-dom'

import { Root, SideMenu, RightPanel, Content, DashBar, LogoWrapper, PanelToolBar } from './styles'
import { useTheme } from 'hooks/theme'
import { useAuth } from 'hooks/auth'

const Dashboard = (props) => {
  const { routes, children } = props
  const [open, setOpen] = useState(false)

  const { palette, methods, currentTheme } = useTheme()
  const { setTheme } = methods
  const history = useHistory()
  const { logout } = useAuth()

  const drawerWidth = 240

  const switchTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <Router history={history}>
      <Root>
        <SideMenu
          variant='permanent'
          anchor='left'
          draweropen={open ? 1 : 0}
          drawerwidth={drawerWidth}
        >
          <LogoWrapper>
            <Typography
              color='primary'
              variant='h6'
              align='center'
            >
              {open ? 'GQL-BOILERPLATE' : 'GQL'}
            </Typography>
          </LogoWrapper>
          <List>
            <ListItem
              button
              selected={useLocation().pathname === '/dashboard'}
              onClick={() => history.push('/dashboard')}
            >
              <ListItemIcon>
                <IoIosHome color={palette.primary.main} size={24} />
              </ListItemIcon>
              <ListItemText>
                <Typography color='primary'>
                  Início
                </Typography>
              </ListItemText>
            </ListItem>
            {routes.map(route => (
              <ListItem
                key={route.url}
                button
                selected={useLocation().pathname === `/dashboard/${route.url}`}
                onClick={() => history.push(`/dashboard/${route.url}`)}
              >
                <ListItemIcon>
                  <Typography color='primary'>
                    {route.icon}
                  </Typography>
                </ListItemIcon>
                <ListItemText>
                  <Typography color='primary'>
                    {route.label}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </SideMenu>
        <RightPanel>
          <DashBar
            position='relative'
            draweropen={open ? 1 : 0}
            drawerwidth={drawerWidth}
          >
            <PanelToolBar>
              <IconButton
                onClick={() => setOpen(!open)}
                edge='start'
                color='primary'
                aria-label='menu'
              >
                <FiMenu size={22} />
              </IconButton>
              <div>
                <FormControlLabel
                  control={<SwitchButton checked={currentTheme === 'dark'} onChange={switchTheme} />}
                  label={<Typography color='textPrimary'>Dark Theme</Typography>}
                />
                <IconButton
                  onClick={() => logout()}
                  edge='end'
                  color='primary'
                  aria-label='logout'
                >
                  <FiLogOut size={20} />
                </IconButton>
              </div>
            </PanelToolBar>
          </DashBar>
          <Content>
            <Switch>
              {routes.map(route => (
                <Route key={route.url} path={`/dashboard/${route.url}`} exact component={route.component} />
              ))}
              <Route path='*' component={() => children} />
            </Switch>
          </Content>
        </RightPanel>
      </Root>
    </Router>
  )
}

export default Dashboard
