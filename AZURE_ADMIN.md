# Azure-only admin & content (no Supabase)

You can run **authentication and APIs entirely on Azure**:

| Piece | Azure service |
|--------|----------------|
| Sign-in | **Microsoft Entra ID** (Azure AD) via **Azure Static Web Apps** built-in auth |
| HTTP APIs | **Azure Functions** in the `api/` folder (deployed with the same Static Web App) |
| Content files / JSON | **Azure Blob Storage** or **Azure Cosmos DB** (or Table Storage)—all first-party Azure |

This repo includes a minimal **Functions** endpoint (`GET /api/userinfo`) so you can confirm auth headers after Entra ID is enabled.

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

## 3. Protect admin routes (optional)

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

Adjust paths so public pages stay anonymous-only as needed. Test after Entra ID is live.

## 4. Verify the API + auth

After deployment, sign in, then open:

`https://<your-site>.azurestaticapps.net/api/userinfo`

You should see JSON with your identity when the `x-ms-client-principal` header is present.

## 5. Full “edit website content in the browser” (next steps)

That requires:

1. **Storage** — e.g. Blob containers for JSON or images, with connection string / managed identity in **Function App** settings (the API app behind SWA).
2. **Functions** — authenticated routes that read/write storage (check `x-ms-client-principal` or roles before writes).
3. **Frontend** — admin UI that calls `/api/...` instead of only static files.

All of that stays on Azure; there is no requirement for Supabase or another vendor.

## CI/CD

The GitHub workflow deploys `out/` (Next static export) and `api/` (Functions) together via `api_location: "api"`.
