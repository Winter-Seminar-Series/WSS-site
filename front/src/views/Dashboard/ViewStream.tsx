import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const ViewStream = ({
  streams,
  isFetching,
}) => {
  const id = useParams()['id'];
  const stream = streams.find((s) => s.id === id);

  return (
    <>
      {isFetching && (
        <span>Loading...</span>
      )}
      {!stream?.stream_room?.tag && !isFetching && (
        <span>An error ocurred</span>
      )}
      {stream?.stream_room?.tag && (
        <div dangerouslySetInnerHTML={{ __html: stream?.stream_room?.tag }} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    isFetching,
    streams,
  } = state.WSS;
  return {
    streams,
    isFetching,
  };
};

export default connect(mapStateToProps)(ViewStream);
