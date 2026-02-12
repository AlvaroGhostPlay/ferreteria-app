import { Component } from '@angular/core';
import { SharingDataServiceService } from '../../../../services/sharing-data-service.service';
import { ActivatedRoute } from '@angular/router';
  type Person = {
    id: number;
  };
@Component({
  selector: 'cliente-crud',
  imports: [],
  templateUrl: './cliente-crud.component.html'
})
export class ClienteCrudComponent {

  person!: Person ;
  constructor(private sharingDataService: SharingDataServiceService,
    private route :ActivatedRoute 
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      // modo edición
      this.person = { id };
      console.log('Editando cliente con ID:', id);
    } else {
      // modo creación
      this.person = { id: 0 };
      console.log('Creando cliente');
    }
    console.log(this.person.id)
  }

  view(id: string) {

  }
}

