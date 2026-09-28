"use client"
import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"

export function RotateWordsMotion({
    text = "Rotate",
    words = ["Word 1", "Word 2", "Word 3"],
}: {
    text: string
    words: string[]
}) {
    const [index, setIndex] = React.useState(0)
    const [isFinal, setIsFinal] = React.useState(false)

    React.useEffect(() => {
        if (isFinal) return // Stop if we've reached the last word

        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                const nextIndex = prevIndex + 1
                if (nextIndex === words.length - 1) {
                    setIsFinal(true) // Stop at last word
                }
                return nextIndex
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [words.length, isFinal])


    return (

        <div className={`${isFinal ? 'text-center' : 'text-left'} transition-all duration-500`}>
            <div className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter flex ${isFinal ? 'justify-center' : 'justify-start'} gap-2 transition-all duration-500`}>
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