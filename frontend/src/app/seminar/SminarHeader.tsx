import React from "react";
import PreArrow from "./assets/pre arrow.svg";
import NextArrow from "./assets/next arrow.svg";
import NextPreButton from "./NextPreButton";

export default function SeminarHeader() {
  return (
    <div className={'flex justify-between items-center px-32 pt-20'}>
      <div>
        <div className={'font-manrope font-medium text-lg text-white opacity-60'}>
          Overline Goes Here
        </div>
        <div className={'font-manrope font-bold text-[64px] text-white -mt-2'}>
          Seminars
        </div>
      </div>
      <div className={'flex'}>
        <NextPreButton src={PreArrow} direction={'pre'}/>
        <NextPreButton src={NextArrow} direction={'next'} className={'ml-4'}/>
      </div>
    </div>
  )
}