import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
    return (
        <div className='flex flex-col bg-[#1d1836] p-6 rounded-2xl w-full sm:w-[360px]'>
            <div className="flex items-center gap-4 border-b border-gray-700 pb-4 mb-4">
                <div className='flex justify-center items-center w-12 h-12 rounded-full bg-white'>
                    <img
                        src={experience.icon}
                        alt={experience.company_name}
                        className='w-[60%] h-[60%] object-contain'
                    />
                </div>
                <div>
                    <h3 className='text-white text-[20px] font-bold'>{experience.title}</h3>
                    <p className='text-secondary text-[16px] font-semibold' style={{ margin: 0 }}>
                        {experience.company_name}
                    </p>
                    <p className='text-secondary text-[14px]'>{experience.date}</p>
                </div>
            </div>

            <ul className='mt-5 list-disc ml-5 space-y-2'>
                {experience.points.map((point, index) => (
                    <li
                        key={`experience-point-${index}`}
                        className='text-white-100 text-[14px] pl-1 tracking-wider'
                    >
                        {point}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Experience = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText} text-center`}>
                    What I have done so far
                </p>
                <h2 className={`${styles.sectionHeadText} text-center`}>
                    Education & Certifications.
                </h2>
            </motion.div>

            <div className='mt-20 flex flex-wrap justify-center gap-10'>
                {experiences.map((experience, index) => (
                    <ExperienceCard
                        key={`experience-${index}`}
                        experience={experience}
                    />
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(Experience, "work");
