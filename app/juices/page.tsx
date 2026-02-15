import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JuiceCollection from "@/components/JuiceCollection";

export default function JuicesPage() {
    return (
        <main className="min-h-screen bg-zinc-50 relative">
            <Navbar />
            <div className="pt-20">
                <JuiceCollection />
            </div>
            <Footer />
        </main>
    );
}
