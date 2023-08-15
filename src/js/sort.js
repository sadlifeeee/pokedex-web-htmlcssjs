function byName(a , b) {
    if(a.name > b.name) {
        return 1;
    } else if(b.name > a.name) {
        return -1;
    } else {
        return 0;
    }
}

function byID(a , b) {
    return parseInt(a.id) - parseInt(b.id);
}