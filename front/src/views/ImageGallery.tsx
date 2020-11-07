import React from 'react';

function ImageGallery() {
  const width300 = {
    width: '300px',
  };
  return (
    <>
      wss images
      <section id="main-container" className="blue-gradient diagonal ">
        <div className="container">
          <div className="row text-center mb-5">
            <h3 className="mb-1 col section-sub-title title-white">
              WSS Photo Gallery
            </h3>
          </div>
          <div className="row">
            <div id="gallery">
              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="gallery-container" style={width300}>
                  <a className="gallery-popup" href="{{ item.image.url }}">
                    <img
                      className="img-responsive"
                      src="{{ im.url }}"
                      width="{{ im.width }}"
                      height="{{ im.height }}"
                      alt=""
                    />
                    <span className="gallery-icon">
                      <i className="fa fa-search"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ImageGallery;
