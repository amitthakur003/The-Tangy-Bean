"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import ProductTextOverlays from "@/components/ProductTextOverlays";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";


export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const product = products[currentIndex];

    const nextProduct = () => {
        setCurrentIndex((prev: number) => (prev + 1) % products.length);
    };

    const prevProduct = () => {
        setCurrentIndex((prev: number) => (prev - 1 + products.length) % products.length);
    };

    const setProduct = (index: number) => {
        setCurrentIndex(index);
    }


    // Scroll Reset on change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [currentIndex]);

    // Loading State Logic
    const [minTimeElapsed, setMinTimeElapsed] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Branding Timer
    useEffect(() => {
        // Force close cart on mount
        useCartStore.setState({ isOpen: false });

        const timer = setTimeout(() => {
            setMinTimeElapsed(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // 2. Check both conditions
    useEffect(() => {
        if (minTimeElapsed && imagesLoaded) {
            setIsLoading(false);
        }
    }, [minTimeElapsed, imagesLoaded]);

    return (
        <main className="relative min-h-screen">
            {/* Loading Screen */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
                                The Tangy Bean
                            </h1>
                            <div className="w-16 h-1 bg-white/20 mx-auto rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-white"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content with Blur Transition */}
            <div className={`transition-all duration-1000 ease-out ${isLoading ? "blur-xl scale-95 opacity-0" : "blur-0 scale-100 opacity-100"}`}>
                <Navbar />

                {/* Background Transition */}
                <div
                    className="fixed inset-0 -z-10 bg-zinc-50"
                />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Scroll Experience Container */}
                        <ScrollSection product={product} onImagesLoaded={() => setImagesLoaded(true)} />

                        {/* Details Section */}
                        <DetailsSection product={product} />

                        {/* Freshness Section */}
                        <FreshnessSection product={product} />

                        {/* Buy Now & Next */}
                        <BuyNowSection product={product} onNext={nextProduct} />

                    </motion.div>
                </AnimatePresence>



                {/* Navigation Controls (Fixed) */}
                <NavigationControls
                    currentIndex={currentIndex}
                    total={products.length}
                    onNext={nextProduct}
                    onPrev={prevProduct}
                    onSelect={setProduct}
                />

                <Footer />
            </div>
        </main>
    );
}

// Sub-component to handle the scroll logic cleanly and pass refs
function ScrollSection({ product, onImagesLoaded }: { product: typeof products[0], onImagesLoaded?: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    });

    // Smooth out the progress for the text animations
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <div ref={ref} className="relative h-[500vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ color: product.textColor || "black" }}>
                <BottleCanvas product={product} scrollYProgress={scrollYProgress} onImagesLoaded={onImagesLoaded} />
                <ProductTextOverlays product={product} scrollYProgress={smoothProgress} textColor={product.textColor || "black"} />
            </div>
        </div>
    )
}

interface NavigationControlsProps {
    currentIndex: number;
    total: number;
    onNext: () => void;
    onPrev: () => void;
    onSelect: (index: number) => void;
}

function NavigationControls({ currentIndex, total, onNext, onPrev, onSelect }: NavigationControlsProps) {
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState(true);

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Hero section is 500vh. We want arrows visible for most of it.
        // Let's hide them when we approach the Next Section (Details).
        // Assuming ~4 viewport heights of scrolling.
        const heroEnd = typeof window !== 'undefined' ? window.innerHeight * 3.5 : 2500;
        setVisible(latest < heroEnd);
    });

    return (
        <>
            {/* Arrows - Only visible in Hero Section */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: visible ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-none fixed inset-0 z-30"
            >
                <div className="h-full w-full relative">
                    {/* Left Handle */}
                    <button
                        onClick={onPrev}
                        className="pointer-events-auto absolute left-0 top-1/2 -translate-y-1/2 w-12 md:w-16 h-32 md:h-48 flex items-center justify-center bg-black/5 hover:bg-black/20 backdrop-blur-[2px] transition-all duration-500 group rounded-r-2xl border-r border-y border-white/5"
                        aria-label="Previous Flavor"
                    >
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white/50 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Right Handle */}
                    <button
                        onClick={onNext}
                        className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 w-12 md:w-16 h-32 md:h-48 flex items-center justify-center bg-black/5 hover:bg-black/20 backdrop-blur-[2px] transition-all duration-500 group rounded-l-2xl border-l border-y border-white/5"
                        aria-label="Next Flavor"
                    >
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </motion.div>

            {/* Pill Menu - Also only visible in Hero */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: visible ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-3 pointer-events-none"
            >
                <div className="flex gap-3 pointer-events-auto">
                    {products.map((p, i) => (
                        <button
                            key={p.id}
                            onClick={() => onSelect(i)}
                            className={`transition-all duration-500 shadow-sm ${i === currentIndex ? "w-8 h-1 bg-white/90" : "w-2 h-1 bg-white/30 hover:bg-white/50"
                                }`}
                            aria-label={p.name}
                        />
                    ))}
                </div>
            </motion.div>
        </>
    )
}

