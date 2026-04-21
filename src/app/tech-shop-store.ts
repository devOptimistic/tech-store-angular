import { computed, inject } from "@angular/core";
import { Product } from "./models/product/product"
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { produce } from "immer";
import { Toaster } from "./services/toaster";


export type TechShopState = {
    products: Product[];
    categories: string[];
    sortTypes: { label: string, value: number }[];
    wishlistItems: Product[];
}

export const TechShopStore = signalStore(
    {
        providedIn: 'root',
    },
    withState({
        products: [
            {
                id: 1,
                name: 'iPhone 15 Pro Max',
                brand: 'Apple',
                shortDescription: 'Flagship powerhouse smartphone',
                description: '6.7-inch Super Retina XDR display, A17 Pro chip, titanium design, 48MP main camera with 5x optical zoom.',
                price: 1199.99,
                imageUrls: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500'],
                rating: 4.9,
                reviewCount: 3245,
                inStock: true,
                category: 'Smartphones',
                moreProperties: [
                    { label: 'Display', value: '6.7" Super Retina XDR' },
                    { label: 'Chip', value: 'A17 Pro' },
                    { label: 'RAM', value: '8GB' },
                    { label: 'Storage', value: '256GB' },
                    { label: 'Camera', value: '48MP + 12MP + 12MP' },
                    { label: 'Battery', value: '4422mAh' }
                ]
            },
            {
                id: 2,
                name: 'Galaxy S24 Ultra',
                brand: 'Samsung',
                shortDescription: 'Ultimate Android flagship',
                description: '6.8-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 3, 200MP camera with 100x Space Zoom.',
                price: 1299.99,
                imageUrls: ['https://images.unsplash.com/photo-1610945264803-c22e62d2a7b3?w=500'],
                rating: 4.8,
                reviewCount: 2187,
                inStock: true,
                category: 'Smartphones',
                moreProperties: [
                    { label: 'Display', value: '6.8" Dynamic AMOLED 2X' },
                    { label: 'Chip', value: 'Snapdragon 8 Gen 3' },
                    { label: 'RAM', value: '12GB' },
                    { label: 'Storage', value: '512GB' },
                    { label: 'Camera', value: '200MP + 50MP + 12MP' },
                    { label: 'Battery', value: '5000mAh' },
                    { label: 'S Pen', value: 'Included' }
                ]
            },
            {
                id: 3,
                name: 'Pixel 8 Pro',
                brand: 'Google',
                shortDescription: 'AI-powered camera phone',
                description: '6.7-inch Super Actua display, Google Tensor G3 chip, advanced AI features.',
                price: 999.99,
                imageUrls: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500'],
                rating: 4.7,
                reviewCount: 1567,
                inStock: false,
                category: 'Smartphones',
                moreProperties: [
                    { label: 'Display', value: '6.7" Super Actua' },
                    { label: 'Chip', value: 'Google Tensor G3' },
                    { label: 'RAM', value: '12GB' },
                    { label: 'Storage', value: '256GB' },
                    { label: 'Camera', value: '50MP + 48MP + 48MP' },
                    { label: 'Battery', value: '5050mAh' }
                ]
            },
            {
                id: 4,
                name: '12',
                brand: 'OnePlus',
                shortDescription: 'Fast charging flagship',
                description: '6.82-inch 2K 120Hz display, Snapdragon 8 Gen 3, 5400mAh battery.',
                price: 799.99,
                imageUrls: ['https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500'],
                rating: 4.6,
                reviewCount: 892,
                inStock: true,
                category: 'Smartphones',
                moreProperties: [
                    { label: 'Display', value: '6.82" 2K 120Hz' },
                    { label: 'Chip', value: 'Snapdragon 8 Gen 3' },
                    { label: 'RAM', value: '16GB' },
                    { label: 'Storage', value: '512GB' },
                    { label: 'Camera', value: '50MP + 64MP + 48MP' },
                    { label: 'Battery', value: '5400mAh' },
                    { label: 'Charging', value: '100W Fast Charging' }
                ]
            },
            {
                id: 5,
                name: '14 Ultra',
                brand: 'Xiaomi',
                shortDescription: 'Leica camera flagship',
                description: '6.73-inch AMOLED, Snapdragon 8 Gen 3, Leica quad camera system with 1-inch sensor.',
                price: 1099.99,
                imageUrls: ['https://images.unsplash.com/photo-1678911820864-e5e7c5f6c6c8?w=500'],
                rating: 4.7,
                reviewCount: 634,
                inStock: false,
                category: 'Smartphones',
                moreProperties: [
                    { label: 'Display', value: '6.73" AMOLED' },
                    { label: 'Chip', value: 'Snapdragon 8 Gen 3' },
                    { label: 'RAM', value: '16GB' },
                    { label: 'Storage', value: '512GB' },
                    { label: 'Camera', value: '50MP Leica + 50MP + 50MP' },
                    { label: 'Battery', value: '5000mAh' },
                    { label: 'Charging', value: '90W Fast Charging' }
                ]
            },
            {
                id: 6,
                name: 'MacBook Pro 14 M3',
                brand: 'Apple',
                shortDescription: 'Pro creative laptop',
                description: '14-inch Liquid Retina XDR display, M3 Pro chip, 18GB memory, 512GB SSD.',
                price: 1999.99,
                imageUrls: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
                rating: 4.9,
                reviewCount: 1123,
                inStock: true,
                category: 'Laptops',
                moreProperties: [
                    { label: 'Display', value: '14.2" Liquid Retina XDR' },
                    { label: 'Chip', value: 'Apple M3 Pro' },
                    { label: 'RAM', value: '18GB' },
                    { label: 'Storage', value: '512GB SSD' },
                    { label: 'GPU', value: '14-core' },
                    { label: 'Battery', value: 'Up to 17 hours' },
                    { label: 'Weight', value: '3.5 lbs' }
                ]
            },
            {
                id: 7,
                name: 'MacBook Air 15 M3',
                brand: 'Apple',
                shortDescription: 'Ultra-thin laptop',
                description: '15.3-inch Liquid Retina display, M3 chip, 16GB memory, 512GB SSD, 18-hour battery.',
                price: 1399.99,
                imageUrls: ['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500'],
                rating: 4.8,
                reviewCount: 2341,
                inStock: true,
                category: 'Laptops',
                moreProperties: [
                    { label: 'Display', value: '15.3" Liquid Retina' },
                    { label: 'Chip', value: 'Apple M3' },
                    { label: 'RAM', value: '16GB' },
                    { label: 'Storage', value: '512GB SSD' },
                    { label: 'Battery', value: 'Up to 18 hours' },
                    { label: 'Weight', value: '3.3 lbs' },
                    { label: 'Camera', value: '1080p FaceTime HD' }
                ]
            },
            {
                id: 8,
                name: 'XPS 15',
                brand: 'Dell',
                shortDescription: 'Premium creator laptop',
                description: '15.6-inch 3.5K OLED, Intel Core i9, RTX 4070, 32GB RAM, 1TB SSD.',
                price: 2499.99,
                imageUrls: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500'],
                rating: 4.8,
                reviewCount: 432,
                inStock: true,
                category: 'Laptops',
                moreProperties: [
                    { label: 'Display', value: '15.6" 3.5K OLED' },
                    { label: 'CPU', value: 'Intel Core i9-13900H' },
                    { label: 'RAM', value: '32GB DDR5' },
                    { label: 'Storage', value: '1TB NVMe SSD' },
                    { label: 'GPU', value: 'NVIDIA RTX 4070' },
                    { label: 'Weight', value: '4.2 lbs' },
                    { label: 'Ports', value: 'Thunderbolt 4 x2' }
                ]
            },
            {
                id: 9,
                name: 'ROG Zephyrus G14',
                brand: 'ASUS',
                shortDescription: 'Compact gaming beast',
                description: '14-inch QHD+ 165Hz, Ryzen 9, RTX 4060, 16GB RAM, 1TB SSD.',
                price: 1599.99,
                imageUrls: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500'],
                rating: 4.8,
                reviewCount: 765,
                inStock: true,
                category: 'Gaming Laptops',
                moreProperties: [
                    { label: 'Display', value: '14" QHD+ 165Hz' },
                    { label: 'CPU', value: 'AMD Ryzen 9 8945HS' },
                    { label: 'RAM', value: '16GB DDR5' },
                    { label: 'Storage', value: '1TB NVMe SSD' },
                    { label: 'GPU', value: 'NVIDIA RTX 4060' },
                    { label: 'Weight', value: '3.5 lbs' },
                    { label: 'RGB', value: 'Aura Sync' }
                ]
            },
            {
                id: 10,
                name: 'ThinkPad X1 Carbon Gen 12',
                brand: 'Lenovo',
                shortDescription: 'Ultra-light business laptop',
                description: '14-inch 2.8K OLED, Intel Core Ultra 7, 32GB RAM, 1TB SSD.',
                price: 2199.99,
                imageUrls: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500'],
                rating: 4.7,
                reviewCount: 298,
                inStock: true,
                category: 'Laptops',
                moreProperties: [
                    { label: 'Display', value: '14" 2.8K OLED' },
                    { label: 'CPU', value: 'Intel Core Ultra 7' },
                    { label: 'RAM', value: '32GB LPDDR5x' },
                    { label: 'Storage', value: '1TB NVMe SSD' },
                    { label: 'Weight', value: '2.48 lbs' },
                    { label: 'Security', value: 'Fingerprint + IR Camera' },
                    { label: 'Battery', value: 'Up to 15 hours' }
                ]
            },
            {
                id: 11,
                name: 'WH-1000XM5',
                brand: 'Sony',
                shortDescription: 'Best noise cancellation',
                description: 'Industry-leading noise cancellation, 30-hour battery, premium sound quality.',
                price: 349.99,
                imageUrls: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500'],
                rating: 4.9,
                reviewCount: 3247,
                inStock: true,
                category: 'Headphones',
                moreProperties: [
                    { label: 'Type', value: 'Over-Ear' },
                    { label: 'Noise Cancellation', value: 'Yes (Industry-leading)' },
                    { label: 'Battery Life', value: '30 hours' },
                    { label: 'Charging', value: 'USB-C, 3-hour quick charge' },
                    { label: 'Connectivity', value: 'Bluetooth 5.2' },
                    { label: 'Weight', value: '250g' },
                    { label: 'Color', value: 'Black/Silver' }
                ]
            },
            {
                id: 12,
                name: 'AirPods Pro 2',
                brand: 'Apple',
                shortDescription: 'Premium wireless earbuds',
                description: 'Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio.',
                price: 199.99,
                imageUrls: ['https://images.unsplash.com/photo-1600294037681-c80b4e7d2c37?w=500'],
                rating: 4.8,
                reviewCount: 5678,
                inStock: true,
                category: 'Earbuds',
                moreProperties: [
                    { label: 'Type', value: 'In-Ear' },
                    { label: 'Chip', value: 'Apple H2' },
                    { label: 'Noise Cancellation', value: 'Yes' },
                    { label: 'Battery Life', value: '6 hours (30 with case)' },
                    { label: 'Water Resistance', value: 'IPX4' },
                    { label: 'Charging', value: 'Lightning/USB-C' }
                ]
            },
            {
                id: 13,
                name: 'Galaxy Watch 6 Classic',
                brand: 'Samsung',
                shortDescription: 'Smart health watch',
                description: '47mm stainless steel, rotating bezel, advanced health monitoring.',
                price: 399.99,
                imageUrls: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500'],
                rating: 4.7,
                reviewCount: 1456,
                inStock: true,
                category: 'Smartwatches',
                moreProperties: [
                    { label: 'Display', value: '1.5" Super AMOLED' },
                    { label: 'Size', value: '47mm' },
                    { label: 'Material', value: 'Stainless Steel' },
                    { label: 'Battery', value: '425mAh' },
                    { label: 'GPS', value: 'Yes' },
                    { label: 'Health Sensors', value: 'HR, ECG, BP' },
                    { label: 'OS', value: 'Wear OS 4' }
                ]
            },
            {
                id: 14,
                name: 'iPad Pro 12.9"',
                brand: 'Apple',
                shortDescription: 'Pro tablet powerhouse',
                description: 'Liquid Retina XDR display, M2 chip, Apple Pencil hover support.',
                price: 1199.99,
                imageUrls: ['https://images.unsplash.com/photo-1544244015-0df4b3ff0c6b?w=500'],
                rating: 4.9,
                reviewCount: 1876,
                inStock: true,
                category: 'Tablets',
                moreProperties: [
                    { label: 'Display', value: '12.9" Liquid Retina XDR' },
                    { label: 'Chip', value: 'Apple M2' },
                    { label: 'RAM', value: '8GB' },
                    { label: 'Storage', value: '256GB' },
                    { label: 'Camera', value: '12MP + 10MP' },
                    { label: 'Battery', value: 'Up to 10 hours' },
                    { label: 'Apple Pencil', value: 'Gen 2 Support' }
                ]
            },
            {
                id: 15,
                name: 'PlayStation 5 Slim',
                brand: 'Sony',
                shortDescription: 'Next-gen gaming console',
                description: 'Ultra-high speed SSD, 4K gaming, ray tracing, DualSense controller.',
                price: 499.99,
                imageUrls: ['https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500'],
                rating: 4.9,
                reviewCount: 8923,
                inStock: false,
                category: 'Gaming Consoles',
                moreProperties: [
                    { label: 'Storage', value: '1TB SSD' },
                    { label: 'Resolution', value: '4K' },
                    { label: 'Ray Tracing', value: 'Yes' },
                    { label: 'Controller', value: 'DualSense' },
                    { label: 'Backward Compatible', value: 'Yes (PS4)' },
                    { label: 'Ports', value: 'USB-C x2, USB-A' }
                ]
            },
            {
                id: 16,
                name: 'Xbox Series X',
                brand: 'Microsoft',
                shortDescription: 'Powerful gaming console',
                description: '12 teraflops of power, 1TB SSD, 4K gaming, backward compatibility.',
                price: 499.99,
                imageUrls: ['https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500'],
                rating: 4.8,
                reviewCount: 5672,
                inStock: true,
                category: 'Gaming Consoles',
                moreProperties: [
                    { label: 'Storage', value: '1TB NVMe SSD' },
                    { label: 'GPU Power', value: '12 TFLOPS' },
                    { label: 'Resolution', value: '8K ready' },
                    { label: 'Frame Rate', value: 'Up to 120fps' },
                    { label: 'Backward Compatible', value: 'Yes' },
                    { label: 'Quick Resume', value: 'Yes' }
                ]
            },
            {
                id: 17,
                name: 'Nintendo Switch OLED',
                brand: 'Nintendo',
                shortDescription: 'Versatile gaming handheld',
                description: '7-inch OLED screen, 64GB storage, three gaming modes.',
                price: 349.99,
                imageUrls: ['https://images.unsplash.com/photo-1578303512597-81e6cc8efb0f?w=500'],
                rating: 4.7,
                reviewCount: 12456,
                inStock: true,
                category: 'Gaming Consoles',
                moreProperties: [
                    { label: 'Display', value: '7" OLED' },
                    { label: 'Storage', value: '64GB' },
                    { label: 'Battery Life', value: '4.5 - 9 hours' },
                    { label: 'Modes', value: 'TV, Tabletop, Handheld' },
                    { label: 'Controllers', value: '2x Joy-Con' },
                    { label: 'Kickstand', value: 'Wide adjustable' }
                ]
            },
            {
                id: 18,
                name: 'MX Master 3S',
                brand: 'Logitech',
                shortDescription: 'Ergonomic productivity mouse',
                description: 'Ultra-fast scrolling, 8K DPI tracking, quiet clicks, ergonomic design.',
                price: 99.99,
                imageUrls: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500'],
                rating: 4.8,
                reviewCount: 3456,
                inStock: true,
                category: 'Accessories',
                moreProperties: [
                    { label: 'DPI', value: '8000' },
                    { label: 'Buttons', value: '6 programmable' },
                    { label: 'Connectivity', value: 'Bluetooth + Logi Bolt' },
                    { label: 'Battery', value: '70 days' },
                    { label: 'Charging', value: 'USB-C' },
                    { label: 'Scrolling', value: 'MagSpeed electromagnetic' }
                ]
            },
            {
                id: 19,
                name: 'Mini 4 Pro',
                brand: 'DJI',
                shortDescription: 'Lightweight camera drone',
                description: 'Under 249g, 4K/60fps video, 34-minute flight time, obstacle sensing.',
                price: 759.99,
                imageUrls: ['https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=500'],
                rating: 4.9,
                reviewCount: 876,
                inStock: true,
                category: 'Drones',
                moreProperties: [
                    { label: 'Weight', value: '249g' },
                    { label: 'Camera', value: '4K/60fps' },
                    { label: 'Flight Time', value: '34 minutes' },
                    { label: 'Range', value: '20km HD transmission' },
                    { label: 'Obstacle Sensing', value: 'Omnidirectional' },
                    { label: 'Wind Resistance', value: 'Level 5' }
                ]
            },
            {
                id: 20,
                name: 'HERO12 Black',
                brand: 'GoPro',
                shortDescription: 'Action camera king',
                description: '5.3K60 video, 27MP photos, HyperSmooth 6.0, waterproof to 33ft.',
                price: 399.99,
                imageUrls: ['https://images.unsplash.com/photo-1507721999479-7ed20437f5fe?w=500'],
                rating: 4.8,
                reviewCount: 2345,
                inStock: true,
                category: 'Cameras',
                moreProperties: [
                    { label: 'Video', value: '5.3K60' },
                    { label: 'Photo', value: '27MP' },
                    { label: 'Stabilization', value: 'HyperSmooth 6.0' },
                    { label: 'Waterproof', value: '33ft (10m)' },
                    { label: 'Battery', value: 'Enduro (2x life)' },
                    { label: 'Live Streaming', value: 'Yes 1080p' }
                ]
            }
        ],
        categories: [
            'Smartphones',
            'Laptops',
            'Gaming Laptops',
            'Headphones',
            'Earbuds',
            'Smartwatches',
            'Tablets',
            'Gaming Consoles',
            'Accessories',
            'Drones',
            'Cameras'
        ],
        sortTypes: [
            { label: 'Sort by: Popular', value: 0 },
            { label: 'Price: Low to High', value: 1 },
            { label: 'Price: High to Low', value: 2 }
        ],
        wishlistItems: []
    } as TechShopState),
    withComputed(({wishlistItems}) => ({
        wishlistItemsCount: computed(() => wishlistItems().length)
    })),
    withMethods((store, toaster = inject(Toaster))=>({
        addToWishlist: (product: Product) => {
            const updatedWishlistItems = produce(store.wishlistItems(), (draft)=>{
                if (!draft.find(p=> p.id === product.id)){
                    draft.push(product);
                }
            });
            patchState(store, {wishlistItems: updatedWishlistItems});
            toaster.success("Product added to Wishlist!")
        },
        removeFromWishlist: (product: Product) => {
            patchState(store, {wishlistItems: store.wishlistItems().filter(p=> p.id !== product.id)});
        }
    }))
)