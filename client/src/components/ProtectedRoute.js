import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../apicalls/user';
import { SetUser } from '../redux/usersSlice';

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  const userMenu = [
    {
      title: 'Home',
      paths: ['/'],
      icon: <i className="ri-home-line"></i>,
      onClick: () => navigate('/'),
    },
    {
      title: 'Reports',
      paths: ['/reports'],
      icon: <i className="ri-file-chart-line"></i>,
      onClick: () => navigate('/reports'),
    },
    {
      title: 'Profile',
      paths: ['/profile'],
      icon: <i className="ri-user-line"></i>,
      onClick: () => navigate('/profile'),
    },
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

  const adminMenu = [
    {
      title: 'Home',
      paths: ['/'],
      icon: <i className="ri-home-line"></i>,
      onClick: () => navigate('/'),
    },
    {
      title: 'Exam',
      paths: ['/admin/exams', '/admin/exams/add'],
      icon: <i className="ri-survey-line"></i>,
      onClick: () => navigate('/admin/exams'),
    },
    {
      title: 'Reports',
      paths: ['/reports'],
      icon: <i className="ri-file-chart-line"></i>,
      onClick: () => navigate('/admin/reports'),
    },
    {
      title: 'Profile',
      paths: ['/profile'],
      icon: <i className="ri-user-line"></i>,
      onClick: () => navigate('/profile'),
    },
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

  const getUserData = async () => {
    try {
      const response = await getUserInfo();
      if (response.success) {
        message.success(response.message);
        dispatch(SetUser(response.data));
        if (response.data.isAdmin === true) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const activeRoute = window.location.pathname;
  const getIsActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="layout">
      <div className="flex gap-2 w-100 h-100">
        <div className="sidebar">
          <div className="text-xl text-white">
            <div className="menu">
              {menu.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`menu-item ${
                      getIsActiveOrNot(item.paths) && 'active-menu-item'
                    }`}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    {!collapsed && (
                      <span className="text-white">{item.title}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="body">
          <div className="header flex justify-between item-center">
            {!collapsed && (
              <i
                className="ri-close-line"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            {collapsed && (
              <i
                className="ri-menu-line"
                onClick={() => setCollapsed(false)}
              ></i>
            )}
            <h1 className="text-2xl">EXAM</h1>
            <div className="flex gap-1">
              <i className="ri-user-line"></i>
              <h1 className="text-md underline">{user?.name}</h1>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}
