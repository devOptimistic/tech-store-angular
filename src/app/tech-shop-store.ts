import { computed, inject } from "@angular/core";
import { Product } from "./models/product"
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { produce } from "immer";
import { Toaster } from "./services/toaster";
import { CartItem } from "./models/cart";


export type TechShopState = {
    products: Product[];
    categories: string[];
    sortTypes: { label: string, value: number }[];
    wishlistItems: Product[];
    cartItems: CartItem[];
}

export const TechShopStore = signalStore(
    {
        providedIn: 'root',
    },
    withState({
        products: [
    // iPhone 15 Pro Max - 4 رنگ مختلف
    {
        id: 1,
        name: 'iPhone 15 Pro Max',
        brand: 'Apple',
        shortDescription: 'Flagship powerhouse smartphone',
        description: '6.7-inch Super Retina XDR display, A17 Pro chip, titanium design, 48MP main camera with 5x optical zoom.',
        price: 1199.99,
        imageUrls: ['https://image.torob.com/base/images/BG/tS/BGtSFDpKTzbh5m-y.jpg'],
        rating: 4.9,
        reviewCount: 3245,
        inStock: true,
        category: 'Smartphones',
        color: 'Black Titanium',
        discount: 10, // 10% تخفیف
        moreProperties: [
            { label: 'Display', value: '6.7" Super Retina XDR' },
            { label: 'Chip', value: 'A17 Pro' },
            { label: 'RAM', value: '8GB' },
            { label: 'Storage', value: '256GB' },
            { label: 'Camera', value: '48MP + 12MP + 12MP' },
            { label: 'Battery', value: '4422mAh' },
            { label: 'Color', value: 'Black Titanium' }
        ]
    },
    {
        id: 101,
        name: 'iPhone 15 Pro Max',
        brand: 'Apple',
        shortDescription: 'Flagship powerhouse smartphone',
        description: '6.7-inch Super Retina XDR display, A17 Pro chip, titanium design, 48MP main camera with 5x optical zoom.',
        price: 1199.99,
        imageUrls: ['https://image.torob.com/base/images/So/Pv/SoPvcAOGeXss0w5P.jpg'],
        rating: 4.9,
        reviewCount: 3245,
        inStock: true,
        category: 'Smartphones',
        color: 'White Titanium',
        discount: 10,
        moreProperties: [
            { label: 'Display', value: '6.7" Super Retina XDR' },
            { label: 'Chip', value: 'A17 Pro' },
            { label: 'RAM', value: '8GB' },
            { label: 'Storage', value: '256GB' },
            { label: 'Camera', value: '48MP + 12MP + 12MP' },
            { label: 'Battery', value: '4422mAh' },
            { label: 'Color', value: 'White Titanium' }
        ]
    },
    {
        id: 102,
        name: 'iPhone 15 Pro Max',
        brand: 'Apple',
        shortDescription: 'Flagship powerhouse smartphone',
        description: '6.7-inch Super Retina XDR display, A17 Pro chip, titanium design, 48MP main camera with 5x optical zoom.',
        price: 1199.99,
        imageUrls: ['https://image.torob.com/base/images/-N/_Y/-N_Y6EEy-fEaIGsE.jpg'],
        rating: 4.9,
        reviewCount: 3245,
        inStock: true,
        category: 'Smartphones',
        color: 'Blue Titanium',
        discount: 10,
        moreProperties: [
            { label: 'Display', value: '6.7" Super Retina XDR' },
            { label: 'Chip', value: 'A17 Pro' },
            { label: 'RAM', value: '8GB' },
            { label: 'Storage', value: '256GB' },
            { label: 'Camera', value: '48MP + 12MP + 12MP' },
            { label: 'Battery', value: '4422mAh' },
            { label: 'Color', value: 'Blue Titanium' }
        ]
    },
    {
        id: 103,
        name: 'iPhone 15 Pro Max',
        brand: 'Apple',
        shortDescription: 'Flagship powerhouse smartphone',
        description: '6.7-inch Super Retina XDR display, A17 Pro chip, titanium design, 48MP main camera with 5x optical zoom.',
        price: 1199.99,
        imageUrls: ['https://image.torob.com/base/images/u2/La/u2LaGEmnJNqzz-jy.webp'],
        rating: 4.9,
        reviewCount: 3245,
        inStock: true,
        category: 'Smartphones',
        color: 'Natural Titanium',
        discount: 10,
        moreProperties: [
            { label: 'Display', value: '6.7" Super Retina XDR' },
            { label: 'Chip', value: 'A17 Pro' },
            { label: 'RAM', value: '8GB' },
            { label: 'Storage', value: '256GB' },
            { label: 'Camera', value: '48MP + 12MP + 12MP' },
            { label: 'Battery', value: '4422mAh' },
            { label: 'Color', value: 'Natural Titanium' }
        ]
    },
    {
        id: 2,
        name: 'Galaxy S24 Ultra',
        brand: 'Samsung',
        shortDescription: 'Ultimate Android flagship',
        description: '6.8-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 3, 200MP camera with 100x Space Zoom.',
        price: 1299.99,
        imageUrls: ['https://image.torob.com/base/images/bb/CV/bbCVIyIXfJ1svY8t.jpg'],
        rating: 4.8,
        reviewCount: 2187,
        inStock: true,
        category: 'Smartphones',
        color: 'Titanium Gray',
        discount: 15, // 15% تخفیف
        moreProperties: [
            { label: 'Display', value: '6.8" Dynamic AMOLED 2X' },
            { label: 'Chip', value: 'Snapdragon 8 Gen 3' },
            { label: 'RAM', value: '12GB' },
            { label: 'Storage', value: '512GB' },
            { label: 'Camera', value: '200MP + 50MP + 12MP' },
            { label: 'Battery', value: '5000mAh' },
            { label: 'S Pen', value: 'Included' },
            { label: 'Color', value: 'Titanium Gray' }
        ]
    },
    {
        id: 3,
        name: 'Pixel 8 Pro',
        brand: 'Google',
        shortDescription: 'AI-powered camera phone',
        description: '6.7-inch Super Actua display, Google Tensor G3 chip, advanced AI features.',
        price: 999.99,
        imageUrls: ['https://image.torob.com/base/images/fC/DV/fCDV1s8r-_QtiuYO.jpg'],
        rating: 4.7,
        reviewCount: 1567,
        inStock: false,
        category: 'Smartphones',
        color: 'Obsidian',
        discount: 0, // بدون تخفیف
        moreProperties: [
            { label: 'Display', value: '6.7" Super Actua' },
            { label: 'Chip', value: 'Google Tensor G3' },
            { label: 'RAM', value: '12GB' },
            { label: 'Storage', value: '256GB' },
            { label: 'Camera', value: '50MP + 48MP + 48MP' },
            { label: 'Battery', value: '5050mAh' },
            { label: 'Color', value: 'Obsidian' }
        ]
    },
    {
        id: 6,
        name: 'MacBook Pro 14 M3',
        brand: 'Apple',
        shortDescription: 'Pro creative laptop',
        description: '14-inch Liquid Retina XDR display, M3 Pro chip, 18GB memory, 512GB SSD.',
        price: 1999.99,
        imageUrls: ['https://image.torob.com/base/images/rF/NZ/rFNZQwiefDBbzYAU.jpg'],
        rating: 4.9,
        reviewCount: 1123,
        inStock: true,
        category: 'Laptops',
        color: 'Space Gray',
        discount: 5, // 5% تخفیف
        moreProperties: [
            { label: 'Display', value: '14.2" Liquid Retina XDR' },
            { label: 'Chip', value: 'Apple M3 Pro' },
            { label: 'RAM', value: '18GB' },
            { label: 'Storage', value: '512GB SSD' },
            { label: 'GPU', value: '14-core' },
            { label: 'Battery', value: 'Up to 17 hours' },
            { label: 'Weight', value: '3.5 lbs' },
            { label: 'Color', value: 'Space Gray' }
        ]
    },
    {
        id: 7,
        name: 'MacBook Air 15 M3',
        brand: 'Apple',
        shortDescription: 'Ultra-thin laptop',
        description: '15.3-inch Liquid Retina display, M3 chip, 16GB memory, 512GB SSD, 18-hour battery.',
        price: 1399.99,
        imageUrls: ['https://image.torob.com/base/images/f5/nZ/f5nZLbUheCdIYvA-.jpg'],
        rating: 4.8,
        reviewCount: 2341,
        inStock: true,
        category: 'Laptops',
        color: 'Midnight',
        discount: 0, // بدون تخفیف
        moreProperties: [
            { label: 'Display', value: '15.3" Liquid Retina' },
            { label: 'Chip', value: 'Apple M3' },
            { label: 'RAM', value: '16GB' },
            { label: 'Storage', value: '512GB SSD' },
            { label: 'Battery', value: 'Up to 18 hours' },
            { label: 'Weight', value: '3.3 lbs' },
            { label: 'Camera', value: '1080p FaceTime HD' },
            { label: 'Color', value: 'Midnight' }
        ]
    },
    {
        id: 4,
        name: '12',
        brand: 'OnePlus',
        shortDescription: 'Fast charging flagship',
        description: '6.82-inch 2K 120Hz display, Snapdragon 8 Gen 3, 5400mAh battery.',
        price: 799.99,
        imageUrls: ['https://image.torob.com/base/images/Ld/Us/LdUs8ezle2NQ60Wi.jpg'],
        rating: 4.6,
        reviewCount: 892,
        inStock: true,
        category: 'Smartphones',
        color: 'Black',
        discount: 20, // 20% تخفیف
        moreProperties: [
            { label: 'Display', value: '6.82" 2K 120Hz' },
            { label: 'Chip', value: 'Snapdragon 8 Gen 3' },
            { label: 'RAM', value: '16GB' },
            { label: 'Storage', value: '512GB' },
            { label: 'Camera', value: '50MP + 64MP + 48MP' },
            { label: 'Battery', value: '5400mAh' },
            { label: 'Charging', value: '100W Fast Charging' },
            { label: 'Color', value: 'Black' }
        ]
    },
    {
        id: 5,
        name: '14 Ultra',
        brand: 'Xiaomi',
        shortDescription: 'Leica camera flagship',
        description: '6.73-inch AMOLED, Snapdragon 8 Gen 3, Leica quad camera system with 1-inch sensor.',
        price: 1099.99,
        imageUrls: ['https://image.torob.com/base/images/jk/Yq/jkYqyLon5pRyRShM.webp'],
        rating: 4.7,
        reviewCount: 634,
        inStock: false,
        category: 'Smartphones',
        color: 'White',
        discount: 12, // 12% تخفیف
        moreProperties: [
            { label: 'Display', value: '6.73" AMOLED' },
            { label: 'Chip', value: 'Snapdragon 8 Gen 3' },
            { label: 'RAM', value: '16GB' },
            { label: 'Storage', value: '512GB' },
            { label: 'Camera', value: '50MP Leica + 50MP + 50MP' },
            { label: 'Battery', value: '5000mAh' },
            { label: 'Charging', value: '90W Fast Charging' },
            { label: 'Color', value: 'White' }
        ]
    },
    {
        id: 8,
        name: 'XPS 15',
        brand: 'Dell',
        shortDescription: 'Premium creator laptop',
        description: '15.6-inch 3.5K OLED, Intel Core i9, RTX 4070, 32GB RAM, 1TB SSD.',
        price: 2499.99,
        imageUrls: ['https://image.torob.com/base/images/Ao/DZ/AoDZf3o_H7j8hA0u.jpg'],
        rating: 4.8,
        reviewCount: 432,
        inStock: true,
        category: 'Laptops',
        color: 'Platinum Silver',
        discount: 0, // بدون تخفیف
        moreProperties: [
            { label: 'Display', value: '15.6" 3.5K OLED' },
            { label: 'CPU', value: 'Intel Core i9-13900H' },
            { label: 'RAM', value: '32GB DDR5' },
            { label: 'Storage', value: '1TB NVMe SSD' },
            { label: 'GPU', value: 'NVIDIA RTX 4070' },
            { label: 'Weight', value: '4.2 lbs' },
            { label: 'Ports', value: 'Thunderbolt 4 x2' },
            { label: 'Color', value: 'Platinum Silver' }
        ]
    },
    {
        id: 9,
        name: 'ROG Zephyrus G14',
        brand: 'ASUS',
        shortDescription: 'Compact gaming beast',
        description: '14-inch QHD+ 165Hz, Ryzen 9, RTX 4060, 16GB RAM, 1TB SSD.',
        price: 1599.99,
        imageUrls: ['https://image.torob.com/base/images/YG/Cn/YGCnXKqE3dhCPWhb.jpg'],
        rating: 4.8,
        reviewCount: 765,
        inStock: true,
        category: 'Gaming Laptops',
        color: 'Eclipse Gray',
        discount: 8, // 8% تخفیف
        moreProperties: [
            { label: 'Display', value: '14" QHD+ 165Hz' },
            { label: 'CPU', value: 'AMD Ryzen 9 8945HS' },
            { label: 'RAM', value: '16GB DDR5' },
            { label: 'Storage', value: '1TB NVMe SSD' },
            { label: 'GPU', value: 'NVIDIA RTX 4060' },
            { label: 'Weight', value: '3.5 lbs' },
            { label: 'RGB', value: 'Aura Sync' },
            { label: 'Color', value: 'Eclipse Gray' }
        ]
    },
    {
        id: 10,
        name: 'ThinkPad X1 Carbon Gen 12',
        brand: 'Lenovo',
        shortDescription: 'Ultra-light business laptop',
        description: '14-inch 2.8K OLED, Intel Core Ultra 7, 32GB RAM, 1TB SSD.',
        price: 2199.99,
        imageUrls: ['https://image.torob.com/base/images/Kt/Pe/KtPenHs3IEk5vlQS.jpg'],
        rating: 4.7,
        reviewCount: 298,
        inStock: true,
        category: 'Laptops',
        color: 'Black',
        discount: 0, // بدون تخفیف
        moreProperties: [
            { label: 'Display', value: '14" 2.8K OLED' },
            { label: 'CPU', value: 'Intel Core Ultra 7' },
            { label: 'RAM', value: '32GB LPDDR5x' },
            { label: 'Storage', value: '1TB NVMe SSD' },
            { label: 'Weight', value: '2.48 lbs' },
            { label: 'Security', value: 'Fingerprint + IR Camera' },
            { label: 'Battery', value: 'Up to 15 hours' },
            { label: 'Color', value: 'Black' }
        ]
    },
    {
        id: 11,
        name: 'WH-1000XM5',
        brand: 'Sony',
        shortDescription: 'Best noise cancellation',
        description: 'Industry-leading noise cancellation, 30-hour battery, premium sound quality.',
        price: 349.99,
        imageUrls: ['https://image.torob.com/base/images/HC/tQ/HCtQ8LPk7QF917hR.jpg'],
        rating: 4.9,
        reviewCount: 3247,
        inStock: true,
        category: 'Headphones',
        color: 'Black',
        discount: 25, // 25% تخفیف
        moreProperties: [
            { label: 'Type', value: 'Over-Ear' },
            { label: 'Noise Cancellation', value: 'Yes (Industry-leading)' },
            { label: 'Battery Life', value: '30 hours' },
            { label: 'Charging', value: 'USB-C, 3-hour quick charge' },
            { label: 'Connectivity', value: 'Bluetooth 5.2' },
            { label: 'Weight', value: '250g' },
            { label: 'Color', value: 'Black' }
        ]
    },
    {
        id: 12,
        name: 'AirPods Pro 2',
        brand: 'Apple',
        shortDescription: 'Premium wireless earbuds',
        description: 'Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio.',
        price: 199.99,
        imageUrls: ['https://image.torob.com/base/images/32/fl/32flIu1ykkQlr8LG.jpg'],
        rating: 4.8,
        reviewCount: 5678,
        inStock: true,
        category: 'Earbuds',
        color: 'White',
        discount: 0, // بدون تخفیف
        moreProperties: [
            { label: 'Type', value: 'In-Ear' },
            { label: 'Chip', value: 'Apple H2' },
            { label: 'Noise Cancellation', value: 'Yes' },
            { label: 'Battery Life', value: '6 hours (30 with case)' },
            { label: 'Water Resistance', value: 'IPX4' },
            { label: 'Charging', value: 'Lightning/USB-C' },
            { label: 'Color', value: 'White' }
        ]
    },
    {
        id: 13,
        name: 'Galaxy Watch 6 Classic',
        brand: 'Samsung',
        shortDescription: 'Smart health watch',
        description: '47mm stainless steel, rotating bezel, advanced health monitoring.',
        price: 399.99,
        imageUrls: ['https://image.torob.com/base/images/66/fV/66fVN8k1C3Pv-UVa.jpg'],
        rating: 4.7,
        reviewCount: 1456,
        inStock: true,
        category: 'Smartwatches',
        color: 'Black',
        discount: 18, // 18% تخفیف
        moreProperties: [
            { label: 'Display', value: '1.5" Super AMOLED' },
            { label: 'Size', value: '47mm' },
            { label: 'Material', value: 'Stainless Steel' },
            { label: 'Battery', value: '425mAh' },
            { label: 'GPS', value: 'Yes' },
            { label: 'Health Sensors', value: 'HR, ECG, BP' },
            { label: 'OS', value: 'Wear OS 4' },
            { label: 'Color', value: 'Black' }
        ]
    },
    {
        id: 14,
        name: 'iPad Pro 12.9"',
        brand: 'Apple',
        shortDescription: 'Pro tablet powerhouse',
        description: 'Liquid Retina XDR display, M2 chip, Apple Pencil hover support.',
        price: 1199.99,
        imageUrls: ['https://image.torob.com/base/images/-y/O6/-yO6WlDkp11wupgW.jpg'],
        rating: 4.9,
        reviewCount: 1876,
        inStock: true,
        category: 'Tablets',
        color: 'Space Gray',
        discount: 0, // بدون تخفیف
        moreProperties: [
            { label: 'Display', value: '12.9" Liquid Retina XDR' },
            { label: 'Chip', value: 'Apple M2' },
            { label: 'RAM', value: '8GB' },
            { label: 'Storage', value: '256GB' },
            { label: 'Camera', value: '12MP + 10MP' },
            { label: 'Battery', value: 'Up to 10 hours' },
            { label: 'Apple Pencil', value: 'Gen 2 Support' },
            { label: 'Color', value: 'Space Gray' }
        ]
    },
    {
        id: 15,
        name: 'PlayStation 5 Slim',
        brand: 'Sony',
        shortDescription: 'Next-gen gaming console',
        description: 'Ultra-high speed SSD, 4K gaming, ray tracing, DualSense controller.',
        price: 499.99,
        imageUrls: ['https://image.torob.com/base/images/w3/3i/w33ieWzhBEXs9XpR.jpg'],
        rating: 4.9,
        reviewCount: 8923,
        inStock: false,
        category: 'Gaming Consoles',
        color: 'White',
        discount: 0, // بدون تخفیف
        moreProperties: [
            { label: 'Storage', value: '1TB SSD' },
            { label: 'Resolution', value: '4K' },
            { label: 'Ray Tracing', value: 'Yes' },
            { label: 'Controller', value: 'DualSense' },
            { label: 'Backward Compatible', value: 'Yes (PS4)' },
            { label: 'Ports', value: 'USB-C x2, USB-A' },
            { label: 'Color', value: 'White' }
        ]
    },
    {
        id: 16,
        name: 'Xbox Series X',
        brand: 'Microsoft',
        shortDescription: 'Powerful gaming console',
        description: '12 teraflops of power, 1TB SSD, 4K gaming, backward compatibility.',
        price: 499.99,
        imageUrls: ['https://image.torob.com/base/images/9C/2A/9C2AO-NBxomAjatr.png'],
        rating: 4.8,
        reviewCount: 5672,
        inStock: true,
        category: 'Gaming Consoles',
        color: 'Black',
        discount: 7, // 7% تخفیف
        moreProperties: [
            { label: 'Storage', value: '1TB NVMe SSD' },
            { label: 'GPU Power', value: '12 TFLOPS' },
            { label: 'Resolution', value: '8K ready' },
            { label: 'Frame Rate', value: 'Up to 120fps' },
            { label: 'Backward Compatible', value: 'Yes' },
            { label: 'Quick Resume', value: 'Yes' },
            { label: 'Color', value: 'Black' }
        ]
    },
    {
        id: 17,
        name: 'Nintendo Switch OLED',
        brand: 'Nintendo',
        shortDescription: 'Versatile gaming handheld',
        description: '7-inch OLED screen, 64GB storage, three gaming modes.',
        price: 349.99,
        imageUrls: ['https://image.torob.com/base/images/Tl/gl/TlglucyVxw_w-VD4.jpg'],
        rating: 4.7,
        reviewCount: 12456,
        inStock: true,
        category: 'Gaming Consoles',
        color: 'White',
        discount: 0, // بدون تخفیف
        moreProperties: [
            { label: 'Display', value: '7" OLED' },
            { label: 'Storage', value: '64GB' },
            { label: 'Battery Life', value: '4.5 - 9 hours' },
            { label: 'Modes', value: 'TV, Tabletop, Handheld' },
            { label: 'Controllers', value: '2x Joy-Con' },
            { label: 'Kickstand', value: 'Wide adjustable' },
            { label: 'Color', value: 'White' }
        ]
    },
    {
        id: 18,
        name: 'MX Master 3S',
        brand: 'Logitech',
        shortDescription: 'Ergonomic productivity mouse',
        description: 'Ultra-fast scrolling, 8K DPI tracking, quiet clicks, ergonomic design.',
        price: 99.99,
        imageUrls: ['https://image.torob.com/base/images/Qp/Qh/QpQh9zFSpz_yms7D.jpg'],
        rating: 4.8,
        reviewCount: 3456,
        inStock: true,
        category: 'Accessories',
        color: 'Black',
        discount: 30, // 30% تخفیف
        moreProperties: [
            { label: 'DPI', value: '8000' },
            { label: 'Buttons', value: '6 programmable' },
            { label: 'Connectivity', value: 'Bluetooth + Logi Bolt' },
            { label: 'Battery', value: '70 days' },
            { label: 'Charging', value: 'USB-C' },
            { label: 'Scrolling', value: 'MagSpeed electromagnetic' },
            { label: 'Color', value: 'Black' }
        ]
    },
    {
        id: 19,
        name: 'Mini 4 Pro',
        brand: 'DJI',
        shortDescription: 'Lightweight camera drone',
        description: 'Under 249g, 4K/60fps video, 34-minute flight time, obstacle sensing.',
        price: 759.99,
        imageUrls: ['https://image.torob.com/base/images/gd/_B/gd_BUwpiYedqGySz.jpg'],
        rating: 4.9,
        reviewCount: 876,
        inStock: true,
        category: 'Drones',
        color: 'Gray',
        discount: 0, // بدون تخفیف
        moreProperties: [
            { label: 'Weight', value: '249g' },
            { label: 'Camera', value: '4K/60fps' },
            { label: 'Flight Time', value: '34 minutes' },
            { label: 'Range', value: '20km HD transmission' },
            { label: 'Obstacle Sensing', value: 'Omnidirectional' },
            { label: 'Wind Resistance', value: 'Level 5' },
            { label: 'Color', value: 'Gray' }
        ]
    },
    {
        id: 20,
        name: 'HERO12 Black',
        brand: 'GoPro',
        shortDescription: 'Action camera king',
        description: '5.3K60 video, 27MP photos, HyperSmooth 6.0, waterproof to 33ft.',
        price: 399.99,
        imageUrls: ['https://image.torob.com/base/images/U8/gp/U8gpHoRSi1syMt5g.jpg'],
        rating: 4.8,
        reviewCount: 2345,
        inStock: true,
        category: 'Cameras',
        color: 'Black',
        discount: 0, // بدون تخفیف
        moreProperties: [
            { label: 'Video', value: '5.3K60' },
            { label: 'Photo', value: '27MP' },
            { label: 'Stabilization', value: 'HyperSmooth 6.0' },
            { label: 'Waterproof', value: '33ft (10m)' },
            { label: 'Battery', value: 'Enduro (2x life)' },
            { label: 'Live Streaming', value: 'Yes 1080p' },
            { label: 'Color', value: 'Black' }
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
        wishlistItems: [],
        cartItems: []
    } as TechShopState),
    withComputed(({ wishlistItems, cartItems }) => ({
        wishlistItemsCount: computed(() => wishlistItems().length),
        cartItemsCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
        // cartItemsTotalPrice: computed(()=> cartItems().reduce((acc, item) => ))
    })),
    withMethods((store, toaster = inject(Toaster)) => ({
        addToWishlist: (product: Product) => {
            const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
                if (!draft.find(p => p.id === product.id)) {
                    draft.push(product);
                }
            });
            patchState(store, { wishlistItems: updatedWishlistItems });
            toaster.success("Product added to Wishlist!")
        },
        removeFromWishlist: (product: Product) => {
            patchState(store, { wishlistItems: store.wishlistItems().filter(p => p.id !== product.id) });
            toaster.error("Product removed from Wishlist!")
        },
        clearWishlist: () => {
            patchState(store, { wishlistItems: [] });
        },
        addToCart: (product: Product, quantity = 1) => {
            const existingItemIndex = store.cartItems().findIndex(i => i.product.id == product.id);

            const updatedCartItems = produce(store.cartItems(), (draft) => {
                if (existingItemIndex !== -1) {
                    draft[existingItemIndex].quantity += quantity;
                    return;
                }
                draft.push({ product, quantity });
            })
            patchState(store, { cartItems: updatedCartItems });
            toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to the Cart')
        },
        removeFromCart: (product: Product) => {
            patchState(store, { cartItems: store.cartItems().filter(p => p.product.id !== product.id) })
            toaster.error('Product removed from Cart')
        },
        setItemQuantity: (params: { productId: number, quantity: number }) => {
            const index = store.cartItems().findIndex(c => c.product.id === params.productId);
            let updated = null;
            if (params.quantity > 0) {
                updated = produce(store.cartItems(), (draft) => {
                    draft[index].quantity = params.quantity;
                })
            } else {
                updated = store.cartItems().filter(p => p.product.id !== params.productId);
                toaster.error('Product removed from Cart')
            }
            patchState(store, { cartItems: updated! })
        },
        addAllWishlistToCart: () => {
            const updatedCartItems = produce(store.cartItems(), (draft) => {
                store.wishlistItems().forEach(p => {
                    if (!draft.find(c => c.product.id === p.id) && p.inStock)
                        draft.push({ product: p, quantity: 1 });
                })
            })
            patchState(store, { cartItems: updatedCartItems, wishlistItems: store.wishlistItems().filter(p => !p.inStock) })
        },
        clearCart: () => {
            patchState(store, { cartItems: [] });
        }
    }))
)