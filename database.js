const books = [
    {
        ISBN: "12345Book",
        title: "Tesla!!",
        pubDate: "2023-02-08",
        Language: "en",
        numPage: 250,
        author: [1,2],
        publications: [1],
        category: ["tech","space","education"]

    }
]

const author = [
    {
        id: 1,
        name: "vikas",
        books: ["12345Book","secretBook"]
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book"]
    }
]

const publication = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book"]
    },
        {
            id: 2,
            name: "writex2",
            books: []
        }
]

module.exports ={books , author , publication};
