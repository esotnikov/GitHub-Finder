import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IUser } from '../models/user.interface';
import { IUserRepo } from '../models/user-repo.interface';

@Injectable()
export class GitService {
    private url = 'https://api.github.com';

    constructor(private http: HttpClient) {}

    getProfileInfo(param: string): Observable<IUser> {
        console.log(param);
        return this.http
        .get<any>(`${this.url}/search/users?q=${param}`)
        .pipe(map(data => {
            console.log(data);
            const user = {
                name: data.items[0].login,
                avatar: data.items[0].avatar_url,
                link: data.items[0].html_url
            };
            return user;
          }));
    }

    getRepoUser(param: string): Observable<IUserRepo[]> {
        console.log(param);
        return this.http
        .get<any>(`${this.url}/users/${param}/repos`)
        .pipe(map(data => {
            console.log(data);
            return data.map(item => {
                const repo = {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    url: item.html_url
                };
                return repo;
            });
          }));
    }
}
