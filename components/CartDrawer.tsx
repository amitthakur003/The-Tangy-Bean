"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SHIPPING_THRESHOLD = 999; // Free shipping above ₹999

export default function CartDrawer() {
    const { items, isOpen, toggleCart, addItem, removeItem, updateQuantity, getSubtotal } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const subtotal = isMounted ? getSubtotal() : 0;
    const progress = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100);
    const spendingLeft = SHIPPING_THRESHOLD - subtotal;

    // Prevent hydration mismatch for persistent state
    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                            <h2 className="text-xl font-serif text-zinc-900">Your Selection</h2>
                            <button type="button" onClick={(e) => { e.stopPropagation(); toggleCart(); }} className="text-zinc-400 hover:text-zinc-900 transition-colors">
                                <span className="sr-only">Close</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Free Shipping Bar */}
                        <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-100">
                            <div className="flex justify-between text-xs font-medium uppercase tracking-widest text-zinc-500 mb-2">
                                <span>{progress === 100 ? "Free Shipping Unlocked" : `Add ₹${spendingLeft} for Free Shipping`}</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1 w-full bg-zinc-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-zinc-900"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <span className="text-4xl mb-4">🍂</span>
                                    <p className="text-zinc-900 font-serif text-lg mb-2">Your Page is Empty</p>
                                    <Link href="/juices" onClick={(e) => { e.stopPropagation(); toggleCart(); }} className="text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-300 pb-1 hover:text-zinc-900 hover:border-zinc-900 transition-colors">
                                        Return to Shop
                                    </Link>
                                </div>
                            ) : (
                                <ul className="space-y-6">
                                    {items.map((item) => (
                                        <motion.li
                                            key={item.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex gap-4"
                                        >
                                            {/* Image */}
                                            <div className="relative h-24 w-20 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="font-serif text-zinc-900">{item.name}</h3>
                                                        <p className="text-sm font-medium text-zinc-900">₹{item.price * item.quantity}</p>
                                                    </div>
                                                    <p className="text-xs text-zinc-500">{item.variant || "Standard Bottle"}</p>
                                                </div>

                                                {/* Controls */}
                                                <div className="flex justify-between items-center mt-2">
                                                    <div className="flex items-center border border-zinc-200 rounded-full px-2 py-1 gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, item.quantity - 1); }}
                                                            className="text-zinc-400 hover:text-zinc-900 text-xs w-4"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, item.quantity + 1); }}
                                                            className="text-zinc-400 hover:text-zinc-900 text-xs w-4"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                                                        className="text-[10px] uppercase tracking-wider text-zinc-400 hover:text-red-500 transition-colors underline decoration-zinc-200 underline-offset-2"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Upsell */}
                        {items.length > 0 && !items.find(i => i.id === "chocolate") && (
                            <div className="p-6 bg-zinc-50/50 border-t border-zinc-100">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">You might also like</p>
                                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                                    <div className="flex items-center gap-3 min-w-[200px] border border-zinc-200 p-2 rounded-lg bg-white">
                                        <div className="w-10 h-10 bg-zinc-100 rounded md overflow-hidden relative">
                                            <Image
                                                src="/images/chocolate/100.jpg"
                                                alt="Dutch Dark Chocolate"
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-serif text-zinc-900">Dutch Dark Chocolate</p>
                                            <p className="text-[10px] text-zinc-500">₹140</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addItem({
                                                    id: "chocolate",
                                                    name: "Dutch Dark Chocolate",
                                                    price: 140,
                                                    image: "/images/chocolate/100.jpg",
                                                    quantity: 1,
                                                    variant: "200 grams"
                                                });
                                            }}
                                            className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-900 hover:text-white flex items-center justify-center text-xs transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-zinc-100 bg-white">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-zinc-500">Subtotal</span>
                                    <span className="text-lg font-serif font-medium text-zinc-900">₹{subtotal}</span>
                                </div>
                                <p className="text-xs text-zinc-400 mb-6 text-center">Shipping & taxes calculated at checkout.</p>
                                <button type="button" onClick={(e) => e.stopPropagation()} className="w-full bg-zinc-900 text-white py-4 rounded-full text-xs font-bold uppercase tracking-[0.15em] hover:bg-zinc-800 transition-colors">
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
