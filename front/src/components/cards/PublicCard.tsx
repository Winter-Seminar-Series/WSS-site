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
  const [person, setPerson] = useState({ picture: '', name: '', degree: '', place: '' });

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
    }, 2000);
  }, [cardRef]);

  return (
    <a className="" ref={cardRef} href={!isStaff ? presentationLink : null} >
    <div id="public-card">
      <div className="card">
        <a className="card-image" ref={cardRef} href={!isStaff ? presentationLink : null}>
          <img src={person.picture ? `${BASE_URL}/${person.picture}` : process.env.PUBLIC_URL + '/images/icons/avatar.jpg'} alt="" />
        </a>
        <div className="card-description">
          <h3>{person.name}</h3>
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
    </a>
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
