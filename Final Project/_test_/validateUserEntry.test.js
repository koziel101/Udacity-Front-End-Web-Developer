import { validateUserEntry } from "../src/client/js/checkTextUser"

let str = '           '

describe("Testing the validateUserEntry functionality", () => {
    test("Testing a string without text", () => {
        expect(validateUserEntry(str)).toBe(false);
    }),
        test("Testing a user entry", () => {
            str = 'Los Angeles'
            expect(validateUserEntry(str)).toBe(true);
        })
});