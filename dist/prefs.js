import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';
export default class GnomeRectanglePreferences extends ExtensionPreferences {
    _settings;
    fillPreferencesWindow(window) {
        this._settings = this.getSettings();
        const page = new Adw.PreferencesPage({
            title: _('General'),
            iconName: 'dialog-information-symbolic',
        });
        const textGroup = new Adw.PreferencesGroup({
            title: _('Text'),
            description: _('Configure text to show on status area'),
        });
        page.add(textGroup);
        const textValue = new Adw.EntryRow({
            title: _('Enabled'),
            show_apply_button: true,
            enable_undo: true
        });
        textGroup.add(textValue);
        const paddingGroup = new Adw.PreferencesGroup({
            title: _('Paddings'),
            description: _('Configure the padding between windows'),
        });
        page.add(paddingGroup);
        const paddingInner = new Adw.SpinRow({
            title: _('Inner'),
            subtitle: _('Padding between windows'),
            adjustment: new Gtk.Adjustment({
                lower: 0,
                upper: 1000,
                stepIncrement: 1
            })
        });
        paddingGroup.add(paddingInner);
        window.add(page);
        this._settings.bind('super-puper-text', textValue, 'text', Gio.SettingsBindFlags.DEFAULT);
        this._settings.bind('padding-inner', paddingInner, 'value', Gio.SettingsBindFlags.DEFAULT);
        return Promise.resolve();
    }
}
