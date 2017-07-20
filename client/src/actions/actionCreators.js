export function setPhotos(photos){
    return {
        type:'SET_PHOTOS',
        photos
    }
}

export function setActivePhoto(activePhoto){
    return {
        type:'SET_ACTIVE_PHOTO',
        activePhoto
    }
}

export function setMarkers(photos){
    return {
        type:'SET_MARKERS',
        photos
    }
}

export function setDataSets (dataSets){
    return{
        type:'SET_DATASETS',
        dataSets
    }
}

export function setGeoSearch(geoSearch) {
    return {
        type:'SET_GEOSEARCH',
        geoSearch
    }
}

export function setYears(years) {
    return {
        type:'SET_YEARS',
        years
    }
}