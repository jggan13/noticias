import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TopHeadLines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }


  getTopHeadlines = () => {
    return this.http.get<TopHeadLines>(`http://newsapi.org/v2/top-headlines?country=us&apiKey=193c0ad7e99d403bb272a9ee67224f7b`);
  }
}
