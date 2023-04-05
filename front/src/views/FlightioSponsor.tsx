import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const FlightioSponsor = () => {
  return (
    <>
      <section
        className="background-theme"
        style={{ paddingTop: 25, fontFamily: 'IRANYekan, sans-serif' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <img
            src="/images/flightio-english-white-600.png"
            alt="Image not found!"
            style={{ minWidth: 150, width: '40%' }}
          />
        </div>

        <br />
        <div
          dir="rtl"
          className="my-4 p-4"
          style={{
            textAlign: 'right',
            color: 'lavender',
            marginRight: '10%',
            marginLeft: '10%',
            fontSize: '1.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 8,
          }}>
          <h4
            style={{
              color: 'lavender',
              textAlign: 'center',
              fontSize: '2rem',
            }}>
            در فلایتیو چه می‌کنیم؟
          </h4>
          <br />
          ما در فلایتیو فعالیت خودمان را خردادماه سال ۱۳۹۵ به عنوان یک آژانس
          مسافرتی آنلاین آغاز نموده، و از همان ابتدا تلاش کردیم تا نگاه متفاوتی
          داشته باشیم. ما تصمیم گرفتیم پیش از هر چیزی، اول به خواسته‌ها و رضایت
          مشتری‌هایمان توجه کنیم. آن زمان را به سرعت سپری کردیم، و حالا با
          همراهی شما، از یک آژانس مسافرتی، به یک «شرکت گردشگری آنلاین» و یکی از
          رهبران این بازار تبدیل شده‌ایم. ما مفتخریم که هر ماه بیش از صدها هزار
          نفر برای انجام سفرهای داخلی و خارجی خود از خدمات فلایتیو بهره می‌برند.
          اما این پایان راه و ماموریت ما نیست!
          <br />
          <br />
          <div style={{ textAlign: 'center', width: '100%' }}>
            فرصت‌های شغلی:
            <br />
            <a href="https://flightio.com/page/job-vacancy">
              https://flightio.com/page/job-vacancy
            </a>
          </div>
        </div>
        <br />
      </section>
    </>
  );
};

export default FlightioSponsor;
