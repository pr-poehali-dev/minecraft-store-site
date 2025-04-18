import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";

const CartPage = () => {
  const { cartItems } = useCart();
  const isEmpty = cartItems.length === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>
      
      {isEmpty ? (
        <div className="text-center py-12">
          <div className="bg-muted inline-flex rounded-full p-6 mb-6">
            <ShoppingBasket className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Ваша корзина пуста</h2>
          <p className="text-muted-foreground mb-6">
            Добавьте товары из нашего магазина, чтобы продолжить
          </p>
          <Button asChild className="bg-minecraft-green hover:bg-minecraft-green/90">
            <Link to="/shop">
              Перейти в магазин
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
                <Link to="/shop" className="flex items-center gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Вернуться в магазин
                </Link>
              </Button>
            </div>
            
            <div className="space-y-0 divide-y border-t">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
