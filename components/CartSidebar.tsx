import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  // THE MAGIC CHECKOUT FUNCTION
  const handleCheckout = () => {
    // Format the number (remove '+' and spaces)
    const phoneNumber = "923167059804"; 
    
    // Build the WhatsApp message
    let message = `*✨ New Order from Cafe Erised ✨*\n\n`;
    message += `*Order Details:*\n`;
    
    cart.forEach((item) => {
      message += `▪️ ${item.quantity}x ${item.name} (Rs ${item.price * item.quantity})\n`;
    });
    
    message += `\n*Total Amount: Rs ${cartTotal}*\n\n`;
    message += `I would like to place this order, please!`;

    // Encode the message so it works in a URL (turns spaces into %20, etc.)
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Close the sidebar
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="font-serif text-2xl text-navy flex items-center gap-3">
                <ShoppingBag className="text-gold" />
                Your Order
              </h2>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-navy transition-colors p-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="font-sans tracking-widest uppercase text-sm">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-cream p-4 rounded-xl border border-slate-100">
                    <div className="flex-1 pr-4">
                      <h3 className="font-serif text-navy font-bold text-lg leading-tight mb-1">{item.name}</h3>
                      <p className="text-gold font-bold">Rs {item.price}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-slate-400 hover:text-navy"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold text-navy">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-slate-400 hover:text-navy"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 p-2 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 bg-cream border-t border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500 uppercase tracking-widest text-sm font-bold">Subtotal</span>
                  <span className="font-serif text-2xl text-navy font-bold">Rs {cartTotal}</span>
                </div>
                
                {/* CHECKOUT BUTTON WITH EVENT LISTENER */}
                <button 
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-3 bg-navy text-white py-4 rounded-xl uppercase tracking-widest text-sm font-bold transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-600/30"
                >
                  <Send size={18} />
                  Checkout via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;