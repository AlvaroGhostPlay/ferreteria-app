import { Component } from '@angular/core';
import { JobRole } from '../../entitie/job-role';
import { WidgetId } from '../../entitie/widget-id';
import { QuickActionsComponent } from './quick-actions/quick-actions.component';

@Component({
  selector: 'dashboard',
  imports: [
    QuickActionsComponent
  ],
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent {
  jobRole: JobRole = 'ADMIN';
}
