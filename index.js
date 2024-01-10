class HashMap{
    constructor(name){
        this.name = name;
        this.buckets = Array(16).fill(null).map(()=>[]);
    }

    //method: hash
    hash(string){
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < string.length; i++){
            hashCode = primeNumber * hashCode + string.charCodeAt(i);
        }

        return hashCode;
    }



    //method: set
    set(key, value){
        let newNode = new Node(key, value);
        let hashCode = this.hash(key);
        let index = hashCode % this.buckets.length;



        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        if (this.buckets[index].length === 0){
            this.buckets[index].push(newNode);
            return;
        }else{
            let currentNode = this.buckets[index][0];
            let parentNode = null;

            while(currentNode !== null){
                if (currentNode.key === newNode.key){
                    currentNode.value = newNode.value;
                    return;
                }else{
                    parentNode = currentNode;
                    currentNode = currentNode.nextNode;
                }
                parentNode.nextNode = newNode;
                return;
            }
        }

    }


    //method: get
    

    //method: has

    //method: remove

    //method: length

    //method: clear

    //method: keys

    //method: values

    //method: entries
}


class Node{
    constructor(key, value, nextNode = null){
        this.key = key;
        this.value = value;
        this.nextNode = nextNode
    }
}

const testHash = new HashMap('test');
let testNode = new Node('test', 20);
testHash.buckets[2].push(testNode);
testHash.set('test', 30);
