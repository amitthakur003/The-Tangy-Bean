export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-16 relative z-50">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                        The Tangy Bean
                    </h3>
                    <p className="text-gray-400 text-sm">
                        Future of freshness. Experience the revolution in juice technology.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-gray-200">Shop</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Cream Mango</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Dark Chocolate</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Ruby Pomegranate</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Variety Pack</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-gray-200">Support</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-gray-200">Stay Fresh</h4>
                    <div className="flex flex-col gap-2">
                        <input type="email" placeholder="Enter your email" className="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                        <button className="bg-white text-gray-900 font-bold py-2 rounded hover:bg-gray-200 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
                &copy; {new Date().getFullYear()} The Tangy Bean. All rights reserved.
            </div>
        </footer>
    )
}
