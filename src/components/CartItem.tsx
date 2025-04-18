import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex items-center border-b py-4">
      <div className="h-16 w-16 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden bg-muted">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover" 
        />
      </div>
      
      <div className="ml-4 flex-1">
        <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.price} ₽ за шт.</p>
        
        <div className="mt-2 sm:mt-4 flex items-center justify-between">
          <div className="flex items-center border rounded-sm">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <span className="w-8 text-center">{item.quantity}</span>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-semibold">{itemTotal} ₽</span>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
              onClick={() => removeFromCart(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
