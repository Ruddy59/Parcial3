import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

const LISTARANIMALES_QUERY = gql`
query {
  animales {
      nombre
      entorno
      peso
      tipo {
        nombre
      } 
    }
  }
`;
const LISTARTIPOS_QUERY = gql`
query {
  tipos {
      id
    	nombre
    }
  }
`;
const CREARANIMALES_QUERY = gql`
mutation createAnimal(
  $nombre: String,
  $entorno: String,
  $peso: Decimal,
  $tipo: Int,
) {
  createAnimal(input: {
    nombre:$nombre,
    entorno:$entorno,
    peso:$peso,
    tipo:$tipo,
  }) {
    ok
  }
}
`;

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  page = 1;
  animales: any[] = [];
  animal = {
    nombre:"",
    entorno:"",
    peso:0,
    tipo:0,

  };
  tipos: any[] = [];

  private query: QueryRef<any>;
  private query2: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: LISTARANIMALES_QUERY
    });

    this.query.valueChanges.subscribe(result => {
      this.animales = result.data && result.data.animales;
    });

    this.query2 = this.apollo.watchQuery({
      query: LISTARTIPOS_QUERY
    });

    this.query2.valueChanges.subscribe(result => {
      this.tipos = result.data && result.data.tipos;
    });
  }

  nuevoAnimal() {
    this.apollo.mutate({
      mutation: CREARANIMALES_QUERY,
      variables: {
        nombre: this.animal.nombre,
        entorno: this.animal.entorno,
        peso: this.animal.peso,
        tipo: this.animal.tipo,
      }
    }).subscribe(data => {
      console.log('Nuevo animal creado!', data);
    });
  }

  update() {
    this.query.refetch();
  }

  nextPage() {
    this.page++;
    this.update();
  }

  prevPage() {
    if (this.page > 0) this.page--;
    this.update();
  }
}
