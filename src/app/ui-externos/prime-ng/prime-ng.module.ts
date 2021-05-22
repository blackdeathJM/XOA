import {NgModule} from '@angular/core';
import {TableModule} from 'primeng/table';
import {BlockUIModule} from 'primeng/blockui';
import {RippleModule} from 'primeng/ripple';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {PaginatorModule} from 'primeng/paginator';
import {SkeletonModule} from 'primeng/skeleton';
import {AvatarModule} from 'primeng/avatar';

@NgModule({
    declarations: [],
    imports:
        [
            TableModule,
            RippleModule,
            BlockUIModule,
            PaginatorModule,
            SkeletonModule,
            AvatarModule,
            PopoverModule.forRoot(),
        ],
    exports:
        [
            TableModule,
            AvatarModule,
            RippleModule,
            BlockUIModule,
            PopoverModule,
            SkeletonModule,
            PaginatorModule,
        ]
})
export class PrimeNgModule
{
}
