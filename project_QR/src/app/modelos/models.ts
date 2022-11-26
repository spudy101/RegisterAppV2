export interface cursoI {
    titulo: string;
    nombre: string;
    profesorCargo: string;
    cantidadAlumno: number;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
}

export interface profesorI {
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    fechaCreacion?: string;
    horaCreacion?: string;
    fechaActualizacion?: string;
    horaActualizacion?: string;
}

export interface alumnoI {
    nombre: string;
    apellido: string;
    correo: string;
    cursoP: string;
    porcentajeAsistencia?: number;
    contrasena: string;
    fechaCreacion?: string;
    horaCreacion?: string;
    fechaActualizacion?: string;
    horaActualizacion?: string;
}

export interface listaI {
    curso: string;
    cantidadAlumno?: string;
    fechaCreacion?: string;
    horaCreacion?: string;
    fechaActualizacion?: string;
    horaActualizacion?: string;
}

export interface mallaI {
    curso1: string;
    curso2: string;
    curso3: string;
    curso4: string;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
}




export interface MarkerI{
    position:{
        lat: number,
        lng: number
    },
    title: string
}