import React from 'react';

interface IQBSLogoProps {
  className?: string;
  showText?: boolean;
  lightText?: boolean;
}

export const IQBSLogo: React.FC<IQBSLogoProps> = ({
  className = "w-11 h-11",
  showText = false,
  lightText = true,
}) => {
  const brandColor = lightText ? 'text-white' : 'text-[#0a5c36]';

  return (
    <div className="flex items-center gap-3">
      <img
        src="/favicon.svg"
        alt="Logo Resmi IQBS"
        className={`${className} object-contain shrink-0 filter drop-shadow-md`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`text-xl sm:text-2xl font-bold font-trajan tracking-wider leading-none ${brandColor}`}>
            IQBS
          </span>
          <span className={`text-[10px] sm:text-[11px] font-semibold font-ondine uppercase tracking-wider mt-1 leading-tight ${brandColor}`}>
            ISKA QUR'ANIC
          </span>
          <span className={`text-[9px] sm:text-[10px] font-semibold font-ondine uppercase tracking-wider leading-tight ${brandColor}`}>
            BOARDING SCHOOL
          </span>
        </div>
      )}
    </div>
  );
};
