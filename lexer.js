const detectTokens = code => {

    const reader = new CharacterReader(code);

    const foundTokens = [];

    while(reader.hasNext()){
        let token = null;

        let startPos = reader.pos;
        let linePos = reader.getLinePos();
        let charPos = reader.getCharPos();
        for (const detectToken of tokenDetectors) {
            token = detectToken(reader);

            if (token) {
                break;
            }
        }

        if (!token) {
            throw new Error(`Invalid character '${reader.peek()}' at ${linePos}:${charPos}`);
        }

        foundTokens.push({
            ...token,
            start: startPos,
            end: reader.pos,
            line: linePos,
            char: charPos
        });
    }
    
    return foundTokens.filter(i => i.type !== 'whitespace');
}

const code =
    `MOV [20], 20
    INC [20]
    LOOP:
    SUB [20], 10
    JMP LOOP`;
const tokens = detectTokens(code);
console.log(tokens);