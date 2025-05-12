import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Typography, Tooltip, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LinkIcon from '@mui/icons-material/Link';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LockIcon from '@mui/icons-material/Lock';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

interface ComposeModalProps {
  open: boolean;
  onClose: () => void;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ open, onClose }) => {
  const [fields, setFields] = useState({ to: '', subject: '', body: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    // Burada mail gönderme işlemi yapılabilir
    setFields({ to: '', subject: '', body: '' });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          position: 'fixed',
          bottom: 32,
          right: 32,
          m: 0,
          width: 700,
          overflow: 'hidden',
          borderRadius: 3,
          boxShadow: 8,
        }
      }}
      hideBackdrop
    >
      <Paper elevation={0} sx={{ borderRadius: 3, background: '#f8fbff', p: 0 }}>
        {/* Title Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, borderBottom: '1px solid #e0e0e0', background: '#f8fbff', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
          <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 500, fontSize: 16 }}>Yeni ileti</Typography>
          <IconButton size="small"><MinimizeIcon fontSize="small" /></IconButton>
          <IconButton size="small"><OpenInFullIcon fontSize="small" /></IconButton>
          <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
        </Box>
        {/* Kimden Satırı */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pt: 1, pb: 0.5 }}>
          <Typography variant="body2" sx={{ color: '#222', fontWeight: 500, mr: 1 }}>Kimden</Typography>
          <Typography variant="body2" sx={{ color: '#444', fontWeight: 400, mr: 1 }}>Emre Aşkın &lt;emre23askin@gmail.com&gt;</Typography>
          <ArrowDropDownIcon fontSize="small" sx={{ color: '#888' }} />
        </Box>
        {/* Kime/Cc/Bcc Satırı */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pt: 1 }}>
          <TextField
            placeholder="Kime"
            name="to"
            value={fields.to}
            onChange={handleChange}
            variant="standard"
            fullWidth
            InputProps={{ disableUnderline: true, sx: { fontSize: 15, background: 'transparent' } }}
            sx={{ flex: 1 }}
          />
          <Button size="small" sx={{ minWidth: 0, color: '#1a73e8', textTransform: 'none', fontSize: 13, ml: 1 }}>Cc</Button>
          <Button size="small" sx={{ minWidth: 0, color: '#1a73e8', textTransform: 'none', fontSize: 13 }}>Bcc</Button>
        </Box>
        {/* Konu Satırı */}
        <Box sx={{ px: 2, pt: 1 }}>
          <TextField
            placeholder="Konu"
            name="subject"
            value={fields.subject}
            onChange={handleChange}
            variant="standard"
            fullWidth
            InputProps={{ disableUnderline: true, sx: { fontSize: 15, background: 'transparent' } }}
            sx={{ mb: 1 }}
          />
        </Box>
        {/* Mesaj Alanı */}
        <Box sx={{ px: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <TextField
            placeholder=""
            name="body"
            value={fields.body}
            onChange={handleChange}
            variant="standard"
            fullWidth
            multiline
            minRows={14}
            InputProps={{ disableUnderline: true, sx: { fontSize: 15, background: 'transparent' } }}
            sx={{ mb: 0, flex: 1, resize: 'none' }}
          />
        </Box>
        {/* Alt Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, borderTop: '1px solid #e0e0e0', background: '#f8fbff', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
          <Button
            variant="contained"
            sx={{
              background: '#1a73e8',
              borderRadius: 8,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              boxShadow: 'none',
              mr: 1
            }}
            onClick={handleSend}
          >
            Gönder
          </Button>
          <Tooltip title="Daha fazla gönderim seçeneği">
            <IconButton size="small"><ArrowDropDownIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Biçimlendirme seçenekleri"><IconButton size="small"><FormatColorTextIcon /></IconButton></Tooltip>
          <Tooltip title="Dosya ekle"><IconButton size="small"><AttachFileIcon /></IconButton></Tooltip>
          <Tooltip title="Bağlantı ekle"><IconButton size="small"><LinkIcon /></IconButton></Tooltip>
          <Tooltip title="Emoji ekle"><IconButton size="small"><InsertEmoticonIcon /></IconButton></Tooltip>
          <Tooltip title="Resim ekle"><IconButton size="small"><AddPhotoAlternateIcon /></IconButton></Tooltip>
          <Tooltip title="Gizli mod"><IconButton size="small"><LockIcon /></IconButton></Tooltip>
          <Tooltip title="Daha fazla"><IconButton size="small"><MoreVertIcon /></IconButton></Tooltip>
          <Box sx={{ flex: 1 }} />
          <Tooltip title="Sil"><IconButton size="small"><DeleteIcon /></IconButton></Tooltip>
        </Box>
      </Paper>
    </Dialog>
  );
};

export default ComposeModal; 