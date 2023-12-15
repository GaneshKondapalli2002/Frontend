import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component {

  public getdata: any;
  public postdata: any;
  public deledata:any;
  activeForm: string = 'login';

  constructor(private http: HttpClient) {}

  switchForm(form: string): void {
    this.activeForm = form;
  }

  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    this.http.get("https://fakestoreapi.com/products?limit=5").subscribe((data) => {
      console.log(data);
      this.getdata = data;
    });
  }
  public delete(productId: number): void {
    var del = confirm("Do you want to delete?");
    if (del) {
      this.http.delete(`https://fakestoreapi.com/products/${productId}`).subscribe(
        () => {
          console.log(`Product with id ${productId} deleted successfully.`);
          // Find the index of the item to delete
          const index = this.getdata.findIndex((product: any) => product.id === productId);
          // Remove the item from the array
          if (index !== -1) {
            this.getdata.splice(index, 1);
          }
        },
        (error) => {
          console.error(`Error deleting product with id ${productId}:`, error);
          // Handle error, show error message, etc.
        }
      );
    }
  }

  public post() {
    let body = {
      id: 6,
      title: 'sg bat',
      price: 18.5,
    };

    this.http.post('https://fakestoreapi.com/products', body).subscribe((data) => {
      console.log(data);
      this.postdata = data;

      if (this.getdata) {
        this.getdata.push(data);
      }
    });
  }
}
