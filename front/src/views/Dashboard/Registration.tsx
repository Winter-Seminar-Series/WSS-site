import React from 'react';
import { connect } from 'react-redux';

import { doesUserHaveRegistered } from '../../redux/actions/participant';

import Form from '../../components/Form';

function Registration({ phoneNumber, isRegistered }) {
  return (
    <>
      <div className="diagonal seminar-register-title background-theme d-flex align-items-center">
        <div className="header ml-3 pt-5">
          <div className="title">Registration</div>
        </div>
      </div>
      {isRegistered ? (
        <div className="seminar-register-form text-center">
          <h5 style={{ color: '#397a00' }}>
            Your registration has been approved successfully.
          </h5>
          <a
            href={`https://wss.ce.sharif.edu/media/cart/${phoneNumber}.jpg`}
            target="_blank"
            className="btn btn-lg btn-primary mb-2 mt-5">
            Download Entrance Permit Card
          </a>
        </div>
      ) : (
        <Form isRegisteration={true} />
      )}
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { isRegistered, phone_number: phoneNumber } = state.Participant;
  return {
    phoneNumber,
    isRegistered,
  };
};

export default connect(mapStateToProps, {
  doesUserHaveRegistered,
})(Registration);
