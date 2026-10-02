import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import clientConfig from './data/clientConfig.js';
import EnvelopeCover from './components/EnvelopeCover.jsx';
import EnvelopeOpen from './components/EnvelopeOpen.jsx';
import LetterPage from './components/LetterPage.jsx';
import VideoPage from './components/VideoPage.jsx';

// Ordered list of steps — index also drives forward/back direction if extended later.
const STEPS = ['cover', 'envelopeOpen', 'letter', 'video'];

function App() {
  const [stepIndex, setStepIndex] = useState(0);

  // دوال التنقل بين الصفحات
  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  const currentStep = STEPS[stepIndex];

  return (
    <div className="relative min-h-screen bg-cream overflow-hidden">
      <AnimatePresence mode="wait">
        {currentStep === 'cover' && (
          <EnvelopeCover key="cover" config={clientConfig} onOpen={goNext} />
        )}
        
        {currentStep === 'envelopeOpen' && (
          <EnvelopeOpen key="envelopeOpen" config={clientConfig} onContinue={goNext} />
        )}
        
        {/* تمرير دالة onBack للرسالة */}
        {currentStep === 'letter' && (
          <LetterPage key="letter" config={clientConfig} onNext={goNext} onBack={goBack} />
        )}
        
        {/* تمرير دالة onBack للفيديو */}
        {currentStep === 'video' && (
					<VideoPage key="video" config={clientConfig} onBack={goBack} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App; 