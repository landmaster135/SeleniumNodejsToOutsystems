function getXpathByElement (element) {
    var NODE_TYPE_ELEMENT_NODE = 1;

    if (element instanceof Array) {
        element = element[0];
    }

    if (element.nodeType != NODE_TYPE_ELEMENT_NODE) {
        throw new ErrorException('nodes other than the element node was passed. node_type:'+ element.nodeType +' node_name:'+ element.nodeName);
    }

    var stacker = [];
    var node_name = '';
    var node_count = 0;
    var node_point = null;

    do {
        node_name = element.nodeName.toLowerCase();
        if (element.parentNode.children.length > 1) {
            node_count = 0;
            node_point = null;
            for (i = 0;i < element.parentNode.children.length;i++) {
                if (element.nodeName == element.parentNode.children[i].nodeName) {
                    node_count++;
                    if (element == element.parentNode.children[i]) {
                        node_point = node_count;
                    }
                    if (node_point != null && node_count > 1) {
                        node_name += '['+ node_point +']';
                        break;
                    }
                }
            }
        }
        stacker.unshift(node_name);
    } while ((element = element.parentNode) != null && element.nodeName != '#document');

    return '/' + stacker.join('/').toLowerCase();
}

// This method occurs memory lack error.
// var elements = document.getElementsByClassName("checkbox");
// var xpaths = [];
// for(var i = 0; i < elements.length; i++){
//     xpaths.push(getXpathByElement(elements[i]));
// }


return getXpathByElement(document.getElementsByClassName("checkbox")["scriptSeparator"]);