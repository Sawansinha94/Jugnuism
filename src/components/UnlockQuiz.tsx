import { useState, useMemo, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Heart, Keyboard, Sparkles, AlertCircle } from "lucide-react";

interface UnlockQuizProps {
  onUnlock: (foodChoice: string) => void;
}

export default function UnlockQuiz({ onUnlock }: UnlockQuizProps) {
  const [answer, setAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLocked, setIsLocked] = useState(true);

  // Dynamic feedback dependent on inputs
  const dynamicHint = useMemo(() => {
    const trimmed = answer.trim().toLowerCase();
    if (!trimmed) {
      return "🔑 Locked with absolute love. Enter the secret transmission key...";
    }
    if (
      trimmed === "ms jugnu darling" || 
      trimmed === "ms. jugnu darling" || 
      trimmed === "jugnudarling" || 
      trimmed === "ms jugnudarling"
    ) {
      return "🎉 CORRECT! Access granted with absolute love! Realizing connection... ❤️";
    }
    return "❌ Incorrect combination. Try again!";
  }, [answer]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = answer.trim().toLowerCase();
    if (!trimmed) {
      setErrorMsg("Please enter the secret lunch answer to unlock! 💕");
      return;
    }
    
    // Check for correct answers (case-insensitive with a few sweet variations just in case)
    if (
      trimmed === "ms jugnu darling" || 
      trimmed === "ms. jugnu darling" || 
      trimmed === "jugnudarling" || 
      trimmed === "ms jugnudarling"
    ) {
      setErrorMsg("");
      setIsLocked(false);
      // Pass the perfect beautiful normalized wording
      setTimeout(() => {
        onUnlock("Ms Jugnu Darling");
      }, 1200);
    } else {
      setErrorMsg("Incorrect secret key! Ask him what the exact answer is! 😉🔐");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 z-10" id="quiz-container">
      <AnimatePresence mode="wait">
        {isLocked ? (
          <motion.div
            key="lock-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-2xl bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
            id="envelope-portal-box"
          >
            {/* Glowing top line & background accent */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#fef08a] to-transparent" />
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#fef08a]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Private Transmission Metadata label */}
            <p className="uppercase tracking-[0.3em] text-[11px] text-[#fef08a] opacity-80 font-sans font-bold mb-4">
              A Private Transmission
            </p>

            {/* Glowing lock icon with hearts */}
            <div className="relative mb-5">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-14 h-14 bg-gradient-to-tr from-[#0f172a]/80 to-pink-900/40 border border-white/15 rounded-2xl flex items-center justify-center shadow-lg"
                id="envelope-lock-icon"
              >
                <Lock className="w-6 h-6 text-[#fef08a] animate-pulse" />
              </motion.div>
              <div className="absolute -top-1 -right-1">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-bounce" />
              </div>
            </div>

            {/* Custom Header with specific wording */}
            <h2 className="text-xl md:text-2xl font-serif text-[#fdf2f8] tracking-wide leading-relaxed mb-1 italic">
              Ms Jugnu,
            </h2>
            <p className="text-xs font-sans tracking-widest text-slate-300 uppercase mb-3">
              You Have a Secret Message From
            </p>
            <h1 className="text-3xl md:text-4xl font-cursive text-amber-200 font-bold mb-6 glow-gold">
              Mr KichiKichi
            </h1>

            {/* Sub-divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

            {/* Question section */}
            <p className="text-[10px] font-mono uppercase tracking-widest text-amber-200/60 mb-2 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" /> Riddle of the Night <Sparkles className="w-3 h-3 text-amber-300" />
            </p>
            <h3 className="text-2xl md:text-3xl font-serif text-white font-medium italic mb-6">
              “What does Ms SS wants in Lunch?”
            </h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5" id="secret-lock-form">
              <div className="relative group max-w-sm mx-auto">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="Enter her wish... 🍲❤️"
                  className="w-full bg-white/5 border border-white/20 rounded-full px-8 py-3.5 text-center focus:outline-none focus:border-[#fef08a] transition-all font-sans italic text-white text-base md:text-lg"
                  id="lunch-answer-input"
                  maxLength={100}
                />
                <div className="absolute -inset-1 bg-[#fef08a]/10 blur rounded-full -z-10 group-focus-within:bg-[#fef08a]/20 transition-all duration-300" />
                <Keyboard className="absolute right-5 top-3.5 w-5 h-5 text-[#fef08a]/30 pointer-events-none" />
              </div>

              {/* Dynamic feedback notice */}
              <motion.p
                key={dynamicHint}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs md:text-sm text-pink-300 italic min-h-[16px]"
              >
                {dynamicHint}
              </motion.p>

              {errorMsg && (
                <div className="flex items-center justify-center gap-2 text-rose-400 text-sm mt-3">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submission button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="bg-white text-[#020617] px-10 py-3.5 rounded-full font-bold font-sans tracking-widest text-xs uppercase hover:bg-[#fef08a] transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-white/5"
                  id="unlock-submit-btn"
                >
                  Unlock Message
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="unlocking-stage"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-6"
            id="unlocking-animation-card"
          >
            <motion.div
              animate={{
                scale: [1, 1.4, 0.8, 4],
                rotate: [0, 360, -180, 0],
                opacity: [1, 1, 0.8, 0],
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-[#fef08a] flex items-center justify-center text-white text-4xl shadow-2xl"
            >
              🔓
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], y: [10, 0, -10] }}
              transition={{ duration: 1.1 }}
              className="font-serif text-2xl text-amber-100 glow-gold italic"
            >
              Unlocking transmission... ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Bottom telemetry info from the Immersive UI design */}
      <div className="absolute bottom-6 w-full flex justify-between px-8 md:px-12 font-sans text-[10px] tracking-widest uppercase opacity-40 pointer-events-none">
        <p>Coordinates: Heart of Night</p>
        <p>For Jugnu Only</p>
      </div>
    </div>
  );
}
