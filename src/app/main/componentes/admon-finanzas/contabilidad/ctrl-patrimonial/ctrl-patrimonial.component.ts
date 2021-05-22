import {Component, ViewEncapsulation} from '@angular/core';
import {IDepartamento} from '@global/models/departamento.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {IAccionesPrimeTabla} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';

@Component({
    selector: 'app-ctrl-patrimonial',
    templateUrl: './ctrl-patrimonial.component.html',
    styleUrls: ['./ctrl-patrimonial.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CtrlPatrimonialComponent
{
    columnas: ITablaColumnas[] =
        [
            {
                etiqueta: 'Departamento',
                propiedad: 'departamento'
            },
            {
                etiqueta: 'Resguardante',
                propiedad: 'resguardante'
            },
            {
                etiqueta: 'descripcion',
                propiedad: 'descripcion'
            }
        ];
    btnAcciones: IAccionesPrimeTabla[] =
        [
            {
                color: 'primary',
                icono: 'info',
                accion: 'info',
            },
            {
                color: 'primary',
                icono: 'grain',
                accion: 'revision'
            }
        ];

    constructor(private _router: Router, private _activeRoute: ActivatedRoute)
    {
    }

    deptoSeleccionado($event: IDepartamento): void
    {
        console.log('evento', $event);
    }

    navegacion(): void
    {
        this._router.navigate(['/sistema-comercial/admon-finanzas/contabilidad/ctrl-patrimonial/activos/ctrl-patrimonial-vehicular']).then();
    }
}
