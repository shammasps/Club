  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { NotificationService } from '../../../core/services/notification/notification-service';
  import { NotificationModel } from '../../../modules/models/notification.model';
  import { ChangeDetectorRef } from '@angular/core';

  @Component({
    selector: 'app-notification',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './notification.html',
    styleUrl: './notification.css'
  })
  
export class Notification implements OnInit {


    notifications: NotificationModel[] = [];

    constructor(
      private notificationService: NotificationService,
       private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
    this.notificationService.notifications$
      .subscribe(res => {

        this.notifications = [...res]; // <-- change this line
        this.cdr.detectChanges();

      });

  }

    close(id: number) {

      this.notificationService.remove(id);

    }

  }