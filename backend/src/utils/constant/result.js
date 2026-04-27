class Result {
    constructor(status = 200, message = '', data = []) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

export default Result;
