import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { PrimeNGConfig, MenuItem } from "primeng/api";

import { ButtonModule } from "primeng/button";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputTextModule } from "primeng/inputtext";
import { CardModule } from "primeng/card";
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,

    MenubarModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'infinitecart';
  items: MenuItem[] | undefined;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      {
        label: "File",
        icon: "pi pi-fw pi-file",
        items: [
          {
            label: "New",
            icon: "pi pi-fw pi-plus",
            items: [
              {
                label: "Bookmark",
                icon: "pi pi-fw pi-bookmark",
              },
              {
                label: "Video",
                icon: "pi pi-fw pi-video",
              },
            ],
          },
          {
            label: "Delete",
            icon: "pi pi-fw pi-trash",
          },
          {
            separator: true,
          },
          {
            label: "Export",
            icon: "pi pi-fw pi-external-link",
          },
        ],
      },
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        items: [
          {
            label: "Left",
            icon: "pi pi-fw pi-align-left",
          },
          {
            label: "Right",
            icon: "pi pi-fw pi-align-right",
          },
          {
            label: "Center",
            icon: "pi pi-fw pi-align-center",
          },
          {
            label: "Justify",
            icon: "pi pi-fw pi-align-justify",
          },
        ],
      },
      {
        label: "Users",
        icon: "pi pi-fw pi-user",
        items: [
          {
            label: "New",
            icon: "pi pi-fw pi-user-plus",
          },
          {
            label: "Delete",
            icon: "pi pi-fw pi-user-minus",
          },
          {
            label: "Search",
            icon: "pi pi-fw pi-users",
            items: [
              {
                label: "Filter",
                icon: "pi pi-fw pi-filter",
                items: [
                  {
                    label: "Print",
                    icon: "pi pi-fw pi-print",
                  },
                ],
              },
              {
                icon: "pi pi-fw pi-bars",
                label: "List",
              },
            ],
          },
        ],
      },
      {
        label: "Events",
        icon: "pi pi-fw pi-calendar",
        items: [
          {
            label: "Edit",
            icon: "pi pi-fw pi-pencil",
            items: [
              {
                label: "Save",
                icon: "pi pi-fw pi-calendar-plus",
              },
              {
                label: "Delete",
                icon: "pi pi-fw pi-calendar-minus",
              },
            ],
          },
          {
            label: "Archieve",
            icon: "pi pi-fw pi-calendar-times",
            items: [
              {
                label: "Remove",
                icon: "pi pi-fw pi-calendar-minus",
              },
            ],
          },
        ],
      },
      {
        label: "Quit",
        icon: "pi pi-fw pi-power-off",
      },
    ];
  }
}
