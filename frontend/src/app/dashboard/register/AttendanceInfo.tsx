'use client';

export default function AttendanceInfo() {
  return (
    <div className={'flex items-center justify-between'}>
      <div>
        Mode Of attendance
        <div>
          <input
            type={'radio'}
            id={'html'}
            name={'fav_language'}
            value={'HTML'}
          />
          <label htmlFor={'html'}>HTML</label>
          <input
            type={'radio'}
            id={'css'}
            name={'fav_language'}
            value={'CSS'}
          />
          <label htmlFor={'css'}>CSS</label>
        </div>
      </div>

      <div></div>
    </div>
  );
}
