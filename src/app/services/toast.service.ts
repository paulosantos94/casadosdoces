import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);
  public toasts$: Observable<Toast[]> = this.toasts.asObservable();
  private idCounter = 0;

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) {
    const toast: Toast = {
      id: ++this.idCounter,
      message,
      type,
      duration
    };

    const current = this.toasts.getValue();
    this.toasts.next([...current, toast]);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(toast.id);
      }, duration);
    }

    return toast.id;
  }

  success(message: string, duration?: number) {
    return this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    return this.show(message, 'error', duration);
  }

  info(message: string, duration?: number) {
    return this.show(message, 'info', duration);
  }

  remove(id: number) {
    const current = this.toasts.getValue();
    this.toasts.next(current.filter(t => t.id !== id));
  }

  clear() {
    this.toasts.next([]);
  }
}

