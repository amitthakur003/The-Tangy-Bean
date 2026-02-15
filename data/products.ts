export interface Product {
    id: string;
    name: string;
    subName: string;
    price: string;
    description: string;
    folderPath: string;
    themeColor: string;
    gradient: string;
    features: string[];
    stats: { label: string; val: string }[];
    frameCount?: number;
    fileType?: "jpg" | "webp";
    textColor?: string;
    imageAlignment?: "center" | "top" | "bottom"; // New property
    section1: { title: string; subtitle: string };
    section2: { title: string; subtitle: string };
    section3: { title: string; subtitle: string };
    section4: { title: string; subtitle: string };
    detailsSection: { title: string; description: string; imageAlt: string; detailsImage: string }; // Added detailsImage
    freshnessSection: { title: string; description: string };
    buyNowSection: {
        price: string;
        unit: string;
        processingParams: string[];
        deliveryPromise: string;
        returnPolicy: string;
    };
}

export const products: Product[] = [
    {
        id: "mango",
        name: "Cream Mango",
        subName: "Pure sunshine.",
        price: "₹120",
        description: "Rich in Vitamin C - No preservatives - 100% fruit",
        folderPath: "/images/mango",
        themeColor: "#FFB74D",
        gradient: "linear-gradient(135deg, #FFB74D 0%, #FFA726 100%)",
        features: ["Rich in Vitamin C", "No preservatives", "100% fruit"],
        stats: [{ label: "Sugar", val: "0g" }, { label: "Water", val: "0%" }, { label: "Pulp", val: "100%" }],
        frameCount: 216,
        fileType: "jpg",
        textColor: "black",
        imageAlignment: "top", // Fix for bottle neck clipping
        section1: { title: "Cream Mango.", subtitle: "Pure sunshine." },
        section2: { title: "Bursting with fresh mango.", subtitle: "Hand-picked Alphonso mangoes, perfectly ripened under the summer sun." },
        section3: { title: "Vitamin packed refreshment.", subtitle: "A natural energy boost that revitalizes your body and mind instantly." },
        section4: { title: "Made from fruit, not concentrate.", subtitle: "" },
        detailsSection: {
            title: "The King of Fruits",
            description: "Our Cream Mango juice uses only the finest Ratnagiri Alphonso mangoes. Known for their rich sweetness and vibrant color, these mangoes are cold-pressed within hours of harvest to preserve every drop of nutrient-rich goodness. It's not just juice; it's a liquid gold experience.",
            imageAlt: "Mango Details",
            detailsImage: "/products/Mango.jpg" // Updated
        },
        freshnessSection: {
            title: "Farm to Bottle",
            description: "We believe in absolute transparency. From the orchard to the bottle, our process is designed to minimize oxidation and maximize flavor. HPP (High Pressure Processing) ensures that our juice stays safe and fresh without any heat treatment, keeping the vital enzymes and vitamins intact."
        },
        buyNowSection: {
            price: "₹120",
            unit: "per 300ml bottle",
            processingParams: ["Cold Pressed", "Never Heated", "HPP Treated"],
            deliveryPromise: "Next-day delivery available in metro cities. Chilled packaging ensures peak freshness.",
            returnPolicy: "100% Satisfaction Guarantee. Not happy? We'll replace it, no questions asked."
        }
    },
    {
        id: "chocolate",
        name: "Dutch Dark Chocolate",
        subName: "Velvety smooth.",
        price: "₹140",
        description: "Premium Cocoa - Almond Milk base - Plant Protein",
        folderPath: "/images/chocolate",
        themeColor: "#8D6E63",
        gradient: "linear-gradient(135deg, #3e2723 0%, #5d4037 100%)", // Darker gradient for chocolate
        features: ["Premium Cocoa", "Almond Milk", "Plant Protein"],
        stats: [{ label: "Dairy", val: "0%" }, { label: "Protein", val: "12g" }, { label: "Cocoa", val: "100%" }],
        frameCount: 216,
        fileType: "jpg",
        textColor: "white",
        imageAlignment: "center",
        section1: { title: "Dutch Dark Chocolate.", subtitle: "Velvety smooth." },
        section2: { title: "Decadence redefined.", subtitle: "Rich, dark cocoa blended with creamy almond milk for a guilt-free treat." },
        section3: { title: "Plant powered energy.", subtitle: "Loaded with natural plant protein to fuel your active lifestyle." },
        section4: { title: "Indulgence without compromise.", subtitle: "" },
        detailsSection: {
            title: "Ethically Sourced Cocoa",
            description: "We source our cocoa from sustainable farms in Ghana, ensuring fair wages and premium quality. Blended with our house-made almond milk, this drink offers a silky texture that rivals traditional dairy shakes, but with zero cholesterol and 100% plant-based goodness.",
            imageAlt: "Chocolate Details",
            detailsImage: "/products/Chocolatejpg.png" // Updated
        },
        freshnessSection: {
            title: "Cold-Crafted Perfection",
            description: "Heat destroys delicate cocoa flavonoids. That's why we mix our Dutch Chocolate cold. Our almond milk is pressed fresh daily, never stored. The result is a clean, robust chocolate flavor that feels heavy on the tongue but light on the stomach."
        },
        buyNowSection: {
            price: "₹140",
            unit: "per 200 grams",
            processingParams: ["Plant Based", "Cold Blended", "Dairy Free"],
            deliveryPromise: "Shipped in insulated eco-friendly coolers. Keeps perfectly cold for 48 hours.",
            returnPolicy: "Taste the difference or get your money back."
        }
    },
    {
        id: "kokum",
        name: "Pure Kokum",
        subName: "The Tangy Healer.",
        price: "₹130",
        description: "Digestive Aid - Antioxidant Rich - Cooling Energy",
        folderPath: "/images/kokum",
        themeColor: "#880e4f", // Deep Pink/Purple
        gradient: "linear-gradient(135deg, #880e4f 0%, #4a0072 100%)", // Richer purple gradient
        features: ["Digestive Aid", "Antioxidant Rich", "Cooling Energy"],
        stats: [{ label: "Sugar", val: "0g" }, { label: "Cooling", val: "100%" }, { label: "Tang", val: "High" }],
        frameCount: 225,
        fileType: "jpg",
        textColor: "white",
        imageAlignment: "center",
        section1: { title: "Cool Kokum.", subtitle: "The Tangy Healer." },
        section2: { title: "Refreshing & Restorative.", subtitle: "Hand-picked Kokum fruit, extracting pure coastal flavor in every sip." },
        section3: { title: "Nature's Digestive Aid.", subtitle: "Known for its cooling properties, Kokum is the perfect antidote to summer heat." },
        section4: { title: "A Sip of Heritage.", subtitle: "" },
        detailsSection: {
            title: "The Purple Gold",
            description: "Our Cool Kokum is crafted from the finest Garcinia indica sourced directly from the Konkan coast. We preserve its natural tangy-sweet profile and potent antioxidants (Garcinol) by cold-extracting the juice, ensuring you get the authentic, refreshing taste of tradition.",
            imageAlt: "Kokum Details",
            detailsImage: "/products/Kokum.jpg" // Updated
        },
        freshnessSection: {
            title: "Traditional Method, Modern Safety",
            description: "We respect the delicate nature of Kokum. Our process mimics traditional cold extraction to prevent bitterness, coupled with modern HPP technology to ensure shelf stability without compromising the live enzymes and cooling benefits."
        },
        buyNowSection: {
            price: "₹130",
            unit: "per 300ml bottle",
            processingParams: ["Cold Extracted", "HPP Treated", "Gut Friendly"],
            deliveryPromise: "Delivered chilled. Enjoy within 24 hours of opening for maximum refreshment.",
            returnPolicy: "Not satisfied? We offer a full refund, no questions asked."
        }
    }
];
