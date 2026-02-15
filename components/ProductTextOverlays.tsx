"use client";

import { MotionValue, useTransform, motion } from "framer-motion";
import { Product } from "@/data/products";

interface ProductTextOverlaysProps {
    product: Product;
    scrollYProgress: MotionValue<number>;
    textColor?: string;
}

export default function ProductTextOverlays({ product, scrollYProgress, textColor = "black" }: ProductTextOverlaysProps) {

    return (
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full flex flex-col justify-center">
            {/* 
               Alternating Layout to frame the center bottle 
               S1: Left (Hero Title)
               S2: Right (Feature)
               S3: Left (Benefit)
               S4: Right (Conclusion)
            */}
            <Section progress={scrollYProgress} range={[0.0, 0.15, 0.20]} text={product.section1} align="left" textColor={textColor} />
            <Section progress={scrollYProgress} range={[0.25, 0.35, 0.45]} text={product.section2} align="right" textColor={textColor} />
            <Section progress={scrollYProgress} range={[0.50, 0.60, 0.70]} text={product.section3} align="left" textColor={textColor} />
            <Section progress={scrollYProgress} range={[0.75, 0.85, 0.95]} text={product.section4} align="right" textColor={textColor} />
        </div>
    );
}

function Section({ progress, range, text, align, textColor }: {
    progress: MotionValue<number>,
    range: [number, number, number],
    text: { title: string, subtitle: string },
    align: "left" | "right" | "center",
    textColor: string
}) {
    // Reveal
    const opacity = useTransform(progress,
        [range[0], (range[0] + range[1]) / 2, range[1], range[2]],
        [0, 1, 1, 0]
    );

    // Movement: Slide slightly in from the side
    const x = useTransform(progress,
        [range[0], range[1], range[2]],
        [align === "left" ? -50 : 50, 0, align === "left" ? -50 : 50]
    );

    const scale = useTransform(progress,
        [range[0], (range[0] + range[1]) / 2, range[2]],
        [0.9, 1, 0.9]
    );

    // Alignment Classes
    let alignClass = "";
    if (align === "left") alignClass = "left-6 md:left-20 items-start text-left";
    if (align === "right") alignClass = "right-6 md:right-20 items-end text-right";
    if (align === "center") alignClass = "inset-x-0 mx-auto items-center text-center";

    return (
        <motion.div
            style={{ opacity, x, scale, color: textColor }}
            className={`absolute top-1/2 -translate-y-1/2 p-6 flex flex-col max-w-[20rem] md:max-w-md ${alignClass}`}
        >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter uppercase drop-shadow-lg leading-tight">
                {text.title}
            </h2>
            <p className="text-lg md:text-2xl font-light opacity-90 drop-shadow-md">
                {text.subtitle}
            </p>
        </motion.div>
    );
}
