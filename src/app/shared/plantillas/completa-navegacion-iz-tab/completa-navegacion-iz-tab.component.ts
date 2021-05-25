import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {fuseAnimations} from '@plantilla/animations';

@Component({
    selector: 'app-completa-navegacion-iz-tab',
    templateUrl: './completa-navegacion-iz-tab.component.html',
    styleUrls: ['./completa-navegacion-iz-tab.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fuseAnimations]
})
export class CompletaNavegacionIzTabComponent
{

    constructor(private _fuseSidebarService: FuseSidebarService)
    {
    }

    @Input() barraHerramientas = true;

    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

}
