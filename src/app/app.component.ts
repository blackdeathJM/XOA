import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {FuseConfigService} from '../@fuse/services/config.service';
import {Platform} from '@angular/cdk/platform';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(@Inject(DOCUMENT) private document: any, private _fuseConfigService: FuseConfigService, private _platform: Platform,
                private _router: Router, private _ar: ActivatedRoute)
    {
        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS)
        {
            this.document.body.classList.add('is-mobile');
        }
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) =>
            {
                this.fuseConfig = config;
                // Boxed
                if (this.fuseConfig.layout.width === 'boxed')
                {
                    this.document.body.classList.add('boxed');
                } else
                {
                    this.document.body.classList.remove('boxed');
                }
                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next('');
        this._unsubscribeAll.complete();
    }
}
