const adminNav = [{
  name: '상품',
  path: '/shop/admin/items'
},{
  name: '주문',
  path: '/shop/admin/orders'
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

const categoryNav = [{
    name: '홈데코',
    path: '/browse?category=living'
  }, {
    name: '주방 / 욕실',
    path: '/browse?category=kitchen'
  },
  {
    name: '가구',
    path: '/browse?category=furniture'
  },
  {
    name: '테크',
    path: '/browse?category=tech'
  },
  {
    name: 'One & Only',
    path: '/browse?category=limited'
  },
]

export { adminNav, profileNav, categoryNav };
