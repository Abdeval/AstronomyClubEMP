import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class EventService {
  constructor(private config: ConfigService) { }

  // todo: all the events (custom) crud operations 
}
