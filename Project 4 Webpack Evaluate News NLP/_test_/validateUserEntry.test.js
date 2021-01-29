import { validateUserEntry } from "../src/client/js/checkTextUser"

let str = '           '

describe("Testing the validateUserEntry functionality", () => {
    test("Testing a string without text", () => {
        expect(validateUserEntry(str)).toBe(0);
    }),
        test("Testing an invalid url", () => {
            str = 'wje.eafafa.feaga'
            expect(validateUserEntry(str)).toBe(1);
        }),
        test("Testing an invalid url", () => {
            str = 'www.google.com'
            expect(validateUserEntry(str)).toBe(2);
        })
});