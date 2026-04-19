/**
 * Azure Blob Storage helpers for painting image overrides.
 * Set CONTENT_STORAGE_CONNECTION_STRING (or reuse AzureWebJobsStorage) in Function App settings.
 */
const { BlobServiceClient, PublicAccessType } = require("@azure/storage-blob");

const CONTAINER =
  process.env.CONTENT_STORAGE_CONTAINER || "ykj-gallery-content";
const MANIFEST_BLOB = "manifest/painting-images.json";

function getConnectionString() {
  return (
    process.env.CONTENT_STORAGE_CONNECTION_STRING ||
    process.env.AzureWebJobsStorage ||
    ""
  );
}

function getClients() {
  const conn = getConnectionString();
  if (!conn) return null;
  const service = BlobServiceClient.fromConnectionString(conn);
  const container = service.getContainerClient(CONTAINER);
  return { service, container };
}

async function ensureContainer(containerClient) {
  await containerClient.createIfNotExists({
    access: PublicAccessType.Blob,
  });
}

async function getManifest() {
  const clients = getClients();
  if (!clients) return {};
  const { container } = clients;
  const blob = container.getBlobClient(MANIFEST_BLOB);
  const exists = await blob.exists();
  if (!exists) return {};
  const buf = await blob.downloadToBuffer();
  try {
    return JSON.parse(buf.toString("utf8"));
  } catch {
    return {};
  }
}

async function saveManifest(manifest) {
  const clients = getClients();
  if (!clients) throw new Error("Storage not configured");
  const { container } = clients;
  await ensureContainer(container);
  const blob = container.getBlockBlobClient(MANIFEST_BLOB);
  const body = JSON.stringify(manifest, null, 2);
  await blob.upload(body, Buffer.byteLength(body), {
    blobHTTPHeaders: { blobContentType: "application/json" },
  });
}

/**
 * @param {string} paintingId
 * @param {Buffer} buffer
 * @param {string} contentType
 * @returns {Promise<string>} Public HTTPS URL of the blob
 */
async function uploadPaintingBlob(paintingId, buffer, contentType) {
  const clients = getClients();
  if (!clients) throw new Error("Storage not configured");
  const { container } = clients;
  await ensureContainer(container);

  const ext = contentType.includes("png") ? "png" : "jpg";
  const blobName = `paintings/${paintingId}.${ext}`;
  const blob = container.getBlockBlobClient(blobName);

  await blob.uploadData(buffer, {
    blobHTTPHeaders: {
      blobContentType: contentType || "image/jpeg",
    },
  });

  return blob.url;
}

module.exports = {
  getConnectionString,
  getManifest,
  saveManifest,
  uploadPaintingBlob,
};
