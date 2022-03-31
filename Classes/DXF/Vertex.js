import DatabaseObject from './DatabaseObject.js'
import TagsManager from './TagsManager.js'

export default class Vertex extends DatabaseObject {
    /**
     *
     * @param {number} x The X coordinate
     * @param {number} y The Y coordinate
     * @param {number} z The Z coordinate
     */
    constructor(x, y, z) {
        super(["AcDbEntity", "AcDbVertex", "AcDb3dPolylineVertex"]);
        this.x = x;
        this.y = y;
        this.z = z;
    }

    tags() {
        const manager = new TagsManager();

        manager.addTag(0, "VERTEX");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x, this.y, this.z);
        manager.addTag(70, 32);
        return manager.tags();
    }
}
