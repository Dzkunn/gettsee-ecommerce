'use strict';

window.menuData = {
  promo: {
    title: 'Promo Bundling',
    subtitle: 'Combo deals for coffee, donuts, and snacks.',
    image: 'assets/bundling.png',
    description: 'Special combo deals for coffee and donuts.',
    items: [
      { name: 'Coffee + Donuts Combo', desc: 'Pairing drink dan donut pilihan.', price: '38K', image: 'assets/bundling.png' },
      { name: 'Coffee Milk Bundle', desc: 'Bundling coffee milk signature.', price: '50K', image: 'assets/bundling1.png' },
      { name: 'Donuts Party Box', desc: 'Paket donuts untuk sharing.', price: '65K', image: 'assets/food/crop-donuts.jpg' }
    ]
  },
  coffee: {
    title: 'Coffee Milk',
    subtitle: 'Signature milk coffee menu.',
    image: 'assets/cinnamon-wall-crash.png',
    description: 'Milk coffee signature, creamy, and sweet.',
    items: [
      { name: 'F1', desc: 'Milk, Coffee & Palm Sugar', price: '29K', image: 'assets/f1-salted-speed.png' },
      { name: 'Turbo', desc: 'Milk, Coffee & Ginger With Cloud Cinnamon', price: '26K', image: 'assets/cinnamon-wall-crash.png' },
      { name: 'Anti Selip', desc: 'Coffee with Bubblegum Milk', price: '28K', image: 'assets/coffe_milk.png' },
      { name: 'Salted Speed', desc: 'Milk, Coffee & Salted Caramel', price: '28K', image: 'assets/f1-salted-speed.png' },
      { name: 'Butterscratch', desc: 'Milk, Coffee & Butterscotch', price: '25K', image: 'assets/coffe_milk.png' },
      { name: 'Nusantara Green', desc: 'Creamy Bold Coffee with Pandan Syrup', price: '25K', image: 'assets/dirty-latte.png' },
      { name: 'Berry Bloom', desc: 'Creamy Coffee with Strawberry Hint', price: '25K', image: 'assets/cappucino.png' },
      { name: 'Monaco Macchiato', desc: 'Milk, Coffee, Vanilla & Salted Cloud', price: '28K', image: 'assets/coffe_milk.png' },
      { name: 'Wall Crash Crumble', desc: 'Milk, Coffee & Regal Crumble', price: '29K', image: 'assets/cinnamon-wall-crash.png' },
      { name: 'Cinnamon Sroll Coffee', desc: 'Milk, Coffee, Strawberry Syrup & Cinnamon', price: '23K', image: 'assets/cinnamon-wall-crash.png' }
    ]
  },
  espresso: {
    title: 'Espresso Based',
    subtitle: 'Classic espresso and specialty coffee drinks.',
    image: 'assets/cappucino.png',
    description: 'Latte, cappuccino, americano, and more.',
    items: [
      { name: 'Piccolo', desc: 'Single shot ristretto with silky milk', price: '29K', image: 'assets/cappucino.png' },
      { name: 'Dirty Latte', desc: 'Cold milk topped with hot espresso', price: '25K', image: 'assets/dirty-latte.png' },
      { name: 'Americano', desc: 'Espresso topped with hot/cold water', price: '22K', image: 'assets/cappucino.png' },
      { name: 'Barista Breakfast', desc: 'Double espresso & cappuccino combo', price: '33K', image: 'assets/dirty-latte.png' },
      { name: 'Latte', desc: 'Smooth espresso with steamed fresh milk', price: '25K', image: 'assets/cappucino.png' },
      { name: 'Cappuccino', desc: 'Rich espresso with creamy milk foam', price: '25K', image: 'assets/cappucino.png' },
      { name: 'Magic', desc: 'Double ristretto with velvety flat milk', price: '29K', image: 'assets/cappucino.png' }
    ]
  },
  top1: {
    title: 'Top 1 Series',
    subtitle: 'Premium house selections and top picks.',
    image: 'assets/dirty-latte.png',
    description: 'Premium house selections and top picks.',
    items: [
      { name: 'Mandalika', desc: 'Floral Coffee Base Blueberry', price: '28K', image: 'assets/dirty-latte.png' },
      { name: 'Ducatea', desc: 'Base Tea Floral Blueberry Hint Jasmine', price: '28K', image: 'assets/f1-salted-speed.png' },
      { name: 'Matcha Marquez', desc: 'Matcha with Strawberry Cloud', price: '28K', image: 'assets/f1-salted-speed.png' }
    ]
  },
  coldbrew: {
    title: 'Cold Brew',
    subtitle: 'Refreshing cold brew steeped for 16 hours.',
    image: 'assets/dirty-latte.png',
    description: 'Cold brew with fresh fruit character.',
    items: [
      { name: 'Petronas Redbull', desc: 'Coldbrew & Strawberry', price: '27K', image: 'assets/dirty-latte.png' },
      { name: 'Jungle Lap', desc: 'Coldbrew & Apple Juice', price: '27K', image: 'assets/dirty-latte.png' }
    ]
  },
  freshed: {
    title: 'Freshed',
    subtitle: 'Fizzy drinks, mocktails, and fresh tea blends.',
    image: 'assets/f1-salted-speed.png',
    description: 'Fresh tea, soda, lychee, berry, and lemon.',
    items: [
      { name: 'Ginger GP', desc: 'Ginger with Lemon and Soda', price: '25K', image: 'assets/f1-salted-speed.png' },
      { name: 'Red Line', desc: 'Strawberry with Sparkling Water', price: '23K', image: 'assets/f1-salted-speed.png' },
      { name: 'Freshcada', desc: 'Sparkling citrus refresher', price: '30K', image: 'assets/f1-salted-speed.png' },
      { name: 'Lychee Tea', desc: 'Tea & Lychee Syrup with fruit bits', price: '22K', image: 'assets/f1-salted-speed.png' },
      { name: 'Berry Tea', desc: 'Tea & Mixed Berry Syrup', price: '25K', image: 'assets/f1-salted-speed.png' },
      { name: 'Bella Farfalla', desc: 'Tea, Strawberry Syrup & Lemon Juice', price: '25K', image: 'assets/f1-salted-speed.png' }
    ]
  },
  noncoffee: {
    title: 'Non Coffee',
    subtitle: 'Creamy crafted non-coffee favorites.',
    image: 'assets/f1-salted-speed.png',
    description: 'Matcha, chocolate, taro, and red velvet.',
    items: [
      { name: 'Taro', desc: 'Creamy fragrant taro milk', price: '25K', image: 'assets/coffe_milk.png' },
      { name: 'Chocolate', desc: 'Rich Belgian style dark chocolate', price: '25K', image: 'assets/cappucino.png' },
      { name: 'Matcha', desc: 'Pure Japanese green tea latte', price: '25K', image: 'assets/f1-salted-speed.png' },
      { name: 'Red Velvet', desc: 'Velvety smooth cocoa milk', price: '25K', image: 'assets/cinnamon-wall-crash.png' }
    ]
  },
  donuts: {
    title: 'Donuts',
    subtitle: 'Freshly baked classic and artisan specialty donuts.',
    image: 'assets/food/crop-donuts.jpg',
    description: 'Classic and special topping donuts.',
    items: [
      { name: 'Glaze', desc: 'Classic sweet glaze donut', price: '13K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Strawberry', desc: 'Classic strawberry jam glaze', price: '13K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Tiramisu', desc: 'Classic tiramisu cream swirl', price: '13K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Vanilla', desc: 'Classic vanilla bean frosting', price: '13K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Chocolate', desc: 'Classic rich cocoa frosting', price: '13K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Banana Milky', desc: 'Special banana milk glaze', price: '15K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Mango', desc: 'Special tropical mango drizzle', price: '15K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Matcha Crumb', desc: 'Special matcha icing with crumbles', price: '15K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Strawberry Cheese', desc: 'Special strawberry cheese crumble', price: '15K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Cappuccino', desc: 'Special coffee cream topping', price: '15K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Red Velvet Crumb', desc: 'Special red velvet with crumbs', price: '15K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Caramel Berry', desc: 'Special salted caramel & berries', price: '15K', image: 'assets/food/crop-donuts.jpg' },
      { name: 'Caramel Glass', desc: 'Special brittle caramel glaze', price: '15K', image: 'assets/food/crop-donuts.jpg' }
    ]
  },
  platter: {
    title: 'Platter',
    subtitle: 'Sharing platters with sausages, fries, and dips.',
    image: 'assets/food/crop-platter.jpg',
    description: 'Mix platter, Gettsee platter, and loaded beef.',
    items: [
      { name: 'Mix Platter', desc: 'Fries, sausages & nuggets', price: '25K', image: 'assets/food/crop-platter.jpg' },
      { name: 'Gettsee Platter', desc: 'Signature complete platter', price: '30K', image: 'assets/food/crop-platter.jpg' },
      { name: 'Loaded Beef', desc: 'Crispy fries with beef bolognaise', price: '20K', image: 'assets/food/crop-platter.jpg' }
    ]
  },
  wings: {
    title: 'Wings',
    subtitle: 'Crispy chicken wings with bold savory sauces.',
    image: 'assets/food/crop-wings.jpg',
    description: 'Nashville wings and BBQ wings.',
    items: [
      { name: 'Nashville Wings', desc: 'Spicy hot Nashville style chicken wings', price: '22K', image: 'assets/food/crop-wings.jpg' },
      { name: 'BBQ Wings', desc: 'Smoky sweet barbecue chicken wings', price: '22K', image: 'assets/food/crop-wings.jpg' }
    ]
  },
  pasta: {
    title: 'Pasta',
    subtitle: 'Italian style al dente pasta creations.',
    image: 'assets/food/crop-pasta.jpg',
    description: 'Aglio olio, carbonara, and meatball.',
    items: [
      { name: 'Aglio Olio', desc: 'Garlic, olive oil, chilli flakes & herbs', price: '22K', image: 'assets/food/crop-pasta.jpg' },
      { name: 'Carbonara', desc: 'Creamy sauce with smoked beef & parmesan', price: '26K', image: 'assets/food/crop-pasta.jpg' },
      { name: 'Spaghetti Meatball', desc: 'Rich marinara sauce with beef meatballs', price: '26K', image: 'assets/food/crop-pasta.jpg' }
    ]
  },
  steak: {
    title: 'Steak',
    subtitle: 'Grilled chicken steak served with french fries & salad.',
    image: 'assets/food/crop-steak.jpg',
    description: 'Chicken steak and grilled chicken.',
    items: [
      { name: 'Chicken Steak', desc: 'Crispy golden chicken steak with brown sauce', price: '24K', image: 'assets/food/crop-steak.jpg' },
      { name: 'Grilled Chicken', desc: 'Char-grilled chicken breast with mushroom sauce', price: '28K', image: 'assets/food/crop-steak.jpg' }
    ]
  },
  burger: {
    title: 'Burger',
    subtitle: 'Juicy brioche burgers with seasoned patties.',
    image: 'assets/food/crop-burger.jpg',
    description: 'Beef burger and Nashville burger.',
    items: [
      { name: 'Beef Burger', desc: 'Juicy beef patty, cheddar cheese & special sauce', price: '35K', image: 'assets/food/crop-burger.jpg' },
      { name: 'Nashville Burger', desc: 'Crispy spicy Nashville chicken with coleslaw', price: '26K', image: 'assets/food/crop-burger.jpg' }
    ]
  },
  bagel: {
    title: 'Bagel',
    subtitle: 'Artisan toasted bagels with savory fillings.',
    image: 'assets/food/crop-bagel.jpg',
    description: 'Beef bagel and Nashville bagel.',
    items: [
      { name: 'Beef Bagel', desc: 'Smoked beef, sunny egg & melted cheese bagel', price: '32K', image: 'assets/food/crop-bagel.jpg' },
      { name: 'Nashville Bagel', desc: 'Spicy chicken fillet & cream cheese bagel', price: '25K', image: 'assets/food/crop-bagel.jpg' }
    ]
  },
  rice: {
    title: 'Rice Section',
    subtitle: 'Hearty Indonesian rice bowls with rich spices.',
    image: 'assets/food/crop-rice.jpg',
    description: 'Beef rendang and beef bulgogi rice.',
    items: [
      { name: 'Beef Rendang', desc: 'Tender slow cooked beef in aromatic coconut rendang', price: '30K', image: 'assets/food/crop-rice.jpg' },
      { name: 'Beef Bulgogi', desc: 'Sweet savory Korean style sliced beef on warm rice', price: '30K', image: 'assets/food/crop-rice.jpg' }
    ]
  }
};

window.menuOrder = [
  'promo', 'coffee', 'espresso', 'top1', 'coldbrew', 'freshed', 'noncoffee',
  'donuts', 'platter', 'wings', 'pasta', 'steak', 'burger', 'bagel', 'rice'
];

window.findMenuCategory = function findMenuCategory(categoryId) {
  if (window.menuData[categoryId]) return categoryId;
  return 'coffee';
};
