import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWSSPrimitiveFields, getModelList, getAnEntityOfModelList, MODEL_LISTS_NAMES } from '../../redux/actions/WSS';

const ViewStream = ({
  streams,
  seminars,
  roundTables,
  labTalks,
  isFetching,
  thisSeries,
  getWSSPrimitiveFields,
  getModelList,
  getAnEntityOfModelList,
}) => {
  const id = parseInt(useParams()['id']);

  const mapStreamTypeToModelName = {
    "seminar": MODEL_LISTS_NAMES.SEMINARS,
    "roundtable": MODEL_LISTS_NAMES.ROUND_TABLES,
    "labtalk": MODEL_LISTS_NAMES.LAB_TALKS,
  };

  const mapStreamTypeToEvents = {
    "seminar": seminars,
    "roundtable": roundTables,
    "labtalk": labTalks,
  };

  const [stream, setStream] = useState({
    id: 0,
    type: '',
    title: '',
    stream_room: {
      tag: '',
      url: '',
    },
    qa_url: '',
    feedback_url: ''
  });

  useEffect(() => {
    if (!stream?.id) return;
    const modelName = mapStreamTypeToModelName[stream?.type ?? ""];
    if (!modelName) return;

    getAnEntityOfModelList(modelName, thisSeries, stream.id);
  }, [getWSSPrimitiveFields, stream]);

  useEffect(() => {
    getModelList(MODEL_LISTS_NAMES.STREAMS, thisSeries);
  }, [getWSSPrimitiveFields]);

  useEffect(() => {
    if (!stream?.id) return;
    const events = mapStreamTypeToEvents[stream?.type ?? ""];
    if (!events) return;
    const event = events.find((e) => e.id === stream.id);
    if (!event?.title) return;

    setStream({
      ...stream,
      title: event.title,
    });
  }, [seminars, roundTables, labTalks]);

  useEffect(() => {
    const stream = streams.find((s) => s.id === id);
    if (stream)
      setStream(stream);
  }, [streams]);

  return (
    <>
      {!stream?.stream_room?.tag && stream?.type !== "workshop" && !isFetching && (
        <div style={{ "margin": "auto" }} className="py-5 text-center">
          An error ocurred.
        </div>
      )}
      {stream?.type === "workshop" && (
        <div style={{ "margin": "auto" }} className="py-5 text-center">
          Workshops take place in-person. You will have access to the recorded videos soon.
        </div>
      )}
      {stream?.stream_room?.tag && stream?.type !== "workshop" && (
        <div style={{ "width": "50%", "margin": "auto" }} className="text-center py-2">
          <h2 className="pb-2">{stream.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: stream.stream_room.tag }} />
        </div>
      )}
      <div className="d-flex pt-2" style={{ "width": "20%", "margin": "auto" }} >
        {stream?.qa_url &&
          <div className="col text-center">
            <button type='button' className='btn btn-primary'
              onClick={() => window.open(stream.qa_url)}>
              Q&A
            </button>
          </div>}
        {stream?.feedback_url &&
          <div className="col text-center">
            <button type='button' className='btn btn-primary'
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
    seminars,
    roundtables: roundTables,
    labtalks: labTalks,
  } = state.WSS;
  const { thisSeries } = state.account;
  return {
    thisSeries,
    streams,
    seminars,
    roundTables,
    labTalks,
    isFetching,
  };
};

export default connect(mapStateToProps, { getModelList, getAnEntityOfModelList, getWSSPrimitiveFields })(ViewStream);
