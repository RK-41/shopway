/*
  08.11.

  Cart Utility
*/

export const addDecimals = (num) => {
	return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
	// Calculating Items Price
	state.itemsPrice = addDecimals(
		state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);

	// Calculating Shipping Price (If order is over ${Currency}100 then shipping is free, else ${Curency}10 for shipping)
	state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

	// Calculating Tax Price (15% tax)
	state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));

	// Calculating Total Price
	state.totalPrice = (
		Number(state.itemsPrice) +
		Number(state.shippingPrice) +
		Number(state.taxPrice)
	).toFixed(2);

	// Saving Calculated Price to the Local Storage
	localStorage.setItem('cart', JSON.stringify(state));

	return state;
};
