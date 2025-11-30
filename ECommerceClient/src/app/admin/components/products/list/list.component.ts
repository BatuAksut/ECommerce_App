import { Component, OnInit, ViewChild } from '@angular/core'; // OnInit ekledim
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  standalone: true, // imports kullandığınız için standalone varsaydım
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService, spinner: NgxSpinnerService) {
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdAt', 'updatedAt'];
  dataSource: MatTableDataSource<List_Product> = new MatTableDataSource<List_Product>();
  
  totalCount: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  async getProducts() {
    this.showSpinner(SpinnerType.BallClipRotate);

    const pageIndex = this.paginator ? this.paginator.pageIndex : 0;
    const pageSize = this.paginator ? this.paginator.pageSize : 5;

    const response: { totalCount: number, products: List_Product[] } = await this.productService.read(
      pageIndex, 
      pageSize,
      () => this.hideSpinner(SpinnerType.BallClipRotate),
      (errorMessage) => {
        this.hideSpinner(SpinnerType.BallClipRotate);
        console.log(errorMessage);
      }
    );

    this.dataSource.data = response.products;
    this.totalCount = response.totalCount; 
  }

  async pageChange() {
    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts();
  }
  

}