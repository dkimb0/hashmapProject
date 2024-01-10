class HashMap{
    constructor(name){
        this.name = name;
        this.buckets = Array(16).fill(null).map(()=>[]);
        this.loadFactor = 0.75;
    }

    hash(string){
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < string.length; i++){
            hashCode = primeNumber * hashCode + string.charCodeAt(i);
        }

        return hashCode;
    }

    loadFactorCheck(){
        if(this.loadFactor < (this.length() / this.buckets.length)){
            this.rehash();
            return;
        }else{
            return;
        }
    }

    rehash(){
        let entries = this.entries();
        this.buckets = Array(this.buckets.length*2).fill(null).map(()=>[]);
        entries.forEach((entry) => {
            this.set(entry[0], entry[1]);
        })
    }

    set(key, value){
        let newNode = new Node(key, value);
        let hashCode = this.hash(key);
        let index = hashCode % this.buckets.length;

        this.loadFactorCheck();

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

    get(key){
        let hashCode = this.hash(key);
        let index = hashCode % this.buckets.length;

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        let currentNode = this.buckets[index][0];

        while(currentNode !== null){
            if(currentNode.key === key){
                return currentNode.value;
            }else{
                currentNode = currentNode.nextNode;
            }
        }
        return null;
    }

    has(key){
        if (this.get(key) === null){
            return false;
        }else{
            return true;
        }
    }

    remove(key){
        let hashCode = this.hash(key);
        let index = hashCode % this.buckets.length;

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        let parentNode = null;
        let currentNode = this.buckets[index][0];

        while(currentNode !== null){
            if(currentNode.key === key){
                if(currentNode === this.buckets[index][0]){
                    this.buckets[index].push(currentNode.nextNode);
                    this.buckets[index].shift();
                    console.log(this.buckets);
                    return;
                }else{
                    parentNode.nextNode = currentNode.nextNode;
                    console.log(this.buckets);
                    return;
                }
            }else{
                parentNode = currentNode;
                currentNode = currentNode.nextNode;
            }
        }
        return;
    }

    length(){
        let counter = 0;
        let currentNode = null;

        this.buckets.forEach((bucket) => {
            if (bucket[0]){
                currentNode = bucket[0];
                while (currentNode !== null){
                    counter += 1;
                    currentNode = currentNode.nextNode;
                }
            }
        })

        return counter;
    }

    clear(){
        this.buckets = Array(16).fill(null).map(()=>[]);
    }

    keys(){
        let outputArray = [];
        let currentNode = null;

        this.buckets.forEach((bucket) => {
            if (bucket[0]){
                currentNode = bucket[0];
                while (currentNode !== null){
                    outputArray.push(currentNode.key)
                    currentNode = currentNode.nextNode;
                }
            }
        })

        return outputArray;
    }

    values(){
        let outputArray = [];
        let currentNode = null;

        this.buckets.forEach((bucket) => {
            if (bucket[0]){
                currentNode = bucket[0];
                while (currentNode !== null){
                    outputArray.push(currentNode.value)
                    currentNode = currentNode.nextNode;
                }
            }
        })

        return outputArray;
    }

    //method: entries
    entries(){
        let outputArray = [];
        let currentNode = null;

        this.buckets.forEach((bucket) => {
            if (bucket[0]){
                currentNode = bucket[0];
                while (currentNode !== null){
                    outputArray.push([currentNode.key, currentNode.value])
                    currentNode = currentNode.nextNode;
                }
            }
        })

        return outputArray;
    }

    grow(){

    }
}


class Node{
    constructor(key, value, nextNode = null){
        this.key = key;
        this.value = value;
        this.nextNode = nextNode
    }
}

const testHash = new HashMap('test');
testHash.set('test', 30);
testHash.set('dave', 1);
testHash.set('betty', 25);
testHash.set('frank', 27);
testHash.set('david', 29);
testHash.set('crack', 30);
testHash.set('donny', 1);
testHash.set('bruiser', 25);
testHash.set('patrick', 27);
testHash.set('john', 29);
testHash.set('elaine', 30);
testHash.set('newman', 1);
testHash.set('jerry', 25);
testHash.set('kramer', 27);
testHash.set('george', 29);

