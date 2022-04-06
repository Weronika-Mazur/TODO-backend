import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authorization =
    req.headers["x-access-token"] ||
    req.headers.authorization ||
    req.body.token;

  if (!authorization) {
    return res
      .status(403)
      .send({ error: "A token is required for authentication" });
  }

  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7, authorization.length)
    : authorization;

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ error: "Invalid Token" });
  }
  return next();
};

export { auth };
