import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {DepartamentoState} from '@global/state/departamento.state';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-selec-depto-drop',
    templateUrl: './selec-depto-drop.component.html',
    styleUrls: ['./selec-depto-drop.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelecDeptoDropComponent implements OnInit, OnDestroy
{
    @Input() set multiple(v: boolean)
    {
        this._multiple = v;
    }

    @Output() deptos: EventEmitter<string[]> = new EventEmitter();
    _multiple = false;
    deptoSeleccion: string[] = [];
    subscripcion: Subscription = new Subscription();
    cargarDeptos: 'cargarDeptosDrop';

    constructor(public _deptosState: DepartamentoState)
    {
    }

    ngOnInit(): void
    {
        this.subscripcion.add(this._deptosState.listaDeptos().subscribe());
    }

    selectDepto(evento: string[]): void
    {
        if (evento.length > 0)
        {
            this.deptos.emit(evento);
        }
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }
}
