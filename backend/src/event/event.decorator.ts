import { SetMetadata } from '@nestjs/common';

export const Event = (...args: string[]) => SetMetadata('event', args);
