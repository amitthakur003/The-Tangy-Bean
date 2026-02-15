"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    // Cart Store
    const { toggleCart, items } = useCartStore();
    const [itemCount, setItemCount] = useState(0);

    // Hydration check for persisted store
    useEffect(() => {
        setItemCount(items.reduce((acc, item) => acc + item.quantity, 0));
    }, [items]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 100);
    });

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out pointer-events-none ${isScrolled ? "py-4 bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-sm" : "py-8 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center pointer-events-auto">
                {/* Minimal Text Logo */}
                <Link href="/" className="group">
                    <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled ? "text-white/90" : "text-black"
                        }`}>
                        The Tangy Bean
                    </span>
                </Link>

                {/* Nav Links */}
                <div className={`hidden md:flex gap-8 text-sm font-medium transition-colors ${isScrolled ? "text-white/80" : "text-black/80"
                    }`}>
                    <Link href="/juices" className="hover:text-amber-500 transition-colors relative z-50">JUICES</Link>
                    <Link href="/our-story" className="hover:text-amber-500 transition-colors relative z-50">OUR STORY</Link>
                    <Link href="/health" className="hover:text-amber-500 transition-colors relative z-50">HEALTH BENEFITS</Link>
                    <div className="relative z-50">
                        <button onClick={(e) => { e.stopPropagation(); toggleCart(); }} className="hover:text-amber-500 transition-colors uppercase whitespace-nowrap">
                            Cart {itemCount > 0 && `(${itemCount})`}
                        </button>
                    </div>
                </div>

                {/* Action */}
                <Link href="/juices" className={`px-6 py-2 rounded-full font-medium text-xs transition-colors uppercase tracking-widest ${isScrolled ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
                    }`}>
                    Order Now
                </Link>
            </div>
        </motion.nav>
    );
}
