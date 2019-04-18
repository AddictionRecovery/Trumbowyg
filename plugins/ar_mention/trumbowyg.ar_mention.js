/* ===========================================================
 * trumbowyg.ar_mention.js v0.1
 * Mention plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Viper
 *          Github: https://github.com/Globulopolis
 *          Website: http://киноархив.com
 */

(function ($) {
    'use strict';

    var defaultOptions = {
        source: '',
        formatDropdownItem: formatDropdownItem,
        formatResult: formatResult
    };

    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                ar_mention: 'Mention'
            },
            da: {
                ar_mention: 'Nævn'
            },
            fr: {
                ar_mention: 'Mentioner'
            },
            ru: {
                ar_mention: 'Упомянуть'
            },
            tr: {
                ar_mention: 'Bahset'
            },
            zh_tw: {
                ar_mention: '標記'
            },
            pt_br: {
                ar_mention: 'Menção'
            },
        },

        plugins: {
            ar_mention: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.ar_mention = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.ar_mention || {});

                    var btnDef = {
                        dropdown: buildDropdown(trumbowyg.o.plugins.ar_mention.source, trumbowyg)
                    };

                    trumbowyg.addBtnDef('ar_mention', btnDef);

                    trumbowyg.$c.on('tbwinit', function () {
                        var t = trumbowyg,
                            prefix = t.o.prefix,
                            $dropdown = $('[data-' + prefix + 'dropdown=ar_mention]', t.$box);

                        t.$ed.keypress(function(e) {
                            var key = String.fromCharCode(e.which),
                                text = t.$ed.text(),
                                last = text.substr(-1),
                                visible = $dropdown.is(':visible'),
                                show = visible;
                            console.error(t.range)

                            if (key === '@'/* && (!last || last.match(/\s/))*/) {
                                show = true;
                            }
                            else if (!/[a-z\d]/i.test(key)) {
                                show = false;
                            }

                            if (!visible && show) {
                                $dropdown.show();
                            }
                            else if (visible && !show) {
                                $dropdown.hide();
                            }
                        });

                    });
                }
            }
        }
    });

    /**
     * Build dropdown list
     *
     * @param   {Array}   items      Items
     * @param   {object}  trumbowyg  Editor
     *
     * @return  {Array}
     */
    function buildDropdown(items, trumbowyg) {
        var dropdown = [];

        // Check if source is an array
        if (items.constructor === Array) {
            $.each(items, function (i, item) {
                var btn = 'ar_mention-' + i,
                    btnDef = {
                        hasIcon: false,
                        text: trumbowyg.o.plugins.ar_mention.formatDropdownItem(item),
                        fn: function () {
                            console.error(trumbowyg)
                            trumbowyg.execCmd('insertHTML', trumbowyg.o.plugins.ar_mention.formatResult(item));

                            return true;
                        }
                    };

                trumbowyg.addBtnDef(btn, btnDef);
                dropdown.push(btn);
            });
        }

        return dropdown;
    }

    /**
     * Format item in dropdown.
     *
     * @param   {object}  item  Item object.
     *
     * @return  {string}
     */
    function formatDropdownItem(item) {
        return item.login;
    }

    /**
     * Format result pasted in editor.
     *
     * @param   {object}  item  Item object.
     *
     * @return  {string}
     */
    function formatResult(item) {
        return '@' + item.login + ' ';
    }
})(jQuery);
