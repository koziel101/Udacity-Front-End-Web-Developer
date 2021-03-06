function agreementAnalysis(analysis) {
    let result;
    switch (analysis) {
        case "P+":
            result = "Strong Positive";
            break;
        case "P":
            result = "Positive";
            break;
        case "NEU":
            result = "Neutral";
            break;
        case "N":
            result = "Negative";
            break;
        case "N+":
            result = "Strong Negative";
            break;
        case "NONE":
            result = "No Sentiment";
            break;
        default:
            result = "Error on sentiment"
            break;
    }
    return result;
}

export { agreementAnalysis }