import { ɵLocaleDataIndex } from "@angular/core";

export class Comentario{
    
    constructor(
        public comentario:string,
        public idComentario?:number,
        public fechaComentario?:ɵLocaleDataIndex,   
    ){}
}