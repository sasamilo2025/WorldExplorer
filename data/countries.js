/*
===========================================================
Project - World Explorer
Local Countries Dataset (Stable Backup Source)

Purpose:
This file replaces unstable external APIs.
Ensures the application always works.

Author: Sasa Milo
===========================================================
*/

const COUNTRIES_DATA = [
    {
        name: { common: "Samoa" },
        capital: ["Apia"],
        region: "Oceania",
        population: 200000,
        flags: { png: "https://flagcdn.com/w320/ws.png" }
    },
    {
        name: { common: "Fiji" },
        capital: ["Suva"],
        region: "Oceania",
        population: 900000,
        flags: { png: "https://flagcdn.com/w320/fj.png" }
    },
    {
        name: { common: "New Zealand" },
        capital: ["Wellington"],
        region: "Oceania",
        population: 5000000,
        flags: { png: "https://flagcdn.com/w320/nz.png" }
    },
    {
        name: { common: "Japan" },
        capital: ["Tokyo"],
        region: "Asia",
        population: 125000000,
        flags: { png: "https://flagcdn.com/w320/jp.png" }
    },
    {
        name: { common: "Germany" },
        capital: ["Berlin"],
        region: "Europe",
        population: 83000000,
        flags: { png: "https://flagcdn.com/w320/de.png" }
    }
];