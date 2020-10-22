import { Injector, Type } from "@angular/core";

export class ServiceLocator {
  static injector: Injector;

  static inject<T>(service: Type<T>) {
    return ServiceLocator.injector.get(service);
  }
}