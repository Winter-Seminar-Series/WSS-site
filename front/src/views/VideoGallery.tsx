import React from 'react';

function VideoGallery() {
  const marginBottom20 = {
    marginBottom: '20px',
  };
  return (
    <>
      WSS Videos
      <section id="main-container" className="blue-gradient diagonal">
        <div className="container">
          <div className="row text-center mb-5">
            <h3 className="mb-1 col section-sub-title title-white">
              WSS Video Gallery
            </h3>
          </div>
          <div className="row">
            <div
              className="col-xs-12 col-sm-12 col-md-6 text-center"
              style={marginBottom20}>
              <video
                className="mw-100"
                controls
                src="{{ item.clip.url }}"></video>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default VideoGallery;
