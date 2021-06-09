import {ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NumericValueType, RxwebValidators} from '@rxweb/reactive-form-validators';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {IInstalacion} from '@telemetria/instalacion-interface';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {InstalacionQueryService} from '@telemetria/query/instalacion-query.service';
import {Subscription} from 'rxjs';
import {TipoAlerta} from '@shared/alerts/values.config';
import {toastSweet} from '@shared/alerts/toasts';
import {TelemetriaState} from '@telemetria/telemetriaState';
import moment from 'moment';

@Component({
    selector: 'app-reg-instalacion',
    templateUrl: './reg-instalacion.component.html',
    styleUrls: ['./reg-instalacion.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegInstalacionComponent implements OnDestroy, OnInit, OnChanges
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

    @Input() set instSele(val: IInstalacion)
    {
        this._instSele = val;
    }

    @Input() clase = 'baseDiv';
    _soloLectura = false;
    _ocultarAcciones = false;
    _apariencia: MatFormFieldAppearance = 'legacy';
    _instSele: IInstalacion;

    estaCargando = false;
    modeloInstalacion: IInstalacion;

    subscripcion: Subscription = new Subscription();
    validaciones = [Validators.required, RxwebValidators.numeric({acceptValue: NumericValueType.PositiveNumber, allowDecimal: true})];
    formInstalacion = this._formBuilder.group({
        _id: [],
        nombre: ['', Validators.required],
        direccion: ['', Validators.required],
        noInstalacion: [0, this.validaciones],
        profPozo: [0, this.validaciones],
        diamPerfo: [0, this.validaciones],
        diamAdeme: [0, this.validaciones],
        diamColumna: [0, this.validaciones],
        longColumna: [0, this.validaciones],
        fechaReg: ['', Validators.required],
        fechaRet: [null],
    });

    constructor(private _formBuilder: FormBuilder, private _dialogRef: MatDialog, private _instQuery: InstalacionQueryService,
                private _instState: TelemetriaState, @Optional() @Inject(MAT_DIALOG_DATA) public instYconsulta: [string, IInstalacion])
    {
    }

    ngOnInit(): void
    {
        if (this.instYconsulta !== null && this.instYconsulta[1] !== null)
        {
            this.formInstalacion.patchValue(this.instYconsulta[1]);
        }
    }

    regEditInstalacion(): void
    {
        this.estaCargando = true;
        this.modeloInstalacion =
            {
                _id: this.formInstalacion.get('_id').value,
                longColumna: parseFloat(this.formInstalacion.get('longColumna').value),
                diamAdeme: parseFloat(this.formInstalacion.get('diamAdeme').value),
                diamColumna: parseFloat(this.formInstalacion.get('diamColumna').value),
                diamPerfo: parseFloat(this.formInstalacion.get('diamPerfo').value),
                direccion: this.formInstalacion.get('direccion').value,
                noInstalacion: parseInt(this.formInstalacion.get('noInstalacion').value, 10),
                nombre: this.formInstalacion.get('nombre').value,
                profPozo: parseFloat(this.formInstalacion.get('profPozo').value),
                fechaReg: moment(this.formInstalacion.value.fechaReg).toISOString(),
                fechaRet: moment(this.formInstalacion.value.fechaRet).toISOString()
            };

        this.subscripcion.add(this._instState[this.instYconsulta[0]](this.modeloInstalacion).subscribe(instalacion =>
        {
            if (instalacion.estatus)
            {
                this.estaCargando = false;
                toastSweet(TipoAlerta.satisfactorio, instalacion.mensaje, 5000);
                this.cerrarModal();
            } else
            {
                this.estaCargando = false;
                toastSweet(TipoAlerta.error, instalacion.mensaje, 5000);
                this.cerrarModal();
            }
        }, error =>
        {
            toastSweet(TipoAlerta.error, 'Ocurrio un error al tratar de registrar la instalacion: ' + error, 5000);
            this.cerrarModal();
        }));
    }

    ngOnChanges(): void
    {
        if (this._instSele)
        {
            this.formInstalacion.patchValue(this._instSele);
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
