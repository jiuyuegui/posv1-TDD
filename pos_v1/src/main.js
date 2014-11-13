function printInventory(inputs) {
    var input = tansferinput(inputs);
    var obj = dealDiffBarcode(input);
    print(printInfo(obj));
}

function tansferinput(inputs) {
    var input = [];
    if((typeof inputs) == "string") {
        input[0] = inputs;
    } else {
        input = inputs;
    }
    return input;
}

function printInfo(obj) {
    var items = [];
    var allItems = loadAllItems();
    for(var key in obj) {
        for(var i = 0; i < allItems.length; i++) {
            if(key == allItems[i].barcode) {
                var Item = {
                  barcode: key,
                  name: allItems[i].name,
                  unit: allItems[i].unit,
                  price: allItems[i].price,
                  count: obj[key]
                };
                items.push(Item);
                break;
            }
        }
    }
    return items;
}

function dealDiffBarcode(input) {
    var n, inputObj = {};
    for(var j = 0; j < input.length; j++) {
        n = 1;
        var index = input[j].indexOf("-");
        if(index > 0) {
            var dealResult = dealPattern(input[j]);
            input[j] = dealResult[0];
            n = parseInt(dealResult[1]);
        }
        var key = input[j];
        if(!inputObj[key]) {
            inputObj[key] = 0;
        }
        inputObj[key] += n;
    }
    return inputObj;
}

function dealPattern(temp) {
    var i = temp.split("-");
    return i;
}

function print(items) {
    var result = '***<没钱赚商店>购物清单***\n', middle = "";
    var sum = 0.0;
    for(var a = 0; a < items.length; a++) {
        middle +=
        '名称：' + items[a].name + '，数量：' + items[a].count + items[a].unit
        + '，单价：' + (items[a].price).toFixed(2) + '(元)，小计：' + (items[a].count * items[a].price).toFixed(2)
        + '(元)\n';
        sum += (items[a].count * items[a].price);
    }
    result += middle + '----------------------\n' + '总计：' + sum.toFixed(2) + '(元)\n' + '**********************';
    console.log(result);
}

