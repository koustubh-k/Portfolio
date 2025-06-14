import React from "react";

/**
 *  UI: border magic from tailwind css btns
 *  Link: https://ui.aceternity.com/components/tailwindcss-buttons
 *
 *  change border radius to rounded-lg
 *  add margin of md:mt-10
 *  remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
 */
const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <button
      className={`relative inline-flex h-10 sm:h-12 w-full overflow-hidden rounded-lg p-[1px] focus:outline-none ${otherClasses}`}
      onClick={handleClick}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span
        className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg
          bg-slate-950 px-3 sm:px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2"
      >
        {position === "left" && <span className="flex-shrink-0">{icon}</span>}
        <span className="truncate">{title}</span>
        {position === "right" && <span className="flex-shrink-0">{icon}</span>}
      </span>
    </button>
  );
};

export default MagicButton;
