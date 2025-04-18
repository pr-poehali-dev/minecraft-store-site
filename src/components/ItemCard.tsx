import { MinecraftItem } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ItemCardProps {
  item: MinecraftItem;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden border-2 border-minecraft-brown h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-square bg-muted">
          <img
            src={item.image}
            alt={item.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 right-2 bg-minecraft-brown text-white text-sm px-2 py-1">
            {item.price} ₽
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg">{item.name}</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
        <div className="mt-2">
          <span className="inline-block bg-muted text-xs px-2 py-1 rounded">
            {item.category}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => addToCart(item)}
          className="w-full bg-minecraft-green hover:bg-minecraft-green/90"
        >
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
