import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() index: number;
  constructor(private socialSharing: SocialSharing, 
              private iab: InAppBrowser, 
              private actionSheetController: ActionSheetController,
              private dataLocalService: DataLocalService) { }

  ngOnInit() {}

  openNotice = () => {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  lanzarMenu = () => {

    this.presentActionSheet();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(this.noticia.title, this.noticia.source.name, '', this.noticia.url);
        }
      }, 
      {
        text: 'Favorite',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.saveNotice(this.noticia);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
