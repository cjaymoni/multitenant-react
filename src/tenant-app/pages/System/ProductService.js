export class ProductService {

    getProductsWithOrdersSmall() {
		return fetch('/data/sample.json').then(res => res.json()).then(d => d.data);
	}
}