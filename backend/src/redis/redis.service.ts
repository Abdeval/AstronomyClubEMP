import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  // ✅ Default TTL (e.g., 3600 seconds = 1 hour)
  async setValue(key: string, value: any, ttl: number = 3600) {
    await this.cacheManager.set(key, value, ttl);
  }

  async getValue(key: string) {
    return await this.cacheManager.get(key);
  }

  async deleteValue(key: string) {
    await this.cacheManager.del(key);
  }
}
