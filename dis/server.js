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
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const App_1 = __importDefault(require("./App"));
const database_1 = __importDefault(require("./app/config/database"));
const socket_1 = __importDefault(require("./app/socket/socket"));
dotenv_1.default.config();
let server = http_1.default.createServer(App_1.default);
const PORT = process.env.PORT || 5000;
(0, socket_1.default)(server);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.default)();
        server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    });
}
main().catch((err) => {
    console.error("Error starting server:", err);
});
//# sourceMappingURL=server.js.map