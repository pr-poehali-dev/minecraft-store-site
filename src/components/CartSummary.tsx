import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

const CartSummary = () => {
  const { totalPrice, clearCart } = useCart();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  const handleCheckout = () => {
    setShowSuccessDialog(true);
  };

  const completeCheckout = () => {
    clearCart();
    setShowSuccessDialog(false);
  };

  return (
    <>
      <Card className="border-2 border-minecraft-brown">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Итого</h3>
          
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Товары</span>
              <span>{totalPrice} ₽</span>
            </div>
            <div className="flex justify-between">
              <span>Доставка</span>
              <span>0 ₽</span>
            </div>
          </div>
          
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Итого к оплате</span>
            <span>{totalPrice} ₽</span>
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 flex flex-col gap-3">
          <Button 
            onClick={handleCheckout} 
            className="w-full bg-minecraft-green hover:bg-minecraft-green/90"
            disabled={totalPrice === 0}
          >
            Оформить заказ
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => setShowConfirmDialog(true)}
            className="w-full"
            disabled={totalPrice === 0}
          >
            Очистить корзину
          </Button>
        </CardFooter>
      </Card>

      {/* Диалог подтверждения очистки корзины */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Очистить корзину?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить все товары из корзины? Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={clearCart}>
              Очистить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Диалог успешного оформления */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2 text-minecraft-green">
              <AlertTriangle className="h-5 w-5" />
              <AlertDialogTitle>Заказ оформлен!</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              Ваш заказ успешно оформлен. Предметы будут доставлены в ваш игровой инвентарь в ближайшее время.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-minecraft-green hover:bg-minecraft-green/90" onClick={completeCheckout}>
              Понятно
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CartSummary;
