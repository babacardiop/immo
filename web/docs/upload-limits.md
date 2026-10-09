# Upload limits (S01)

## App limits (code)

| Asset | Max size | MIME |
| --- | --- | --- |
| Listing photo | **8 Mo** | `image/jpeg`, `image/png`, `image/webp` |
| Mandat PDF (vault) | **15 Mo** | `application/pdf` |

Enforced in `uploadListingPhotosAction` / `uploadMandatePdfAction`.

## Render Web Service

- Default request body for Node services is typically **large enough** for the limits above on paid tiers.
- On **Free** instances, prefer uploading **1–3 photos at a time** (≤ 8 Mo each) to avoid memory spikes (`Buffer` in process).
- If uploads return **413** / connection reset: raise plan or split files; no custom nginx body limit on Render for standard Web Services.
- Timeout: keep total request under ~30s — compress images before upload when possible.

## R2

- No practical object-size issue for S01 photo sizes.
- Public bucket CORS must allow staging + localhost origins (see S01 infra).
