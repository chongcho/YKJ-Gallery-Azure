const { getManifest, getConnectionString } = require("../lib/storage");

module.exports = async function (context, req) {
  if (req.method !== "GET") {
    context.res = { status: 405, body: { error: "Method not allowed" } };
    return;
  }

  if (!getConnectionString()) {
    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: {},
    };
    return;
  }

  try {
    const manifest = await getManifest();
    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: manifest,
    };
  } catch (e) {
    context.log.error(e);
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: { error: "Failed to read manifest" },
    };
  }
};
