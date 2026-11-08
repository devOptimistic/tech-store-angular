import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Header } from "./layout/header/header";
import { Footer } from "./layout/footer/footer";
import { CompareBar } from "./components/compare-bar/compare-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CompareBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tech-store-angular');

  #lastPath: string | undefined;

  constructor() {
    // Scroll to the top on real page changes only: changing a filter or page number
    // only touches the query string and must keep the scroll position.
    inject(Router).events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(e => {
        const path = e.urlAfterRedirects.split(/[?#]/)[0];
        if (path !== this.#lastPath && !e.urlAfterRedirects.includes('#')) {
          window.scrollTo({ top: 0 });
        }
        this.#lastPath = path;
      });
  }
}
