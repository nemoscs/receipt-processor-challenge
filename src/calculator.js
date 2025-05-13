import { isAlphanumeric } from './utils.js';

export function calculatePoints(r) {
	let points = 0;

	//One point for every alphanumeric character in the retailer name.
	points += [...r.retailer].filter(isAlphanumeric).length;

	//50 points if the total is a round dollar amount with no cents.
	//25 points if the total is a multiple of 0.25.
	const total = parseFloat(r.total);
	if(Number.isInteger(total)) 
		points += 50;
	if(total % 0.25 === 0) 
		points += 25;

	//5 points for every two items on the receipt.
	points += Math.floor(r.items.length / 2) * 5;
	r.items.forEach(item => {
		/*
		If the trimmed length of the item description is a multiple of 3, 
		multiply the price by 0.2 and round up to the nearest integer. 
		The result is the number of points earned.
		*/
		const descLen = item.shortDescription.trim().length;
		if (descLen % 3 === 0) {
			points += Math.ceil(parseFloat(item.price) * 0.2);
		}
	});

	//6 points if the day in the purchase date is odd.
	const [year, month, day] = r.purchaseDate.split('-').map(Number);
	if(day % 2 === 1) 
		points += 6;

	//10 points if the time of purchase is after 2:00pm and before 4:00pm.
	const [hour, minute] = r.purchaseTime.split(':').map(Number);
	if(hour >= 14 && hour < 16) 
		points += 10;

	return points;
}
