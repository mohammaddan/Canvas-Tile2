import DatabaseObject from './DatabaseObject.js'
import Table from './Table.js'
import TagsManager from './TagsManager.js'

export default class DimStyleTable extends Table {
    constructor(name) {
        super(name);
        this.subclassMarkers.push("AcDbDimStyleTable");
    }

    tags() {
        const manager = new TagsManager();
        manager.addTag(0, "TABLE");
        manager.addTag(2, this.name);
        manager.addTags(DatabaseObject.prototype.tags.call(this));
        manager.addTag(70, this.elements.length);
        /* DIMTOL */
        manager.addTag(71, 1);

        this.elements.forEach((element) => {
            manager.addTags(element.tags());
        });

        manager.addTag(0, "ENDTAB");
        return manager.tags();
    }
}
