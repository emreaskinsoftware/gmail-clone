import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  List, 
  ListItemIcon, 
  ListItemText,
  ListItemButton,
  Collapse,
  IconButton,
  Tooltip,
  Button
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CreateIcon from '@mui/icons-material/Create';
// Kategori ikonları
import AllInboxIcon from '@mui/icons-material/AllInbox';
import WarningIcon from '@mui/icons-material/Warning';
import CampaignIcon from '@mui/icons-material/Campaign';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReceiptIcon from '@mui/icons-material/Receipt';

const SidebarOption = styled(ListItemButton)<{ isCollapsed?: boolean }>(({ theme, isCollapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '36px',
  padding: isCollapsed ? '0 12px' : '0 12px 0 26px',
  borderStartEndRadius: '18px',
  borderEndEndRadius: '18px',
  justifyContent: isCollapsed ? 'center' : 'flex-start',
  marginTop: '4px',
  marginBottom: '4px',
  "&.Mui-selected": {
    backgroundColor: '#d3e3fd',
    fontWeight: 'bold',
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main
    },
    "& .MuiListItemText-primary": {
      fontWeight: 'bold',
      color: theme.palette.primary.main
    }
  },
  "&:hover": {
    backgroundColor: '#eaebef',
  }
}));

// Kategoriler
const categories = [
  { id: 0, label: "Tüm e-postalar", icon: <AllInboxIcon fontSize="small" />, value: "all" },
  { id: 1, label: "Şüpheli içerik barındıran", icon: <WarningIcon fontSize="small" />, value: "suspicious" },
  { id: 2, label: "Pazarlama/Reklam", icon: <CampaignIcon fontSize="small" />, value: "marketing" },
  { id: 3, label: "Bilgilendirme", icon: <InfoIcon fontSize="small" />, value: "info" },
  { id: 4, label: "Kişisel iletişim", icon: <PersonIcon fontSize="small" />, value: "personal" },
  { id: 5, label: "İş/profesyonel iletişim", icon: <BusinessIcon fontSize="small" />, value: "business" },
  { id: 6, label: "Abonelik bildirimleri", icon: <NotificationsIcon fontSize="small" />, value: "subscription" },
  { id: 7, label: "Fatura finansal bildirimler", icon: <ReceiptIcon fontSize="small" />, value: "financial" }
];

interface SidebarProps {
  isCollapsed?: boolean;
  onCategoryChange?: (category: string) => void;
  onComposeClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onCategoryChange, onComposeClick }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [labelsOpen, setLabelsOpen] = useState(true);
  const [moreOpen, setMoreOpen] = useState(false);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    // Kategori değişikliğini parent bileşene bildir
    if (onCategoryChange) {
      onCategoryChange(categories[index].value);
    }
  };

  const toggleLabels = () => {
    setLabelsOpen(!labelsOpen);
  };

  const toggleMore = () => {
    setMoreOpen(!moreOpen);
  };

  return (
    <Box sx={{ 
      backgroundColor: 'white', 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #f1f3f4',
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      transition: 'width 0.3s ease',
      pt: 2,
      px: 2
    }}>
      <Button
        variant="contained"
        startIcon={<CreateIcon />}
        onClick={onComposeClick}
        sx={{
          backgroundColor: '#c2e7ff',
          color: '#001d35',
          borderRadius: '24px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1.1rem',
          boxShadow: '0 1px 3px 0 rgba(60,64,67,0.302)',
          px: 3,
          py: 1.5,
          mb: 2,
          width: '100%',
          justifyContent: 'flex-start',
          '&:hover': {
            backgroundColor: '#b3d1ff',
            boxShadow: '0 1px 3px 0 rgba(60,64,67,0.302)',
          }
        }}
      >
        Oluştur
      </Button>
      <List disablePadding sx={{ pt: 1, pb: 1 }}>
        {categories.map((category) => (
          <Tooltip 
            key={category.id} 
            title={isCollapsed ? category.label : ""} 
            placement="right"
          >
            <SidebarOption 
              selected={selectedIndex === category.id}
              onClick={() => handleListItemClick(category.id)}
              isCollapsed={isCollapsed}
            >
              <ListItemIcon sx={{ minWidth: isCollapsed ? '0' : '20px', marginRight: isCollapsed ? '0' : '18px' }}>
                {category.icon}
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText primary={category.label} />
              )}
            </SidebarOption>
          </Tooltip>
        ))}
        
        <Tooltip title={isCollapsed ? "Diğer" : ""} placement="right">
          <SidebarOption 
            onClick={toggleMore}
            isCollapsed={isCollapsed}
          >
            <ListItemIcon sx={{ minWidth: isCollapsed ? '0' : '20px', marginRight: isCollapsed ? '0' : '18px' }}>
              {moreOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary="Diğer" />}
          </SidebarOption>
        </Tooltip>

        <Collapse in={moreOpen && !isCollapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <SidebarOption 
              sx={{ pl: 7 }}
            >
              <ListItemText primary="Ertelenenler" />
            </SidebarOption>
            <SidebarOption 
              sx={{ pl: 7 }}
            >
              <ListItemText primary="Gönderilenler" />
            </SidebarOption>
            <SidebarOption 
              sx={{ pl: 7 }}
            >
              <ListItemText primary="Spam" />
            </SidebarOption>
            <SidebarOption 
              sx={{ pl: 7 }}
            >
              <ListItemText primary="Çöp Kutusu" />
            </SidebarOption>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default Sidebar; 