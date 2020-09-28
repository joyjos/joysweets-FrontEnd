export class Usuario{

    constructor(
        public nombre:string,
        public username:string,
        public idUsuario:number,
        public roleName?:string,
        public password?:string
    ){}
}