import { ɵLocaleDataIndex } from "@angular/core";

export class Comentario{
    
    constructor(
        public comentario:string,
        public fechaComentario?:ɵLocaleDataIndex,
        public idComentario?:number
    ){}
}