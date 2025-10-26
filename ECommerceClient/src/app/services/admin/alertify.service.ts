import { Injectable } from '@angular/core';
declare var alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, options:Partial<AlertifyOptions>){ {
    alertify.set('notifier','delay',options.delay);
    alertify.set('notifier','position',options.position);
const msg = alertify[options.messageType!.toLowerCase()](message);
}
}}
    
export enum MessageType {
  Success = "Success",
  Error = "Error",
  Warning = "Warning",
  Message = "Message",
  Notify = "Notify"
}

export enum Position {
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
  TopCenter = "top-center",
  BottomCenter = "bottom-center"
}

export class AlertifyOptions {
  message!: string
  messageType: MessageType = MessageType.Notify;
  position: Position = Position.TopRight;
  delay: number = 3;
}