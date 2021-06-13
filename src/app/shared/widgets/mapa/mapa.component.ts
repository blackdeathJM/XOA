import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {fuseAnimations} from '@plantilla/animations';

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class MapaComponent implements AfterViewInit, OnDestroy
{

    @ViewChild('mapa') divMapa: ElementRef;
    mapa: mapboxgl.Map;
    etiqueta: string;
    nivelZoom = 15;
    centro: [number, number] = [-100.93292035370479, 21.169707631250635];
    marcadores: mapboxgl.Marker;

    ngAfterViewInit(): void
    {
        this.mapa = new mapboxgl.Map({
            container: this.divMapa.nativeElement,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: this.centro,
            keyboard: true,
            zoom: this.nivelZoom,
            scrollZoom: false,
            boxZoom: true,
        }).addControl(new mapboxgl.AttributionControl({compact: true}));
        this.mapa.on('zoom', () => this.nivelZoom = this.mapa.getZoom());
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
        const nvoMarcador = new mapboxgl.Marker({
            color
        }).setLngLat(this.centro).setPopup(popup).addTo(this.mapa);
    }
}
