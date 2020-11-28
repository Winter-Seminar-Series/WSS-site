import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


function Presenter({
  name = 'Omid Jafari',
  title = 'Teacher',
  image = 'http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg',
  description = ' Lab lab  lab lab Lab l lab...',
}) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);


  var card = cardRef.current;//document.getElementById("presenter-card");
  var icon = iconRef.current; //document.getElementById("presenter-card-icon");

  function onClick() {
    icon.classList.add('fa-spin-fast')

    if (card.classList.contains('mc-active')) {
      card.classList.remove('mc-active');
      setTimeout(() => {
        icon.classList.remove('fa-arrow-left');
        icon.classList.remove('fa-spin-fast')
        icon.classList.add('fa-bars')
      }, 800)
    } else {
      card.classList.add('mc-active');
      setTimeout(() => {
        icon.classList.add('fa-arrow-left');
        icon.classList.remove('fa-spin-fast')
        icon.classList.remove('fa-bars')
      }, 800)
    }
  }


  return (
    <div className="col-lg-4 col-md-6 col-sm-9 col-xs-12">
      <article ref={cardRef} id="presenter-card" className="material-card Blue" >
        <h2>
          <span>{name}</span>
          <strong>
            {title}
          </strong>
        </h2>
        <div className="mc-content">
          <div className="img-container">
            <img style={{ height: '100%', width: '100%' }} src={image} />
          </div>
          <div className="mc-description">
            {description}
          </div>
        </div>
        <a onClick={onClick} className="mc-btn-action" >
          <i ref={iconRef} id='presenter-card-icon' className="fa fa-bars" />
        </a>
        {/* <div className="mc-footer">
          <h4>
            Social
          </h4>
          <a className="fa fa-fw fa-facebook"></a>
          <a className="fa fa-fw fa-twitter"></a>
          <a className="fa fa-fw fa-linkedin"></a>
          <a className="fa fa-fw fa-google-plus"></a>
        </div> */}
      </article>
    </div>
  )
}

export default Presenter;