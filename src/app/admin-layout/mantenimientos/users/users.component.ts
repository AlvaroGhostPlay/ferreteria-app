import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {PaginatorComponent} from '../../paginator/paginator.component'
import { User } from '../../../entitie/user';
import { UserService } from '../../../services/user.service';
import { SharingDataServiceService } from '../../../services/sharing-data-service.service';

@Component({
  selector: 'users',
  imports: [ PaginatorComponent],
  templateUrl: './users.component.html',
})  
export class UsersComponent {

  paginator: any = {
      totalPages: 0, 
      number: 0
    };
  url:string = '/auth/mantenimientos/usuarios/page/:page';


  constructor(
    private router: Router,
    private userServie: UserService,
    private route :ActivatedRoute,
    private sharingDataService: SharingDataServiceService

  ){}

  users: User[] =[];

  ngOnInit() {
    this.users = [];
    this.route.paramMap.subscribe(pm => {
      const page = pm.get('page') ?? '0';
      this.userServie.getUsers(page).subscribe({
        next: usersDb =>{
              this.users = usersDb.content;
              this.paginator = {
                totalPages: usersDb.totalPages,
                number: usersDb.number, // mejor esto
              };
        },
        error: err => console.log(err)
      })
    });
    
  }

deleteUser(id: string){
    this.users = [...this.users.filter(c => c.userId !== id)];
}

view(id: string) {
  this.sharingDataService.emitUserId({ id, mode: 'view' });
  this.router.navigate(['/auth/mantenimientos/usuarios/info']);
}

update(id: string) {
  this.sharingDataService.emitUserId({ id, mode: 'edit' });
  this.router.navigate(['/auth/mantenimientos/usuarios/edit']);
}

create(id: string) {
  this.sharingDataService.emitUserId({ id, mode: 'create' });
  this.router.navigate(['/auth/mantenimientos/usuarios/create']);
}
}
