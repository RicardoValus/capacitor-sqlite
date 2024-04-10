import { Component } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public language: string;
  public languages: string[];

  constructor(private sqlite: SqliteService) {
    this.language = '';
    this.languages = [];
  }

  create(){

  }

  read(){
    
  }

  update(language: string){

  }
  
  delete(language: string){

  }
}
