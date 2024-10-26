"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResMessage = exports.ReqMessage = void 0;
var ReqMessage;
(function (ReqMessage) {
    ReqMessage["REG"] = "reg";
    ReqMessage["CREATE_ROOM"] = "create_room";
    ReqMessage["ADD_USER_TO_ROOM"] = "add_user_to_room";
    ReqMessage["ADD_SHIPS"] = "add_ships";
    ReqMessage["ATTACK"] = "attack";
    ReqMessage["RANDOM_ATTACK"] = "randomAttack";
})(ReqMessage || (exports.ReqMessage = ReqMessage = {}));
var ResMessage;
(function (ResMessage) {
    ResMessage["REG"] = "reg";
    ResMessage["UPDATE_WINNERS"] = "update_winners";
    ResMessage["CREATE_GAME"] = "create_game";
    ResMessage["UPDATE_ROOM"] = "update_room";
    ResMessage["START_GAME"] = "start_game";
    ResMessage["ATTACK_FEEDBACK"] = "attack_feedback";
    ResMessage["TURN"] = "turn";
    ResMessage["FINISH"] = "finish";
})(ResMessage || (exports.ResMessage = ResMessage = {}));
//# sourceMappingURL=types.js.map