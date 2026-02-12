import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { SharingDataServiceService } from '../../../services/sharing-data-service.service';
import { PersonService } from '../../../services/person.service';
import { Person } from '../../../entitie/person';
import { PaginatorComponent } from '../../paginator/paginator.component';

@Component({
  selector: 'app-clientes',
  imports: [RouterLink, PaginatorComponent],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {

  paginator!: any;
  url:string = '/auth/ventas/clientes/page';

  person!: Person;

  clientes: Person[] = []

  constructor(
    private sharingDataService: SharingDataServiceService,
    private router: Router,
    private service:PersonService,
    private route :ActivatedRoute 
  ){}

ngOnInit() {
  this.route.paramMap.subscribe(pm => {
    const page = pm.get('page') ?? '0';

    this.service.getClients(page).subscribe({
      next: (res: any) => {
        this.clientes = res.content;
        this.paginator = {
          totalPages: res.totalPages,
          number: res.number, // mejor esto
        };
      },
      error: (err: any) => console.log(err)
    });
  });
}

deleteClient(id: string){
    this.clientes = [...this.clientes.filter(c => c.personId!== id)];
}
view(id: string) {
this.service.getClient(id).subscribe({
  next: (res: Person) => {
    console.log(res);
  },
  error: (err: any) => console.log(err)
  });
}
}
