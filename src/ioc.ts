import 'reflect-metadata';
import { Container, decorate, inject, injectable, interfaces } from 'inversify';
import {
  autoProvide,
  buildProviderModule,
  fluentProvide,
  provide,
} from 'inversify-binding-decorators';
import { Controller } from '@tsoa/runtime';

const iocContainer = new Container();
decorate(injectable(), Controller);

const buildProvider = () => iocContainer.load(buildProviderModule());

const provideNamed = (
  identifier:
    | string
    | symbol
    | interfaces.Newable<any>
    | interfaces.Abstract<any>,
  name: string,
) =>
  fluentProvide(identifier)
    .whenTargetNamed(name)
    .done();

const provideSingleton = (
  identifier:
    | string
    | symbol
    | interfaces.Newable<any>
    | interfaces.Abstract<any>
    | interfaces.ServiceIdentifier<any>,
) =>
  fluentProvide(identifier)
    .inSingletonScope()
    .done();

export {
  iocContainer,
  autoProvide,
  buildProvider,
  provide,
  provideSingleton,
  provideNamed,
  inject,
};