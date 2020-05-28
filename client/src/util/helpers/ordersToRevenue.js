const ordersToRevenue = (orders) => {
	const excludedStates = ['canceled', 'refunded'];
	const revenueOrders = orders.filter((order) => !excludedStates.includes(order.state) && !order.hideToBuyer);
    return [revenueOrders.reduce((acc, cur) => acc + Number(cur.cartObj.price), 0), revenueOrders.length];
}

export default ordersToRevenue;
