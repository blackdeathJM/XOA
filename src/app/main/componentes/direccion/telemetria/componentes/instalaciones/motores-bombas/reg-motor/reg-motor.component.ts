import {ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {TelemetriaState} from '@telemetria/telemetriaState';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {IAccEquipo, IMotor} from '@telemetria/equipo-electrico-interface';
import {fuseAnimations} from '@plantilla/animations';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';
import {validarNum} from '@services/validacionCampos';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';

@Component({
    selector: 'app-reg-motor',
    templateUrl: './reg-motor.component.html',
    styleUrls: ['./reg-motor.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fuseAnimations]
})
export class RegMotorComponent implements OnInit, OnDestroy, OnChanges
{
    @Input() set soloLectura(val: boolean)
    {
        this._soloLectura = val;
    }

    @Input() set ocultarAcciones(val: boolean)
    {
        this._ocultarAcciones = val;
    }

    @Input() set apariencia(val: MatFormFieldAppearance)
    {
        this._apariencia = val;
    }

    @Input() set motorSele(val: IMotor)
    {
        this._motorSele = val;
    }

    _soloLectura = false;
    _ocultarAcciones = false;
    _apariencia: MatFormFieldAppearance = 'legacy';
    _motorSele: IMotor;

    estaCargando = false;
    modeloMotor: IMotor;

    subscripcion: Subscription = new Subscription();

    formMotor: FormGroup = this._formBuilder.group({
        serie: [null, RxwebValidators.required()],
        marca: [null, RxwebValidators.required()],
        modelo: [null, RxwebValidators.required()],
        hp: [null, validarNum(false, {value: 3})],
        voltaje: [null, validarNum()],
        amperaje: [null, validarNum()],
        factPotencia: [null, validarNum(false, {value: 3})],
        eficiencia: [null, validarNum(false, {value: 3})],
        descripcion: [''],
        fechaInstalacion: ['', RxwebValidators.required()],
        observaciones: [''],
        activa: [true]
    });

    constructor(private _formBuilder: FormBuilder, private _dialogRef: MatDialog, private _teleState: TelemetriaState,
                @Optional() @Inject(MAT_DIALOG_DATA) private data: IAccEquipo)
    {
    }

    ngOnInit(): void
    {
        if (this.data)
        {
            this.formMotor.patchValue(this.data.equipo);
        }
    }

    regMotor(): void
    {
        this.estaCargando = true;
        this.modeloMotor = this.formMotor.value;
        if (this.data.nombreMutacion === 'regMotor')
        {
            this.modeloMotor.id = uuidv4().toUpperCase();
        } else
        {
            this.modeloMotor.id = this.data.equipo.id;
        }

        this.modeloMotor.serie = this.formMotor.get('serie').value.toUpperCase();
        this.modeloMotor.amperaje = Number(parseFloat(this.formMotor.get('amperaje').value).toFixed(2));
        this.modeloMotor.voltaje = Number(parseFloat(this.formMotor.get('voltaje').value).toFixed(2));
        this.modeloMotor.factPotencia = Number(parseFloat(this.formMotor.get('factPotencia').value).toFixed(2));
        this.modeloMotor.eficiencia = Number(parseFloat(this.formMotor.get('eficiencia').value).toFixed(2));
        this.modeloMotor.hp = Number(parseFloat(this.formMotor.get('hp').value).toFixed());
        this.modeloMotor.fechaInstalacion = moment(this.formMotor.get('fechaInstalacion').value).toISOString();
        this.modeloMotor.fechaRetiro = null;
        this.modeloMotor.imgEvidenciaInst = [];
        this.modeloMotor.imgEvidenciaRet = [];

        this.subscripcion.add(this._teleState[this.data.nombreMutacion](this.data._id, this.modeloMotor).subscribe((res) =>
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
        }, error => toastSweet(TipoAlerta.error, error, 5000)));
    }

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }

    ngOnChanges(): void
    {
        if (this._motorSele)
        {
            this.formMotor.patchValue(this._motorSele);
        }
    }
}

