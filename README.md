# Overview

A Node.js service with two HTTP endpoints to ingest receipts and calculate point totals.

# Validation

retailer: required, `^[\w\s\-&]+$` 
purchaseDate: required, `YYYY-MM-DD` format
purchaseTime: required, `HH:MM` (24-hour) format
total: required, `^\d+\.\d{2}$` (two decimal places)
items: required, and:
   - shortDescription: `^[\w\s\-&]+$`
   - price: `^\d+\.\d{2}$` (two decimal places)

# Docker

Build and run with Docker:

```bash
docker build -t receipt-processor .
docker run -d --name rp -p 3000:3000 receipt-processor
```
