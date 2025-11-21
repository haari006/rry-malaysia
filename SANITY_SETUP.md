# Sanity Setup and Data Migration Guide

## Step 1: Install tsx (TypeScript executor)
```bash
npm install -D tsx
```

## Step 2: Create .env.local file
Create a file named `.env.local` in the root directory with the following content:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=6pnhjydq
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-19
SANITY_API_TOKEN=skQpPYCMKwVSG6ct6pNbreq0ocon7NiGtM9Kui7ZG1GzPINPNaxOkaFRxHdrxVJCwcCm83bwFc9AYeZ6KtmQWi2uknvtAhfbJfgQtnpmLSn9x5n1fh0nu8PVlI68RGuqxWvivJC8gg3tfze0m8Ptgxpk66oqRp6AhPAO79TydyHIUtsLFoFn
```

**Important:** Replace `your-project-id` with your actual Sanity project ID.

## Step 3: Run the migration
```bash
npm run migrate
```

This will create the following documents in your Sanity dataset:
- 2 Service documents (Heavy Machinery Trading, Scrap Metal Trading)
- 1 Company Info document

## Step 4: Verify in Sanity Studio
1. Navigate to http://localhost:3000/studio
2. Check that the documents have been created successfully

## API Endpoint
An API endpoint has been created at `/api/sanity/create` for posting data to Sanity:

```typescript
POST /api/sanity/create
Content-Type: application/json

{
  "_type": "service",
  "title": "New Service",
  "slug": { "_type": "slug", "current": "new-service" },
  "description": "Service description",
  "category": "machinery"
}
```

## Files Created
1. `src/app/api/sanity/create/route.ts` - API route for creating documents
2. `scripts/migrate-to-sanity.ts` - Migration script
3. Updated `src/sanity/lib/client.ts` - Added writeClient with token
