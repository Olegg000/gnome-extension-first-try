import St from 'gi://St';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
export default class MyExtension extends Extension {
    gsettings;
    remembered_text;
    _indicator;
    _label;
    _connectId;
    enable() {
        this.gsettings = this.getSettings();
        this.remembered_text = this.gsettings.get_string('super-puper-text');
        this._indicator = new PanelMenu.Button(0.0, this.metadata.name, false);
        this._label = new St.Label({ style_class: "text" });
        this._indicator.add_child(this._label);
        this._connectId = this.gsettings.connect('changed::super-puper-text', () => {
            this._updateText();
        });
        this._updateText();
        Main.panel.addToStatusArea(this.uuid, this._indicator);
    }
    _updateText() {
        const newText = this.gsettings?.get_string('super-puper-text');
        if (this._label && newText) {
            this._label.text = newText;
        }
    }
    disable() {
        if (this._connectId) {
            this.gsettings?.disconnect(this._connectId);
            this._connectId = undefined;
        }
        this.gsettings = undefined;
        this._indicator?.destroy();
        this._indicator = undefined;
        this._label = undefined;
    }
}
