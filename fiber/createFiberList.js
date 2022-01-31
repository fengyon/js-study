const createFiberList = (root) => {
    let parent = root, child, childIndex;
    return root
    while (parent) {
        childIndex = 0;
        while(childIndex < parent.children.length){

        }
    }
    return root
}
const reactVdom = {
    type: "div",
    props: { name: 'root' },
    children: [
        {
            type: "div",
            props: { name: 'root-1' },
            children: [
                {
                    type: "div",
                    props: { name: 'root-1-1' },
                    children: [

                    ]
                }, {
                    type: "div",
                    props: { name: 'root-1-2' },
                    children: [

                    ]
                },
            ]
        },
        {
            type: "div",
            props: { name: 'root-2' },
            children: [
                {
                    type: "div",
                    props: { name: 'root-2-1' },
                    children: [

                    ]
                },
                {
                    type: "div",
                    props: { name: 'root-2-2' },
                    children: [

                    ]
                },
            ]
        }
    ]
}
console.log(JSON.stringify(createFiberList(reactVdom), null, 2));