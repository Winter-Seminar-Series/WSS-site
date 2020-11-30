import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Like from './Like'

function Presenter({
  name = 'Omid Jafari',
  title = 'Assistant professor at university of Canada',
  image = 'http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg',
  description = ' Lab lab  lab lab Lab lab  lab lab Lab l Lab lab  lab lab Lab l Lab lab  lab lab Lab l Lab lab  lab lab Lab l Lab l lab...',
  isLoggedIn = 'false',
  didLikedThis = 'false',
  showButton = true,
}) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  function onClick() {
    var card = cardRef.current;
    var icon = iconRef.current;

    icon.classList.add('fa-spin-fast')

    if (card.classList.contains('mc-active')) {
      card.classList.remove('mc-active');
      setTimeout(() => {
        icon.classList.remove('fa-arrow-left');
        icon.classList.remove('fa-spin-fast');
        icon.classList.add('fa-bars');
      }, 800);
    } else {
      card.classList.add('mc-active');
      setTimeout(() => {
        icon.classList.add('fa-arrow-left');
        icon.classList.remove('fa-spin-fast');
        icon.classList.remove('fa-bars');
      }, 800);
    }
  }

  return (
    // <div className="col-lg-4 col-md-6 col-sm-9 col-xs-12">
      <article ref={cardRef} id="presenter-card" className="material-card Blue">
        <h2>
          <span>{name}</span>
          <strong>{title}</strong>
        </h2>
        <div className="mc-content">
          <div className="img-container">
            <img style={{ height: '100%', width: '100%' }} src={image} />
          </div>
          <div className=" mc-description">
            {description}
          </div>
        </div>
        {showButton &&
          <a onClick={onClick} className="mc-btn-action" >
            <i ref={iconRef} id='presenter-card-icon' className="fa fa-bars" />
          </a>
        }
        <div className="mc-footer">
          <div className='col'>
            <span>
              Add to your favorite:
            </span>
          </div>
          <Like />
        </div>
      </article>
    // </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { name, title, image, description, didLikedThis, showButton } = ownProps;
  const { isLoggedIn } = state.Account;
  return ({
    name,
    title,
    image,
    description,
    didLikedThis,
    showButton,
    isLoggedIn,
  })
}

export default connect(
  mapStateToProps,
  {}
)(Presenter);
