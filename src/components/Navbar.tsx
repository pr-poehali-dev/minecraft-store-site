import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';

const Navbar = () => {
  const { cartItems, totalPrice, removeFromCart, updateQuantity } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const categories = [
    { name: 'Блоки', path: '/category/блоки' },
    { name: 'Инструменты', path: '/category/инструменты' },
    { name: 'Оружие', path: '/category/оружие' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-minecraft-green border-b-2 border-minecraft-black shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-white text-xl font-bold">Minecraft Маркет</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-minecraft-green text-white">
                    Категории
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      {categories.map((category) => (
                        <li key={category.path} className="row-span-1">
                          <NavigationMenuLink asChild>
                            <Link
                              to={category.path}
                              className="block p-2 hover:bg-accent rounded-md"
                            >
                              {category.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/shop" className="text-white hover:underline">
              Магазин
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative bg-transparent hover:bg-minecraft-green border-white text-white">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-minecraft-brown text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <div className="flex flex-col h-full">
                  <div className="py-4">
                    <h2 className="text-2xl font-bold">Корзина</h2>
                  </div>
                  
                  <div className="flex-1 overflow-auto">
                    {cartItems.length === 0 ? (
                      <p className="text-muted-foreground">Корзина пуста</p>
                    ) : (
                      <ul className="space-y-4">
                        {cartItems.map((item) => (
                          <li key={item.id} className="flex gap-4">
                            <div className="h-16 w-16 bg-muted flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <div className="flex justify-between items-center mt-1">
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                    disabled={item.quantity <= 1}
                                  >
                                    -
                                  </button>
                                  <span className="text-sm">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">{item.quantity * item.price} ₽</span>
                                  <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-destructive hover:text-destructive/90"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  <div className="py-4 border-t">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Итого:</span>
                      <span>{totalPrice} ₽</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        className="flex-1 border-minecraft-green text-minecraft-green hover:bg-minecraft-green hover:text-white"
                        asChild
                      >
                        <Link to="/cart">
                          Просмотр
                        </Link>
                      </Button>
                      <Button 
                        className="flex-1 bg-minecraft-green hover:bg-minecraft-green/90"
                        asChild
                      >
                        <Link to="/cart">
                          Оформить
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-transparent hover:bg-minecraft-green border-white text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link 
              to="/shop" 
              className="block py-2 text-white hover:bg-minecraft-green/30"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Магазин
            </Link>
            <Link 
              to="/cart" 
              className="block py-2 text-white hover:bg-minecraft-green/30"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Корзина
            </Link>
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="block py-2 text-white hover:bg-minecraft-green/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;