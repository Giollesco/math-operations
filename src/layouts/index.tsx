import { useState } from "react";
import { Outlet } from 'react-router-dom'

// MUI
import { CssBaseline, Container, Drawer } from '@mui/material'
import { Root, Header, EdgeSidebar, SidebarContent, Content } from "@mui-treasury/layout";

// Components
import Sidebar from './Sidebar'
import HeaderContent from './Header'

// Root style
import { scheme, initialState } from './root-style'
import { useIsTablet } from "../hooks/useDevice";

export default function AppLayout(){

  // Variables
  const isTablet = useIsTablet();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  // Methods
  function onClose() {
    setDrawerOpen(false)
  }

  return (
    <Root
      scheme={scheme}
      initialState={initialState}
    >
      
      <CssBaseline />
      <Header 
        style={{ 
          backgroundColor: "rgba(255,255,255,.75)", 
          height: 64
        }}>
        <HeaderContent 
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      </Header>

      {/* Sidebar */}
      {
        isTablet ? 
          <Drawer 
            open={drawerOpen}
            // onOpen={onOpen}
            onClose={onClose}
            variant="temporary"
          >
            <Sidebar 
              onClose={onClose}
            />
          </Drawer>
          :
          <EdgeSidebar anchor="left" id="left-sidebar">
            <SidebarContent id="left-sidebar" sx={{ overflowX: "hidden", overflowY: 'auto' }}>
                <Sidebar onClose={onClose}/>
              </SidebarContent>
          </EdgeSidebar>
      }
    

      {/* Content */}
      <Content>
        <Container maxWidth="lg" sx={{ pt: isTablet ? 2 : 4 }}>
          <Outlet />
        </Container>
        <div style={{ minHeight: 40 }} />
      </Content>
    </Root>
  );
};