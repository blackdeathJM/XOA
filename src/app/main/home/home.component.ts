import {Component} from '@angular/core';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent
{
    toast(): void
    {
        // Swal.fire('toas funcionando', `<div>Que pasion</div>`, 'success');
        toastSweet(TipoAlerta.satisfactorio, 'mensajeadsaf basdfasd asdfa sdf asdfasdfasdfawerafasf a sdafas aseras a sdfae asdfea  asdf');
    }
}
