import { Component } from '@angular/core';
import { Table } from '../../../shared/components/table/table';
import { IColumn } from '../../../shared/interfaces/ITabla.interface';

@Component({
  selector: 'app-dashboard',
  imports: [Table],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  columns: IColumn[] = [

    {
      header: 'Codigo',
      field: 'usuId'
    },
    {
      header: 'Nombre',
      field: 'usuNombre',
      position: 'center'
    },
    {
      header: 'Correo',
      field: 'email'
    }

  ]

  data = [
    {
      "usuId": 1,
      "usuNombre": "Alex Yepez",
      "empresaId": 1,
      "estado": 1,
      "fechaHoraReg": null,
      "fechaHoraAct": null,
      "usuIdReg": null,
      "usuIdAct": null,
      "clave": "kGiuxPmfSTrajuGToqmDow==",
      "email": "alexdyepez@gmail.com",
      "movimientoCabs": [],
      "usuarioPermisos": [],
      "usuarioRols": []
    },
    {
      "usuId": 2,
      "usuNombre": "Marlon Rodolfo Quinde Córdova",
      "empresaId": 1,
      "estado": 1,
      "fechaHoraReg": null,
      "fechaHoraAct": null,
      "usuIdReg": null,
      "usuIdAct": null,
      "clave": "+dPP9GSRqfpB6ml6b5nzHA==",
      "email": "admin@admin.com",
      "movimientoCabs": [],
      "usuarioPermisos": [],
      "usuarioRols": []
    }
  ]
}
