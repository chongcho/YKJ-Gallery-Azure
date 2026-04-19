const {
  getManifest,
  saveManifest,
  uploadPaintingBlob,
  getConnectionString,
} = require("../lib/storage");

const MAX_BYTES = 8 * 1024 * 1024;

function parsePrincipal(req) {
  const raw = req.headers["x-ms-client-principal"];
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, "base64").toString("ascii"));
  } catch {
    return null;
  }
}

function isAuthenticated(principal) {
  if (!principal) return false;
  return (
    Array.isArray(principal.userRoles) &&
    principal.userRoles.includes("authenticated")
  );
}

function parseBody(req) {
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return req.body || null;
}

module.exports = async function (context, req) {
  const principal = parsePrincipal(req);
  if (!isAuthenticated(principal)) {
    context.res = {
      status: 401,
      headers: { "Content-Type": "application/json" },
      body: { error: "Sign in required" },
    };
    return;
  }

  if (!getConnectionString()) {
    context.res = {
      status: 503,
      headers: { "Content-Type": "application/json" },
      body: {
        error:
          "Storage not configured. Set CONTENT_STORAGE_CONNECTION_STRING on the Function App.",
      },
    };
    return;
  }

  const body = parseBody(req);
  if (!body || !body.paintingId || !body.imageBase64) {
    context.res = {
      status: 400,
      headers: { "Content-Type": "application/json" },
      body: { error: "Expected JSON: { paintingId, imageBase64, contentType? }" },
    };
    return;
  }

  const paintingId = String(body.paintingId).trim();
  if (!/^[a-z0-9-]+$/.test(paintingId)) {
    context.res = {
      status: 400,
      headers: { "Content-Type": "application/json" },
      body: { error: "Invalid paintingId" },
    };
    return;
  }

  const contentType = body.contentType || "image/jpeg";
  if (!/^image\/(jpeg|jpg|png|webp|gif)$/i.test(contentType)) {
    context.res = {
      status: 400,
      headers: { "Content-Type": "application/json" },
      body: { error: "Unsupported image type" },
    };
    return;
  }

  let buffer;
  try {
    buffer = Buffer.from(body.imageBase64, "base64");
  } catch {
    context.res = {
      status: 400,
      headers: { "Content-Type": "application/json" },
      body: { error: "Invalid base64" },
    };
    return;
  }

  if (buffer.length > MAX_BYTES) {
    context.res = {
      status: 413,
      headers: { "Content-Type": "application/json" },
      body: { error: "Image too large (max 8 MB)" },
    };
    return;
  }

  try {
    const url = await uploadPaintingBlob(paintingId, buffer, contentType);
    const manifest = await getManifest();
    manifest[paintingId] = url;
    await saveManifest(manifest);

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: { url, paintingId },
    };
  } catch (e) {
    context.log.error(e);
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: { error: e.message || "Upload failed" },
    };
  }
};
