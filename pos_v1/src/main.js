function printInventory(inputs) {
    var input = tansferinput(inputs);       //将输入统一成数组
    var obj = dealDiffBarcode(input);       //将barcode整理成不重复且整齐的输入
    print(printInfo(obj));                  //打印输出信息
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
    var items = [], boolean;
    var allItems = loadAllItems();
    for(var key in obj) {
        boolean = false || getPromotions(key, obj[key]);
        for(var i = 0; i < allItems.length; i++) {
            if(key == allItems[i].barcode) {
                var Item = {
                    barcode: key,
                    name: allItems[i].name,
                    unit: allItems[i].unit,
                    price: allItems[i].price,
                    count: obj[key],
                    promot: boolean
                };
                items.push(Item);
                break;
            }
        }
    }
    return items;
}

function getPromotions(key, times) {
    var promotions = loadPromotions();
    for(var p = 0; p < promotions[0].barcodes.length; p++) {
        if(key == promotions[0].barcodes[p] && (times > 2)) {
            return true;
        }
    }
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
    var result = '***<没钱赚商店>购物清单***\n', middle = "", promotInfo = "", lastwords = "";
    var sum = 0.0, save, totalSave = 0.0, divide = 0.0;
    for(var a = 0; a < items.length; a++) {
        if(items[a].promot) {
            promotInfo += '挥泪赠送商品：\n' + '名称：' + items[a].name + '，数量：' + Math.floor(items[a].count / 3)
                          + items[a].unit + '\n';

            save = Math.floor(items[a].count / 3) * items[a].price;
        } else {
            save = 0.0;
        }

        sum += (items[a].count * items[a].price);
        divide = items[a].count * items[a].price - save; //小计
        totalSave += save;

        middle +=
        '名称：' + items[a].name + '，数量：' + items[a].count + items[a].unit
        + '，单价：' + (items[a].price).toFixed(2) + '(元)，小计：' + divide.toFixed(2) + '(元)\n';

    }
    if(promotInfo != "") {
        promotInfo = '----------------------\n' + promotInfo;
        lastwords = '节省：' + totalSave.toFixed(2) + '(元)\n';
    }
    result += middle + promotInfo + '----------------------\n' + '总计：' + (sum - totalSave).toFixed(2) + '(元)\n'
              + lastwords + '**********************';
    console.log(result);
}
