import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../redux/actions/account';

function Sidebar({ logout, isRegistered }) {
  const history = useHistory();

  const doLogout = () => {
    logout();
    history.push('/');
  };

  var sidebarItems = [];

  if (!isRegistered) {
    sidebarItems.push(
      {
        title: 'Registration',
        persianTitle: 'ثبت‌نام رویداد',
        link: '/dashboard/seminar-registration',
        icon: 'calendar-o',
      },
    )
  }

  sidebarItems.push(
    {
      title: 'Profile',
      persianTitle: 'پروفایل',
      link: '/dashboard/profile',
      icon: 'user-circle-o',
    }
  )


  return (
    <>
      <div className="sidebar">
        {sidebarItems.map((s) =>
          s.deactive ? (
            <span key={s.title} className="sidebar-item deactive">
              <span className={`icon mr-2 fa fa-${s.icon}`}></span>
              <span className="d-none d-md-block">{s.title}</span>
            </span>
          ) : (
              <a href={s.link} key={s.title} className="sidebar-item">
                <span className={`icon mr-2 fa fa-${s.icon}`}></span>
                <span className="d-none d-md-block">{s.title}</span>
              </a>
            )
        )}
        <span key="logout" className="sidebar-item" onClick={doLogout}>
          <span className={`icon mr-2 fa fa-sign-out`}></span>
          <span className="d-none d-md-block">Logout</span>
        </span>
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  isRegistered: state.Participant.isRegistered,
})

export default connect(
  mapStateToProps,
  {
    logout,
  })(Sidebar);

interface SidebarItem {
  title: string;
  persianTitle: string;
  link: string;
  icon?: string;
  deactive?: boolean;
}
