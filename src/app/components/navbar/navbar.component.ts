import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
// Prime Modules
import { MenuItem } from "primeng/api";
// Prime UI Components
import { MenubarModule } from 'primeng/menubar';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule,
            DropdownModule,
            RouterModule,
            RouterLinkActive,
            InputTextModule,FormsModule,MenubarModule,CommonModule,ButtonModule,AvatarModule
          ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  Categories:any = [{name:'Men'},{name:'Wowen'},{name:'baby'}];
  selectedCategory:any;
  items_count:number = 10;
  value:any;
  user:any="Guest";
  profile_img:any="";
  Mode:string="Dark";
  classIcon:string ="fa-moon";
  colorIcon:string ="white"
  changeTheme(){
    if(this.Mode == "Light"){
      this.Mode = "Dark";
      this.classIcon="fa-moon"
      this.colorIcon = "white"
      // --var(--BACKGROUND) = "black !important";
    }else{
      this.Mode = "Light";
      this.classIcon="fa-sun"
      this.colorIcon="goldenrod"

    }
  }
  // items: MenuItem[] | undefined;
  // ngOnInit(){
  //   this.items = [
  //     {
  //       label: '<a routerLink="/products">Home</a>',
  //       // icon: "pi pi-fw pi-file",
  //       styleClass:"col-2 ",

  //       // items: [
  //       //   {
  //       //     label: "New",
  //       //     icon: "pi pi-fw pi-plus",
  //       //   },
  //       //   {
  //       //     label: "Delete",
  //       //     icon: "pi pi-fw pi-trash",
  //       //   },
  //       //   {
  //       //     separator: true,
  //       //   },
  //       //   {
  //       //     label: "Export",
  //       //     icon: "pi pi-fw pi-external-link",
  //       //   },
  //       // ],
  //     },
  //     {
  //       label: "Edit",
  //       icon: "pi pi-fw pi-pencil",
  //       items: [
  //         {
  //           label: "Left",
  //           icon: "pi pi-fw pi-align-left",
  //         },
  //         {
  //           label: "Right",
  //           icon: "pi pi-fw pi-align-right",
  //         },
  //         {
  //           label: "Center",
  //           icon: "pi pi-fw pi-align-center",
  //         },
  //         {
  //           label: "Justify",
  //           icon: "pi pi-fw pi-align-justify",
  //         },
  //       ],
  //     },
  //     {
  //       label: "Users",
  //       icon: "pi pi-fw pi-user",
  //       items: [
  //         {
  //           label: "New",
  //           icon: "pi pi-fw pi-user-plus",
  //         },
  //         {
  //           label: "Delete",
  //           icon: "pi pi-fw pi-user-minus",
  //         },
  //         {
  //           label: "Search",
  //           icon: "pi pi-fw pi-users",
  //           items: [
  //             {
  //               label: "Filter",
  //               icon: "pi pi-fw pi-filter",
  //               items: [
  //                 {
  //                   label: "Print",
  //                   icon: "pi pi-fw pi-print",
  //                 },
  //               ],
  //             },
  //             {
  //               icon: "pi pi-fw pi-bars",
  //               label: "List",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       label: "Events",
  //       icon: "pi pi-fw pi-calendar",
  //       items: [
  //         {
  //           label: "Edit",
  //           icon: "pi pi-fw pi-pencil",
  //           items: [
  //             {
  //               label: "Save",
  //               icon: "pi pi-fw pi-calendar-plus",
  //             },
  //             {
  //               label: "Delete",
  //               icon: "pi pi-fw pi-calendar-minus",
  //             },
  //           ],
  //         },
  //         {
  //           label: "Archieve",
  //           icon: "pi pi-fw pi-calendar-times",
  //           items: [
  //             {
  //               label: "Remove",
  //               icon: "pi pi-fw pi-calendar-minus",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       label: "Quit",
  //       icon: "pi pi-fw pi-power-off",
  //     },
  //   ];
  // }


}
