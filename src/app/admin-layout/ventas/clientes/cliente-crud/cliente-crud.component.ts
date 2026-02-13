import { Component } from '@angular/core';
import { SharingDataServiceService } from '../../../../services/sharing-data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ClientNatural } from '../../../../entitie/client-natural';
import { ClientLegal } from '../../../../entitie/client-legal';
import { Person } from '../../../../entitie/person';
import { PersonService } from '../../../../services/person.service';
  
@Component({
  selector: 'cliente-crud',
  imports: [],
  templateUrl: './cliente-crud.component.html'
})
export class ClienteCrudComponent {

  clientNatural!: ClientNatural;
  clientLegal!: ClientLegal

  id!: string; 

  person!: Person ;
  constructor(
    private sharingDataService: SharingDataServiceService,
    private route :ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.sharingDataService.updateClient$.subscribe(id => {
    this.id = id;
    console.log('ID recibido:', this.id);
    if(this.id != ''){
      this.personService.getClient(id).subscribe({
        next: (client : any) =>{
          console.log(client)
          this.person = client;
          if(client.documentType.documentType === 'N'){
            this.clientNatural = client.clientNatual;
          } else{
            this.clientLegal = client.clientLegal;
          }
        },
        error: (err: any) =>{
          console.log(err);
        }
      })
    }
    });
  }

  view(id: string) {

  }
}

