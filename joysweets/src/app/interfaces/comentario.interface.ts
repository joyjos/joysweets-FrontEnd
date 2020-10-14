import { ɵLocaleDataIndex } from '@angular/core';

export interface Comentario{
    idComentario:number;
    comentario:string;
    fechaComentario:ɵLocaleDataIndex;
    length:number;
    idPost:number;
    post: any;
}