'use client'
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useTranslations } from "next-intl";
const Accordion = () => {
 
const tfaqSection = useTranslations("homePage.faqSection");
const questions = tfaqSection.raw("questions"); 
  const [isPlusAccording, setIsPlusAccording] = useState(0);

  const handleBorderClick = (index) =>
    setIsPlusAccording((prevIndex) => (prevIndex === index ? null : index));

  return (
    <div className="flex gap-3 flex-col w-full container mx-auto px-4 md:w-[70%]">
      <div className=" text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
        {tfaqSection('title')}
        </h1>
        <p className="mt-2 mb-8 text-secondary">
         {tfaqSection('description')}
        </p>
      </div>
      {questions.map((according, index) => (
        <article key={index} className="border border-gray rounded p-3">
          <div
            className="flex gap-2 cursor-pointer items-center justify-between w-full"
            onClick={() => handleBorderClick(index)}
          >
            <h2 className="text-primary font-[600] text-[1.2rem]">
              {according.question}
            </h2>
            <p>
              <FaPlus
                className={`text-[1.3rem] text-text text-primary transition-all duration-300 ${
                  isPlusAccording === index && "rotate-[45deg] text-primary-active"
                }`}
              />
            </p>
          </div>
          <div
            className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
              isPlusAccording === index
                ? "grid-rows-[1fr] opacity-100 mt-4"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <p className="text-secondary text-[16px] overflow-hidden">
              {according.answer}
            </p>
          </div>
        </article>
      ))}
      <div className="flex gap-4 justify-center items-center text-primary-active py-5 cursor-pointer">
        <p className="text-[16px] font-medium"> {tfaqSection('button')}</p>
        <p>
          <MdOutlineArrowCircleRight className="text-2xl" />
        </p>
      </div>
    </div>
  );
};

export default Accordion;
