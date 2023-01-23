import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../apicalls/user';
import { adminMenuItems, userMenuItems } from '../pages/menuItems';
import { HideLoading, ShowLoading } from '../redux/loaderSlice';
import { SetUser } from '../redux/usersSlice';

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  const userMenu = userMenuItems(navigate);

  const adminMenu = adminMenuItems(navigate);

  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
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
      navigate('/login');
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserData();
    } else {
      navigate('/login');
    }
  }, []);
  const activeRoute = window.location.pathname;

  const getIsActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      if (
        activeRoute.includes('/admin/exams/edit') &&
        paths.includes('/admin/exams')
      ) {
        return true;
      } else if (
        activeRoute.includes('/user/write-exam') &&
        paths.includes('/user/write-exam')
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    user && (
      <div className="layout">
        <div className="flex">
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
            <div className="content pl-2 pr-2">{children}</div>
          </div>
        </div>
      </div>
    )
  );
}
