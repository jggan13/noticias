import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopHeadLines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  currentCategory = '';
  categoryPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery = <T>(query: string) => {
    return this.http.get<T>(`${apiUrl}${query}`, { headers });
  }

  getTopHeadlines = () => {
    this.headlinesPage++;
    return this.ejecutarQuery<TopHeadLines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
    //return this.http.get<TopHeadLines>(`${apiUrl}/top-headlines?country=us&apiKey=193c0ad7e99d403bb272a9ee67224f7b`);
  }

  
  getTopHeadlinesByCategory = (category: string) => {

    if (this.currentCategory === category) {
      this.categoryPage++;
    } else {
      this.categoryPage = 1;
      this.currentCategory = category;
    }

    return this.ejecutarQuery<TopHeadLines>(`/top-headlines?country=us&category=${category}&page=${this.categoryPage}`);
    //return this.http.get<TopHeadLines>(`${apiUrl}/top-headlines?country=de&category=business&apiKey=193c0ad7e99d403bb272a9ee67224f7b`);
  }

}
