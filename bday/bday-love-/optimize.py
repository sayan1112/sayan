import os

path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

# 1. Add toggleMusic helper
new_state = """  const [isPlaying, setIsPlaying] = useState(false)
  const [musicSrc, setMusicSrc] = useState("/du-haatey.mp3")

  const toggleMusic = (src) => {
    const audio = document.getElementById('bg-music');
    if (audio) {
      if (src && src !== musicSrc) {
        audio.src = src;
        setMusicSrc(src);
      }
      setIsPlaying(true);
      audio.play().catch(e => console.log("Play failed:", e));
    }
  };"""

content = content.replace('  const [isPlaying, setIsPlaying] = useState(false)\n  const [musicSrc, setMusicSrc] = useState("/du-haatey.mp3")', new_state)

# 2. Fix useEffect
content = content.replace('  }, [isPlaying, musicSrc])', '  }, [isPlaying])')

# 3. Fix Cards
content = content.replace(
    'onClick={() => { setIsMessageOpen(true); setMusicSrc("/du-haatey.mp3"); setIsPlaying(true); }}',
    'onClick={() => { setIsMessageOpen(true); toggleMusic("/du-haatey.mp3"); }}'
)

content = content.replace(
    'onClick={() => { setIsMemoriesOpen(true); setMusicSrc("/gehra-hua.mp3"); setIsPlaying(true); }}',
    'onClick={() => { setIsMemoriesOpen(true); toggleMusic("/gehra-hua.mp3"); }}'
)

# 4. Performance: remove perspective on mobile and add priority
content = content.replace(
    'className="flex overflow-x-auto gap-12 p-14 w-full max-w-[95vw] snap-x snap-mandatory hide-scrollbar items-center perspective-[2000px]"',
    'className="flex overflow-x-auto gap-12 p-14 w-full max-w-[95vw] snap-x snap-mandatory hide-scrollbar items-center md:perspective-[2000px]"'
)

content = content.replace(
    'sizes="(max-width: 768px) 100vw, 33vw"',
    'sizes="(max-width: 768px) 100vw, 33vw" priority={index < 4}'
)

with open(path, "w") as f:
    f.write(content)

print("Optimized app/page.tsx")
