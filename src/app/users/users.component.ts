import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
title:string="welcome to users page";
imageUrl = 'assets/img/bank-image.png';
  property:boolean=false;
  buttonClass:string='color'
  name= "nour";
  isVisible=false;
  items:string[]=["item1","item2", "item3"]
  togglecolor(){
    this.buttonClass= this.buttonClass==='color'?'couleur':'color';
  }
  onClick(){
    alert('button clicked')
  }
  color:string[]=['purple','blue','red','green','orange','pink']
   currentColor: string= this.color[0];
  colorIndex: number=0;
  changeColor(){
    this.colorIndex=(this.colorIndex+1)% this.color.length;
    this.currentColor=this.color[this.colorIndex]
  }

}

