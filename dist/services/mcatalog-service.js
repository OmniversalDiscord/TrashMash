"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCatalogService = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const sheet_id = "116LycNEkWChmHmDK2HM2WV85fO3p3YTYDATpAthL8_g";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/Main%20Catalog?key=AIzaSyDlvXmAhL_BbD6f6xtej_naf4oxgHOLXns`;
class MCatalogService {
    static getCatalog() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, node_fetch_1.default)(url).then((res) => { return res.json(); })
                .catch((err) => { throw new Error(err); });
        });
    }
}
exports.MCatalogService = MCatalogService;
//# sourceMappingURL=mcatalog-service.js.map