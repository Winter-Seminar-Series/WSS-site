import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { BASE_URL } from '../../constants/info';

function RoundTableCard({ id, presentationLink = '', roundTables }) {
  const [roundTable, setRoundTable] = useState({
    subject: '',
    speakers: [],
    poster_picture: '',
  });

  useEffect(() => {
    if (roundTables.find((lt) => lt.id === id)) {
      setRoundTable(roundTables.find((lt) => lt.id === id));
    }
  }, [roundTables]);

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
                    roundTable.poster_picture
                        ? `${BASE_URL}/${roundTable.poster_picture}`
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
              <h3>{roundTable.subject}</h3>
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
  roundTables: state.WSS.roundtables,
});

export default connect(mapStateToProps, {})(RoundTableCard);
