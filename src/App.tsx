/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import FirefliesBackground from "./components/FirefliesBackground";
import UnlockQuiz from "./components/UnlockQuiz";
import SecretMessage from "./components/SecretMessage";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [foodChoice, setFoodChoice] = useState("");

  const handleUnlockPortal = (food: string) => {
    setFoodChoice(food);
    setUnlocked(true);
  };

  return (
    <div className="relative min-h-screen text-[#f3f4f6] font-sans antialiased overflow-x-hidden selection:bg-pink-500/35 selection:text-white" id="app-root-container">
      {/* Drifting Fireflies & Hearts Canvas Layer */}
      <FirefliesBackground unlocked={unlocked} />

      {/* Interactive Main Foreground Content Grid */}
      <main className="relative z-10 w-full min-h-screen flex flex-col justify-between" id="app-content-layer">
        {!unlocked ? (
          <UnlockQuiz onUnlock={handleUnlockPortal} />
        ) : (
          <SecretMessage foodChoice={foodChoice} />
        )}
      </main>
    </div>
  );
}
