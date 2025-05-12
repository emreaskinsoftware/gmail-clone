import React, { useState } from 'react';
import { 
  Box, 
  Checkbox, 
  IconButton, 
  Tooltip, 
  Typography,
  Menu,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import EmailRow from './EmailRow';
// Kategori ikonları - kategorilere göre emailler filtrelendiği için bunları tutuyoruz
// Aşağıdaki ikonlar Sidebar.tsx dosyasında kullanılıyor
import AllInboxIcon from '@mui/icons-material/AllInbox';
import WarningIcon from '@mui/icons-material/Warning';
import CampaignIcon from '@mui/icons-material/Campaign';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReceiptIcon from '@mui/icons-material/Receipt';

// Sample email data
const initialEmails = [
  // Şüpheli içerik (suspicious) kategorisi e-postaları
  {
    id: 101,
    sender: 'Unknown Sender',
    subject: 'Acil: Hesabınız risk altında! Hemen tıklayın ve bilgilerinizi güncelleyin',
    time: '13:30',
    read: false,
    category: 'suspicious'
  },
  {
    id: 102,
    sender: 'Prize Winner',
    subject: '1,000,000 TL kazandınız! Ödülünüzü almak için hemen tıklayın',
    time: '10:45',
    read: true,
    category: 'suspicious'
  },
  {
    id: 103,
    sender: 'Security Team',
    subject: 'Şüpheli giriş tespit edildi - Hesabınızı güvence altına alın',
    time: '9:22',
    read: false,
    category: 'suspicious'
  },
  {
    id: 104,
    sender: 'Banking Alert',
    subject: 'Kredi kartı bilgilerinizi doğrulamanız gerekiyor, acil işlem',
    time: '8:07',
    read: true,
    category: 'suspicious'
  },
  {
    id: 105,
    sender: 'Tax Department',
    subject: 'Vergi borcunuz hakkında acil bildirim - hemen ödeyin',
    time: '7:15',
    read: false,
    category: 'suspicious'
  },
  
  // Pazarlama/Reklam (marketing) kategorisi e-postaları
  {
    id: 201,
    sender: 'Trendyol',
    subject: '%70 indirim fırsatı - Son 3 gün!',
    time: '14:10',
    read: true,
    category: 'marketing'
  },
  {
    id: 202,
    sender: 'Hepsiburada',
    subject: 'Sizin için özel fırsatlar: Sepetinizde ürünler sizi bekliyor',
    time: '11:30',
    read: true,
    category: 'marketing'
  },
  {
    id: 203,
    sender: 'Amazon',
    subject: 'Yılın en büyük indirimi başladı! Elektronik, kitap ve daha fazlası',
    time: '10:05',
    read: false,
    category: 'marketing'
  },
  {
    id: 204,
    sender: 'Yemeksepeti',
    subject: '2 al 1 öde kampanyası - Sevdiğiniz restoranlar',
    time: '9:45',
    read: true,
    category: 'marketing'
  },
  {
    id: 205,
    sender: 'Media Markt',
    subject: 'Teknoloji tutkunları için: Yeni ürünler mağazalarda',
    time: '8:20',
    read: false,
    category: 'marketing'
  },
  
  // Bilgilendirme (info) kategorisi e-postaları
  {
    id: 301,
    sender: 'Türk Hava Yolları',
    subject: 'Uçuş bilgileriniz: TK1982 İstanbul-Ankara',
    time: '15:40',
    read: false,
    category: 'info'
  },
  {
    id: 302,
    sender: 'E-Devlet',
    subject: 'Yeni belge talebiniz hakkında bilgilendirme',
    time: '12:15',
    read: true,
    category: 'info'
  },
  {
    id: 303,
    sender: 'Belediye Başkanlığı',
    subject: 'Mahallenizde yapılacak yol çalışması hakkında bilgilendirme',
    time: '11:20',
    read: false,
    category: 'info'
  },
  {
    id: 304,
    sender: 'Elektrik Dağıtım A.Ş.',
    subject: 'Planlı elektrik kesintisi duyurusu: 15 Mayıs, 09:00-12:00',
    time: '10:30',
    read: true,
    category: 'info'
  },
  {
    id: 305,
    sender: 'Üniversite Dekanlığı',
    subject: 'Final sınav programı güncellendi - Bilgilendirme',
    time: '9:10',
    read: false,
    category: 'info'
  },
  
  // Kişisel iletişim (personal) kategorisi e-postaları
  {
    id: 401,
    sender: 'Ahmet Yılmaz',
    subject: 'Hafta sonu buluşması hakkında',
    time: '16:20',
    read: false,
    category: 'personal'
  },
  {
    id: 402,
    sender: 'Ayşe Demir',
    subject: 'Doğum günü partisi davetiyesi',
    time: '14:05',
    read: true,
    category: 'personal'
  },
  {
    id: 403,
    sender: 'Mehmet Kaya',
    subject: 'Fotoğraflar: Geçen haftaki gezi',
    time: '12:40',
    read: false,
    attachment: 'fotoğraflar.zip',
    category: 'personal'
  },
  {
    id: 404,
    sender: 'Zeynep Çelik',
    subject: 'Selam, nasılsın? Uzun zamandır görüşemedik',
    time: '11:15',
    read: true,
    category: 'personal'
  },
  {
    id: 405,
    sender: 'Mustafa Öztürk',
    subject: 'Halı saha maçı: Bu Cuma 19:00',
    time: '10:50',
    read: false,
    category: 'personal'
  },
  
  // İş/profesyonel iletişim (business) kategorisi e-postaları
  {
    id: 501,
    sender: 'Genel Müdür',
    subject: 'Toplantı gündem maddesi: Yeni proje önerisi',
    time: '17:30',
    read: false,
    category: 'business'
  },
  {
    id: 502,
    sender: 'İK Departmanı',
    subject: 'Yıllık izin talebiniz onaylandı',
    time: '15:45',
    read: true,
    category: 'business'
  },
  {
    id: 503,
    sender: 'Proje Koordinatörü',
    subject: 'Proje ilerleme raporu: Mayıs 2025',
    time: '14:20',
    read: false,
    attachment: 'rapor_Mayıs2025.pdf',
    category: 'business'
  },
  {
    id: 504,
    sender: 'Finans Departmanı',
    subject: 'Harcama onay talebi: IT-2025-032',
    time: '12:05',
    read: true,
    category: 'business'
  },
  {
    id: 505,
    sender: 'Müşteri İlişkileri',
    subject: 'Müşteri görüşmesi notları: ABC Şirketi',
    time: '11:40',
    read: false,
    category: 'business'
  },
  
  // Abonelik bildirimleri (subscription) kategorisi e-postaları
  {
    id: 601,
    sender: 'Netflix',
    subject: 'Yeni abonelik döneminiz başladı',
    time: '18:10',
    read: true,
    category: 'subscription'
  },
  {
    id: 602,
    sender: 'Spotify',
    subject: 'Premium üyeliğiniz yenilendi',
    time: '16:55',
    read: false,
    category: 'subscription'
  },
  {
    id: 603,
    sender: 'YouTube Premium',
    subject: 'Abonelik faturanız hazır: Mayıs 2025',
    time: '14:40',
    read: true,
    category: 'subscription'
  },
  {
    id: 604,
    sender: 'The New York Times',
    subject: 'Dijital aboneliğinizin avantajları',
    time: '13:25',
    read: false,
    category: 'subscription'
  },
  {
    id: 605,
    sender: 'Bluehost',
    subject: 'Domain yenileme bildirimi: example.com',
    time: '12:10',
    read: true,
    category: 'subscription'
  },
  
  // Fatura finansal bildirimler (financial) kategorisi e-postaları
  {
    id: 701,
    sender: 'Garanti BBVA',
    subject: 'Mayıs 2025 Kredi Kartı Ekstresi Hazır',
    time: '19:05',
    read: false,
    attachment: 'ekstreMayıs2025.pdf',
    category: 'financial'
  },
  {
    id: 702,
    sender: 'Akbank',
    subject: 'Otomatik ödeme bildirimi: Elektrik Faturası',
    time: '17:50',
    read: true,
    category: 'financial'
  },
  {
    id: 703,
    sender: 'Turkcell',
    subject: 'Mayıs ayı faturanız hazır: 231.45 TL',
    time: '16:35',
    read: false,
    category: 'financial'
  },
  {
    id: 704,
    sender: 'İGDAŞ',
    subject: 'Doğalgaz faturanız: Ödeme son tarihi 25.05.2025',
    time: '15:20',
    read: true,
    category: 'financial'
  },
  {
    id: 705,
    sender: 'Halkbank',
    subject: 'Kredi ödemesi hatırlatma: 20.05.2025',
    time: '14:05',
    read: false,
    category: 'financial'
  }
];

interface EmailListProps {
  selectedCategory: string;
  searchQuery?: string;
}

const EmailList: React.FC<EmailListProps> = ({ selectedCategory, searchQuery = '' }) => {
  const [emails, setEmails] = useState(initialEmails);
  const [selected, setSelected] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState<null | HTMLElement>(null);
  const [page, setPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const itemsPerPage = 50;
  const totalEmails = emails.length;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Tüm e-postaları seç
      const emailIds = filteredEmails.map(email => email.id);
      setSelected(emailIds);
      setAllSelected(true);
    } else {
      setSelected([]);
      setAllSelected(false);
    }
  };

  const handleSelect = (id: number) => {
    setSelected(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleMoreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMoreMenuAnchor(event.currentTarget);
  };

  const handleCloseMoreMenu = () => {
    setMoreMenuAnchor(null);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setSnackbarMessage('Yenileniyor...');
    setSnackbarOpen(true);
    
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
      setSnackbarMessage('Yenileme tamamlandı');
      setSnackbarOpen(true);
    }, 1500);
  };

  const handleNextPage = () => {
    if (page * itemsPerPage < totalEmails) {
      setPage(prev => prev + 1);
      showSnackbar('Sonraki sayfa gösteriliyor');
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
      showSnackbar('Önceki sayfa gösteriliyor');
    }
  };

  const handleMarkAsRead = () => {
    if (selected.length === 0) return;
    
    setEmails(prevEmails => 
      prevEmails.map(email => 
        selected.includes(email.id) 
          ? { ...email, read: true } 
          : email
      )
    );
    
    showSnackbar(`${selected.length} e-posta okundu olarak işaretlendi`);
    setSelected([]);
    setAllSelected(false);
    handleCloseMoreMenu();
  };

  const handleDelete = () => {
    if (selected.length === 0) return;
    
    setEmails(prevEmails => 
      prevEmails.filter(email => !selected.includes(email.id))
    );
    
    showSnackbar(`${selected.length} e-posta silindi`);
    setSelected([]);
    setAllSelected(false);
  };

  const handleArchive = () => {
    if (selected.length === 0) return;
    
    setEmails(prevEmails => 
      prevEmails.filter(email => !selected.includes(email.id))
    );
    
    showSnackbar(`${selected.length} e-posta arşivlendi`);
    setSelected([]);
    setAllSelected(false);
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Kategoriye ve arama sorgusuna göre e-postaları filtrele
  const filteredEmails = emails.filter(email => {
    const matchesCategory = selectedCategory === 'all' || email.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const startRange = (page - 1) * itemsPerPage + 1;
  const endRange = Math.min(page * itemsPerPage, filteredEmails.length);

  return (
    <Box sx={{ 
      flex: 1, 
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'hidden',
      width: '100%',
      height: '100%'
    }}>
      {/* Email List Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '8px 16px', 
        borderBottom: '1px solid #f1f3f4'
      }}>
        <Checkbox 
          size="small" 
          color="default" 
          checked={allSelected}
          onChange={handleSelectAll}
          indeterminate={selected.length > 0 && selected.length < filteredEmails.length}
        />
        
        <Box sx={{ display: 'flex', ml: 1 }}>
          {selected.length > 0 ? (
            <>
              <Tooltip title="Arşivle">
                <IconButton size="small" onClick={handleArchive}>
                  <ArchiveIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Sil">
                <IconButton size="small" onClick={handleDelete}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Okundu olarak işaretle">
                <IconButton size="small" onClick={handleMarkAsRead}>
                  <MarkEmailReadIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Yenile">
                <IconButton 
                  size="small"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="Diğer">
            <IconButton size="small" onClick={handleMoreMenu}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="textSecondary" sx={{ mr: 2 }}>
            {filteredEmails.length > 0 ? `${filteredEmails.length} satırdan ${startRange}-${Math.min(endRange, filteredEmails.length)} arası` : '0 e-posta'}
          </Typography>
          <Tooltip title="Daha yeni">
            <span>
              <IconButton 
                size="small" 
                disabled={page === 1}
                onClick={handlePrevPage}
              >
                <KeyboardArrowLeftIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Daha eski">
            <span>
              <IconButton 
                size="small"
                disabled={page * itemsPerPage >= filteredEmails.length}
                onClick={handleNextPage}
              >
                <KeyboardArrowRightIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      {/* Menu */}
      <Menu
        id="more-menu"
        anchorEl={moreMenuAnchor}
        open={Boolean(moreMenuAnchor)}
        onClose={handleCloseMoreMenu}
      >
        <MenuItem onClick={handleMarkAsRead}>Okundu olarak işaretle</MenuItem>
        <MenuItem onClick={handleArchive}>Arşivle</MenuItem>
        <MenuItem onClick={handleDelete}>Sil</MenuItem>
      </Menu>

      {/* Email List */}
      <Box sx={{ overflowY: 'auto', flex: 1 }}>
        {filteredEmails.map((email) => (
          <EmailRow
            key={email.id}
            id={email.id}
            sender={email.sender}
            subject={email.subject}
            time={email.time}
            read={email.read}
            attachment={email.attachment}
            selected={selected.includes(email.id)}
            onSelect={() => handleSelect(email.id)}
            onMarkAsRead={() => {
              setEmails(prevEmails => 
                prevEmails.map(e => 
                  e.id === email.id ? { ...e, read: true } : e
                )
              );
            }}
          />
        ))}
        {filteredEmails.length === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography color="textSecondary">Bu kategoride e-posta bulunmuyor</Typography>
          </Box>
        )}
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* CSS for animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default EmailList; 