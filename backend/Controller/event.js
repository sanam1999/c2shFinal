const { response } = require('express');
const Event = require('../models/event.js');
const { deleteImage } = require("../ThirdParty/cludynaryconfig.js");

module.exports.eventGet = async (req, res) => {
    try {
        const events = await Event.find({});
        res.render("event/events.ejs", { events }); // Render the page with events
    } catch (err) {
        console.error("Error fetching events:", err);
        req.flash('error', 'Error fetching events'); // Flash an error message
        return res.redirect('/error'); // Ensure no further code executes after redirect
    }
};

module.exports.eventAdd = (req, res) => {
    res.render("event/postEvent.ejs"); // Render the page for adding an event
};
module.exports.eventPost = async (req, res) => {
    try {
        const filesArray = req.files.map(file => ({
            url: file.path,
            filename: file.filename,
        }));

        const newEvent = new Event({
            title: req.body.post.title,
            description: req.body.post.description,
            image: filesArray,
            location: req.body.post.location,
            date: req.body.post.date,
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(400).json({ message: 'Error creating event', error: error.message });
    }
};
module.exports.deletePost = async (req, res) => {
    try {
        const id = req.body.id;

        let post = await Event.findByIdAndDelete(id);
        await post.image.map(imageToDelete => (
            deleteImage(imageToDelete)
        ));
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error deleting event');
        return res.redirect('/event');
    }
};
module.exports.deleteIMG = async (req, res) => {
  try {
    const imageIdToFind = req.query.id;
    const event = await Event.findOne({ 'image._id': imageIdToFind });
    const imageToDelete = event.image.find(img => img._id.toString() === imageIdToFind);
      
     await Event.findOneAndUpdate(
      { 'image._id': imageIdToFind }, 
      { $pull: { image: { _id: imageIdToFind } } }, 
      { new: true } 
    );
      deleteImage(imageToDelete);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ message: 'An error occurred while deleting the image', error: err.message });
  }
};
module.exports.postEdit = async (req, res) => {
    try {
        const event = await Event.findById(req.query.id); 
        res.render('event/editEvent.ejs', { event }); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
module.exports.postUpdate = async (req, res) => {
    try {
        
      
        const updatedEvent = await Event.findByIdAndUpdate(
            req.query.id,
            {
                title: req.body.post.title,
                description: req.body.post.description,
                location: req.body.post.location,
                date: req.body.post.date,
            },
            { new: true }
        );

        if (req.files && req.files.length > 0) {
            const filesArray = req.files.map(file => ({
                url: file.path,
                filename: file.filename,
            }));
            updatedEvent.image.push(...filesArray);
        }
        await updatedEvent.save();

      res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(400).json({ message: 'Error updating event', error: error.message });
    }
};



module.exports.blogs = async (req, res) => {
    try {
        
     const blogs = [
        { 
            question: "How Can I Safely Browse The Internet?", 
            answer: "To safely browse the internet, use strong passwords, enable two-factor authentication, avoid suspicious links, and use secure networks.",
            images: [ "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s"] 
        },
        { 
            question: "How Does Secuvant's Co-managed Security Model Work?", 
            answer: "Secuvant's co-managed security model combines in-house and Secuvant's expertise to enhance cybersecurity.",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_clOnjT3OVlUAlQ2Dvdf7Xao3m2ETxXbcLA&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s"]
        },
        { 
            question: "What Type Frequency Of Alerts And Notifications Will I Receive?", 
            answer: "The frequency of alerts and notifications depends on the system settings, ranging from real-time to daily or weekly updates.",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s"] 
        },
        { 
            question: "How Is Our Data Stored And Protected And For How Long?", 
            answer: "Our data is securely stored using encryption and strict authentication protocols, retained as necessary for legal and operational purposes.",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s"] 
        },
        { 
            question: "What Are The Key Components Of A Strong Cybersecurity Strategy?", 
            answer: "A strong cybersecurity strategy includes firewalls, anti-virus software, employee training, regular updates, and incident response plans.",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s"]
        },
        { 
            question: "Can I Use Public Wi-Fi Safely?", 
            answer: "Using public Wi-Fi safely requires a VPN, avoiding sensitive transactions, and disabling automatic connections.",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s"] 
        },
        { 
            question: "What Should I Do If I Suspect A Data Breach?", 
            answer: "If you suspect a data breach, notify your security team, change passwords, and monitor for unauthorized activity.",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s"] 
        },
        { 
            question: "How Often Should I Update My Software?", 
            answer: "Update your software as soon as updates are available to patch security vulnerabilities and improve performance.",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s"]
        },
        { 
            question: "What Are The Benefits Of Two-Factor Authentication?", 
            answer: "Two-factor authentication adds an extra layer of security, requiring a second form of verification to access accounts.",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s"] 
        },
        { 
            question: "How Can I Recognize A Phishing Email?", 
            answer: "Look for suspicious links, generic greetings, urgent language, and mismatched sender addresses to identify phishing emails.",
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbauYzUfJWggJYyXt0Wz77-bi862ogkmh0NQ&s"] 
        }
        ];
    res.render('event/blog.ejs', {blogs} )
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(400).json({ message: 'Error updating event', error: error.message });
    }
};
