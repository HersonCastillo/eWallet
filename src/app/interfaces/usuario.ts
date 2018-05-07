export interface Usuario {
    _id_: string,
    nombres: string,
    apellidos: string,
    bancaData?: any,
    telefono?: string,
    direccion?: string,
    dui: string,
    nit: string,
    fechaNacimiento: Date,
    password: string,
    username: string
}