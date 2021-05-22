import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IResUsuario, IUsuario} from '@modelosUsuarios/usuario.interface';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AdmonUsuariosState} from '@usuarios/state/admon-usuarios.state';


@Component({
    selector: 'app-seleccionar-usuario',
    templateUrl: './seleccionar-usuario.component.html',
    styleUrls: ['./seleccionar-usuario.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeleccionarUsuarioComponent implements OnInit
{
    @Input() set multiple(v: boolean)
    {
        this._multiple = v;
    }

    @Output() emitirUsuarios: EventEmitter<string[]> = new EventEmitter<string[]>();
    cargarUsuarios$: Observable<IUsuario[]>;
    _multiple = false;
    usuariosSeleccionados: string[] = [];

    constructor(private _admonUsuarioState: AdmonUsuariosState)
    {
    }

    ngOnInit(): void
    {
        this.cargarUsuarios$ = this._admonUsuarioState.cargarUsuarios().pipe(map((usuarios: IResUsuario) =>
            usuarios.documentos, error => toastSweet(TipoAlerta.error, `Ha ocurrido un error al cargar los usuarios: ${error}`)));
    }

    enviarUsuarios(): void
    {
        this.emitirUsuarios.emit(this.usuariosSeleccionados);
    }
}
