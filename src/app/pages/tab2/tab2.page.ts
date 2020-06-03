import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll : IonInfiniteScroll;

  noticias: Article[] = [];
  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  constructor(private noticiasServices: NoticiasService) {}

  ngOnInit(){
    this.segment.value = 'business';
    this.cargarNoticias(this.segment.value);
  }

  getCategory = (event) => {
    this.noticias = [];
    //this.ionInfiniteScroll.disabled = false;
    this.cargarNoticias(event.detail.value);
  }

  private cargarNoticias = (category: string, event?) => {
    this.noticiasServices.getTopHeadlinesByCategory(category).subscribe((data) => {
      //console.log(data);

      // if(data.articles.length <= 0){
      //   this.ionInfiniteScroll.disabled = true;
      //   event.target.complete();
      //   return;
      // }

      this.noticias.push(...data.articles);

      if(event){
        event.target.complete();
      }

    });
  }

  loadData = (event) => {
    this.cargarNoticias(this.segment.value, event);
  }

}
