function LocalStorageCreateKey(key, value) {
    window.localStorage.setItem(key, value);
}

function LocalStorageGetValue(key) {
//    var keyname = window.localStorage.key(i);
    var value = window.localStorage.getItem(key);
    return value;
}

function LocalStorageUpdateValue(key, newValue) {
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, newValue);
}

function LocalStorageDeleteKey(key) {
    window.localStorage.removeItem(key);
}

function onLocalStorageDeleteAll() {
    window.localStorage.clear();
    // localStorage is now empty
}