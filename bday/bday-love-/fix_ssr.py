import os

path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

# 1. Fix CutieBackground to be SSR safe
# I'll move the elements to a state populated in useEffect, just like FloatingHearts and FloatingBalloons
cutie_bg_replacement = """const CutieBackground = () => {
    const [elements, setElements] = useState<{ id: number; top: string; left: string; delay: number }[]>([])
    
    useEffect(() => {
        setElements(
            Array.from({ length: window.innerWidth < 768 ? 6 : 20 }).map((_, i) => ({
                id: i,
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                delay: Math.random() * 2,
            }))
        )
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    className="absolute text-4xl"
                    initial={{
                        top: el.top,
                        left: el.left,
                        scale: 0.5,
                        opacity: 0,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        scale: [0.5, 1, 0.5],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: el.delay,
                    }}
                >
                    {["🌸", "✨", "🍭", "🎀", "🧸"][Math.floor(Math.random() * 5)]}
                </motion.div>
            ))}
        </div>
    )
}"""

# Need to find the exact block to replace.
# I'll just replace from 'const CutieBackground = () => {' to the end of the component.
# It ends before the next component or the main page.

# Let's find the range.
# Based on cat: Line 142 to around Line 175.

content = content.replace(
    'const CutieBackground = () => {\n      return (\n          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">\n              {Array.from({ length: window.innerWidth < 768 ? 6 : 20 }).map((_, i) => (\n                  <motion.div\n                      key={i}\n                      className="absolute text-4xl"\n                      initial={{\n                          top: Math.random() * 100 + "%",\n                          left: Math.random() * 100 + "%",\n                          scale: 0.5,\n                          opacity: 0,\n                      }}\n                      animate={{\n                          y: [0, -20, 0],\n                          scale: [0.5, 1, 0.5],\n                          opacity: [0, 0.8, 0],\n                      }}\n                      transition={{\n                          duration: 3 + Math.random() * 5,\n                          repeat: Number.POSITIVE_INFINITY,\n                          delay: Math.random() * 2,\n                      }}\n                  >\n                      {["🌸", "✨", "🍭", "🎀", "🧸"][Math.floor(Math.random() * 5)]}\n                  </motion.div>\n              ))}\n          </div>\n      )\n    }',
    cutie_bg_replacement
)

with open(path, "w") as f:
    f.write(content)

print("SSR Build Error Fixed")
