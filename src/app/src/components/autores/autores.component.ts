import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Autor {
  id_autor: string;
  fotografia: string;
  Nombres: string;
  direccion: string;
  ciudad: string;
  pais: string;
  cod_postal: string;
  estado: string;
  telefono: string;
}

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
  standalone: true,
})
export class AutoresComponent implements OnInit {
  autores: Autor[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 6;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAutores();
  }

  loadAutores(): void {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.http
      .get<{ data: Autor[]; total: number }>(
        `/api/autores?offset=${offset}&limit=${this.itemsPerPage}`
      )
      .subscribe((response) => {
        this.autores = response.data;
        this.totalPages = Math.ceil(response.total / this.itemsPerPage);
      });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadAutores();
  }

  get paginatedAutores(): Autor[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.autores.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
