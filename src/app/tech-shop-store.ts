import { computed, inject } from "@angular/core";
import { Product } from "./models/product"
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { produce } from "immer";
import { Toaster } from "./services/toaster";
import { CartItem } from "./models/cart";
import { AuthDialog } from './services/auth-dialog';
import { Address, SignInParams, SignUpParams, User } from "./models/user";
import { PRODUCTS } from "./data/products.data";
import { findPromoCode } from "./data/promo-codes";
import { avatarFor, createDemoAccount, DEMO_ACCOUNT, UserAccount } from "./data/demo-account";
import { Router } from "@angular/router";
import { Order } from "./models/order";
import { withStorageSync } from "@angular-architects/ngrx-toolkit"

export const MAX_COMPARE = 3;

export type TechShopState = {
    products: Product[];
    categories: string[];
    sortTypes: { label: string, value: number }[];
    shippingTypes: { id: number, label: string, description: string, cost: number }[],
    wishlistItems: Product[];
    cartItems: CartItem[];
    selectedShippingType: number;
    user: User | undefined;
    users: UserAccount[];
    orders: Order[];
    appliedPromo: string | undefined;
    compareIds: number[];
    lastOrderId: string | undefined;
    loading: boolean,
    selectedProductId: number | undefined
}

export const TechShopStore = signalStore(
    {
        providedIn: 'root',
    },
    withState({
        products: PRODUCTS,
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
        shippingTypes: [
            { id: 0, label: 'Express Delivery', description: 'Estimated delivery: 1-2 business days', cost: 12.99 },
            { id: 1, label: 'Standard Delivery', description: 'Estimated delivery: 5-7 business days', cost: 5.99 },
            { id: 2, label: 'Free Pickup', description: 'Estimated delivery: 1-2 business days', cost: 0 },
        ],
        wishlistItems: [],
        cartItems: [],
        user: undefined,
        users: [createDemoAccount()],
        orders: [],
        appliedPromo: undefined,
        compareIds: [],
        lastOrderId: undefined,
        selectedShippingType: 1,
        loading: false,
        selectedProductId: undefined
    } as TechShopState),
    withStorageSync({ key: 'tech-shop', select: ({ wishlistItems, cartItems, user, users, orders, lastOrderId, appliedPromo, compareIds }) => ({ wishlistItems, cartItems, user, users, orders, lastOrderId, appliedPromo, compareIds }) }),
    withComputed(({ wishlistItems, cartItems, shippingTypes, selectedShippingType, selectedProductId, products, orders, user, lastOrderId, compareIds }) => ({
        compareItems: computed(() => compareIds().map(id => products().find(p => p.id === id)).filter((p): p is Product => !!p)),
        userOrders: computed(() => orders().filter(o => o.userId === user()?.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt))),
        lastOrder: computed(() => orders().find(o => o.id === lastOrderId())),
        wishlistItemsCount: computed(() => wishlistItems().length),
        cartItemsCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
        shippingCost: computed(() => shippingTypes().find(s => s.id == selectedShippingType())?.cost),
        selectedProduct: computed(() => products().find(s => s.id == selectedProductId())),
        // cartItemsTotalPrice: computed(()=> cartItems().reduce((acc, item) => ))
    })),
    withComputed(({ cartItems, shippingCost, appliedPromo }) => ({
        promo: computed(() => findPromoCode(appliedPromo())),
        totals: computed(() => {
            const items = cartItems();
            const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
            const itemDiscount = items.reduce((acc, i) => acc + (i.product.discount / 100) * i.product.price * i.quantity, 0);
            const promo = findPromoCode(appliedPromo());
            const promoDiscount = promo?.type === 'percent' ? ((subtotal - itemDiscount) * promo.value) / 100 : 0;
            const shipping = promo?.type === 'freeShipping' ? 0 : (shippingCost() ?? 0);
            const tax = 0.05 * subtotal;
            return {
                subtotal,
                itemDiscount,
                promoDiscount,
                shipping,
                tax,
                total: subtotal + tax + shipping - itemDiscount - promoDiscount,
            };
        }),
    })),
    withMethods((store, toaster = inject(Toaster), authDialog = inject(AuthDialog), router = inject(Router)) => ({
        setProductId: signalMethod<number>((id: number) => {
            patchState(store, { selectedProductId: id });
        }),
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
        },
        proceedToCheckout: () => {
            if (!store.user()) {
                authDialog.openSignIn(true);
                return;
            }
            router.navigate(['/checkout']);
        },
        signIn: ({ email, password, checkout }: SignInParams): boolean => {
            const normalized = email.trim().toLowerCase();
            let account = store.users().find(u => u.email === normalized);
            // the demo account always works, even if localStorage was cleared or edited
            if (!account && normalized === DEMO_ACCOUNT.email) {
                account = createDemoAccount();
            }

            if (!account || account.password !== password) {
                toaster.error('Invalid email or password.');
                return false;
            }

            const { password: _password, ...user } = account;
            patchState(store, { user });
            toaster.success(`Welcome back, ${user.name}!`);

            if (checkout) {
                router.navigate(['/checkout']);
            }
            return true;
        },
        signUp: ({ email, password, name, checkout }: SignUpParams): boolean => {
            const normalized = email.trim().toLowerCase();
            const exists = normalized === DEMO_ACCOUNT.email || store.users().some(u => u.email === normalized);
            if (exists) {
                toaster.error('An account with this email already exists.');
                return false;
            }

            const account: UserAccount = {
                id: crypto.randomUUID(),
                email: normalized,
                name: name.trim(),
                password,
                imageUrl: avatarFor(name),
                addresses: [],
            };
            const { password: _password, ...user } = account;
            patchState(store, { users: [...store.users(), account], user });
            toaster.success('Account created. Welcome!');

            if (checkout) {
                router.navigate(['/checkout']);
            }
            return true;
        },
        signOut: () => {
            const current = store.user();
            if (current) {
                // keep changes made during the session (e.g. addresses) for the next sign-in
                const saved = store.users().find(u => u.id === current.id);
                const password = saved?.password ?? (current.id === DEMO_ACCOUNT.id ? DEMO_ACCOUNT.password : '');
                const account: UserAccount = { ...current, password };
                patchState(store, {
                    user: undefined,
                    users: saved
                        ? store.users().map(u => (u.id === current.id ? account : u))
                        : [...store.users(), account],
                });
                return;
            }
            patchState(store, { user: undefined });
        },
        addAddress: (address: Address) => {
            const index = store.user()?.addresses.findIndex(a => a.id === address.id);
            if (index !== -1) {
                return;
            }
            const updatedUser = produce(store.user(), (draft) => {
                draft?.addresses.push(address);
                draft?.addresses.forEach(a => {
                    if (a.id == address.id)
                        a.isMain = true;
                    else
                        a.isMain = false;
                })
            });
            patchState(store, { user: updatedUser });
            toaster.success('Address added.')
        },
        setMainAddress(addressId: number) {
            const currentUser = store.user();
            if (!currentUser) return;
            const updatedUser = produce(currentUser, (draft) => {
                draft?.addresses.forEach(address => {
                    address.isMain = address.id === addressId;
                });
            });

            patchState(store, { user: updatedUser });
            toaster.success('Main address updated.');
        },
        toggleCompare: (product: Product) => {
            const ids = store.compareIds();
            if (ids.includes(product.id)) {
                patchState(store, { compareIds: ids.filter(id => id !== product.id) });
                return;
            }
            if (ids.length >= MAX_COMPARE) {
                toaster.warning(`You can compare up to ${MAX_COMPARE} products.`);
                return;
            }
            patchState(store, { compareIds: [...ids, product.id] });
        },
        removeFromCompare: (productId: number) => {
            patchState(store, { compareIds: store.compareIds().filter(id => id !== productId) });
        },
        clearCompare: () => {
            patchState(store, { compareIds: [] });
        },
        applyPromo: (code: string) => {
            const promo = findPromoCode(code);
            if (!promo) {
                toaster.error('Invalid promo code.');
                return false;
            }
            patchState(store, { appliedPromo: promo.code });
            toaster.success(`Promo code applied: ${promo.label}`);
            return true;
        },
        removePromo: () => {
            patchState(store, { appliedPromo: undefined });
        },
        removeAddress: (addressId: number) => {
            const currentUser = store.user();
            if (!currentUser) return;
            const updatedUser = produce(currentUser, (draft) => {
                const wasMain = draft.addresses.find(a => a.id === addressId)?.isMain;
                draft.addresses = draft.addresses.filter(a => a.id !== addressId);
                if (wasMain && draft.addresses.length) {
                    draft.addresses[0].isMain = true;
                }
            });
            patchState(store, { user: updatedUser });
            toaster.success('Address removed.');
        },
        placeOrder: async () => {
            patchState(store, { loading: true });

            const user = store.user();
            if (!user) {
                toaster.error("Please login before placing order")
                patchState(store, { loading: false });
                return;
            }

            const items = store.cartItems();
            const totals = store.totals();

            const order: Order = {
                id: crypto.randomUUID(),
                number: 'TS-' + Math.floor(10000 + Math.random() * 90000),
                userId: user.id,
                createdAt: new Date().toISOString(),
                subtotal: totals.subtotal,
                tax: totals.tax,
                discount: totals.itemDiscount,
                promoCode: store.promo()?.code,
                promoDiscount: totals.promoDiscount,
                shippingCost: totals.shipping,
                total: totals.total,
                shippingType: store.selectedShippingType(),
                items,
                paymentStatus: 'success',
            };

            await new Promise((resolve) => setTimeout(resolve, 1000));

            patchState(store, { loading: false, cartItems: [], appliedPromo: undefined, orders: [...store.orders(), order], lastOrderId: order.id });

            router.navigate(['order-success']);
        }
    })),

)