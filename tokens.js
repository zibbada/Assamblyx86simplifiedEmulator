const tokenDetectors = [
readNumberToken = reader => {
    let numberText = '';
    const numberMatch = /\d/;

    while (reader.hasNext()) {
        if (reader.peek().match(numberMatch)) {
            numberText += reader.peek();
            reader.next();
        } else {
            break;
        }
    }

    if (numberText.length == 0) {
        return null;
    }

    return { type: 'number', value: numberText };
}
,
readOperation = reader => {
    let operation = reader.peek(3);
    if (operation.match(/\b(MOV|ADD|SUB|INC|DEC|NEG|JMP|CMP|JGT|JGE|JLT|JLE|JEQ)\b/)) {
        reader.next(3);
        return { type: 'operation', value: operation}
    }

    return null;
}
,
readLabel = reader => {
    let label = '';
    const startMatch = /[A-Z]/;
    const restMatch = /[A-Z0-9]/;

    if (!reader.peek().match(startMatch)) {
        return null;
    }

    label = reader.peek();
    reader.next();

    while (reader.hasNext() && reader.peek().match(restMatch)) {
        label += reader.peek();
        reader.next();
    };
    return { type: 'label', value: label };
}
,
readColon = reader => {
    if (reader.peek() == ':') {
        reader.next();
        return {type: 'colon',value: ':'}
    }
    return null;
}
,
readSqrBrackets = reader => {
    if (reader.peek() == '[') {
        reader.next();
        return { type: 'bracketStart', value: '[' };
    }

    if (reader.peek() == ']') {
        reader.next();
        return { type: 'bracketEnd', value: ']' };
    }

    return null;
}
,
 readEndOfLine = reader => {
    let val = reader.peek();
    if (val == ';' || val == '\n') {
        reader.next();
        return { type: 'endOfLine', value: val };
    }

    return null;
}
,
 readComma = reader => {
    if (reader.peek() == ',') {
        reader.next();
        return { type: 'comma', value: ',' };
    }
    return null;

}
,
 readWhitespace = reader => {
    const wsRegex = /[\t\r ]/;
     let val = '';
    while (reader.hasNext() && reader.peek().match(wsRegex)) {
        val += reader.peek();
        reader.next();
    }

    if (val.length > 0) {
        return { type: 'whitespace', value: val };
    }
    return null;
}
]