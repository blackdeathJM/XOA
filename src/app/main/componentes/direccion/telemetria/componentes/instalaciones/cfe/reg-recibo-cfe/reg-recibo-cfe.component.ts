import {ChangeDetectionStrategy, Component, Inject, OnDestroy, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IReciboCfeD, IRecibosCfe} from '@telemetria/medidor-interface';
import {NumericValueType, RxwebValidators} from '@rxweb/reactive-form-validators';
import {InstalacionQueryService} from '@telemetria/query/instalacion-query.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {antesDeSubirArchivo, cargaDeArchivo} from '@shared/components/subidas/archivo-params';
import {TelemetriaState} from '@telemetria/telemetriaState';
import {Prefijos} from '@Config/enums';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-reg-recibo-cfe',
    templateUrl: './reg-recibo-cfe.component.html',
    styleUrls: ['./reg-recibo-cfe.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegReciboCfeComponent implements OnDestroy
{

    cargaDeArchivo = cargaDeArchivo(false);

    lista: any = [];
    estaCargando = false;
    validacionNumerica = RxwebValidators.numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true});
    modeloReciboCfe: IRecibosCfe = {ano: 0, costoKw: 0, dia: 0, imgRecibo: '', lectura: 0, mes: 0, pago: 0};
    subscripcion: Subscription = new Subscription();

    formRecibosCfe: FormGroup = this._fb.group(
        {
            fechaReg: ['', Validators.required],
            lectura: ['', [Validators.required, this.validacionNumerica]],
            costoKw: ['', [Validators.required, this.validacionNumerica]],
            pago: ['', [Validators.required, this.validacionNumerica]]
        });

    constructor(private _fb: FormBuilder, private _teleState: TelemetriaState, @Inject(MAT_DIALOG_DATA) public data: IReciboCfeD,
                private _instalacionQuery: InstalacionQueryService, private _dialogRef: MatDialog)
    {

    }

    regReciboCfe(): void
    {
        if (this.cargaDeArchivo.queue.length > 0)
        {
            this.estaCargando = true;
            this.cargaDeArchivo.onBeforeUploadItem = antesDeSubir =>
            {
                antesDeSubir.file.name = antesDeSubirArchivo(antesDeSubir.file.name, Prefijos.cfe);
            };
            this.cargaDeArchivo.uploadAll();

            this.cargaDeArchivo.onCompleteItem = arcSubCorr =>
            {
                const fecha = this.formRecibosCfe.get('fechaReg').value;
                this.modeloReciboCfe.ano = fecha._i.year;
                this.modeloReciboCfe.mes = fecha._i.month + 1;
                this.modeloReciboCfe.dia = fecha._i.date;
                this.modeloReciboCfe.lectura = parseFloat(this.formRecibosCfe.get('lectura').value);
                this.modeloReciboCfe.costoKw = parseFloat(this.formRecibosCfe.get('costoKw').value);
                this.modeloReciboCfe.pago = parseFloat(this.formRecibosCfe.get('pago').value);
                this.modeloReciboCfe.imgRecibo = arcSubCorr.file.name;

                this.subscripcion.add(this._teleState.regReciboCfe(this.data._id, this.data.medidor.medidor, this.modeloReciboCfe)
                    .subscribe((rec) =>
                    {
                        if (rec.mensaje.includes('encontrado'))
                        {
                            this.estaCargando = false;
                            this.cargaDeArchivo.clearQueue();
                            toastSweet(TipoAlerta.alerta, 'No puedes registrar el recibo porque ya hay uno con ese mes y ese dia', 5000);
                        } else
                        {
                            if (rec.estatus)
                            {
                                this.estaCargando = false;
                                toastSweet(TipoAlerta.satisfactorio, 'El recibo fue registrado con exito', 5000);
                                this.cerrarModal();
                            }
                        }
                    }));
            };

            this.cargaDeArchivo.onErrorItem = () =>
            {
                toastSweet(TipoAlerta.alerta, 'Ocurrio un error al intentar subir el documento vuelve a intentarlo', 5000);
            };
        } else
        {
            toastSweet(TipoAlerta.alerta, 'Selecciona un documento, para poder continuar con el registro', 5000);
        }
    }

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }
}
