export class NuevoUsuario{
    nombre: string;
    username: string;
    password: string;

    constructor(nombre:string, username:string, password:string){
        this.nombre=nombre;
        this.username=username;
        this.password=password;
    }
}