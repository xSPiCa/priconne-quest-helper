function read_common()
{
    const totalCommonItems = 15;

    let itemMap = new Map();

    for (let i = 1 ; i < totalCommonItems + 1 ; i++)
    {
        /* ROUND UP VALUE */
        let itemValue = Math.round(document.getElementById("common-" + i + "-amt").value);
        document.getElementById("common-" + i + "-amt").value = itemValue;

        if (itemValue >= 1)
        {
            /* CHECK VALUE: IF GREATER THAN 100, THEN CORRECT THE ISSUE */
            if (itemValue > 99)
            {
                document.getElementById("common-" + i + "-amt").value = 99;
                itemValue = 99;
            }

            let itemName = document.getElementById("common-" + i).title;
            itemMap.set(itemName, itemValue);
        }
    }

    return itemMap;
}