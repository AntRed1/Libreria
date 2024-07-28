import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { LibrosComponent } from '../libros/libros.component';
import { AutoresComponent } from '../autores/autores.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FooterComponent,
    ContactsComponent,
    HeaderComponent,
    LibrosComponent,
    AutoresComponent,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
