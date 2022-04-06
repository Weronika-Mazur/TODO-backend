declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      PORT: string;
      TOKEN_KEY: string;
    }
  }
  namespace Express {
    interface Request {
      user: string | jwt.JwtPayload;
    }
  }
}

export {};
