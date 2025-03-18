import { SetMetadata } from '@nestjs/common';

export const Article = (...args: string[]) => SetMetadata('article', args);
