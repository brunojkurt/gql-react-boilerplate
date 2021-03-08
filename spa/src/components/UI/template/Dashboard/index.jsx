import React, { useState } from 'react'
import { FormControlLabel, Switch as SwitchButton, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { IoIosHome } from 'react-icons/io'
import { FiMenu, FiLogOut } from 'react-icons/fi'
import { Router, Switch, Route, useHistory, useLocation } from 'react-router-dom'

import { Root, Drawer, RightPanel, Content, AppBar, LogoWrapper, PanelToolBar } from './styles'
import { useTheme } from '../../../../store/theme'
import { useAuthContext } from '../../../../store/auth'

const Dashboard = (props) => {
  const { routes, children } = props
  const [open, setOpen] = useState(false)

  const { palette, methods } = useTheme()
  const { setTheme, currentTheme } = methods
  const history = useHistory()
  const { logout } = useAuthContext()

  const drawerWidth = 240

  const switchTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <Router history={history}>
      <Root>
        <Drawer
          variant="permanent"
          anchor="left"
          draweropen={open ? 1 : 0}
          drawerwidth={drawerWidth}>
          <LogoWrapper>
            <Typography
              variant="h6"
              align="center">
              {open ? 'GQL-BOILERPLATE' : 'GQL'}
            </Typography>
          </LogoWrapper>
          <List>
            <ListItem
              button
              selected={useLocation().pathname === '/dashboard'}
              onClick={() => history.push('/dashboard')}>
              <ListItemIcon>
                <IoIosHome size={24}/>
              </ListItemIcon>
              <ListItemText>
                Início
              </ListItemText>
            </ListItem>
            { routes.map(route => (
              <ListItem
                key={route.url}
                button
                selected={useLocation().pathname === `/dashboard/${route.url}`}
                onClick={() => history.push(`/dashboard/${route.url}`)}>
                <ListItemIcon>
                  {route.icon}
                </ListItemIcon>
                <ListItemText>
                  {route.label}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <RightPanel>
          <AppBar
            background={palette.background.paper}
            position="relative"
            draweropen={open ? 1 : 0}
            drawerwidth={drawerWidth}>
            <PanelToolBar >
              <IconButton
                onClick={() => setOpen(!open)}
                edge="start"
                color="default"
                aria-label="menu">
                <FiMenu size={22} />
              </IconButton>
              <div>
                <FormControlLabel
                  control={<SwitchButton checked={currentTheme === 'dark'} onChange={switchTheme} />}
                  label={<Typography color="textPrimary">Dark Theme</Typography>}/>
                <IconButton
                  onClick={() => logout()}
                  edge="end"
                  color="default"
                  aria-label="logout">
                  <FiLogOut size={20} />
                </IconButton>
              </div>
            </PanelToolBar>
          </AppBar>
          <Content>
            <Switch>
              { routes.map(route => (
                <Route key={route.url} path={`/dashboard/${route.url}`} exact component={route.component} />
              ))}
              <Route path="*" component={() => children} />
            </Switch>
          </Content>
        </RightPanel>
      </Root>
    </Router>
  )
}

export default Dashboard