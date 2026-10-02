/**
 * clientConfig.js
 * ------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH for the entire greeting card experience.
 *
 * To spin up a new client site: duplicate this file's VALUES only.
 * Do not rename top-level keys — every component maps over this
 * exact shape. Image paths can point to /src/assets/<client>/...
 * or to any hosted URL.
 * ------------------------------------------------------------------
 */

// --- استدعاء الصور هنا في بداية الملف ---
import img1 from '../assets/placeholder-1.jpg';
import img2 from '../assets/placeholder-2.jpg';

const clientConfig = {
  // ---------------------------------------------------------------
  // 1. THEME — colors referenced via CSS custom properties in index.css
  //    (also mirrored in tailwind.config.js for utility classes)
  // ---------------------------------------------------------------
  theme: {
    background: '#fdfbf7', // cream
    primary: '#1b2a4a', // navy — headings, envelope, borders
    accent: '#c98a4b', // wax seal / gold accents
    balloon: '#a9bcd8', // balloon + watercolor flower tint
  },

  // ---------------------------------------------------------------
  // 2. RECIPIENT / META
  // ---------------------------------------------------------------
  meta: {
    recipientName: 'Love',
    senderName: 'Your Person',
    pageTitle: "i'm sorry, Love!",
  },

  // ---------------------------------------------------------------
  // 3. SCREEN 1 — COVER (closed envelope)
  // ---------------------------------------------------------------
  cover: {
    eyebrow: 'For you',
    subtext: 'tap on the letter to open',
  },

  // ---------------------------------------------------------------
  // 4. SCREEN 2 — ENVELOPE OPEN (card pop-up + balloons)
  // ---------------------------------------------------------------
  envelopeOpen: {
    heading: 'im sorry,\nLove!',
    subtext: 'tap on the letter for more',
    balloonCount: 6,
  },

  // ---------------------------------------------------------------
  // 5. SCREEN 3 — LETTER PAGE
  // ---------------------------------------------------------------
  letter: {
    heading: 'im sorry, Love!',
    recipientName: 'العنود',
    message: `أتظنين أن العذر يكفي لمن جرح خاطرك؟
لا والذي صغّر الكون في عيني حين رأيت الحزن في عينيك ما سكن لي جفن ولا طاب لي عيش منذ زلتي .
إنتي لا أعتذر فحسب
بل أقف بين يدي حبك كالمذنب الذي يرجو العفو ويعلم أن كرمك أعظم من خطيئتي
وكما قال قيس بن الملوح في لهفته
وامشي وتبكيني الغيون كأنني ... أصبت بفقد الروح بين رفاقي
فكيف أصيب روحي بيدي؟
إن الدنيا كلها لا تساوي لحظة تنظرين فيها إلي بجفاء ولا يهون عليّ أن أرى الحزن في عينيك ولا أجمع شتات قلبي إلا أن ترضين وأن يطمئن قلبك وتعود البسمة إلى عينيك والله لو حضر عمر بن أبي ربيعة لقال فيك
فردي على العاشق المحزون بهجته ... فإنك للروح المشوقة مطرف
أعتذر منك`,
    images: [
      { src: img1, alt: 'A warm shared memory, close together and smiling' },
    ],
    nextLabel: 'Next',
  },

  // ---------------------------------------------------------------
  // 6. SCREEN 4 — VIDEO PAGE
  // ---------------------------------------------------------------
  video: {
    heading: 'أغنية لكِ',
    artwork: img2,
    artworkAlt: 'صورة تذكارية داخل إطار للأغنية',
    audioSrc: '/music/song.mp3',
  },
};

export default clientConfig;