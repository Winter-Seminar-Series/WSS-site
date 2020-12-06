import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Like from './Like'

function PublicCard({
  name = 'Omid Jafari',
  title = 'Assistant professor at university of Canada',
  image = 'http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg',
  isLoggedIn = 'false',
  didLikedThis = 'false',
  showLikeButton = true,
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      var card = cardRef.current;
      card.classList.add('is-loaded');
    }, 2000)
  }, [cardRef])

  return (
    <div id='public-card'>
      <div className="card">
        <a className='card-image' ref={cardRef} href='#'>
          <img src="https://wss.ce.sharif.edu/media/human_pictures/moshiri.jpg" alt="" />
        </a>
        <div className="card-description">
          <h2>{name}</h2>
          <p>{title}</p>
          {/* <div className='like'>
              <span>
                add to your favorite
            </span>
              <Like />
            </div> */}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { name, title, image, description, didLikedThis, showButton } = ownProps;
  const { isLoggedIn } = state.account;
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
)(PublicCard);
