import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { ContactsComponent } from '../contacts/contacts.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FooterComponent, ContactsComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = 'Bienvenido';
}
