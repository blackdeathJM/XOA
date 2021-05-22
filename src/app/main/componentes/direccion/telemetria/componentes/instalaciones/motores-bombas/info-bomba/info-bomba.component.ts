import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {IInstalacion} from '@telemetria/instalacion-interface';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {IAccionesPrimeTabla, IEventoAcciones} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {IAccEquipo, IBajaEquipo, IBomba} from '@telemetria/equipo-electrico-interface';
import {RegBombaComponent} from '@telemetria/instalaciones/motores-bombas/reg-bomba/reg-bomba.component';
import {MatDialog} from '@angular/material/dialog';
import {BajaEquipoComponent} from '@telemetria/instalaciones/motores-bombas/baja-equipo/baja-equipo.component';
import {fuseAnimations} from '@plantilla/animations';
import {Prefijos} from '@Config/enums';
import {TelemetriaState} from '@telemetria/telemetriaState';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {GralesServices} from '@services/grales.service';

@Component({
    selector: 'app-info-bomba',
    templateUrl: './info-bomba.component.html',
    styleUrls: ['./info-bomba.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoBombaComponent
{
    @Input() set instalacion(val: IInstalacion)
    {
        this._instalacion = val;
    }

    opcBombaIns = GralesServices.opcCargaImg(Prefijos.bombaIns);
    opcBombaRet = GralesServices.opcCargaImg(Prefijos.bombaRet);

    preBombaIns = Prefijos.bombaIns;
    preBombaRet = Prefijos.bombaRet;

    colBomba: ITablaColumnas[] =
        [
            {
                etiqueta: 'Marca',
                propiedad: 'marca'
            },
            {
                etiqueta: 'Modelo',
                propiedad: 'modelo'
            },
            {
                etiqueta: 'Serie',
                propiedad: 'serie'
            },
            {
                etiqueta: 'No. Impulsores',
                propiedad: 'noImpulsores'
            },
            {
                etiqueta: 'RMP',
                propiedad: 'rpm'
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

    infoBomba: IBomba = null;

    _instalacion: IInstalacion;

    constructor(private _dialogRef: MatDialog, private _teleState: TelemetriaState)
    {
    }

    accionBombaRecibida(evento: IEventoAcciones, _id: string): void
    {
        switch (evento.accion)
        {
            case 'editar':
                const data: IAccEquipo =
                    {
                        _id,
                        nombreMutacion: 'actBomba',
                        equipo: evento.datos as IBomba
                    };
                this._dialogRef.open(RegBombaComponent, {width: 'auto', data});
                break;
            case 'info':
                this.infoBomba = evento.datos as IBomba;
                break;
            case 'reset':
                this.infoBomba = null;
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

    listaArchInstBomba(evento: string[], _id: string, esInstalacion: boolean): void
    {
        this._teleState.evidencia(_id, this.infoBomba.id, evento, esInstalacion, 'bomba').subscribe((res) =>
        {
            if (res.estatus)
            {
                toastSweet(TipoAlerta.satisfactorio, 'Las imagenes se han guardado con exito', 5000);
            }
        });
    }
}
