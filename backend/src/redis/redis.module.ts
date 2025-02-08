import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import * as redisStore from 'cache-manager-redis-store'; // ✅ Correct package

@Module({
  imports: [
    CacheModule.register({
      store: redisStore, // ✅ Use `cache-manager-redis-store`
      host: 'localhost', // Your Redis server
      port: 6379, // Default Redis port
    }),
  ],
  controllers: [RedisController],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
