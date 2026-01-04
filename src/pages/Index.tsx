import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: number;
  date: string;
  total: number;
  status: string;
  items: CartItem[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'Бархатная помада',
    price: 1299,
    image: 'https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/655ad01c-2875-427b-b4f0-adba57c4f500.jpg',
    category: 'Макияж',
    description: 'Стойкая матовая помада с бархатной текстурой'
  },
  {
    id: 2,
    name: 'Увлажняющая сыворотка',
    price: 2499,
    image: 'https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/d2d44684-430d-443b-a33a-a596627b58f8.jpg',
    category: 'Уход',
    description: 'Интенсивное увлажнение с гиалуроновой кислотой'
  },
  {
    id: 3,
    name: 'Палетка теней',
    price: 1899,
    image: 'https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/98f15a3a-f43a-4998-b399-1c7e51f4e5fc.jpg',
    category: 'Макияж',
    description: '12 оттенков для создания любого образа'
  },
  {
    id: 4,
    name: 'Крем для лица',
    price: 1799,
    image: 'https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/d2d44684-430d-443b-a33a-a596627b58f8.jpg',
    category: 'Уход',
    description: 'Питательный крем с витаминами'
  },
  {
    id: 5,
    name: 'Тушь для ресниц',
    price: 999,
    image: 'https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/655ad01c-2875-427b-b4f0-adba57c4f500.jpg',
    category: 'Макияж',
    description: 'Объем и длина без комочков'
  },
  {
    id: 6,
    name: 'Маска для лица',
    price: 1299,
    image: 'https://cdn.poehali.dev/projects/60b31cd1-0092-4c8c-8229-37090acd3fe8/files/98f15a3a-f43a-4998-b399-1c7e51f4e5fc.jpg',
    category: 'Уход',
    description: 'Очищающая маска с глиной'
  }
];

