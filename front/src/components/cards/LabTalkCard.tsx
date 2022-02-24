import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { BASE_URL } from '../../constants/info';

function LabTalkCard({ id, presentationLink = '', labTalks }) {
  const [labTalk, setLabTalk] = useState({
    poster_picture: '',
    title: '',
    field: '',
  });

  useEffect(() => {
    if (labTalks.find((lt) => lt.id === id)) {
      setLabTalk(labTalks.find((lt) => lt.id === id));
    }
  }, [labTalks]);

  const cardRef = useRef(null);
  useEffect(() => {
    const card = cardRef.current;
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
                labTalk.poster_picture
                  ? `${BASE_URL}/${labTalk.poster_picture}`
                  : process.env.PUBLIC_URL + '/images/icons/avatar.jpg'
              }
              alt=""
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `${process.env.PUBLIC_URL}images/icons/avatar.jpg`;
              }}
            />
          </div>
          <div className="card-description">
            <h3>{labTalk.title}</h3>
            {labTalk.field}
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
  labTalks: state.WSS.labtalks,
});

export default connect(mapStateToProps, {})(LabTalkCard);
