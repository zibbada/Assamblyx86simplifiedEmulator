class CharacterReader{
    constructor(code) {
        this.code = code;
        this.charPos = 0;
        this.linePos = 0;
        this.pos = 0;
    }

    peek(amount = 1) {
        return this.code.substring(this.pos,this.pos + amount);
    }

    next(amount = 1) {
        for (let i = this.pos; i < this.pos + amount; i++){
            if (this.code[i] == '\n') {
                this.linePos++;
                this.charPos = 0;
                continue;
            }
            this.charPos+=1;
        }
        this.pos += amount;
    }

    getCharPos() {
        return this.charPos;
    }

    getLinePos() {
        return this.linePos;
    }

    hasNext() {
        return this.pos < this.code.length;
    }
}