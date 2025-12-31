import React from "react";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
    return (
        <div className='flex flex-row flex-wrap justify-center gap-10'>
            {technologies.map((technology) => (
                <div className='w-28 h-28 flex flex-col items-center justify-center bg-tertiary rounded-xl p-4' key={technology.name}>
                    <img src={technology.icon} alt={technology.name} className="w-16 h-16 object-contain mb-2" />
                    <p className="text-white text-[14px]">{technology.name}</p>
                </div>
            ))}
        </div>
    );
};

export default SectionWrapper(Tech, "");
