import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {ILecturas, IParamsMediciones} from '@telemetria/lecturas-interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {validarNum} from '@services/validacionCampos';
import {GralesServices} from '@services/grales.service';
import {TelemetriaState} from '@telemetria/telemetriaState';

@Component({
    selector: 'app-reg-medicion',
    templateUrl: './reg-medicion.component.html',
    styleUrls: ['./reg-medicion.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegMedicionComponent
{
    modeloLecturas: ILecturas;
    formLecturasMacro: FormGroup = this._fb.group({
        fechaRegistro: [null, RxwebValidators.required()],
        lectura: [0, validarNum(true, null, null, null)],
        lecturaAnterior: [0, validarNum(true, null, null, null)]
    });
    estaCargando = false;

    constructor(private _fb: FormBuilder, private _teleState: TelemetriaState, private _dialogRef: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: IParamsMediciones)
    {
    }

    regLecturas(): void
    {
        this.estaCargando = true;
        const {year, month} = this.formLecturasMacro.value.fechaRegistro._i;
        const mes: string = GralesServices.convertirMes(month + 1);

        if (this.data.esAgregar)
        {
            try
            {
                this.modeloLecturas =
                    {
                        ano: year,
                        ene: 0,
                        feb: 0,
                        mar: 0,
                        abr: 0,
                        may: 0,
                        jun: 0,
                        jul: 0,
                        ago: 0,
                        sep: 0,
                        oct: 0,
                        nov: 0,
                        dic: 0,
                        total: 0
                    };

                this._teleState.regLecturas(this.data._id, this.data.tipoLect, this.modeloLecturas)
                    .subscribe(lect =>
                    {

                        if (lect.mensaje.includes('encontrado'))
                        {
                            this.estaCargando = false;
                            toastSweet(TipoAlerta.alerta, 'Ya existe un registro con ese ano', 5000);
                            this.cerrarModal();
                        } else
                        {
                            if (lect.estatus)
                            {
                                this.estaCargando = false;
                                toastSweet(TipoAlerta.satisfactorio, lect.mensaje, 5000);
                                this.cerrarModal();
                            }
                        }
                    }, error =>
                    {
                        toastSweet(TipoAlerta.error, `Ocurrio un error inesperado: ${error}`, 5000);
                        this.cerrarModal();
                    });
            } catch (e)
            {
                toastSweet(TipoAlerta.error, 'Ocurrio un error inesperado: ' + e, 5000);
                this.cerrarModal();
            }
        } else
        {
            if (this.data.datos.ano === year)
            {
                const valorMes = parseFloat(this.formLecturasMacro.get('lectura').value) - parseFloat(this.formLecturasMacro.get('lecturaAnterior').value);

                const arregloMeses: number[] = [];

                for (const propiedad in this.data.datos)
                {
                    if (propiedad !== 'ano' && propiedad !== 'total' && propiedad !== '__typename' && propiedad !== mes.toLowerCase())
                    {
                        arregloMeses.push(this.data.datos[propiedad]);
                    }
                }

                const totalMes = arregloMeses.reduce((a, b) => a + b, 0) + valorMes;

                this._teleState.editarLectura(this.data._id, year, mes.toLowerCase(), this.data.tipoLect, valorMes, totalMes)
                    .subscribe((res) =>
                    {
                        if (res.estatus)
                        {
                            this.estaCargando = false;
                            toastSweet(TipoAlerta.satisfactorio, res.mensaje, 5000);
                            this.cerrarModal();
                        }
                    });
            } else
            {
                this.estaCargando = false;
                this.formLecturasMacro.reset();
                toastSweet(TipoAlerta.alerta, 'El año que ingresaste no correspone con el seleccionado', 5000);
            }
        }
    }

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }
}
