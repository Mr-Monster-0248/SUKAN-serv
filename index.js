const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

app.get('/', (req, res) => {
	res.send("coucou")
})

async function Getscanvf (title)  {
  const result = await axios.get('https://www.scan-vf.net/search?query=' + title);
  return result.data.suggestions
}

app.get('/search', async (req, res) => {
    title = req.query.title;
    html = await Getscanvf(title)
    console.log(html)
    
    jsone = html.map( html1 => {
        var manga = {
            "title": html1.value,
            "img": "https://www.scan-vf.net/uploads/manga/" + html1.data + "/cover/cover_250x350.jpg",
            "url": "https://www.scan-vf.net/" + html1.data,
            "source": "scan-vf.net"
        }
        return manga;
    })
    res.send(jsone)
})


app.listen(port, () => 
console.log(`Example app listening on port ${port}!`)
)
