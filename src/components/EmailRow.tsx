import React, { useState } from 'react';
import { 
  Box, 
  Checkbox, 
  IconButton, 
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import AttachmentIcon from '@mui/icons-material/Attachment';

interface EmailRowProps {
  id: number;
  sender: string;
  subject: string;
  time: string;
  read: boolean;
  attachment?: string;
  selected: boolean;
  onSelect: () => void;
  onMarkAsRead: () => void;
}

const EmailRow: React.FC<EmailRowProps> = ({ 
  id, 
  sender, 
  subject, 
  time, 
  read, 
  attachment, 
  selected,
  onSelect,
  onMarkAsRead
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };
  
  const handleRowClick = () => {
    if (!read) {
      onMarkAsRead();
    }
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 16px', 
          borderBottom: '1px solid #f1f3f4',
          height: '40px',
          cursor: 'pointer',
          backgroundColor: selected ? '#c2dbff' : read ? 'transparent' : '#f2f6fc',
          '&:hover': {
            boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
            zIndex: 1
          }
        }}
        onClick={handleRowClick}
      >
        <Checkbox 
          size="small" 
          color="default" 
          sx={{ p: 0.5 }} 
          checked={selected} 
          onClick={handleCheckboxClick}
        />
        
        <Box 
          sx={{ 
            display: 'flex', 
            overflow: 'hidden',
            flexGrow: 1,
            ml: 1
          }}
        >
          <Typography 
            sx={{ 
              minWidth: '200px',
              maxWidth: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: read ? 'normal' : 'bold',
              fontSize: '14px',
              color: read ? '#5f6368' : '#202124'
            }}
          >
            {sender}
          </Typography>
          
          <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden', alignItems: 'center' }}>
            <Typography 
              sx={{ 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: '14px',
                fontWeight: read ? 'normal' : 'bold',
                color: read ? '#5f6368' : '#202124',
              }}
            >
              {subject}
            </Typography>
            
            {attachment && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, flexShrink: 0 }}>
                <AttachmentIcon fontSize="small" sx={{ color: '#5f6368', fontSize: '16px' }} />
                <Chip 
                  label={attachment} 
                  size="small" 
                  sx={{ 
                    height: '20px', 
                    fontSize: '12px',
                    backgroundColor: '#eaf1fb',
                    color: '#5f6368',
                    ml: 0.5
                  }} 
                />
              </Box>
            )}
          </Box>
        </Box>
        
        <Typography 
          sx={{ 
            fontSize: '12px', 
            fontWeight: read ? 'normal' : 'bold',
            color: read ? '#5f6368' : '#202124',
            ml: 2,
            minWidth: '50px',
            textAlign: 'right'
          }}
        >
          {time}
        </Typography>
      </Box>
      
      {/* E-posta İçeriği Diyaloğu */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        fullWidth 
        maxWidth="md"
      >
        <DialogTitle sx={{ borderBottom: '1px solid #f1f3f4', p: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {subject}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3, pb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Gönderen:</Typography>
              <Typography>{sender}</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">{time}</Typography>
          </Box>

          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, backgroundColor: '#f8f9fa', mb: 2 }}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              Merhaba,
              
              {subject.includes("Etik Kurul") ? `
              
              Bu e-posta, Etik Kurul başvurunuzla ilgili bilgilendirme amacıyla gönderilmiştir.
              
              Başvurunuz alınmış olup, 10 iş günü içerisinde değerlendirilecektir. Değerlendirme sürecinde ek bilgi ya da belge talep edilebilir.
              
              Herhangi bir sorunuz olması durumunda lütfen iletişime geçmekten çekinmeyin.
              
              Saygılarımla,
              Cem BAYDOĞAN` : 
              `              
              Bu örnek bir e-posta içeriğidir.
              
              Gmail arayüzü klonumuzu test etmek için oluşturulmuştur.
              
              Saygılarımla,
              ${sender}`}
            </Typography>
          </Paper>
          
          {attachment && (
            <Box sx={{ display: 'flex', alignItems: 'center', p: 1, border: '1px solid #dadce0', borderRadius: 1, width: 'fit-content' }}>
              <AttachmentIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">{attachment}</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmailRow; 