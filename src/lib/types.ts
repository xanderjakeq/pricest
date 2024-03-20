export type Prices = {
    prices: {
        theatre: {
            perf: number,
            partnerPerf: number,
            securityDeposit: number,
            techRehearsal: number,
            rehearsal: number
        },
        studio: {
            artist: number,
            teachingArtist: number
        },
        addons: {
            audio: number,
            photography: number,
            videography: number,
            lighting: number,
            livestreaming: number
        }
    }
}
