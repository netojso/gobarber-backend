"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
require("@modules/users/providers");
require("@shared/container/providers");
var AppointmentRepo_1 = __importDefault(require("@modules/appointments/infra/typeorm/repositories/AppointmentRepo"));
var UserRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repository/UserRepository"));
var UserTokenRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repository/UserTokenRepository"));
tsyringe_1.container.registerSingleton('AppointmentsRepository', AppointmentRepo_1.default);
tsyringe_1.container.registerSingleton('UsersRepository', UserRepository_1.default);
tsyringe_1.container.registerSingleton('UserTokenRepository', UserTokenRepository_1.default);
