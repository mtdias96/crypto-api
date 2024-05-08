import 'dotenv/config';

export const env = {
  jwtSecret: process.env.JWT_SECRET!,
  apiKey: process.env.API_KEY,
  secretKey: process.env.SECRET_KEY!,
  streamUrl: process.env.STREAM_URL,
  bitcoin: process.env.SYMBOL,
  profitability: process.env.PROFITABILITY!
};

