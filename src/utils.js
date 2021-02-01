export function deepCopy(o) {
    // "string", number, boolean
    if (typeof (o) != "object") {
        return o;
    }

    // null
    if (!o) {
        return o; //null
    }

    var r = (o instanceof Array) ? [] : {};
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            r[i] = deepCopy(o[i]);
        }
    }
    return r;
}