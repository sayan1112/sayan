
"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, Gift, Star, MailOpen, X, Music, Flame } from "lucide-react"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const ALL_MEMORIES = ['/memories/photo1.png', '/memories/photo2.png', '/memories/photo3.png', '/memories/photo4.png', '/memories/photo5.jpg', '/memories/photo6.jpg', '/memories/photo7.png', '/memories/photo8.png', '/memories/photo9.png', '/memories/photo10.png', '/memories/photo11.png', '/memories/photo12.png', '/memories/photo13.jpg', '/memories/photo14.png', '/memories/photo15.png', '/memories/photo16.jpg', '/memories/photo17.png', '/memories/photo18.png', '/memories/photo19.png', '/memories/photo20.png', '/memories/photo21.png', '/memories/photo22.png', '/memories/photo23.jpg', '/memories/photo24.png', '/memories/photo25.jpg', '/memories/photo26.png', '/memories/photo27.png', '/memories/photo28.jpg', '/memories/photo29.jpg', '/memories/photo30.png', '/memories/photo31.png', '/memories/photo32.png', '/memories/photo33.png', '/memories/photo34.png'];
const ALL_CELEBRATION = ['/celebration/photo1.png', '/celebration/photo2.png', '/celebration/photo3.png', '/celebration/photo4.png'];

// --- Hooks ---
const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const mounted = useIsMounted();
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [mounted]);
  return isMobile;
};

// Custom hook for preloading all images in the background
const useImagePreloader = (paths: string[]) => {
  useEffect(() => {
    paths.forEach(src => {
      const img = new window.Image();
      img.src = src;
    });
  }, [paths]);
};


// --- Background Components (Hydration Safe) ---

const BackgroundPetals = () => {
    const mounted = useIsMounted();
    const [petals, setPetals] = useState<{ id: number; left: string; delay: number; duration: number }[]>([]);
    useEffect(() => {
        setPetals(Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 10,
            duration: 5 + Math.random() * 5
        })));
    }, [mounted]);
    
    if (!mounted) return null;
    return (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            {petals.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ top: -20, left: p.left, opacity: 0, rotate: 0 }}
                    animate={{ top: "110%", opacity: [0, 1, 1, 0], rotate: 360, x: Math.sin(p.id) * 100 }}
                    transition={{ duration: p.duration, repeat: Number.POSITIVE_INFINITY, delay: p.delay, ease: "linear" }}
                    className="absolute text-pink-300/20"
                >
                    <Heart size={24} fill="currentColor" />
                </motion.div>
            ))}
        </div>
    );
};

const FloatingHearts = () => {
    const mounted = useIsMounted();
    const [hearts, setHearts] = useState<{ id: number; top: number; left: number; delay: number }[]>([]);
    useEffect(() => {
        setHearts(Array.from({ length: window.innerWidth < 768 ? 8 : 15 }).map((_, i) => ({
            id: i,
            top: Math.random() * 100,
            left: Math.random() * 100,
            delay: Math.random() * 2,
        })));
    }, [mounted]);

    if (!mounted) return null;
    return (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
            {hearts.map((heart) => (
                <Heart
                    key={heart.id}
                    className="heart-float text-pink-400 absolute opacity-30"
                    size={32}
                    style={{
                        top: `${heart.top}%`,
                        left: `${heart.left}%`,
                        animationDelay: `${heart.delay}s`,
                    }}
                />
            ))}
        </div>
    );
};

const FloatingBalloons = () => {
    const mounted = useIsMounted();
    const [balloons, setBalloons] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);
    useEffect(() => {
        setBalloons(Array.from({ length: window.innerWidth < 768 ? 5 : 15 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 15 + Math.random() * 10,
        })));
    }, [mounted]);

    if (!mounted) return null;
    return (
        <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
            {balloons.map((b) => (
                <motion.div
                    key={b.id}
                    initial={{ y: "110vh", opacity: 0 }}
                    animate={{ y: "-100vh", opacity: 1 }}
                    transition={{ duration: b.duration, repeat: Number.POSITIVE_INFINITY, delay: b.delay, ease: "linear" }}
                    className="absolute text-6xl opacity-40"
                    style={{ left: `${b.left}%` }}
                >
                    🎈
                </motion.div>
            ))}
        </div>
    );
};

