export type AllapotTipus = "folyamatban" | "törölve" | "kész" | "létrehozva"
export interface TodoTipus {
    id: number,
    tennivalo: string,
    allapot: AllapotTipus
}

export const TODOLISTA: TodoTipus[] = [

    {
        id: 1,
        tennivalo: "Tanulni a dolgozatra",
        allapot: "folyamatban"
    },
    {
        id: 1,
        tennivalo: "contextes feladat önállóan",
        allapot: "létrehozva"
    },
    {
        id: 1,
        tennivalo: "takarítás",
        allapot: "törölve"
    },
    {
        id: 1,
        tennivalo: "edzés",
        allapot: "kész"
    },
]