import styled from 'styled-components'
import { Drawer as DrawerBase } from '@material-ui/core'

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`
export const RightPanel = styled.div`
  flex-grow: 1;
  min-width: 0;
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
  width: 100%;
  flex-wrap: wrap;
  word-wrap: break-word;
  overflow: scroll;
`