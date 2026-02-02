import { Component, Input } from '@angular/core';
import { JobRole } from '../../../entitie/job-role';

@Component({
  selector: 'quick-actions',
  imports: [],
  templateUrl: './quick-actions.component.html'
})
export class QuickActionsComponent {

  @Input() jobRole: JobRole | "" = "";

}
