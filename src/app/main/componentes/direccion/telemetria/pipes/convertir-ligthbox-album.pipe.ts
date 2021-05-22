import {Pipe, PipeTransform} from '@angular/core';
import {IAlbum} from 'ngx-lightbox';
import {environment} from '@env/environment';

@Pipe({
    name: 'convertirLigthboxAlbum'
})
export class ConvertirLigthboxAlbumPipe implements PipeTransform
{
    lightboxAlbum = [];

    transform(arreglo: string[] = [], prefijo: string): Array<IAlbum>
    {
        this.lightboxAlbum = [];
        if (arreglo.length > 0)
        {
            arreglo.forEach(i =>
            {
                const src = `${environment.apiUrl}/${prefijo}?archivoUrl=${i}`;
                this.lightboxAlbum.push({src, thumb: src, caption: ''});
            });
            return this.lightboxAlbum;
        } else
        {
            return [];
        }
    }
}
