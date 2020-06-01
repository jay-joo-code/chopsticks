import tempCat from 'src/util/hooks/categories';

const adminNav = [{
  name: '상품',
  path: '/shop/admin/items'
},{
  name: '주문',
  path: '/shop/admin/orders'
},{
  name: '매출 / 정산',
  path: '/shop/admin/transactions'
},{
  name: '설정',
  path: '/shop/admin/settings'
}]

const profileNav = [{
    name: '프로필',
    path: '/profile/details',
  },
  {
    name: '주문내역',
    path: '/profile/orders',
  },
];

const categoryNav = tempCat.map((cat) => ({
  name: cat.name,
  path: `/browse?category=${cat.name}`
}))

export { adminNav, profileNav, categoryNav };
