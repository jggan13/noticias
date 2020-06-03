import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage, private toastController: ToastController) { 
    this.loadfavorites();
  }


  saveNotice = (Notice: Article) => {

    const exist = this.noticias.find(notice => notice.title === Notice.title);

    if(!exist){
      this.noticias.unshift(Notice);
      this.storage.set('favorites', this.noticias);
    }
    this.presentToast('Agregado a favoritos');
  }

  loadfavorites = async () => {
    const noticias = await this.storage.get("favorites");
    if (noticias) {
      this.noticias = noticias;  
    } 
    
  }

  deleteNotice = (Notice: Article) => {

    this.noticias = this.noticias.filter(notice => notice.title !== Notice.title);
    this.storage.set('favorites', this.noticias);
    this.presentToast('Eliminado de favoritos');

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
