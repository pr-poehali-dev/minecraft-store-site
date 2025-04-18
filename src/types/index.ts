export interface MinecraftItem {
  id: string;
  name: string;
  image: string;
  price: number;
  category: 'блоки' | 'инструменты' | 'оружие' | 'броня' | 'еда' | 'зелья' | 'редкости';
  description: string;
}

export interface CartItem extends MinecraftItem {
  quantity: number;
}
