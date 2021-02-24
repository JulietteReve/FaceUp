export default function(urlList = [], action){ 
    if(action.type == 'addImage'){
        var urlListCopy = [...urlList, action.urlAdded]
        return urlListCopy
    } else {
        return urlList;
    }
}