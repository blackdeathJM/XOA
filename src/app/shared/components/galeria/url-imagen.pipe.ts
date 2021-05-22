import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {environment} from '@env/environment';

@Pipe({
    name: 'urlImagen'
})
export class UrlImagenPipe implements PipeTransform
{
    constructor(private sanitizer: DomSanitizer)
    {
    }

    transform(nombreArchivo: string, prefijo: string): SafeUrl
    {
        return this.sanitizer.bypassSecurityTrustUrl(`${environment.apiUrl}/${prefijo}?archivoUrl=${nombreArchivo}`);
    }
}
