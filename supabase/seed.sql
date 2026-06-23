insert into public.products (name, category, description, price, discount_percentage, stock, image_url, is_active)
values
  (
    'Deterjen Laundry Premium',
    'Deterjen',
    'Deterjen cair konsentrat untuk hasil cucian bersih, wangi, dan hemat takaran.',
    50000,
    10,
    28,
    '/products/deterjen-premium.png',
    true
  ),
  (
    'Parfum Laundry Fresh Blue',
    'Parfum Laundry',
    'Parfum laundry aroma segar tahan lama untuk kebutuhan rumah tangga dan usaha.',
    65000,
    0,
    17,
    '/products/parfum-laundry.png',
    true
  ),
  (
    'Pewangi Anti Bau',
    'Pewangi',
    'Pewangi pakaian dengan formula anti bau untuk kain harian, kos, hotel, dan laundry.',
    45000,
    8,
    8,
    '/products/pewangi-anti-bau.png',
    true
  ),
  (
    'Softener Kain Lembut',
    'Softener',
    'Pelembut kain untuk menjaga tekstur pakaian tetap nyaman dan mudah disetrika.',
    42000,
    0,
    0,
    '/products/softener.png',
    true
  ),
  (
    'Pemutih Pakaian',
    'Pemutih',
    'Pemutih untuk noda membandel pada kain putih dengan penggunaan terukur.',
    38000,
    5,
    12,
    '/products/pemutih.png',
    true
  ),
  (
    'Plastik Kemasan Laundry',
    'Plastik Kemasan',
    'Plastik bening rapi untuk packing cucian kiloan, satuan, dan laundry hotel.',
    30000,
    0,
    40,
    '/products/plastik-kemasan.png',
    true
  ),
  (
    'Spot Remover',
    'Spot Remover',
    'Cairan bantu untuk noda khusus sebelum proses pencucian utama.',
    55000,
    12,
    6,
    '/products/spot-remover.png',
    true
  ),
  (
    'Starter Kit Usaha Laundry',
    'Peralatan Laundry',
    'Paket produk pendukung untuk usaha laundry baru, kos, homestay, dan kebutuhan bulk.',
    175000,
    15,
    5,
    '/products/starter-kit.png',
    true
  )
on conflict (name) do update
set category = excluded.category,
    description = excluded.description,
    price = excluded.price,
    discount_percentage = excluded.discount_percentage,
    stock = excluded.stock,
    image_url = excluded.image_url,
    is_active = excluded.is_active,
    updated_at = now();
