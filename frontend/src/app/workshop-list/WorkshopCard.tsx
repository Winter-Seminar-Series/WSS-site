import React from 'react';
import calender from './assets/Calendar.svg';
import category from './assets/Category.svg';
import { WorkShop } from './WorkshopList';
import Image from 'next/image';
// import SeminarLogo from './SeminarLogo';

export default function WorkshopCard({ workshop }: { workshop: WorkShop }) {

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            month: 'long', // 'numeric', '2-digit', 'long', 'short', or 'narrow'
            day: 'numeric', // 'numeric' or '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    };


  return (
    <div className={'w-fit flex flex-col items-center justify-between px-1 overflow-hidden'}>
        <div className="relative z-10 mx-auto h-[231px] w-[347px] bg-cover overflow-hidden rounded-lg">
            <Image
                src={workshop.image}
                alt={workshop.name}
                layout="fill"
                objectFit="cover"
                className="z-0"
            />
        </div>

        <div
            style={{ borderColor: 'rgba(201, 201, 207, 0.4)' }}
            className={
                'flex flex-col justify-between h-[300px] z-0 w-[380px] -translate-y-[110px] rounded-lg bg-white pb-5 px-4 pt-[130px] text-sm font-normal text-[#8A8998] border'
            }
        >
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <Image src={calender} alt="Calendar" width={20} height={20} />
                    <span>{formatDate(workshop.startDate).toUpperCase()} - {formatDate(workshop.endDate).toUpperCase()}   </span>
                </div>
                <div className="flex items-center space-x-1">
                    <Image src={category} alt="Category" width={20} height={20} />
                    <span>{workshop.modules} MODULES</span>
                </div>

            </div>
            <div className="pb-1 pt-3.5 text-xl font-semibold text-black line-clamp-2 verflow-hidden overflow-ellipsis w-full">
                {workshop.name}
            </div>
            <div className="flex items-center space-x-1">
                <div className="pb-1 pt-3.5 text-xl font-semibold text-black">
                    {workshop.price.toLocaleString()}
                </div>
                <div className="pt-4 text-base font-medium text-black">
                   Tomans
                </div>
            </div>

      </div>
    </div>
  );
}
