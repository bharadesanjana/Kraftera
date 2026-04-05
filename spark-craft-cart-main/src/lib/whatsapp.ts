import { CartItem } from '@/lib/types';

export function generateWhatsAppMessage(
  items: CartItem[], 
  total: number, 
  customer?: { name: string; email: string; phone?: string; address?: string }
): string {
  let message = '🛍️ *NEW ORDER FROM KRAFTERA*\n';
  message += '--------------------------\n\n';
  
  if (customer) {
    message += '👤 *CUSTOMER DETAILS*\n';
    message += `• Name: ${customer.name}\n`;
    message += `• Email: ${customer.email}\n`;
    if (customer.phone) message += `• Phone: ${customer.phone}\n`;
    if (customer.address) message += `• Shipping Address: ${customer.address}\n\n`;
  }

  message += '💳 *PAYMENT METHOD*\n';
  message += '• Paid via UPI (Please Verify the Payment)\n\n';

  message += '📦 *ORDER DETAILS*\n';
  items.forEach((item, i) => {
    message += `${i + 1}. ${item.product.name}\n`;
    message += `   Qty: ${item.quantity} × ₹${item.product.price.toFixed(2)}\n`;
    message += `   Subtotal: ₹${(item.product.price * item.quantity).toFixed(2)}\n`;
  });

  message += '\n--------------------------\n';
  message += `💰 *TOTAL AMOUNT: ₹${total.toFixed(2)}*`;
  
  return message;
}

export function getWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
