import { MainRoutes } from '../../navigation/routes'
import { useLocation, useNavigate } from 'react-router';

// MUI
import { Avatar, Box, Card, CardActionArea, CardContent, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ToggleButton, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { blue, grey } from '@mui/material/colors';
import { IconApps, IconChevronRight, IconPlaylistAdd } from '@tabler/icons';
import { ArrowLeft } from '@mui/icons-material';
import { useMemo } from 'react';
import { useIsTablet } from '../../hooks/useDevice';

type IProps = {
  onClose: () => void
}

const Sidebar = ({ onClose }: IProps) => {

  // Hooks
  const navigate = useNavigate()
  const location = useLocation()
  const routes = MainRoutes()
  const isTablet = useIsTablet()

  // Variables
  const isDashboard = useMemo(() => location.pathname.split("/")[1] === 'dashboard', [location])

  return (
    <Stack sx={{ py: 4, pb: 0, height: '100vh', justifyContent: "stretch" }}>

      {/* Header */}
      <Stack sx={{ px: 4 }} direction="row" spacing={2} alignItems="center">
        <Avatar 
          sx={{ 
            bgcolor: blue[500], 
            borderRadius: "14px !important",
            outline: isTablet ? "none" : "6px solid #00000010",
            width: 36, height: 36,
            fontSize: 15, fontWeight: 600
          }}
        >
          IĐ
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontSize: 16, width: '100%' }}>
          Ivan Đolo 📗
        </Typography>
        {
          isTablet &&
            <IconButton onClick={onClose}>
              <ArrowLeft/>
            </IconButton>
        }
      </Stack>

      {/* Dashboard route */}
      <Stack sx={{ px: 2, mt: 5, mb: 2 }}>
        <Card 
          onClick={() => (navigate('dashboard'), onClose())}
          elevation={0}
          sx={{ 
            backgroundColor: isDashboard ? blue[100] : grey[200], 
            borderRadius: 2
          }} 
        >
          <CardActionArea sx={{ py: "2px" }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ backgroundColor: "white !important", borderRadius: 2, p: 1, pt: 1.1, pb: .8 }}>
                  <IconApps 
                    stroke={2.1} 
                    size="1.3rem" 
                    color={isDashboard ? blue[800] : grey[800]} 
                  />
                </Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontSize: 14,
                    color: isDashboard ? blue[800] : grey[800],
                    fontWeight: 500,
                    width: '100%'
                  }}
                >
                  Početna stranica
                </Typography>
                <IconChevronRight 
                  stroke={2.1} 
                  size="1.3rem" 
                  color={isDashboard ? blue[800] : grey[800]} 
                />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>

      {/* Routes list */}
      <Stack sx={{ mt: 3 }}>
        {/* Title */}
        <Typography 
          variant="caption" 
          sx={{ fontSize: 12, color: blue[800], ml: 4, fontWeight: 600, opacity: .75 }}
        >
          Lekcije 📒
        </Typography>
        {/* List */}
        <List>
          { routes.children?.filter(route => route.showOnSidebar).map((route, index) => {
            let selected: boolean = location.pathname.split("/")[1] === route.path
            return(
              <ListItem key={index} sx={{ mb: -1 }}>
                <ListItemButton 
                  dense
                  onClick={() => (navigate(route.path), onClose())}
                  selected={selected}
                  sx={{
                    "&.Mui-selected": { backgroundColor: blue[50] },
                    "&.Mui-selected:hover": { backgroundColor: blue[100] },
                    borderRadius: 2.5, py: 1
                  }}
                >
                  <ListItemIcon>
                    { route.icon ?? null }
                  </ListItemIcon>
                  <ListItemText 
                    primary={route.name} 
                    sx={{ 
                      ml: -3, opacity: selected ? 1 : .75 
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Stack>

      <Box sx={{ flex: 1 }} />

      {/* Tests */}
      <Stack direction="column" sx={{ mx: 2, mt: 4 }} spacing={2}>
        {/* Title */}
        <Typography 
          variant="caption" 
          sx={{ fontSize: 12, color: blue[800], ml: 1, fontWeight: 600, opacity: .75 }}
        >
          Brzi testovi 🔔
        </Typography>

        {/* Set CTA */}
        <Stack direction="row" justifyContent="space-between">
          <ToggleButton onClick={() => (navigate('test/addition'), onClose())} value="addition" sx={{ borderRadius: 50, width: 48, height: 48 }}>
            <Typography variant="subtitle1">➕</Typography>
          </ToggleButton>
          <ToggleButton onClick={() => (navigate('test/subtraction'), onClose())} value="subtraction" sx={{ borderRadius: 50, width: 48, height: 48 }}>
            <Typography variant="subtitle1">➖</Typography>
          </ToggleButton>
          <ToggleButton onClick={() => (navigate('test/division'), onClose())} value="division" sx={{ borderRadius: 50, width: 48, height: 48 }}>
            <Typography variant="subtitle1">➗</Typography>
          </ToggleButton>
          <ToggleButton onClick={() => (navigate('test/multiplication'), onClose())} value="multiplication" sx={{ borderRadius: 50, width: 48, height: 48 }}>
            <Typography variant="h6" sx={{ opacity: .85 }}>✖</Typography>
          </ToggleButton>
        </Stack>

        {/* New CTA */}
        <Card
          onClick={() => (navigate('test/custom'), onClose())}
          elevation={0}
          sx={{ height: 200, width: "100%", borderRadius: 4, border: "2px dashed #ccc", backgroundColor: "#eee" }}
        >
          <CardActionArea style={{ height: "100%" }}>
            <Stack 
              alignItems="center" justifyContent="center" spacing={1}
            >
              <Stack 
                alignItems="center" justifyContent="center" 
                sx={{ width: 40, height: 40, borderRadius: 50, backgroundColor: blue[500] }}
              >
                <IconPlaylistAdd color="white" />
              </Stack>
              <Typography variant="subtitle2">
                Novi test 🖍
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ maxWidth: '85%', textAlign: "center", fontSize: 13, fontWeight: 300, opacity: .75 }}
              >
                Stvorite novi test koristeći različite matematičke operacije
              </Typography>
            </Stack>
          </CardActionArea>
        </Card>
        {/* Padding bottom */}
        <Box sx={{ height: 6 }} />
      </Stack>      
    </Stack>
  )
}

export default Sidebar