import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string; // SKU or unique ID
    name: string;
    price: number;
    image: string;
    quantity: number;
    variant?: string; // e.g. "Pack of 6", "Single Bottle"
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    toggleCart: () => void;
    addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;

    // Computed (Implemented as getters in UI or derived state if needed here)
    getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

            addItem: (newItem) => set((state) => {
                const existingItem = state.items.find(item => item.id === newItem.id);
                if (existingItem) {
                    return {
                        items: state.items.map(item =>
                            item.id === newItem.id
                                ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
                                : item
                        ),
                        isOpen: true // Auto-open cart on add
                    };
                }
                return {
                    items: [...state.items, { ...newItem, quantity: newItem.quantity || 1 }],
                    isOpen: true
                };
            }),

            removeItem: (id) => set((state) => ({
                items: state.items.filter(item => item.id !== id)
            })),

            updateQuantity: (id, quantity) => set((state) => {
                if (quantity <= 0) {
                    return { items: state.items.filter(item => item.id !== id) };
                }
                return {
                    items: state.items.map(item =>
                        item.id === id ? { ...item, quantity } : item
                    )
                };
            }),

            clearCart: () => set({ items: [] }),

            getSubtotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            }
        }),
        {
            name: 'tangy-bean-cart-storage', // unique name
            // partialize: (state) => ({ items: state.items }), // Only persist items if we wanted
        }
    )
);
