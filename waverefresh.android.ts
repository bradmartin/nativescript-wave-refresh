/***************************************************************************************
* Made for the {N} community by Brad Martin @BradWayneMartin
* https://twitter.com/BradWayneMartin
* https://github.com/bradmartin
* http://bradmartin.net
* Open Source Lib : https://github.com/recruit-lifestyle/WaveSwipeRefreshLayout
*************************************************************************************/

import { DependencyObservable, PropertyChangeData, Property, PropertyMetadataSettings } from "ui/core/dependency-observable";
import { ContentView } from "ui/content-view";
import { View } from "ui/core/view";
import { PropertyMetadata } from "ui/core/proxy";
import { Color } from "color";
import style = require("ui/styling/style");


declare var android, jp: any;

export class WaveRefresh extends ContentView {
    public static refreshEvent = "refresh";

    public static refreshingProperty = new Property(
        "refreshing",
        "PullToRefresh",
        new PropertyMetadata(false, PropertyMetadataSettings.None)
    );

    private _android: jp.co.recruit_lifestyle.android.widget.WaveSwipeRefreshLayout;
    private _androidViewId: number;

    constructor() {
        super();
    }

    get android(): any {
        return this._android;
    }

    get _nativeView(): any {
        return this._android;
    }

    get refreshing(): boolean {
        return this._getValue(WaveRefresh.refreshingProperty);
    }

    set refreshing(value: boolean) {
        this._setValue(WaveRefresh.refreshingProperty, value);
    }

    public _createUI() {

        this._android = new jp.co.recruit_lifestyle.android.widget.WaveSwipeRefreshLayout(this._context);

        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);

        let that = new WeakRef(this);

        this._android.setOnRefreshListener(new jp.co.recruit_lifestyle.android.widget.WaveSwipeRefreshLayout.OnRefreshListener({
            get owner() {
                return that.get();
            },

            onRefresh: function (v) {
                let owner = that.get();
                if (owner) {
                    owner.refreshing = true;
                    owner._emit(WaveRefresh.refreshEvent);
                }
            }
        }));
    }


    public _addChildFromBuilder(name: string, value: any) {
        // Copy inheirtable style property values
        var originalColor = value.style.color || null;

        if (value instanceof View) {
            this.content = value;
        }

        // Reset inheritable style property values as we do not want those to be inherited
        value.style.color = originalColor;
    }


}


export class WaveRefreshStyler implements style.Styler {
    private static setBackgroundColor(waveRefresh: WaveRefresh, value: any) {
        var native = <jp.co.recruit_lifestyle.android.widget.WaveSwipeRefreshLayout>waveRefresh._nativeView;
        native.setWaveColor(value);
    }
    private static resetBackgroundColor(waveRefresh: WaveRefresh, value: any) {
        var native = <jp.co.recruit_lifestyle.android.widget.WaveSwipeRefreshLayout>waveRefresh._nativeView;
        native.setWaveColor(value);
    }

    private static setColor(waveRefresh: WaveRefresh, value: any) {
        var native = <jp.co.recruit_lifestyle.android.widget.WaveSwipeRefreshLayout>waveRefresh._nativeView;
        console.log('setColor: ' + value);
        console.log('setColor native =  ' + native);
        native.setColorSchemeColors(value);
    }
    private static resetColor(waveRefresh: WaveRefresh, value: any) {
        var native = <jp.co.recruit_lifestyle.android.widget.WaveSwipeRefreshLayout>waveRefresh._nativeView;
        console.log('resetColor: ' + value);
        console.log('resetColor native =  ' + native);
        native.setColorSchemeColors(value);
    }

    public static registerHandlers() {
        style.registerHandler(style.backgroundColorProperty,
            new style.StylePropertyChangedHandler(WaveRefreshStyler.setBackgroundColor,
                WaveRefreshStyler.resetBackgroundColor),
            "WaveRefresh");
        style.registerHandler(style.backgroundInternalProperty,
            style.ignorePropertyHandler,
            "WaveRefresh");
        style.registerHandler(style.colorProperty,
            new style.StylePropertyChangedHandler(WaveRefreshStyler.setColor,
                WaveRefreshStyler.resetColor),
            "WaveRefresh");
    }
}
WaveRefreshStyler.registerHandlers();




function refreshingPropertyChanged(data: PropertyChangeData) {
    var pullRefresh = <WaveRefresh>data.object;
    if (!pullRefresh.android) {
        return;
    }

    pullRefresh.android.setRefreshing(data.newValue);
}

// register the setNativeValue callback
(<PropertyMetadata>WaveRefresh.refreshingProperty.metadata).onSetNativeValue = refreshingPropertyChanged;