const CutieBackground = () => {
    const mounted = useIsMounted();
    const [elements, setElements] = useState<{ id: number; top: string; left: string; delay: number }[]>([]);
    useEffect(() => {
        setElements(Array.from({ length: window.innerWidth < 768 ? 10 : 25 }).map((_, i) => ({
            id: i,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            delay: Math.random() * 2,
        })));
    }, [mounted]);

    if (!mounted) return null;
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    className="absolute text-4xl"
                    initial={{ top: el.top, left: el.left, scale: 0.5, opacity: 0 }}
                    animate={{ y: [0, -20, 0], scale: [0.5, 1, 0.5], opacity: [0, 0.8, 0] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: el.delay }}
                >
                    {["🌸", "✨", "🍭", "🎀", "🧸", "🎈", "🍰", "🌟"][el.id % 8]}
                </motion.div>
            ))}
        </div>
    );
};

// --- Screens ---

const CountdownScreen = ({ targetDate, onComplete }: { targetDate: Date; onComplete: () => void }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);
  
  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    };
    
    setTimeLeft(calculate());
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const isCelebrationTime = !!timeLeft && (timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds === 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#fff0f3] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl w-full space-y-12">
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[#4a154b] leading-tight">
            Counting down to <br />
            <span className="text-[#d81b60]">Mohar's</span> special day 🎂
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium italic">
            "You mean more to me than words can ever explain" 💖
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 justify-center">
          {[
            { label: "DAYS", value: timeLeft?.days ?? 0 },
            { label: "HOURS", value: timeLeft?.hours ?? 0 },
            { label: "MINUTES", value: timeLeft?.minutes ?? 0 },
            { label: "SECONDS", value: timeLeft?.seconds ?? 0 },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center space-y-2">
              <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-3xl shadow-xl flex items-center justify-center text-3xl md:text-5xl font-bold text-[#d81b60] border-2 border-pink-100">
                {String(item.value).padStart(2, "0")}
              </div>
              <span className="text-xs md:text-sm font-bold text-gray-500 tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-6 pt-8">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }} className="flex items-center justify-center gap-2 text-[#d81b60] font-semibold">
            <Sparkles size={20} />
            <p>A special celebration awaits you...</p>
            <Sparkles size={20} />
          </motion.div>
          <Button
            onClick={onComplete}
            disabled={!isCelebrationTime}
            className={`rounded-full px-12 py-8 text-xl font-bold transition-all shadow-lg ${isCelebrationTime ? "bg-[#d81b60] hover:bg-[#ad1457] text-white hover:scale-105" : "bg-pink-100 text-pink-300"}`}
          >
            <Gift className="mr-2" />
            Let's Celebrate
          </Button>
        </div>
      </div>
    </motion.div>
  );
};


const QuestionScreen = ({ onYes }: { onYes: () => void }) => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="flex flex-col items-center justify-center min-h-screen p-4 text-center space-y-8 bg-[#fff0f3]">
    <Card className="p-8 md:p-12 shadow-2xl rounded-[2rem] border-none bg-white/80 backdrop-blur-sm max-w-md">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-tight">Do you wanna see what I made buubuu??</h2>
      <Button onClick={onYes} className="bg-[#d81b60] hover:bg-[#ad1457] text-white rounded-full py-8 px-12 text-2xl font-bold shadow-xl transition-all hover:scale-110 animate-bounce">Yes! 👆</Button>
    </Card>
  </motion.div>
);

