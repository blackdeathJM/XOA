import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TIPOS_DOC} from '@usuarios/componentes/documentacion/models/tiposDoc.interface';


@Component({
    selector: 'app-seleccionar-tipo-doc',
    templateUrl: './seleccionar-tipo-doc.component.html',
    styleUrls: ['./seleccionar-tipo-doc.component.scss'],
    providers:
        [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => SeleccionarTipoDocComponent),
                multi: true
            }
        ]
})
export class SeleccionarTipoDocComponent implements ControlValueAccessor
{
    tiposDoc: string[] = Object.values(TIPOS_DOC);

    valorActual = '';
    isDisabled: boolean;
    onTouch: () => void;

    onChange: (valor: string) => void = () =>
    {
    }


    writeValue(v: string): void
    {
        this.valorActual = v ? v : '';
    }

    registerOnChange(fn: any): void
    {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void
    {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void
    {
        this.isDisabled = isDisabled;
    }

    cambioValor(evento: string): void
    {
        this.valorActual = evento;
        this.onChange(evento);
    }
}
