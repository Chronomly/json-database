const fs = require('fs');

module.exports = class JSONDatabase {
    constructor(path) {
        this.path = path;
        this._store = {};
    }

    async sync() {
        let database = await fs.readFileSync(this.path, 'utf8');

        if (!database) {
            await fs.writeFileSync(this.path, JSON.stringify({}));
            database = {};
        } else {
            database = JSON.parse(database);
        }

        this._store = Object.assign(database, this._store);
        console.log(this._store);

        await fs.writeFileSync(this.path, JSON.stringify(this._store));
    }

    async get(key) {
        if (!!this._store[key] === false) {
            return 'Item Empty';
        } else {
            return this._store[key];
        }
    }

    async set(key, value) {
        this._store[key] = value;

        if (this._store[item] === value) {
            return `Success set ${item}'s data to ${value}`;
        } else {
            return `Error! ${item} was not successfully set to ${value}`;
        }
    }
}
