import React from 'react';
import Footer from '../../ui/components/Footer';
import Navbar, { NavbarPlaceholder } from '../../ui/components/Navbar';
import Timer from '../../ui/components/Timer';
import { isAuthenticated } from '../../lib/auth';
import WorkshopCard from "./WorkshopCard";
import sample from './assets/Sample.svg';


export type WorkShop = {
    id: number;
    name: string;
    price: number;
    image: string;
    startDate: Date;
    endDate: Date;
    modules: number;
};

// Sample list of workshops
const workshops: WorkShop[] = [
    {
        id: 0,
        name: "Big Data and Artificial Intelligence: Driving Personalised Medicine of the Future",
        price: 149999,
        image: sample.src,
        startDate: new Date("2024-02-10"),
        endDate: new Date("2024-03-10"),
        modules: 10,
    },
    {
        id: 1,
        name: "Data Science and Analytics",
        price: 12000,
        image: sample.src,
        startDate: new Date("2024-04-05"),
        endDate: new Date("2024-05-05"),
        modules: 8,
    },
    {
        id: 2,
        name: "Big Data and Artificial Intelligence: Driving Personalised Medicine of the Future",
        price: 100000,
        image: sample.src,
        startDate: new Date("2024-06-01"),
        endDate: new Date("2024-07-01"),
        modules: 12,
    },
    {
        id: 3,
        name: "Advanced Machine Learning",
        price: 449.99,
        image: sample.src,
        startDate: new Date("2024-07-15"),
        endDate: new Date("2024-08-15"),
        modules: 9,
    },
    {
        id: 4,
        name: "Cybersecurity Fundamentals",
        price: 399.99,
        image: sample.src,
        startDate: new Date("2024-08-20"),
        endDate: new Date("2024-09-20"),
        modules: 7,
    },
    {
        id: 5,
        name: "Digital Marketing 101",
        price: 299.99,
        image: sample.src,
        startDate: new Date("2024-10-01"),
        endDate: new Date("2024-11-01"),
        modules: 5,
    },
    {
        id: 6,
        name: "UI/UX Design Essentials",
        price: 349.99,
        image: sample.src,
        startDate: new Date("2024-11-10"),
        endDate: new Date("2024-12-10"),
        modules: 6,
    },
    {
        id: 7,
        name: "Blockchain and Cryptocurrency",
        price: 499.99,
        image: sample.src,
        startDate: new Date("2025-01-05"),
        endDate: new Date("2025-02-05"),
        modules: 10,
    },
    {
        id: 8,
        name: "Artificial Intelligence Principles",
        price: 549.99,
        image: sample.src,
        startDate: new Date("2025-02-20"),
        endDate: new Date("2025-03-20"),
        modules: 11,
    },
    {
        id: 9,
        name: "Project Management Professional",
        price: 399.99,
        image: sample.src,
        startDate: new Date("2025-04-10"),
        endDate: new Date("2025-05-10"),
        modules: 8,
    }
];






export default async function WorkshopList() {
  // const workshops = await fetchWorkshops();
  const authenticated = await isAuthenticated();

  return (
    <>
      <Navbar isAuthenticated={authenticated} />
      <NavbarPlaceholder />
      <div
        style={{ backgroundImage: 'url(/source/SmallRectangle.png)' }}
        className="absolute left-0 right-0 top-0 -z-10 h-[220px] w-full bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="mx-auto max-w-[1200px] rounded-2xl bg-white shadow-[0px_30px_60px_0px_rgba(189,192,199,0.10)]">
        <div className="flex max-w-[1199px] flex-col items-start justify-center gap-8 px-[72px] py-[60px]">
          <div className="ml-18 flex flex-row items-start justify-between self-stretch lg:max-w-[1055px]">
            <div className="flex-col gap-2">
              <p className="text-[20px] font-medium uppercase not-italic leading-[normal] tracking-[0.8px] text-[#8A8998]">
                Overline goes here
              </p>
              <p className="text-[76px] font-bold not-italic leading-[76px] tracking-[-1.52px] text-[#1F2B3D]">
                Workshops
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-14 pt-14">
         <div className="flex flex-wrap justify-center gap-6">
            {workshops.map((workshop, index) => (
               <WorkshopCard key={index} workshop={workshop} />
            ))}
         </div>
      </div>
      <Timer />
      <Footer />
    </>
  );
}

