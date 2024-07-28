import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [],
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
})
export class LibrosComponent implements OnInit {
  libros: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 6;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLibros();
  }

  loadLibros(): void {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.http
      .get<any>(`/api/libros?offset=${offset}&limit=${this.itemsPerPage}`)
      .subscribe((response) => {
        this.libros = response.data;
        this.totalPages = Math.ceil(response.total / this.itemsPerPage);
      });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadLibros();
  }
}
