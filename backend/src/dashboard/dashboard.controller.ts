import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private dashboardService: DashboardService) {}

    @Get('activeGroup')
    getActiveGroupInfo() {
        return this.dashboardService.getActiveGroupInfo();
    }

    @Get('members')
    getTotalNumberOfMembers() {
        return this.dashboardService.getTotalNumberOfMembers();
    }

    @Get('latestArticles')
    getLatestAddedArticles() {
        return this.dashboardService.getLatestAddedArticles();
    }
}
