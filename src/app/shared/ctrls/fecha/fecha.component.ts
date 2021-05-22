import {Component, forwardRef, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-fecha',
    templateUrl: './fecha.component.html',
    styleUrls: ['./fecha.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers:
        [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => FechaComponent),
                multi: true
            }
        ]
})
export class FechaComponent implements ControlValueAccessor
{
    valorActual: never;
    esDeshabilitado: boolean;
    onChange: (valor: never) => void;
    onTouch: (valor: never) => void;

    registerOnChange(fn: never): void
    {
        this.onChange = fn;
    }

    registerOnTouched(fn: never): void
    {
        this.onTouch = fn;
    }

    writeValue(valor: never): void
    {
        if (valor)
        {
            this.valorActual = valor;
        }
    }

    setDisabledState(isDisabled: boolean): void
    {
        this.esDeshabilitado = isDisabled;
    }
}
