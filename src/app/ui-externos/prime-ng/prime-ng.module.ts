import {AvatarModule} from 'primeng/avatar';
import {TableModule} from 'primeng/table';
import {RippleModule} from 'primeng/ripple';
import {BlockUIModule} from 'primeng/blockui';
import {PaginatorModule} from 'primeng/paginator';
import {SkeletonModule} from 'primeng/skeleton';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {NgModule} from '@angular/core';

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
