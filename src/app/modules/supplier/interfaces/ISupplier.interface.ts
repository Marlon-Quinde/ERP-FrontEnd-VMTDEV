export interface ISupplier {
    provId:           number;
    provRuc:          string;
    provNomComercial: string;
    provRazon:        string;
    provDireccion:    string;
    provTelefono:     number;
    ciudadId:         number;
    estado:           string;
    fechaHoraReg:     Date | null;
    fechaHoraAct:     Date | null;
    usuIdReg:         number | null;
    usuIdAct:         number | null;
    movimientoCabs:   MovimientoCab[];
}

export interface MovimientoCab {
    movicabId:        number;
    secuenciaFactura: string;
    fechaHoraReg:     Date | null;
    clienteId:        number;
    proveedorId:      number;
}
