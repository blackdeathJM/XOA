import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {fuseAnimations} from '@plantilla/animations';
import {GralesServices, IMapa} from '@services/grales.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class MapaComponent implements AfterViewInit, OnDestroy, OnInit
{
    @ViewChild('mapa') divMapa: ElementRef;

    datosMapa: IMapa;
    mapa: mapboxgl.Map;
    sub: Subscription = new Subscription();

    constructor(private _gralesS: GralesServices)
    {
    }

    ngOnInit(): void
    {

    }

    ngAfterViewInit(): void
    {
        this.mapa = new mapboxgl.Map({
            container: this.divMapa.nativeElement,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: this.datosMapa.centro,
            keyboard: true,
            zoom: this.datosMapa.zoom,
            scrollZoom: true,
            boxZoom: true,
        }).addControl(new mapboxgl.AttributionControl({compact: true}));
        this.mapa.on('zoom', () => this.datosMapa.zoom = this.mapa.getZoom());
        this.agregarMarcador();
    }

    zoom(evento: number): void
    {
        this.mapa.zoomTo(evento);
    }

    ngOnDestroy(): void
    {
        this.mapa.off('zoom', () =>
        {
        });
    }

    agregarMarcador(): void
    {
        const color = '#xxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
        const popup = new mapboxgl.Popup({
            offset: 25
        }).setText('Sistema municipal de agua potable y alcantarillado');
        new mapboxgl.Marker({
            color
        }).setLngLat(this.datosMapa.centro).setPopup(popup).addTo(this.mapa);
    }
}
