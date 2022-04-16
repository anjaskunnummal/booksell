import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CartService {

constructor(private db:AngularFireDatabase) { 
  
}

addtoCart(requestParams:any){
  let ref = this.db.list("cart")
  return ref.push(requestParams)
}

getcartItem(){
  let ref = this.db.object("cart")
  return ref
}

getCartLength(){
  let ref = this.db.list("cart")
  return ref
}

}
