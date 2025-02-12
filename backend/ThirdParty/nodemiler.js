const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user:  process.env.nodemilerUser ,
    pass:  process.env.nodemilerPsaa,
  },
});
module.exports.AccountVerification = async (token, userid, email, name) => {
  try {
    const info = await transporter.sendMail({
      to: `${email}`,
      subject: 'Cybersecurity Community at Horizon Campus',
      text: 'Hello, please activate your account by clicking the button below.',
      html: ` <div style="text-align: center;">
<div>
    <h2><strong>Welcome ${name} !</strong>   Activate Your Account</h2>
    <p>Thank you for signing up! Please click the button below to activate your account.</p>

    <!-- Image section -->
    <div style=" text-align: center;">
        <img src="https://www.shutterstock.com/image-vector/3d-user-account-blue-mark-600nw-2447443531.jpg"
            alt="Activate Your Account"
            style="width: 100%; max-width: 300px; display: block; margin: 0 auto; border-radius: 10px;">

    </div>
    <br>
   
    
<a href="http://${process.env.baseurl}user/verifid?userid=${userid}&token=${token}&email=${email}&name=${name}" style="display: inline-block; padding: 10px 20px; background-color: #264bb3; color: white; text-decoration: none; border-radius: 10px;">Activate Now</a>


    <p style="max-width: 30rem;"><strong style="color: red;">Important:</strong> If you do not confirm your account
        within 7 days, it will be 
        deleted. Please make
        sure to
        activate it before the deadline.</p>

    <p style="color: rgb(255, 44, 44);">If you did not sign up, please ignore this email.</p>
    </div>

</div>`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (e) {
    console.log(e);
  }
}
module.exports.PostActivationMSG = async (email, name) => {
   console.log("fsdafasfasdf")
   try {
    const info = await transporter.sendMail({
      to: `${email}`,
      subject: 'Account Activated - Unlock Full Access to Cybersecurity Community!',
      text: `Hello ${name}, your account has been successfully activated! To unlock full access to all features, please pay the membership fee.`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color: #264bb3;"><strong>Your account is now activated, ${name}!</strong></h2>
          <p>Congratulations on activating your account! You are now officially part of the Cybersecurity Community at Horizon Campus, and we are thrilled to have you with us. Your account is all set up, and you're just one step away from unlocking full access to the wealth of resources and benefits our platform offers.</p>
          
          <p>As an activated member, you now have the foundation to dive into the world of cybersecurity. However, in order to fully explore all the exclusive courses, resources, and opportunities that come with your membership, you need to complete the payment process.</p>

          <p>Once you complete your membership payment, you will have access to:</p>

          <ul style="list-style-type: none; padding: 0; text-align: left; margin: 0 auto; max-width: 600px;">
            <li>📜 <strong>Advanced Cybersecurity Courses</strong> - Learn from industry experts through courses that cover everything from foundational knowledge to advanced security techniques. Each course is designed to equip you with the skills needed to succeed in the ever-evolving field of cybersecurity.</li>
            <li>🎖️ <strong>Official Certifications</strong> - Upon completing courses, you'll earn e-certificates that you can showcase on your resume, LinkedIn profile, or personal website. These certifications serve as proof of your expertise in cybersecurity.</li>
            <li>🛍️ <strong>Exclusive Discounts</strong> - Get access to special discounts on Cybersecurity Club merchandise, upcoming events, and premium courses. Your membership ensures that you’ll always be in the know about sales and special offers.</li>
            <li>💻 <strong>Hands-On Experience</strong> - Engage in practical, real-world cybersecurity scenarios through hands-on projects. Gain invaluable experience in threat detection, incident response, and penetration testing, among other critical areas.</li>
            <li>🌍 <strong>Networking Opportunities</strong> - Join a network of like-minded professionals, cybersecurity experts, and peers. Our community forums, webinars, and events provide ample opportunities to connect, share knowledge, and collaborate on exciting projects.</li>
            <li>🔒 <strong>Access to Premium Resources</strong> - Unlock exclusive access to a wide range of e-books, research papers, case studies, and other resources to deepen your knowledge of cybersecurity trends and techniques.</li>
            <li>🎓 <strong>Special Webinars and Workshops</strong> - Participate in live, member-only sessions hosted by top cybersecurity experts. These sessions offer you the opportunity to ask questions, interact with professionals, and stay updated on the latest industry developments.</li>
          </ul>

          <p>To proceed and unlock all these benefits, simply click the link below to complete your membership payment:</p>

          <a href="https://forms.gle/phR81jGhxZTdP5hF6"
             style="display: inline-block; padding: 10px 20px; background-color: #264bb3; color: white; text-decoration: none; border-radius: 10px;">
            Pay Membership Fee Now
          </a>

          <p>Once your payment is confirmed, your account will be upgraded to full access, and you can start benefiting from all the features immediately!</p>
          
          <p>If you have any questions about the payment process, or if you need any assistance, our support team is here to help. Don’t hesitate to reach out to us at any time.</p>

          <p style="color: gray; font-size: 0.9em;">We’re excited to help you advance your skills and knowledge in cybersecurity, and we can’t wait to see what you achieve as a full member of our community!</p>
          
          <p style="color: #264bb3; font-size: 1em;">Best regards,<br>The Cybersecurity Community Team</p>
          <p style="color: #264bb3; font-size: 1.1em;">Your journey in cybersecurity starts now!</p>
        </div>
      `,
    });

    console.log("Post-activation email sent: %s", info.messageId);
  } catch (e) {
    console.log(e);
  }
}
module.exports.PaymentConfirmation = async (email, name) => {
  try {
    const info = await transporter.sendMail({
      to: `${email}`,
      subject: 'Payment Successful - Welcome to Full Access at Cybersecurity Community!',
      text: `Hello ${name}, thank you for your payment! You now have full access to all features and resources.`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color: #264bb3;"><strong>Thank you for your payment, ${name}!</strong></h2>
          <p>Your membership is now fully activated, and you’re officially part of the Cybersecurity Community at Horizon Campus! We are excited to welcome you as a full member and look forward to supporting you as you embark on your journey in the world of cybersecurity.</p>
          
          <p>As a full member, you now have complete access to all the exclusive resources, tools, and opportunities our community offers. Here's a quick overview of the exciting benefits available to you:</p>
          
          <ul style="list-style-type: none; padding: 0; text-align: left; margin: 0 auto; max-width: 600px;">
            <li>📜 <strong>Advanced Cybersecurity Courses</strong> - Dive into a wide range of expertly designed courses covering everything from fundamental concepts to advanced cybersecurity strategies. Whether you're a beginner or an experienced professional, our curriculum is designed to equip you with the knowledge and skills needed to thrive in the field.</li>
            <li>🎖️ <strong>Official Certifications</strong> - Complete courses and receive official e-certificates that you can proudly share on your resume or LinkedIn profile. These certificates serve as proof of your expertise and can help boost your career prospects in the competitive cybersecurity industry.</li>
            <li>🛍️ <strong>Exclusive Discounts</strong> - Take advantage of special discounts on our Cybersecurity Club merchandise, future events, and premium courses. As a member, you’ll always be the first to know about our sales and offers.</li>
            <li>💻 <strong>Hands-On Experience</strong> - Gain practical, real-world experience by participating in simulated cybersecurity attacks, threat detection, and incident response scenarios. These hands-on projects are designed to sharpen your skills and make you job-ready.</li>
            <li>🌍 <strong>Networking Opportunities</strong> - Connect with industry leaders, cybersecurity professionals, and fellow learners through our exclusive online forums, webinars, and events. Share ideas, collaborate on projects, and build a professional network that will support you throughout your career.</li>
            <li>🔒 <strong>Access to Premium Resources</strong> - Unlock access to a wealth of exclusive e-books, research papers, case studies, and cybersecurity guides. Stay ahead of the curve by keeping up with the latest industry trends and security best practices.</li>
            <li>🎓 <strong>Special Webinars and Workshops</strong> - Participate in member-only webinars and workshops hosted by leading cybersecurity experts. These sessions offer in-depth insights into critical cybersecurity topics, current threats, and emerging technologies.</li>
          </ul>

          <p>Now that you’re a full member, here’s how you can get started:</p>
          
         
          <p>If you have any questions or need assistance navigating the platform, our support team is available to help you. Simply reply to this email or visit our support center.</p>

          <p style="color: gray; font-size: 0.9em;">Thank you for being part of our community! We’re thrilled to support your growth and success in cybersecurity.</p>

          <p style="color: #264bb3; font-size: 1em;">Best regards,<br>The Cybersecurity Community Team</p>
          <p style="color: #264bb3; font-size: 1.1em;">Your journey in cybersecurity starts now!</p>
        </div>
      `,
    });

    console.log("Payment confirmation email sent: %s", info.messageId);
  } catch (e) {
    console.log(e);
  }
}
 module.exports.PromotionNotification = async (email, name, team, role) => {
  console.log("thisis madarchaod")
  try {
  
    let responsibilities = '';

    if (role === 'Top Board') {
  responsibilities = `
    <li>📝 Helping steer the direction and growth of the Cybersecurity Community, ensuring that the platform continues to meet the needs of all members.</li>
    <li>💡 Providing leadership and strategic guidance to the team, while fostering innovation and community involvement.</li>
    <li>🤝 Representing the community at key events, contributing to partnerships, and influencing decisions that shape our long-term goals.</li>`;
} else if (role === 'Video Production Team') {
  responsibilities = `
    <li>🎬 Editing and producing high-quality videos that engage, educate, and inspire our community members.</li>
    <li>🖥️ Working with the content team to bring creative ideas to life, ensuring videos are clear, polished, and aligned with our cybersecurity training goals.</li>
    <li>💡 Crafting engaging video content, from tutorials to webinars, that help our community learn and grow in the field of cybersecurity.</li>`;
} else if (role === 'Social Media Handling Department') {
  responsibilities = `
    <li>📊 Creating and managing social media campaigns to engage our community and expand our reach.</li>
    <li>📅 Planning and executing social media strategies that align with the cybersecurity community’s goals.</li>
    <li>🤝 Collaborating with team members and influencers to amplify community content and engagement.</li>`;
} else if (role === 'Content Section') {
  responsibilities = `
    <li>✍️ Creating high-quality, engaging, and informative content for the community.</li>
    <li>💡 Researching and writing articles that cover cybersecurity trends, tips, and best practices.</li>
    <li>📚 Collaborating with other team members to ensure content aligns with the community's goals and needs.</li>`;
} else if (role === 'Content Writers') {
  responsibilities = `
    <li>✍️ Crafting written content that is engaging and relevant to the cybersecurity community.</li>
    <li>💡 Producing articles, blog posts, and other written materials that provide valuable insights and learning opportunities.</li>
    <li>📚 Ensuring content aligns with the cybersecurity goals and engages the community effectively.</li>`;
} else if (role === 'Creative Graphic & Animation Team') {
  responsibilities = `
    <li>🎨 Designing creative graphics and animations that educate and engage our community members.</li>
    <li>💡 Producing visual content for social media, training materials, and other communication platforms.</li>
    <li>🖥️ Collaborating with other teams to produce materials that are clear, engaging, and relevant.</li>`;
} else if (role === 'Event Organizing Team') {
  responsibilities = `
    <li>🗓️ Planning and organizing events that bring the cybersecurity community together.</li>
    <li>🤝 Coordinating logistics and ensuring events are informative, engaging, and impactful.</li>
    <li>📊 Collaborating with other teams to deliver high-quality event experiences for participants.</li>`;
} else if (role === 'Cybersecurity Technical Team') {
  responsibilities = `
    <li>🔒 Implementing and maintaining technical solutions that enhance community security and engagement.</li>
    <li>💡 Researching, designing, and deploying new cybersecurity strategies and tools.</li>
    <li>📈 Collaborating with the content and other teams to address community needs and provide valuable insights.</li>`;
} else {
  // Default responsibilities for all other roles
  responsibilities = `
    <li>🔧 Performing essential tasks specific to your role, contributing to the overall success of the team.</li>
    <li>📈 Collaborating with team members to help achieve team objectives and improve overall efficiency.</li>
    <li>🌱 Continuously learning and growing within your role, offering valuable insights and feedback to improve the community.</li>`;
}

    // Send email using the dynamic template
    const info = await transporter.sendMail({
      to: `${email}`,
      subject: `Congratulations on Your Promotion to ${role}!`,
      text: `Hello ${name}, congratulations on your promotion to ${role} in the ${team} team!`,
      html: `
        <div style="text-align: center; font-family: Arial, sans-serif;">
          <h2 style="color: #264bb3;"><strong>Congratulations on Your Promotion, ${name}!</strong></h2>
          
          <p>We are excited to inform you that you have been promoted to the role of <strong>${role}</strong> within the <strong>${team}</strong> team! This is a well-deserved recognition of your hard work, dedication, and valuable contributions to the community.</p>
          
          <p><strong>As a ${role}, you will be responsible for:</strong></p>
          
          <ul style="list-style-type: none; padding: 0; text-align: left; margin: 0 auto; max-width: 600px;">
            ${responsibilities}
          </ul>
          
          <p>This promotion reflects your hard work, leadership, and passion for contributing to the success of our team and community. Your skills and dedication have made a significant impact, and we are excited to see how you will further elevate the work we do.</p>
          
          <p><strong>What’s next?</strong></p>
          
          <p>In your new role, you’ll be working closely with the rest of the team to make sure that our community thrives. We’re confident that your new responsibilities will help you grow and offer even greater value to our organization.</p>
          
          <p>If you have any questions or need more information about your new role, please don’t hesitate to reach out to your team lead or our HR department. We're here to support you as you transition into your new responsibilities.</p>
          
          <p>We’re excited about your future with us and are looking forward to seeing the continued impact you will make. Thank you once again for all that you’ve done to help shape our community, and congratulations on this well-deserved promotion!</p>

          <p style="color: gray; font-size: 0.9em;">Best regards,<br>The Cybersecurity Community Team</p>
          <p style="color: #264bb3; font-size: 1.1em;">Your journey in cybersecurity continues!</p>
        </div>
      `,
    });

    console.log("Promotion email sent: %s", info.messageId);
  } catch (e) {
    console.log(e);
  }
}
module.exports.DepromotionNotification = async (email, name, oldRole, team) => {

  try {
    const info = await transporter.sendMail({
      to: `${email}`,
      subject: `Update Regarding Your Role in the ${team} Team`,
      text: `Hello ${name}, we wanted to notify you about a change in your role within the ${team} team.`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color: #264bb3;"><strong>Important Update Regarding Your Role, ${name}</strong></h2>
          
          <p>We want to thank you for your contributions as a <strong>${oldRole}</strong> within the ${team} team. Your hard work and dedication have been greatly appreciated.</p>
          
          <p>However, after careful consideration, we have made the decision to adjust your role within the team. This change is part of an ongoing effort to better align the team’s structure and objectives. We value your contributions and believe that this change will help streamline our efforts moving forward.</p>
          
          <p>We understand that role changes can sometimes be challenging, and we are here to support you during this transition. If you have any questions or concerns, please feel free to reach out to your team lead or HR. We're committed to making this process as smooth as possible for you.</p>
          
          <p>Thank you once again for all of your hard work and dedication. We appreciate your continued commitment to the team, and we are confident that your contributions will continue to make a positive impact moving forward.</p>

          <p style="color: gray; font-size: 0.9em;">Best regards,<br>The Cybersecurity Community Team</p>
          <p style="color: #264bb3; font-size: 1.1em;">Your journey with us continues!</p>
        </div>
      `,
    });

    console.log("Depromotion email sent: %s", info.messageId);
  } catch (e) {
    console.log(e);
  }
}


// not implemented
module.exports.AnnouncementNotification = async (title, pdfAttachment, emailArray) => {
  try {
    // Prepare the PDF file to be attached
    const info = await transporter.sendMail({
      to: emailArray.join(', '),  // Sends to all emails in the array
      subject: `Important Announcement: ${title}`,
      text: `Hello, please find the attached PDF for an important announcement regarding ${title}.`,
      html: `
        <div style="text-align: center; font-family: Arial, sans-serif;">
          <h2 style="color: #264bb3;"><strong>Announcement: ${title}</strong></h2>
          
          <p>Dear Members,</p>
          
          <p>We are pleased to announce an important update regarding <strong>${title}</strong>. This announcement contains key details that will help you stay informed about the latest developments within our community.</p>
          
          <p>For more information, please review the attached PDF document. It provides comprehensive details about the announcement, including dates, key points, and any actions you may need to take.</p>
          
          <p><strong>What’s Inside the PDF:</strong></p>
          <ul style="list-style-type: none; padding: 0; text-align: left; margin: 0 auto; max-width: 600px;">
            <li>📅 Important Dates and Deadlines</li>
            <li>🔑 Key Information and Updates</li>
            <li>🚀 Action Steps and What’s Expected</li>
          </ul>
          
          <p>Please ensure that you read the attached document carefully. If you have any questions, feel free to reach out to us for further clarification.</p>
          
          <p>Thank you for your attention, and we look forward to your participation in the upcoming activities outlined in the document.</p>
          
          <p style="color: gray; font-size: 0.9em;">Best regards,<br>The Cybersecurity Community Team</p>
          <p style="color: #264bb3; font-size: 1.1em;">We value your continued engagement!</p>
        </div>
      `,
      attachments: [
        {
          filename: `${title.replace(/\s+/g, '_').toLowerCase()}.pdf`,  // The PDF file is named based on the title
          path: pdfAttachment,  // Path to the PDF file
        }
      ],
    });

    console.log("Announcement email sent to: %s", emailArray.join(', '));
  } catch (e) {
    console.log(e);
  }
}
// // Example function call
// const emailArray = ["member1@example.com", "member2@example.com", "member3@example.com"];
// const pdfAttachment = "/path/to/announcement.pdf";  // Path to your PDF file
// AnnouncementNotification("New Cybersecurity Event", pdfAttachment, emailArray);

module.exports.Contactus = async (name, email, subject, message) => { 
  try {
    const info = await transporter.sendMail({
      to: `${process.env.nodemilerPsaa}`,
      subject:`${subject}`,
       html: `
        <h1>From Cybersecurity Website</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>From Email:</strong> ${email}</p>
        
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,  
    

    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
};
