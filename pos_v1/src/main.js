function printInventory(inputs) {
    var allItems = loadAllItems();
    for(var i = 0; i < allItems.length; i++) {
        if(inputs == allItems[i].barcode) {
            var items = {
              barcode: inputs,
              name: allItems[i].name,
              unit: allItems[i].unit,
              price: allItems[i].price,
              count: 1
            }
            break;
        }
    }
    print(items);
}

function print(items) {
    var result =
        '***<没钱赚商店>购物清单***\n' + '名称：' + items.name + '，数量：' + items.count + items.unit
        + '，单价：' + (items.price).toFixed(2) + '(元)，小计：' + (items.count * items.price).toFixed(2)
        + '(元)\n' + '----------------------\n' + '总计：' + (items.count * items.price).toFixed(2)
        + '(元)\n' + '**********************';
    console.log(result);
}
