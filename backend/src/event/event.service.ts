import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class EventService {
  constructor(private config: ConfigService) { }

  async getEventsFromApi() {
    const API_ID = process.env.ASTRO_API_ID;
    const API_SECRET = process.env.ASTRO_API_SECRET;

    const getAuthHeader = () => {
      const credentials = Buffer.from(`${API_ID}:${API_SECRET}`).toString("base64")
      return `Basic ${credentials}`
    }

    try {
     
    } catch (error) {
      console.error("Astronomy API error:", error.response?.data || error.message)
    }
  }
}
