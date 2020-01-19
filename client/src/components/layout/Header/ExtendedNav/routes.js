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
    name: '홈&리빙',
    path: '/browse?category=living'
  }, {
    name: '주방',
    path: '/browse?category=kitchen'
  },
  {
    name: '패션&악세서리',
    path: '/browse?category=fashion'
  },
  {
    name: '테크',
    path: '/browse?category=tech'
  },
  {
    name: 'Limited',
    path: '/browse?category=limited'
  },
]

export { adminNav, profileNav, categoryNav };
