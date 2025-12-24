import React, { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "../public/animation/Confetti.json";

interface ConfettiLottieProps {
  key?: number | string;
  intensity?: number;
}

const ConfettiLottie = ({ key, intensity = 1 }: ConfettiLottieProps) => {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (lottieRef.current && key !== undefined) {
      lottieRef.current.goToAndPlay(0, true);
    }
  }, [key]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50" style={{ opacity: intensity }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "100vw", height: "100vh" }}
      />
    </div>
  );
};

export default ConfettiLottie;

