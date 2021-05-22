import {InjectionToken} from '@angular/core';
import {IWidget} from './widget.interface';

export const WIDGET = new InjectionToken<IWidget>('widget');
