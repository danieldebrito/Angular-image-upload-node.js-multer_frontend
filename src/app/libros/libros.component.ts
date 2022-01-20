import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Libro } from '../libro';
import { LibrosService } from '../libros.service';
import { FormGroup, FormControl, Validators, AbstractControl, } from '@angular/forms';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  public libros: Libro[] = [];
  public photoSelected: any = {};
  public image: any = {};
  public multipleImages = [];
  public showErrors = false;

  createForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40),
      Validators.pattern('[a-zA-Z ]{2,41}'),
    ]),
  });

  constructor(
    private librosSv: LibrosService,
    private http: HttpClient
  ) { }

  public getLibros() {
    this.librosSv.gets().subscribe(res => {
      this.libros = res.libros;
      console.log(res);
    });
  }

  public resetError() {
    this.showErrors = false;
  }

  public selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.image = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.image);

    }
  }

  selectMultipleImage(event: any) {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.image);
    formData.append('nombre', this.createForm.getRawValue().nombre);
    formData.append('imagen', 'path');

    // console.log(this.createForm.getRawValue());

    this.http.post<any>('http://localhost:3000/libros/file', formData ).subscribe(res => {
      console.log(res);
      this.getLibros();
    });
    
  }

  onMultipleSubmit() {
    const formData = new FormData();
    for (let img of this.multipleImages) {
      formData.append('files', img);
    }

    this.http.post<any>('http://localhost:3000/libros/multipleFiles', formData).subscribe(res => {
      console.log(res);
    });
  }

  
  ngOnInit(): void {
    this.getLibros();
  }
}