class ValidationHelper {
    static isPositiveInteger(value) {
        const parsedValue = Number(value);
        return Number.isInteger(parsedValue) && parsedValue > 0;
    }
}

export default ValidationHelper;
