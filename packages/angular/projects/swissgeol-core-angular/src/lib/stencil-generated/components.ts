/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import { Components } from 'swissgeol-core';


@ProxyCmp({
  inputs: ['color', 'isActive', 'isDisabled', 'justify', 'variant']
})
@Component({
  standalone: false,
  selector: 'sgc-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'isActive', 'isDisabled', 'justify', 'variant'],
})
export class SgcButton {
  protected el: HTMLSgcButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgcButton extends Components.SgcButton {}


@ProxyCmp({
  inputs: ['name', 'size']
})
@Component({
  standalone: false,
  selector: 'sgc-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['name', 'size'],
})
export class SgcIcon {
  protected el: HTMLSgcIconElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SgcIcon extends Components.SgcIcon {}


