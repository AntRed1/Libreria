import { AutoresComponent } from './src/components/autores/autores.component';
import { ContactsComponent } from './src/components/contacts/contacts.component';
import { LibrosComponent } from './src/components/libros/libros.component';
import { MainComponent } from './src/components/main/main.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: MainComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'comments',
    component: ContactsComponent,
  },
  { path: 'autores',
    component: AutoresComponent
  },
  { path: 'libros',
    component: LibrosComponent },
];
