export function validateReceipt(req, res, next) {
    const errors = [];
    const { retailer, purchaseDate, purchaseTime, total, items } = req.body;
    
    if(typeof retailer !== 'string' || !/^[\w\s\-&]+$/.test(retailer.trim())) {
        errors.push(
            '`retailer` is required, must be non-empty, and match /^[\\w\\s\\-&]+$/.'
        );
    }

    if(typeof purchaseDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(purchaseDate)) {
        errors.push(
            '`purchaseDate` is required and must be in YYYY-MM-DD format.'
        );
    }

    if(typeof purchaseTime !== 'string' || !/^\d{2}:\d{2}$/.test(purchaseTime)) {
        errors.push('`purchaseTime` is required and must be in HH:MM format.');
    }

    if(typeof total !== 'string' || !/^\d+\.\d{2}$/.test(total)) {
        errors.push(
            '`total` is required and must be a string matching /^\\d+\\.\\d{2}$/.'
        );
    }

    if(!Array.isArray(items)) {
        errors.push('`items` is required and must be an array.');
    } else if(items.length < 1) {
        errors.push('`items` must contain at least one element.');
    } else{
        items.forEach((item, i) => {
            if(typeof item.shortDescription !== 'string' || !/^[\w\s\-]+$/.test(item.shortDescription.trim())) {
                errors.push(
                    `items[${i}].shortDescription is required and must match /^[\\w\\s\\-]+$/.`
                );
            }
            if(typeof item.price !== 'string' || !/^\d+\.\d{2}$/.test(item.price)) {
                errors.push(
                    `items[${i}].price is required and must match /^\\d+\\.\\d{2}$/.`
                );
            }
        });
    }

    if (errors.length) {
        return res.status(400).json({ errors });
    }

    next();
}
