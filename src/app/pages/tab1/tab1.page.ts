import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { TopHeadLines, Article } from 'src/app/interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll) ionInfiniteScroll : IonInfiniteScroll;
  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //this.noticiasService.headlinesPage=0;
    this.cargarNoticias();

  }

  loadData = (event) => {
    //console.log(event);
    this.cargarNoticias(event);
  }

  cargarNoticias = (event?) => {
    
    this.noticiasService.getTopHeadlines().subscribe((data) => {
      //console.log(data);

      
      if(data.articles.length <= 0){
        this.ionInfiniteScroll.disabled = true;
        event.target.complete();
        return;
      }

      this.noticias.push(...data.articles);

      if(event){
        event.target.complete();
      }
      
    });

  }
}
