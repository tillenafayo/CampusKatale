const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: "https://hopeful-grackle-12.clerk.accounts.dev/.well-known/jwks.json",
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const authHeader = ctx.request.header.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ctx.unauthorized("Missing or invalid token");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(
          token,
          getKey,
          {
            audience: "https://hopeful-grackle-12.clerk.accounts.dev",
            issuer: "https://hopeful-grackle-12.clerk.accounts.dev",
            algorithms: ["RS256"],
          },
          (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
          }
        );
      });

      ctx.state.user = decoded;
      await next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      return ctx.unauthorized("Invalid token");
    }
  };
};
