import { agreementAnalysis } from "../src/client/js/analyseAgreement"

let str = 'P+'

describe("Testing the agreementAnalysis functionality", () => {
    test("Testing the P+ result", () => {
        expect(agreementAnalysis(str)).toBe("Strong Positive");
    }),
        test("Testing the P result", () => {
            str = 'P'
            expect(agreementAnalysis(str)).toBe("Positive");
        }),
        test("Testing the P result", () => {
            str = 'NEU'
            expect(agreementAnalysis(str)).toBe("Neutral");
        }),
        test("Testing the P result", () => {
            str = 'N'
            expect(agreementAnalysis(str)).toBe("Negative");
        }),
        test("Testing the P result", () => {
            str = 'N+'
            expect(agreementAnalysis(str)).toBe("Strong Negative");
        }),
        test("Testing the P result", () => {
            str = 'NONE'
            expect(agreementAnalysis(str)).toBe("No Sentiment");
        }),
        test("Testing an invalid entry", () => {
            str = 'INVALID SENTIMENT TO TEST'
            expect(agreementAnalysis(str)).toBe("Error on sentiment");
        })
});