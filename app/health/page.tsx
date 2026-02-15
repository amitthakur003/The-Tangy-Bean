"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState, useRef } from "react";
import Link from "next/link";

export default function HealthPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <main ref={containerRef} className="min-h-screen bg-zinc-50 bg-noise text-zinc-900 overflow-hidden relative">
            <Navbar />

            {/* Hero Section: Molecular Freshness */}
            <section className="h-screen flex flex-col items-center justify-center relative z-10 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center max-w-4xl"
                >
                    <span className="block text-xs md:text-sm tracking-[0.3em] text-zinc-400 uppercase mb-8">
                        The Science of Nature
                    </span>
                    <h1 className="text-6xl md:text-9xl font-serif text-zinc-950 mb-12 tracking-tight">
                        Molecular <br /> Freshness
                    </h1>
                    <p className="max-w-xl mx-auto text-lg text-zinc-500 leading-relaxed font-light">
                        We don&apos;t just extract juice. We preserve the living intelligence of the fruit.
                        A study in bio-availability, cellular hydration, and pure vitality.
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                    <div className="w-[1px] h-24 bg-gradient-to-b from-zinc-300 to-transparent" />
                </motion.div>
            </section>

            {/* The Pillars: Floating Lab Grid */}
            <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-32 gap-x-12">

                    {/* SVG Connecting Line (Abstract) */}
                    <div className="hidden lg:block absolute left-[50%] top-0 bottom-0 w-[1px] bg-zinc-200 -z-10" />

                    {/* Pillar 01: Bio-Active Recovery */}
                    <SciencePillar
                        number="01"
                        title="Bio-Active Recovery"
                        category="ENZYMATIC PRESERVATION"
                        description="Our cold-press process generates zero heat, ensuring living enzymes remain intact to accelerate muscle recovery and cellular repair."
                        alignment="left"
                        glow="shadow-[0_0_100px_rgba(255,190,0,0.2)]" // Mango Gold
                        imageSrc="/images/science/science-recovery.jpg"
                    />

                    {/* Pillar 02: Cognitive Clarity */}
                    <SciencePillar
                        number="02"
                        title="Cognitive Clarity"
                        category="NEURO-NUTRITION"
                        description="Raw cacao and berry flavonoids cross the blood-brain barrier, sharpening focus and reducing mental fatigue without the caffeine crash."
                        alignment="right"
                        glow="shadow-[0_0_100px_rgba(80,40,20,0.2)]" // Chocolate Brown
                        imageSrc="/images/science/science-clarity.jpg"
                    />

                    {/* Pillar 03: Cellular Hydration */}
                    <SciencePillar
                        number="03"
                        title="Cellular Hydration"
                        category="OSMOTIC BALANCE"
                        description="Botanical electrolytes match your body's natural osmolarity, allowing moisture to penetrate cells faster than water alone."
                        alignment="left"
                        glow="shadow-[0_0_100px_rgba(200,50,50,0.2)]" // Kokum Red
                        imageSrc="/images/science/science-hydration.jpg"
                    />

                    {/* Pillar 04: Prebiotic Synthesis */}
                    <SciencePillar
                        number="04"
                        title="Prebiotic Synthesis"
                        category="GUT MICROBIOME"
                        description="Active fibers nourish beneficial flora, establishing a symbiotic gut-brain axis that enhances immunity and systemic vitality."
                        alignment="right"
                        glow="shadow-[0_0_100px_rgba(50,200,100,0.2)]" // Green/Nature
                        imageSrc="/images/science/science-extra.jpg"
                    />

                </div>

                {/* Final Call to Action */}
                <div className="mt-40 text-center">
                    <p className="text-zinc-400 text-sm tracking-widest uppercase mb-6">experience the science</p>
                    <Link href="/juices" className="inline-block px-12 py-5 bg-zinc-900 text-zinc-50 font-bold tracking-widest uppercase hover:bg-zinc-700 transition-colors rounded-full text-xs">
                        Explore The Collection
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}

// Reusable Pillar Component with "Hover-to-Expand" interaction
function SciencePillar({ number, title, category, description, alignment, glow, imageSrc }: {
    number: string,
    title: string,
    category: string,
    description: string,
    alignment: 'left' | 'right',
    glow: string,
    imageSrc: string
}) {
    const isLeft = alignment === 'left';

    return (
        <div className={`col-span-1 lg:col-span-6 ${isLeft ? 'lg:col-start-1 lg:text-right lg:pr-24' : 'lg:col-start-7 lg:text-left lg:pl-24'} relative group`}>

            {/* The Number */}
            <span className={`block font-serif text-8xl md:text-[10rem] text-zinc-100 leading-none mb-4 transition-colors duration-700 group-hover:text-zinc-200 select-none ${isLeft ? '' : ''}`}>
                {number}
            </span>

            {/* Content Block */}
            <div className="relative z-10">
                <span className="block text-xs font-bold tracking-[0.2em] text-zinc-400 mb-4 uppercase">
                    {category}
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-6 group-hover:scale-[1.02] transition-transform duration-500 origin-top-left">
                    {title}
                </h2>

                {/* Expandable Details */}
                <div className="relative overflow-hidden">
                    <p className="text-lg text-zinc-500 font-light leading-relaxed mb-8 max-w-md ml-auto mr-auto lg:ml-0 lg:mr-0">
                        {description}
                    </p>

                    {/* Interactive "Read Data" Button */}
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 cursor-pointer hover:border-black transition-colors">
                        View Clinical Data
                        <span className="text-[10px]">+</span>
                    </div>

                    {/* Abstract "Lab" Image Placeholder */}
                    <motion.div
                        className={`mt-12 w-full h-80 bg-zinc-900 rounded-lg overflow-hidden relative ${glow}`}
                        initial={{ opacity: 0, height: 0 }}
                        whileInView={{ opacity: 1, height: 320 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src={imageSrc}
                            alt={title}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Decorative Connection Line */}
            <div className={`hidden lg:block absolute top-24 ${isLeft ? '-right-12 w-12' : '-left-12 w-12'} h-[1px] bg-zinc-200`} />
        </div>
    );
}
