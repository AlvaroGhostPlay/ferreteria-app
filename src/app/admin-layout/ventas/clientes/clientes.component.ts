import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { SharingDataServiceService, Mode } from '../../../services/sharing-data-service.service';
import { PersonService } from '../../../services/person.service';
import { Person } from '../../../entitie/person';
import { PaginatorComponent } from '../../paginator/paginator.component';

@Component({
  selector: 'app-clientes',
  imports: [ PaginatorComponent],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {

  paginator: any = { totalPages: 0, number: 0 };
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
        console.log(res);
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
  this.sharingDataService.emitUpdateClientInfo({ id, mode: 'view' });
  this.router.navigate(['/auth/ventas/clientes/info']);
}

update(id: string) {
  this.sharingDataService.emitUpdateClientInfo({ id, mode: 'edit' });
  this.router.navigate(['/auth/ventas/clientes/edit']);
}

create(id: string) {
  this.sharingDataService.emitUpdateClientInfo({ id, mode: 'create' });
  this.router.navigate(['/auth/ventas/clientes/create']);
}
}
