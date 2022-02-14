import * as React from "react";
import { useTranslation } from 'react-i18next';

export default function AboutUs() {
  const { t } = useTranslation('about', { useSuspense: false });

  return (
    <section id="ts-programs" className="d-flex flex-column align-items-center">
    <div className="container">
      <div className="row">
        <h2 className="section-title mx-auto">Programs</h2>
      </div>
      <div className="row">
        <div className="col-12 col-sm-9 col-lg-8 mx-auto">
          
          
          <div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-5 mb-md-5">
            <div className="p-5 p-md-0 col-md-4 d-flex flex-column justify-content-center">
              <img
                className="w-100 h-auto my-auto"
                src="images/seminar.png"
              />
            </div>
            <div className="col mr-md-3 d-flex flex-column justify-content-center">
              <h3 className="section-sub-title">Seminars</h3>
              <p>
                  Seminars takes place as a four-day event and in each day speakers
                   present their research and ideas. They also share their findings
                    and teach related topics.
              </p>
            </div>
          </div>



          <div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-5 mb-md-5">
            <div className="p-5 p-md-0 col-md-4 d-flex flex-column justify-content-center">
              <img
                className="w-100 h-auto my-auto"
                src="images/roundtable.png"
              />
            </div>
            <div className="col mr-md-3 d-flex flex-column justify-content-center">
              <h3 className="section-sub-title">Round Tables</h3>
              <p>
              Each day, we will have a round table with specific topics to discuss.
               At each round table, we will host several experts in the field and discuss
                your concerns about the topic. Note that the round tables are going to be held
                 in Persian.
              </p>
            </div>
          </div>




          <div className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-5 mb-md-5">
            <div className="p-5 p-md-0 col-md-4 d-flex flex-column justify-content-center">
              <img
                className="w-100 h-auto my-auto"
                src="images/poster_session.png"
              />
            </div>
            <div className="col mr-md-3 d-flex flex-column justify-content-center">
              <h3 className="section-sub-title">Lab Talks</h3>
              <p>
              This section is about the laboratories of the Faculty of Computer Engineering of 
              Sharif University of Technology.
               In each session we host one of them. Members introduce the lab and discuss hot lab topics.
              </p>
            </div>
          </div>






        </div>
      </div>
      
    </div>
  </section>


  );
}
