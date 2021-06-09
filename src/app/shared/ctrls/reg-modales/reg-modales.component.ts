import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-reg-modales',
    templateUrl: './reg-modales.component.html',
    styleUrls: ['./reg-modales.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegModalesComponent
{

    @Input() set cargandoDatos(v: boolean)
    {
        this._cargandoDatos = v;
    }

    @Input() set deshabilitar(v: boolean)
    {
        this._deshabilitar = v;
    }

    @Output() registro = new EventEmitter<boolean>();
    @Output() cancelar = new EventEmitter<boolean>();

    _cargandoDatos = false;
    _deshabilitar = false;

    cancelarReg(): void
    {
        this.cancelar.emit(true);
    }

    reg(): void
    {
        this.registro.emit(true);
    }
}
