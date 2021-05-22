import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {IAlbum, IEvent, Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent} from 'ngx-lightbox';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-galeria',
    templateUrl: './galeria.component.html',
    styleUrls: ['./galeria.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GaleriaComponent
{
    @Input() set prefijo(valor: string)
    {
        this._prefijo = valor;
    }

    @Input() set album(valor: IAlbum[])
    {
        this._album = valor;
    }

    subscripcion: Subscription = new Subscription();
    _prefijo: string;
    _album: IAlbum[];

    constructor(private lightbox: Lightbox, private lightboxEvent: LightboxEvent, private lightboxConfig: LightboxConfig, private sanitizer: DomSanitizer)
    {
        this._album = this._album ? this._album : [];
    }

    obtenerUrlSanitizada(url: string): SafeUrl
    {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    abrir(index: number): void
    {
        this.subscripcion.add(this.lightboxEvent.lightboxEvent$.subscribe((evento: IEvent) => this.eventoRecibido(evento)));

        this.lightbox.open(this._album, index, {wrapAround: true, showImageNumberLabel: true});
    }

    eventoRecibido(evento: IEvent): void
    {
        if (evento.id === LIGHTBOX_EVENT.CLOSE)
        {
            this.subscripcion.unsubscribe();
        }
    }
}
