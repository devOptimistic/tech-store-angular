import { Product } from '../models/product';

export const PRODUCTS: Product[] = [
    // iPhone 15 Pro Max - Black Titanium
    {
        id: 1,
        name: 'iPhone 15 Pro Max',
        brand: 'Apple',
        shortDescription: 'Flagship powerhouse smartphone',
        description: '6.7-inch Super Retina XDR display, A17 Pro chip, titanium design, 48MP main camera with 5x optical zoom.',
        price: 1199.99,
        imageUrls: ['https://image.torob.com/base/images/BG/tS/BGtSFDpKTzbh5m-y.jpg'],
        rating: 2.9,
        reviewCount: 2,
        inStock: true,
        category: 'Smartphones',
        color: 'Black Titanium',
        discount: 10,
        moreProperties: [
            { label: 'Display', value: '6.7" Super Retina XDR' },
            { label: 'Chip', value: 'A17 Pro' },
            { label: 'RAM', value: '8GB' },
            { label: 'Storage', value: '256GB' },
            { label: 'Camera', value: '48MP + 12MP + 12MP' },
            { label: 'Battery', value: '4422mAh' },
            { label: 'Color', value: 'Black Titanium' }
        ],
        reviews: [
            {
                id: 'rev_1_1',
                productId: '1',
                userName: 'Michael Chen',
                userImageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
                rating: 3,
                title: 'Good but heavy',
                comment: 'The phone is very powerful but the titanium black color scratches easily. Also quite heavy for one-handed use.',
                reviewDate: new Date('2024-10-15')
            },
            {
                id: 'rev_1_2',
                productId: '1',
                userName: 'Sarah Johnson',
                userImageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
                rating: 2.5,
                title: 'Disappointed with battery',
                comment: 'Battery life is not as advertised. Need to charge twice a day with moderate use.',
                reviewDate: new Date('2024-11-20')
            }
        ]
    },
    // iPhone 15 Pro Max - White Titanium
    {
        id: 101,
        name: 'iPhone 15 Pro Max',
        brand: 'Apple',
        shortDescription: 'Flagship powerhouse smartphone',
        description: '6.7-inch Super Retina XDR display, A17 Pro chip, titanium design, 48MP main camera with 5x optical zoom.',
        price: 1199.99,
        imageUrls: ['https://image.torob.com/base/images/So/Pv/SoPvcAOGeXss0w5P.jpg'],
        rating: 4.9,
        reviewCount: 2,
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
        ],
        reviews: [
            {
                id: 'rev_101_1',
                productId: '101',
                userName: 'Emma Wilson',
                userImageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
                rating: 5,
                title: 'Perfect white color!',
                comment: 'The white titanium is stunning. Camera quality is incredible, especially in low light. Very happy with this purchase.',
                reviewDate: new Date('2024-09-10')
            },
            {
                id: 'rev_101_2',
                productId: '101',
                userName: 'David Kim',
                userImageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
                rating: 4.8,
                title: 'Almost perfect',
                comment: 'Great performance, beautiful display. Only downside is the price is too high for the storage capacity.',
                reviewDate: new Date('2024-10-05')
            }
        ]
    },
    // iPhone 15 Pro Max - Blue Titanium
    {
        id: 102,
        name: 'iPhone 15 Pro Max',
        brand: 'Apple',
        shortDescription: 'Flagship powerhouse smartphone',
        description: '6.7-inch Super Retina XDR display, A17 Pro chip, titanium design, 48MP main camera with 5x optical zoom.',
        price: 1199.99,
        imageUrls: ['https://image.torob.com/base/images/-N/_Y/-N_Y6EEy-fEaIGsE.jpg'],
        rating: 4.9,
        reviewCount: 1,
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
        ],
        reviews: [
            {
                id: 'rev_102_1',
                productId: '102',
                userName: 'James Rodriguez',
                userImageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
                rating: 5,
                title: 'Best iPhone ever',
                comment: 'The blue titanium is gorgeous. A17 Pro chip is blazing fast. Camera zoom is amazing for concerts.',
                reviewDate: new Date('2024-08-22')
            }
        ]
    },
    // iPhone 15 Pro Max - Natural Titanium
    {
        id: 103,
        name: 'iPhone 15 Pro Max',
        brand: 'Apple',
        shortDescription: 'Flagship powerhouse smartphone',
        description: '6.7-inch Super Retina XDR display, A17 Pro chip, titanium design, 48MP main camera with 5x optical zoom.',
        price: 1199.99,
        imageUrls: ['https://image.torob.com/base/images/u2/La/u2LaGEmnJNqzz-jy.webp'],
        rating: 4.9,
        reviewCount: 1,
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
        ],
        reviews: [
            {
                id: 'rev_103_1',
                productId: '103',
                userName: 'Olivia Martinez',
                userImageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
                rating: 4.9,
                title: 'Natural beauty',
                comment: 'Love the natural titanium finish. It doesn\'t show fingerprints like other colors. Performance is top notch.',
                reviewDate: new Date('2024-09-28')
            }
        ]
    },
    // Galaxy S24 Ultra
    {
        id: 2,
        name: 'Galaxy S24 Ultra',
        brand: 'Samsung',
        shortDescription: 'Ultimate Android flagship',
        description: '6.8-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 3, 200MP camera with 100x Space Zoom.',
        price: 1299.99,
        imageUrls: ['https://image.torob.com/base/images/bb/CV/bbCVIyIXfJ1svY8t.jpg'],
        rating: 4.8,
        reviewCount: 2,
        inStock: true,
        category: 'Smartphones',
        color: 'Titanium Gray',
        discount: 15,
        moreProperties: [
            { label: 'Display', value: '6.8" Dynamic AMOLED 2X' },
            { label: 'Chip', value: 'Snapdragon 8 Gen 3' },
            { label: 'RAM', value: '12GB' },
            { label: 'Storage', value: '512GB' },
            { label: 'Camera', value: '200MP + 50MP + 12MP' },
            { label: 'Battery', value: '5000mAh' },
            { label: 'S Pen', value: 'Included' },
            { label: 'Color', value: 'Titanium Gray' }
        ],
        reviews: [
            {
                id: 'rev_2_1',
                productId: '2',
                userName: 'Andrew Park',
                userImageUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
                rating: 5,
                title: 'Zoom king!',
                comment: 'The 100x zoom is insane. I can take pictures of the moon! Battery lasts all day easily.',
                reviewDate: new Date('2024-10-01')
            },
            {
                id: 'rev_2_2',
                productId: '2',
                userName: 'Jessica Lee',
                userImageUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
                rating: 4.5,
                title: 'Great but bulky',
                comment: 'Amazing phone but very wide and heavy. OneUI is smooth though and S Pen is useful.',
                reviewDate: new Date('2024-11-05')
            }
        ]
    },
    // Pixel 8 Pro
    {
        id: 3,
        name: 'Pixel 8 Pro',
        brand: 'Google',
        shortDescription: 'AI-powered camera phone',
        description: '6.7-inch Super Actua display, Google Tensor G3 chip, advanced AI features.',
        price: 999.99,
        imageUrls: ['https://image.torob.com/base/images/fC/DV/fCDV1s8r-_QtiuYO.jpg'],
        rating: 4.7,
        reviewCount: 1,
        inStock: false,
        category: 'Smartphones',
        color: 'Obsidian',
        discount: 0,
        moreProperties: [
            { label: 'Display', value: '6.7" Super Actua' },
            { label: 'Chip', value: 'Google Tensor G3' },
            { label: 'RAM', value: '12GB' },
            { label: 'Storage', value: '256GB' },
            { label: 'Camera', value: '50MP + 48MP + 48MP' },
            { label: 'Battery', value: '5050mAh' },
            { label: 'Color', value: 'Obsidian' }
        ],
        reviews: [
            {
                id: 'rev_3_1',
                productId: '3',
                userName: 'Brian Taylor',
                userImageUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
                rating: 5,
                title: 'Pure Android at its best',
                comment: 'Best camera for moving subjects (kids/pets). AI features like Magic Eraser are game changers.',
                reviewDate: new Date('2024-09-15')
            }
        ]
    },
    // MacBook Pro 14 M3
    {
        id: 6,
        name: 'MacBook Pro 14 M3',
        brand: 'Apple',
        shortDescription: 'Pro creative laptop',
        description: '14-inch Liquid Retina XDR display, M3 Pro chip, 18GB memory, 512GB SSD.',
        price: 1999.99,
        imageUrls: ['https://image.torob.com/base/images/rF/NZ/rFNZQwiefDBbzYAU.jpg'],
        rating: 4.9,
        reviewCount: 1,
        inStock: true,
        category: 'Laptops',
        color: 'Space Gray',
        discount: 5,
        moreProperties: [
            { label: 'Display', value: '14.2" Liquid Retina XDR' },
            { label: 'Chip', value: 'Apple M3 Pro' },
            { label: 'RAM', value: '18GB' },
            { label: 'Storage', value: '512GB SSD' },
            { label: 'GPU', value: '14-core' },
            { label: 'Battery', value: 'Up to 17 hours' },
            { label: 'Weight', value: '3.5 lbs' },
            { label: 'Color', value: 'Space Gray' }
        ],
        reviews: [
            {
                id: 'rev_6_1',
                productId: '6',
                userName: 'Chris Evans',
                userImageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
                rating: 5,
                title: 'Worth every penny',
                comment: 'The display is breathtaking. Battery lasts me 2 days of heavy development work. M3 Pro is a beast.',
                reviewDate: new Date('2024-10-20')
            }
        ]
    },
    // MacBook Air 15 M3
    {
        id: 7,
        name: 'MacBook Air 15 M3',
        brand: 'Apple',
        shortDescription: 'Ultra-thin laptop',
        description: '15.3-inch Liquid Retina display, M3 chip, 16GB memory, 512GB SSD, 18-hour battery.',
        price: 1399.99,
        imageUrls: ['https://image.torob.com/base/images/f5/nZ/f5nZLbUheCdIYvA-.jpg'],
        rating: 4.8,
        reviewCount: 1,
        inStock: true,
        category: 'Laptops',
        color: 'Midnight',
        discount: 0,
        moreProperties: [
            { label: 'Display', value: '15.3" Liquid Retina' },
            { label: 'Chip', value: 'Apple M3' },
            { label: 'RAM', value: '16GB' },
            { label: 'Storage', value: '512GB SSD' },
            { label: 'Battery', value: 'Up to 18 hours' },
            { label: 'Weight', value: '3.3 lbs' },
            { label: 'Camera', value: '1080p FaceTime HD' },
            { label: 'Color', value: 'Midnight' }
        ],
        reviews: [
            {
                id: 'rev_7_1',
                productId: '7',
                userName: 'Lisa Wong',
                userImageUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                rating: 4.8,
                title: 'Perfect for students',
                comment: 'Lightweight, powerful, and the battery never dies. Midnight color shows fingerprints though.',
                reviewDate: new Date('2024-11-01')
            }
        ]
    },
    // OnePlus 12
    {
        id: 4,
        name: 'OnePlus 12',
        brand: 'OnePlus',
        shortDescription: 'Fast charging flagship',
        description: '6.82-inch 2K 120Hz display, Snapdragon 8 Gen 3, 5400mAh battery.',
        price: 799.99,
        imageUrls: ['https://image.torob.com/base/images/Ld/Us/LdUs8ezle2NQ60Wi.jpg'],
        rating: 4.6,
        reviewCount: 1,
        inStock: true,
        category: 'Smartphones',
        color: 'Black',
        discount: 20,
        moreProperties: [
            { label: 'Display', value: '6.82" 2K 120Hz' },
            { label: 'Chip', value: 'Snapdragon 8 Gen 3' },
            { label: 'RAM', value: '16GB' },
            { label: 'Storage', value: '512GB' },
            { label: 'Camera', value: '50MP + 64MP + 48MP' },
            { label: 'Battery', value: '5400mAh' },
            { label: 'Charging', value: '100W Fast Charging' },
            { label: 'Color', value: 'Black' }
        ],
        reviews: [
            {
                id: 'rev_4_1',
                productId: '4',
                userName: 'Marcus Thompson',
                userImageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
                rating: 5,
                title: 'Insane value',
                comment: '100W charging is a game changer. Full charge in 26 minutes! Screen is butter smooth.',
                reviewDate: new Date('2024-09-05')
            }
        ]
    },
    // Xiaomi 14 Ultra
    {
        id: 5,
        name: 'Xiaomi 14 Ultra',
        brand: 'Xiaomi',
        shortDescription: 'Leica camera flagship',
        description: '6.73-inch AMOLED, Snapdragon 8 Gen 3, Leica quad camera system with 1-inch sensor.',
        price: 1099.99,
        imageUrls: ['https://image.torob.com/base/images/jk/Yq/jkYqyLon5pRyRShM.webp'],
        rating: 4.7,
        reviewCount: 1,
        inStock: false,
        category: 'Smartphones',
        color: 'White',
        discount: 12,
        moreProperties: [
            { label: 'Display', value: '6.73" AMOLED' },
            { label: 'Chip', value: 'Snapdragon 8 Gen 3' },
            { label: 'RAM', value: '16GB' },
            { label: 'Storage', value: '512GB' },
            { label: 'Camera', value: '50MP Leica + 50MP + 50MP' },
            { label: 'Battery', value: '5000mAh' },
            { label: 'Charging', value: '90W Fast Charging' },
            { label: 'Color', value: 'White' }
        ],
        reviews: [
            {
                id: 'rev_5_1',
                productId: '5',
                userName: 'Thomas Mueller',
                userImageUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
                rating: 4.5,
                title: 'Leica magic',
                comment: 'The camera produces stunning photos with natural bokeh. Software needs some polish though.',
                reviewDate: new Date('2024-08-30')
            }
        ]
    },
    // Dell XPS 15
    {
        id: 8,
        name: 'Dell XPS 15',
        brand: 'Dell',
        shortDescription: 'Premium creator laptop',
        description: '15.6-inch 3.5K OLED, Intel Core i9, RTX 4070, 32GB RAM, 1TB SSD.',
        price: 2499.99,
        imageUrls: ['https://image.torob.com/base/images/Ao/DZ/AoDZf3o_H7j8hA0u.jpg'],
        rating: 4.8,
        reviewCount: 1,
        inStock: true,
        category: 'Laptops',
        color: 'Platinum Silver',
        discount: 0,
        moreProperties: [
            { label: 'Display', value: '15.6" 3.5K OLED' },
            { label: 'CPU', value: 'Intel Core i9-13900H' },
            { label: 'RAM', value: '32GB DDR5' },
            { label: 'Storage', value: '1TB NVMe SSD' },
            { label: 'GPU', value: 'NVIDIA RTX 4070' },
            { label: 'Weight', value: '4.2 lbs' },
            { label: 'Ports', value: 'Thunderbolt 4 x2' },
            { label: 'Color', value: 'Platinum Silver' }
        ],
        reviews: [
            {
                id: 'rev_8_1',
                productId: '8',
                userName: 'Rachel Green',
                userImageUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
                rating: 5,
                title: 'Creator\'s dream',
                comment: 'The OLED screen is perfect for video editing. RTX 4070 handles 4K rendering with ease.',
                reviewDate: new Date('2024-10-12')
            }
        ]
    },
    // ASUS ROG Zephyrus G14
    {
        id: 9,
        name: 'ASUS ROG Zephyrus G14',
        brand: 'ASUS',
        shortDescription: 'Compact gaming beast',
        description: '14-inch QHD+ 165Hz, Ryzen 9, RTX 4060, 16GB RAM, 1TB SSD.',
        price: 1599.99,
        imageUrls: ['https://image.torob.com/base/images/YG/Cn/YGCnXKqE3dhCPWhb.jpg'],
        rating: 4.8,
        reviewCount: 1,
        inStock: true,
        category: 'Gaming Laptops',
        color: 'Eclipse Gray',
        discount: 8,
        moreProperties: [
            { label: 'Display', value: '14" QHD+ 165Hz' },
            { label: 'CPU', value: 'AMD Ryzen 9 8945HS' },
            { label: 'RAM', value: '16GB DDR5' },
            { label: 'Storage', value: '1TB NVMe SSD' },
            { label: 'GPU', value: 'NVIDIA RTX 4060' },
            { label: 'Weight', value: '3.5 lbs' },
            { label: 'RGB', value: 'Aura Sync' },
            { label: 'Color', value: 'Eclipse Gray' }
        ],
        reviews: [
            {
                id: 'rev_9_1',
                productId: '9',
                userName: 'Kevin Zhang',
                userImageUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
                rating: 4.8,
                title: 'Portable power',
                comment: 'Plays all modern games at high settings. Fans can get loud but that\'s expected.',
                reviewDate: new Date('2024-09-18')
            }
        ]
    },
    // Lenovo ThinkPad X1 Carbon Gen 12
    {
        id: 10,
        name: 'Lenovo ThinkPad X1 Carbon Gen 12',
        brand: 'Lenovo',
        shortDescription: 'Ultra-light business laptop',
        description: '14-inch 2.8K OLED, Intel Core Ultra 7, 32GB RAM, 1TB SSD.',
        price: 2199.99,
        imageUrls: ['https://image.torob.com/base/images/Kt/Pe/KtPenHs3IEk5vlQS.jpg'],
        rating: 4.7,
        reviewCount: 1,
        inStock: true,
        category: 'Laptops',
        color: 'Black',
        discount: 0,
        moreProperties: [
            { label: 'Display', value: '14" 2.8K OLED' },
            { label: 'CPU', value: 'Intel Core Ultra 7' },
            { label: 'RAM', value: '32GB LPDDR5x' },
            { label: 'Storage', value: '1TB NVMe SSD' },
            { label: 'Weight', value: '2.48 lbs' },
            { label: 'Security', value: 'Fingerprint + IR Camera' },
            { label: 'Battery', value: 'Up to 15 hours' },
            { label: 'Color', value: 'Black' }
        ],
        reviews: [
            {
                id: 'rev_10_1',
                productId: '10',
                userName: 'Priya Patel',
                userImageUrl: 'https://randomuser.me/api/portraits/women/16.jpg',
                rating: 5,
                title: 'Best keyboard ever',
                comment: 'The typing experience is unmatched. So light I forget it\'s in my bag. Battery lasts all day.',
                reviewDate: new Date('2024-11-08')
            }
        ]
    },
    // Sony WH-1000XM5
    {
        id: 11,
        name: 'Sony WH-1000XM5',
        brand: 'Sony',
        shortDescription: 'Best noise cancellation',
        description: 'Industry-leading noise cancellation, 30-hour battery, premium sound quality.',
        price: 349.99,
        imageUrls: ['https://image.torob.com/base/images/HC/tQ/HCtQ8LPk7QF917hR.jpg'],
        rating: 4.9,
        reviewCount: 1,
        inStock: true,
        category: 'Headphones',
        color: 'Black',
        discount: 25,
        moreProperties: [
            { label: 'Type', value: 'Over-Ear' },
            { label: 'Noise Cancellation', value: 'Yes (Industry-leading)' },
            { label: 'Battery Life', value: '30 hours' },
            { label: 'Charging', value: 'USB-C, 3-hour quick charge' },
            { label: 'Connectivity', value: 'Bluetooth 5.2' },
            { label: 'Weight', value: '250g' },
            { label: 'Color', value: 'Black' }
        ],
        reviews: [
            {
                id: 'rev_11_1',
                productId: '11',
                userName: 'Daniel Smith',
                userImageUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
                rating: 5,
                title: 'Silence is golden',
                comment: 'Blocks out everything - plane engines, office chatter, you name it. Sound quality is superb.',
                reviewDate: new Date('2024-10-25')
            }
        ]
    },
    // Apple AirPods Pro 2
    {
        id: 12,
        name: 'Apple AirPods Pro 2',
        brand: 'Apple',
        shortDescription: 'Premium wireless earbuds',
        description: 'Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio.',
        price: 199.99,
        imageUrls: ['https://image.torob.com/base/images/32/fl/32flIu1ykkQlr8LG.jpg'],
        rating: 4.8,
        reviewCount: 1,
        inStock: true,
        category: 'Earbuds',
        color: 'White',
        discount: 0,
        moreProperties: [
            { label: 'Type', value: 'In-Ear' },
            { label: 'Chip', value: 'Apple H2' },
            { label: 'Noise Cancellation', value: 'Yes' },
            { label: 'Battery Life', value: '6 hours (30 with case)' },
            { label: 'Water Resistance', value: 'IPX4' },
            { label: 'Charging', value: 'Lightning/USB-C' },
            { label: 'Color', value: 'White' }
        ],
        reviews: [
            {
                id: 'rev_12_1',
                productId: '12',
                userName: 'Natalie Brown',
                userImageUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
                rating: 4.8,
                title: 'Seamless ecosystem',
                comment: 'Works perfectly with my iPhone. Noise cancellation is impressive for the size.',
                reviewDate: new Date('2024-09-30')
            }
        ]
    },
    // Samsung Galaxy Watch 6 Classic
    {
        id: 13,
        name: 'Samsung Galaxy Watch 6 Classic',
        brand: 'Samsung',
        shortDescription: 'Smart health watch',
        description: '47mm stainless steel, rotating bezel, advanced health monitoring.',
        price: 399.99,
        imageUrls: ['https://image.torob.com/base/images/66/fV/66fVN8k1C3Pv-UVa.jpg'],
        rating: 4.7,
        reviewCount: 1,
        inStock: true,
        category: 'Smartwatches',
        color: 'Black',
        discount: 18,
        moreProperties: [
            { label: 'Display', value: '1.5" Super AMOLED' },
            { label: 'Size', value: '47mm' },
            { label: 'Material', value: 'Stainless Steel' },
            { label: 'Battery', value: '425mAh' },
            { label: 'GPS', value: 'Yes' },
            { label: 'Health Sensors', value: 'HR, ECG, BP' },
            { label: 'OS', value: 'Wear OS 4' },
            { label: 'Color', value: 'Black' }
        ],
        reviews: [
            {
                id: 'rev_13_1',
                productId: '13',
                userName: 'Robert Chen',
                userImageUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
                rating: 4.7,
                title: 'Rotating bezel is back!',
                comment: 'So satisfying to use. Health tracking is accurate. Battery lasts 2 days.',
                reviewDate: new Date('2024-10-18')
            }
        ]
    },
    // Apple iPad Pro 12.9"
    {
        id: 14,
        name: 'Apple iPad Pro 12.9"',
        brand: 'Apple',
        shortDescription: 'Pro tablet powerhouse',
        description: 'Liquid Retina XDR display, M2 chip, Apple Pencil hover support.',
        price: 1199.99,
        imageUrls: ['https://image.torob.com/base/images/-y/O6/-yO6WlDkp11wupgW.jpg'],
        rating: 4.9,
        reviewCount: 1,
        inStock: true,
        category: 'Tablets',
        color: 'Space Gray',
        discount: 0,
        moreProperties: [
            { label: 'Display', value: '12.9" Liquid Retina XDR' },
            { label: 'Chip', value: 'Apple M2' },
            { label: 'RAM', value: '8GB' },
            { label: 'Storage', value: '256GB' },
            { label: 'Camera', value: '12MP + 10MP' },
            { label: 'Battery', value: 'Up to 10 hours' },
            { label: 'Apple Pencil', value: 'Gen 2 Support' },
            { label: 'Color', value: 'Space Gray' }
        ],
        reviews: [
            {
                id: 'rev_14_1',
                productId: '14',
                userName: 'Michelle Yeoh',
                userImageUrl: 'https://randomuser.me/api/portraits/women/20.jpg',
                rating: 5,
                title: 'Laptop replacement',
                comment: 'The XDR display is perfect for HDR content editing. Stage Manager makes multitasking great.',
                reviewDate: new Date('2024-11-12')
            }
        ]
    },
    // Sony PlayStation 5 Slim
    {
        id: 15,
        name: 'Sony PlayStation 5 Slim',
        brand: 'Sony',
        shortDescription: 'Next-gen gaming console',
        description: 'Ultra-high speed SSD, 4K gaming, ray tracing, DualSense controller.',
        price: 499.99,
        imageUrls: ['https://image.torob.com/base/images/w3/3i/w33ieWzhBEXs9XpR.jpg'],
        rating: 4.9,
        reviewCount: 1,
        inStock: false,
        category: 'Gaming Consoles',
        color: 'White',
        discount: 0,
        moreProperties: [
            { label: 'Storage', value: '1TB SSD' },
            { label: 'Resolution', value: '4K' },
            { label: 'Ray Tracing', value: 'Yes' },
            { label: 'Controller', value: 'DualSense' },
            { label: 'Backward Compatible', value: 'Yes (PS4)' },
            { label: 'Ports', value: 'USB-C x2, USB-A' },
            { label: 'Color', value: 'White' }
        ],
        reviews: [
            {
                id: 'rev_15_1',
                productId: '15',
                userName: 'Alex Rivera',
                userImageUrl: 'https://randomuser.me/api/portraits/men/21.jpg',
                rating: 5,
                title: 'Next gen is here',
                comment: 'DualSense controller haptics are mind-blowing. Loading times are basically non-existent.',
                reviewDate: new Date('2024-09-22')
            }
        ]
    },
    // Microsoft Xbox Series X
    {
        id: 16,
        name: 'Microsoft Xbox Series X',
        brand: 'Microsoft',
        shortDescription: 'Powerful gaming console',
        description: '12 teraflops of power, 1TB SSD, 4K gaming, backward compatibility.',
        price: 499.99,
        imageUrls: ['https://image.torob.com/base/images/9C/2A/9C2AO-NBxomAjatr.png'],
        rating: 4.8,
        reviewCount: 1,
        inStock: true,
        category: 'Gaming Consoles',
        color: 'Black',
        discount: 7,
        moreProperties: [
            { label: 'Storage', value: '1TB NVMe SSD' },
            { label: 'GPU Power', value: '12 TFLOPS' },
            { label: 'Resolution', value: '8K ready' },
            { label: 'Frame Rate', value: 'Up to 120fps' },
            { label: 'Backward Compatible', value: 'Yes' },
            { label: 'Quick Resume', value: 'Yes' },
            { label: 'Color', value: 'Black' }
        ],
        reviews: [
            {
                id: 'rev_16_1',
                productId: '16',
                userName: 'Jordan Lee',
                userImageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
                rating: 4.8,
                title: 'Game Pass machine',
                comment: 'Quick Resume is a killer feature. Game Pass gives insane value. Very quiet operation.',
                reviewDate: new Date('2024-10-08')
            }
        ]
    },
    // Nintendo Switch OLED
    {
        id: 17,
        name: 'Nintendo Switch OLED',
        brand: 'Nintendo',
        shortDescription: 'Versatile gaming handheld',
        description: '7-inch OLED screen, 64GB storage, three gaming modes.',
        price: 349.99,
        imageUrls: ['https://image.torob.com/base/images/Tl/gl/TlglucyVxw_w-VD4.jpg'],
        rating: 4.7,
        reviewCount: 1,
        inStock: true,
        category: 'Gaming Consoles',
        color: 'White',
        discount: 0,
        moreProperties: [
            { label: 'Display', value: '7" OLED' },
            { label: 'Storage', value: '64GB' },
            { label: 'Battery Life', value: '4.5 - 9 hours' },
            { label: 'Modes', value: 'TV, Tabletop, Handheld' },
            { label: 'Controllers', value: '2x Joy-Con' },
            { label: 'Kickstand', value: 'Wide adjustable' },
            { label: 'Color', value: 'White' }
        ],
        reviews: [
            {
                id: 'rev_17_1',
                productId: '17',
                userName: 'Mario Fanatic',
                userImageUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
                rating: 4.7,
                title: 'OLED makes a difference',
                comment: 'Colors pop on the new screen. The kickstand is finally usable. Zelda looks amazing.',
                reviewDate: new Date('2024-11-15')
            }
        ]
    },
    // Logitech MX Master 3S
    {
        id: 18,
        name: 'Logitech MX Master 3S',
        brand: 'Logitech',
        shortDescription: 'Ergonomic productivity mouse',
        description: 'Ultra-fast scrolling, 8K DPI tracking, quiet clicks, ergonomic design.',
        price: 99.99,
        imageUrls: ['https://image.torob.com/base/images/Qp/Qh/QpQh9zFSpz_yms7D.jpg'],
        rating: 1.8,
        reviewCount: 2,
        inStock: true,
        category: 'Accessories',
        color: 'Black',
        discount: 30,
        moreProperties: [
            { label: 'DPI', value: '8000' },
            { label: 'Buttons', value: '6 programmable' },
            { label: 'Connectivity', value: 'Bluetooth + Logi Bolt' },
            { label: 'Battery', value: '70 days' },
            { label: 'Charging', value: 'USB-C' },
            { label: 'Scrolling', value: 'MagSpeed electromagnetic' },
            { label: 'Color', value: 'Black' }
        ],
        reviews: [
            {
                id: 'rev_18_1',
                productId: '18',
                userName: 'Steve Jobs Wannabe',
                userImageUrl: 'https://randomuser.me/api/portraits/men/24.jpg',
                rating: 1.5,
                title: 'Terrible connectivity',
                comment: 'Constant lag and disconnects. Overhyped mouse. Returned it within a week.',
                reviewDate: new Date('2024-10-28')
            },
            {
                id: 'rev_18_2',
                productId: '18',
                userName: 'Disappointed User',
                userImageUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
                rating: 2,
                title: 'Not worth the price',
                comment: 'Scroll wheel feels nice but software is buggy. My $30 mouse works better.',
                reviewDate: new Date('2024-11-02')
            }
        ]
    },
    // DJI Mini 4 Pro
    {
        id: 19,
        name: 'DJI Mini 4 Pro',
        brand: 'DJI',
        shortDescription: 'Lightweight camera drone',
        description: 'Under 249g, 4K/60fps video, 34-minute flight time, obstacle sensing.',
        price: 759.99,
        imageUrls: ['https://image.torob.com/base/images/gd/_B/gd_BUwpiYedqGySz.jpg'],
        rating: 4.9,
        reviewCount: 1,
        inStock: true,
        category: 'Drones',
        color: 'Gray',
        discount: 0,
        moreProperties: [
            { label: 'Weight', value: '249g' },
            { label: 'Camera', value: '4K/60fps' },
            { label: 'Flight Time', value: '34 minutes' },
            { label: 'Range', value: '20km HD transmission' },
            { label: 'Obstacle Sensing', value: 'Omnidirectional' },
            { label: 'Wind Resistance', value: 'Level 5' },
            { label: 'Color', value: 'Gray' }
        ],
        reviews: [
            {
                id: 'rev_19_1',
                productId: '19',
                userName: 'Aerial Photographer',
                userImageUrl: 'https://randomuser.me/api/portraits/men/26.jpg',
                rating: 5,
                title: 'No registration needed!',
                comment: 'Under 250g so no FAA registration. Obstacle avoidance works perfectly. Incredible video quality.',
                reviewDate: new Date('2024-09-25')
            }
        ]
    },
    // GoPro HERO12 Black
    {
        id: 20,
        name: 'GoPro HERO12 Black',
        brand: 'GoPro',
        shortDescription: 'Action camera king',
        description: '5.3K60 video, 27MP photos, HyperSmooth 6.0, waterproof to 33ft.',
        price: 399.99,
        imageUrls: ['https://image.torob.com/base/images/U8/gp/U8gpHoRSi1syMt5g.jpg'],
        rating: 4.8,
        reviewCount: 1,
        inStock: true,
        category: 'Cameras',
        color: 'Black',
        discount: 0,
        moreProperties: [
            { label: 'Video', value: '5.3K60' },
            { label: 'Photo', value: '27MP' },
            { label: 'Stabilization', value: 'HyperSmooth 6.0' },
            { label: 'Waterproof', value: '33ft (10m)' },
            { label: 'Battery', value: 'Enduro (2x life)' },
            { label: 'Live Streaming', value: 'Yes 1080p' },
            { label: 'Color', value: 'Black' }
        ],
        reviews: [
            {
                id: 'rev_20_1',
                productId: '20',
                userName: 'Mountain Biker',
                userImageUrl: 'https://randomuser.me/api/portraits/men/27.jpg',
                rating: 4.9,
                title: 'Butter smooth stabilization',
                comment: 'HyperSmooth 6.0 is like a gimbal built-in. Battery life is much improved from HERO11.',
                reviewDate: new Date('2024-10-10')
            }
        ]
    }
];
