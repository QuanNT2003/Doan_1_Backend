const jwt = require("jsonwebtoken");

const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      payload,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2h" }
  );

  return access_token;
};

const genneralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      payload,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "365d" }
  );

  return refresh_token;
};

const refreshTokenService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
          return resolve({
            status: "ERROR",
            message: "Invalid authentication token",
          });
        }

        const { payload } = user;
        const access_token = await genneralAccessToken({
          adminId: payload.adminId,
          isAdmin: true,
        });

        resolve({
          status: "OK",
          message: "success",
          access_token,
        });
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
  refreshTokenService,
};
