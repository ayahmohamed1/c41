import { motion } from 'framer-motion';
import Polaroid from './Polaroid.jsx';
import WatercolorFlower from './decorations/WatercolorFlower.jsx';
import { SparkleStar } from './decorations/HandDrawnMarks.jsx';

/**
 * LetterPage.jsx  —  Screen 3
 * ------------------------------------------------------------------
 * Responsive split layout: letter copy on the left and one framed photo on the right.
 * ------------------------------------------------------------------
 */
const LetterPage = ({ config, onNext, onBack }) => {
  const { letter } = config;

  return (
    <motion.section
      key="letter"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen px-6 sm:px-12 py-16 flex flex-col lg:flex-row items-start lg:items-center gap-12 max-w-7xl mx-auto"
    >
      {/* زهور مائية في الزوايا */}
      <WatercolorFlower className="hidden lg:block absolute top-6 right-10 w-44 opacity-70" />
      <WatercolorFlower className="hidden lg:block absolute bottom-10 left-0 w-40 opacity-60" flip />

      {/* Left: text */}
      <div className="flex-1 text-left order-2 lg:order-1 z-10 w-full">
        <h2 className="font-script text-4xl sm:text-5xl text-navy mb-2">{letter.heading}</h2>

        <h3 dir="rtl" className="font-arabic-display text-right text-3xl sm:text-4xl text-navy mb-5">
          {letter.recipientName}
        </h3>

        <p dir="rtl" className="font-arabic whitespace-pre-line mb-4 max-w-xl text-right leading-loose text-navy/90 text-lg sm:text-xl">
          {letter.message}
        </p>

        {/* حاوية أزرار التنقل */}
        <div className="mt-10 flex items-center gap-8">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="underline underline-offset-4 font-serif text-navy hover:text-wax transition-colors focus-visible:outline-none"
            >
              {letter.backLabel || 'Back'}
            </button>
          )}

          <button
            type="button"
            onClick={onNext}
            className="underline underline-offset-4 font-serif text-navy hover:text-wax transition-colors focus-visible:outline-none font-semibold"
          >
            {letter.nextLabel || 'Next'}
          </button>
        </div>
      </div>

      {/* One framed photo beside the message */}
      <div className="relative flex-1 order-1 lg:order-2 w-full flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
        <SparkleStar className="absolute top-[10%] left-1/2 -translate-x-1/2 w-64 h-64 sm:w-80 sm:h-80 text-[#8fbadd] opacity-40" />
        {letter.images[0] && (
          <Polaroid
            src={letter.images[0].src}
            alt={letter.images[0].alt}
            rotate={2}
            delay={0.1}
            className="relative z-10 w-[min(72vw,340px)] aspect-[4/5]"
          />
        )}
      </div>
    </motion.section>
  );
};

export default LetterPage;