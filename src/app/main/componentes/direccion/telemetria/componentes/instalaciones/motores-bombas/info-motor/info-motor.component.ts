import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {IInstalacion} from '@telemetria/instalacion-interface';
import {IAccionesPrimeTabla, IEventoAcciones, IOpcionesCarga} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {IAccEquipo, IBajaEquipo, IMotor} from '@telemetria/equipo-electrico-interface';
import {RegMotorComponent} from '@telemetria/instalaciones/motores-bombas/reg-motor/reg-motor.component';
import {MatDialog} from '@angular/material/dialog';
import {Prefijos} from '@Config/enums';
import {BajaEquipoComponent} from '@telemetria/instalaciones/motores-bombas/baja-equipo/baja-equipo.component';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {TelemetriaState} from '@telemetria/telemetriaState';
import {fuseAnimations} from '@plantilla/animations';
import {Subscription} from 'rxjs';
import {InstalacionQueryService} from '@telemetria/query/instalacion-query.service';
import {GralesServices} from '@services/grales.service';

@Component({
    selector: 'app-info-motor',
    templateUrl: './info-motor.component.html',
    styleUrls: ['./info-motor.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoMotorComponent
{
    @Input() set instalacion(valor: IInstalacion)
    {
        this._instalacion = valor;
    }

    opcionesCargaMotor: IOpcionesCarga;

    opcCargMotInt = GralesServices.opcCargaImg(Prefijos.motorIns);
    opcCargMotRet = GralesServices.opcCargaImg(Prefijos.motorRet);

    subscripcion: Subscription = new Subscription();

    colMotor: ITablaColumnas[] =
        [
            {
                etiqueta: 'Modelo',
                propiedad: 'modelo'
            },
            {
                etiqueta: 'Marca',
                propiedad: 'marca'
            },
            {
                etiqueta: 'Serie',
                propiedad: 'serie'
            },
            {
                etiqueta: 'Eficiencia',
                propiedad: 'eficiencia'
            },
            {
                etiqueta: 'Amperaje',
                propiedad: 'amperaje'
            }
        ];
    accionesEquipo: IAccionesPrimeTabla[] =
        [
            {
                accion: 'editar',
                icono: 'edit',
                color: 'primary',
                tooltip: 'Editar informacion seleccionada',
            },
            {
                accion: 'info',
                icono: 'info',
                color: 'primary',
                tooltip: 'Mostrar informacion seleccionada',
            }
        ];

    infoMotor: IMotor = null;
    preMotorRet = Prefijos.motorRet;
    preMotorIns = Prefijos.motorIns;
    _instalacion: IInstalacion;

    constructor(private _dialogRef: MatDialog, private _teleState: TelemetriaState, private _instalacionQuery: InstalacionQueryService)
    {
    }

    listaArchInstMotor(evento: string[], _id: string, esInstalacion: boolean): void
    {
        this.subscripcion.add(this._teleState.evidencia(_id, this.infoMotor.id, evento, esInstalacion, 'motor').subscribe((res) =>
        {
            if (res.estatus)
            {
                toastSweet(TipoAlerta.satisfactorio, 'Las imagenes se han guardado con exito', 5000);
            }
        }));
    }

    accionMotorRecibida(evento: IEventoAcciones, _id: string): void
    {
        switch (evento.accion)
        {
            case 'editar':
                const data: IAccEquipo =
                    {
                        _id,
                        nombreMutacion: 'actMotor',
                        equipo: evento.datos as IMotor
                    };
                this._dialogRef.open(RegMotorComponent, {width: 'auto', hasBackdrop: false, data});
                break;
            case 'info':
                this.infoMotor = evento.datos as IMotor;
                break;
            case 'reset':
                this.infoMotor = null;
                break;
            default:
                break;
        }
    }

    bajaEquipo(_id: string, id: string, equipo: string): void
    {
        const data: IBajaEquipo =
            {
                _id,
                id,
                equipo
            };

        this._dialogRef.open(BajaEquipoComponent, {width: '40%', hasBackdrop: false, data});
    }
}
