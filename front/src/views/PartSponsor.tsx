import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const PartSponsor = () => {
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
          <video width={'40%'} controls>
            <source src="/images/part-sponsor.mp4" type="video/mp4" />
            مرورگر شما از پخش فیلم پشتیبانی نمی‌کند!
          </video>
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
            در پارت چه می‌کنیم؟
          </h4>
          <br />
          ما در شناسنامه «شرکت دانش بنیان پردازش اطلاعات مالی پارت» هستیم، ولی
          شما می‌توانید «گروه نرم افزاری پارت» هم صدایمان کنید. داستان پارت از
          تیرماه ۱۳۹۲ شروع شد. از تیم کوچکی که جانش برای یاد گرفتن فناوری و
          توسعه دادن نرم‌افزارها در می‌رفت. اصولا خاصیت هر گروه جوان و خلاقی این
          است که ایده‌های بزرگ داشته باشد و برای رسیدن به چیزی که می‌خواهد،
          نهایت تلاشش را بکند. ایده تیم پارت توسعه دادن نرم‌افزارهایی در حوزه
          بازارهای مالی بود. حالا آن تیم کوچک دارد روز به روز بزرگتر می‌شود.
          اعضای جدید را تنها از بهترین ها انتخاب نمی کند، بلکه از اعضای جدید
          بهترین ها را می سازد ایده‌هایش هم بیشتر می‌شوند و تا به دانه دانه‌شان
          نرسد دست برنمی‌دارد. پارت حالا می‌تواند ادعا کند که دستیار هوشمند
          اقتصادی کاربرانی است که به دنبال اطلاعات دقیق و به‌روزی از بازارهای
          مالی هستند. ما را به نام «گروه نرم افزاری دانش بنیان پارت» بشناسید.
          <br />
          <br />
          <div style={{ textAlign: 'center', width: '100%' }}>
            فرصت‌های شغلی:
            <br />
            <a href="https://www.partsoftware.com/#sixthPage">
              https://www.partsoftware.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartSponsor;
