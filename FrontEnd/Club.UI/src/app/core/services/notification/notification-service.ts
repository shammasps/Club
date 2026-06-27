import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationModel } from '../../../modules/models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationsSource =
    new BehaviorSubject<NotificationModel[]>([]);

  notifications$ =
    this.notificationsSource.asObservable();

  constructor() { }

  private show(

    type: 'success' | 'error' | 'warning' | 'info',

    title: string,

    message: string

  ) {

    const notification: NotificationModel = {

      id: Date.now(),

      type,

      title,

      message

    };

    const current = this.notificationsSource.value;

    this.notificationsSource.next([

      ...current,

      notification

    ]);

    setTimeout(() => {

      this.remove(notification.id);

    }, 3000);

  }

  success(message: string) {

    this.show(

      'success',

      'Success',

      message

    );

  }

  error(message: string) {

    this.show(

      'error',

      'Error',

      message

    );

  }

  warning(message: string) {

    this.show(

      'warning',

      'Warning',

      message

    );

  }

  info(message: string) {

    this.show(

      'info',

      'Information',

      message

    );

  }

  remove(id: number) {

    const current =

      this.notificationsSource.value;

    this.notificationsSource.next(

      current.filter(x => x.id !== id)

    );

  }

}