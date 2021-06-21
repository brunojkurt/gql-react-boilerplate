import styled from 'styled-components'
import { Drawer as DrawerBase, AppBar as AppBarBase, Toolbar } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`
export const AppBar = styled(AppBarBase)`
  background-color: ${(props) => `${props.background} !important`};
`
export const PanelToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`
export const RightPanel = styled.div`
  flex-grow: 1;
  min-width: 0;
  @media (max-width: 600px) {
    min-width: 100vw;
  }
`
export const Drawer = styled(DrawerBase)`
  .MuiDrawer-paperAnchorLeft{
    @media (max-width: 600px) {
      width: ${(props) => props.draweropen ? `${props.drawerwidth}px` : '0'};
      transition: all 0.3s ease;
      overflow-x: hidden;
      position: relative;
      height: 100vh;
    }
    @media (min-width: 601px) {
      width: ${(props) => props.draweropen ? `${props.drawerwidth}px` : '58px'};
      transition: all 0.3s ease;
      overflow-x: hidden;
      position: relative;
      height: 100vh;
    }
    ul {
      padding: 0;
    }
  }
`
export const LogoWrapper = styled(Toolbar)`
  padding: 5px !important;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-content: center;
`
export const Content = styled.div`
  flex: 1;
  flex-wrap: wrap;
  word-wrap: break-word;
  margin: 15px;
`
export const Link = styled(RouterLink)`
  text-decoration: none;
`
