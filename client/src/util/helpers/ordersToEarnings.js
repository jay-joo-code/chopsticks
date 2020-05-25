const ordersToEarnings = (orders) => {
	const confirmStates = ['confirmed', 'refundRejected', 'cancelRejected', 'exchangeRejected']
	const monthlyConfirmedOrders = orders.filter((order) => confirmStates.includes(order.state));
	console.log('monthlyConfirmedOrders :>> ', monthlyConfirmedOrders);
	const accumulator = (acc = 0, order) => acc + order.cartObj.price;
	const taxRate = 0.24;
	return monthlyConfirmedOrders.reduce(accumulator, 0) * (1-taxRate);
}

export default ordersToEarnings