/**
 * Example API: reads SWA auth context from x-ms-client-principal.
 * After you enable Microsoft Entra ID on the Static Web App, call GET /api/userinfo
 * while logged in to verify the pipeline.
 */
module.exports = async function (context, req) {
  const principalHeader = req.headers["x-ms-client-principal"];
  let principal = null;
  if (principalHeader) {
    try {
      const decoded = Buffer.from(principalHeader, "base64").toString("ascii");
      principal = JSON.parse(decoded);
    } catch {
      principal = { error: "invalid principal header" };
    }
  }

  context.res = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: {
      authenticated: !!(principal && principal.userRoles && principal.userRoles.length),
      userDetails: principal?.userDetails ?? null,
      userRoles: principal?.userRoles ?? [],
    },
  };
};
