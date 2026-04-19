# Azure-only admin & content (no Supabase)

You can run **authentication and APIs entirely on Azure**:

| Piece | Azure service |
|--------|----------------|
| Sign-in | **Microsoft Entra ID** (Azure AD) via **Azure Static Web Apps** built-in auth |
| HTTP APIs | **Azure Functions** in the `api/` folder (deployed with the same Static Web App) |
| Uploaded painting images + manifest | **Azure Blob Storage** |

## 1. Enable Microsoft Entra ID on your Static Web App

1. Azure Portal → your **Static Web App** → **Authentication**.
2. Add identity provider → **Microsoft** (Entra ID).
3. Follow the wizard to register an app in Entra ID (or link an existing registration).
4. Save. Users in your tenant (or guests, depending on settings) can sign in.

## 2. Sign-in URL (already on the Login page)

Static Web Apps exposes:

- `/.auth/login/aad` — redirect users here to sign in with Microsoft  
- `/.auth/logout` — sign out  
- `/.auth/me` — current user JSON (optional for debugging)

The **Login** page links to `/.auth/login/aad`. That route exists only on Azure after step 1—not when running `next dev` locally.

## 3. Blob storage for admin painting uploads

Signed-in users can upload images from the painting modal. The API stores files in a container and keeps a JSON manifest.

### Create a storage account (once)

1. Azure Portal → **Storage accounts** → **Create** (standard, LRS is fine).
2. After creation: **Security + networking** → allow access from your Static Web App / Functions as needed (default often works with connection string).

### Get a connection string

Storage account → **Access keys** → copy **Connection string** (key1).

### Configure the linked Function App

Your Static Web App has an **API** (Functions) backend. In Portal:

1. Open the **Function App** linked to this Static Web App (or SWA → **API** / **Linked resources**).
2. **Configuration** → **Application settings** → **New application setting**:
   - **Name:** `CONTENT_STORAGE_CONNECTION_STRING`
   - **Value:** the storage connection string from above  
3. Optional: **Name:** `CONTENT_STORAGE_CONTAINER` — default is `ykj-gallery-content` if omitted.
4. **Save** (restart may run automatically).

Without `CONTENT_STORAGE_CONNECTION_STRING`, `GET /api/painting-images` returns `{}` and uploads return **503**.

The first upload creates the container with **public blob read** so image URLs work in `<img>` tags.

### APIs

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/painting-images` | JSON map: `paintingId` → public blob URL |
| POST | `/api/upload-painting-image` | Body: `{ paintingId, imageBase64, contentType }` — requires signed-in user (`authenticated` role) |

## 4. Protect admin routes (optional)

In `public/staticwebapp.config.json`, you can require authentication for paths (after auth works):

```json
{
  "routes": [
    {
      "route": "/admin/login",
      "allowedRoles": ["anonymous", "authenticated"]
    },
    {
      "route": "/admin/*",
      "allowedRoles": ["authenticated"]
    }
  ]
}
```

Adjust paths so public pages stay anonymous-only as needed.

## 5. Verify the API + auth

After deployment, sign in, then open:

`https://<your-site>.azurestaticapps.net/api/userinfo`

You should see JSON with your identity when authenticated.

## CI/CD

The GitHub workflow runs `npm ci` in `api/`, builds the Next app to `out/`, and deploys both `out/` and `api/` via `api_location: "api"`.
