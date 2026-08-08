// Simple in-memory sliding window rate limiter for contact submissions
const rateMap = new Map<string, number[]>();

export function checkRateLimit(ip: string, limit = 5, windowMs = 60 * 1000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = rateMap.get(ip) || [];
  const validTimestamps = timestamps.filter((ts) => now - ts < windowMs);

  if (validTimestamps.length >= limit) {
    return { allowed: false, remaining: 0 };
  }

  validTimestamps.push(now);
  rateMap.set(ip, validTimestamps);

  return { allowed: true, remaining: limit - validTimestamps.length };
}
