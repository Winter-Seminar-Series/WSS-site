import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWSSPrimitiveFields, getModelList, MODEL_LISTS_NAMES } from '../../redux/actions/WSS';

const ViewStream = ({
  streams,
  isFetching,
  thisSeries,
  getWSSPrimitiveFields,
  getModelList,
}) => {
  const id = parseInt(useParams()['id']);
  const [stream, setStream] = useState({
    id: 0,
    stream_room: {
      tag: '',
      url: '',
    },
    qa_url: '',
    feedback_url: ''
  });

  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.STREAMS, thisSeries);
  }, [getWSSPrimitiveFields]);

  useEffect(() => {
    const stream = streams.find((s) => s.id === id);
    if (stream)
      setStream(stream);
  }, [streams]);

  return (
    <>
      {isFetching && (
        <span>Loading...</span>
      )}
      {!stream?.stream_room?.tag && !isFetching && (
        <span>An error ocurred</span>
      )}
      {stream?.stream_room?.tag && (
        <div style={{ "width": "50%", "margin": "auto" }} className="py-5">
          <div dangerouslySetInnerHTML={{ __html: stream?.stream_room?.tag }} />
        </div>
      )}
      <div className="d-flex" style={{"width": "20%", "margin": "auto"}} >
      {stream.qa_url &&
        <div className="col text-center">
          <button type = 'button' className = 'btn btn-primary'
                  onClick={() => window.open(stream.qa_url)}>
            Q&A
          </button>
        </div>}
      {stream.feedback_url &&
        <div className="col text-center">
          <button type = 'button' className = 'btn btn-primary'
                  onClick={() => window.open(stream.feedback_url)}>
            Feedback
          </button>
        </div>}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    isFetching,
    streams,
  } = state.WSS;
  const { thisSeries } = state.account;
  return {
    thisSeries,
    streams,
    isFetching,
  };
};

export default connect(mapStateToProps, {getModelList, getWSSPrimitiveFields})(ViewStream);
