
/**
 * Adds a product to the cart. If the product already exists, it increments the quantity.
 * @param {Array} cart - The current cart array.
 * @param {Object} product - The product to add.
 * @returns {Array} - The updated cart array.
 */
export const addToCart = (cart, product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        // Product exists in cart, increment quantity
        return cart.map((item, index) =>
            index === existingProductIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    } else {
        // Product does not exist in cart, add with quantity 1
        return [...cart, { ...product, quantity: 1 }];
    }
};

/**
 * Removes a product from the cart by its index.
 * @param {Array} cart - The current cart array.
 * @param {number} index - The index of the product to remove.
 * @returns {Array} - The updated cart array.
 */
export const removeFromCart = (cart, index) => {
    return cart.filter((_, i) => i !== index);
};

/**
 * Decreases the quantity of a product in the cart. If quantity reaches 0, removes the product.
 * @param {Array} cart - The current cart array.
 * @param {number} index - The index of the product to decrease.
 * @returns {Array} - The updated cart array.
 */
export const decreaseQuantity = (cart, index) => {
    return cart.map((item, i) => {
        if (i === index) {
            if (item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            // If quantity is 1, remove the item
            return null;
        }
        return item;
    }).filter(item => item !== null);
};

/**
 * Calculates the total price of all items in the cart.
 * @param {Array} cart - The current cart array.
 * @returns {number} - The total price.
 */
export const calculateTotal = (cart = []) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};



/**
 * Clears the entire cart.
 * @returns {Array} - An empty cart array.
 */
export const clearCart = () => {
    return [];
};
