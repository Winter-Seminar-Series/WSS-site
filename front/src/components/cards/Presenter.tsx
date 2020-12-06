import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { BASE_URL } from '../../constants/info';
import { Speaker } from '../../models/wss';

function Presenter({
  speaker = {
    id: 0,
    name: 'Omid Jafari',
    picture:
      'http://u.lorenzoferrara.net/marlenesco/material-card/thumb-christopher-walken.jpg',
    degree: 'phd',
    place: 'Iran, Tehran',
    bio: ' Lab lab  lab lab Lab lab',
    polymorphic_ctype: 0,
  },
}: {
  speaker: Speaker;
}) {
  const showButton = false;
  // isLoggedIn = 'false',
  // didLikedThis = 'false',
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  function onClick() {
    var card = cardRef.current;
    var icon = iconRef.current;

    icon.classList.add('fa-spin-fast');

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
    <div id="card">
      <article ref={cardRef} className="material-card Blue">
        <h2>
          <span>{speaker.name}</span>
          <strong>
            {speaker.degree}, {speaker.place}
          </strong>
        </h2>
        <div className="mc-content">
          <div className="img-container">
            <img
              style={{ height: '100%', width: '100%' }}
              src={BASE_URL + speaker.picture}
            />
          </div>
          {/* <div className=" mc-description">{speaker.bio}</div> */}
        </div>
        {/* {showButton && (
          <a onClick={onClick} className="mc-btn-action">
            <i ref={iconRef} id="presenter-card-icon" className="fa fa-bars" />
          </a>
        )} 
        <div className="mc-footer">
          <div className="col">
            <span>Add to your favorite:</span>
          </div>
          <Like />
        </div> */}
      </article>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const {
    name,
    title,
    image,
    description,
    didLikedThis,
    showButton,
  } = ownProps;
  const { isLoggedIn } = state.account;
  return {
    name,
    title,
    image,
    description,
    didLikedThis,
    showButton,
    isLoggedIn,
  };
};

export default connect(mapStateToProps, {})(Presenter);
