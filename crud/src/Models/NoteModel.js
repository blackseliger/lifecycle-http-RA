import shortid from "shortid";

export default class NoteModel {
    constructor(text, id) {
        this.id = shortid.generate();
        this.content = text;
    }
}