const MadamJiScreen = ({ onNext }: { onNext: () => void }) => (
  <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="flex flex-col items-center justify-center min-h-screen p-4 text-center space-y-8 bg-[#fff5f7]">
    <Card className="p-10 md:p-14 shadow-2xl rounded-[2rem] border-none bg-white/90 backdrop-blur-sm max-w-lg">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 leading-relaxed italic">Have a look at it, Madam Jiii</h2>
      <Button onClick={onNext} className="bg-[#d81b60] hover:bg-[#ad1457] text-white rounded-full px-12 py-8 text-2xl font-bold shadow-xl transition-all hover:scale-110">Let's Go! 🚀</Button>
    </Card>
  </motion.div>
);

const CelebrationScreen = () => {
  const isMobile = useIsMobile();
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
  const [isMemoriesOpen, setIsMemoriesOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
  const [isCakeOpen, setIsCakeOpen] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState<boolean[]>([false, false, false]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicSrc, setMusicSrc] = useState("/du-haatey.mp3");

  

  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = (src?: string) => {
    if (src && src !== musicSrc) {
      setMusicSrc(src);
    }
    setIsPlaying(true);
  };

  const stopMusic = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // On mobile, sometimes a load() is needed after changing src
          audio.load();
          audio.play().catch(e => console.log("Final play attempt failed:", e));
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, musicSrc]);

  useEffect(() => {
    if (lightsOn) {
        confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
    }
  }, [lightsOn]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-1000 ${lightsOn ? "bg-[#4a154b]" : "bg-black"}`}>
        <audio ref={audioRef} id="bg-music" loop src={musicSrc} />
        
        <AnimatePresence>
          {!lightsOn ? (
            <motion.div exit={{ opacity: 0, scale: 0.8 }} className="space-y-8 text-center">
              <h1 className="text-3xl text-white font-bold animate-pulse">Everything is ready...</h1>
              <Button onClick={() => setLightsOn(true)} className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full px-12 py-8 text-2xl font-bold shadow-[0_0_30px_rgba(250,204,21,0.6)] scale-110">Turn On the Lights 💡</Button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 max-w-6xl w-full py-10 text-center relative z-10">
              <h1 className="text-6xl md:text-9xl font-black text-white drop-shadow-[0_0_20px_rgba(255,105,180,0.8)] leading-tight">
                HAPPY BIRTHDAY <br />
                <span className="text-pink-300 uppercase tracking-widest text-shine">Mohar!</span>
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
                <Card onClick={() => { setIsMessageOpen(true); toggleMusic("/du-haatey.mp3"); }} className="p-10 bg-white/5 backdrop-blur-xl border border-pink-500/20 text-white flex flex-col items-center gap-6 group cursor-pointer hover:bg-white/15 transition-all card-3d shadow-2xl">
                    <MailOpen className="w-20 h-20 text-pink-400 group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-bold">My Dearest Mohar</h3>
                    <p className="text-pink-200/60 font-medium">A special letter for you... 💌</p>
                </Card>

                <Card onClick={() => { setIsMemoriesOpen(true); toggleMusic("/gehra-hua.mp3"); }} className="p-10 bg-white/5 backdrop-blur-xl border border-pink-500/20 text-white flex flex-col items-center gap-6 group cursor-pointer hover:bg-white/15 transition-all card-3d shadow-2xl">
                    <Sparkles className="w-20 h-20 text-yellow-400 group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-bold">Our Memories</h3>
                    <p className="text-pink-200/60 font-medium">Flipping through our story... 📸</p>
                </Card>

                <Card onClick={() => { setIsCakeOpen(true); stopMusic(); }} className="p-10 bg-white/5 backdrop-blur-xl border border-pink-500/20 text-white flex flex-col items-center gap-6 group cursor-pointer hover:bg-white/15 transition-all card-3d shadow-2xl">
                    <Gift className="w-20 h-20 text-purple-400 group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-bold">Make a Wish</h3>
                    <p className="text-pink-200/60 font-medium">Time for some magic... 🎂</p>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Modals --- */}
        <AnimatePresence>
            {isMessageOpen && (
                <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setIsMessageOpen(false); stopMusic(); }}>
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#fff5f7] p-8 md:p-14 rounded-[3rem] max-w-2xl w-full shadow-2xl relative border-4 border-pink-200 overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
                        <h2 className="text-3xl font-bold text-[#d81b60] mb-8 font-serif">Deep in my Heart...</h2>
                        <div className="text-gray-700 leading-relaxed text-lg space-y-6 text-left">
                                            <p>Happy 18th birthday to the most precious girl in my life 🌚🤍<br/>
                Today isn’t just your birthday for me — it’s a celebration of <em>you</em>, of <em>us</em>, and of everything we’ve shared in this beautiful one-year journey together.</p>
                <p>
                  I love u mahh Mum, my kuchupuchu, my bubuu, my bhondiii! ❤️
                  <br/>
                  Enjoy ur day! ✨
                </p>

                <p>It still feels unreal how one year ago we started this journey, and today here we are, stronger, closer, and more in love than ever. Every moment with you has taught me what real love feels like. You are not like others — and that’s exactly why I fell for you so deeply 🥹. My Bubuu Mum, you understand me, stand by me, trust me, and love me in a way I never thought was possible.</p>

                <p>You are truly the best girlfriend anyone could ever ask for. No one has ever loved me the way you do — the care, the patience, the trust, the way you believe in me… trust me, it means <em>everything</em> to me. You are my comfort, my happiness, my safe place, and my biggest blessing.</p>

                <p>Seeing you turn 18 makes me so proud and so happy. I hope you spend your birthday smiling, laughing, and enjoying every single moment because you deserve nothing less. I wish you endless happiness, success, peace, and love in your future — and I hope I get to be by your side through all of it.</p>

                <p>From the bottom of my heart, I wish that we continue celebrating not just birthdays, but life together — year after year, hand in hand, till the very end 😌. I can’t wait for the day when I hold you and celebrate our birthdays together, forever, my Bubuu Mum.</p>

                <p>Thank you for choosing me, for loving me the way you do, and for being <em>you</em>. I’m so grateful for us, for our journey, and for every memory we’re yet to create.</p>

                <p>Once again, happy birthday my Mum 🤍<br/>
                I love you more than words can ever express.</p>
                        </div>
                        <p className="text-right font-bold text-[#d81b60] text-2xl mt-8 italic">Always yours, Sayann ❤️</p>
                        <Button onClick={() => { setIsMessageOpen(false); stopMusic(); }} className="mt-10 w-full bg-[#d81b60] py-8 rounded-2xl text-xl font-bold">Close with Love</Button>
                    </motion.div>
                </div>
            )}

            {isMemoriesOpen && (
                <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
                    <button onClick={() => { setIsMemoriesOpen(false); stopMusic(); }} className="absolute top-10 right-10 text-white bg-white/10 p-4 rounded-full hover:bg-white/20"><X size={40}/></button>
                    <h2 className="text-4xl md:text-6xl text-pink-300 font-bold mb-12 drop-shadow-lg tracking-widest">OUR MEMORIES 📸</h2>
                    <div className="flex gap-10 overflow-x-auto p-12 w-full snap-x snap-mandatory hide-scrollbar items-center md:perspective-[2000px] scroll-smooth">
                        {ALL_MEMORIES.map((src, i) => (
                          <motion.div key={i} whileHover={{ scale: 1.1, rotate: 0, zIndex: 100 }} className="flex-shrink-0 w-72 md:w-96 snap-center bg-white p-4 pb-16 shadow-2xl relative transform transition-transform duration-500 rotate-2 cursor-pointer" onClick={() => setSelectedMemory(src)}>
                             <div className="w-full aspect-[4/5] relative overflow-hidden bg-gray-100">
                                <Image src={src} alt="Memory" fill className="object-cover" sizes="(max-width: 768px) 288px, 384px" priority={i < 4} quality={75} />
                             </div>
                             <div className="absolute bottom-6 left-0 right-0 text-center text-gray-800 font-bold text-xl italic">Memory #{i + 1}</div>
                          </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {selectedMemory && (
                <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4" onClick={() => setSelectedMemory(null)}>
                    <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="relative max-w-4xl w-full h-[80vh] bg-white p-4 rounded-2xl">
                        <Image src={selectedMemory} alt="Enlarged Memory" fill className="object-contain shadow-2xl" priority quality={90} />
                    </motion.div>
                </div>
            )}

            {isCakeOpen && (
                <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 text-center">
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white/10 p-16 rounded-[4rem] border border-white/10 backdrop-blur-md max-w-2xl w-full relative">
                        <h2 className="text-4xl font-bold text-white mb-16">{candlesBlown.every(b => b) ? "💖 WISH GRANTED! 💖" : "MAKE A WISH & BLOW! 🕯️"}</h2>
                        <div className="flex gap-12 justify-center h-48 items-end">
                            {[0, 1, 2].map(i => (
                              <div key={i} onClick={() => {
                                const newBlown = [...candlesBlown];
                                if (!newBlown[i]) {
                                    newBlown[i] = true;
                                    setCandlesBlown(newBlown);
                                    if (newBlown.every(b => b)) confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
                                }
                              }} className="w-12 h-32 bg-gradient-to-t from-pink-500 to-pink-300 rounded-t-xl relative cursor-pointer group hover:scale-110 transition-transform shadow-lg">
                                {!candlesBlown[i] && <Flame size={60} className="absolute -top-14 left-1/2 -translate-x-1/2 text-orange-500 animate-bounce drop-shadow-[0_0_15px_rgba(255,165,0,0.8)]" fill="currentColor" />}
                                <div className="w-full h-4 bg-white/20 mt-4 rotate-3" />
                                <div className="w-full h-4 bg-white/20 mt-8 -rotate-3" />
                              </div>
                            ))}
                        </div>
                        {candlesBlown.every(b => b) && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-pink-300 mt-16 text-3xl font-bold animate-pulse">May all your dreams come true, buubuu ✨</motion.p>
                        )}
                        <Button onClick={() => { setIsCakeOpen(false); setCandlesBlown([false, false, false]); stopMusic(); }} className="mt-12 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-10 py-4 rounded-xl">Go Back</Button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </motion.div>
  );
};


export default function BirthdayPage() {
  const mounted = useIsMounted();
  const [step, setStep] = useState<"countdown" | "intro" | "madam" | "celebration">("countdown");

  
  useImagePreloader([...ALL_MEMORIES, ...ALL_CELEBRATION]);

  
  // Final target date: February 8th, 2026
  const targetDate = new Date("2026-02-08T00:00:00");

  if (!mounted) return <div className="min-h-screen bg-[#fff0f3] flex items-center justify-center"><h1 className="text-pink-300 font-bold animate-pulse">Loading Magic...</h1></div>;

  return (
    <main className="font-sans antialiased overflow-x-hidden bg-[#fff0f3] relative min-h-screen">
      <BackgroundPetals />
      <FloatingHearts />
      <FloatingBalloons />
      <CutieBackground />
      
      <AnimatePresence mode="wait">
        {step === "countdown" && <CountdownScreen key="countdown" targetDate={targetDate} onComplete={() => setStep("intro")} />}
        {step === "intro" && <QuestionScreen key="intro" onYes={() => setStep("madam")} />}
        {step === "madam" && <MadamJiScreen key="madam" onNext={() => setStep("celebration")} />}
        {step === "celebration" && <CelebrationScreen key="celebration" />}
      </AnimatePresence>
    </main>
  );
}
