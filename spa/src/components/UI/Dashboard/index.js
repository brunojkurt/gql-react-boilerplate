import React, { useState } from 'react'
import { Toolbar, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { IoIosHome, IoMdMenu } from 'react-icons/io'
import { Root, Drawer, AppBar, RightPanel, Content } from './styles'

const Dashboard = (props) => {
  const { title } = props
  const [open, setOpen] = useState(false)

  const drawerWidth = 240

  return (
    <Root>
      <Drawer
        variant="permanent"
        anchor="left"
        $drawerOpen={open}
        $drawerWidth={drawerWidth}>
        <List>
          <ListItem button>
            <ListItemIcon>{<IoIosHome size={24} />}</ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
      </Drawer>
      <RightPanel>
        <AppBar
          position="relative"
          $drawerOpen={open}
          $drawerWidth={drawerWidth}>
          <Toolbar >
            <IconButton
              onClick={() => setOpen(!open)}
              edge="start"
              color="inherit"
              aria-label="menu">
              <IoMdMenu />
            </IconButton>
            { title && (
              <Typography variant="h6">
                { title }
              </Typography>
            ) }
          </Toolbar>
        </AppBar>
        <Content>
          <h1>
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        </h1>
        </Content>
      </RightPanel>
    </Root>
  )
}

export default Dashboard