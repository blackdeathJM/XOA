import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {IOrdenTrabajo, TipoAnomalia} from '../../../models/ordenes-trabajo';
import anomaliasTele from '@organismo/anomaliasTele.json';
import anomaliasAreaT from '@organismo/anomaliasAreaT.json';

interface IAnomalia
{
    anomalia: string;
}

@Component({
    selector: 'app-detalles-grales',
    templateUrl: './detalles-grales.component.html',
    styleUrls: ['./detalles-grales.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers:
        [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DetallesGralesComponent),
                multi: true
            }
        ]
})
export class DetallesGralesComponent implements OnInit, ControlValueAccessor
{
    @Input() set tipoAnomalia(v: number)
    {
        this._tipoAnomalia = v;
    }

    anomalias: IAnomalia[] = [];

    anomalia: string;
    comentarios: string;
    prioridad = 'Normal';
    valorOrden: IOrdenTrabajo =
        {
            ejecutadaPor: null,
            fechaEjecucion: null,
            comentarios: '',
            creadaPor: '',
            departamentoId: '',
            anomalia: '',
            estatus: '',
            fechaOrden: '',
            observaciones: '',
            ordenAtencion: '',
            prioridad: this.prioridad,
            tipoOrden: '',
        };
    esDeshabilitado: boolean;
    onChange: (valor: any) => void;
    onTouch: () => void;
    private _tipoAnomalia: number;

    ngOnInit(): void
    {
        console.log('anomalia', this._tipoAnomalia);
        switch (this._tipoAnomalia)
        {
            case TipoAnomalia.tele:
                this.anomalias = anomaliasTele;
                break;
            case TipoAnomalia.areaT:
                this.anomalias = anomaliasAreaT;
                break;
        }
    }

    registerOnChange(fn: any): void
    {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void
    {
        this.onTouch = fn;
    }

    writeValue(obj: IOrdenTrabajo): void
    {
        if (obj)
        {
            this.valorOrden = obj;
        }
    }

    setDisabledState(isDisabled: boolean): void
    {
        this.esDeshabilitado = isDisabled;
    }

    onDescProblema(): void
    {
        this.valorOrden.anomalia = this.anomalia;
        this.onChange(this.valorOrden);
    }

    onObs(): void
    {
        this.valorOrden.comentarios = this.comentarios;
        this.onChange(this.valorOrden);
    }

    onPrioridad(): void
    {
        this.valorOrden.prioridad = this.prioridad;
        this.onChange(this.valorOrden);
    }
}
