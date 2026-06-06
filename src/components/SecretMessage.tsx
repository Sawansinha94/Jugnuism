import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Star } from "lucide-react";
import { LoveMemory } from "../types";

interface SecretMessageProps {
  foodChoice: string;
}

export default function SecretMessage({ foodChoice }: SecretMessageProps) {
  const [likes, setLikes] = useState(0);
  const [activeTab, setActiveTab] = useState<"letter" | "memories">("letter");

  // Love memory timeline
  const memories: LoveMemory[] = [
    {
      id: 1,
      emoji: "📱",
      title: "Late Night Conversations",
      description: "Those sweet hours when the world slept, but we talked about everything and nothing. Our hearts connected under the stars.",
      tag: "Midnight Bliss"
    },
    {
      id: 2,
      emoji: "🍛",
      title: "The Great Lunch Question",
      description: `Asking: 'What does Ms SS wants in Lunch?' represents our playful dynamic. Even if it takes us 2 hours to decide, it's my favorite debate!`,
      tag: "Foodie Lovers"
    },
    {
      id: 3,
      emoji: "💫",
      title: "Our Firefly Nights",
      description: "A dream of sitting together on a grassy hill, surrounded by thousands of magical glowing fireflies, whispering sweet promises.",
      tag: "Future Dream"
    },
    {
      id: 4,
      emoji: "🔐",
      title: "Choosing Each Other",
      description: "The moment we realized Mr KichiKichi and Ms Jugnu are written in the stars. No matter what, we are absolute counterparts.",
      tag: "Forever Bond"
    }
  ];

  return (
    <div className="relative min-h-screen z-15 flex flex-col items-center justify-start px-4 py-8 md:py-16 max-w-4xl mx-auto" id="message-dashboard">
      
      {/* Top Floating Heart Counter */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLikes(likes + 1)}
        className="fixed top-4 right-4 md:top-8 md:right-8 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-full flex items-center gap-2 text-slate-200 hover:bg-white hover:text-[#020617] hover:border-transparent transition-all z-50 text-xs font-semibold uppercase tracking-wider shadow-lg cursor-pointer"
        id="top-heart-counter"
      >
        <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
        <span>Love Tap ({likes})</span>
      </motion.button>

      {/* Main Container */}
      <div className="w-full space-y-8 mt-12 md:mt-6">
        
        {/* Big Romantic Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
          id="romantic-title-header"
        >
          {/* Decorative Fireflies Crown */}
          <div className="flex items-center justify-center gap-2 text-[#fef08a]">
            <Sparkles className="w-4.5 h-4.5 text-[#fef08a] animate-pulse" />
            <span className="font-sans text-[11px] font-bold tracking-[0.3em] uppercase text-[#fef08a] opacity-80">
              A Private Transmission Verified
            </span>
            <Sparkles className="w-4.5 h-4.5 text-[#fef08a] animate-pulse" />
          </div>

          <h1 className="text-4xl md:text-6xl font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-[#fdf2f8] to-slate-200 mt-2 tracking-wide leading-tight text-center drop-shadow-md">
            I love you Jugnu Darling
          </h1>

          <p className="text-base md:text-lg font-serif italic text-slate-300 max-w-lg mx-auto">
            "You are the light that guides my darkest nights, my beautiful firefly. Every moment with you is a gift I cherish."
          </p>

          <div className="flex items-center justify-center gap-1.5 pt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Heart key={s} className="w-3.5 h-3.5 text-pink-500 fill-pink-500" style={{ transform: `scale(${1 + Math.sin(s) * 0.15})` }} />
            ))}
          </div>
        </motion.div>

        {/* Interactive Romantic Tabs */}
        <div className="flex justify-center border-b border-white/5" id="romantic-tabs-navigation">
          <div className="flex space-x-1 md:space-x-4">
            {[
              { id: "letter", label: "💌 The Love Letter" },
              { id: "memories", label: "💫 Sweet Memories" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 md:px-5 py-3 text-xs md:text-sm font-sans font-medium transition-all duration-300 select-none cursor-pointer ${
                  activeTab === tab.id
                    ? "text-[#fef08a] border-b-2 border-[#fef08a] font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                id={`tab-nav-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="min-h-[400px]" id="tab-content-panels">
          <AnimatePresence mode="wait">
            
            {/* 1. THE LOVE LETTER */}
            {activeTab === "letter" && (
              <motion.div
                key="letter-tab"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0f172a]/40 backdrop-blur-xl rounded-[40px] p-6 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden"
                id="parchment-letter-panel"
              >
                {/* Floating soft decorations */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#fef08a]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-6 text-slate-200 leading-relaxed font-serif text-base md:text-lg">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                    <span className="font-sans text-[10px] tracking-[0.2em] text-[#fef08a] opacity-80 uppercase font-semibold">
                      From: Mr KichiKichi
                    </span>
                    <span className="font-sans text-[10px] tracking-[0.2em] text-pink-300 uppercase font-semibold">
                      To: Ms Jugnu Darling 👑
                    </span>
                  </div>

                  <p className="font-medium text-amber-100 font-serif text-lg md:text-xl italic">
                    My dearest Jugnu,
                  </p>

                  <p className="text-justify font-normal text-slate-200/90 tracking-wide">
                    I asked what I wanted for lunch, and you chose{" "}
                    <strong className="text-[#fef08a] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {foodChoice}
                    </strong>
                    ! That was the absolute key to my heart. Honestly, I could write pages after pages, 
                    but no amount of words can ever describe how beautifully you have changed Mr KichiKichi's entire universe.
                  </p>

                  <p className="text-justify font-normal text-slate-200/90 tracking-wide">
                    Just like the little glowing fireflies that flutter round our magical deep night background, 
                    your sweetness flickers in my thoughts during the most ordinary moments. In the chaos of life, with you, 
                    everything becomes slow, romantic, and beautifully still. Your dramatic expressions, your radiant smile, 
                    and the pure spark of your presence are my daily dose of wonder.
                  </p>

                  <p className="text-justify font-normal text-slate-200/90 tracking-wide">
                    I love every little thing about you, Jugnu. I promise to buy you all the{" "}
                    <span className="text-[#fef08a] font-medium">{foodChoice}</span> in the world, to stand beside you 
                    through all your tantrums, and to remind you every single morning how absolutely mesmerizing you are.
                  </p>

                  <div className="pt-6 flex flex-col items-end border-t border-white/10 mt-6">
                    <span className="text-slate-400 text-xs font-sans italic not-serif mb-1 uppercase tracking-wider">Yours eternally,</span>
                    <span className="text-3xl font-cursive font-bold text-[#fef08a] glow-gold">Mr KichiKichi ❤️</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. SWEET MEMORIES */}
            {activeTab === "memories" && (
              <motion.div
                key="memories-tab"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
                id="timeline-memories-container"
              >
                {memories.map((mem, idx) => (
                  <motion.div
                    key={mem.id}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className="flex flex-col md:flex-row items-stretch bg-[#0f172a]/30 hover:bg-[#0f172a]/60 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden"
                    id={`memory-item-${mem.id}`}
                  >
                    {/* Emoji Box */}
                    <div className="p-6 md:w-28 flex items-center justify-center bg-white/5 text-4xl border-b md:border-b-0 md:border-r border-white/10">
                      {mem.emoji}
                    </div>

                    {/* Description Details */}
                    <div className="p-6 flex-1 space-y-2">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h4 className="font-serif text-lg font-semibold text-white italic">
                          {mem.title}
                        </h4>
                        {mem.tag && (
                          <span className="px-3 py-0.5 text-[9px] font-sans tracking-widest font-bold rounded-full bg-white/5 text-[#fef08a] border border-[#fef08a]/20 uppercase">
                            {mem.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-sans text-slate-300 leading-relaxed">
                        {mem.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Dynamic Interactive Love Quotes Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center p-6 border-t border-white/5 text-xs text-slate-400 max-w-sm mx-auto space-y-2"
          id="dashboard-love-footer"
        >
          <div className="flex justify-center gap-1">
            <Star className="w-3.5 h-3.5 text-[#fef08a] fill-[#fef08a] animate-pulse" />
            <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#fef08a] opacity-80">KichiKichi x Jugnu</span>
            <Star className="w-3.5 h-3.5 text-[#fef08a] fill-[#fef08a] animate-pulse" />
          </div>
          <p className="font-sans leading-relaxed text-[11px] opacity-65">
            Lovingly designed for Ms SS. May our days be forever brightened with good lunches and romantic fireflies.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
