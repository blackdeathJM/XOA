import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
    selector: 'app-buscar-por-fechas',
    templateUrl: './buscar-por-fechas.component.html',
    styleUrls: ['./buscar-por-fechas.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuscarPorFechasComponent
{
    @Output() rangoFechas: EventEmitter<string[]> = new EventEmitter<string[]>();
    rango = new FormGroup({ iniciar: new FormControl(), fin: new FormControl() });
    fechaMinima: Date;
    fechaMaxima: Date;

    constructor()
    {
        const anoActual = new Date().getFullYear();
        this.fechaMinima = new Date(anoActual - 20, 0, 1);
        this.fechaMaxima = new Date(anoActual + 1, 11, 31);
    }

    busquedaEntreFechas(): void
    {
        const fechaInicial = moment(this.rango.get('iniciar').value._d).toISOString();
        const fechaFinal = moment(this.rango.get('fin').value._d).toISOString();
        this.rangoFechas.emit([fechaInicial, fechaFinal]);
    }
}
