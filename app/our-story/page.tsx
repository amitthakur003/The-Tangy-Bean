"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

// Shared animation variants for staggered reveals
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }, // Apple-ease
    },
};

export default function OurStory() {
    return (
        <main className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-black selection:text-white">
            <Navbar />

            {/* Header Section */}
            <section className="pt-40 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="flex flex-col items-center text-center"
                >
                    <motion.span variants={itemVariants} className="text-xs font-bold tracking-[0.2em] uppercase mb-6 text-zinc-500">
                        The Tangy Bean
                    </motion.span>
                    <motion.h1 variants={itemVariants} className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9]">
                        Our Story
                    </motion.h1>
                </motion.div>
            </section>

            {/* Chapter 1: The Origin - Asymmetrical Split */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    <motion.div
                        className="lg:col-span-5 order-2 lg:order-1"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={itemVariants} className="font-serif text-4xl md:text-5xl mb-8">
                            The Void in the Venue
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-lg md:text-xl font-light leading-relaxed text-zinc-600 mb-6">
                            We looked at the premium beverage shelves and saw a paradox.
                            Everything was either "healthy but dull" or "exciting but artificial."
                            There was no bridge between high-performance nutrition and the visceral joy of flavor.
                        </motion.p>
                        <motion.p variants={itemVariants} className="text-lg md:text-xl font-light leading-relaxed text-zinc-600">
                            The Tangy Bean was born from a singular obsession: to engineer the perfect sip.
                            One that respects the raw intelligence of nature while leveraging precise, cold-chain physics to deliver it untouched.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="lg:col-span-7 order-1 lg:order-2 relative h-[60vh] lg:h-[80vh] w-full overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        {/* Story 1: The Origin (Nature/Raw) */}
                        <Image
                            src="/2Section/Story1.jpg"
                            alt="Raw Ingredients - The Origin"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Chapter 2: The Process - Reversed Split */}
            <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    <motion.div
                        className="lg:col-span-7 relative h-[60vh] lg:h-[80vh] w-full overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        {/* Story 2: The Process (Lab/Cold) */}
                        <Image
                            src="/2Section/Story2.jpg"
                            alt="Cold Press Process - The Lab"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                    </motion.div>

                    <motion.div
                        className="lg:col-span-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={containerVariants}
                    >
                        <motion.h2 variants={itemVariants} className="font-serif text-4xl md:text-5xl mb-8">
                            Cold Physics
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-lg md:text-xl font-light leading-relaxed text-zinc-600 mb-6">
                            Heat is the enemy of flavor.
                            That's why we built our entire process around the absence of it.
                        </motion.p>
                        <motion.p variants={itemVariants} className="text-lg md:text-xl font-light leading-relaxed text-zinc-600">
                            From the orchard to the bottle, our ingredients never see a temperature spike.
                            We use High-Pressure Processing (HPP) — a method that applies 87,000 psi of pressure to silence bacteria without cooking the fruit.
                            It's the only way to keep the enzymes alive and the taste electric.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Chapter 3: The Mission - Minimalist Grid */}
            <section className="py-32 px-6 md:px-12 bg-white">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/10 pt-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {/* Value 1 */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-4">
                            <span className="font-serif text-3xl italic">01. Sourcing</span>
                            <p className="font-light text-zinc-600 leading-relaxed">
                                We trace every bean, leaf, and fruit back to its soil.
                                Sourcing isn't just a step; it's the foundation of our flavor architecture.
                                Only the top 1% of the harvest makes the cut.
                            </p>
                        </motion.div>

                        {/* Value 2 */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-4">
                            <span className="font-serif text-3xl italic">02. Science</span>
                            <p className="font-light text-zinc-600 leading-relaxed">
                                Nature provides the complexity; science protects it.
                                We treat our bottling line like a laboratory, measuring pH, brix, and viscosity
                                to ensure consistency without compromise.
                            </p>
                        </motion.div>

                        {/* Value 3 */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-4">
                            <span className="font-serif text-3xl italic">03. Sustainability</span>
                            <p className="font-light text-zinc-600 leading-relaxed">
                                True luxury is responsible. We use 100% recycled glass and plant-based inks.
                                Our waste is composted, returning to the earth to fuel the next harvest.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* The Closer - Cinematic Quote */}
            <section className="py-40 px-6 text-center bg-zinc-900 text-white">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <blockquote className="font-serif text-4xl md:text-6xl leading-tight mb-12">
                        "We are not just selling juice.<br />
                        We are curating the future of freshness."
                    </blockquote>
                    <a href="/juices" className="inline-block border border-white/20 px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                        View Collection
                    </a>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
