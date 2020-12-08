import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Like from './Like';
import { BASE_URL } from '../../constants/info'


function PublicCard({
  id,
  presentationLink = '',
  isStaff = false,
  speakers,
  staff,
}) {
  const [person, setPerson] = useState({ picture: 'https://wss.ce.sharif.edu/media/human_pictures/moshiri.jpg', name: 'ali', degree: 'coder', place: 'isfahan' });

  useEffect(() => {
    if (isStaff && staff.find(s => s.id === id)) {
      setPerson(staff.find(s => s.id === id));
    }
    if (!isStaff && speakers.find(s => s.id === id)) {
      setPerson(speakers.find(s => s.id === id));
    }
  }, [speakers, staff])

  const cardRef = useRef(null);
  useEffect(() => {
    var card = cardRef.current;
    if (!card) return;
    setTimeout(() => {
      card.classList.add('is-loaded');
    }, 1000);
  }, [cardRef]);

  return (
    <div id="public-card">
      <div className="card">
        <a className="card-image" ref={cardRef} href={presentationLink}>
          <img src={BASE_URL + person.picture} alt="" />
        </a>
        <div className="card-description">
          <h2>{person.name}</h2>
          {!isStaff &&
            <p>{`${person.degree}, ${person.place}`}</p>
          }
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

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.id,
  person: ownProps,
  speakers: state.WSS.speakers,
  staff: state.WSS.staff,
});

export default connect(
  mapStateToProps,
  {})(PublicCard);
