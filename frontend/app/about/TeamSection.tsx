import React from 'react';
import {Staff} from "../staff/Staff";
import Image from "next/image";


interface TeamSectionProps {
    teamName: string;
    staff: Staff[];
}

const TeamSection = ({ teamName, staff }: TeamSectionProps) => {
    return (
        <div className="pb-14">
            <div className="flex items-center justify-center mb-10 px-12">
                <hr className="border-neutral-200 flex-grow mr-8" />
                <span className="text-[40px] text-slate-800 font-bold ">{teamName}</span>
                <hr className="border-neutral-200 flex-grow ml-8" />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                {staff.map((person, index) => (
                    <StaffCard2 key={index} person={person} />
                ))}
            </div>
        </div>
    );
};


function StaffCard2({ person }: { person: Staff }) {
    return (
        <div
            className={'font-manrope flex flex-col items-center justify-center px-5'}
        >
            <Image
                src={person.image}
                alt={person.name + ' ' + person.surname}
                width={200}
                height={200}
                className={'rounded-full'}
            />
            <div className={'pt-3 text-base font-semibold text-black'}>
                {person.name}
            </div>
            <div className={'text-base font-semibold text-black'}>
                {person.surname}
            </div>
        </div>
    );
}


export default TeamSection;
