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
      <button className="user-profile-btn main-links" onClick={openMenu}>
        <div className="drop-down-menu">
          <i className="fas fa-user-circle" />   {user.username}
          {showMenu && (
            <ul style={{'listStyle': 'none'}} className="profile-dropdown">
              <li>
                <button className="main-links" onClick={onLogout}>Log Out</button>
              </li>
            </ul>
          )}
        </div>
      </button>
    </div>
  );
}

export default ProfileButton;