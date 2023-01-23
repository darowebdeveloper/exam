export const userMenuItems = (navigate) => [
  {
    title: 'Home',
    paths: ['/', '/user/write-exam'],
    icon: <i className="ri-home-line"></i>,
    onClick: () => navigate('/'),
  },
  {
    title: 'Reports',
    paths: ['/user/reports'],
    icon: <i className="ri-file-chart-line"></i>,
    onClick: () => navigate('/user/reports'),
  },
  // {
  //   title: 'Profile',
  //   paths: ['/profile'],
  //   icon: <i className="ri-user-line"></i>,
  //   onClick: () => navigate('/profile'),
  // },
  {
    title: 'Logout',
    paths: ['/logout'],
    icon: <i className="ri-logout-box-line"></i>,
    onClick: () => {
      localStorage.removeItem('token');
      navigate('/login');
    },
  },
];

export const adminMenuItems = (navigate) => [
  {
    title: 'Home',
    paths: ['/', 'user/write-exam'],
    icon: <i className="ri-home-line"></i>,
    onClick: () => navigate('/'),
  },
  {
    title: 'Exam Category',
    paths: ['/admin/category', '/admin/category/add'],
    icon: <i className="ri-booklet-line"></i>,
    onClick: () => navigate('/admin/category'),
  },
  {
    title: 'Exam',
    paths: ['/admin/exams', '/admin/exams/add'],
    icon: <i className="ri-survey-line"></i>,
    onClick: () => navigate('/admin/exams'),
  },
  {
    title: 'Reports',
    paths: ['/admin/reports'],
    icon: <i className="ri-file-chart-line"></i>,
    onClick: () => navigate('/admin/reports'),
  },
  // {
  //   title: 'Profile',
  //   paths: ['/profile'],
  //   icon: <i className="ri-user-line"></i>,
  //   onClick: () => navigate('/profile'),
  // },
  {
    title: 'Logout',
    paths: ['/logout'],
    icon: <i className="ri-logout-box-line"></i>,
    onClick: () => {
      localStorage.removeItem('token');
      navigate('/login');
    },
  },
];
