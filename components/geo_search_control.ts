import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl } from 'leaflet-geosearch';
import {SearchResult} from "leaflet-geosearch/lib/providers/provider";

interface IProps {
    provider: any;
    showMarker: boolean;
    showPopup: boolean;
    maxMarkers: number;
    retainZoomLevel: boolean;
    animateZoom: boolean;
    autoClose: boolean;
    searchLabel: string;
    keepResult: boolean;
    popupFormat: (result: {query: Object, result: SearchResult}) => string;
}

const SearchControl = (props: IProps) => {
    const map = useMap();

    // @ts-ignore
    useEffect(() => {
        // @ts-ignore
        const searchControl = new GeoSearchControl({...props});
        map.addControl(searchControl);

        return () => map.removeControl(searchControl);
    }, [props])

    return null;
}

export default SearchControl;
