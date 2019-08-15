console.log("[Equipment Reader] - Reading '" + "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/equipment_data.json" + "'...");
let equipment_map = new Map();
let equipment_loaded = false;

let totalCommonItems = 0;
let totalCopperItems = 0;
let totalSilverItems = 0;
let totalGoldItems = 0;
let totalPurpleItems = 0;
let totalMiscItems = 0;

let run_equipment = $(function () {
    $.ajax({
        'global': false,
        'url': "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/equipment_data.json",
        'dataType': "json",
        'success': function (data) {
            $.when(
                $.each(data, function(i, itemData)
                {
                    let item_data = new Map();

                    item_data.set("name", itemData.name);
                    item_data.set("id", itemData.id);
                    /** @namespace itemData.has_fragments */
                    item_data.set("has_fragments", itemData.has_fragments);
                    /** @namespace itemData.req_pieces */
                    item_data.set("req_pieces", itemData.req_pieces);
                    /** @namespace itemData.req_items */
                    item_data.set("req_items", itemData.req_items);

                    equipment_map.set(itemData.name, item_data);

                    // RARITY ITEM COUNTER
                    let rarity_class = itemData.id.substring(0, itemData.id.indexOf('-'));
                    switch (rarity_class)
                    {
                        case "common":
                            totalCommonItems++;
                            break;
                        case "copper":
                            totalCopperItems++;
                            break;
                        case "silver":
                            totalSilverItems++;
                            break;
                        case "gold":
                            totalGoldItems++;
                            break;
                        case "purple":
                            totalPurpleItems++;
                            break;
                        case "misc":
                            totalMiscItems++;
                            break;
                        default:
                            // IGNORED
                            break;
                    }
                })
            ).then(function () {
                equipment_loaded = true;
                console.log("[Equipment Reader] - Equipment data loaded!");
            });

        }
    });
});

function get_equipment_data(item_name, key)
{
    if (equipment_map.has(item_name))
    {
        return equipment_map.get(item_name).get(key);
    }
    else
    {
        console.log("[Equipment Reader] - " + item_name + " is not found.");
    }
}