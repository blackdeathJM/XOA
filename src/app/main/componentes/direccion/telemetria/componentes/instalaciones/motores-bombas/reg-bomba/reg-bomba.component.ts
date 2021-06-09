import {ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {Subscription} from 'rxjs';
import {IAccEquipo, IBomba} from '@telemetria/equipo-electrico-interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {validarNum} from '@services/validacionCampos';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {TelemetriaState} from '@telemetria/telemetriaState';
import {IResInstalacion} from '@telemetria/respuesta-interface';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';

@Component({
    selector: 'app-reg-bomba',
    templateUrl: './reg-bomba.component.html',
    styleUrls: ['./reg-bomba.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegBombaComponent implements OnInit, OnChanges, OnDestroy
{
    @Input() set soloLectura(val: boolean)
    {
        this._soloLectura = val;
    }

    @Input() set ocultarAcciones(val: boolean)
    {
        this._ocultarAcciones = val;
    }

    @Input() set bombaSele(val: IBomba)
    {
        this._bombaSele = val;
    }

    @Input() set apariencia(val: MatFormFieldAppearance)
    {
        this._apariencia = val;
    }

    _soloLectura = false;
    _ocultarAcciones = false;
    _bombaSele: IBomba;
    _apariencia: MatFormFieldAppearance = 'legacy';

    estaCargando = false;
    modeloBomba: IBomba;
    subscripcion: Subscription = new Subscription();

    formBomba: FormGroup = this._formBuilder.group({
        serie: [null, [RxwebValidators.required()]],
        marca: [null, [RxwebValidators.required()]],
        modelo: [null, [RxwebValidators.required()]],
        noImpulsores: [null, validarNum(false, {value: 3}, null, null)],
        rpm: [null, validarNum(false, {value: 5}, null, null)],
        tipo: [null, [RxwebValidators.required()]],
        diametro: [null, validarNum(true, null, null, null)],
        lts: [null, validarNum(true, {value: 3}, null, null)],
        descripcion: [''],
        eficiencia: [null, validarNum(false, {value: 3}, null, null)],
        fechaInstalacion: [null, [RxwebValidators.required()]],
        fechaRetiro: [null, [RxwebValidators.required()]],
        observaciones: [''],
        activa: [true]
    });

    constructor(private _formBuilder: FormBuilder, @Optional() @Inject(MAT_DIALOG_DATA) private data: IAccEquipo,
                private _teleState: TelemetriaState, private _dialogRef: MatDialog)
    {
    }

    ngOnInit(): void
    {
        if (this.data)
        {
            this.formBomba.patchValue(this.data.equipo);
        }
    }

    regBomba(): void
    {
        this.estaCargando = true;
        this.modeloBomba = this.formBomba.value;
        if (this.data.nombreMutacion === 'regBomba')
        {
            this.modeloBomba.id = uuidv4().toUpperCase();
        } else
        {
            this.modeloBomba.id = this.data.equipo.id;
        }
        this.modeloBomba.activa = true;
        this.modeloBomba.diametro = parseFloat(this.formBomba.get('diametro').value);
        this.modeloBomba.imgEvidenciaInst = [];
        this.modeloBomba.imgEvidenciaRet = [];
        this.modeloBomba.lts = parseFloat(this.formBomba.get('lts').value);
        this.modeloBomba.eficiencia = parseFloat(this.formBomba.get('eficiencia').value);
        this.modeloBomba.rpm = parseFloat(this.formBomba.get('rpm').value);
        this.modeloBomba.noImpulsores = parseInt(this.formBomba.get('noImpulsores').value, 10);
        this.modeloBomba.fechaInstalacion = moment(this.formBomba.get('fechaInstalacion').value).toISOString();

        this._teleState[this.data.nombreMutacion](this.data._id, this.modeloBomba).subscribe((res: IResInstalacion) =>
        {
            if (res.documento)
            {
                this.estaCargando = false;
                toastSweet(TipoAlerta.satisfactorio, res.mensaje, 5000);
                this.cerrarModal();
            } else
            {
                this.estaCargando = false;
                toastSweet(TipoAlerta.error, res.mensaje, 5000);
                this.cerrarModal();
            }
        }, error => toastSweet(TipoAlerta.error, error, 5000));
    }

    ngOnChanges(): void
    {
        if (this._bombaSele)
        {
            this.formBomba.patchValue(this._bombaSele);
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
