import React from 'react';

function Header() {
  return (
    <nav className="navbar navbar-expand-xl navbar-dark w-100">
      <div className="container">
        <a className="navbar-brand" href="{% url 'wss:home' %}">
          <img src="{% static 'images/logo.png' %}" width="50px" alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#wss-navbar"
          aria-controls="wss-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="wss-navbar">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="{% url 'wss:home' %}">
                Home
              </a>
            </li>
            <li className="header-ticket nav-item">
              <a href="{% url 'wss:home' %}" className="btn-white btn-primary">
                Visit the last seminar page
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
