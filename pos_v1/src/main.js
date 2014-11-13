function printInventory(inputs) {
    var input = [], items = [];
    var allItems = loadAllItems();
    if((typeof inputs) == "string") {
        input[0] = inputs;
    } else {
        input = inputs;
    }
    for(var j = 0; j < input.length; j++) {
        for(var i = 0; i < allItems.length; i++) {
            if(input[j] == allItems[i].barcode) {
                var item = {
                  barcode: inputs,
                  name: allItems[i].name,
                  unit: allItems[i].unit,
                  price: allItems[i].price,
                  count: input.length
                };
                items.push(item);
                break;
            }
        }
    }
    print(items);
}

function print(items) {
    var result;
    for(var a = 0; a < items.length; a++) {
        result =
        '***<没钱赚商店>购物清单***\n' + '名称：' + items[a].name + '，数量：' + items[a].count + items[a].unit
        + '，单价：' + (items[a].price).toFixed(2) + '(元)，小计：' + (items[a].count * items[a].price).toFixed(2)
        + '(元)\n' + '----------------------\n' + '总计：' + (items[a].count * items[a].price).toFixed(2)
        + '(元)\n' + '**********************';
    }
    console.log(result);
}
