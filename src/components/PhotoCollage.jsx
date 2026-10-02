import { motion } from 'framer-motion';
import WatercolorFlower from './decorations/WatercolorFlower.jsx';

/**
 * PhotoCollage.jsx
 * ------------------------------------------------------------------
 * تصميم القلب المتدرج (12 صورة - 16 عموداً):
 * تم استخدام 16 عموداً للحصول على تحكم أدق، مما سمح بتقريب الصورتين
 * العلويتين لبعضهما البعض بشكل انسيابي مع الحفاظ على شكل القلب.
 * ------------------------------------------------------------------
 */

const AREA_NAMES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];

const PhotoCollage = ({ config, onNext, onBack }) => {
  const { collage } = config;
  
  // سحب 12 صورة لتكوين شكل القلب كاملاً من الأسفل
  const photos = collage.photos.slice(0, 12);

  return (
    <motion.section
      key="collage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#fbfbfb] overflow-hidden px-4 py-12"
    >
      {/* -- الزهور المائية -- */}
      <WatercolorFlower className="absolute top-[2%] left-[-8%] w-64 md:w-80 opacity-90 rotate-[-15deg]" />
      <WatercolorFlower className="absolute top-[5%] right-[-5%] w-56 md:w-72 opacity-90 rotate-[20deg] flip-x" />
      <WatercolorFlower className="absolute bottom-[5%] left-[-5%] w-64 md:w-72 opacity-85 rotate-[15deg]" />
      <WatercolorFlower className="absolute bottom-[-2%] right-[-8%] w-72 md:w-80 opacity-100 rotate-[-10deg] flip-x" />

      {/* -- شبكة القلب -- */}
      <div
        className="grid w-full max-w-lg md:max-w-2xl z-10 mx-auto"
        style={{
          gridTemplateColumns: 'repeat(16, 1fr)', // 16 عموداً لتحكم أدق بالمسافات
          gridTemplateAreas: `
            ". . . a a a a . . b b b b . . ."
            "c c c c d d d d e e e e f f f f"
            ". . g g g g h h h h i i i i . ."
            ". . . . j j j j k k k k . . . ."
            ". . . . . . l l l l . . . . . ."
          `,
          gap: 0,
          filter: 'drop-shadow(0px 15px 30px rgba(0,0,0,0.15))'
        }}
      >
        {photos.map((photo, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.06, ease: "easeOut" }}
            style={{ gridArea: AREA_NAMES[idx] }}
            className="border-[2px] sm:border-[3px] border-[#0a0d1d] bg-[#0a0d1d]"
          >
            <img
              src={photo.src}
              alt={photo.alt || `Photo ${idx + 1}`}
              className="w-full h-full object-cover aspect-[4/3] block"
            />
          </motion.div>
        ))}
      </div>

      {/* -- أزرار التنقل (السابق / التالي) -- */}
      <div className="mt-12 flex items-center justify-center gap-8 z-20 relative">
        {/* زر السابق */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 underline underline-offset-4 font-serif text-navy hover:text-wax transition-colors focus-visible:outline-none text-lg"
          >
            {collage.backLabel || 'Back'}
          </button>
        )}

        {/* زر التالي */}
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2 underline underline-offset-4 font-serif text-navy hover:text-wax transition-colors focus-visible:outline-none text-lg font-semibold"
          >
            {collage.nextLabel || 'Next'}
          </button>
        )}
      </div>

      {/* رسالة تنبيه للمطور */}
      {photos.length < 12 && (
        <div className="absolute bottom-4 z-20 bg-red-100 text-red-700 px-6 py-3 rounded-md font-bold shadow-md border border-red-300">
          تنبيه: لتكتمل رسمة القلب، تحتاج إلى 12 صورة! المتوفر: {photos.length} فقط.
        </div>
      )}

    </motion.section>
  );
};

export default PhotoCollage;