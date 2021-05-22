import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AdmonUsuariosState} from '@usuarios/state/admon-usuarios.state';

@Component({
    selector: 'app-admon-usuario',
    templateUrl: './admon-usuario.component.html',
    styleUrls: ['./admon-usuario.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdmonUsuarioComponent implements OnInit
{
    constructor(private _usuarioState: AdmonUsuariosState)
    {
    }

    ngOnInit(): void
    {
        this._usuarioState.cargarUsuarios().subscribe();
    }
}
