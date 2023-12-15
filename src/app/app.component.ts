import { Component, EventEmitter, Output,  } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // @Output() onEdit = new EventEmitter<any>(); 
  // title = 'hello login-app -->';
  // data: any;
  // data1: any;
  // data2: any;
  // data3: any;
  // data4:any;

  // UserData:any = [];
  
  //  rowindex: any;
  
  //  UserName: string | any;
  //  Password: string | any;
  //  PhoneNumber: number | any;
  // Subjects: any;
  // id = null;
  
  // myFun(){
  //   console.log(" Hello Ganesh", this.data, this.data1);
  // }
  

  //  = [
  //   {
  //     UserName: "Ganesh",
  //     Password: "**********",
  //     PhoneNumber: 8165465165,  
  //   },
  //   {
  //     UserName: "jagadeesh",
  //     Password: "*******",
  //     PhoneNumber: 5446842,
  //   },{
  //     UserName: "Naveen",
  //     Password: "*******",
  //     PhoneNumber: 5446842,
  //   }]
  // addData() {
  //   if (this.data='', this.data1='', this.data2='', this.data3='')
  //   console.log(this.data3.split(","));
  //   this.UserData.push({
  //     UserName: this.data,
  //     Password: this.data1,
  //     PhoneNumber: this.data2,
  //     Subjects: this.data3.split(","),
  //   });
  //   this.data=this.data1=this.data2=this.data3=this.data4=null;
  //   console.log("this.UserData",this.UserData);
  // }
  
  // deleteRow(UserData: any){
  //   var delBtn = confirm(" Do you want to delete ?");
  //   if ( delBtn == true ) {
  //     this.UserData.splice(UserData,1);
  //   }   
  //   console.log(this.deleteRow);
  // } 
  
  // open(data=null){
  //   this.clearForm();
  // }

  // closeForm(){
  //   this.UserData = false;
  //   this.clearForm()
  // }
  // clearForm(){
  //   this.UserName=null;
  //   this.Password=null;
  //   this.PhoneNumber=null;
  //   this.Subjects=null;
  // }
  // Edit(val: any,i: any){
  //   console.log("-->",val,i);
  //   this.editRowID= val;
  //   console.log(this.editRowID);
  // }
  // edit(row:any, i:any){
  //   console.log(this.edit,i);
  //   this.rowindex = i;
  //   if(row ){
  //     this.data = this.UserData[i].UserName;
  //     this.data1 = this.UserData[i].Password;
  //     this.data2 = this.UserData[i].PhoneNumber;
  //     this.data3 = this.UserData[i].Subjects; 
  //      }else {
  //       this.UserData = false

  //      }
  // }
  
  // update(){
  //   console.log(this.update);
  //   this.UserData[this.rowindex].UserName = this.data;
  //   this.UserData[this.rowindex].Password = this.data1;
  //   this.UserData[this.rowindex].PhoneNumber = this.data2;
  //   this.UserData[this.rowindex].Subjects = this.data3;
  //    this.data=this.data1=this.data2=this.data3=this.data4=null;

  // }
    //code for editing


  // edit(row :any){
  //     this.onEdit.emit(row);
  // }
    //  jk() {
    //   this.UserData.Push({
    //     Subjects: this.data3,
    // });
    // }
  
   
      // this.splitString = this.UserData.split(this.arr);
      // if (this.UserData) {
      //   this.splitString = this.UserData.split(',');
      // }

      // let addData = this.UserData.split(",");
      // console.log(addData);
      // console.log("this.UserData--->",this.UserData);
      // console.log("this.UserData--->",this.addData);
}
