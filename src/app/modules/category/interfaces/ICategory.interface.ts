export interface ICategory {
    categoriaId:      number;
    categoriaDescrip: string;
    productos:        Producto[];
    estado:           number;
    fechaHoraReg:     null;
    fechaHoraAct:     Date;
    usuIdReg:         null;
    usuIdAct:         number;
}

export interface Producto {
    prodId:          number;
    prodDescripcion: string;
}
