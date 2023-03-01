import React from 'react';
import { connect } from 'react-redux';

import { doesUserHaveRegistered } from '../../redux/actions/participant';

import Form from '../../components/Form';

function Registration({ isRegistered }) {
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
        </div>
      ) : (
        <Form isRegisteration={true} />
      )}
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { isRegistered } = state.Participant;
  return {
    isRegistered,
  };
};

export default connect(mapStateToProps, {
  doesUserHaveRegistered,
})(Registration);
