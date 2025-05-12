import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import { Box, ThemeProvider, createTheme, useMediaQuery, IconButton, InputBase, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ComposeModal from './components/ComposeModal';
import Login from './Login';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface User {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b57d0',
    },
    secondary: {
      main: '#ea4335',
    },
    info: {
      main: '#1a73e8',
    }
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  // Mobil görünümde varsayılan olarak sidebar'ı kapalı tut
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const sidebarWidth = 256;
  const collapsedSidebarWidth = 70;

  const handleLogin = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        {/* Header with Menu, Logo and Search Bar */}
        <Box sx={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 16px',
          borderBottom: '1px solid #f1f3f4',
          backgroundColor: 'white',
          gap: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <img 
              src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" 
              alt="Gmail" 
              height="40px"
            />
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 600,
                maxWidth: '100%',
                backgroundColor: '#f1f3f4',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#e8eaed',
                  boxShadow: '0 1px 3px 0 rgba(60,64,67,.3)',
                },
              }}
            >
              <IconButton sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search mail"
                value={searchQuery}
                onChange={handleSearch}
                inputProps={{ 'aria-label': 'search mail' }}
              />
            </Paper>
          </Box>
          {/* Sağ üstte avatar ve menü */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton onClick={handleAvatarClick} sx={{ ml: 2 }}>
              <Avatar 
                src={user.picture}
                alt={user.name}
                sx={{ width: 40, height: 40, fontWeight: 700 }}
              >
                {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
              </Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
              <MenuItem disabled>{user.name || user.email}</MenuItem>
              <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>Çıkış Yap</MenuItem>
            </Menu>
          </Box>
        </Box>
        
        <Box className="app__body" sx={{ position: 'relative', height: 'calc(100vh - 64px)' }}>
          {/* Kenar Menüsü */}
          <Box 
            sx={{ 
              width: sidebarOpen ? `${sidebarWidth}px` : `${collapsedSidebarWidth}px`,
              position: 'absolute', 
              zIndex: 100,
              height: '100%',
              transition: 'width 0.3s ease',
              boxShadow: isMobile ? '0 0 10px rgba(0, 0, 0, 0.2)' : 'none',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              pt: 2,
              px: 2
            }}
          >
            <Sidebar 
              isCollapsed={!sidebarOpen} 
              onCategoryChange={handleCategoryChange}
              onComposeClick={() => setComposeOpen(true)}
            />
          </Box>
          
          {/* E-posta Listesi */}
          <Box 
            sx={{ 
              flex: 1,
              position: 'absolute',
              left: sidebarOpen ? `${sidebarWidth}px` : `${collapsedSidebarWidth}px`,
              right: 0,
              bottom: 0,
              top: 0,
              transition: 'left 0.3s ease',
              overflow: 'hidden'
            }}
          >
            <EmailList selectedCategory={selectedCategory} searchQuery={searchQuery} />
          </Box>
        </Box>
        <ComposeModal open={composeOpen} onClose={() => setComposeOpen(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;
