/**
 * Contains the WaveRefresh class, which represents a Layout that contains the UI pattern for a custom pull-to-refresh
 */
declare module "nativescript-wave-refresh" {
    import { Property } from "ui/core/dependency-observable";
    import { Observable, EventData } from "data/observable";
    import { ContentView } from "ui/content-view";

    /**
     * Represents a standard Wave Refresh Layout
     */
    export class WaveRefresh extends ContentView {
        public static waveColorProperty: Property;
        public static isRefreshingProperty: Property;

        /**
         * String value used when hooking to the onRefresh event.
         */
        public static refreshEvent: string;

        /**
         * Gets the native [android widget](https://github.com/recruit-lifestyle/WaveSwipeRefreshLayout) that represents the user interface for this component. Valid only when running on Android OS.
         */
        android: any /* jp.co.recruit_lifestyle.android.widget.WaveSwipeRefreshLayout */;

        /**
         * Gets or set the wave color attribute
         */
        waveColor: string;

        /*
        * Gets or sets if the view is refreshing
        */
        refreshing: boolean;

        /**
         * Raised when a refresh event occurs.
         */
        on(event: string, callback: (args: EventData) => void, thisArg?: any);
        on(event: "refresh", callback: (args: EventData) => void, thisArg?: any);
    }

}