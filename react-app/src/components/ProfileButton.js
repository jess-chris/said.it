import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/session';

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const user = useSelector(state => state.session.user)
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

    const onLogout = async (e) => {
      await dispatch(logout());
    };

  return (
    <div className="user-profile">
      <button className="user-profile-btn" onClick={openMenu}>
      <i class="fa-solid fa-user"></i>
        <div className="drop-down-menu">
          {user.username}
          {showMenu && (
            <div className="profile-dropdown-cont">
              <div className="profile-dropdown">
                <div className="profile-btn-item" onClick={onLogout}>Log Out</div>
                <div className="profile-btn-item">Test</div>
                <div className="profile-btn-item">Test</div>
              </div>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}

export default ProfileButton;