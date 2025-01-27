const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    firstName: String,
   description:String,
    lastName: String,
    faculty: {
        type: String,
        enum: [
            'Faculty of Information Technology (IT)',
            'Faculty of Business and Management',
            'Faculty of Science',
            'Faculty of Law',
            'Faculty of Education',
            'Other',
        ],
    },
    gender:{
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    yearOfStudy: {
        type: String,
        enum: ['First Year', 'Second Year', 'Third Year', 'Final Year'],
    },
    degreeProgram: String,
    studentID: String,
    phoneNumber: String,
    whatsappNumber: String,
    dateOfBirth: Date,
    address: {
        street: String,
        city: String,
    },
    cybersecurityInterests: {
        type: [String],
        enum: [
            'Network Security',
            'Ethical Hacking',
            'Cloud Security',
            'Forensics',
            'Privacy and Data Protection',
            'Other',
        ],
    },
    socialMedia: {
        linkedin: {
            type: String,
            default:"#"
        },
        facebook: {
            type: String,
            default:"#"
        },
        X: {
            type: String,
            default:"#"
        }
    },
    cybersecuritySkills: [String],
    certifications: {
        hasCertifications: Boolean,
        list: [String],
    },
  
    img: {
        url:{
            type: String,
            default: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        },
        filename: {
             type: String,
              default: "1",
        },
    },

   teams: [{
    teamName: {
      type: String,
      enum: [
        "Top Board",
        "Video Production Team",
        "Social Media Handling Department",
        "Content Section",
        "Content Writers",
        "Creative Graphic & Animation Team",
        "Event Organizing Team",
        "Cybersecurity Technical Team"
      ],
    },
    roles: {
      type: String, // Changed from array to string
        enum: [
          "Lecturer",
        "President",
        "Vice President",
        "Secretary",
        "Assistant Secretary",
        "Treasurer",
        "Assistant Treasurer",
        "Presenter",
        "Videographer",
        "Video Editor",
        "Script Writers",
        "Director of Social Media Handling",
        "Assistant Director of Social Media Handling",
        "Editor",
        "Assistant Editor",
        "Head",
        "Content Writer",
        "Head of Creative Animation",
        "Graphic Designer",
        "Event Director",
        "Assistant Event Director",
        "Event Organizing Team Member",
        "Cybersecurity Team Member"
      ],
    },
  }]
}, { timestamps: true });

module.exports = mongoose.model('UserInfo', userInfoSchema);
