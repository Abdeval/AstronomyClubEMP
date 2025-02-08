import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Post('set')
  async setValue(@Body() body: { key: string; value: any; ttl?: number }) {
    const ttl = body.ttl ?? 3600; // Default TTL to 1 hour if not provided
    await this.redisService.setValue(body.key, body.value, ttl);
    return { message: 'Value set successfully' };
  }

  @Get('get/:key')
  async getValue(@Param('key') key: string) {
    const value = await this.redisService.getValue(key);
    return { key, value };
  }

  @Delete('delete/:key')
  async deleteValue(@Param('key') key: string) {
    await this.redisService.deleteValue(key);
    return { message: 'Value deleted successfully' };
  }
}
