import {Component, ViewEncapsulation} from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {Meta, MetaDefinition, Title} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {fuseAnimations} from '../../../../@fuse/animations';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ContentComponent {
    titulo: string;
    icono: string;

    constructor(private _router: Router, private titutlo: Title, private meta: Meta) {
        this.obternerDatosRuta().subscribe
        (datos => {
                this.titulo = datos.titulo;
                this.icono = datos.icono;
            }
        );

        // agregar metatag en el index.action.ts
        const metaTag: MetaDefinition =
            {
                name: 'description', // esta descripcion se puede agregar en las rutas
                content: this.titulo
            };
        this.meta.updateTag(metaTag);
    }

    obternerDatosRuta(): Observable<any> {
        return this._router.events.pipe(
            filter(evento => evento instanceof ActivationEnd),
            filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
            map((evento: ActivationEnd) => evento.snapshot.data)
        );
    }
}
