import { ɵLocaleDataIndex } from '@angular/core';
export class Post{
    
    constructor(
        public nombre:string,
        public categoria:string,
        public post:string,
        public imagen:string,
        public fechaPost:ɵLocaleDataIndex,
        public idPost:number
    ){}
}