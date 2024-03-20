import type { PageServerLoad } from './$types'
import type { prices, time } from '$lib/consts'

type Prices = typeof prices;
type Times = typeof time;

export const load: PageServerLoad = async () => {
    let data: { prices: Prices, time: Times };

    try {
        const prices_fetch = fetch('https://www.joesmovement.org/s/prices.json');
        const times_fetch = fetch('https://www.joesmovement.org/s/times.json');

        const res = await Promise.all([prices_fetch, times_fetch]);

        if (res.some((val) => val.status === 404)) {
            throw new Error('file not found');
        }

        const res_json_arr = await Promise.all(res.map(async val => await val.json()));
        data = { prices: res_json_arr[0].prices, time: res_json_arr[1].times };
    } catch (err) {
        console.log(err)
        return {}
    }

    return {
        prices: data.prices,
        time: data.time,
    }
}