const reviews = [
  { id: 1, name: 'Анна К.', rating: 5, text: 'Потрясающая помада! Держится весь день, не сушит губы', product: 'Бархатная помада' },
  { id: 2, name: 'Мария С.', rating: 5, text: 'Сыворотка творит чудеса! Кожа стала гладкой и увлажненной', product: 'Увлажняющая сыворотка' },
  { id: 3, name: 'Елена В.', rating: 5, text: 'Палетка теней просто огонь! Цвета яркие, хорошо растушевываются', product: 'Палетка теней' }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('catalog');
  const [orders] = useState<Order[]>([
    {
      id: 1001,
      date: '15.12.2023',
      total: 3598,
      status: 'Доставлен',
      items: [
        { ...products[0], quantity: 1 },
        { ...products[1], quantity: 1 }
      ]
    },
    {
      id: 1002,
      date: '28.11.2023',
      total: 1899,
      status: 'Доставлен',
      items: [{ ...products[2], quantity: 1 }]
    }
  ]);

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

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                IMAN Cosmetics
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => setActiveTab('catalog')} className="text-gray-700 hover:text-purple-600 transition font-medium">
                Каталог
              </button>
              <button onClick={() => setActiveTab('reviews')} className="text-gray-700 hover:text-purple-600 transition font-medium">
                Отзывы
              </button>
              <button onClick={() => setActiveTab('delivery')} className="text-gray-700 hover:text-purple-600 transition font-medium">
                Доставка
              </button>
              <button onClick={() => setActiveTab('about')} className="text-gray-700 hover:text-purple-600 transition font-medium">
                О бренде
              </button>
              <button onClick={() => setActiveTab('contacts')} className="text-gray-700 hover:text-purple-600 transition font-medium">
                Контакты
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Icon name="ShoppingBag" size={20} />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-pink-500 to-purple-600">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg animate-slide-in-right">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <Icon name="ShoppingBag" size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        {cart.map(item => (
                          <Card key={item.id}>
                            <CardContent className="flex gap-4 p-4">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                              <div className="flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-sm text-gray-500">{item.price} ₽</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, -1)}>
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, 1)}>
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button size="icon" variant="ghost" className="h-8 w-8 ml-auto text-red-500" onClick={() => removeFromCart(item.id)}>
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between text-lg font-bold mb-4">
                            <span>Итого:</span>
                            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                              {cartTotal} ₽
                            </span>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Icon name="User" size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent className="animate-slide-in-right">
                  <SheetHeader>
                    <SheetTitle>Профиль</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8">
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white text-xl">
                          АК
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">Анна Кузнецова</h3>
                        <p className="text-sm text-gray-500">anna@example.com</p>
                      </div>
                    </div>

                    <Tabs defaultValue="orders" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="orders">Заказы</TabsTrigger>
                        <TabsTrigger value="addresses">Адреса</TabsTrigger>
                      </TabsList>
                      <TabsContent value="orders" className="space-y-4 mt-4">
                        {orders.map(order => (
                          <Card key={order.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <p className="font-semibold">Заказ #{order.id}</p>
                                  <p className="text-sm text-gray-500">{order.date}</p>
                                </div>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  {order.status}
                                </Badge>
                              </div>
                              <div className="space-y-2 mt-3">
                                {order.items.map(item => (
                                  <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600">{item.name} x{item.quantity}</span>
                                    <span className="font-medium">{item.price * item.quantity} ₽</span>
                                  </div>
                                ))}
                              </div>
                              <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
                                <span>Итого:</span>
                                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                  {order.total} ₽
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </TabsContent>
                      <TabsContent value="addresses" className="space-y-4 mt-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-semibold mb-1">Домашний адрес</p>
                                <p className="text-sm text-gray-600">г. Москва, ул. Пушкина, д. 10, кв. 25</p>
                                <p className="text-sm text-gray-500 mt-1">+7 (999) 123-45-67</p>
                              </div>
                              <Badge className="bg-purple-100 text-purple-700">Основной</Badge>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div>
                              <p className="font-semibold mb-1">Рабочий адрес</p>
                              <p className="text-sm text-gray-600">г. Москва, Тверская ул., д. 15, офис 301</p>
                              <p className="text-sm text-gray-500 mt-1">+7 (999) 123-45-67</p>
                            </div>
                          </CardContent>
                        </Card>
                        <Button variant="outline" className="w-full">
                          <Icon name="Plus" size={16} className="mr-2" />
                          Добавить адрес
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'catalog' && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Новая коллекция
              </h2>
              <p className="text-gray-600 text-lg">Откройте для себя мир профессиональной косметики</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-white/90 text-purple-600 backdrop-blur">
                      {product.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                        {product.price} ₽
                      </span>
                      <Button 
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Отзывы покупателей
            </h2>
            <div className="grid gap-6">
              {reviews.map(review => (
                <Card key={review.id} className="hover:shadow-lg transition">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{review.name}</h3>
                          <div className="flex gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <Badge variant="outline" className="mb-3 text-purple-600 border-purple-200">
                          {review.product}
                        </Badge>
                        <p className="text-gray-600">{review.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Доставка и оплата
            </h2>
            <div className="grid gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon name="Truck" size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">Доставка курьером</h3>
                      <p className="text-gray-600 mb-2">По Москве — 300 ₽, бесплатно от 3000 ₽</p>
                      <p className="text-sm text-gray-500">Доставка в течение 1-2 дней</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">Пункты выдачи</h3>
                      <p className="text-gray-600 mb-2">Более 500 пунктов по всей России</p>
                      <p className="text-sm text-gray-500">Бесплатно от 2000 ₽</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon name="CreditCard" size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">Способы оплаты</h3>
                      <p className="text-gray-600">Банковские карты, СБП, наличные при получении</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              О бренде IMAN
            </h2>
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    IMAN Cosmetics — это современный бренд профессиональной косметики, созданный для тех, 
                    кто ценит качество и инновации. Мы создаем продукты, которые помогают подчеркнуть 
                    вашу естественную красоту и уверенность.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Наша миссия — делать профессиональную косметику доступной каждому. Мы используем 
                    только проверенные ингредиенты и следуем современным трендам в индустрии красоты.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                        100+
                      </div>
                      <p className="text-gray-600">Товаров в каталоге</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                        50K+
                      </div>
                      <p className="text-gray-600">Довольных клиентов</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                        5 лет
                      </div>
                      <p className="text-gray-600">На рынке</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Контакты
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Телефон</h3>
                      <p className="text-gray-600">+7 (495) 123-45-67</p>
                      <p className="text-sm text-gray-500 mt-1">Пн-Вс: 9:00 - 21:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Email</h3>
                      <p className="text-gray-600">info@imancosmetics.ru</p>
                      <p className="text-sm text-gray-500 mt-1">Ответим в течение часа</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Адрес шоурума</h3>
                      <p className="text-gray-600">г. Москва, Тверская ул., д. 25</p>
                      <p className="text-sm text-gray-500 mt-1">Пн-Пт: 10:00 - 20:00, Сб-Вс: 11:00 - 19:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-purple-100 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                <Icon name="Sparkles" size={16} className="text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                IMAN Cosmetics
              </span>
            </div>
            <p className="text-gray-600 text-sm">© 2024 IMAN Cosmetics. Все права защищены.</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Twitter" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
