export interface NotificationModel {

  id: number;

  type: 'success' | 'error' | 'warning' | 'info';

  title: string;

  message: string;

}