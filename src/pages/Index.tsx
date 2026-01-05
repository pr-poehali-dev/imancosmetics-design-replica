import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  volume?: string;
  sale?: boolean;
  salePrice?: number;
  colorShade?: string;
  description?: string;
  features?: string[];
  usage?: string;
}

interface ColorShade {
  id: string;
  name: string;
  code: string;
  hex: string;
  category: string;
  brand: string;
}

interface CartItem extends Product {
  quantity: number;
}

const colorShades: ColorShade[] = [
  { id: '1.0', name: 'Черный', code: '1.0', hex: '#1a1a1a', category: 'Натуральные', brand: 'BBcos' },
  { id: '2.0', name: 'Темно-коричневый', code: '2.0', hex: '#2d1f1a', category: 'Натуральные', brand: 'BBcos' },
  { id: '3.0', name: 'Темно-каштановый', code: '3.0', hex: '#3d2a1f', category: 'Натуральные', brand: 'BBcos' },
  { id: '4.0', name: 'Каштановый', code: '4.0', hex: '#5c3d2e', category: 'Натуральные', brand: 'BBcos' },
  { id: '5.0', name: 'Светло-каштановый', code: '5.0', hex: '#7a5547', category: 'Натуральные', brand: 'BBcos' },
  { id: '6.0', name: 'Темно-русый', code: '6.0', hex: '#8b6f5c', category: 'Натуральные', brand: 'BBcos' },
  { id: '7.0', name: 'Русый', code: '7.0', hex: '#a4866f', category: 'Натуральные', brand: 'BBcos' },
  { id: '8.0', name: 'Светло-русый', code: '8.0', hex: '#c3a892', category: 'Натуральные', brand: 'BBcos' },
  { id: '9.0', name: 'Очень светло-русый', code: '9.0', hex: '#dcc5ad', category: 'Натуральные', brand: 'BBcos' },
  { id: '10.0', name: 'Платиновый блонд', code: '10.0', hex: '#f0dfc8', category: 'Натуральные', brand: 'BBcos' },
  { id: '6.3', name: 'Темно-русый золотистый', code: '6.3', hex: '#a67c4f', category: 'Золотистые', brand: 'BBcos' },
  { id: '7.3', name: 'Русый золотистый', code: '7.3', hex: '#c8995e', category: 'Золотистые', brand: 'BBcos' },
  { id: '8.3', name: 'Светло-русый золотистый', code: '8.3', hex: '#d9b482', category: 'Золотистые', brand: 'BBcos' },
  { id: '9.3', name: 'Блонд золотистый', code: '9.3', hex: '#e8ca9f', category: 'Золотистые', brand: 'BBcos' },
  { id: '6.4', name: 'Темно-русый медный', code: '6.4', hex: '#9d5a3c', category: 'Медные', brand: 'BBcos' },
  { id: '7.4', name: 'Русый медный', code: '7.4', hex: '#b5704e', category: 'Медные', brand: 'BBcos' },
  { id: '8.4', name: 'Светло-русый медный', code: '8.4', hex: '#c88860', category: 'Медные', brand: 'BBcos' },
  { id: '6.5', name: 'Темно-русый махагон', code: '6.5', hex: '#7a3d3d', category: 'Красные', brand: 'BBcos' },
  { id: '7.5', name: 'Русый махагон', code: '7.5', hex: '#925454', category: 'Красные', brand: 'BBcos' },
  { id: '6.6', name: 'Темно-русый красный', code: '6.6', hex: '#8b3333', category: 'Красные', brand: 'BBcos' },
  { id: '7.6', name: 'Русый красный', code: '7.6', hex: '#a04747', category: 'Красные', brand: 'BBcos' },
  { id: '6.1', name: 'Темно-русый пепельный', code: '6.1', hex: '#6d6963', category: 'Пепельные', brand: 'BBcos' },
  { id: '7.1', name: 'Русый пепельный', code: '7.1', hex: '#857f77', category: 'Пепельные', brand: 'BBcos' },
  { id: '8.1', name: 'Светло-русый пепельный', code: '8.1', hex: '#a39d94', category: 'Пепельные', brand: 'BBcos' },
  { id: '9.1', name: 'Блонд пепельный', code: '9.1', hex: '#bdb8ae', category: 'Пепельные', brand: 'BBcos' }
];

