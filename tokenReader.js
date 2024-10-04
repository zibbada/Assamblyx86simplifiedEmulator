class TokenReader {
    constructor(tokens) {
        this.tokens = tokens; 
        this.pos = 0; 
        this.stateStack = [];
    }

    pushState() {
        this.stateStack.push(this.pos);
    }

    restoreState() {
        this.pos = this.popState();
    }

    popState() {
        return this.stateStack.pop();
    }

    isType(type) {
        return this.hasNext() && this.getType() === type;
    }

    getType() {
        return this.get().type;
    }

    getValue() {
        return this.get().value;
    }

    isValue(value) {
        return this.getValue() === value;
    }

    get() {
        return this.tokens[this.pos];
    }

    getLastToken() {
        return this.tokens[this.tokens.length - 1];
    }

    next() {
        this.pos++;
    }

    hasNext() {
        return this.pos < this.tokens.length;
    }
}