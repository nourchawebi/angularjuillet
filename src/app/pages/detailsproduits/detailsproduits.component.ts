import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProduitsService} from "../../services/produits.service";

@Component({
  selector: 'app-detailsproduits',
  templateUrl: './detailsproduits.component.html',
  styleUrls: ['./detailsproduits.component.css']
})
export class DetailsproduitsComponent  implements  OnInit{
  produit:any;
  produitId:any;
  constructor(private route:ActivatedRoute, private produitService:ProduitsService) {
  }
ngOnInit() {
    this.produitId=this.route.snapshot.paramMap.get('id');
    this.getProduit();
}
getProduit(){
    this.produitService.getProduitsById(this.produitId).subscribe(
      data =>{
        if(Array.isArray(data)&&data.length>0){
          this.produit=data[0]
        }else{
          console.error('acunn produit trouvé ')
        }
      }
    )
}
}
