/**
 * Created by felixshu on 1/12/14.
 */

console.time('nonArray');
function Prime(num, limit) {
    var counter = 0;
    for (var i = 1; i < limit; i++) {

        if (isPrime(i)) {
            counter++;
        }
        if(counter == num){
            return i;
        }
    }
}
var result = Prime(1000, 11000);
console.log(result);
console.timeEnd('nonArray');

console.time('Array');
var a = [];
function aPrime(num,limit){
    for (var i = 1; i < limit; i++) {

        if (isPrime(i)) {
            a.push(i)
        }
    }

    return a[num-1];
}
var aResult = aPrime(1000, 11000);
console.log(aResult);
console.timeEnd('Array');

// whether the num is Prime
function isPrime(num) {
    if (num < 2) {
        return false;
    }

    for (var i = 2; i < num; i++) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}