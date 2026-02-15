"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { collection } from "@/data/collection";
import { useState, useRef } from "react";
import { useCartStore } from "@/store/useCartStore";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
    exit: { opacity: 0 }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function JuiceCollection() {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;
    const totalPages = Math.ceil(collection.length / ITEMS_PER_PAGE);
    const topRef = useRef<HTMLElement>(null);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Smooth scroll to top of collection when changing pages
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const currentProducts = collection.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <section ref={topRef} id="juice-collection" className="relative py-32 px-6 md:px-12 bg-zinc-50 min-h-screen">

            {/* Section Header */}
            <div className="max-w-[1400px] mx-auto mb-12 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-serif text-zinc-900 mb-6"
                >
                    The Collection
                </motion.h2>

                <div className="flex flex-col items-center justify-center gap-4 mb-20 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent -z-10" />

                    <div className="bg-zinc-50 px-8 flex items-baseline gap-4">
                        <span className="font-serif text-6xl italic text-zinc-900">{String(currentPage).padStart(2, '0')}</span>
                        <span className="font-serif text-2xl text-zinc-300 italic">of</span>
                        <span className="font-serif text-2xl text-zinc-400 italic">{String(totalPages).padStart(2, '0')}</span>
                    </div>

                    <span className="bg-zinc-50 px-4 text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-bold border border-zinc-200 rounded-full py-1">
                        {collection.length} Flavors
                    </span>
                </div>
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-[1400px] mx-auto min-h-[800px]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    {currentProducts.map((product) => (
                        <Card key={product.id} product={product} />
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            <div className="max-w-[1400px] mx-auto mt-20 flex justify-center items-center gap-4">
                <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-6 py-3 rounded-full border border-zinc-200 text-sm font-medium uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current cursor-pointer disabled:cursor-not-allowed"
                >
                    Prev
                </button>

                <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${currentPage === i + 1
                                ? "bg-black text-white"
                                : "bg-white border border-zinc-200 text-zinc-500 hover:border-black hover:text-black"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-6 py-3 rounded-full border border-zinc-200 text-sm font-medium uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current cursor-pointer disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </section>
    );
}

function Card({ product }: { product: typeof collection[0] }) {
    const { addItem } = useCartStore();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            variant: product.id === "chocolate" ? "200g" : "300ml Bottle"
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000); // Reset button state
    };

    return (
        <motion.div
            variants={cardVariants}
            className="group relative h-[600px] w-full bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
        >
            {/* 1. Ambient Background & Type (Base Layer) */}
            <div className={`absolute inset-0 ${product.glow} opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />

            <div className="absolute top-12 left-0 right-0 text-center pointer-events-none">
                <span className={`text-[120px] leading-none font-black opacity-20 ${product.color} scale-150 block tracking-tighter`}>
                    {/* First 3 letters for background graphic */}
                    {product.name.substring(0, 3).toUpperCase()}
                </span>
            </div>

            {/* 2. Bottle Image (Middle Layer) */}
            <div className="absolute inset-x-0 top-[10%] bottom-[35%] flex items-center justify-center z-10">
                <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.1, rotate: -3 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-xl p-8"
                    />
                </motion.div>
            </div>

            {/* 3. Content Panel (Top Layer - Slide Up on Hover) */}
            {/* Default State: Title visible at bottom. Hover: Slide up to reveal details. */}
            <div className="absolute inset-x-0 bottom-0 top-[60%] z-20 flex flex-col justify-end p-8">

                {/* Glass Background for text legibility */}
                <div className="absolute inset-0 bg-white/80 backdrop-blur-md transition-all duration-500 translate-y-[60%] group-hover:translate-y-0" />

                <div className="relative z-30 text-center transition-transform duration-500 translate-y-4 group-hover:-translate-y-4">
                    {/* Always Visible Title */}
                    <h3 className="text-3xl font-bold font-serif text-zinc-900 mb-1">{product.subName}</h3>
                    <p className={`text-sm font-bold uppercase tracking-widest mb-4 opacity-50`}>{product.name} — ₹{product.price}</p>

                    {/* Hidden Details (Reveal on Hover) */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex flex-col gap-4">
                        <p className="text-zinc-600 text-sm leading-relaxed px-4">
                            {product.description}
                        </p>

                        <div className="flex flex-wrap gap-2 justify-center">
                            {product.tags.slice(0, 2).map((tag, i) => (
                                <span key={i} className="text-[10px] uppercase tracking-wider px-3 py-1 border border-zinc-200 rounded-full text-zinc-500">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className={`mt-2 w-full py-3 ${isAdded ? 'bg-amber-600' : 'bg-black'} text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors duration-300`}
                        >
                            {isAdded ? "Added to Bag" : "Add to Bag"}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
