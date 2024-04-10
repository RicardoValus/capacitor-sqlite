import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { SqliteService } from './services/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isWeb: boolean;
  public load: boolean;
  public sqlite: SqliteService; // Declare a propriedade sqlite

  constructor(
    private platform: Platform,
    sqlite: SqliteService
  ) {
    this.isWeb = false;
    this.load = false;
    this.sqlite = sqlite; // Atribua o serviço SqliteService à propriedade sqlite
    this.initApp();
  }

  initApp() {
    this.platform.ready().then(async () => {
      const info = await Device.getInfo();
      this.isWeb = info.platform == 'web';

      this.sqlite.init();
      this.sqlite.dbReady.subscribe(load => {
        this.load = load;
      })
    })
  }
}