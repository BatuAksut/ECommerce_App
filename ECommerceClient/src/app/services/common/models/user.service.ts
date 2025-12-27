import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { CreateUserResponse } from '../../../contracts/create_user_response';
import { first, firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClientService) { }


 async create(user: User): Promise<CreateUserResponse> {
    const observable = this.httpClient.post<any>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as CreateUserResponse;
}
  async login(userName: string, password: string): Promise<any> {
    const observable = this.httpClient.post<any>({
      controller: "users",
      action: "login"
    }, {
      userName,
      password
    });

    return await firstValueFrom(observable);
  }
  }


