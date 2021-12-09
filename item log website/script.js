// ------------------------------------initailize variables--------------------------------------------------------------------------------------------------------------------

let userList = document.querySelector('#userList');
let form = document.querySelector('#addUser');
let newList = document.querySelector('#newList');

var host = 'test.mosquitto.org';
var port = 8080;
var mqtt;
var connectTimeout = 2000;
var topic_user = 'ISE/mecha/user'; //topic!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var topic_items = 'ISE/mecha/items';
var numberOfClass = 6;
var numberOfColumn = 3;
var sitems = "";

let testbtn = document.getElementById('testbtn');

// username apple:2,beer:3 orange_juice:1,egg:4 --> in the table ##must getrid of items
// apple:2 beer:3 orange_juice:1 egg:4 milk:0 nutella:0 --> show items


function getValTest(){
    window.alert("ayo");
}

//----------------------------------------for add button--------------------------------------------------------------------------------------------------------------------------------

let submitbn = document.getElementById('addbtn');
submitbn.addEventListener('click', function () {
    if (form.name.value == '' || form.deposit.value == '' || form.withdraw.value == '' || form.items.value == '' || form.status.value == '') {
        console.log("Errors");
        swal("error");
    } else {
        gettingData2(form.name.value,form.deposit.value,form.withdraw.value,form.status.value);
        // test2(form.items.value); no more used
        swal("Saved "+String(form.name.value));
    }
    form.name.value = '';
    form.deposit.value = '';
    form.withdraw.value = '';
    form.items.value = '';
    form.status.value = '';
});

//--------------------------------------function to create table----------------------------------------------------------------------------------------------------------------------

function gettingData2(sname,sdeposit,swithdraw) {

    let tr = document.createElement('tr');
    let th = document.createElement('th');
    let name = document.createElement('td');
    let deposit = document.createElement('td');
    let withdraw = document.createElement('td');
    // let items = document.createElement('td');
    let status = document.createElement('td');
    // let removeb = document.createElement('button');
    let div = document.createElement('div');
    let olDeposit = document.createElement('ul');
    let olWithdraw = document.createElement('ul');

    const br = document.createElement("br");

    d = new Date();
    date = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
    form.date.value = date;

    let depositArray = sdeposit.split(",");
    let withdrawArray = swithdraw.split(",");

    for( let i = 0; i < depositArray.length; i++){
        depositArray[i] = depositArray[i].replace(":"," : ");
        let li = document.createElement('li');
        li.textContent = depositArray[i];
        olDeposit.append(li);
        
    }

    deposit.append(olDeposit);

    for( let i = 0; i < withdrawArray.length; i++){
        withdrawArray[i] = withdrawArray[i].replace(":"," : ");
        let li = document.createElement('li');
        li.textContent = withdrawArray[i];
        olWithdraw.append(li);
    }

    withdraw.append(olWithdraw);

    sdeposit = sdeposit.replace(":"," : ");
    swithdraw = swithdraw.replace(":"," : ");

    th.textContent = date;
    name.textContent = sname;
    // status.textContent = sstatus;

    tr.append(th);
    tr.append(name);
    tr.append(deposit);
    tr.append(withdraw);
    // tr.append(items);
    // tr.append(status);
    // tr.append(removeb);
    // console.log(tr);
    userList.append(tr);
    // console.log(userList)

// ---------------------------------------------------------scroll function of the table---------------------------------------------------------------------------------------------

    // console.log(document.getElementById('table-scroll').scrollTop);
    // console.log(document.getElementById('table-scroll').scrollHeight);

    let x = document.getElementById('table-scroll').scrollTop;
    let y = document.getElementById('table-scroll').scrollHeight;

    if(y - x < 750){
        document.getElementById('table-scroll').scrollTop = userList.offsetHeight + userList.offsetTop;
    }
}

// -------------------------------------------------------text to array function-----------------------------------------------------------------------------------------------------

function textToArray(text) {
    // let text = "apple:2 beer:3 orange_juice:1 egg:4 milk:0 nutella:0"
    let textArray = text.split(" ");
    console.log(textArray);
    if(textArray.length == numberOfColumn){
        let name = textArray[0];
        let deposit = textArray[1];
        if(deposit == ''){
            deposit = 'none';
        }
        let withdraw = textArray[2];
        if(withdraw == ''){
            withdraw = 'none';
        }
        gettingData2(name,deposit,withdraw);
        // return name,deposit,withdraw;
    }
    else if(textArray.length == numberOfClass){
        let apple = textArray[0];
        let beer = textArray[1];
        let orange_juice = textArray[2];
        let egg = textArray[3];
        let milk = textArray[4];
        let nutella = textArray[5];
        test2(apple,beer,orange_juice,egg,milk,nutella);
        // return apple,beer,orange_juice,egg,milk,nutella;
    }
    else{
        console.log("error because the number of array doesn't fit");
        console.log(textArray);
    }
}

//-------------------------------------------function to create list of things in fridge----------------------------------------------------------------------------------------

