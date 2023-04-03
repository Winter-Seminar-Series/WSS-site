import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { BASE_URL } from '../../constants/info';

function SeminarCard({
  id,
  poster_picture,
  presentationLink = '',
  speakers,
}) {
  const [speaker, setSpeaker] = useState({
    name: '',
    degree: '',
    place: '',
  });

  useEffect(() => {
    const foundSpeaker = speakers.find((s) => s.id === id);
    if (foundSpeaker)
      setSpeaker(foundSpeaker);
  }, [speakers]);

  const cardRef = useRef(null);
  useEffect(() => {
    var card = cardRef.current;
    if (!card) return;
    setTimeout(() => {
      card.classList.add('is-loaded');
    }, 2000);
  }, [cardRef]);

  return (
    <a
      className=""
      ref={cardRef}
      href={presentationLink}
      style={{ textDecoration: 'none' }}>
      <div id="public-card">
        <div className="card">
          <div className="card-image">
            <img
              src={
                poster_picture
                  ? `${BASE_URL}/${poster_picture}`
                  : process.env.PUBLIC_URL + '/images/icons/avatar.jpg'
              }
              className="card-img"
              alt={speaker.name}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `${process.env.PUBLIC_URL}images/icons/avatar.jpg`;
              }}
            />
          </div>
          <div className="card-description">
            <h3>{speaker.name}</h3>
            {<p>{`${speaker.degree}, ${speaker.place}`}</p>}
            {/* <div className='like'>
              <span>
                add to your favorite
            </span>
              <Like />
            </div> */}
          </div>
        </div>
      </div>
    </a>
  );
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.id,
  person: ownProps,
  speakers: state.WSS.speakers,
});

export default connect(mapStateToProps, {})(SeminarCard);
