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

  const sidebarItems = [
    {
      title: 'Registration',
      persianTitle: 'ثبت‌نام رویداد',
      link: '/dashboard/seminar-registration',
      icon: 'user-plus',
      checked: isRegistered
    },
    {
      title: 'Profile',
      persianTitle: 'پروفایل',
      link: '/dashboard/profile',
      icon: 'user-circle-o',
    },
    {
      title: 'Your Workshops',
      persianTitle: 'کارگاه‌های شما',
      link: '/dashboard/workshop-list',
      icon: 'suitcase',
    }
  ]


  return (
    <>
      <div className="sidebar">
        {sidebarItems.map((s) =>
            (
              <a href={s.link} key={s.title} className="sidebar-item">
                <span className={`icon mr-2 fa fa-${s.icon}`}></span>
                <span className="d-none d-md-block">{s.title}</span>
                {/* {s.checked && <span className="icon text-success ml-2 fa fa-check-circle"></span>} */}
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
}
