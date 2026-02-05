import { Component } from '@angular/core';
import { SharingDataServiceService } from '../../../../../services/sharing-data-service.service';
  type Person = {
    id: number;
  };
@Component({
  selector: 'cliente-crud',
  imports: [],
  templateUrl: './cliente-crud.component.html'
})
export class ClienteCrudComponent {

  person: Person = { id: 2 };
  constructor(private sharingDataService: SharingDataServiceService) { }


  ngOnInit() {
    this.sharingDataService.ClienteCreateventEmitter.subscribe((data: any) => {
      this.person = data;

    });
  }
}

