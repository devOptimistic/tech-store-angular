import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Toaster } from './app/services/toaster';

// Newer Node versions ship an experimental `localStorage` that shadows jsdom's and is unusable
// without a file flag. Replace it with a simple in-memory implementation for every test.
class MemoryStorage implements Storage {
  #data = new Map<string, string>();
  get length() {
    return this.#data.size;
  }
  clear() {
    this.#data.clear();
  }
  getItem(key: string) {
    return this.#data.get(key) ?? null;
  }
  key(index: number) {
    return [...this.#data.keys()][index] ?? null;
  }
  removeItem(key: string) {
    this.#data.delete(key);
  }
  setItem(key: string, value: string) {
    this.#data.set(key, String(value));
  }
}

for (const target of [globalThis, globalThis.window].filter(Boolean)) {
  Object.defineProperty(target, 'localStorage', { value: new MemoryStorage(), configurable: true, writable: true });
}

// Providers almost every component needs; individual specs can still override them.
beforeEach(() => {
  localStorage.clear();
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      { provide: Toaster, useValue: { success: vi.fn(), error: vi.fn(), warning: vi.fn(), info: vi.fn() } },
      { provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: { close: vi.fn(), id: 'test-dialog' } },
    ],
  });
});
