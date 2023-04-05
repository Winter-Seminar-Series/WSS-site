import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const DivarSponsor = () => {
  return (
    <>
      <section className="background-theme" style={{ paddingTop: 25 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
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
          }}>
          <h4
            style={{
              color: 'lavender',
              textAlign: 'center',
              fontSize: '2rem',
            }}>
            در دیوار چه می‌کنیم؟
          </h4>
          <br />
          دیوار از ۲۱ تیر ۱۳۹۱ با هدف خرید و فروش بدون واسطهٔ آنلاین آغاز به کار
          کرد. امتیاز برند دیوار توسط شرکت «آگه پردازان هوشمند» (سهامی خاص) در
          تمامی مراجع قانونی ثبت شده است.
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
