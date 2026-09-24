/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { MobileStickyBar } from './components/MobileStickyBar';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomizeStudioPage } from './pages/CustomizeStudioPage';
import { CorporateBulkPage } from './pages/CorporateBulkPage';
import { PrintingMethodsPage } from './pages/PrintingMethodsPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { ContactPage } from './pages/ContactPage';

import { PRODUCTS } from './data/mockData';
import { Product, CartItem, PrintMethod, ProductVariant } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  // Cart state initialized with 1 realistic UAE order item
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: PRODUCTS[0],
      selectedColor: PRODUCTS[0].variants[0],
      selectedSize: 'L',
      selectedMethod: 'DTF',
      quantity: 15,
      unitPrice: 32,
      customDesignText: 'DOHAR CREATIVE'
    }
  ]);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, selectedProduct]);

  // Keyboard shortcut Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (tab: string, catFilter?: string) => {
    setCurrentTab(tab);
    if (catFilter) {
      setCategoryFilter(catFilter);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab('product-detail');
  };

  const handleCustomizeProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab('studio');
  };

  const handleAddToCart = (newItem: {
    product: Product;
    selectedColor: ProductVariant;
    selectedSize: string;
    selectedMethod: PrintMethod;
    quantity: number;
    unitPrice: number;
    customDesignText?: string;
  }) => {
    const cartEntry: CartItem = {
      id: `cart-${Date.now()}`,
      ...newItem
    };
    setCartItems((prev) => [...prev, cartEntry]);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleOpenWhatsAppGeneral = () => {
    const text = encodeURIComponent(
      'Hello DOHAR UAE! I would like to inquire about on-demand printing and request a quick quotation.'
    );
    window.open(`https://wa.me/971504928812?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#211f1f] selection:bg-[#faec1c] selection:text-[#211f1f]">
      {/* 3-Tier Global Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Page View Routing */}
      <main className="flex-1 pb-16 md:pb-0">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onCustomizeProduct={handleCustomizeProduct}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentTab === 'shop' && (
          <ShopPage
            initialCategory={categoryFilter}
            onCustomizeProduct={handleCustomizeProduct}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setCurrentTab('shop')}
            onAddToCart={handleAddToCart}
            onOpenStudioWithProduct={handleCustomizeProduct}
          />
        )}

        {currentTab === 'studio' && (
          <CustomizeStudioPage
            initialProduct={selectedProduct}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'corporate' && (
          <CorporateBulkPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'methods' && (
          <PrintingMethodsPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'track' && (
          <TrackOrderPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onNavigateToShop={() => {
          setCartOpen(false);
          setCurrentTab('shop');
        }}
      />

      {/* Global Search Dialog Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Thumb-friendly mobile sticky bottom bar */}
      <MobileStickyBar
        onOpenStudio={() => setCurrentTab('studio')}
        onOpenWhatsApp={handleOpenWhatsAppGeneral}
      />
    </div>
  );
}
