import {Component, signal, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';
import {SidenavComponent} from './shared/components/sidenav.component/sidenav.component';
import {BodyComponent} from './shared/pages/body/body.component';
import {NgIf} from '@angular/common';
import {LoginEventService} from './iam/services/login-event.service';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [SidenavComponent, BodyComponent, NgIf,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Synhub');
  showSideBar = false;
  redirect = '';

  @ViewChild(MatSidenav, {static: true}) sidenav!: MatSidenav;

  optionsLeader=[
    {icon: '', path: '/leaders/my-group', title: 'Mi Grupo'},
    {icon: '', path: '/leaders/members', title: 'Integrantes'},
    {icon: '', path: '/leaders/invitations', title: 'Invitaciones'},
    {icon: '', path: '/leaders/tasks', title: 'Tareas'},
    {icon: '', path: '/leaders/reports', title: 'Reportes'},
    {icon: '', path: '/leaders/validations', title: 'Solicitude y Validaciones'},
    {icon: '', path: '/sign-in', title: 'Cerrar Sesión'}
  ];

  optionsMember=[
    {icon: '', path: '/members/my-group', title: 'Mi Grupo'},
    {icon: '', path: '/leaders/tasks', title: 'Tareas'},
    {icon: '', path: '/leaders/validations', title: 'Solicitude y Validaciones'},
    {icon: '', path: '/leaders/reports', title: 'Mi desempeño'},
    {icon: '', path: '/sign-in', title: 'Cerrar Sesión'}
  ];

  constructor(private router: Router, private loginEventService: LoginEventService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        if (currentRoute.includes('sign-in') || currentRoute.includes('sign-up')) {
          localStorage.clear();
          this.screenWidth = 0;
        }
        this.showSideBar = !(currentRoute.includes('sign-in') || currentRoute.includes('sign-up'));
        console.log('Ruta actual:', currentRoute);
        console.log('showToolbar:', this.showSideBar);
        this.loginEventService.loginSuccess$.subscribe(() => {
          this.screenWidth = 1;
        });
      }
    });
    this.setRedirect();
  }

  private setRedirect() {
    if (this.isLeader) {
      this.redirect = '/leaders/main';
    } else {
      this.redirect = '/members/main';
    }
  }

  get isMember(): boolean {
    return localStorage.getItem('role') === 'ROLE_MEMBER';
  }

  get isLeader(): boolean {
    return localStorage.getItem('role') === 'ROLE_LEADER';
  }

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
