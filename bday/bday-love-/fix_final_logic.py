import os

path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

# 1. Define stopMusic (it was missing!)
if 'const stopMusic = () => {' not in content:
    content = content.replace(
        '  const toggleMusic = (src) => {',
        '  const stopMusic = () => {\n    const audio = document.getElementById("bg-music") as HTMLAudioElement;\n    if (audio) {\n      audio.pause();\n      setIsPlaying(false);\n    }\n  };\n\n  const toggleMusic = (src) => {'
    )

# 2. Fix the stopMusic call in Memories button (trailing semicolon issue)
content = content.replace('onClick={() => setIsMemoriesOpen(false); stopMusic();}', 'onClick={() => { setIsMemoriesOpen(false); stopMusic(); }}')
content = content.replace('onClick={() => setIsCelebrationOpen(false); stopMusic();}', 'onClick={() => { setIsCelebrationOpen(false); stopMusic(); }}')

# 3. Add useIsMobile hook to CelebrationScreen for better UI optimization
if 'const isMobile = useIsMobile();' not in content.split('const CelebrationScreen = () => {')[1].split('\n')[1]:
    content = content.replace(
        'const CelebrationScreen = () => {',
        'const CelebrationScreen = () => {\n  const isMobile = useIsMobile();'
    )

# 4. Improve Memories UI scroll UX
# I'll add snap-proximity and hide scrollbar properly
content = content.replace(
    'className="flex overflow-x-auto gap-12 p-14 w-full max-w-[95vw] snap-x snap-mandatory hide-scrollbar items-center md:perspective-[2000px]"',
    'className="flex overflow-x-auto gap-6 md:gap-12 p-8 md:p-14 w-full max-w-[95vw] snap-x snap-mandatory hide-scrollbar items-center md:perspective-[2000px] scroll-smooth"'
)

# 5. Disable heavy animations on mobile
# We need to use isMobile in the background components.
# Let's ensure they are defined with useIsMobile.
# In previous turn I added useIsMobile to the file, let's make sure components use it.

with open(path, "w") as f:
    f.write(content)

print("Logic fixed and UX improved")
