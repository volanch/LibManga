const mongoose = require('mongoose');
const Manga = require('./models/mangaModel');

const dataset = [
    { "img": "assets/menu-page/cover_begin.webp", "year": "Manhwa 2018", "title": "The Beginning After the End" },
    { "img": "assets/menu-page/cover_nonam.webp", "year": "Manhwa 2019", "title": "A Monopoly on Chance" },
    { "img": "assets/menu-page/cover_lalka.jpg", "year": "Manhwa 2022", "title": "Ice Flower Knight" },
    { "img": "assets/menu-page/cover_54c49cfa.webp", "year": "Manhwa 2024", "title": "Dungeon courier" },
    { "img": "assets/menu-page/cover_7673b861.webp", "year": "Manhwa 2025", "title": "The genius magician who sees the rainbow" },
    { "img": "assets/menu-page/cover_a425b408.webp", "year": "Manhwa 2023", "title": "Half-breed bastard" },
    { "img": "assets/menu-page/cover_0abd95f5.webp", "year": "Manhwa 2018", "title": "Solo leveling" },
    { "img": "assets/menu-page/cover_8b00e9f3.webp", "year": "Manhwa 2021", "title": "Solo Max-Level Newbie" },
    { "img": "assets/menu-page/cover_aafca556.webp", "year": "Manhwa 2025", "title": "Return of the Corpse King" },
    { "img": "assets/kaban.jpg", "year": "Manhwa 2025", "title": "kaban" }
];

async function seedDatabase() {
    try {
        await mongoose.connect('mongodb+srv://volanch:qviopw1029@cluster0.fczhvfl.mongodb.net/libmanga?appName=Cluster0/');
        console.log("Успешное подключение для синхронизации...");

        for (const item of dataset) {
            const titleClean = item.title.replace('<br>', ' ');

            const yearMatch = item.year.match(/\d{4}/);
            const yearExtracted = yearMatch ? yearMatch[0] : "2025";

            await Manga.findOneAndUpdate(
                { title: titleClean },
                {
                    $set: {
                        description: `Экшен-история в жанре фэнтези, выпущенная в ${item.year}.`,
                        coverImage: item.img,
                        genres: ["Fantasy", "Action"],
                        status: "Publishing",
                        author: "Unknown Artist",
                        published: new Date(yearExtracted, 0, 1)
                    }
                },
                { upsert: true, new: true }
            );
        }

        console.log("Данные успешно синхронизированы!");
        process.exit();
    } catch (err) {
        console.error("Ошибка при работе с базой:", err.message);
        process.exit(1);
    }
}

seedDatabase();