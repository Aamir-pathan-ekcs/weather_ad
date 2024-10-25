const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const maxmind = require('maxmind');
const fs = require('fs');

const dbPath = './GeoLite2-City.mmdb';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/geolate', async (req, res) => {
    try {

        if (fs.existsSync(dbPath)) {
            console.log('MMDB file exists!');

            const lookup = await maxmind.open(dbPath);
            console.log('MMDB file successfully opened');

            const ip = '106.219.151.145';

            const geoData = lookup.get(ip);
            if (!geoData) {
                console.error('No geolocation data found for IP:', ip);
                res.status(404).json({ error: 'No geolocation data found for IP' });
            } else {
                console.log('GeoData for IP:', geoData);
                res.json(geoData);
            }

        } else {
            console.error('MMDB file does not exist at the specified path:', dbPath);
            res.status(404).json({ error: 'MMDB file does not exist' });
        }

    } catch (error) {
        console.error('Error performing IP lookup:', error);
        res.status(500).json({ error: 'Error performing IP lookup' });
    }
});

app.get('/home', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});