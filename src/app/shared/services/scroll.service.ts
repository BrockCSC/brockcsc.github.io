import { DOCUMENT } from '@angular/common';
import {
  ComponentFactoryResolver,
  HostListener,
  inject,
  Inject,
  Injectable,
  InjectionToken,
  OnDestroy,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

export const WINDOW = new InjectionToken<Window>(
  'An abstraction over global window object',
  {
    factory: () => {
      const { defaultView } = inject(DOCUMENT);

      if (!defaultView) {
        throw new Error('Window is not available');
      }

      return defaultView;
    },
  }
);

import { fromEventPattern, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrollService implements OnDestroy {
  private _destroy$ = new Subject();

  public onScroll$: Observable<Event>;
  public scrollPercent$: Observable<number>;
  public scrollY$: Observable<number>;

  getScrollPercent() {
    const h = this.document.documentElement;
    const b = this.document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';

    return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
  }

  constructor(
    private rendererFactory2: RendererFactory2,
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document
  ) {
    const renderer = this.rendererFactory2.createRenderer(null, null);

    this.createOnScrollObservable(renderer);
    this.scrollPercent$ = this.onScroll$.pipe(
      map(() => {
        return this.getScrollPercent();
      })
    );
    this.scrollY$ = this.onScroll$.pipe(
      map(() => {
        return this.window.scrollY;
      })
    );
  }

  ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private createOnScrollObservable(renderer: Renderer2) {
    let removeScrollEventListener: () => void;
    const createScrollEventListener = (
      handler: (e: Event) => boolean | void
    ) => {
      removeScrollEventListener = renderer.listen(
        'document',
        'scroll',
        handler
      );
    };

    this.onScroll$ = fromEventPattern<Event>(createScrollEventListener, () =>
      removeScrollEventListener()
    ).pipe(takeUntil(this._destroy$));
  }
}
