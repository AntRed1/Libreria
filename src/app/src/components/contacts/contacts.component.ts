import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.actualizarBadge();
  }

  mostrarMensaje(title: string, text: string, icon: any = 'info') {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK',
    });
  }

  manejarError(error: any) {
    console.error('Error:', error);
    this.mostrarMensaje(
      'Error',
      'Hubo un problema con la solicitud. Por favor, inténtelo de nuevo más tarde.',
      'error'
    );
  }

  cargarComentarios() {
    Swal.fire({
      title: 'Cargando comentarios...',
      html: '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Cargando...</span>',
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    this.http.get<any[]>('php/comentarios.php').subscribe({
      next: (data) => {
        this.actualizarComentariosUI(data);
        Swal.close();
      },
      error: (error) => {
        this.manejarError(error);
      },
    });
  }

  actualizarComentariosUI(data: any) {
    const comentariosContainer = document.getElementById(
      'comentariosContainer'
    );
    if (comentariosContainer) {
      comentariosContainer.innerHTML = '';
      data.forEach((comentario: any) => {
        const comentarioHTML = `
          <div class="alert alert-light" role="alert">
            <p><strong>${comentario.nombre} ${comentario.apellidos}</strong></p>
            <p>${comentario.comentarios}</p>
            <small class="text-muted">${comentario.fecha}</small>
          </div>
        `;
        comentariosContainer.innerHTML += comentarioHTML;
      });
    }
  }

  validarCampos(
    nombre: string,
    apellidos: string,
    email: string,
    comentarios: string
  ) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      nombre.trim() !== '' &&
      apellidos.trim() !== '' &&
      email.trim() !== '' &&
      comentarios.trim() !== '' &&
      emailRegex.test(email)
    );
  }

  limpiarCampos() {
    const nombre = <HTMLInputElement>document.getElementById('nombre');
    const apellidos = <HTMLInputElement>document.getElementById('apellidos');
    const email = <HTMLInputElement>document.getElementById('email');
    const comentarios = <HTMLInputElement>(
      document.getElementById('comentarios')
    );

    if (nombre) nombre.value = '';
    if (apellidos) apellidos.value = '';
    if (email) email.value = '';
    if (comentarios) comentarios.value = '';
  }

  enviarComentario(formData: FormData) {
    return this.http.post<any>('php/comentarios.php', formData).toPromise();
  }

  async Enviar(event: Event) {
    event.preventDefault();

    const nombre = (<HTMLInputElement>(
      document.getElementById('nombre')
    )).value.trim();
    const apellidos = (<HTMLInputElement>(
      document.getElementById('apellidos')
    )).value.trim();
    const email = (<HTMLInputElement>(
      document.getElementById('email')
    )).value.trim();
    const comentarios = (<HTMLInputElement>(
      document.getElementById('comentarios')
    )).value.trim();

    if (!this.validarCampos(nombre, apellidos, email, comentarios)) {
      this.mostrarMensaje(
        'Existen Campos Vacíos',
        'Por favor, complete todos los campos correctamente.',
        'error'
      );
      return;
    }

    const result = await Swal.fire({
      title: 'Desea guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No Guardar`,
    });

    if (result.isConfirmed) {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('apellidos', apellidos);
      formData.append('email', email);
      formData.append('comentarios', comentarios);

      try {
        const data: any = await this.enviarComentario(formData);
        if (data.success) {
          this.limpiarCampos();
          this.mostrarMensaje(
            'Guardado',
            'El comentario se ha guardado correctamente.',
            'success'
          );
          this.actualizarBadge();
        } else {
          this.mostrarMensaje(
            'Error',
            `No se pudo guardar el comentario. ${data.message}`,
            'error'
          );
        }
      } catch (error) {
        this.manejarError(error);
      }
    } else if (result.isDenied) {
      this.mostrarMensaje(
        'Cancelado',
        'Los cambios no fueron guardados.',
        'info'
      );
    }
  }

  actualizarBadge() {
    this.http.get<any[]>('php/comentarios.php').subscribe({
      next: (data) => {
        const commentBadge = document.getElementById('commentBadge');
        if (commentBadge) {
          commentBadge.innerText = data.length.toString();
        }
      },
      error: (error) => {
        this.manejarError(error);
      },
    });
  }
}
