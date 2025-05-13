//In memory Data store.
const receipts = new Map();

export function saveReceipt(id, data) {
	receipts.set(id, data);
}

export function getReceipt(id) {
	return receipts.get(id);
}
