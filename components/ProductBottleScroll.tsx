"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { Product } from "@/data/products";

interface ProductBottleScrollProps {
    product: Product;
}

export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const totalFrames = 120; // 120 webp images as per spec

            const promises = [];
            for (let i = 1; i <= totalFrames; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    // Assuming folderPath is like /images/mango
                    // images are named 1.webp, 2.webp...
                    img.src = `${product.folderPath}/${i}.webp`;
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        // Fallback or just resolve to avoid breaking everything
                        console.warn(`Failed to load image ${i}`);
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, [product.folderPath]);

    // Render to canvas
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        // Set canvas dimensions to match window or container, logic for "contain" fit
        // We want high res, so handle DPI
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // We'll trust the CSS to size the canvas element, but we need to set internal width/height
        // However, for performance, we might want to set this once on resize.
        // For now, let's just draw.

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calc aspect ratio
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio); // COVER effect

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(img,
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        // Map 0-1 to 0-119
        const frameIndex = Math.min(
            Math.max(Math.floor(latest * (images.length - 1)), 0),
            images.length - 1
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth * (window.devicePixelRatio || 1);
                canvasRef.current.height = window.innerHeight * (window.devicePixelRatio || 1);
                // Re-render current frame if possible? 
                // We rely on scroll event to trigger render usually, but static could use a force update.
                // For simplicity, just ensure dimensions are right.
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Init
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-full object-contain" />
            </div>
        </div>
    );
}
