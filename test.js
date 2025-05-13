import fs from 'fs/promises';

const BASE = 'http://localhost:3000';

async function runTest(file, expected) {
	const payload = JSON.parse(await fs.readFile(file, 'utf-8'));

	// 1) POST to process
	const resp1 = await fetch(`${BASE}/receipts/process`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	const { id } = await resp1.json();

	// 2) GET points
	const resp2 = await fetch(`${BASE}/receipts/${id}/points`);
	const { points } = await resp2.json();

	const res = points === expected? 'Passed!': `Failed: (got ${points}, expected ${expected})`;
	console.log(`${file} --> ${res}`);
}

async function main() {
	await runTest('examples/target.json', 28);
	await runTest('examples/mm-corner-market.json', 109);
	await runTest('examples/morning-receipt.json', 15);
	await runTest('examples/simple-receipt.json', 31);
}

main().catch(console.error);
