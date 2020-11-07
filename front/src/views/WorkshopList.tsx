import React from 'react';

function WorkshopList() {
  return (
    <>
      <section id="ts-speakers" className="blue-gradient ts-speakers diagonal ">
        <div className="container">
          <div className="row text-center">
            <h3 className="mb-1 col section-sub-title title-white"> {/*% if wss.workshops.count != 1 %} Workshops {% else %} Workshop {% endif %*/}</h3>
          </div>
          <div className="mt-3 text-white">
            <h5>For more information about each workshop, click on its image.</h5>
          </div>
          <div className="row">
            {/* {% for workshop in wss.workshops %} */}
            <div className="col-xs-12 col-sm-6 col-lg-3">
              <div className="no-shadow">
                {/* {% render_human workshop.speaker subtitle=workshop.title url=workshop.get_absolute_url %} */}
              </div>
              <p className="text-center">
                <a href="{{ workshop.registration_link }}" className="btn btn-primary btn-white">Register Now</a>
              </p>
            </div>
            <div className="row text-center">
              <h3>Nothing has been added yet</h3>
            </div>
          </div>
          <br />
        </div>
      </section>
    </>
  )
}
export default WorkshopList;

