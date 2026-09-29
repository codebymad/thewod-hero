import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"

export function RotateWordsMotion({
    text = "Rotate",
    words = ["Word 1", "Word 2", "Word 3"],
}: {
    text: string
    words: string[]
}) {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const currentWord = words[index];
        const delay = currentWord === 'WOD' ? 3000 : 1000;
        const timeout = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, delay);
        return () => clearTimeout(timeout);
    }, [index, words]);

    return (

        <div className={`'text-left' transition-all duration-500`}>
            <div className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter flex 'justify-start' gap-2 transition-all duration-500`}>
                {text}{' '}
                <AnimatePresence mode="wait">
                    <motion.span
                        key={words[index]}
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.5 }}
                    >
                        {words[index]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    )
}