self.addEventListener('message', (e) => {
    const items = e.data;
    const grouped = {};

    items.forEach(({ lastName, phoneNumber }) => {
        if (!grouped[lastName]) grouped[lastName] = [ phoneNumber ];
        else grouped[lastName] = [ ...grouped[lastName], phoneNumber ];
    })

    const sorted = Object.keys(grouped).sort((a, b) => {
        if (a > b) {
            return 1;
        }

        if (a < b) {
            return -1;
        }

        return 0;
    });

    self.postMessage({ sorted, grouped });
});
