import * as React from "react";
import {useTranslation} from 'react-i18next';

export default function AboutUs() {
    const {t} = useTranslation('about', {useSuspense: false});

    return (
        <section id="ts-programs" className="d-flex flex-column align-items-center no-margin mb-0">
            <div className="container">
                <div className="row">
                    <h2 className="section-title mx-auto">Programs</h2>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-9 col-lg-8 mx-auto">
                        <div
                            className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-5 mb-md-5">
                            <div className="p-5 p-md-0 col-md-4 d-flex flex-column justify-content-center">
                                <img
                                    className="w-100 h-auto my-auto"
                                    src="images/seminar.png"
                                />
                            </div>
                            <div className="col mr-md-3 d-flex flex-column justify-content-center">
                                <h3 className="section-sub-title">Seminars</h3>
                                <p className="section-paragraph">
                                    The seminars comprise a four-day event where speakers present their
                                    research and ideas, sharing their findings and teaching related topics.
                                    Each day of the event features different speakers and topics, providing
                                    participants with a diverse range of perspectives and knowledge.
                                </p>
                            </div>
                        </div>


                        <div
                            className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-5 mb-md-5">

                            <div className="col mr-md-3 d-flex flex-column justify-content-center">
                                <h3 className="section-sub-title">Round Tables</h3>
                                <p className="section-paragraph">
                                    During the event, we host round table discussions on specific topics,
                                    inviting experts in the field to share their insights and engage with
                                    participants' concerns. Please note that the round tables are conducted in Persian.
                                </p>
                            </div>
                            <div className="p-5 p-md-0 col-md-4 d-flex flex-column justify-content-center">
                                <img
                                    className="w-100 h-auto my-auto"
                                    src="images/roundtable.png"
                                />
                            </div>
                        </div>


                        <div
                            className="row d-flex flex-sm-row-reverse justify-content-start justify-content-sm-between mt-5 mb-md-5">
                            <div className="p-5 p-md-0 col-md-4 d-flex flex-column justify-content-center">
                                <img
                                    className="w-100 h-auto my-auto"
                                    src="images/poster_session.png"
                                />
                            </div>
                            <div className="col mr-md-3 d-flex flex-column justify-content-center">
                                <h3 className="section-sub-title">Lab Talks</h3>
                                <p className="section-paragraph">
                                    This section focuses on the laboratories of the Faculty of Computer
                                    Engineering at Sharif University of Technology. In each session, we
                                    feature a different laboratory, with members introducing their lab and
                                    discussing current research topics. This provides participants with an
                                    opportunity to learn about cutting-edge research and developments in computer
                                    engineering.
                                </p>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {/*here*/}
        </section>
);
}
