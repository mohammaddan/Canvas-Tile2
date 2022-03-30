import DatabaseObject from './DatabaseObject.js'
import TagsManager from './TagsManager.js'

export default class Viewport extends DatabaseObject {
    constructor(name, height) {
        super(["AcDbSymbolTableRecord", "AcDbViewportTableRecord"]);
        this.name = name;
        this.height = height;
    }

    tags() {
        const manager = new TagsManager();

        manager.addTag(0, "VPORT");
        manager.addTags(super.tags());
        manager.addTag(2, this.name);
        manager.addTag(40, this.height);
        /* No flags set */
        manager.addTag(70, 0);

        return manager.tags();
    }
}
