import { Component } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public item: string;
  public items: string[];

  constructor(private sqlite: SqliteService) {
    this.item = '';
    this.items = [];
  }

  ionViewWillEnter() {
    this.read();
  }

  create() {
    this.sqlite.create(this.item.toUpperCase()).then(
      (changes) => {
        console.log("Criado: ", changes);
        this.read();
      }).catch(err => {
        console.error("Erro ao criar: ", err);
      })
  }

  read() {
    this.sqlite.read().then(
      (items: string[]) => {
        this.items = items;
        console.log("Lido: ", this.items);
      }).catch(err => {
        console.error("Erro ao ler: ", err);
      })
  }

  update(item: string) {
    this.sqlite.update(this.item.toUpperCase(), item).then(
      (changes) => {
        console.log("Atualizado: ", changes);
        this.read();
      }
    ).catch(err => {
      console.error("Erro ao atualizar: ", err);
    })
  }

  delete(item: string) {
    this.sqlite.delete(item).then(
      (changes) => {
        console.log("Apagado: ", changes);
        this.read();
      }
    ).catch(err => {
      console.error("Erro ao apagar: ", err);
    })
  }
}
