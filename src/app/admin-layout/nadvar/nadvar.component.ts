import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../auth/auth-service.service'
import { NavigationService } from '../../services/navigation.service';
import { WarehouseService } from '../../services/warehouse.service';
import { UserService } from '../../services/user.service';
import { JobRoleDto } from '../../entitie/job-role';
import { MenuGroup } from '../../entitie/menu-group';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'nadvar',
  imports: [RouterLink],
  templateUrl: './nadvar.component.html',
})
export class NadvarComponent {

  private username = '';
  private userId = '';
  private jobRoles: JobRoleDto[] = []

  menu: MenuGroup[] = []

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private navigationService: NavigationService,
    private warehouseService: WarehouseService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // 1) username seguro
    const stored = sessionStorage.getItem('username') ?? '';
    let username = stored;

    try {
      const obj = JSON.parse(stored);
      username = obj?.name ?? obj?.username ?? stored;
    } catch { }

    this.username = username?.trim() ?? '';

    if (!this.username) {
      console.error('No username en sessionStorage');
      return;
    }

    this.userService.getUserByUsername(this.username).subscribe({
      next: userDB => {
        this.userId = userDB.userId;
        this.warehouseService.getWarehouseAndJobRole(this.userId).subscribe({
          next: userWarehouse => {
            console.log(userWarehouse)
            this.navigationService.getNadvar(userWarehouse.jobRole[0].jobRoleId, true).subscribe({
              next: menus =>{
                this.menu = menus
                console.log(menus)
                console.log(this.menu)
              }
            })
          },
          error: err => console.log(err)
        })
      }
    })
    // 2) cadena: user -> roles -> navbar
  }
  get auth(): boolean {
    return this.authService.isAuthenticated()
  }

  get visibleMenu(): MenuGroup[] {
    return this.menu;
  }

  logout(): void {
    this.authService.logoutApi();
    this.router.navigate(['/login']);
  }
}
