class Errors extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message){
        return new Errors(404, message)
    }

    static internal(message){
        return new Errors(500, message)
    }

    static forbidden(message){
        return new Errors(403, message)
    }
}

module.exports = Errors