const ordersToEarnings = (orders) => {
	const confirmStates = ['confirmed', 'refundRejected', 'cancelRejected', 'exchangeRejected']
	const monthlyConfirmedOrders = orders.filter((order) => confirmStates.includes(order.state));
	console.log('monthlyConfirmedOrders :>> ', monthlyConfirmedOrders);
	const accumulator = (acc = 0, order) => acc + order.cartObj.price;
	return monthlyConfirmedOrders.reduce(accumulator, 0);
}

export default ordersToEarnings