const Product = require('../models/Product');

/**
 * Search products by a free text query. If search is falsy, returns empty array.
 * Matches against multiple title locales (en, ua, ru).
 */
const searchProducts = async (search) => {
	if (!search) return [];

	const q = search.trim();
	if (!q) return [];

	const products = await Product.find({
		$or: [
			{ 'title.en': { $regex: q, $options: 'i' } },
			{ 'title.ua': { $regex: q, $options: 'i' } },
			{ 'title.ru': { $regex: q, $options: 'i' } }
		]
	}).limit(20);

	return products;
};

module.exports = {
	searchProducts,
};