const products: Product[] = [
  {
    id: 1,
    name: 'DROPURE Концентрированный пигмент',
    brand: 'BBcos',
    price: 1850,
    image: 'https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/655ad01c-2875-427b-b4f0-adba57c4f500.jpg',
    category: 'Окрашивание',
    volume: '100 мл',
    description: 'Концентрированные пигменты прямого действия для создания ярких и пастельных оттенков. Идеальны для техник балаяж, омбре и креативного окрашивания.',
    features: ['Не требует смешивания с оксидантом', 'Яркие насыщенные цвета', 'Можно смешивать между собой', 'Работает на любом уровне тона'],
    usage: 'Наносить на чистые влажные волосы. Время выдержки 20-30 минут. Смывать водой без шампуня.'
  },
  {
    id: 2,
    name: 'Innovation EVO Крем-краска',
    brand: 'BBcos',
    price: 420,
    image: 'https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/d2d44684-430d-443b-a33a-a596627b58f8.jpg',
    category: 'Окрашивание',
    volume: '100 мл',
    description: 'Профессиональная крем-краска нового поколения с системой защиты цвета. Обеспечивает 100% закрашивание седины и стойкий результат.',
    features: ['100% закрашивание седины', 'Стойкий результат до 8 недель', 'Мягкая кремовая текстура', 'Без аммиака'],
    usage: 'Смешать с оксидантом 1:1.5. Нанести на сухие волосы. Время выдержки 35-40 минут.'
  },
  {
    id: 3,
    name: 'White Meches Осветляющая пудра',
    brand: 'BBcos',
    price: 1290,
    sale: true,
    salePrice: 990,
    image: 'https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/98f15a3a-f43a-4998-b399-1c7e51f4e5fc.jpg',
    category: 'Осветление',
    volume: '500 г'
  },
  {
    id: 4,
    name: 'Green Care Essence Маска питательная',
    brand: 'BBcos',
    price: 2150,
    image: 'https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/d2d44684-430d-443b-a33a-a596627b58f8.jpg',
    category: 'Уход',
    volume: '250 мл'
  },
  {
    id: 5,
    name: 'PRODIVA Шампунь восстанавливающий',
    brand: 'PRODIVA',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/655ad01c-2875-427b-b4f0-adba57c4f500.jpg',
    category: 'Уход',
    volume: '300 мл'
  },
  {
    id: 6,
    name: 'Keratin Color Краска с кератином',
    brand: 'BBcos',
    price: 485,
    sale: true,
    salePrice: 399,
    image: 'https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/98f15a3a-f43a-4998-b399-1c7e51f4e5fc.jpg',
    category: 'Окрашивание',
    volume: '100 мл'
  },
  {
    id: 7,
    name: 'New.Fix Лак для волос сильной фиксации',
    brand: 'BBcos',
    price: 1250,
    image: 'https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/655ad01c-2875-427b-b4f0-adba57c4f500.jpg',
    category: 'Стайлинг',
    volume: '400 мл'
  },
  {
    id: 8,
    name: 'KristalE Масло для блеска волос',
    brand: 'BBcos',
    price: 1890,
    image: 'https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/d2d44684-430d-443b-a33a-a596627b58f8.jpg',
    category: 'Уход',
    volume: '125 мл'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColorCategory, setSelectedColorCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  const downloadPalette = () => {
    const paletteData = filteredColors.map(color => 
      `${color.code} - ${color.name} (${color.category})`
    ).join('\n');
    
    const blob = new Blob([`ПАЛИТРА ЦВЕТОВ BBcos Innovation EVO\n\n${paletteData}\n\nОфициальный дистрибьютор: IMAN Cosmetics`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bbcos-palette.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.sale && item.salePrice ? item.salePrice : item.price;
    return sum + price * item.quantity;
  }, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = ['all', 'Окрашивание', 'Осветление', 'Уход', 'Стайлинг'];
  const colorCategories = ['all', 'Натуральные', 'Золотистые', 'Медные', 'Красные', 'Пепельные'];

  const filteredProducts = products.filter(product => {
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesCategory && matchesSearch;
  });

  const filteredColors = colorShades.filter(color => {
    return selectedColorCategory === 'all' || color.category === selectedColorCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        <p>Скидка 10% на первый заказ при регистрации! Оптовые цены для профессионалов</p>
      </div>

      <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-8">
              <h1 className="text-3xl font-bold text-primary">
                IMAN COSMETICS
              </h1>
              <nav className="hidden lg:flex items-center gap-6">
                <button 
                  onClick={() => setActiveSection('home')}
                  className="text-sm hover:text-primary transition font-medium"
                >
                  Главная
                </button>
                <button 
                  onClick={() => setActiveSection('about')}
                  className="text-sm hover:text-primary transition font-medium"
                >
                  О компании
                </button>
                <button 
                  onClick={() => setActiveSection('reviews')}
                  className="text-sm hover:text-primary transition font-medium"
                >
                  Отзывы
                </button>
                <button 
                  onClick={() => setActiveSection('promotions')}
                  className="text-sm hover:text-primary transition font-medium"
                >
                  Акции
                </button>
                <button 
                  onClick={() => setActiveSection('training')}
                  className="text-sm hover:text-primary transition font-medium"
                >
                  Обучение
                </button>
                <button 
                  onClick={() => setActiveSection('palettes')}
                  className="text-sm hover:text-primary transition font-medium"
                >
                  Палитры
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="Search" size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="h-auto">
                  <SheetHeader>
                    <SheetTitle>Поиск товаров</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <Input
                      placeholder="Введите название товара..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        {cart.map(item => {
                          const displayPrice = item.sale && item.salePrice ? item.salePrice : item.price;
                          return (
                            <Card key={item.id}>
                              <CardContent className="flex gap-4 p-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1">
                                  <h3 className="font-semibold text-sm">{item.name}</h3>
                                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                                  <p className="text-sm font-medium mt-1">{displayPrice} ₽</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.id, -1)}>
                                      <Icon name="Minus" size={12} />
                                    </Button>
                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                    <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.id, 1)}>
                                      <Icon name="Plus" size={12} />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-7 w-7 ml-auto text-destructive" onClick={() => removeFromCart(item.id)}>
                                      <Icon name="Trash2" size={12} />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                        <div className="border-t pt-4">
                          <div className="flex justify-between text-lg font-bold mb-4">
                            <span>Итого:</span>
                            <span className="text-primary">{cartTotal} ₽</span>
                          </div>
                          <Button className="w-full">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Button variant="outline" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Регистрация
              </Button>
            </div>
          </div>

          <div className="border-t py-3">
            <div className="flex items-center gap-4 overflow-x-auto">
              <Button 
                variant={selectedBrand === null ? "default" : "ghost"} 
                size="sm"
                onClick={() => setSelectedBrand(null)}
              >
                Все товары
              </Button>
              <Button 
                variant={selectedBrand === 'BBcos' ? "default" : "ghost"} 
                size="sm"
                onClick={() => setSelectedBrand('BBcos')}
              >
                BBcos
              </Button>
              <Button 
                variant={selectedBrand === 'PRODIVA' ? "default" : "ghost"} 
                size="sm"
                onClick={() => setSelectedBrand('PRODIVA')}
              >
                PRODIVA
              </Button>
              <Button variant="ghost" size="sm">
                DESIGN ME
              </Button>
              <Button variant="ghost" size="sm">
                INSIGHT PROFESSIONAL
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive">
                <Icon name="Tag" size={14} className="mr-1" />
                Распродажа
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="animate-fade-in">
            <section className="mb-12 bg-card rounded-lg p-8 border">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                    Профессиональная косметика для волос
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Итальянский бренд BBcos и российская марка PRODIVA. 
                    Оптовые цены для парикмахеров, салонов красоты и учебных центров.
                  </p>
                  <div className="flex gap-4">
                    <Button size="lg">
                      Зарегистрироваться
                    </Button>
                    <Button size="lg" variant="outline">
                      Палитры цветов
                    </Button>
                  </div>
                </div>
                <div className="relative h-80 bg-muted rounded-lg overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/655ad01c-2875-427b-b4f0-adba57c4f500.jpg"
                    alt="Профессиональная косметика"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-4">Каталог товаров</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat === 'all' ? 'Все категории' : cat}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => {
                  const displayPrice = product.sale && product.salePrice ? product.salePrice : product.price;
                  return (
                    <Card 
                      key={product.id} 
                      className="group hover:shadow-lg transition-all duration-300 animate-scale-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.sale && (
                          <Badge className="absolute top-3 right-3 bg-destructive">
                            Скидка
                          </Badge>
                        )}
                        <Badge variant="outline" className="absolute top-3 left-3 bg-card/90 backdrop-blur">
                          {product.brand}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                        <h3 
                          className="font-semibold text-sm mb-2 line-clamp-2 min-h-[40px] cursor-pointer hover:text-primary transition"
                          onClick={() => openProductDetail(product)}
                        >
                          {product.name}
                        </h3>
                        {product.volume && (
                          <p className="text-xs text-muted-foreground mb-3">{product.volume}</p>
                        )}
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            {product.sale && product.salePrice ? (
                              <div>
                                <span className="text-lg font-bold text-primary">{product.salePrice} ₽</span>
                                <span className="text-sm text-muted-foreground line-through ml-2">{product.price} ₽</span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-primary">{product.price} ₽</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => addToCart(product)}
                            className="flex-1"
                            size="sm"
                          >
                            <Icon name="ShoppingCart" size={14} className="mr-2" />
                            В корзину
                          </Button>
                          <Button 
                            onClick={() => openProductDetail(product)}
                            variant="outline"
                            size="sm"
                          >
                            <Icon name="Eye" size={14} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            <section className="my-12 grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Truck" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Быстрая доставка</h3>
                  <p className="text-sm text-muted-foreground">
                    Доставка по России в течение 3-5 рабочих дней
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Award" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Оригинальная продукция</h3>
                  <p className="text-sm text-muted-foreground">
                    Прямые поставки от производителя с гарантией качества
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Users" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Обучение мастеров</h3>
                  <p className="text-sm text-muted-foreground">
                    Регулярные семинары и мастер-классы для профессионалов
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center">О компании</h2>
            <Card>
              <CardContent className="p-8 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  IMAN Cosmetics — официальный дистрибьютор профессиональной косметики для волос 
                  итальянского бренда BBcos и российской марки PRODIVA в городе Киров.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Мы работаем с профессионалами: парикмахерами, салонами красоты, учебными центрами, 
                  предоставляя оптовые цены и индивидуальные условия для каждого клиента.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Наша миссия — обеспечить российских мастеров лучшей профессиональной косметикой 
                  по доступным ценам с быстрой доставкой и полной технической поддержкой.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'reviews' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center">Отзывы профессионалов</h2>
            <div className="space-y-4">
              {[
                { name: 'Мария Петрова', salon: 'Салон "Красотка"', text: 'Работаем с BBcos уже 3 года. Отличное качество, клиенты довольны результатом. Краска не течет, хорошо ложится.' },
                { name: 'Алексей Смирнов', salon: 'Мастер-колорист', text: 'PRODIVA — отличная находка! Российское производство, доступная цена, результат как у профессиональных итальянских брендов.' },
                { name: 'Елена Васильева', salon: 'Студия "Элегант"', text: 'Сотрудничаем больше года. Быстрая доставка, всегда на связи, помогают с подбором оттенков. Рекомендую!' }
              ].map((review, index) => (
                <Card key={index} className="hover:shadow-lg transition">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">{review.text}</p>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.salon}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'promotions' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center">Акции и скидки</h2>
            <div className="space-y-6">
              <Card className="border-primary">
                <CardContent className="p-6">
                  <Badge className="mb-3">Новинка</Badge>
                  <h3 className="text-2xl font-bold mb-2">Скидка 10% на первый заказ</h3>
                  <p className="text-muted-foreground mb-4">
                    Зарегистрируйтесь на сайте и получите промокод на скидку 10% для первого заказа
                  </p>
                  <Button>Зарегистрироваться</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">Постоянная акция</Badge>
                  <h3 className="text-2xl font-bold mb-2">Оптовые цены от 10 000 ₽</h3>
                  <p className="text-muted-foreground">
                    Для заказов от 10 000 рублей действуют специальные оптовые цены. 
                    Чем больше заказ, тем выгоднее цена!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">Для салонов</Badge>
                  <h3 className="text-2xl font-bold mb-2">Индивидуальные условия для салонов</h3>
                  <p className="text-muted-foreground">
                    Постоянным партнерам — салонам красоты и учебным центрам — 
                    мы предлагаем индивидуальные условия сотрудничества
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'training' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center">Обучение и семинары</h2>
            <Card>
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3">Мастер-классы для профессионалов</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Мы регулярно проводим бесплатные семинары и мастер-классы по работе с продукцией BBcos и PRODIVA. 
                    Технологи брендов делятся секретами окрашивания, осветления и ухода за волосами.
                  </p>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-bold text-lg mb-3">Темы обучения:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-0.5" />
                      <span>Техники сложного окрашивания и тонирования</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-0.5" />
                      <span>Работа с концентрированными пигментами DROPURE</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-0.5" />
                      <span>Осветление волос без повреждения структуры</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-0.5" />
                      <span>Уход и восстановление после окрашивания</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t pt-6">
                  <p className="text-muted-foreground mb-4">
                    Для записи на ближайший семинар свяжитесь с нами по телефону или email
                  </p>
                  <Button size="lg">
                    Записаться на семинар
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'palettes' && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Палитры цветов BBcos</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Полная палитра оттенков профессиональной краски для волос
              </p>
              <Button onClick={downloadPalette} size="lg">
                <Icon name="Download" size={18} className="mr-2" />
                Скачать палитру
              </Button>
            </div>

            <div className="mb-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {colorCategories.map(cat => (
                  <Button
                    key={cat}
                    variant={selectedColorCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColorCategory(cat)}
                  >
                    {cat === 'all' ? 'Все оттенки' : cat}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredColors.map((color, index) => (
                <Card 
                  key={color.id} 
                  className="group hover:shadow-lg transition-all duration-300 animate-scale-in overflow-hidden"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div 
                    className="h-32 transition-transform duration-300 group-hover:scale-105" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <CardContent className="p-3">
                    <div className="text-center">
                      <p className="font-bold text-sm mb-1">{color.code}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{color.name}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {color.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">О палитре BBcos Innovation EVO</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Особенности:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-0.5" />
                        <span>100% закрашивание седины</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-0.5" />
                        <span>Стойкий насыщенный цвет</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-0.5" />
                        <span>Мягкая кремовая текстура</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-0.5" />
                        <span>Не течет при нанесении</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Применение:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Icon name="Droplet" size={16} className="text-primary mt-0.5" />
                        <span>Смешивание: 1:1.5 с оксидантом</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Clock" size={16} className="text-primary mt-0.5" />
                        <span>Время выдержки: 35-40 минут</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Thermometer" size={16} className="text-primary mt-0.5" />
                        <span>Температура: комнатная</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Sheet open={isProductDetailOpen} onOpenChange={setIsProductDetailOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedProduct && (
            <>
              <SheetHeader>
                <SheetTitle className="text-2xl">{selectedProduct.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProduct.sale && (
                    <Badge className="absolute top-4 right-4 bg-destructive text-lg px-3 py-1">
                      Скидка
                    </Badge>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Badge variant="outline" className="mb-2">{selectedProduct.brand}</Badge>
                      <p className="text-sm text-muted-foreground">{selectedProduct.category}</p>
                      {selectedProduct.volume && (
                        <p className="text-sm text-muted-foreground mt-1">Объем: {selectedProduct.volume}</p>
                      )}
                    </div>
                    <div className="text-right">
                      {selectedProduct.sale && selectedProduct.salePrice ? (
                        <div>
                          <span className="text-3xl font-bold text-primary block">{selectedProduct.salePrice} ₽</span>
                          <span className="text-lg text-muted-foreground line-through">{selectedProduct.price} ₽</span>
                        </div>
                      ) : (
                        <span className="text-3xl font-bold text-primary">{selectedProduct.price} ₽</span>
                      )}
                    </div>
                  </div>

                  {selectedProduct.description && (
                    <div className="mb-6">
                      <h3 className="font-bold text-lg mb-2">Описание</h3>
                      <p className="text-muted-foreground leading-relaxed">{selectedProduct.description}</p>
                    </div>
                  )}

                  {selectedProduct.features && selectedProduct.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-bold text-lg mb-3">Особенности</h3>
                      <ul className="space-y-2">
                        {selectedProduct.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProduct.usage && (
                    <div className="mb-6 p-4 bg-muted rounded-lg">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <Icon name="Info" size={20} className="text-primary" />
                        Применение
                      </h3>
                      <p className="text-muted-foreground">{selectedProduct.usage}</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => {
                        addToCart(selectedProduct);
                        setIsProductDetailOpen(false);
                      }}
                      size="lg"
                      className="flex-1"
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      Добавить в корзину
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg"
                    >
                      <Icon name="Heart" size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">IMAN COSMETICS</h3>
              <p className="text-sm text-muted-foreground">
                Профессиональная косметика для волос. Официальный дистрибьютор BBcos и PRODIVA в Кирове.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">BBcos</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">PRODIVA</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">DESIGN ME</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">Распродажа</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">О компании</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">Доставка и оплата</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">Обучение</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (8332) 123-456</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@imancosmetics.ru</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>г. Киров</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 IMAN Cosmetics. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <Icon name="Youtube" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}