function test2(sapple,sbeer,sorange_juice,segg,smilk,snutella){
    let p = document.createElement('p');
    let br = document.createElement('br');
    let date = document.createElement('p');
    // let name = document.createElement('p');
    // let deposit = document.createElement('p');
    // let withdraw = document.createElement('p');
    let apple = document.createElement('p');
    let beer = document.createElement('p');
    let orange_juice = document.createElement('p');
    let egg = document.createElement('p');
    let milk = document.createElement('p');
    let nutella = document.createElement('p');
    // let status = document.createElement('p');
    let bapple = document.createElement('strong');
    let bbeer = document.createElement('b');
    let borange_juice = document.createElement('b');
    let begg = document.createElement('b');
    let bmilk = document.createElement('b');
    let bnutella = document.createElement('b');
    // let numsapple = document.createElement('p');
    // let numsbeer = document.createElement('p');
    // let numsorange_juice = document.createElement('p');
    // let numsegg = document.createElement('p');
    // let numsmilk = document.createElement('p');
    // let numsnutella = document.createElement('p');
    let br2 = document.createElement('br');
    let br3 = document.createElement('br');
    let br4 = document.createElement('br');
    let br5 = document.createElement('br');
    let br6 = document.createElement('br');


    sapple = sapple.replace(":", " : ");
    sbeer = sbeer.replace(":", " : ");
    sorange_juice =  sorange_juice.replace(":", " : ");
    segg = segg.replace(":", " : ");
    smilk = smilk.replace(":", " : ");
    snutella = snutella.replace(":", " : ");

    // numsapple.textContent = sapple.substr(sapple.length-1,1);
    // numsbeer.textContent = sbeer.substr(sbeer.length-1,1);
    // numsorange_juice.textContent = sorange_juice.substr(sorange_juice.length-1,1);
    // numsegg.textContent = segg.substr(segg.length-1,1);
    // numsmilk.textContent = smilk.substr(smilk.length-1,1);
    // numsnutella.textContent = snutella.substr(snutella.length-1,1);

    bapple.textContent = sapple.substr(0,sapple.length-1);
    bbeer.textContent = sbeer.substr(0,sbeer.length-1);
    borange_juice.textContent = sorange_juice.substr(0,sorange_juice.length-1);
    begg.textContent = segg.substr(0,segg.length-1);
    bmilk.textContent = smilk.substr(0,smilk.length-1);
    bnutella.textContent = snutella.substr(0,snutella.length-1);

    let numsapple = sapple.substr(sapple.length-1,1);
    let numsbeer = sbeer.substr(sbeer.length-1,1);
    let numsorange_juice = sorange_juice.substr(sorange_juice.length-1,1);
    let numsegg = segg.substr(segg.length-1,1);
    let numsmilk = smilk.substr(smilk.length-1,1);
    let numsnutella = snutella.substr(snutella.length-1,1);

    d = new Date();
    date = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
    form.date.value = date;

    date.textContent = date;
    // name.textContent = sname;
    // deposit.textContent = sdeposit;
    // withdraw.textContent = swithdraw;
    apple.textContent = sapple;
    beer.textContent = sbeer;
    orange_juice.textContent = sorange_juice;
    egg.textContent = segg;
    milk.textContent = smilk;
    nutella.textContent = snutella;
    // status.textContent = sstatus;

    p.append(date);
    p.append(br);
    p.append(bapple);
    p.append(numsapple);
    p.append(br2);
    p.append(bbeer);
    p.append(numsbeer);
    p.append(br3);
    p.append(borange_juice);
    p.append(numsorange_juice);
    p.append(br4);
    p.append(begg);
    p.append(numsegg);
    p.append(br5);
    p.append(bmilk);
    p.append(numsmilk);
    p.append(br6);
    p.append(bnutella);
    p.append(numsnutella);

    // p.append(date);
    // p.append(br);
    // p.append(apple);
    // // p.append(br);
    // p.append(beer);
    // // p.append(br);
    // p.append(orange_juice);
    // // p.append(br);
    // p.append(egg);
    // // p.append(br);
    // p.append(milk);
    // // p.append(br);
    // p.append(nutella);


    // h.append(name);
    // h.append(br);
    // h.append(deposit);
    // h.append(br);
    // h.append(withdraw);
    // h.append(br);
    // h.append(status);
    
    //console.log(p)

    while (newList.firstChild) {
        newList.removeChild(newList.firstChild)
    }

    newList.appendChild(p);

}

// test function that connext to the test button (testbtn)

function testAll(){
    let text1 = "username apple:2,beer:3 orange_juice:1,egg:4";
    let text2 = "apple:2 beer:3 orange_juice:1 egg:4 milk:1 nutella:1";
    textToArray(text1);
    textToArray(text2);
}

// end 

// ----------------------------------------------------back end--------------------------------------------------------------------------------------------------------------==

function MQTTconnect(){
    console.log("connecting to " + host + " " + port)
    mqtt = new Paho.MQTT.Client(host, port,"clientjs");
    // mqtt.onMessageArrived = onMessageArrived;
    var option = {
        timeout: 3,
        onSuccess: onConnect,
    };
    mqtt.connect(option);
    mqtt.onMessageArrived = onMessageArrived;
}

function onConnect() {
    console.log("connect");
    mqtt.subscribe(topic_user);
    mqtt.subscribe(topic_items);
}


function onMessageArrived(message) {
    console.log("onMessageArrived: "+message.payloadString);
    textToArray(message.payloadString);
}

MQTTconnect();