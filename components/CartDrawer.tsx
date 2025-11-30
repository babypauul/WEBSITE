import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingCart, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './Button';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate API process
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        setCheckoutSuccess(false);
        clearCart();
        toggleCart();
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 z-[80] shadow-[0_0_50px_rgba(225,6,0,0.1)] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-brand-red/5">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-brand-red" />
                <h2 className="text-xl font-black uppercase tracking-wider text-white">Your Cart</h2>
                <span className="bg-white/10 text-xs px-2 py-1 rounded-full text-brand-gray font-mono">{cart.length}</span>
              </div>
              <button onClick={toggleCart} className="text-brand-gray hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingCart size={48} className="mb-4 text-brand-gray" />
                  <p className="text-brand-gray uppercase tracking-widest text-sm">Cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-brand-red/30 transition-colors group"
                  >
                    <img src={item.cover} alt={item.title} className="w-16 h-16 object-cover rounded bg-black" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold truncate uppercase tracking-tight">{item.title}</h4>
                      <p className="text-xs text-brand-red font-bold tracking-widest uppercase mb-1">{item.licenseType} LICENSE</p>
                      <p className="text-brand-gray text-xs font-mono">${item.price.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-brand-gray hover:text-brand-red transition-colors p-2 self-center opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#050505] space-y-4">
                 <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-brand-gray uppercase tracking-widest text-sm">Total</span>
                    <span className="text-white font-mono">${cartTotal.toFixed(2)}</span>
                 </div>
                 
                 <div className="text-[10px] text-brand-gray/60 text-center leading-tight">
                    By clicking checkout you agree to our <Link to="/terms" onClick={toggleCart} className="underline hover:text-brand-red">Terms</Link> & <Link to="/licensing" onClick={toggleCart} className="underline hover:text-brand-red">Licensing</Link>.
                 </div>

                 <Button 
                    variant="primary" 
                    onClick={handleCheckout}
                    disabled={isCheckingOut || checkoutSuccess}
                    className="w-full py-4 !text-sm !tracking-widest relative overflow-hidden"
                 >
                    {isCheckingOut ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : checkoutSuccess ? (
                      <span className="flex items-center justify-center text-green-400 gap-2"><CheckCircle size={18} /> Success</span>
                    ) : (
                      <span className="flex items-center justify-center gap-2"><Lock size={16} /> Secure Checkout</span>
                    )}
                 </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};