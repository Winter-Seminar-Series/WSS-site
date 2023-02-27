import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';

function TBACard() {

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
            style={{textDecoration: 'none'}}>
            <div id="public-card">
                <div className="card">
                    <div className="card-image">
                        <img
                            src={
                                process.env.PUBLIC_URL + '/images/icons/comingSoon.jpg'
                            }
                            alt=""
                            onError={({currentTarget}) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = `${process.env.PUBLIC_URL}images/icons/comingSoon.jpg`;
                            }}
                        />
                    </div>
                    <div className="card-description">
                        <h3>TBA</h3>
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

export default connect(mapStateToProps, {})(TBACard);
