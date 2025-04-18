import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { items } from '@/data/items';
import ItemCard from '@/components/ItemCard';

const HomePage = () => {
  // Отображаем только три случайных популярных предмета на главной
  const featuredItems = [...items]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero секция */}
      <section className="relative bg-minecraft-brown py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Minecraft Маркет
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Лучшие предметы для вашего Minecraft-мира. Выбирайте из сотен предметов и получайте их прямо в игре!
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-minecraft-green hover:bg-minecraft-green/90 px-8"
          >
            <Link to="/shop">
              Начать покупки
            </Link>
          </Button>
        </div>
      </section>

      {/* Популярные предметы */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Популярные предметы</h2>
          <Link to="/shop" className="text-minecraft-green hover:underline">
            Смотреть все
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Категории */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Категории</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CategoryCard 
              title="Блоки" 
              description="Строительные материалы для ваших проектов" 
              path="/category/блоки" 
            />
            <CategoryCard 
              title="Инструменты" 
              description="Кирки, лопаты и другие полезные предметы" 
              path="/category/инструменты" 
            />
            <CategoryCard 
              title="Оружие" 
              description="Мечи, луки и другое оружие для защиты" 
              path="/category/оружие" 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  description: string;
  path: string;
}

const CategoryCard = ({ title, description, path }: CategoryCardProps) => (
  <div className="bg-card border-2 border-minecraft-brown p-6 rounded-sm hover:shadow-md transition-shadow">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground mb-4">{description}</p>
    <Button 
      asChild
      variant="outline" 
      className="w-full border-minecraft-green text-minecraft-green hover:bg-minecraft-green hover:text-white"
    >
      <Link to={path}>
        Открыть
      </Link>
    </Button>
  </div>
);

export default HomePage;
