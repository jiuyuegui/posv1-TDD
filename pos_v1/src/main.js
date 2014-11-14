function printInventory(inputs) {
    var input = tansferInput(inputs);       //将输入统一成数组
    var obj = dealDiffBarcode(input);       //将barcode整理成不重复且整齐的输入
    print(printInfo(obj));                  //打印输出信息
}

function tansferInput(inputs) {
    var input = [];
    if((typeof inputs) == "string") {
        input[0] = inputs;
    } else {
        input = inputs;
    }
    return input;
}

function dealDiffBarcode(input) {
    var n, input_obj = {};
    for(var j = 0; j < input.length; j++) {
        n = 1;
        if(/-/.test(input[j])) {
            var deal_result = dealPattern(input[j]);
            input[j] = deal_result[0];
            n = parseInt(deal_result[1]);
        }
        var key = input[j];
        if(!input_obj[key]) {
            input_obj[key] = 0;
        }
        input_obj[key] += n;
    }
    return input_obj;
}

function dealPattern(temp) {
    var i = temp.split("-");
    return i;
}

function printInfo(obj) {
    var items = [], is_promot;
    var all_items = loadAllItems();
    for(var key in obj) {
        is_promot = false || getPromotions(key, obj[key]);
        for(var i = 0; i < all_items.length; i++) {
            if(key == all_items[i].barcode) {
                var Item = {
                    barcode: key,
                    name: all_items[i].name,
                    unit: all_items[i].unit,
                    price: all_items[i].price,
                    count: obj[key],
                    promot: is_promot
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

function print(items) {
    var result = '***<没钱赚商店>购物清单***\n',
        middle = "",
        promot_info = "",
        last_words = "";
    var save,
        sum = 0.0,
        total_save = 0.0,
        divide;                             //小计                          
    for(var a = 0; a < items.length; a++) {
        if(items[a].promot) {
            save = Math.floor(items[a].count / 3) * items[a].price;
            promot_info +=
                '名称：' + items[a].name + '，数量：' + Math.floor(items[a].count / 3) +
                items[a].unit + '\n';
        } else {
              save = 0.0;
          }

        total_save += save;
        sum += (items[a].count * items[a].price);
        divide = items[a].count * items[a].price - save;

        middle +=
            '名称：' + items[a].name + '，数量：' + items[a].count + items[a].unit +
            '，单价：' + (items[a].price).toFixed(2) + '(元)，小计：' + divide.toFixed(2) + '(元)\n';
    }

    if(promot_info != "") {
        promot_info = '----------------------\n挥泪赠送商品：\n' + promot_info;
        last_words = '节省：' + total_save.toFixed(2) + '(元)\n';
    }
    result +=
        middle + promot_info + '----------------------\n' + '总计：' + (sum - total_save).toFixed(2) +
        '(元)\n' + last_words + '**********************';

    console.log(result);
}

