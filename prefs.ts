import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class GnomeRectanglePreferences extends ExtensionPreferences {
    _settings?: Gio.Settings

    fillPreferencesWindow(window: Adw.PreferencesWindow): Promise<void> {
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

        const textContainer = new Adw.ExpanderRow({
            title: _('Enabled'),
        })
        const textInput = new Gtk.TextView()
        textContainer.add_controller(textGroup);
        textGroup.add(text);

        const chatrInMS = new Adw

        textGroup.add(chatrInMS);

        const sizeGroup = new Adw.PreferencesGroup({
            title: _('Size'),
            description: _('Configure the size of widget'),
        });
        page.add(sizeGroup);

        const sizeTool = new Adw.Spinner({

        })
        page.add(sizeTool);


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

        window.add(page)

        this._settings!.bind('super-puper-text', textContainer, 'text', Gio.SettingsBindFlags.DEFAULT);
        this._settings!.bind('padding-inner', paddingInner, 'value', Gio.SettingsBindFlags.DEFAULT);

        return Promise.resolve();
    }
}