import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-iploag-subida-multiple',
    templateUrl: './iploag-subida-multiple.component.html',
    styleUrls: ['./iploag-subida-multiple.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IploagSubidaMultipleComponent
{
    multiple = false;
    tamano: 200000;
    limiteArchivos: 10;
    controlArchivos = new FormControl(null);
    formCargaArchivos = new FormGroup({archivos: this.controlArchivos});

    subir(): void
    {
        console.log('formulario subir', this.formCargaArchivos.get('archivos'));
    }
}
