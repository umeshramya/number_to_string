"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hindi = exports.marathi = exports.telagu = exports.kananda = exports.english = exports.NumberToWord = void 0;
const hundred_1 = __importDefault(require("./classes/hubndreds/hundred"));
const language_1 = require("./config/language");
Object.defineProperty(exports, "english", { enumerable: true, get: function () { return language_1.english; } });
Object.defineProperty(exports, "kananda", { enumerable: true, get: function () { return language_1.kananda; } });
Object.defineProperty(exports, "telagu", { enumerable: true, get: function () { return language_1.telagu; } });
Object.defineProperty(exports, "marathi", { enumerable: true, get: function () { return language_1.marathi; } });
Object.defineProperty(exports, "hindi", { enumerable: true, get: function () { return language_1.hindi; } });
class NumberToWord {
    constructor(lan = language_1.english) {
        /**
         * This function converts number into comaseparted string array
         * @param _number  "LakhsAndCrore" | "MillionAndBillion"
         * @param style
         * @returns string[]
         */
        this.convertComaSepartedArray = (_number, style = "LakhsAndCrore") => {
            let numberString = `${_number}`;
            let ret = "";
            let hundradpart = numberString.slice(numberString.length - 3, numberString.length);
            numberString = numberString.slice(0, numberString.length - 3);
            let stringArray = [];
            numberString = numberString.split("").reverse().join("");
            if (numberString.length > 0) {
                if (style === "MillionAndBillion") {
                    let loop = true;
                    let index = 0;
                    while (loop) {
                        if (index < numberString.length) {
                            let temp = numberString.substring(index, index + 3);
                            stringArray.push(temp);
                            index = index + 3;
                        }
                        else {
                            loop = false;
                        }
                    }
                }
                else {
                    let loop = true;
                    let index = 0;
                    while (loop) {
                        if (index < numberString.length) {
                            let temp = numberString.substring(index, index + 2);
                            stringArray.push(temp);
                            index = index + 2;
                        }
                        else {
                            loop = false;
                        }
                    }
                }
            }
            let RetArray = stringArray.map(el => {
                return el.split("").reverse().join("");
            });
            RetArray.reverse().push(hundradpart);
            return RetArray;
        };
        /**
         * This function converts number into comaseparted string
         * @param _number  "LakhsAndCrore" | "MillionAndBillion"
         * @param style
         * @returns string
         */
        this.convertToComaSeparetedString = (_number, style = "LakhsAndCrore") => {
            return this.convertComaSepartedArray(_number, style).toString();
        };
        this._lan = lan;
    }
    getWord(_number, _style = "LakhsAndCrore") {
        let ret = "";
        let hundrad = new hundred_1.default(this._lan);
        let numberArray = this.convertComaSepartedArray(_number, _style);
        console.log(numberArray);
        let numberStringArray = numberArray.map((el, i) => {
            let numberWord = hundrad.getWord(parseInt(el));
            let place = "";
            if (_style === "LakhsAndCrore" && i < numberArray.length - 1) {
                place = this._lan.crore_lakhs[numberArray.length - 1 - i];
            }
            else if (_style === "MillionAndBillion" && i < numberArray.length - 1) {
                place = this._lan.million_billions[numberArray.length - 1 - i];
            }
            return `${numberWord} ${place}`;
        });
        numberStringArray.forEach(el => {
            ret = ret + " " + el;
        });
        return ret;
    }
}
exports.NumberToWord = NumberToWord;
//# sourceMappingURL=index.js.map