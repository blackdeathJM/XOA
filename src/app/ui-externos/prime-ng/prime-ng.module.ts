import {AvatarModule} from 'primeng/avatar';
import {TableModule} from 'primeng/table';
import {RippleModule} from 'primeng/ripple';
import {PaginatorModule} from 'primeng/paginator';
import {SkeletonModule} from 'primeng/skeleton';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {NgModule} from '@angular/core';
import {DividerModule} from 'primeng/divider';
import {FieldsetModule} from 'primeng/fieldset';

@NgModule({
    declarations: [],
    imports:
        [
            TableModule,
            RippleModule,
            DividerModule,
            PaginatorModule,
            SkeletonModule,
            AvatarModule,
            FieldsetModule,
            PopoverModule.forRoot(),
        ],
    exports:
        [
            TableModule,
            AvatarModule,
            RippleModule,
            PopoverModule,
            DividerModule,
            FieldsetModule,
            SkeletonModule,
            PaginatorModule,
        ]
})
export class PrimeNgModule
{
}
