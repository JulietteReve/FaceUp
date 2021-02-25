export default function(imageList = [], action){ 
    if(action.type == 'addImage'){
        var imageListCopy = [...imageList, action.imageAdded]
        return imageListCopy
    } else {
        return imageList;
    }
}