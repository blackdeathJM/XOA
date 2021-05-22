import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {botonGuardarConfig} from '@services/botonGuardarConfig';
import {IParams, IParamsCtrls} from '@telemetria/parametros-electricos-interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {validarNum} from '@services/validacionCampos';
import {GralesServices} from '@services/grales.service';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {v4 as uuidv4} from 'uuid';
import {TelemetriaState} from '@telemetria/telemetriaState';

@Component({
    selector: 'app-reg-lectura',
    templateUrl: './reg-lectura.component.html',
    styleUrls: ['./reg-lectura.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegLecturaComponent
{
    opcionesButtonSpinner = botonGuardarConfig(false, 'save', 'Guardar', 'button');


    modeloParams: IParams;

    formFecha: FormGroup = this._formBuilder.group({
        fechaReg: [null, Validators.required]
    });

    formParametros: FormGroup = this._formBuilder.group({
        v1: [null, validarNum(true, null, null, null)],
        v2: [null, validarNum(true, null, null, null)],
        v3: [null, validarNum(true, null, null, null)],
    });

    constructor(private _formBuilder: FormBuilder, private _teleState: TelemetriaState, private _dialogReg: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: IParamsCtrls)
    {
    }

    nvoParametro(): void
    {
        this.opcionesButtonSpinner = botonGuardarConfig(true, 'save', 'Guardando...');
        const {date, month, year} = this.formFecha.get('fechaReg').value._i;

        const promedio = GralesServices.obtenerPromedios(this.formParametros).toFixed(2);
        this.modeloParams =
            {
                id: uuidv4(),
                ano: year,
                mes: month + 1,
                dia: date,
                v1: parseFloat(this.formParametros.get('v1').value),
                v2: parseFloat(this.formParametros.get('v2').value),
                v3: parseFloat(this.formParametros.get('v3').value),
                promedio: parseFloat(String(promedio))
            };
        if (this.data.esAgregar)
        {
            this._teleState.regParamElectricos(this.data._id, this.modeloParams, this.data.param).subscribe((param) =>
            {
                if (param.mensaje.includes('encontrado'))
                {
                    this.opcionesButtonSpinner = botonGuardarConfig(false, 'save', 'Guardado');
                    toastSweet(TipoAlerta.alerta, `No puedes registrar estos valores porque coincide la fecha de
                    registro con una ya existente`, 5000);

                } else
                {
                    this.opcionesButtonSpinner = botonGuardarConfig(false, 'save', 'Guardado');
                    toastSweet(TipoAlerta.satisfactorio, param.mensaje, 5000);
                    this.cerrarModal();
                }
            }, error => toastSweet(TipoAlerta.error, 'Ocurrio un  error al tratar de registrar los parametros: ' + error, 5000));
        }
    }

    cerrarModal(): void
    {
        this._dialogReg.closeAll();
    }

}
