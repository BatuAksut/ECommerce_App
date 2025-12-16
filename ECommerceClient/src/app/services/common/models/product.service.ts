import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list_product';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { List_Product_image } from '../../../contracts/list_product_image';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService,private toastrService: ToastrService) { }

  create(product: Create_Product, successCallback?: any, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({ controller: "products" }, product).subscribe(result => {
      successCallback()
    }, (errorResponse: HttpErrorResponse) => {
      var error: Array<{ key: string, value: Array<string> }> = errorResponse.error

      let message = ""
      error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`
        })
      })

      if (errorCallBack) {
        errorCallBack(message);
      }
    })
  }

  async read(page: number = 0, size: number = 5, successCallback?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number, products: List_Product[] }> {
    const observable = this.httpClientService.get<{ totalCount: number, products: List_Product[] }>(
      {
        controller: "products",
        queryString: `page=${page}&size=${size}`
      },);

    try {

      const response = await firstValueFrom(observable);

      if (successCallback) {
        successCallback();
      }


      return response;

    } catch (errorResponse: any) {
      if (errorCallBack) {
        errorCallBack(errorResponse.message);
      }
      throw errorResponse;
    }


  }
  async delete(id:string) {
    const observable = this.httpClientService.delete<any>({controller:"products"},id)
    await firstValueFrom(observable)

  }

 async readImages(
  id: string,
  successCallback?: () => void
): Promise<List_Product_image[]> {

  const observable = this.httpClientService.get<List_Product_image[]>({
    controller: 'products',
    action: 'getproductimages'
  }, id);

  const response = await firstValueFrom(observable);

  if (successCallback) {
    successCallback();
  }

  return response;
}

async deleteImage(
  id: string,imageId: string,successCallback?: () => void
): Promise<void> {
  const observable = this.httpClientService.delete<void>({
    controller: 'products',
    action: 'deleteproductimage',
    queryString: `imageId=${imageId}`
  }, id);
  await firstValueFrom(observable);
  this.toastrService.success("Image deleted", "Success", { 
      positionClass: "toast-bottom-right" 
  });
  if (successCallback) {
    successCallback();
  }
}

   
}