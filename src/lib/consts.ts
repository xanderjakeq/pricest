import type { Prices } from "$lib/types";

// $
export const prices = {
    theatre: {
        perf: 300,
        partnerPerf: 250,
        securityDeposit: 300,
        techRehearsal: 200,
        rehearsal: 100
    },
    studio: {
        artist: 40,
        teachingArtist: 60
    },
    addons: {
        audio: 30,
        photography: 50,
        videography: 75,
        lighting: 75,
        livestreaming: 75
    }
}

export const time = {
    theatre: {
        min: 4,
        max: 20
    },
    studio: {
        min: 1,
        max: 20
    }
}
