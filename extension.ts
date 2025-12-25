import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import Meta from 'gi://Meta';
import Shell from 'gi://Shell';
import St from 'gi://St'
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

export default class MyExtension extends Extension {
    gsettings?: Gio.Settings
    remembered_text?: string
    _indicator?: PanelMenu.Button
    _label?: St.Label
    _connectId?: number
    _width?: number
    _timeout?: number

    enable() {
        this.gsettings = this.getSettings();
        this.remembered_text = this.gsettings.get_string('super-puper-text')
        this._width = this.gsettings.get_int('text-width')
        this._timeout = this.gsettings.get_int('text-speed')

        this._indicator = new PanelMenu.Button(0.0,this.metadata.name, false);
        this._indicator.can_focus = false
        this._label = new St.Label({style_class: "text"})
        this._indicator.add_child(this._label)

        this._connectId = this.gsettings.connect('changed::super-puper-text', () => {
            this._animate();
        });

        this._connectId = this.gsettings.connect('changed::text-speed', () => {
            this._timeout = this.gsettings?.get_int('text-speed');
        });

        this._connectId = this.gsettings.connect('changed::text-width', () => {
            this._width = this.gsettings?.get_int('text-width');
        });

        this._animate()

        Main.panel.addToStatusArea(this.uuid, this._indicator)
    }

    _animate(): void {
        if (this._label && this._label.text && this._width && this._timeout) {
            if (this._label.text.length > this._width) {
                GLib.timeout_add(
                    1,
                    this._timeout,
                    () => {
                        this._label?.text = "12-2-2-2-";
                    }
                )
            } else {
                this._updateText()
            }
        }
    }

    _updateText(): void {
        const newText = this.gsettings?.get_string('super-puper-text')
        if (this._label && newText) {
            this._label.text = newText
        }
    }

    disable() {
        if (this._connectId) {
            this.gsettings?.disconnect(this._connectId);
            this._connectId = undefined;
        }
        this.gsettings = undefined;
        this._indicator?.destroy()
        this._indicator = undefined;
        this._label = undefined;
    }
}