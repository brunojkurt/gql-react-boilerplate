import styled from 'styled-components'
import { AppBar as AppBarBase, Drawer as DrawerBase } from '@material-ui/core'

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
`
export const RightPanel = styled.div`
  
`
export const AppBar = styled(AppBarBase)`
  @media (max-width: 600px) {
    float: right;
    transform: ${(props) => `translateX${props.$drawerWidth}px)`};
  }
  @media (min-width: 601px) {
    flex: 1;
  }
`
export const Drawer = styled(DrawerBase)`
  .MuiDrawer-paperAnchorLeft{
    @media (max-width: 600px) {
      width: ${(props) => props.$drawerOpen ? `${props.$drawerWidth}px` : '0'};
      transition: all 0.3s ease;
      overflow-x: hidden;
      position: relative;
      height: 100vh;
    }
    @media (min-width: 601px) {
      width: ${(props) => props.$drawerOpen ? `${props.$drawerWidth}px` : '58px' };
      transition: all 0.3s ease;
      overflow-x: hidden;
      position: relative;
      height: 100vh;
    }
  }
`
export const Content = styled.div`
  background-color: #CCC;
`