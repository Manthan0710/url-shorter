import { nanoid } from "nanoid";
import Urls from "../models/url.js";

export const newUrl = async (req,res,next) => {
    const Url = new Urls;
    let originalUrl = req.body.url;
    console.log(originalUrl);
    if(!originalUrl) return res.status(400).json({ error: 'URL is required' });

    Url.originalUrl = originalUrl;
    
    const host = req.get('host'); // e.g. "localhost:3000" or "yourdomain.com"
    const protocol = req.protocol; // http or https

    let shortCode;
    let shortUrl;
    let existing;

    try {
        let url = await Urls.findOne({originalUrl});
        

        if(url){
            console.log(url);
            let shortUrl = `${protocol}://${host}/${url.shortCode}`;
            console.log(shortUrl);
            return res.status(200).json({
            shortUrl,
            shortCode:url.shortCode,
            success: true,
            message: 'Short Url found from DB'
            });
            
        };
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server Error');
    };

    do {
    shortCode = nanoid(6); // Generate random 6-char code
    existing = await Urls.findOne({ shortCode }); // Indexed lookup
    } while (existing);

    Url.shortCode = shortCode; 

    shortUrl = `${protocol}://${host}/${shortCode}`;
    
    try {
        await Url.save();
    } catch (error) {
        res.status(400).json({
        success: false,
        message: error.message
    });
    }

    res.status(201).json({
        shortUrl: shortUrl,
        shortCode,
        success: true,
        message: 'Short Url created successfully'
    });

};

export const redirectUrl = async (req,res,next) => {
    const shortCode = req.params.shortCode;

    try {
        let url = await Urls.findOne({shortCode});

    if(url){
        url.noOfHits++;
        await url.save(); 
        return res.redirect(url.originalUrl);
        
    }else{
        return res.status(404).send('Short Url not found');
    }
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server Error');
    };

};


export const checkStats = async (req,res,next) => {
    const shortCode = req.params.shortCode;

    try {
        let url = await Urls.findOne({shortCode});
        
    if(url){
        let noOfHits = url.noOfHits;
        return res.status(200).json({
            noOfHits,
            success: true,
            message: 'Short Url found from DB'
            });
        
    }else{
        return res.status(404).send('Url stats not found');
    }
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server Error');
    };

}