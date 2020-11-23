import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';


const LISTARTIPOS_QUERY = gql`
query {
  tipos {
    	nombre
    }
  }
`;
const CREARTIPOS_QUERY = gql`
mutation createTipo(
  $nombre: String,
) {
  createTipo(input: {
    nombre:$nombre,
  }) {
    ok
  }
}
`;

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent implements OnInit {
  page = 1;
  tipos: any[] = [];
  tipo = {
    nombre:"",

  };
  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: LISTARTIPOS_QUERY
    });

    this.query.valueChanges.subscribe(result => {
      this.tipos = result.data && result.data.tipos;
    });
  }

  nuevoTipo() {
    this.apollo.mutate({
      mutation: CREARTIPOS_QUERY,
      variables: {
        nombre: this.tipo.nombre,
      }
    }).subscribe(data => {
      console.log('Nuevo tipo creado!', data);
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
