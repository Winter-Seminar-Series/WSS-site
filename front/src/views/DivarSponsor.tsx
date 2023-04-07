import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const DivarSponsor = () => {
  return (
    <>
      <section
        className="background-theme"
        style={{ paddingTop: 25, fontFamily: 'IRANYekan, sans-serif' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <img
            src="/images/divar-logo.png"
            alt="Image not found!"
            style={{ minWidth: 150, width: '20%' }}
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
          }}
        >
          <h4
            style={{
              color: 'lavender',
              textAlign: 'center',
              fontSize: '2rem',
            }}
          >
            در دیوار چه می‌کنیم؟
          </h4>
          <br />
          شرکت دیوار فعالیت خود را از سال ۹۲ با هدف ساده‌سازی فرآیند خرید و فروش
          آنلاین کالا آغاز کرده و تا به امروز، با تکیه برهمکاران حرفه‌ای،
          نوآوری‌ و حرکت در لبه تکنولوژی‌، توانسته‌است به بستر انتشار بیش از نیم
          میلیون آگهی در روز تبدیل شود.
          <br />
          <br />
          <div style={{ textAlign: 'center', width: '100%' }}>
            فرصت‌های شغلی:
            <br />
            <a href="https://careers.divar.ir/">https://careers.divar.ir </a>
          </div>
        </div>
        <br />
      </section>
    </>
  );
};

export default DivarSponsor;
