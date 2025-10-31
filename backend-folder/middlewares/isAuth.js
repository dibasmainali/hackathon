import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const cookieToken = req.cookies?.token;
  const authHeader = req.headers?.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : undefined;

  const token = cookieToken || bearerToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication token missing",
    });
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }

    const decoded = jwt.verify(token, secret);

    req.user = {
      id: decoded.id,
      ...(decoded.email ? { email: decoded.email } : {}),
    };

    return next();
  } catch (error) {
    console.error("Error in verifyToken:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};