function DetailsSection({ product }: { product: typeof products[0] }) {
    return (
        <div className="relative z-20 -mt-20 bg-white/90 backdrop-blur-xl rounded-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.1)] overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                className="min-h-screen flex items-center justify-center py-20 px-6"
            >
                <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">{product.detailsSection.title}</h2>
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                            {product.detailsSection.description}
                        </p>

                        <div className="grid grid-cols-3 gap-6">
                            {product.stats.map((stat) => (
                                <div key={stat.label} className="text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                                    <div className="text-3xl font-bold text-orange-500 mb-1">{stat.val}</div>
                                    <div className="text-sm text-gray-500 uppercase tracking-wide">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center">
                        <div className="relative w-full max-w-md aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            {/* Static Image Display */}
                            <img
                                src={product.detailsSection.detailsImage}
                                alt={product.detailsSection.imageAlt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

function FreshnessSection({ product }: { product: typeof products[0] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-h-[80vh] flex items-center justify-center py-20 px-6 bg-black text-white"
        >
            <div className="max-w-4xl text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                    {product.freshnessSection.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                    {product.freshnessSection.description}
                </p>
            </div>
        </motion.div>
    )
}

function BuyNowSection({ product, onNext }: { product: typeof products[0], onNext: () => void }) {
    const { addItem } = useCartStore();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden">

            <div className="max-w-md w-full bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl relative z-10">
                <h3 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h3>
                <p className="text-gray-500 mb-6">{product.subName}</p>

                <div className="flex items-end gap-2 mb-8">
                    <span className="text-5xl font-bold text-orange-600">{product.buyNowSection.price}</span>
                    <span className="text-gray-500 mb-2">{product.buyNowSection.unit}</span>
                </div>

                <button
                    onClick={() => addItem({
                        id: product.id,
                        name: product.name,
                        price: parseInt(product.buyNowSection.price.replace(/[^0-9]/g, '')) || 200, // Fallback parsing
                        image: product.detailsSection.detailsImage || "/images/placeholder.jpg",
                        quantity: 1,
                        variant: product.buyNowSection.unit
                    })}
                    className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform mb-4 active:scale-95 duration-200"
                >
                    Add to Cart
                </button>

                <p className="text-xs text-center text-gray-500">{product.buyNowSection.deliveryPromise}</p>
            </div>

            {/* Next Flavor Button */}
            <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center z-50">
                <button
                    onClick={onNext}
                    className="group relative px-12 py-6 bg-white text-black font-black text-xl md:text-2xl tracking-tighter uppercase transform hover:-translate-y-2 transition-transform shadow-xl slanted-edge"
                    style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)" }}
                >
                    Try Next Flavor
                    <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </button>
            </div>
        </div>
    )
}

function BottleCanvas({ product, scrollYProgress, onImagesLoaded }: { product: typeof products[0], scrollYProgress: any, onImagesLoaded?: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const totalFrames = product.frameCount || 120; // Default to 120 if undefined
            const ext = product.fileType || 'webp'; // Default to webp if undefined
            const promises = [];
            for (let i = 1; i <= totalFrames; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = `${product.folderPath}/${i}.${ext}`;
                    img.onload = () => { loadedImages[i - 1] = img; resolve(); };
                    img.onerror = () => { resolve(); };
                });
                promises.push(promise);
            }
            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);

            // Notify parent that images are done
            if (onImagesLoaded) {
                onImagesLoaded();
            }
        };
        loadImages();
    }, [product.folderPath, product.frameCount, product.fileType, onImagesLoaded]);

    useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
        if (!isLoaded || images.length === 0) return;
        const frameIndex = Math.min(Math.max(Math.floor(latest * (images.length - 1)), 0), images.length - 1);
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = images[index];
        if (!canvas || !ctx || !img) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Resize logic: "Cover" (Math.max) to fill screen, BUT respect alignment
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio); // Use Max for Cover as requested "Full Screen"

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        let centerShift_y = (canvas.height - img.height * ratio) / 2;

        // Alignment Override for specific products (e.g. Mango)
        if (product.imageAlignment === 'top') {
            centerShift_y = 0; // Force top alignment to prevent neck clipping
        } else if (product.imageAlignment === 'bottom') {
            centerShift_y = canvas.height - img.height * ratio;
        }

        ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    // Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth * (window.devicePixelRatio || 1);
                canvasRef.current.height = window.innerHeight * (window.devicePixelRatio || 1);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full object-contain pointer-events-none" />;
}
