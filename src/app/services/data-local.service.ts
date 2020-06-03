import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage,) { }


  saveNotice = (Notice: Article) => {

    const exist = this.noticias.find(notice => notice.title === Notice.title);

    if(!exist){
      this.noticias.unshift(Notice);
      this.storage.set('favorites', this.noticias);
    }

  }

  loadfavorites = () => {

  }
}
